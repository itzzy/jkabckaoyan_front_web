import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './Welcome.less';


const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default (): React.ReactNode => {
  const intl = useIntl();
  return (
  <PageContainer>
    <Card>

        <Alert
          message={intl.formatMessage({
            id: 'pages.welcome.alertMessage',
            defaultMessage: 'Faster and stronger heavy-duty components have been released.',
          })}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Text strong>
          <FormattedMessage id="pages.welcome.advancedComponent" defaultMessage="Advanced Form" />{' '}
        </Typography.Text>
        <CodePreview>
          "索隆考研"计算机考研信息查询系统
          手机端体验不行，最好PC访问，为防止遗忘，请加入标签页收藏<br></br>
          验证码会定时更新，“索隆考研”公众号回复“验证码”可以获取 <br></br>

          目前的数据 包含了800多个专业，覆盖基本所有211和985院校以及强双非<br></br>

          现在 学校评级、学校名称、学院名称、专业名称、数学、英语、专业课、专业课科目数量 已经支持查询<br></br>
          学校名称、学院名称、专业名称、数学、英语、专业课  支持模糊查询，比如东南大学 输入 东南 也可以查出来<br></br>
        </CodePreview>
        <Typography.Text
          strong
          style={{
            marginBottom: 12,
          }}
        >
          <FormattedMessage id="pages.welcome.log" defaultMessage="Advanced layout" />{' '}
        </Typography.Text>
        <CodePreview>
            2023-05-02 优化综合查询，学校、学院、专业名称固定在左侧，列的顺序和宽度进行了优化，使用体验更好 <br></br>
            2023-04-25 985院校的23复试分数线等基本信息更新完成 <br></br>
            2023-04-08 综合查询支持院校类型、学科排名、23复试线、23录取人数等多个维度的排序，同时表格支持水平滚动，择校效率更高 <br></br>
            2023-04-05 开始录入23复试数据 <br></br>
            2023-03 开始支持自主对比功能，择校体验显著提升 <br></br>
            2022-08 新增最新22考研数据（双非） <br></br>
            2022-07 新增最新22考研数据（985+211） <br></br>
            2021-09-1 新增专业方向信息；优化查询体验 <br></br>
            2021-08-31 完成内测版本，实现基本查询功能 <br></br>
        </CodePreview>
        <Typography.Text
          strong
          style={{
            marginBottom: 12,
          }}
        >
        <FormattedMessage id="pages.welcome.future" defaultMessage="Advanced layout" />{' '}
      </Typography.Text>
      <CodePreview>
        1. 支持复试名单和拟录取名单查询（预计4月底发布） <br></br>
        2. 支持根据初始科目和预估分数选择学校（预计7月份发布） <br></br>
      </CodePreview>
      </Card>
    </PageContainer>
  );
};
