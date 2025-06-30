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
          用户名 密码 都是suolong <br></br>
          验证码会定时更新，“索隆考研”公众号回复“验证码”可以获取 <br></br>

          目前的数据 包含了500多个专业，211 985基本上是全的，双非的数据整理了十几个排名比较高的<br></br>

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
          2020-08-31 新增专业方向信息；优化查询体验 <br></br>
          2020-08-31 完成内测版本，实现基本查询功能 <br></br>
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
        1. 支持学校多选，针对不同学校和专业进行信息对比（预计本周末发布） <br></br>
        2. 新增22改考信息查询页面（预计本周末发布） <br></br>
      </CodePreview>
      </Card>
    </PageContainer>
  );
};
