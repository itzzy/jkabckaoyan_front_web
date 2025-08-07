import React, {useEffect, useState} from 'react';

import {PageContainer} from "@ant-design/pro-layout";
import {Card} from "antd";
import {Column} from '@ant-design/plots';
import domtoimage from 'dom-to-image';
import saveAs from 'file-saver';
import ReactMarkdown from "react-markdown";
import ProTable, {ProColumns} from "@ant-design/pro-table";
import {FormattedMessage, useIntl} from "@@/plugin-locale/localeExports";
import ProDescriptions from "@ant-design/pro-descriptions";
import {Line} from "@ant-design/charts";
import {getRankBasicInfo, getReportData} from "@/services/ant-design-pro/api";


const Page: React.FC = () => {


  let [reportData, setReportData] = useState([
      {
      divType: 'md',
      title: '系统加载中',
      elementId: 'md-1',
      data:`
# 由于数据类过大（近百页），网络传输较慢，加载需要半分钟左右的时间，敬请耐心等待，加载完毕后建议保存为pdf离线阅读
      `}
  ]);


    useEffect( () => {
    getReportData({'userName':'张三'}).then(({data})=>{
      console.info(data);
      setReportData(data);
    });
  },[]);

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: <FormattedMessage id="pages.searchTable.index" defaultMessage="排名"/>,
      dataIndex: 'index',
      valueType: 'textarea',
      hideInSearch: true
    },
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
    }
  ];

  useEffect(() => {
    setTimeout(
      () => {
        let chartNode = document.getElementById('line-1');
        domtoimage.toBlob(chartNode)
          .then((blob) => {
            // saveAs(blob, "char1.png");
          })
      }, 2000
    )
  }, []);

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

  const paletteSemanticRed = '#F4664A';
  const brandColor = '#5B8FF9';

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


  return (

    <PageContainer>
      {
        reportData.map(({divType, title, elementId, data}) => {
          console.info("here2");
          console.info(data)
          if (divType === 'line') {
            lineConfig.data = data;
            return <Card id={elementId} style={{marginTop: 5}} title={title}>
              <Line {...lineConfig} />
            </Card>
          }
          if (divType === 'table') {
            // return <Card id={elementId} style={{marginTop: 15}} title={title}>
            //   <ReactMarkdown>{data}</ReactMarkdown>
            // </Card>
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
          if (divType === 'other') {
            console.info("md")
            console.info(title)
            console.info(data)
            return <Card id={elementId} style={{marginTop: 15}} title={title}>
              <ReactMarkdown>{data}</ReactMarkdown>
            </Card>
          }
        })
      }

    </PageContainer>
  );
};

export default Page;
