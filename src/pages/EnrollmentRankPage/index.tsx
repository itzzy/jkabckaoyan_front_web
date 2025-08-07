import React, {useEffect, useState} from 'react';
import moment from 'moment';

import {PageContainer} from "@ant-design/pro-layout";
import {
  enrollmentRankQuery,
  getEnrollmentRankBasicInfo,
  getRankBasicInfo, getRankScoreTrend,
  getSchoolBasicInfo,
  getScoreTrend,
  rankQuery,
  schoolDetailSearch
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

  let {rankName} = useParams();

  const [rankBasicInfo, setRankBasicInfo] = useState([
  ]);

  const [tableData, setTableData] = useState([
  ]);

  useEffect( () => {
    enrollmentRankQuery({'rankName':rankName}).then(({data})=>{
      console.info(data);
      setTableData(data);
    });
  },[]);

  useEffect( () => {
    getEnrollmentRankBasicInfo({'rankName':rankName}).then(({data})=>{
      console.info(data);
      setRankBasicInfo(data);
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


  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: <FormattedMessage id="pages.searchTable.index" defaultMessage="排名" />,
      dataIndex: 'index',
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
      title: <FormattedMessage id="pages.searchTable.majorRank" defaultMessage="专业排名" />,
      dataIndex: 'majorRank',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.applyCount22" defaultMessage="22报名人数" />,
      dataIndex: 'applyCount22',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.admissionCount22" defaultMessage="22录取人数" />,
      dataIndex: 'admissionCount22',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.enrollmentRatio22" defaultMessage="22报录比" />,
      dataIndex: 'enrollmentRatio22',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.baoSongCount22" defaultMessage="22保送人数" />,
      dataIndex: 'baoSongCount22',
      valueType: 'textarea',
      hideInSearch: true
    },
    // {
    //   title: <FormattedMessage id="pages.searchTable.applyCount21" defaultMessage="21报名人数" />,
    //   dataIndex: 'applyCount21',
    //   valueType: 'textarea',
    //   hideInSearch: true
    // },
    // {
    //   title: <FormattedMessage id="pages.searchTable.admissionCount21" defaultMessage="21录取人数" />,
    //   dataIndex: 'admissionCount21',
    //   valueType: 'textarea',
    //   hideInSearch: true
    // },
    {
      title: <FormattedMessage id="pages.searchTable.enrollmentRatio21" defaultMessage="21报录比" />,
      dataIndex: 'enrollmentRatio21',
      valueType: 'textarea',
      hideInSearch: true
    },
    // {
    //   title: <FormattedMessage id="pages.searchTable.baoSongCount21" defaultMessage="21保送人数" />,
    //   dataIndex: 'baoSongCount21',
    //   valueType: 'textarea',
    //   hideInSearch: true
    // },
    // {
    //   title: <FormattedMessage id="pages.searchTable.applyCount20" defaultMessage="20报名人数" />,
    //   dataIndex: 'applyCount20',
    //   valueType: 'textarea',
    //   hideInSearch: true
    // },
    // {
    //   title: <FormattedMessage id="pages.searchTable.admissionCount20" defaultMessage="20录取人数" />,
    //   dataIndex: 'admissionCount20',
    //   valueType: 'textarea',
    //   hideInSearch: true
    // },
    {
      title: <FormattedMessage id="pages.searchTable.enrollmentRatio20" defaultMessage="20报录比" />,
      dataIndex: 'enrollmentRatio20',
      valueType: 'textarea',
      hideInSearch: true
    },
    // {
    //   title: <FormattedMessage id="pages.searchTable.baoSongCount20" defaultMessage="20保送人数" />,
    //   dataIndex: 'baoSongCount22',
    //   valueType: 'textarea',
    //   hideInSearch: true
    // },
    // {
    //   title: <FormattedMessage id="pages.searchTable.applyCount19" defaultMessage="19报名人数" />,
    //   dataIndex: 'applyCount19',
    //   valueType: 'textarea',
    //   hideInSearch: true
    // },
    // {
    //   title: <FormattedMessage id="pages.searchTable.admissionCount19" defaultMessage="19录取人数" />,
    //   dataIndex: 'admissionCount19',
    //   valueType: 'textarea',
    //   hideInSearch: true
    // },
    {
      title: <FormattedMessage id="pages.searchTable.enrollmentRatio19" defaultMessage="19报录比" />,
      dataIndex: 'enrollmentRatio19',
      valueType: 'textarea',
      hideInSearch: true
    },
    // {
    //   title: <FormattedMessage id="pages.searchTable.baoSongCount19" defaultMessage="19保送人数" />,
    //   dataIndex: 'baoSongCount19',
    //   valueType: 'textarea',
    //   hideInSearch: true
    // },
  ];


  return (
    <PageContainer title={rankName}>

      <Card id="gradeTable" style={{ marginTop: 15 }}>
        <ProDescriptions column={2} title="报录比信息汇总表">
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
