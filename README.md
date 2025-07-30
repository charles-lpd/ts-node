# hyjs-test

> 一个用于与 HyMatrix 去中心化计算与消息协议交互的 JavaScript/TypeScript SDK，支持 Ethereum、Arweave、AO 网络。

[![NPM version](https://img.shields.io/npm/v/hyjs-test.svg)](https://www.npmjs.com/package/hyjs-test)  

## 使用要求

- `Node Version >= 16` 推荐使用 [`nvm`](https://github.com/nvm-sh/nvm) 或 [nvm-windows](https://github.com/coreybutler/nvm-windows)（windows） 来管理 Node 版本。
- 推荐使用 [ethers.js @5.4.1](https://github.com/everFinance/everpay-js/blob/main/package.json#L57)
# 目录
## 基本查询类

* GET [/info](#info)
* GET [/result/{messageId}](#getresultmsgid)
* GET [/results/{processId}?sort&limit](#getresultsprocessid-limit)
* GET [/message/{messageId}](#getmessagemsgid)
* GET [/messageByNonce/{processId}/{nonce}](#getmessagebynonceprocessid-nonce)
* GET [/assignmentByNonce/{processId}/{nonce}](#getassignbynonceprocessid-nonce)
* GET [/assignmentByMessage/{messageId}](#getassignbymessagemsgid)
* GET [/nodes](#getnodes)
* GET [/node/{accid}](#getnodeaccid)
* GET [/nodesByProcess/{processId}](#getnodesbyprocessprocessid)
* GET [/balanceof/{accid}](#balanceofaccid)
* GET [/stakeof/{accid}](#stakeofaccid)
## 操作类

* POST [/](#sendmessageparams)
  
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

## API

### info()

| 方法     | 描述               | 参数 | 返回值          |
|----------|--------------------|------|-----------------|
| `info()` | 获取 HyMatrix 网络信息 | 无   | `Promise<HMInfo>` |

### getResult(msgId)

| 方法             | 描述             | 参数            | 返回值                  |
|------------------|------------------|------------------|--------------------------|
| `getResult(msgId)` | 根据消息ID查询结果 | `msgId: string` | `Promise<MessageItem>`  |

### getResults(processId, limit?)

| 方法                   | 描述                 | 参数                                           | 返回值                   |
|------------------------|----------------------|------------------------------------------------|--------------------------|
| `getResults(processId)`| 获取指定进程的所有结果 | `processId: string`, `limit?: number`         | `Promise<MessageItemMap>` |

### getMessage(msgId)

| 方法               | 描述             | 参数            | 返回值                |
|--------------------|------------------|------------------|------------------------|
| `getMessage(msgId)`| 查询消息详细信息 | `msgId: string` | `Promise<BundleItem>`  |

### getMessageByNonce(processId, nonce)

| 方法                        | 描述              | 参数                                         | 返回值                |
|-----------------------------|-------------------|----------------------------------------------|------------------------|
| `getMessageByNonce(...)`    | 根据随机值查询消息  | `processId: string`, `nonce: number`         | `Promise<BundleItem>`  |

### getAssignByNonce(processId, nonce)

| 方法                         | 描述                  | 参数                                         | 返回值                |
|------------------------------|-----------------------|----------------------------------------------|------------------------|
| `getAssignByNonce(...)`      | 根据随机值查询任务分配 | `processId: string`, `nonce: number`         | `Promise<BundleItem>`  |

### getAssignByMessage(msgId)

| 方法                         | 描述                    | 参数            | 返回值                |
|------------------------------|-------------------------|------------------|------------------------|
| `getAssignByMessage(msgId)`  | 根据消息 ID 查询任务分配 | `msgId: string` | `Promise<BundleItem>`  |

### getNodes()

| 方法       | 描述           | 参数 | 返回值             |
|------------|----------------|------|---------------------|
| `getNodes()` | 获取所有节点信息 | 无   | `Promise<HMNodeMap>` |

### getNode(accid?)

| 方法       | 描述             | 参数                    | 返回值           |
|------------|------------------|--------------------------|------------------|
| `getNode()`| 查询单个节点信息 | `accid?: string`         | `Promise<HMNode>`|

### getNodesByProcess(processId)

| 方法                       | 描述                  | 参数                 | 返回值             |
|----------------------------|-----------------------|----------------------|---------------------|
| `getNodesByProcess(...)`   | 查询某个进程的节点信息 | `processId: string` | `Promise<HMNodeMap>` |

### getProcesses(accid?)

| 方法              | 描述                    | 参数                 | 返回值              |
|-------------------|-------------------------|----------------------|----------------------|
| `getProcesses()`  | 查询账号创建的进程列表   | `accid?: string`     | `Promise<string[]>`  |

### balanceOf(accid?)

| 方法           | 描述         | 参数                  | 返回值           |
|----------------|--------------|------------------------|------------------|
| `balanceOf()`  | 查询账号余额 | `accid?: string`       | `Promise<string>`|

### stakeOf(accid?)

| 方法         | 描述           | 参数                  | 返回值           |
|--------------|----------------|------------------------|------------------|
| `stakeOf()`  | 查询账号质押金额 | `accid?: string`       | `Promise<string>`|

### sendMessage(params)

| 方法            | 描述         | 参数                            | 返回值                   |
|-----------------|--------------|----------------------------------|----------------------------|
| `sendMessage()` | 发送签名消息 | `params: SendMessageParams`     | `Promise<FormatResponse>`  |




