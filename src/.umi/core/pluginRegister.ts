// @ts-nocheck
import { plugin } from './plugin';
import * as Plugin_0 from '../../app.tsx';
import * as Plugin_1 from '@@/plugin-antd-icon-config/app.ts';
import * as Plugin_2 from 'D:/workspace/suolongkaoyan_front_web/src/.umi/plugin-access/rootContainer.ts';
import * as Plugin_3 from '../plugin-initial-state/runtime';
import * as Plugin_4 from 'D:/workspace/suolongkaoyan_front_web/src/.umi/plugin-locale/runtime.tsx';
import * as Plugin_5 from '@@/plugin-layout/runtime.tsx';
import * as Plugin_6 from '../plugin-model/runtime';

  plugin.register({
    apply: Plugin_0,
    path: '../../app.tsx',
  });
  plugin.register({
    apply: Plugin_1,
    path: '@@/plugin-antd-icon-config/app.ts',
  });
  plugin.register({
    apply: Plugin_2,
    path: 'D:/workspace/suolongkaoyan_front_web/src/.umi/plugin-access/rootContainer.ts',
  });
  plugin.register({
    apply: Plugin_3,
    path: '../plugin-initial-state/runtime',
  });
  plugin.register({
    apply: Plugin_4,
    path: 'D:/workspace/suolongkaoyan_front_web/src/.umi/plugin-locale/runtime.tsx',
  });
  plugin.register({
    apply: Plugin_5,
    path: '@@/plugin-layout/runtime.tsx',
  });
  plugin.register({
    apply: Plugin_6,
    path: '../plugin-model/runtime',
  });

export const __mfsu = 1;
