import React, {useEffect, useState} from 'react';

import {PageContainer} from "@ant-design/pro-layout";
import {FormattedMessage, useIntl} from "@@/plugin-locale/localeExports";
import {Card, Form, message, Tabs} from "antd";
import styles from "@/pages/user/Login/index.less";
import {ProForm, ProFormTextArea} from "@ant-design/pro-form";
import {login, pptGenerate} from "@/services/ant-design-pro/api";
import {history} from "@@/core/history";


const Page: React.FC = () => {

    /**
     * @en-US International configuration
     * @zh-CN 国际化配置
     * */
    const intl = useIntl();

    const handleSubmit = async (values: API.PptParams) => {
        try {
            // 登录
            console.info(values);
            const msg = await pptGenerate(values);
            console.log(msg)
            if (msg.success === true) {
                const defaultLoginSuccessMessage = intl.formatMessage({
                    id: 'pages.login.success',
                    defaultMessage: '生成成功！',
                });
                message.success(defaultLoginSuccessMessage);
                /** 此方法会跳转到 redirect 参数所在的位置 */
                if (!history) return;
                const {query} = history.location;
                const {redirect} = query as { redirect: string };
                history.push(redirect || '/pptGenerate/download');
                return;
            }
        } catch (error) {
            const defaultLoginFailureMessage = intl.formatMessage({
                id: 'pages.login.failure',
                defaultMessage: '登录失败，请重试！',
            });

            message.error(defaultLoginFailureMessage);
        }
    };

    // useEffect( () => {
    //   getRankBasicInfo({'rankName':rankName}).then(({data})=>{
    //     console.info(data);
    //     setRankBasicInfo(data);
    //   });
    // },[]);


    return (
        <PageContainer title={'小红书爆款PPT生成工具'}>
            <ProForm onFinish={async (values) => {
                await handleSubmit(values as API.LoginParams);
            }}>
                <ProFormTextArea width="xl" label="主标题" name="title1"
                                 fieldProps={{
                                     autoSize: {minRows: 3, maxRows: 5}
                                 }}
                                 initialValue='内卷学习法'/>
                <ProFormTextArea width="xl" label="副标题"
                                 fieldProps={{
                                     autoSize: {minRows: 3, maxRows: 5}
                                 }}
                                 name="title2"
                                 initialValue='偷偷卷死同学'/>
                <ProFormTextArea width="xl" label="第一页内容"
                                 fieldProps={{
                                     autoSize: {minRows: 15, maxRows: 20}
                                 }}
                                 name="text1"
                                 initialValue='有同学说能不能出内卷学习法，要偷偷卷的那种，云云特别理解这种心情，所以立马就出了！没有人喜欢偷偷学习，但事实很冰冷：

                                 1、努力成卷
                                   明明啥都不会，看个书学习一下，别人就说你内卷制造焦虑，让你不好意思继续学习。

                                 2、害怕被讽
                                    努力被同学看在眼里，却没有拿到优秀成绩，害怕被阴阳怪气，成为被嘲笑的对象。
                                 3、害怕孤立
                                    害怕努力学习结果被人疏离，导致没有朋友。'
                />
                <ProFormTextArea width="xl"
                                 fieldProps={{
                                     autoSize: {minRows: 15, maxRows: 20}
                                 }}
                                 initialValue='有同学说能不能出内卷学习法，要偷偷卷的那种，云云特别理解这种心情，所以立马就出了！没有人喜欢偷偷学习，但事实很冰冷：

                                 1、努力成卷
                                   明明啥都不会，看个书学习一下，别人就说你内卷制造焦虑，让你不好意思继续学习。

                                 2、害怕被讽
                                    努力被同学看在眼里，却没有拿到优秀成绩，害怕被阴阳怪气，成为被嘲笑的对象。
                                 3、害怕孤立
                                    害怕努力学习结果被人疏离，导致没有朋友。'
                                 label="第二页内容" name="text2"/>
                <ProFormTextArea width="xl" label="第三页内容"
                                 fieldProps={{
                                     autoSize: {minRows: 15, maxRows: 20}
                                 }}
                                 initialValue='有同学说能不能出内卷学习法，要偷偷卷的那种，云云特别理解这种心情，所以立马就出了！没有人喜欢偷偷学习，但事实很冰冷：

                                 1、努力成卷
                                   明明啥都不会，看个书学习一下，别人就说你内卷制造焦虑，让你不好意思继续学习。

                                 2、害怕被讽
                                    努力被同学看在眼里，却没有拿到优秀成绩，害怕被阴阳怪气，成为被嘲笑的对象。
                                 3、害怕孤立
                                    害怕努力学习结果被人疏离，导致没有朋友。'
                                 name="text3"/>
                <ProFormTextArea width="xl" label="最后一页鸡汤"
                                 fieldProps={{
                                     autoSize: {minRows: 3, maxRows: 5}
                                 }}
                                 initialValue='少壮不努力，老大徒伤悲！'
                                 name="text4"/>

            </ProForm>
        </PageContainer>
    );
};

export default Page;
