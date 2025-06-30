import React, {useEffect, useState} from 'react';
import numeral from 'numeral';
import moment from 'moment';

import {PageContainer} from "@ant-design/pro-layout";
import {getSchoolBasicInfo, getScoreTrend, schoolDetailSearch} from "@/services/ant-design-pro/api";
import ProTable, {ProColumns} from "@ant-design/pro-table";
import {FormattedMessage, useIntl} from "@@/plugin-locale/localeExports";
import ProDescriptions from '@ant-design/pro-descriptions';

import {useParams} from "umi";
import {Card} from "antd";
import { Line } from '@ant-design/charts';
import ReactMarkdown from "react-markdown";

const Page: React.FC = () => {

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  let {schoolName} = useParams();
  console.info(schoolName);
  if(schoolName == '' || schoolName == ':schoolName'){
    schoolName = '北京大学';
  }

  const [schoolBasicInfo, setSchoolBasicInfo] = useState([
  ]);

  useEffect( () => {
    getSchoolBasicInfo({'schoolName':schoolName}).then(({data})=>{
      console.info(data);
      console.info(data.schoolName);

      setSchoolBasicInfo(data);
    });
  },[]);


  const [tableData, setTableData] = useState([
  ]);

  useEffect( () => {
    schoolDetailSearch({'schoolName':schoolName, 'verifyCode':'6875'}).then(({data})=>{
      console.info(data);
      setTableData(data);
    });
  },[]);

  let [scoreTrendData, setScoreTrendData] = useState([
  ]);

  useEffect( () => {
    getScoreTrend({'schoolName':schoolName}).then(({data})=>{
      console.info(data);
      setScoreTrendData(data);
    });
  },[]);

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
    annotations: [
      // 辅助线
      // {
      //   type: 'line',
      //   start: ['0%', '10%'],
      //   end: ['100%', '10%'],
      //   top: true,
      //   style: {
      //     stroke: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
      //     lineWidth: 2,
      //   },
      // }, // 辅助区域
      // {
      //   type: 'region',
      //   start: ['0%', '0%'],
      //   end: ['20%', '10%'],
      //   top: true,
      //   style: {
      //     fill: '#1890ff',
      //     fillOpacity: 1,
      //     opacity: 1,
      //   },
      // }, // 辅助文本
      // {
      //   type: 'text',
      //   position: ['10%', '5%'],
      //   content: '初试分数线走势图',
      //   style: {
      //     fill: '#fff',
      //     fontSize: 12,
      //     textAlign: 'center',
      //     textBaseline: 'middle',
      //     shadowColor: '#fff',
      //     shadowOffsetX: 12,
      //     shadowOffsetY: 12,
      //     shadowBlur: 2,
      //   },
      // }, // 辅助线
      // {
      //   type: 'line',
      //   start: ['min', 'median'],
      //   end: ['max', 'median'],
      //   style: {
      //     stroke: 'Turquoise',
      //     lineDash: [4, 2],
      //   },
      // },
    ],
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
      title: <FormattedMessage id="pages.searchTable.provinceName" defaultMessage="" />,
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
      initialValue: schoolName
    },
    {
      title: <FormattedMessage id="pages.searchTable.departmentName" defaultMessage="学院名称" />,
      dataIndex: 'departmentName',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.majorName" defaultMessage="专业名称" />,
      dataIndex: 'majorName',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.majorTrend" defaultMessage="专业方向" />,
      dataIndex: 'majorTrend',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.averageScore" defaultMessage="近4年平均复试分数线" />,
      dataIndex: 'averageScore',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.score22" defaultMessage="22年复试分数线" />,
      dataIndex: 'score22',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.score21" defaultMessage="21年复试分数线" />,
      dataIndex: 'score21',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.score20" defaultMessage="20年复试分数线" />,
      dataIndex: 'score20',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.score19" defaultMessage="19年复试分数线" />,
      dataIndex: 'score19',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.math" defaultMessage="数学" />,
      dataIndex: 'math',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.english" defaultMessage="英语" />,
      dataIndex: 'english',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.majorCourse" defaultMessage="专业课" />,
      dataIndex: 'majorCourse',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.majorCourseCount" defaultMessage="专业课科目数量" />,
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
      title: <FormattedMessage id="pages.searchTable.tuitionFee" defaultMessage="学费" />,
      dataIndex: 'tuitionFee',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.lengthOfCourse" defaultMessage="学制" />,
      dataIndex: 'lengthOfCourse',
      valueType: 'textarea',
      hideInSearch: true
    }
  ];

  return (
    <PageContainer title={schoolName}>
      <Card>
        <ProDescriptions column={2} title="学校信息">
          <ProDescriptions.Item
            label="学校分类"
          >
            {schoolBasicInfo.schoolRankTag}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="省份"
          >
            {schoolBasicInfo.province}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="计算机学科排名"
          >
            {schoolBasicInfo.csRankTag}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="软件工程学科排名"
          >
            {schoolBasicInfo.seRankTag}
          </ProDescriptions.Item>

          <ProDescriptions.Item
            label="考研地区"
          >
            {schoolBasicInfo.areaTag}
          </ProDescriptions.Item>
        </ProDescriptions>
      </Card>
      <Card style={{ marginTop: 15 }}>
        <ProDescriptions column={2} title="初试分数线走势图">
        </ProDescriptions>
        <Line {...lineConfig} />
      </Card>
      <Card style={{ marginTop: 15 }}>
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

      <Card style={{ marginTop: 15 }}>
        <ReactMarkdown>{schoolBasicInfo.detailMarkdown}</ReactMarkdown>
      </Card>

    </PageContainer>
  );
};

export default Page;
