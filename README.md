# hyjs-test

> 一个用于与 HyMatrix 去中心化计算与消息协议交互的 JavaScript/TypeScript SDK，支持 Ethereum、Arweave、AO 网络。

[![NPM version](https://img.shields.io/npm/v/hyjs-test.svg)](https://www.npmjs.com/package/hyjs-test)  

## 使用要求

- `Node Version >= 16` 推荐使用 [`nvm`](https://github.com/nvm-sh/nvm) 或 [nvm-windows](https://github.com/coreybutler/nvm-windows)（windows） 来管理 Node 版本。
# 目录
## 基本查询类

* GET [/info](#info)
* GET [/result/{messageId}](#安装)
* GET [/results/{processId}?sort&limit]
* GET [/message/{messageId}]
* GET [/messageByNonce/{processId}/{nonce}]
* GET [/assignmentByNonce/{processId}/{nonce}]
* GET [/assignmentByMessage/{messageId}]
* GET [/nodes]
* GET [/node/{accid}]
* GET [/nodesByProcess/{processId}]
* GET [/balanceof/{accid}]
* GET [/stakeof/{accid}]
## 操作类

* POST [/]
  
# 快速入门

## 安装

```bash

npm install hyjs-test

# 或

yarn add hyjs-test

```

```ts
import HyMatrix from 'hyjs-test'

const accid  = '0xfc65E09Ef6674DdB4D8a6f3b6a6c8D9d55d67716'
const sdk = new HyMatrix({
  accid: accid,
  debug: true
})

async function main() {
  const info = await sdk.info()
  console.log('网络信息:', info)

  const msgId = 'vDDowE3NrNKfAyZtfEGaTLrkOhr3DDB2D_-Vs22Z8ig'
  const result = await sdk.getResult(msgId)
  console.log('消息结果:', result)
}

main()
```


# API
### info
| 方法                      | 描述               | 参数                                   | 返回值                     |
| ----------------------- | ---------------- | ------------------------------------ | ----------------------- |
| `info()`                | 获取 HyMatrix 网络信息 | 无                                    | Promise<HMInfo>         |
| `getResult(msgId)`      | 根据消息ID查询结果       | `msgId: string`                      | Promise<MessageItem>    |
| `getResults(processId)` | 获取指定进程的所有结果      | `processId: string`, `limit: number` | Promise<MessageItemMap> |
| `getMessage(msgId)`     | 查询消息详细信息         | `msgId: string`                      | Promise<BundleItem>     |
| `getAssignByNonce(...)` | 根据随机值查询任务分配      | `processId: string`, `nonce: number` | Promise<BundleItem>     |
| `getNodes()`            | 获取所有节点信息         | 无                                    | Promise<HMNodeMap>      |
| `getNode(accid?)`       | 查询单个节点信息         | `accid?: string`                     | Promise<HMNode>         |
| `getProcesses(accid?)`  | 查询账号创建的进程列表      | `accid?: string`                     | Promise\<string\[]>     |
| `balanceOf(accid?)`     | 查询账号余额           | `accid?: string`                     | Promise<string>         |
| `stakeOf(accid?)`       | 查询账号质押           | `accid?: string`                     | Promise<string>         |
| `sendMessage(params)`   | 发送签名消息           | `params: SendMessageParams`          | Promise<FormatResponse> |
