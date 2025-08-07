import { Button, message, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import {
  addRule,
  updateRule,
  removeRule,
  admissionCountSearchNew
} from '@/services/ant-design-pro/api';

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
      title: <FormattedMessage id="pages.searchTable.schoolRank" defaultMessage="学校评级" />,
      dataIndex: 'schoolRank',
      hideInForm: true,
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
      title: <FormattedMessage id="pages.searchTable.verifyCode"
                               defaultMessage="验证码(为防爬虫，定时更新，关注'索隆考研'公众号，回复'验证码'获取)"/>,
      dataIndex: 'verifyCode',
      valueType: 'textarea',
      hideInTable: true
    },
    // {
    //   title: <FormattedMessage id="pages.searchTable.provinceList" defaultMessage="" />,
    //   dataIndex: 'provinceList',
    //   valueType: 'textarea',
    //   hideInTable: true
    // },
    // {
    //   title: <FormattedMessage id="pages.searchTable.provinceName" defaultMessage="" />,
    //   dataIndex: 'provinceName',
    //   valueType: 'textarea',
    //   hideInSearch: true
    // },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.schoolName"
          defaultMessage="学校名称"
        />
      ),
      dataIndex: 'schoolName',
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
    },
    {
      title: <FormattedMessage id="pages.searchTable.majorName" defaultMessage="专业名称" />,
      dataIndex: 'majorName',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.fullTime" defaultMessage="是否全日制" />,
      dataIndex: 'fullTime',
      valueType: 'textarea',
      hideInSearch: true
    },
    // {
    //   title: <FormattedMessage id="pages.searchTable.majorTrend" defaultMessage="专业方向" />,
    //   dataIndex: 'majorTrend',
    //   valueType: 'textarea',
    // },
    {
      title: <FormattedMessage id="pages.searchTable.math2022" defaultMessage="数学" />,
      dataIndex: 'math',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.math2021" defaultMessage="数学" />,
      dataIndex: 'math2021',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.english2022" defaultMessage="英语" />,
      dataIndex: 'english',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.english2021" defaultMessage="英语" />,
      dataIndex: 'english2021',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.majorCourse2022" defaultMessage="专业课" />,
      dataIndex: 'majorCourse',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.majorCourse2021" defaultMessage="专业课" />,
      dataIndex: 'majorCourse2021',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.admissionCount2022" defaultMessage="22年计划统招人数" />,
      dataIndex: 'majorAdmissionCount2022Text',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.admissionCount2021" defaultMessage="21年计划统招人数" />,
      dataIndex: 'majorAdmissionCount2021Text',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.searchTable.addon" defaultMessage= "变化数" />,
      dataIndex: 'addonText',
      valueType: 'textarea',
      hideInSearch: true
    }
  ];

  return (
    <PageContainer>
      <></>
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
        request={admissionCountSearchNew}
        columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     setSelectedRows(selectedRows);
        //   },
        // }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: 'New rule',
        })}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RuleListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule name is required"
                />
              ),
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
