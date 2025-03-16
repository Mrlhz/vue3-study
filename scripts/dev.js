import { fileURLToPath } from 'node:url';
import { dirname, relative, resolve } from 'node:path';
import { createRequire } from 'module';

import minimist from 'minimist';
import esbuild from 'esbuild'


// node命参通过process获 process.argv
const args = minimist(process.argv.slice(2));
// esm使用commonjs 变量
const __filename = fileURLToPath(import.meta.url); //获取文件的绝对路径 file: -> /usr
const __dirname = dirname(__filename);
const require = createRequire(import. meta.url);
const target = args._[0] || "reactivity"; //打包哪个项目
console.log(args, target)
const format= args.f || 'iife'; //打包后的模块化规范

// 入口文件根据命令行提供的路径来进行解析
const entry = resolve(__dirname, `../packages/${target}/src/index.ts`);
const pkg = require(`../packages/${target}/package.json`);


// 根掘需要进行打包
esbuild.context({
  entryPoints: [entry],
  outfile: resolve(__dirname, `../packages/${target}/dist/${target}.js`),
  bundle: true,
  platform: 'browser',
  sourcemap: true,
  format,
  globalName: pkg.buildOptions?.name
}).then((ctx) => {
  console.log('start dev');

  return ctx.watch();
});