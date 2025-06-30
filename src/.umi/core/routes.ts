// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from 'D:/workspace/suolongkaoyan_front_web/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@ant-design/pro-layout/es/PageLoading';

export function getRoutes() {
  const routes = [
  {
    "path": "/umi/plugin/openapi",
    "component": dynamic({ loader: () => import(/* webpackChunkName: '.umi__plugin-openapi__openapi' */'D:/workspace/suolongkaoyan_front_web/src/.umi/plugin-openapi/openapi.tsx'), loading: LoadingComponent})
  },
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: '.umi__plugin-layout__Layout' */'D:/workspace/suolongkaoyan_front_web/src/.umi/plugin-layout/Layout.tsx'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/~demos/:uuid",
        "layout": false,
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'../dumi/layout'), loading: LoadingComponent})],
        "component": ((props) => dynamic({
          loader: async () => {
            const React = await import('react');
            const { default: getDemoRenderArgs } = await import(/* webpackChunkName: 'dumi_demos' */ 'D:/workspace/suolongkaoyan_front_web/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
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
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'../dumi/layout'), loading: LoadingComponent}), dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'D:/workspace/suolongkaoyan_front_web/node_modules/dumi-theme-default/es/layout.js'), loading: LoadingComponent})],
        "routes": [
          {
            "path": "/~docs",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'README.md' */'D:/workspace/suolongkaoyan_front_web/README.md'), loading: LoadingComponent}),
            "exact": true,
            "meta": {
              "locale": "en-US",
              "order": null,
              "filePath": "README.md",
              "updatedTime": 1654355555000,
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
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'components__index.md' */'D:/workspace/suolongkaoyan_front_web/src/components/index.md'), loading: LoadingComponent}),
            "exact": true,
            "meta": {
              "filePath": "src/components/index.md",
              "updatedTime": 1654355555000,
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
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__Login' */'D:/workspace/suolongkaoyan_front_web/src/pages/user/Login'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'D:/workspace/suolongkaoyan_front_web/src/pages/404'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "path": "/welcome",
        "name": "welcome",
        "icon": "smile",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Welcome' */'D:/workspace/suolongkaoyan_front_web/src/pages/Welcome'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "path": "/",
        "name": "综合信息查询",
        "icon": "crown",
        "routes": [
          {
            "name": "综合查询",
            "icon": "table",
            "path": "/list",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TableList' */'D:/workspace/suolongkaoyan_front_web/src/pages/TableList'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "对比查询",
            "icon": "table",
            "path": "/compare_list",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__CompareTableList' */'D:/workspace/suolongkaoyan_front_web/src/pages/CompareTableList'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "22学硕变化查询",
            "icon": "table",
            "path": "/admission_count_report",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AdmissionCountReport' */'D:/workspace/suolongkaoyan_front_web/src/pages/AdmissionCountReport'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "22专硕变化查询",
            "icon": "table",
            "path": "/admission_count_zs_report",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AdmissionCountZSReport' */'D:/workspace/suolongkaoyan_front_web/src/pages/AdmissionCountZSReport'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "22新增学院学硕查询",
            "icon": "table",
            "path": "/admission_count_new_report",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AdmissionCountNewReport' */'D:/workspace/suolongkaoyan_front_web/src/pages/AdmissionCountNewReport'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "22新增学院专硕查询",
            "icon": "table",
            "path": "/admission_count_zs_new_report",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AdmissionCountZSNewReport' */'D:/workspace/suolongkaoyan_front_web/src/pages/AdmissionCountZSNewReport'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "改考信息查询",
            "icon": "table",
            "path": "/news_list",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TableList' */'D:/workspace/suolongkaoyan_front_web/src/pages/TableList'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "省份-学校列表",
            "icon": "table",
            "path": "/school_list",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__SchoolList' */'D:/workspace/suolongkaoyan_front_web/src/pages/SchoolList'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "学校详情",
            "icon": "table",
            "path": "/school_detail/:schoolName",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__SchoolDetail' */'D:/workspace/suolongkaoyan_front_web/src/pages/SchoolDetail'), loading: LoadingComponent}),
            "hideInMenu": true,
            "exact": true
          },
          {
            "name": "报考指导书自动生成",
            "icon": "table",
            "path": "/auto_generate/",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AutoGenerate' */'D:/workspace/suolongkaoyan_front_web/src/pages/AutoGenerate'), loading: LoadingComponent}),
            "hideInMenu": true,
            "exact": true
          },
          {
            "name": "排行榜",
            "icon": "table",
            "path": "/rank_page/:rankName",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__RankPage' */'D:/workspace/suolongkaoyan_front_web/src/pages/RankPage'), loading: LoadingComponent}),
            "hideInMenu": true,
            "exact": true
          },
          {
            "name": "专业详情",
            "icon": "table",
            "path": "/major_detail/:majorName",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__MajorDetail' */'D:/workspace/suolongkaoyan_front_web/src/pages/MajorDetail'), loading: LoadingComponent}),
            "hideInMenu": false,
            "exact": true
          },
          {
            "name": "分类排行",
            "icon": "table",
            "path": "/rank_list/",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__RankList' */'D:/workspace/suolongkaoyan_front_web/src/pages/RankList'), loading: LoadingComponent}),
            "hideInMenu": true,
            "exact": true
          }
        ]
      },
      {
        "path": "/school/",
        "name": "院校信息查询",
        "icon": "crown",
        "routes": [
          {
            "name": "省份-学校列表",
            "icon": "table",
            "path": "/school_list",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__SchoolList' */'D:/workspace/suolongkaoyan_front_web/src/pages/SchoolList'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "学校详情",
            "icon": "table",
            "path": "/school_detail/:schoolName",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__SchoolDetail' */'D:/workspace/suolongkaoyan_front_web/src/pages/SchoolDetail'), loading: LoadingComponent}),
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
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'D:/workspace/suolongkaoyan_front_web/src/pages/404'), loading: LoadingComponent}),
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
