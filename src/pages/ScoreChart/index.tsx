import React, {useEffect, useState} from 'react';
import {Column, Line} from '@ant-design/charts';
import ProCard from '@ant-design/pro-card';
import {PageContainer} from "@ant-design/pro-layout";
import {getGradeCountList} from "@/services/ant-design-pro/api";
import {useParams} from "umi";
import {Link} from "@umijs/preset-dumi/lib/theme";


const Page: React.FC = () => {
  let [queryData, setQuryData] = useState([
    {
      score: '300-310',
      value: 10,
    },
    {
      score: '310-320',
      value: 13,
    },
    {
      score: '320-330',
      value: 10,
    },
    {
      score: '330-340',
      value: 20,
    },
  ]);

  let [schoolList, setSchoolList] = useState([
    '清华大学',
    '北京大学',
    '北京邮电大学',
  ]);

  const {schoolName} = useParams();
  console.info(schoolName);
  console.info(queryData);

  useEffect( () => {
    getGradeCountList({schoolName:schoolName}).then(({data})=>{
      console.info(data);
      setQuryData(data);
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



  console.info(queryData);


  const config = {
    data: queryData,
    title: {
      visible: true,
      text: '带数据点的折线图',
    },
    xField: 'score',
    yField: 'value',
  };
  const columnConfig = {
    queryData,
    xField: 'score',
    yField: 'value',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '分数段',
      },
      sales: {
        alias: '数量',
      },
    },
  };
  return <PageContainer>
    <div>
      <ul>
        {
          schoolList.map((value => {
            console.info("value is ", value);
            return <li><a href={'/score_chart/'+value}>{value}</a></li>;
          }))
        }
      </ul>
    </div>
    <Line {...config} />
    <Column {...config} />
  </PageContainer>;
};

export default Page;
