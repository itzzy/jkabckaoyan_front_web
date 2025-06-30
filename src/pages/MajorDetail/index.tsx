import React, {useEffect, useState} from 'react';

import {PageContainer} from "@ant-design/pro-layout";
import {Card} from "antd";
import {Column, Pie} from '@ant-design/plots';
import domtoimage from 'dom-to-image';
import saveAs from 'file-saver';
import ReactMarkdown from "react-markdown";
import ProTable, {ProColumns} from "@ant-design/pro-table";
import {FormattedMessage, useIntl} from "@@/plugin-locale/localeExports";
import ProDescriptions from "@ant-design/pro-descriptions";
import {Line} from "@ant-design/charts";
import ReactDOM from 'react-dom';
import {getMajorDetail, getRankBasicInfo, getReportData} from "@/services/ant-design-pro/api";


const Page: React.FC = () => {
  const pieData = [
    {
      type: '50分以下',
      value: 27,
    },
    {
      type: '50分-60分',
      value: 25,
    },
    {
      type: '60分-70分',
      value: 18,
    },
    {
      type: '70分-80分',
      value: 15,
    },
    {
      type: '80分-90分',
      value: 10,
    },
    {
      type: '90分-100分',
      value: 5,
    },
  ];
  const columnConfig = {
    data:pieData,
    xField: 'type',
    yField: 'value',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      sales: {
        alias: '销售额',
      },
    },
  };
  const pieConfig = {
    appendPadding: 10,
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };

  const defalutData = [
    {year: '1991', value: 3},
    {year: '1992', value: 4},
    {year: '1993', value: 3.5},
    {year: '1994', value: 5},
    {year: '1995', value: 4.9},
    {year: '1996', value: 6},
    {year: '1997', value: 7},
    {year: '1998', value: 9},
    {year: '1999', value: 13},
  ];

  const lineConfig = {
    data: defalutData,
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

  let [reportData, setReportData] = useState([
    {
      divType: 'md',
      title: '系统加载中',
      elementId: 'md-1',
      data: `
# 由于数据类过大，网络传输较慢，敬请耐心等待。
      `
    }
  ]);


    useEffect( () => {
    getMajorDetail({'userName':'张三'}).then(({data})=>{
      console.info(data);
      setReportData(data);
    });
  },[]);

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: <FormattedMessage id="pages.searchTable.not.defined" defaultMessage="序号"/>,
      dataIndex: 'index',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.not.defined" defaultMessage="年份"/>,
      dataIndex: 'admissionYear',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.not.defined" defaultMessage="政治"/>,
      dataIndex: 'politicScore',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.not.defined" defaultMessage="英语"/>,
      dataIndex: 'englishScore',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.not.defined" defaultMessage="数学"/>,
      dataIndex: 'mathScore',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.not.defined" defaultMessage="专业课"/>,
      dataIndex: 'majorCourseScore',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.not.defined" defaultMessage="初试总分"/>,
      dataIndex: 'firstTestTotalScore',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.not.defined" defaultMessage="复试总分"/>,
      dataIndex: 'reTestTotalScoreText',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.not.defined" defaultMessage="总成绩"/>,
      dataIndex: 'sumTotalScoreText',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.not.defined" defaultMessage="是否录取"/>,
      dataIndex: 'admissionResult',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.not.defined" defaultMessage="说明"/>,
      dataIndex: 'attention',
      valueType: 'textarea',
      hideInSearch: true
    }
  ];


  return (

    <PageContainer>
      {
        reportData.map(({divType, title, elementId, data}) => {
          console.info("here2");
          console.info(data)
          if (divType === 'basicInfo') {
            lineConfig.data = data;
            return <Card>
              <ProDescriptions column={2} title="专业信息">
                <ProDescriptions.Item
                  label="学校名称"
                >
                  {data.schoolName}
                </ProDescriptions.Item>
                <ProDescriptions.Item
                  label="专业名称"
                >
                  {data.majorName}
                </ProDescriptions.Item>
                <ProDescriptions.Item
                  label="学校分类"
                >
                  {data.schoolRankTag}
                </ProDescriptions.Item>
                <ProDescriptions.Item
                  label="省份"
                >
                  {data.province}
                </ProDescriptions.Item>
                <ProDescriptions.Item
                  label="学习方式"
                >
                  {data.learningType}
                </ProDescriptions.Item>
                <ProDescriptions.Item
                  label="学校计算机学科排名"
                >
                  {data.csRankTag}
                </ProDescriptions.Item>
                <ProDescriptions.Item
                  label="学校软件工程学科排名"
                >
                  {data.seRankTag}
                </ProDescriptions.Item>
                <ProDescriptions.Item
                  label="考研地区"
                >
                  {data.areaTag}
                </ProDescriptions.Item>
              </ProDescriptions>
            </Card>
          }
          if (divType === 'line') {
            lineConfig.data = data;
            return <Card id={elementId} style={{marginTop: 5}} title={title}>
              <Line {...lineConfig} />
            </Card>
          }
          if (divType === 'pie') {
            pieConfig.data = data;
            return <Card id={elementId} style={{marginTop: 5}} title={title}>
              <Pie {...pieConfig} />;
            </Card>
          }
          if (divType === 'column') {
            columnConfig.data = pieData;
            return <Card id={elementId} style={{marginTop: 5}} title={title}>
              <Column {...columnConfig} />;
            </Card>
          }
          if (divType === 'table') {
            return <Card style={{marginTop: 5}} title={title}>
              <ProTable<API.RuleListItem, API.PageParams>
                rowKey="key"
                toolBarRender={false}
                defaultData={data}
                columns={columns}
                search={false}
              />
            </Card>
          }
          if (divType === 'md') {
            console.info("md here")
            return <Card id={elementId} style={{marginTop: 5}} title={title}>
              <ReactMarkdown>{data}</ReactMarkdown>
            </Card>
          }
          // if (divType === 'other') {
          //   console.info("md")
          //   console.info(title)
          //   console.info(data)
          //   return <Card id={elementId} style={{marginTop: 15}} title={title}>
          //     <ReactMarkdown>{data}</ReactMarkdown>
          //   </Card>
          // }
        })
      }

    </PageContainer>
  );
};

export default Page;
