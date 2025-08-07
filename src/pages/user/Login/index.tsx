import {
    GithubOutlined,
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Alert, Button, message, Tabs} from 'antd';
import React, {useState} from 'react';
import ProForm, {ProFormCheckbox, ProFormText} from '@ant-design/pro-form';
import {useIntl, Link, history, FormattedMessage, SelectLang, useModel} from 'umi';
import Footer from '@/components/Footer';
import {login} from '@/services/ant-design-pro/api';
import {Image} from 'antd';


import styles from './index.less';

const LoginMessage: React.FC<{
    content: string;
}> = ({content}) => (
    <Alert
        style={{
            marginBottom: 24,
        }}
        message={content}
        type="error"
        showIcon
    />
);

const Login: React.FC = () => {
    const [submitting, setSubmitting] = useState(false);
    const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
    const [type, setType] = useState<string>('account');
    const {initialState, setInitialState} = useModel('@@initialState');

    const intl = useIntl();

    const fetchUserInfo = async () => {
        const userInfo = await initialState?.fetchUserInfo?.();
        if (userInfo) {
            await setInitialState((s) => ({
                ...s,
                currentUser: userInfo,
            }));
        }
    };

    const handleSubmit = async (values: API.LoginParams) => {
        setSubmitting(true);
        try {
            // 登录
            const msg = await login({...values, type});
            console.log(msg)
            if (msg.success === true) {
                const defaultLoginSuccessMessage = intl.formatMessage({
                    id: 'pages.login.success',
                    defaultMessage: '登录成功！',
                });
                message.success(defaultLoginSuccessMessage);
                await fetchUserInfo();
                /** 此方法会跳转到 redirect 参数所在的位置 */
                if (!history) return;
                const {query} = history.location;
                const {redirect} = query as { redirect: string };
                history.push(redirect || '/');
                return;
            }
            // 如果失败去设置用户错误信息
            setUserLoginState(msg);
        } catch (error) {
            const defaultLoginFailureMessage = intl.formatMessage({
                id: 'pages.login.failure',
                defaultMessage: '登录失败，请重试！',
            });

            message.error(defaultLoginFailureMessage);
        }
        setSubmitting(false);
    };
    const {success} = userLoginState;

    const adStyle: React.CSSProperties = {
        margin: 0,
        height: '120px',
        color: '#fff',
        lineHeight: '20px',
        textAlign: 'left',
        background: '#364d79',
    };

    const contentStyle: React.CSSProperties = {
        margin: 0,
        height: '260px',
        color: '#fff',
        lineHeight: '20px',
        textAlign: 'left',
        background: '#364d79',
    };

    const contentStyleTitle: React.CSSProperties = {
        margin: 0,
        height: '80px',
        color: '#fff',
        lineHeight: '20px',
        textAlign: 'center',
        background: '#364d79',
    };

    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };

    return (
        <div className={styles.container}>
            <div className={styles.lang} data-lang>
                {SelectLang && <SelectLang/>}
            </div>
            <div className={styles.content}>
                <div className={styles.top}>
                    <div className={styles.header}>
                        <Link to="/">
                            <img alt="logo" className={styles.logo} src="/logo.svg"/>
                            <span className={styles.title}>索隆计算机信息网</span>
                        </Link>
                    </div>
                    <div className={styles.desc}>
                        {intl.formatMessage({id: 'pages.layouts.userLayout.title'})}
                    </div>
                </div>

                <div className={styles.main}>
                    <ProForm
                        initialValues={{
                            autoLogin: true,
                        }}
                        submitter={{
                            searchConfig: {
                                submitText: intl.formatMessage({
                                    id: 'pages.login.submit',
                                    defaultMessage: '登录',
                                }),
                            },
                            render: (_, dom) => dom.pop(),
                            submitButtonProps: {
                                loading: submitting,
                                size: 'large',
                                style: {
                                    width: '100%',
                                },
                            },
                        }}
                        onFinish={async (values) => {
                            await handleSubmit(values as API.LoginParams);
                        }}
                    >
                        <Tabs activeKey={type} onChange={setType}>
                            <Tabs.TabPane
                                key="account"
                                tab={intl.formatMessage({
                                    id: 'pages.login.accountLogin.tab',
                                    defaultMessage: '账户密码登录',
                                })}
                            />
                        </Tabs>

                        {success === true && (
                            <LoginMessage
                                content={intl.formatMessage({
                                    id: 'pages.login.accountLogin.errorMessage',
                                    defaultMessage: '账户或密码错误(admin/ant.design)',
                                })}
                            />
                        )}
                        {type === 'account' && (
                            <>
                                <ProFormText
                                    name="username"
                                    fieldProps={{
                                        size: 'large',
                                        prefix: <UserOutlined className={styles.prefixIcon}/>,
                                    }}
                                    placeholder={intl.formatMessage({
                                        id: 'pages.login.username.placeholder',
                                        defaultMessage: '用户名: suolong',
                                    })}
                                    rules={[
                                        {
                                            required: true,
                                            message: (
                                                <FormattedMessage
                                                    id="pages.login.username.required"
                                                    defaultMessage="suolong"
                                                />
                                            ),
                                        },
                                    ]}
                                />
                                <ProFormText.Password
                                    name="password"
                                    fieldProps={{
                                        size: 'large',
                                        prefix: <LockOutlined className={styles.prefixIcon}/>,
                                    }}
                                    placeholder={intl.formatMessage({
                                        id: 'pages.login.password.placeholder',
                                        defaultMessage: '索隆考研 公众号 回复 验证码 获取 密码！',
                                    })}
                                    rules={[
                                        {
                                            required: true,
                                            message: (
                                                <FormattedMessage
                                                    id="pages.login.password.required"
                                                    defaultMessage="索隆考研 公众号 回复 验证码 获取 密码！"
                                                />
                                            ),
                                        },
                                    ]}
                                />
                            </>
                        )}

                        <div
                            style={{
                                marginBottom: 24,
                            }}
                        >
                            <ProFormCheckbox noStyle name="autoLogin">
                                <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录"/>
                            </ProFormCheckbox>
                            <a
                                style={{
                                    float: 'right',
                                }}
                            >
                                <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码"/>
                            </a>
                        </div>
                    </ProForm>
                    <div
                        style={{
                            marginBottom: 24,
                        }}
                    >
                        <br/>
                        <h3>试用说明：</h3>
                        免费试用账户（仅可查询清华、北大等5所高校的数据，作为功能展示）
                        <br/>
                        <b>试用用户名：</b>guest
                        <br/>
                        <b>试用密码：</b>suolong123
                    </div>

                    {/*<Row gutter={16}>*/}
                    {/*  <Col span={8}>*/}
                    {/*    <Card title="Card title" bordered={false}>*/}
                    {/*      <Image*/}
                    {/*          width={200}*/}
                    {/*          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"*/}
                    {/*      />*/}
                    {/*    </Card>*/}
                    {/*  </Col>*/}
                    {/*  <Col span={8}>*/}
                    {/*    <Card title="Card title" bordered={false}>*/}
                    {/*      <Image*/}
                    {/*          width={200}*/}
                    {/*          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"*/}
                    {/*      />*/}
                    {/*    </Card>*/}
                    {/*  </Col>*/}
                    {/*</Row>*/}
                </div>
                <div className={styles.main}>
                    <div>
                        <br/>
                        <h3 style={adStyle}>自己择校存在困难？985上岸学长学姐来帮你一对一指导：根据您的个人情况，结合系统800+专业近五年录取数据给出专业的指导。 择校系统付费用户享专属优惠，今年名额有限，感兴趣的同学点击下面链接查看详情。</h3>
                        <Button type="text" href="https://mp.weixin.qq.com/s/aKXo07qbw3G7WXHxIBu8fA">
                            <GithubOutlined className="teamSocialIcon" />
                        </Button>
                        <a href="https://mp.weixin.qq.com/s/aKXo07qbw3G7WXHxIBu8fA">一对一择校服务开启啦！</a>
                        <br />
                        <br />
                    </div>
                    <div>
                        <h3 style={contentStyleTitle}>欢迎点击下面的按钮加入索隆计算机考研官方交流群，索隆哥会定期在群里分享择校经验以及系统更新升级信息。进群送最新《计算机考研宝典》。</h3>
                        <br />
                        <a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=PAU0IKdqOmHs3cTFMUryd-LSivnWzcg2&jump_from=webapi&authKey=Y2WTcpbjpBWF14fYMqAp7Px7XNa01aN8Qv/A2mklh+of4UVCLMhHSLxVeXNHnuWw">
                            <Image src="//pub.idqqimg.com/wpa/images/group.png" alt="2024索隆计算机考研交" title="2024索隆计算机考研交"/>
                        </a>
                        <br />
                        <br />
                        <Image
                            src="https://suolongkaoyan-1301904596.cos.ap-shanghai.myqcloud.com/%E9%9D%99%E6%80%81%E5%9B%BE%E7%89%87/QQ.jpg"
                        />
                        <br />
                        <br />
                        <a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=PAU0IKdqOmHs3cTFMUryd-LSivnWzcg2&jump_from=webapi&authKey=Y2WTcpbjpBWF14fYMqAp7Px7XNa01aN8Qv/A2mklh+of4UVCLMhHSLxVeXNHnuWw">
                            <Image src="//pub.idqqimg.com/wpa/images/group.png" alt="2024索隆计算机考研交" title="2024索隆计算机考研交"/>
                        </a>
                        <br />
                        <br />
                        <br/>
                    </div>
                    <div>
                        <br/>
                        <h3 style={contentStyleTitle}>微信扫码直接购买（限时特价39.9：为了覆盖运营成本，实现可持续发展，今年价格会逐步小幅上涨，早买早优惠。）</h3>
                        <Image
                            src="https://suolongkaoyan-1301904596.cos.ap-shanghai.myqcloud.com/%E9%9D%99%E6%80%81%E5%9B%BE%E7%89%87/8.jpeg"
                        />
                    </div>
                    <div>
                        <Image
                            src="https://suolongkaoyan-1301904596.cos.ap-shanghai.myqcloud.com/%E9%9D%99%E6%80%81%E5%9B%BE%E7%89%87/11.jpeg"
                        />
                    </div>
                    <div>
                        <h3 style={contentStyle}>网站作者介绍：索隆哥，知乎小小V"打工人索隆"，"索隆考研"公众号主理人，从普通211理科专业一战
                            成功跨考南大计算机系学硕，工作多年，有互联网、金融公司从业经验，资深技术面试官，在知乎就业和考研领域获赞1.2万+。
                            王道论坛老板主，一直在关注计算机考研择校，全网粉丝1.9万+，每年指导几百位同学完成择校。</h3>
                        <br/>
                        <h3 style={contentStyle}>网站功能介绍：支持800+专业12维度综合查询、对比查询、200+院校详情、400+分类排行榜。22版于21年8月份推出beta版本，帮助500+同学完成择校，部分同学成功上岸北大、中科大、中科院、同济大学等名校。
                            23版功能升级，累计销售837份。查询效率高、信息量大，汤家凤老师公众号多次推荐。根据同学们反馈，能节省3-4天的择校时间用来复习。39.9的价格，相当于同行3份分析报告的价格，还是很划算的。
                            目前网站为24版，其中23考研初试科目已于22年10月份完成更新，23复试录取数据已经于23年6月完成更新。
                        </h3>
                        <br/>
                        <h3 style={contentStyleTitle}>微信扫码直接购买（限时特价39.9：为了覆盖运营成本，实现可持续发展，今年价格会逐步小幅上涨，早买早优惠。）</h3>
                    </div>
                    <div>
                        <Image
                            src="https://suolongkaoyan-1301904596.cos.ap-shanghai.myqcloud.com/%E9%9D%99%E6%80%81%E5%9B%BE%E7%89%87/8.jpeg"
                        />
                    </div>
                    <div>
                        <Image
                            src="https://suolongkaoyan-1301904596.cos.ap-shanghai.myqcloud.com/%E9%9D%99%E6%80%81%E5%9B%BE%E7%89%87/11.jpeg"
                        />
                    </div>
                    <br/>
                    <div>
                        <h3 style={contentStyleTitle}>网站主要功能展示</h3>
                    </div>
                    <div>
                        <Image
                            src="https://suolongkaoyan-1301904596.cos.ap-shanghai.myqcloud.com/%E9%9D%99%E6%80%81%E5%9B%BE%E7%89%87/1.jpeg"
                        />
                    </div>
                    <div>
                        <Image
                            src="https://suolongkaoyan-1301904596.cos.ap-shanghai.myqcloud.com/%E9%9D%99%E6%80%81%E5%9B%BE%E7%89%87/2.jpeg"
                        />
                    </div>
                    <div>
                        <Image
                            src="https://suolongkaoyan-1301904596.cos.ap-shanghai.myqcloud.com/%E9%9D%99%E6%80%81%E5%9B%BE%E7%89%87/3.jpeg"
                        />
                    </div>
                    <div>
                        <Image
                            src="https://suolongkaoyan-1301904596.cos.ap-shanghai.myqcloud.com/%E9%9D%99%E6%80%81%E5%9B%BE%E7%89%87/4.jpeg"
                        />
                    </div>
                    <div>
                        <Image
                            src="https://suolongkaoyan-1301904596.cos.ap-shanghai.myqcloud.com/%E9%9D%99%E6%80%81%E5%9B%BE%E7%89%87/5.jpeg"
                        />
                    </div>
                    <div>
                        <Image
                            src="https://suolongkaoyan-1301904596.cos.ap-shanghai.myqcloud.com/%E9%9D%99%E6%80%81%E5%9B%BE%E7%89%87/3.jpeg"
                        />
                    </div>
                    <div>
                        <Image
                            src="https://suolongkaoyan-1301904596.cos.ap-shanghai.myqcloud.com/%E9%9D%99%E6%80%81%E5%9B%BE%E7%89%87/6.jpeg"
                        />
                    </div>
                    <div>
                        <Image
                            src="https://suolongkaoyan-1301904596.cos.ap-shanghai.myqcloud.com/%E9%9D%99%E6%80%81%E5%9B%BE%E7%89%87/7.jpeg"
                        />
                    </div>
                    <br/>
                    <div>
                        <h3 style={contentStyleTitle}>微信扫码直接购买（限时特价39.9：为了覆盖运营成本，实现可持续发展，今年价格会逐步小幅上涨，早买早优惠。）</h3>
                    </div>
                    <div>
                        <Image
                            src="https://suolongkaoyan-1301904596.cos.ap-shanghai.myqcloud.com/%E9%9D%99%E6%80%81%E5%9B%BE%E7%89%87/8.jpeg"
                        />
                    </div>
                    <div>
                        <Image
                            src="https://suolongkaoyan-1301904596.cos.ap-shanghai.myqcloud.com/%E9%9D%99%E6%80%81%E5%9B%BE%E7%89%87/11.jpeg"
                        />
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Login;
