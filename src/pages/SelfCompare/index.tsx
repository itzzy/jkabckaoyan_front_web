import React, {useEffect, useState} from 'react';
import moment from 'moment';

import {PageContainer} from "@ant-design/pro-layout";
import {
    getCountStaticInfoList, getCountStaticInfoList23, getCountStaticInfoList24,
    getScoreTrend,
    listStaticInfo,
    selfDefineSearch
} from "@/services/ant-design-pro/api";
import ProTable, {ProColumns} from "@ant-design/pro-table";
import {FormattedMessage, useIntl} from "@@/plugin-locale/localeExports";
import ProDescriptions from '@ant-design/pro-descriptions';

import {Card} from "antd";
import {GroupedColumn, Line} from '@ant-design/charts';


const Page: React.FC = () => {
    /**
     * @en-US International configuration
     * @zh-CN 国际化配置
     * */
    const intl = useIntl();


    const [tableData, setTableData] = useState([]);

    let notice = '';
    if (window.localStorage.getItem('ids') === null ||
        window.localStorage.getItem('ids') === undefined ||
        window.localStorage.getItem('ids').length === 0
    ) {
        notice = '提醒：目前自选列表为空，请先添加自己喜欢的专业！';
    }
    useEffect(() => {
        console.info(window.localStorage.getItem('ids'));

        selfDefineSearch({'ids': window.localStorage.getItem('ids'),
            'businessType': 5,
        }).then(({data}) => {
            console.info(data);
            setTableData(data);
        });
    }, []);


    const [countData23, setCountData23] = useState([
        {
            type: '复试人数',
            major: '数据整理中，近期更新',
            value: 0,
        },
        {
            type: '录取人数',
            major: '数据整理中，近期更新',
            value: 0,
        },
    ]);

    useEffect(() => {
        getCountStaticInfoList23({'ids': window.localStorage.getItem('ids'),
            'businessType': 5,
        }).then(({data}) => {
            if(data.length>0){
                setCountData23(data);
            }
        });
    }, []);

    const config23 = {
        title: {
            visible: true,
            text: '23复试录取情况柱状图',
        },
        forceFit: true,
        data: countData23,
        xField: 'major',
        yField: 'value',
        yAxis: { min: 0 },
        label: { visible: true },
        groupField: 'type',
        color: ['#1ca9e6', '#f88c24'],
    };

    const [countData24, setCountData24] = useState([
        {
            type: '复试人数',
            major: '数据整理中，近期更新',
            value: 0,
        },
        {
            type: '录取人数',
            major: '数据整理中，近期更新',
            value: 0,
        },
    ]);

    useEffect(() => {
        getCountStaticInfoList24({'ids': window.localStorage.getItem('ids'),
            'businessType': 5,
        }).then(({data}) => {
            if(data.length>0){
                setCountData24(data);
            }
        });
    }, []);

    const config24 = {
        title: {
            visible: true,
            text: '24复试录取情况柱状图',
        },
        forceFit: true,
        data: countData24,
        xField: 'major',
        yField: 'value',
        yAxis: { min: 0 },
        label: { visible: true },
        groupField: 'type',
        color: ['#1ca9e6', '#f88c24'],
    };

    const [countData, setCountData] = useState([
        {
            type: '复试人数',
            major: '数据缺失',
            value: 0,
        },
        {
            type: '录取人数',
            major: '数据缺失',
            value: 0,
        },
    ]);

    useEffect(() => {
        console.info(window.localStorage.getItem('ids'));
        getCountStaticInfoList({'ids': window.localStorage.getItem('ids'),
            'businessType': 5,
        }).then(({data}) => {
            console.info(data);
            setCountData(data);
        });
    }, []);

    const [listStaticData, setListStaticData] = useState([]);

    useEffect(() => {
        console.info(window.localStorage.getItem('ids'));
        listStaticInfo({'ids': window.localStorage.getItem('ids'),
            'businessType': 5,
        }).then(({data}) => {
            console.info(data);
            setListStaticData(data);
        });
    }, []);

    let [scoreTrendData, setScoreTrendData] = useState([]);

    useEffect(() => {
        getScoreTrend({
            'ids': window.localStorage.getItem('ids'),
            'businessType': 5,
        }).then(({data}) => {
            console.info(data);
            setScoreTrendData(data);
        });
    }, []);

    const visitData = [];
    const beginDay = new Date().getTime();
    for (let i = 0; i < 20; i += 1) {
        visitData.push({
            x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
            y: Math.floor(Math.random() * 100) + 10,
        });
    }

    const lineConfig = {
        data: scoreTrendData,
        xField: 'year',
        yField: 'value',
        seriesField: 'majorName',
        xAxis: {
            type: 'time',
        },
        yAxis: {
            label: {
                // 数值格式化为千分位
                formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
            },
        },
        // X 轴相关配置
        xAxis: {
            nice: true,
            // tickCount: 8,
            // 文本标签
            label: {
                // autoRotate: false,
                rotate: Math.PI / 6,
                offset: 10,
                style: {
                    fill: '#aaa',
                    fontSize: 12,
                },
                formatter: (name) => name,
            },
            title: {
                text: '年份',
                style: {
                    fontSize: 16,
                },
            },
            // 坐标轴线的配置项 null 表示不展示
            line: {
                style: {
                    stroke: '#aaa',
                },
            },
            tickLine: {
                style: {
                    lineWidth: 2,
                    stroke: '#aaa',
                },
                length: 5,
            },
            grid: {
                line: {
                    style: {
                        stroke: '#ddd',
                        lineDash: [4, 2],
                    },
                },
                alternateColor: 'rgba(0,0,0,0.05)',
            },
        },
        // Y 轴相关配置
        yAxis: {
            min: 250,
            max: 400,
            // 文本标签
            label: {
                autoRotate: false,
                style: {
                    fill: '#aaa',
                    fontSize: 12,
                },
                // 数值格式化为千分位
                formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
            },
            title: {
                text: '历年初试分数线',
                style: {
                    fontSize: 16,
                },
            },
            // 坐标轴线的配置项 null 表示不展示
            line: {
                style: {
                    stroke: '#aaa',
                },
            },
            tickLine: {
                style: {
                    lineWidth: 2,
                    stroke: '#aaa',
                },
                length: 5,
            },
            grid: {
                line: {
                    style: {
                        stroke: '#ddd',
                        lineDash: [4, 2],
                    },
                },
                alternateColor: 'rgba(0,0,0,0.05)',
            },
        },
        // label
        label: {
            layout: [
                {
                    type: 'hide-overlap',
                },
            ],
            // 隐藏重叠label
            style: {
                textAlign: 'right',
            },
            formatter: (item) => item.value,
        },
        // point
        point: {
            size: 5,
            style: {
                lineWidth: 1,
                fillOpacity: 1,
            },
            shape: (item) => {
                if (item.category === 'Cement production') {
                    return 'circle';
                }

                return 'diamond';
            },
        },
        annotations: [],
        legend: {
            position: 'top-right',
            itemName: {
                style: {
                    fill: '#000',
                },
                formatter: (name) => name,
            },
        },
        // 度量相关配置
        meta: {
            // year 对应 xField || yField
            year: {
                range: [0, 1],
            },
        },
    };


    const columns: ProColumns<API.RuleListItem>[] = [
        {
            title: <FormattedMessage id="pages.searchTable.provinceName" defaultMessage=""/>,
            dataIndex: 'provinceName',
            valueType: 'textarea',
            hideInSearch: true
        },
        {
            title: (
                <FormattedMessage
                    id="pages.searchTable.schoolName"
                    defaultMessage="学校名称"
                />
            ),
            dataIndex: 'schoolName',
        },
        {
            title: <FormattedMessage id="pages.searchTable.departmentName" defaultMessage="学院名称"/>,
            dataIndex: 'departmentName',
            valueType: 'textarea',
        },
        {
            title: <FormattedMessage id="pages.searchTable.majorName" defaultMessage="专业名称"/>,
            dataIndex: 'majorName',
            valueType: 'textarea',
            hideInSearch: true
        },
        {
            title: <FormattedMessage id="pages.searchTable.majorTrend" defaultMessage="专业方向"/>,
            dataIndex: 'majorTrend',
            valueType: 'textarea',
            hideInSearch: true
        },
        {
            title: <FormattedMessage id="pages.searchTable.averageScore" defaultMessage="近4年平均复试分数线"/>,
            dataIndex: 'averageScore',
            valueType: 'textarea',
            hideInSearch: true
        },
        {
            title: <FormattedMessage id="pages.searchTable.score24" defaultMessage="24年复试分数线"/>,
            dataIndex: 'score24',
            valueType: 'textarea',
            hideInSearch: true
        },
        {
            title: <FormattedMessage id="pages.searchTable.score23" defaultMessage="23年复试分数线"/>,
            dataIndex: 'score23',
            valueType: 'textarea',
            hideInSearch: true
        },
        {
            title: <FormattedMessage id="pages.searchTable.score22" defaultMessage="22年复试分数线"/>,
            dataIndex: 'score22',
            valueType: 'textarea',
            hideInSearch: true
        },
        {
            title: <FormattedMessage id="pages.searchTable.score21" defaultMessage="21年复试分数线"/>,
            dataIndex: 'score21',
            valueType: 'textarea',
            hideInSearch: true
        },
        {
            title: <FormattedMessage id="pages.searchTable.score20" defaultMessage="20年复试分数线"/>,
            dataIndex: 'score20',
            valueType: 'textarea',
            hideInSearch: true
        },
        {
            title: <FormattedMessage id="pages.searchTable.score19" defaultMessage="19年复试分数线"/>,
            dataIndex: 'score19',
            valueType: 'textarea',
            hideInSearch: true
        },
        {
            title: <FormattedMessage id="pages.searchTable.luquScoreMin23" defaultMessage="23年录取最低分" />,
            dataIndex: 'luquScoreMin23',
            valueType: 'textarea',
            width: 50,
            hideInSearch: true
        },
        {
            title: <FormattedMessage id="pages.searchTable.luquScoreAvg23" defaultMessage="23年录取平均分" />,
            dataIndex: 'luquScoreAvg23',
            valueType: 'textarea',
            width: 50,
            hideInSearch: true
        },
        {
            title: <FormattedMessage id="pages.searchTable.luquScoreMax23" defaultMessage="23年录取最高分" />,
            dataIndex: 'luquScoreMax23',
            valueType: 'textarea',
            width: 50,
            hideInSearch: true
        },
        {
            title: <FormattedMessage id="pages.searchTable.luquScoreMin22" defaultMessage="22年录取最低分" />,
            dataIndex: 'luquScoreMin22',
            valueType: 'textarea',
            width: 50,
            hideInSearch: true
        },
        {
            title: <FormattedMessage id="pages.searchTable.luquScoreAvg22" defaultMessage="22年录取平均分" />,
            dataIndex: 'luquScoreAvg22',
            valueType: 'textarea',
            width: 50,
            hideInSearch: true
        },
        {
            title: <FormattedMessage id="pages.searchTable.luquScoreMax22" defaultMessage="22年录取最高分" />,
            dataIndex: 'luquScoreMax22',
            valueType: 'textarea',
            width: 50,
            hideInSearch: true
        },
        {
            title: <FormattedMessage id="pages.searchTable.24fushi" defaultMessage="24复试人数" />,
            dataIndex: 'fushiCount24Str',
            valueType: 'textarea',
            hideInSearch: true
        },
        {
            title: <FormattedMessage id="pages.searchTable.24luqu" defaultMessage="24计划录取人数" />,
            dataIndex: 'luquCount24Str',
            valueType: 'textarea',
            hideInSearch: true,
            sorter: (a, b) => {
                if(a.luquCount24Str === '整理中' && b.luquCount24Str !== '整理中'){
                    return -1;
                }else if(a.luquCount24Str !== '整理中' && b.luquCount24Str === '整理中'){
                    return 1;
                } else{
                    return a.luquCount24Str.localeCompare(b.luquCount24Str);
                }
            }
        },
        {
            title: <FormattedMessage id="pages.searchTable.23fushi" defaultMessage="23复试人数" />,
            dataIndex: 'fushiCount23Str',
            valueType: 'textarea',
            hideInSearch: true
        },
        {
            title: <FormattedMessage id="pages.searchTable.23luqu" defaultMessage="23计划录取人数" />,
            dataIndex: 'luquCount23Str',
            valueType: 'textarea',
            hideInSearch: true,
            sorter: (a, b) => {
                if(a.luquCount23Str === '整理中' && b.luquCount23Str !== '整理中'){
                    return -1;
                }else if(a.luquCount23Str !== '整理中' && b.luquCount23Str === '整理中'){
                    return 1;
                } else{
                    return a.luquCount23Str.localeCompare(b.luquCount23Str);
                }
            }
        },
        {
            title: <FormattedMessage id="pages.searchTable.22fushi" defaultMessage="22复试人数" />,
            dataIndex: 'fushiCount22',
            valueType: 'textarea',
            hideInSearch: true
        },
        {
            title: <FormattedMessage id="pages.searchTable.22luqu" defaultMessage="22录取人数" />,
            dataIndex: 'luquCount22',
            valueType: 'textarea',
            hideInSearch: true
        },
        {
            title: <FormattedMessage id="pages.searchTable.fushiLuquRatio" defaultMessage="22年复录比" />,
            dataIndex: 'fushiLuquRatio',
            valueType: 'textarea',
            hideInSearch: true
        },
        {
            title: <FormattedMessage id="pages.searchTable.chushiRatio" defaultMessage="总成绩初试占比" />,
            dataIndex: 'chushiRatio',
            valueType: 'textarea',
            hideInSearch: true
        },
        {
            title: <FormattedMessage id="pages.searchTable.math" defaultMessage="数学"/>,
            dataIndex: 'math',
            valueType: 'textarea',
        },
        {
            title: <FormattedMessage id="pages.searchTable.english" defaultMessage="英语"/>,
            dataIndex: 'english',
            valueType: 'textarea',
        },
        {
            title: <FormattedMessage id="pages.searchTable.majorCourse" defaultMessage="专业课"/>,
            dataIndex: 'majorCourse',
            valueType: 'textarea',
        },
        {
            title: <FormattedMessage id="pages.searchTable.majorCourseCount" defaultMessage="专业课科目数量"/>,
            dataIndex: 'majorCourseCount',
            valueType: 'textarea',
        },
        {
            title: <FormattedMessage id="pages.searchTable.averageScoreMin"
                                     defaultMessage="平均复试线下限"/>,
            dataIndex: 'averageScoreMin',
            valueType: 'digit',
            hideInTable: true
        },
        {
            title: <FormattedMessage id="pages.searchTable.averageScoreMax"
                                     defaultMessage="平均复试线上限"/>,
            dataIndex: 'averageScoreMax',
            valueType: 'digit',
            hideInTable: true
        },
        {
            title: <FormattedMessage id="pages.searchTable.score21Min"
                                     defaultMessage="21年复试线下限"/>,
            dataIndex: 'score21Min',
            valueType: 'digit',
            hideInTable: true
        },
        {
            title: <FormattedMessage id="pages.searchTable.score21Max"
                                     defaultMessage="21年复试线上限"/>,
            dataIndex: 'score21Max',
            valueType: 'digit',
            hideInTable: true
        },
        {
            title: <FormattedMessage id="pages.searchTable.tuitionFee" defaultMessage="学费"/>,
            dataIndex: 'tuitionFee',
            valueType: 'textarea',
            hideInSearch: true
        },
        {
            title: <FormattedMessage id="pages.searchTable.lengthOfCourse" defaultMessage="学制"/>,
            dataIndex: 'lengthOfCourse',
            valueType: 'textarea',
            hideInSearch: true
        },
        {
            title: '操作',
            width: 80,
            key: 'option',
            valueType: 'option',
            fixed: 'right',
            render: (text, record, _, action) => [
                <a
                    key="editable"
                    onClick={() => {
                        let idsText = window.localStorage.getItem('ids') as string;
                        let ids: string[] = [];
                        if (idsText !== null && idsText !== undefined) {
                            ids = idsText.split(',');
                        }
                        let newIds: string[] = [];
                        for (let i = 0; i !== ids.length; ++i) {
                            if (ids[i] !== record.id.toString()) {
                                newIds.push(ids[i]);
                            }
                        }
                        window.localStorage.setItem('ids', newIds.toString());
                        console.info(ids.toString());
                        alert('移除成功!');
                    }}
                >
                    从自选移除
                </a>],
        },
    ];


    const config = {
        title: {
            visible: true,
            text: '22复试录取情况柱状图',
        },
        forceFit: true,
        data: countData,
        xField: 'major',
        yField: 'value',
        yAxis: { min: 0 },
        label: { visible: true },
        groupField: 'type',
        color: ['#1ca9e6', '#f88c24'],
    };
    return (
        <PageContainer title={'自选比较综合分析'}>
            <Card title='说明'>
                用户可以在综合查询、院校详情、分类排行榜等页面选择符合自己要求的专业加入自选，本模块会针对这些自选专业进行
                大数据分析、初试分数线走势对比、专业近4年考研数据详细对比等，可以显著提升择校效率。<br></br>
                <b>{notice}</b>
            </Card>
            <Card style={{marginTop: 15}}>
                <ProDescriptions column={2} title="大数据分析">
                    <ProDescriptions.Item
                        label="统计专业数量"
                    >
                        {listStaticData.majorCount}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        label="408专业数量"
                    >
                        {listStaticData.major408Count}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        label="考1门专业数量"
                    >
                        {listStaticData.major1Count}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        label="考2门专业数量"
                    >
                        {listStaticData.major2Count}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        label="学硕数量"
                    >
                        {listStaticData.xcount22}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        label="专硕数量"
                    >
                        {listStaticData.zcount22}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        label="22复试线平均值"
                    >
                        {listStaticData.avgScore22}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        label="21复试线平均值"
                    >
                        {listStaticData.avgScore21}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        label="学硕22复试线平均值"
                    >
                        {listStaticData.xavgScore22}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        label="学硕21复试线平均值"
                    >
                        {listStaticData.xavgScore21}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        label="专硕22复试线平均值"
                    >
                        {listStaticData.zavgScore22}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        label="专硕21复试线平均值"
                    >
                        {listStaticData.zavgScore21}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        label="22复试线最高值"
                    >
                        {listStaticData.maxScore22}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        label="22复试线最低值"
                    >
                        {listStaticData.minScore22}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        label="学硕22复试线最高值"
                    >
                        {listStaticData.xmaxScore22}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        label="学硕22复试线最低值"
                    >
                        {listStaticData.xminScore22}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        label="专硕22复试线最高值"
                    >
                        {listStaticData.zmaxScore22}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        label="专硕22复试线最低值"
                    >
                        {listStaticData.zminScore22}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        label="22复录比平均值"
                    >
                        {listStaticData.avgFlb22}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        label="22复录比最大值"
                    >
                        {listStaticData.maxFlb22}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        label="22录取人数平均值"
                    >
                        {listStaticData.avgCount22}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        label="22录取人数最大值"
                    >
                        {listStaticData.maxCount22}
                    </ProDescriptions.Item>
                </ProDescriptions>
            </Card>
            <Card style={{marginTop: 15}}>
                <ProDescriptions column={2} title="初试分数线走势图">
                </ProDescriptions>
                <Line {...lineConfig} />
            </Card>
            <Card style={{marginTop: 15}}>
                <ProDescriptions column={2} title="24复试录取情况汇总">
                </ProDescriptions>
                <GroupedColumn {...config24} />
            </Card>
            <Card style={{marginTop: 15}}>
                <ProDescriptions column={2} title="23复试录取情况汇总">
                </ProDescriptions>
                <GroupedColumn {...config23} />
            </Card>
            <Card style={{marginTop: 15}}>
                <ProDescriptions column={2} title="22复试录取情况汇总">
                </ProDescriptions>
                <GroupedColumn {...config} />
            </Card>
            <Card style={{marginTop: 15}}>
                <ProDescriptions column={2} title="各专业考研信息汇总表">
                </ProDescriptions>
                <ProTable<API.RuleListItem, API.PageParams>
                    headerTitle={intl.formatMessage({
                        id: 'pages.searchTable.title',
                        defaultMessage: 'Enquiry form',
                    })}
                    rowKey="key"
                    toolBarRender={false}
                    dataSource={tableData}
                    columns={columns}
                    search={false}
                />
            </Card>
        </PageContainer>
    );
};

export default Page;
