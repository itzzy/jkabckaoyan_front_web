import React, { useState } from 'react';
import type { ReactNode } from 'react';

import { Button, notification } from 'antd';
import type { ButtonProps } from 'antd';

import Cookies from 'js-cookie';
import { extend } from 'umi-request';

interface OptionsProps {
    loading: boolean;
}

interface FileProps {
    params?: object;
    children?: (options: OptionsProps) => ReactNode;
    style?: any;
    action: string;
    accept?: string;
    method?: string;
    callback?: () => void;
    title?: string;
    header?: object;
    onClick?: () => object;
    ButtonProps?: ButtonProps;
}

const DownloadFile = (props: FileProps) => {
    const {
        params = {},
        onClick = () => ({}),
        children,
        style = {},
        action = '',
        accept = '*/*',
        method = 'GET',
        callback = () => {},
        title = '导出数据',
        ButtonProps = {},
        header = {},
    } = props;
    const [loading, setLoading] = useState<boolean>(false);

    const downFile = (blob: any, fileName: any) => {
        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, fileName);
        } else {
            let link: any = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            window.URL.revokeObjectURL(link.href);
            link = null;
        }
    };

    const downloadTmpl = () => {
        // 点击下载时事件获取额外的参数
        const values = onClick() || {};
        const headers: any = {
            ...(Cookies.get('token') ? { Authorization: Cookies.get('token') } : null),
            Accept: accept,
            ...header,
        };
        const request = extend({
            credentials: 'include', // 默认请求是否带上cookie
        });
        if (loading) return;
        setLoading(true);

        request(action, {
            method,
            headers,
            // responseType: 'arrayBuffer',
            responseType: 'blob',
            getResponse: true,
            params: { ...values, ...params },
            data: { ...values, ...params },
        })
            .then(({ data, response }) => {
                const fileReader = new FileReader(); // 读取blob对象
                fileReader.onload = () => {
                    if (data.type === 'application/json') {
                        notification.error({
                            message: '错误',
                            description: fileReader.result,
                        });
                    } else {

                        //获取文件名称，返回的是encodedURI编码，需要decodeURI解码一下
                        const contentDisposition = response.headers.get('content-disposition');
                        let [fileName = ''] = contentDisposition?.split('=').slice(-1) || '';
                        fileName = fileName.replace(`utf-8''`, '');
                        const blob = new Blob([data]);
                        downFile(blob, decodeURI(fileName));
                    }
                };
                fileReader.readAsText(data);
            })
            .then(() => callback())
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div onClick={downloadTmpl} style={{ display: 'inline-block', ...style }}>
            {children ? (
                children({ loading })
            ) : (
                <Button loading={loading} {...ButtonProps}>
                    {title}
                </Button>
            )}
        </div>
    );
};

export default DownloadFile;