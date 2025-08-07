import {Typography, Image, Card, Button} from 'antd';
import React, {useState, useRef, useEffect} from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {commonSearch, commonSearchForFreeVersion, isTrailUser} from '@/services/ant-design-pro/api';
import Title from "antd/lib/typography/Title";
import {GithubOutlined} from "@ant-design/icons";

const TableListFree: React.FC = () => {

  const actionRef = useRef<ActionType>();

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: (
          <FormattedMessage
              id="pages.searchTable.schoolName"
              defaultMessage="学校名称"
          />
      ),
      dataIndex: 'schoolName',
      fixed: 'left',
      width: 50,
      render: (dom, entity) => {
        return (
            <a href={'/school_detail/' + entity.schoolName}>
              {dom}
            </a>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.departmentName" defaultMessage="学院名称" />,
      dataIndex: 'departmentName',
      fixed: 'left',
      width: 80,
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.majorName" defaultMessage="专业名称" />,
      dataIndex: 'majorName',
      fixed: 'left',
      width: 80,
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.majorTrend" defaultMessage="专业方向" />,
      dataIndex: 'majorTrend',
      fixed: 'left',
      width: 50,
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.csRank" defaultMessage="学科排名" />,
      dataIndex: 'csRank',
      width: 50,
      sorter: (a, b) => {
        let map:Map<string, number> = new Map([['A+', 33], ['A', 32], ['A-', 31],
          ['B+', 23], ['B', 22], ['B-', 21],
          ['C+', 13], ['C', 12], ['C-', 11],
          ['未上榜', 0]]);
        let aValue: number = map.get(a.csRank)!;
        let bValue: number = map.get(b.csRank)!;
        console.info(a.csRank+":"+aValue+","+b.csRank+":"+bValue);
        return aValue - bValue;
      },
      valueEnum: {
        default: {
          text: (
              <FormattedMessage
                  id="pages.searchTable.csRank.default"
                  defaultMessage="all"
              />
          ),
          status: 'all',
        },
        aPlus: {
          text: (
              <FormattedMessage id="pages.searchTable.csRank.aPlus" defaultMessage="A+" />
          ),
          status: 'A+',
        },
        a: {
          text: (
              <FormattedMessage id="pages.searchTable.csRank.a" defaultMessage="A" />
          ),
          status: 'A',
        },
        aMinus: {
          text: (
              <FormattedMessage id="pages.searchTable.csRank.aMinus" defaultMessage="A-" />
          ),
          status: 'A-',
        },
        bPlus: {
          text: (
              <FormattedMessage id="pages.searchTable.csRank.bPlus" defaultMessage="B+" />
          ),
          status: 'A+',
        },
        b: {
          text: (
              <FormattedMessage id="pages.searchTable.csRank.b" defaultMessage="B" />
          ),
          status: 'A',
        },
        bMinus: {
          text: (
              <FormattedMessage id="pages.searchTable.csRank.bMinus" defaultMessage="B-" />
          ),
          status: 'A-',
        },
        cPlus: {
          text: (
              <FormattedMessage id="pages.searchTable.csRank.cPlus" defaultMessage="C+" />
          ),
          status: 'A+',
        },
        c: {
          text: (
              <FormattedMessage id="pages.searchTable.csRank.c" defaultMessage="C" />
          ),
          status: 'A',
        },
        cMinus: {
          text: (
              <FormattedMessage id="pages.searchTable.csRank.cMinus" defaultMessage="C-" />
          ),
          status: 'A-',
        },
        others: {
          text: (
              <FormattedMessage id="pages.searchTable.csRank.others" defaultMessage="未上榜" />
          ),
          status: '未上榜',
        },
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.math" defaultMessage="数学" />,
      dataIndex: 'math',
      width: 50,
      valueEnum: {
        default: {
          text: (
              <FormattedMessage
                  id="pages.searchTable.math.default"
                  defaultMessage="all"
              />
          ),
          status: 'default',
        },
        one: {
          text: (
              <FormattedMessage id="pages.searchTable.math.one" defaultMessage="数学一" />
          ),
          status: 'one',
        },
        two: {
          text: (
              <FormattedMessage id="pages.searchTable.math.two" defaultMessage="数学二" />
          ),
          status: 'two',
        },
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.english" defaultMessage="英语" />,
      dataIndex: 'english',
      width: 50,
      valueEnum: {
        default: {
          text: (
              <FormattedMessage
                  id="pages.searchTable.english.default"
                  defaultMessage="english"
              />
          ),
          status: 'english',
        },
        one: {
          text: (
              <FormattedMessage id="pages.searchTable.english.one" defaultMessage="英语一" />
          ),
          status: 'one',
        },
        two: {
          text: (
              <FormattedMessage id="pages.searchTable.english.two" defaultMessage="英语二" />
          ),
          status: 'two',
        },
        japanese: {
          text: (
              <FormattedMessage id="pages.searchTable.japanese" defaultMessage="日语" />
          ),
          status: 'japanese',
        },
        russian: {
          text: (
              <FormattedMessage id="pages.searchTable.russian" defaultMessage="俄语" />
          ),
          status: 'russian',
        },
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.majorCourse" defaultMessage="专业课" />,
      dataIndex: 'majorCourse',
      valueType: 'textarea',
      width: 200,
    },
    {
      title: <FormattedMessage id="pages.searchTable.schoolRank" defaultMessage="学校评级" />,
      dataIndex: 'schoolRank',
      hideInForm: true,
      sorter: (a, b) => {
        let map:Map<string, number> = new Map([['985', 30], ['211', 20], ['normal', 10]]);
        let aValue: number = map.get(a.schoolRank)!;
        let bValue: number = map.get(b.schoolRank)!;
        return aValue - bValue;
      },
      valueEnum: {
        all: {
          text: (
            <FormattedMessage
              id="pages.searchTable.schoolRank.default"
              defaultMessage="all"
            />
          ),
          status: 'default',
        },
        985: {
          text: (
            <FormattedMessage id="pages.searchTable.schoolRank.985" defaultMessage="985" />
          ),
          status: '985',
        },
        211: {
          text: (
            <FormattedMessage id="pages.searchTable.schoolRank.211" defaultMessage="211" />
          ),
          status: '211',
        },
        normal: {
          text: (
            <FormattedMessage
              id="pages.searchTable.schoolRank.normal"
              defaultMessage="双非"
            />
          ),
          status: 'normal',
        },
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.majorType" defaultMessage="学硕类型" />,
      dataIndex: 'majorType',
      valueEnum: {
        default: {
          text: (
              <FormattedMessage
                  id="pages.searchTable.majorType.default"
                  defaultMessage="all"
              />
          ),
          status: 'default',
        },
        academic: {
          text: (
              <FormattedMessage id="pages.searchTable.majorType.academic" defaultMessage="学硕" />
          ),
          status: 'academic',
        },
        professional: {
          text: (
              <FormattedMessage id="pages.searchTable.majorType.professional" defaultMessage="专硕" />
          ),
          status: 'professional',
        },
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.provinceList" defaultMessage="" />,
      dataIndex: 'provinceList',
      valueType: 'textarea',
      hideInTable: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.provinceName" defaultMessage="" />,
      dataIndex: 'provinceName',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.averageScore" defaultMessage="近5年平均复试分数线" />,
      dataIndex: 'averageScore',
      valueType: 'textarea',
      hideInSearch: true,
      sorter: (a, b) => a.averageScore.localeCompare(b.averageScore),
    },
    {
      title: <FormattedMessage id="pages.searchTable.fushiLuquRatio" defaultMessage="23年复录比" />,
      dataIndex: 'fushiLuquRatio',
      valueType: 'textarea',
      hideInSearch: true,
      sorter: (a, b) => a.fushiLuquRatio.localeCompare(b.fushiLuquRatio),
    },
    {
      title: <FormattedMessage id="pages.searchTable.chushiRatio" defaultMessage="总成绩初试占比" />,
      dataIndex: 'chushiRatio',
      valueType: 'textarea',
      hideInSearch: true
    },

    {
      title: <FormattedMessage id="pages.searchTable.majorCourseCount" defaultMessage="专业课科目数量" />,
      dataIndex: 'majorCourseCount',
      valueType: 'textarea',
      sorter: (a, b) => a.majorCourseCount - b.majorCourseCount,
    },
    {
      title: <FormattedMessage id="pages.searchTable.verifyCode" defaultMessage="" />,
      dataIndex: 'verifyCode',
      valueType: 'textarea',
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
      title: <FormattedMessage id="pages.searchTable.id" defaultMessage="ID" />,
      dataIndex: 'id',
      valueType: 'textarea',
      hideInSearch: true,
      hideInTable: true,
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

  let [isTrail, setIsTrail] = useState(
      false
  );

  useEffect(() => {
    isTrailUser().then(({data}) => {
      setIsTrail(data);
    });
  }, []);

  return (
    <PageContainer>
      <Card>
        <Typography>
          <Title level={5}>985学长学姐一对一择校</Title>
          <div>
            <br/>
            <p>自己择校存在困难？985上岸学长学姐来帮你一对一指导：根据您的个人情况，结合系统800+专业近五年录取数据给出专业的指导。 择校系统付费用户享专属优惠，今年名额有限，感兴趣的同学点击下面链接查看详情。</p>
            <Button type="text" href="https://mp.weixin.qq.com/s/aKXo07qbw3G7WXHxIBu8fA">
              <GithubOutlined className="teamSocialIcon" />
            </Button>
            <a href="https://mp.weixin.qq.com/s/aKXo07qbw3G7WXHxIBu8fA">一对一择校服务开启啦！</a>
            <br />
            <br />
          </div>
        </Typography>
      </Card>
      <Card hidden={!isTrail}>
        <Typography>
          <Title level={5}>试用说明</Title>
          当前用户为试用用户，仅可访问以下受限功能
          <ul>
            <li>
              <b>综合查询：</b>试用用户仅可查询清华大学、北京大学、浙江大学、中国科学技术大学、安徽大学5所大学的详细数据。
            </li>
            <li>
              <b>免费功能-基本信息查询：</b>试用用户可通过验证码验证查询800+专业的基本数据（仅包含省份、学校、专业、初试科目等）。
            </li>
            <li>
              <b>对比查询：</b>试用用户仅可查询清华大学、北京大学、浙江大学、中国科学技术大学、安徽大学5所大学的数据。
            </li>
            <li>
              <b>学校详情：</b>试用用户仅可查询清华大学、北京大学、浙江大学、中国科学技术大学、安徽大学5所大学的数据。
            </li>
            <li>
              <b>分类排行榜：</b>试用用户仅可查询"最难考的22408排行榜（985院校）"、"复试刷人最多的计算机专业排行榜（985院校）"、"录取人数最多的计算机专业排行榜（985院校）"、"录取人数最多的计算机专业排行榜（211院校）"4个排行榜数据。
            </li>
            <li>
              <b>专业详情：</b>试用用户仅可查询"北大软微专业"复试录取详情。
            </li>

          </ul>
        </Typography>
        访问全部功能，查看800+计算机考研专业近5年数据多维度全面分析，可以微信扫码直接购买（限时特价39.9：为了覆盖运营成本，实现可持续发展，今年价格会逐步小幅上涨，早买早优惠。）
        <div>
          <Image
              width={200}
              src="https://suolongkaoyan-1301904596.cos.ap-shanghai.myqcloud.com/%E9%9D%99%E6%80%81%E5%9B%BE%E7%89%87/8.jpeg"
          />
          <Image
              width={200}
              src="https://suolongkaoyan-1301904596.cos.ap-shanghai.myqcloud.com/%E9%9D%99%E6%80%81%E5%9B%BE%E7%89%87/11.jpeg"
          />
        </div>
      </Card>
      <Card style={{marginTop: 10}}>
        <ProTable<API.RuleListItem, API.PageParams>
            headerTitle={intl.formatMessage({
              id: 'pages.searchTable.title',
              defaultMessage: 'Enquiry form',
            })}
            actionRef={actionRef}
            rowKey="key"
            search={{
              labelWidth: 120,
              collapsed: false,
            }}
            toolBarRender={() => [
            ]}
            // scroll={{ x: 4000 }}
            request={commonSearchForFreeVersion}
            columns={columns}
        />
      </Card>
    </PageContainer>
  );
};

export default TableListFree;
