import React, {useEffect, useState} from 'react';
import {PageContainer} from "@ant-design/pro-layout";
import {getRankList, getSchoolList} from "@/services/ant-design-pro/api";
import ProDescriptions from '@ant-design/pro-descriptions';


import {Card} from "antd";

const Page: React.FC = () => {

  let [rankList, setRankList] = useState([
    {
      rankType: '985排行榜',
      subRankList: [
        {'rankName':'985最难考的11408排行榜',
          'rankUrl':'hard_985_11408',
          'vip_level':'common',
        },
        {'rankName':'985最好考的11408排行榜',
          'rankUrl':'easy_985_11408',
          'vip_level':'common',
        },
      ]
    },
    {
      rankType: '华东地区排行榜',
      subRankList: [
        {'rankName':'华东地区学硕排行榜',
          'rankUrl':'hard_985_11408',
          'vip_level':'common',
        },
        {'rankName':'华东地区专硕排行榜',
          'rankUrl':'easy_985_11408',
          'vip_level':'common',
        },
      ]
    },
  ]);

  useEffect( () => {
    getRankList().then(({data})=>{
      console.info(data);
      setRankList(data);
    });
  },[]);

  return <PageContainer>
        {
          rankList.map(({rankType, subRankList}) => {
            console.info("value is ", rankType);
            return <Card style={{ marginTop: 10 }}>
              <ProDescriptions column={1} title={rankType}>
                {
                  subRankList.map(value => {
                    console.info(value)
                    return <li><a href={'/rank_page/xhs/' + value.rankName}>{value.rankName}</a></li>
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
