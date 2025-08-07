import React, {useEffect, useState} from 'react';
import moment from 'moment';

import {PageContainer} from "@ant-design/pro-layout";
import {
  getCountStaticInfoList, getCountStaticInfoList23,
  getSchoolBasicInfo,
  getScoreTrend,
  listStaticInfo,
  schoolDetailSearch
} from "@/services/ant-design-pro/api";
import ProTable, {ProColumns} from "@ant-design/pro-table";
import {FormattedMessage, useIntl} from "@@/plugin-locale/localeExports";
import ProDescriptions from '@ant-design/pro-descriptions';

import {useParams} from "umi";
import {Card} from "antd";
import {GroupedColumn, Line} from '@ant-design/charts';
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

  const [listStaticData, setListStaticData] = useState([]);

  useEffect(() => {
    console.info(window.localStorage.getItem('ids'));
    listStaticInfo({'schoolName':schoolName}).then(({data}) => {
      console.info(data);
      setListStaticData(data);
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
    getCountStaticInfoList23({'schoolName':schoolName}).then(({data}) => {
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
    getCountStaticInfoList({'schoolName':schoolName}).then(({data}) => {
      if(data.length>0){
        setCountData(data);
      }
    });
  }, []);

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
      title: <FormattedMessage id="pages.searchTable.score19" defaultMessage="19年复试分数线" />,
      dataIndex: 'score19',
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
      title: <FormattedMessage id="pages.searchTable.score21" defaultMessage="21年复试分数线" />,
      dataIndex: 'score21',
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
      title: <FormattedMessage id="pages.searchTable.score23" defaultMessage="23年复试分数线" />,
      dataIndex: 'score23',
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
      title: <FormattedMessage id="pages.searchTable.averageScore" defaultMessage="近5年平均复试分数线" />,
      dataIndex: 'averageScore',
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
              for(let i=0;i!==ids.length;++i){
                if(ids[i] === record.id.toString()){
                  alert('已在自选列表，无需重复添加!');
                  return;
                }
              }
              if(ids.length >= 20){
                alert('最多只能添加20个专业!');
                return;
              }
              ids.push(record.id);
              window.localStorage.setItem('ids', ids.toString());
              console.info(ids.toString());
              alert('添加成功!');
            }}
        >
          添加到自选
        </a>],
    },
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
      <Card style={{ marginTop: 15 }}>
        <ProDescriptions column={2} title="初试分数线走势图">
        </ProDescriptions>
        <Line {...lineConfig} />
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
