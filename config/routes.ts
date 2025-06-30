export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/',
    name: '综合信息查询',
    icon: 'crown',
    routes: [
      {
        name: '综合查询',
        icon: 'table',
        path: '/list',
        component: './TableList',
      },
      {
        name: '对比查询',
        icon: 'table',
        path: '/compare_list',
        component: './CompareTableList',
      },
      {
        name: '22学硕变化查询',
        icon: 'table',
        path: '/admission_count_report',
        component: './AdmissionCountReport',
      },
      {
        name: '22专硕变化查询',
        icon: 'table',
        path: '/admission_count_zs_report',
        component: './AdmissionCountZSReport',
      },
      {
        name: '22新增学院学硕查询',
        icon: 'table',
        path: '/admission_count_new_report',
        component: './AdmissionCountNewReport',
      },
      {
        name: '22新增学院专硕查询',
        icon: 'table',
        path: '/admission_count_zs_new_report',
        component: './AdmissionCountZSNewReport',
      },
      {
        name: '改考信息查询',
        icon: 'table',
        path: '/news_list',
        component: './TableList',
      },
      {
        name: '省份-学校列表',
        icon: 'table',
        path: '/school_list',
        component: './SchoolList',
      },
      {
        name: '新闻素材库',
        icon: 'table',
        path: '/news_info_list/:interval',
        component: './NewsList',
      },
      {
        name: '学校详情',
        icon: 'table',
        path: '/school_detail/:schoolName',
        component: './SchoolDetail',
        hideInMenu: true,
      },
      {
        name: '报考指导书自动生成',
        icon: 'table',
        path: '/auto_generate/',
        component: './AutoGenerate',
        hideInMenu: true,
      },
      {
        name: '排行榜',
        icon: 'table',
        path: '/rank_page/:rankName',
        component: './RankPage',
        hideInMenu: true,
      },
      {
        name: '专业详情',
        icon: 'table',
        path: '/major_detail/:majorName',
        component: './MajorDetail',
        hideInMenu: false,
      },
      {
        name: '分类排行',
        icon: 'table',
        path: '/rank_list/',
        component: './RankList',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/school/',
    name: '院校信息查询',
    icon: 'crown',
    routes: [
      {
        name: '省份-学校列表',
        icon: 'table',
        path: '/school_list',
        component: './SchoolList',
      },
      {
        name: '学校详情',
        icon: 'table',
        path: '/school_detail/:schoolName',
        component: './SchoolDetail',
        hideInMenu: true,
      },

    ],
  },
  {
    path: '/welcome',
    redirect: '/list',
  },
  {
    component: './404',
  },
];
