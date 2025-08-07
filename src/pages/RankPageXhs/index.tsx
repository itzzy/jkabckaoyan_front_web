import React, {useEffect, useState} from 'react';
import moment from 'moment';

import {PageContainer} from "@ant-design/pro-layout";
import {
  getRankBasicInfo,
  rankQuery,
} from "@/services/ant-design-pro/api";
import ProTable, {ProColumns} from "@ant-design/pro-table";
import {FormattedMessage, useIntl} from "@@/plugin-locale/localeExports";
import ProDescriptions from '@ant-design/pro-descriptions';

import {useParams} from "umi";
import {Card} from "antd";
import ReactMarkdown from "react-markdown";
import { Image } from 'antd';
import domtoimage from 'dom-to-image';


const Page: React.FC = () => {

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const [rankBasicInfo, setRankBasicInfo] = useState([
  ]);

  let {style, rankName} = useParams();
  console.info(rankName);

  useEffect( () => {
    getRankBasicInfo({'style':style, 'rankName':rankName}).then(({data})=>{
      console.info(data);
      setRankBasicInfo(data);
    });
  },[]);


  if(rankName == '' || rankName == ':rankName'){
    rankName = 'defaultRank';
  }

  const [tableData, setTableData] = useState([
  ]);

  useEffect( () => {
    rankQuery({'rankName':rankName}).then(({data})=>{
      console.info(data);
      setTableData(data);
    });
  },[]);

  let [gradeTableSrc, setGradeTableSrc] = useState([
  ]);



  useEffect( () => {
    setTimeout(
      ()=>{
        let tableNode = document.getElementById('gradeTable');
        console.info(tableNode)
        domtoimage.toPng(tableNode)
          .then(function (dataUrl) {
            console.info(dataUrl)
            setGradeTableSrc(dataUrl)
          })
          .catch(function (error) {
            console.error('oops, something went wrong!', error);
          });
      }, 30000
    )
  },[]);

  const visitData = [];
  const beginDay = new Date().getTime();
  for (let i = 0; i < 20; i += 1) {
    visitData.push({
      x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
      y: Math.floor(Math.random() * 100) + 10,
    });
  }


  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: <FormattedMessage id="pages.searchTable.index" defaultMessage="排名" />,
      dataIndex: 'index',
      valueType: 'textarea',
      hideInSearch: true
    },
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
    <PageContainer title={rankName}>
      {/*<Card>*/}
      {/*  <ProDescriptions column={2} title="学校信息">*/}
      {/*    <ProDescriptions.Item*/}
      {/*      label="学校分类"*/}
      {/*    >*/}
      {/*      {schoolBasicInfo.schoolRankTag}*/}
      {/*    </ProDescriptions.Item>*/}
      {/*    <ProDescriptions.Item*/}
      {/*      label="省份"*/}
      {/*    >*/}
      {/*      {schoolBasicInfo.province}*/}
      {/*    </ProDescriptions.Item>*/}
      {/*    <ProDescriptions.Item*/}
      {/*      label="计算机学科排名"*/}
      {/*    >*/}
      {/*      {schoolBasicInfo.csRankTag}*/}
      {/*    </ProDescriptions.Item>*/}
      {/*    <ProDescriptions.Item*/}
      {/*      label="软件工程学科排名"*/}
      {/*    >*/}
      {/*      {schoolBasicInfo.seRankTag}*/}
      {/*    </ProDescriptions.Item>*/}

      {/*    <ProDescriptions.Item*/}
      {/*      label="考研地区"*/}
      {/*    >*/}
      {/*      {schoolBasicInfo.areaTag}*/}
      {/*    </ProDescriptions.Item>*/}
      {/*  </ProDescriptions>*/}
      {/*</Card>*/}
      {/*<Card id="gradeChart" style={{ marginTop: 15 }}>*/}
      {/*  <ProDescriptions column={2} title="初试分数线走势图">*/}
      {/*  </ProDescriptions>*/}
      {/*  <Line {...lineConfig} />*/}
      {/*</Card>*/}
      {/*<Card style={{ marginTop: 15 }}>*/}
      {/*  {*/}
      {/*    scoreTrendData.map((majorName,year,value)=>{*/}
      {/*      console.info("here2");*/}
      {/*      console.info(majorName)*/}
      {/*      return  <br>专业{majorName} 年份{year} 分数{value}</br>;*/}
      {/*    })*/}
      {/*  }*/}
      {/*</Card>*/}
      <Card id="gradeTable" style={{ marginTop: 15 }}>
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
        <ReactMarkdown>{rankBasicInfo.detailMarkdown}</ReactMarkdown>
      </Card>

      <Card style={{ marginTop: 15 }}>
        <Image
          src={gradeTableSrc}
        />
      </Card>

    </PageContainer>
  );
};

export default Page;
