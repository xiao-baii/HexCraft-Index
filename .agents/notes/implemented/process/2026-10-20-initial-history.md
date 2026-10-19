# Agent Note: 以当前站点重新建立首次提交

Status: implemented

## Problem

当前站点完成像素风改版与旧逻辑清理，但 GitHub 的 main 仍保存此前两次小岛版本提交。用户要求上传当前完整内容，并将其作为第一次提交。

## Decision

使用当前受版本控制的文件及本次新增源码、笔记创建无父提交的 Initial commit，将本地和 GitHub 的 main 指向该提交。保留仓库地址和分支名称，不删除重建仓库。操作前将旧引用打包为 .git/history-backups 下的本地 Git bundle，并验证备份可读；备份不上传。

推送使用绑定已核实旧 main 提交的 force-with-lease，远端发生并发修改时停止覆盖。继续遵守现有忽略规则，不纳入 web 历史副本、node_modules、dist、.astro 截图和本地环境文件。远端只有 main 且无标签，不清理其他引用。

## Existing notes

检索活跃笔记中的提交、历史、仓库和 GitHub 关键词，仅命中像素主页改版笔记。该笔记记录页面与依赖决策，和本次 Git 历史重置无重叠，原样保留。

## Alternatives considered

- 在旧 main 上正常追加提交：可以保留完整演进记录，也无需强制推送。但用户明确要求以当前版本作为首次提交，因此采用无父提交。
- 删除 .git 后重新初始化：操作直观，也能生成根提交。但会丢失本地远端配置和恢复线索，因此保留 Git 目录，只替换 main 的历史起点。

## Verification

- 提交前执行 npm run build 和 npm run verify-notes，上传文件检查排除本地数据、构建产物和常见凭据。
- git bundle verify 验证本地备份；git rev-list --count main 和提交父节点检查确认 main 仅有一个根提交。
- git ls-remote 核对远端 main 与本地提交一致；git status 和提交树核对上传结果。

## Consequences

重写 main 后，旧克隆不能直接沿原历史合并，需要重新克隆或在保留个人改动后对齐新 main。旧提交仍可从本地备份恢复；重写分支并不等于清除 GitHub 缓存、旧克隆或其他保留对象。此操作上传源码，不配置或执行网站部署。
