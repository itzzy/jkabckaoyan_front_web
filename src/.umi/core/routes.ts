// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/data/code/suolongkaoyan_front_web-free_user/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@ant-design/pro-layout/es/PageLoading';

export function getRoutes() {
  const routes = [
  {
    "path": "/umi/plugin/openapi",
    "component": dynamic({ loader: () => import(/* webpackChunkName: '.umi__plugin-openapi__openapi' */'/data/code/suolongkaoyan_front_web-free_user/src/.umi/plugin-openapi/openapi.tsx'), loading: LoadingComponent})
  },
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: '.umi__plugin-layout__Layout' */'/data/code/suolongkaoyan_front_web-free_user/src/.umi/plugin-layout/Layout.tsx'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/~demos/:uuid",
        "layout": false,
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'../dumi/layout'), loading: LoadingComponent})],
        "component": ((props) => dynamic({
          loader: async () => {
            const React = await import('react');
            const { default: getDemoRenderArgs } = await import(/* webpackChunkName: 'dumi_demos' */ '/data/code/suolongkaoyan_front_web-free_user/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
            const { default: Previewer } = await import(/* webpackChunkName: 'dumi_demos' */ 'dumi-theme-default/es/builtins/Previewer.js');
            const { usePrefersColor, context } = await import(/* webpackChunkName: 'dumi_demos' */ 'dumi/theme');

            return props => {
              
      const { demos } = React.useContext(context);
      const [renderArgs, setRenderArgs] = React.useState([]);

      // update render args when props changed
      React.useLayoutEffect(() => {
        setRenderArgs(getDemoRenderArgs(props, demos));
      }, [props.match.params.uuid, props.location.query.wrapper, props.location.query.capture]);

      // for listen prefers-color-schema media change in demo single route
      usePrefersColor();

      switch (renderArgs.length) {
        case 1:
          // render demo directly
          return renderArgs[0];

        case 2:
          // render demo with previewer
          return React.createElement(
            Previewer,
            renderArgs[0],
            renderArgs[1],
          );

        default:
          return `Demo ${props.match.params.uuid} not found :(`;
      }
    
            }
          },
          loading: () => null,
        }))()
      },
      {
        "path": "/_demos/:uuid",
        "redirect": "/~demos/:uuid"
      },
      {
        "__dumiRoot": true,
        "layout": false,
        "path": "/~docs",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'../dumi/layout'), loading: LoadingComponent}), dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'/data/code/suolongkaoyan_front_web-free_user/node_modules/dumi-theme-default/es/layout.js'), loading: LoadingComponent})],
        "routes": [
          {
            "path": "/~docs",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'README.md' */'/data/code/suolongkaoyan_front_web-free_user/README.md'), loading: LoadingComponent}),
            "exact": true,
            "meta": {
              "locale": "en-US",
              "order": null,
              "filePath": "README.md",
              "updatedTime": 1720186665000,
              "slugs": [
                {
                  "depth": 1,
                  "value": "Ant Design Pro",
                  "heading": "ant-design-pro"
                },
                {
                  "depth": 2,
                  "value": "Environment Prepare",
                  "heading": "environment-prepare"
                },
                {
                  "depth": 2,
                  "value": "Provided Scripts",
                  "heading": "provided-scripts"
                },
                {
                  "depth": 3,
                  "value": "Start project",
                  "heading": "start-project"
                },
                {
                  "depth": 3,
                  "value": "Build project",
                  "heading": "build-project"
                },
                {
                  "depth": 3,
                  "value": "Check code style",
                  "heading": "check-code-style"
                },
                {
                  "depth": 3,
                  "value": "Test code",
                  "heading": "test-code"
                },
                {
                  "depth": 2,
                  "value": "More",
                  "heading": "more"
                }
              ],
              "title": "Ant Design Pro"
            },
            "title": "Ant Design Pro"
          },
          {
            "path": "/~docs/components",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'components__index.md' */'/data/code/suolongkaoyan_front_web-free_user/src/components/index.md'), loading: LoadingComponent}),
            "exact": true,
            "meta": {
              "filePath": "src/components/index.md",
              "updatedTime": 1720186665000,
              "title": "业务组件",
              "sidemenu": false,
              "slugs": [
                {
                  "depth": 1,
                  "value": "业务组件",
                  "heading": "业务组件"
                },
                {
                  "depth": 2,
                  "value": "Footer 页脚组件",
                  "heading": "footer-页脚组件"
                },
                {
                  "depth": 2,
                  "value": "HeaderDropdown 头部下拉列表",
                  "heading": "headerdropdown-头部下拉列表"
                },
                {
                  "depth": 2,
                  "value": "HeaderSearch 头部搜索框",
                  "heading": "headersearch-头部搜索框"
                },
                {
                  "depth": 3,
                  "value": "API",
                  "heading": "api"
                },
                {
                  "depth": 2,
                  "value": "NoticeIcon 通知工具",
                  "heading": "noticeicon-通知工具"
                },
                {
                  "depth": 3,
                  "value": "NoticeIcon API",
                  "heading": "noticeicon-api"
                },
                {
                  "depth": 3,
                  "value": "NoticeIcon.Tab API",
                  "heading": "noticeicontab-api"
                },
                {
                  "depth": 3,
                  "value": "NoticeIconData",
                  "heading": "noticeicondata"
                },
                {
                  "depth": 2,
                  "value": "RightContent",
                  "heading": "rightcontent"
                }
              ],
              "hasPreviewer": true,
              "group": {
                "path": "/~docs/components",
                "title": "Components"
              }
            },
            "title": "业务组件 - ant-design-pro"
          }
        ],
        "title": "ant-design-pro",
        "component": (props) => props.children
      },
      {
        "path": "/user",
        "layout": false,
        "routes": [
          {
            "path": "/user",
            "routes": [
              {
                "name": "login",
                "path": "/user/login",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__Login' */'/data/code/suolongkaoyan_front_web-free_user/src/pages/user/Login'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/data/code/suolongkaoyan_front_web-free_user/src/pages/404'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "path": "/welcome",
        "name": "welcome",
        "icon": "smile",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Welcome' */'/data/code/suolongkaoyan_front_web-free_user/src/pages/Welcome'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "path": "/",
        "name": "择校系统",
        "icon": "crown",
        "routes": [
          {
            "name": "综合查询",
            "icon": "table",
            "path": "/list",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TableList' */'/data/code/suolongkaoyan_front_web-free_user/src/pages/TableList'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "综合查询专业版",
            "icon": "table",
            "path": "/listPro",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TableListPro' */'/data/code/suolongkaoyan_front_web-free_user/src/pages/TableListPro'), loading: LoadingComponent}),
            "hideInMenu": true,
            "exact": true
          },
          {
            "name": "自选对比",
            "icon": "table",
            "path": "/self_compare",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__SelfCompare' */'/data/code/suolongkaoyan_front_web-free_user/src/pages/SelfCompare'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "专业详情",
            "icon": "table",
            "path": "/major_list/",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__MajorList' */'/data/code/suolongkaoyan_front_web-free_user/src/pages/MajorList'), loading: LoadingComponent}),
            "hideInMenu": false,
            "exact": true
          },
          {
            "name": "院校列表（地区维度）",
            "icon": "table",
            "path": "/school_list_by_area",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__SchoolList' */'/data/code/suolongkaoyan_front_web-free_user/src/pages/SchoolList'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "院校列表（学科排名）",
            "icon": "table",
            "path": "/school_list_by_rank",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__SchoolListByRank' */'/data/code/suolongkaoyan_front_web-free_user/src/pages/SchoolListByRank'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "近4年招生目录查询",
            "icon": "table",
            "path": "/zsml",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ZSML' */'/data/code/suolongkaoyan_front_web-free_user/src/pages/ZSML'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "分类排行榜",
            "icon": "table",
            "path": "/rank_list/",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__RankList' */'/data/code/suolongkaoyan_front_web-free_user/src/pages/RankList'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "分类排行榜（小红书样式）",
            "icon": "table",
            "path": "/rank_list_xhs/",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__RankListXhs' */'/data/code/suolongkaoyan_front_web-free_user/src/pages/RankListXhs'), loading: LoadingComponent}),
            "hideInMenu": true,
            "exact": true
          },
          {
            "name": "小红书爆款图文生成工具",
            "icon": "table",
            "path": "/ppt_generate/",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__PptGenerate' */'/data/code/suolongkaoyan_front_web-free_user/src/pages/PptGenerate'), loading: LoadingComponent}),
            "hideInMenu": true,
            "exact": true
          },
          {
            "name": "PPT下载",
            "icon": "table",
            "path": "/pptGenerate/download/",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__PptList' */'/data/code/suolongkaoyan_front_web-free_user/src/pages/PptList'), loading: LoadingComponent}),
            "hideInMenu": true,
            "exact": true
          },
          {
            "name": "院校新闻动态",
            "icon": "table",
            "path": "/news_info_list/",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__NewsList' */'/data/code/suolongkaoyan_front_web-free_user/src/pages/NewsList'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "普通对比",
            "icon": "table",
            "path": "/compare_list",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__CompareTableList' */'/data/code/suolongkaoyan_front_web-free_user/src/pages/CompareTableList'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "学校详情",
            "icon": "table",
            "path": "/school_detail/:schoolName",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__SchoolDetail' */'/data/code/suolongkaoyan_front_web-free_user/src/pages/SchoolDetail'), loading: LoadingComponent}),
            "hideInMenu": true,
            "exact": true
          },
          {
            "name": "报考指导书自动生成",
            "icon": "table",
            "path": "/auto_generate/",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AutoGenerate' */'/data/code/suolongkaoyan_front_web-free_user/src/pages/AutoGenerate'), loading: LoadingComponent}),
            "hideInMenu": true,
            "exact": true
          },
          {
            "name": "排行榜",
            "icon": "table",
            "path": "/rank_page/:rankName",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__RankPage' */'/data/code/suolongkaoyan_front_web-free_user/src/pages/RankPage'), loading: LoadingComponent}),
            "hideInMenu": true,
            "exact": true
          },
          {
            "name": "小红书排行榜",
            "icon": "table",
            "path": "/rank_page/:style/:rankName",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__RankPageXhs' */'/data/code/suolongkaoyan_front_web-free_user/src/pages/RankPageXhs'), loading: LoadingComponent}),
            "hideInMenu": true,
            "exact": true
          },
          {
            "name": "23学硕变化查询",
            "icon": "table",
            "path": "/admission_count_report",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AdmissionCountReport' */'/data/code/suolongkaoyan_front_web-free_user/src/pages/AdmissionCountReport'), loading: LoadingComponent}),
            "hideInMenu": true,
            "exact": true
          },
          {
            "name": "报录比分析",
            "icon": "table",
            "path": "/enrollment_rank_list/",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__EnrollmentRankList' */'/data/code/suolongkaoyan_front_web-free_user/src/pages/EnrollmentRankList'), loading: LoadingComponent}),
            "hideInMenu": true,
            "exact": true
          },
          {
            "name": "报录比分析报告",
            "icon": "table",
            "path": "/enrollment_rank_page/:rankName",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__EnrollmentRankPage' */'/data/code/suolongkaoyan_front_web-free_user/src/pages/EnrollmentRankPage'), loading: LoadingComponent}),
            "hideInMenu": true,
            "exact": true
          },
          {
            "name": "专业详情具体信息",
            "icon": "table",
            "path": "/major_detail/:id",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__MajorDetail' */'/data/code/suolongkaoyan_front_web-free_user/src/pages/MajorDetail'), loading: LoadingComponent}),
            "hideInMenu": true,
            "exact": true
          },
          {
            "name": "基本信息综合查询",
            "icon": "table",
            "path": "/listFree",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TableListFree' */'/data/code/suolongkaoyan_front_web-free_user/src/pages/TableListFree'), loading: LoadingComponent}),
            "hideInMenu": true,
            "exact": true
          }
        ]
      },
      {
        "path": "/welcome",
        "redirect": "/list",
        "exact": true
      },
      {
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/data/code/suolongkaoyan_front_web-free_user/src/pages/404'), loading: LoadingComponent}),
        "exact": true
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
