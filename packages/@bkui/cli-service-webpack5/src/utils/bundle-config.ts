/*
* Tencent is pleased to support the open source community by making
* 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition) available.
*
* Copyright (C) 2021 THL A29 Limited, a Tencent company.  All rights reserved.
*
* 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition) is licensed under the MIT License.
*
* License for 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition):
*
* ---------------------------------------------------
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
* documentation files (the "Software"), to deal in the Software without restriction, including without limitation
* the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
* to permit persons to whom the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of
* the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
* THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
* CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
* IN THE SOFTWARE.
*/
/* eslint-disable no-nested-ternary */
import path from 'path';
import fs from 'fs';
import { ServiceConfig, BundleOptions, AppConfig } from '../typings/config';
export const appDirectory = fs.realpathSync(process.cwd());
export const resolveApp = (relativePath: string): string => path.resolve(appDirectory, relativePath || '.');

export default async function (appConfig: AppConfig, { analyze }: BundleOptions): Promise<ServiceConfig> {
  const commonConfig = {
    analyze,
    useCustomDevServer: appConfig.useCustomDevServer || false,
    env: {
      ...appConfig.env,
    },
    dist: resolveApp(appConfig.outputDir || './dist'),
    appDir: resolveApp(appConfig.sourceDir || './src/'),
    appIndex: resolveApp(appConfig.mainPath || './src/main.js'),
    appIndexHtml: resolveApp(appConfig.indexPath || './index.html'),
    assetsPath(subPath: string) {
      return path.posix.join(appConfig.assetsDir || 'static', subPath);
    },
    eslintOnSave: appConfig.eslintOnSave ?? false,
    stylelintOnSave: appConfig.stylelintOnSave ?? false,
    css: appConfig.css ?? {}
  };
  return commonConfig;
}
