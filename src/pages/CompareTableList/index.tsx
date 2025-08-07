import {Button, message, Drawer, Card, Typography, Image} from 'antd';
import React, {useState, useRef, useEffect} from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import {addRule, updateRule, removeRule, compareSearch, isTrailUser} from '@/services/ant-design-pro/api';
import Title from "antd/lib/typography/Title";
import {GithubOutlined} from "@ant-design/icons";

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.RuleListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: <FormattedMessage id="pages.searchTable.schoolName1" defaultMessage="学校名称一" />,
      dataIndex: 'schoolName1',
      valueType: 'textarea',
      hideInTable: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.departmentName1" defaultMessage="学院名称一" />,
      dataIndex: 'departmentName1',
      valueType: 'textarea',
      hideInTable: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.majorName1" defaultMessage="专业名称一" />,
      dataIndex: 'majorName1',
      valueType: 'textarea',
      hideInTable: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.majorTrend1" defaultMessage="专业方向一" />,
      dataIndex: 'majorTrend1',
      valueType: 'textarea',
      hideInTable: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.schoolName2" defaultMessage="学校名称一" />,
      dataIndex: 'schoolName2',
      valueType: 'textarea',
      hideInTable: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.departmentName2" defaultMessage="学院名称一" />,
      dataIndex: 'departmentName2',
      valueType: 'textarea',
      hideInTable: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.majorName2" defaultMessage="专业名称一" />,
      dataIndex: 'majorName2',
      valueType: 'textarea',
      hideInTable: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.majorTrend2" defaultMessage="专业方向一" />,
      dataIndex: 'majorTrend2',
      valueType: 'textarea',
      hideInTable: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.schoolName3" defaultMessage="学校名称一" />,
      dataIndex: 'schoolName3',
      valueType: 'textarea',
      hideInTable: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.departmentName3" defaultMessage="学院名称一" />,
      dataIndex: 'departmentName3',
      valueType: 'textarea',
      hideInTable: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.majorName3" defaultMessage="专业名称一" />,
      dataIndex: 'majorName3',
      valueType: 'textarea',
      hideInTable: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.majorTrend3" defaultMessage="专业方向一" />,
      dataIndex: 'majorTrend3',
      valueType: 'textarea',
      hideInTable: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.schoolName4" defaultMessage="学校名称一" />,
      dataIndex: 'schoolName4',
      valueType: 'textarea',
      hideInTable: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.departmentName4" defaultMessage="学院名称一" />,
      dataIndex: 'departmentName4',
      valueType: 'textarea',
      hideInTable: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.majorName4" defaultMessage="专业名称一" />,
      dataIndex: 'majorName4',
      valueType: 'textarea',
      hideInTable: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.majorTrend4" defaultMessage="专业方向一" />,
      dataIndex: 'majorTrend4',
      valueType: 'textarea',
      hideInTable: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.schoolName5" defaultMessage="学校名称一" />,
      dataIndex: 'schoolName5',
      valueType: 'textarea',
      hideInTable: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.departmentName5" defaultMessage="学院名称一" />,
      dataIndex: 'departmentName5',
      valueType: 'textarea',
      hideInTable: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.majorName5" defaultMessage="专业名称一" />,
      dataIndex: 'majorName5',
      valueType: 'textarea',
      hideInTable: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.majorTrend5" defaultMessage="专业方向一" />,
      dataIndex: 'majorTrend5',
      valueType: 'textarea',
      hideInTable: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.schoolName6" defaultMessage="学校名称一" />,
      dataIndex: 'schoolName6',
      valueType: 'textarea',
      hideInTable: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.departmentName6" defaultMessage="学院名称一" />,
      dataIndex: 'departmentName6',
      valueType: 'textarea',
      hideInTable: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.majorName6" defaultMessage="专业名称一" />,
      dataIndex: 'majorName6',
      valueType: 'textarea',
      hideInTable: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.majorTrend6" defaultMessage="专业方向一" />,
      dataIndex: 'majorTrend6',
      valueType: 'textarea',
      hideInTable: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.schoolRank" defaultMessage="学校评级" />,
      dataIndex: 'schoolRank',
      hideInSearch: true,
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
      title: (
        <FormattedMessage
          id="pages.searchTable.schoolName"
          defaultMessage="学校名称"
        />
      ),
      dataIndex: 'schoolName',
      hideInSearch: true,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.departmentName" defaultMessage="学院名称" />,
      dataIndex: 'departmentName',
      valueType: 'textarea',
      hideInSearch: true
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
      title: <FormattedMessage id="pages.searchTable.averageScore" defaultMessage="近四年平均复试分数线" />,
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
      hideInSearch: true
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
              <b>综合查询：</b>试用用户仅可查询清华大学、北京大学、浙江大学、中国科学技术大学、安徽大学5所大学的数据。
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
      <Card>
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
            request={compareSearch}
            columns={columns}
        />
      </Card>
    </PageContainer>
  );
};

export default TableList;
