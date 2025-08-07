import React, {useEffect, useState} from 'react';
import {PageContainer} from "@ant-design/pro-layout";
import {getRankList, getSchoolList} from "@/services/ant-design-pro/api";
import ProDescriptions from '@ant-design/pro-descriptions';


import {Button, Card} from "antd";
import DownloadFile from "@/pages/PptList/downloadFile";

const Page: React.FC = () => {

  let [fileList, setFileList] = useState([
    {
      rankType: '第一批试用样式（更多样式开发中）',
      subRankList: [
        {'rankName':'梨云笔记样式文件',
          'rankUrl':'ly.pptx',
          'vip_level':'common',
        },
        {'rankName':'猫和老鼠样式文件',
          'rankUrl':'cat.pptx',
          'vip_level':'common',
        },
      ]
    },
  ]);

  // useEffect( () => {
  //   getRankList().then(({data})=>{
  //     console.info(data);
  //     setRankList(data);
  //   });
  // },[]);

  return <PageContainer title={'小红书爆款PPT生成工具'}>
        {
          fileList.map(({rankType, subRankList}) => {
            console.info("value is ", rankType);
            return <Card style={{ marginTop: 10 }}>
              <ProDescriptions column={1} title={rankType}>
                {
                  subRankList.map(value => {
                    console.info(value)
                    // return <li><a href={'api/download/' + value.rankUrl}>{value.rankName}</a></li>
                        return <li><a href={'/'+value.rankUrl}>{value.rankName}</a></li>
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
