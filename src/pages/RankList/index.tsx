import React, {useEffect, useState} from 'react';
import {PageContainer} from "@ant-design/pro-layout";
import {getRankList, isTrailUser} from "@/services/ant-design-pro/api";
import ProDescriptions from '@ant-design/pro-descriptions';


import {Button, Card, Image, Typography} from "antd";
import Title from "antd/lib/typography/Title";
import {GithubOutlined} from "@ant-design/icons";

const Page: React.FC = () => {

    let [rankList, setRankList] = useState([
        {
            rankType: '985排行榜',
            subRankList: [
                {
                    'rankName': '985最难考的11408排行榜',
                    'rankUrl': 'hard_985_11408',
                    'vip_level': 'common',
                },
                {
                    'rankName': '985最好考的11408排行榜',
                    'rankUrl': 'easy_985_11408',
                    'vip_level': 'common',
                },
            ]
        },
        {
            rankType: '华东地区排行榜',
            subRankList: [
                {
                    'rankName': '华东地区学硕排行榜',
                    'rankUrl': 'hard_985_11408',
                    'vip_level': 'common',
                },
                {
                    'rankName': '华东地区专硕排行榜',
                    'rankUrl': 'easy_985_11408',
                    'vip_level': 'common',
                },
            ]
        },
    ]);

    useEffect(() => {
        getRankList().then(({data}) => {
            console.info(data);
            setRankList(data);
        });
    }, []);

    let [isTrail, setIsTrail] = useState(
        false
    );

    useEffect(() => {
        isTrailUser().then(({data}) => {
            setIsTrail(data);
        });
    }, []);

    return <PageContainer>
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
        {
            rankList.map(({rankType, subRankList}) => {
                console.info("value is ", rankType);
                return <Card style={{marginTop: 10}}>
                    <ProDescriptions column={1} title={rankType}>
                        {
                            subRankList.map(value => {
                                    console.info(value)
                                    if (isTrail) {
                                        if (value.rankName === '最难考的22408排行榜（985院校）' || value.rankName === '复试刷人最多的计算机专业排行榜（985院校）'
                                            || value.rankName === '录取人数最多的计算机专业排行榜（985院校）' || value.rankName === '录取人数最多的计算机专业排行榜（211院校）') {
                                            return <li><a
                                                href={'/rank_page/' + value.rankName}>{value.rankName}(试用用户可查看)</a>
                                            </li>
                                        } else {
                                            return <li><a
                                                href={'#'} disabled="disabled">{value.rankName}(仅付费用户可查看)</a>
                                            </li>
                                        }
                                    } else {
                                        return <li><a href={'/rank_page/' + value.rankName}>{value.rankName}</a></li>
                                    }
                                }
                            )
                        }
                    </ProDescriptions>
                </Card>
            })
        }
    </PageContainer>;
};

export default Page;
