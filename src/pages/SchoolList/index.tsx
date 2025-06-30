import React, {useEffect, useState} from 'react';
import {PageContainer} from "@ant-design/pro-layout";
import {getSchoolList} from "@/services/ant-design-pro/api";
import ProDescriptions from '@ant-design/pro-descriptions';


import {Card} from "antd";

const Page: React.FC = () => {

  let [schoolList, setSchoolList] = useState([
    {
      province: '北京市',
      schoolInfoList: [
        {'schoolName':'北京大学',
          'schoolRankTag':'985',
          'csRankTag':'A+',
          'seRankTag':'A',
          },
        {'schoolName':'北京大学',
          'schoolRankTag':'985',
          'csRankTag':'A+',
          'seRankTag':'A',},
      ]
    },
    {
      province: '江苏省',
      schoolInfoList: [
        {'schoolName':'南京大学',
          'schoolRankTag':'985',
          'csRankTag':'A+',
          'seRankTag':'A',},
        {'schoolName':'北京大学',
          'schoolRankTag':'985',
          'csRankTag':'A+',
          'seRankTag':'A',},
      ]
    },
  ]);

  useEffect( () => {
    getSchoolList().then(({data})=>{
      console.info(data);
      setSchoolList(data);
      // setQuryData([
      //   {
      //     score: '300-310',
      //     value: 10,
      //   },
      //   {
      //     score: '310-320',
      //     value: 13,
      //   },
      // ]);
    });
  },[]);

  return <PageContainer>
        {
          schoolList.map(({province, schoolInfoList}) => {
            console.info("value is ", province);
            return <Card style={{ marginTop: 10 }}>
              <ProDescriptions column={3} title={province}>
                {
                  schoolInfoList.map(value => {
                    console.info(value)
                    return <li><a href={'/school_detail/' + value.schoolName}>{value.schoolName}({value.schoolRankTag})(计科排名:{value.csRankTag} 软工排名:{value.seRankTag})</a></li>
                    // <Link to={'/school_detail/' + value}>{value}</Link>;
                    // <a href={'/school_detail/' + value}>{value}</a>
                    // <ProDescriptions.Item>
                    //     <Link to={'/school_detail/' + value}>{value}</Link>
                    //   </ProDescriptions.Item>
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
