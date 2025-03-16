

```json
  "private": true,
```


2. 
```sh
pnpm install typescript esbuild minimist -D -w
````

不加`-w`

 ERR_PNPM_ADDING_TO_ROOT  Running this command will add the dependency to the workspace root, which might not be what you want - if you really meant it, make it explicit by running this command again with the -w flag (or --workspace-root). If you don't want to see this warning anymore, you may set the ignore-workspace-root-check setting to true.

- [pnpm 安装遇到错误_pnpm安装失败-CSDN博客](https://blog.csdn.net/weixin_63115449/article/details/143868047)

3.

```sh
npx tsc --init
```


```sh
pnpm install @vue/shared --workspace --filter @vue/reactivity
```

- [工作空间（Workspace） | pnpm中文文档 | pnpm中文网](https://www.pnpm.cn/workspaces)