import React, {useEffect, useState} from 'react';
import {PageContainer} from "@ant-design/pro-layout";
import {getNewsList, getSchoolBasicInfo} from "@/services/ant-design-pro/api";
import ProDescriptions from '@ant-design/pro-descriptions';
import {Card} from "antd";
import {useParams} from "umi";

// import {useParams} from "_umi@3.5.26@umi";
// import umi from 'umi';

const Page: React.FC = () => {

  let [newsDataList, setNewsDataList] = useState([
    {
      departmentName: '南京大学-计算机系',
      newsInfoList: [
        {'title':'复试通知',
          'publishDate':'2022-05-22',
          'detailUrl':'www.nju.edu.cn',
          },
        {'title':'该考通知',
          'publishDate':'2022-05-21',
          'detailUrl':'www.nju.edu.cn',
        },
      ]
    },
    {
      departmentName: '北京大学-计算机系',
      newsInfoList: [
        {'title':'复试通知',
          'publishDate':'2022-05-22',
          'detailUrl':'www.nju.edu.cn',
        },
        {'title':'该考通知',
          'publishDate':'2022-05-20',
          'detailUrl':'www.nju.edu.cn',
        },
      ]
    },
  ]);

  useEffect( () => {
    getNewsList({'interval':30}).then(({data})=>{
      console.info(data);
      setNewsDataList(data);
    });
  },[]);

  return <PageContainer>
        {
          newsDataList.map(({departmentName, newsInfoList}) => {
            console.info("value is ", departmentName);
            return <Card style={{ marginTop: 10 }}>
              <ProDescriptions column={1} title={departmentName}>
                {
                  newsInfoList.map(value => {
                    console.info(value)
                    return <li><a href={value.detailUrl}>{value.title}({value.publishDate})</a></li>
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
