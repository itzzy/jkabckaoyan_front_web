import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  return (
    <DefaultFooter
      copyright="2021-2024 索隆计算机考研择校网"
      links={[{key:'icp', title:'苏ICP备2023044202号-2', href:"https://beian.miit.gov.cn/#/Integrated/index", blankTarget:true}]}
    />
  );
};
