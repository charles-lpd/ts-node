# hyjs-test

> 一个用于与 HyMatrix 去中心化计算与消息协议交互的 JavaScript/TypeScript SDK，支持 Ethereum、Arweave、AO 网络。

[![NPM version](https://img.shields.io/npm/v/hyjs-test.svg)](https://www.npmjs.com/package/hyjs-test)  

## 使用要求

- `Node Version >= 16` 推荐使用 [`nvm`](https://github.com/nvm-sh/nvm) 或 [nvm-windows](https://github.com/coreybutler/nvm-windows)（windows） 来管理 Node 版本。
- 推荐使用 [ethers.js @5.4.1](https://docs.ethers.org/v5/)
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

npm install hyjs-test ethers@5.4.1

# 或

yarn add hyjs-test ethers@5.4.1
```

## 使用方式

- 👉 [Node环境](#node-环境)
> `privateKey`: ethereum 私钥， 由 '0x' + `64`位私钥， 共 `66` 位。

> `arJWK`: arweave JWKInterface JSON 文件，参考 [arweave Docs - Sample JWK](https://docs.arweave.org/developers/arweave-node-server/http-api#sample-jwk)
- 👉 [Web环境](#web-环境)

> `signer`: ethereum 签名， 通过 `new Web3Provider(window.ethereum)` 创建。

> `arJWK`: `use_wallet`: [arweave-js](https://github.com/ArweaveTeam/arweave-js) 也支持在浏览器端使用 `'use_wallet'` 作为 jwk 参数，来使用 ArConnect 获取 arweave 钱包地址，以及进行 arweave 转账、签名。详见 [arweave-js Search · use_wallet](https://github.com/ArweaveTeam/arweave-js/search?q=use_wallet), 在 Web 端，使用 `'use_wallet'` 代表的 ArConnect，更安全。

---

### Node 环境

```ts
import HyMatrix from 'hyjs-test'
import arweaveKeyFile from 'arweave-key-file.json'

const accid  = '...' // ethereumAddress or ArweaveAddress
const hyMatrix1 = new HyMatrix({
  debug: true
})

hyMatrix1.info().then(console.log)
hyMatrix1.balanceOf(accid).then(console.log)


const hyMatrix2 = new HyMatrix({
  accid: accid,
  debug: true
})

hyMatrix2.balanceOf().then(console.log)


// eth 私钥
const ethereumPrivateKey = '0x...' // 0x + 64位私钥， 共66位
const hyMatrix3 = new HyMatrix({
 privateKey: ethereumPrivateKey
})

// or

// arweave key-file json
const hyMatrix3 = new HyMatrix({
 arJWK: arweaveKeyFile
})

// 转账：以 hmAR 为例
const processId = 'GuuH1wCOBatG-JoKu42NkJMC7Cx-rjD8F5EEICLTNP8'
const tags = [
  { name: 'Action', value: 'Transfer' },
  { name: 'Recipient', value: '收款地址' },
  { name: 'Quantity', value: '100' }
]
async function main() {
  const params = {
      tags,
      processId,
      data: '' // 可选, 默认为空字符串
  }
  const result = await hyMatrix3.sendMessage(params)
  console.log(result.id)

  // wait/ 稍等片刻
  const result2 = await await hyMatrix3.getResult(result.id)
  console.log(result2)
}

main()

```
### Web 环境

```ts
import HyMatrix from 'hyjs-test'
import { Web3Provider } from '@ethersproject/providers'

// window.arweaveWallet.getActiveAddress()
const accid = await window.arweaveWallet.getActiveAddress()
const hyMatrix1 = new HyMatrix({
  debug: true
})

hyMatrix1.info().then(console.log)
hyMatrix1.balanceOf(accid).then(console.log)


const hyMatrix2 = new HyMatrix({
  accid: accid,
  debug: true
})

hyMatrix2.balanceOf().then(console.log)


// arweaveWallet : 'use_wallet' = window.arweaveWallet
const hyMatrix3 = new HyMatrix({
 arJWK: 'use_wallet'
})

// or

// 若多个 ethereum 钱包同时存在，可使用 `eip6963:announceProvider` 和 `eip6963:requestProvider` 区分
// 相关文档 https://eips.ethereum.org/EIPS/eip-6963#announce-and-request-events
const provider = new Web3Provider(window.ethereum)
// ethereumWallet
const hyMatrix3 = new HyMatrix({
 signer: provider
})

// 以 hmAR 为例
const processId = 'GuuH1wCOBatG-JoKu42NkJMC7Cx-rjD8F5EEICLTNP8'
const tags = [
  { name: 'Action', value: 'Transfer' },
  { name: 'Recipient', value: '收款地址' },
  { name: 'Quantity', value: '100' }
]
async function main() {
  const params = {
      tags,
      processId,
      data: '' // 可选, 默认为空字符串
  }
  const result = await hyMatrix3.sendMessage(params)
  console.log(result.id)
  // wait/ 稍等片刻
  const result2 = await await hyMatrix3.getResult(result.id)
  console.log(result2)
}

main()
```

## API

### info()

| 方法     | 描述               | 参数 | 返回值          |
|----------|--------------------|------|-----------------|
| `info()` | 获取 HyMatrix 信息 | 无   | `HMInfo` |

```ts
const hyMatrix = new HyMatrix({
  debug: true
})

hyMatrix.info().then(console.log)

// {
//   "Protocol": "hymx",
//   "Variant": "v0.1.0",
//   "Join-Network": true,
//   "Token": "fHQbzw6acg2nqmCqzdr2GFaeoGzcRd0paVTD2kMGyU4",
//   "Registry": "O-0_O4TgYYnA4VHw2EtHR6NafN_ZRRlX0uxkbUMto6g",
//   "Node": {
//   "Acc-Id": "0xCD1Ef67a57a7c03BFB05F175Be10e3eC79821138",
//   "Name": "permadao",
//   "Role": "main",
//   "Desc": "permadao test node",
//   "URL": "https://hymx.permadao.io"
//   }
// }
```


### getResult(msgId)

| 方法             | 描述             | 参数            | 返回值                  |
|------------------|------------------|------------------|--------------------------|
| `getResult(msgId)` | 根据消息ID查询结果 | `msgId: string` | `MessageItem`  |

```ts
const hyMatrix = new HyMatrix({
  debug: true
})
const messageId = 'vDDowE3NrNKfAyZtfEGaTLrkOhr3DDB2D_-Vs22Z8ig'
hyMatrix.getResult(messageId).then(console.log)

{
  "Nonce": "14",
  "Timestamp": "1753857762472",
  "Item-Id": "vDDowE3NrNKfAyZtfEGaTLrkOhr3DDB2D_-Vs22Z8ig",
  "From-Process": "GuuH1wCOBatG-JoKu42NkJMC7Cx-rjD8F5EEICLTNP8",
  "Pushed-For": "vDDowE3NrNKfAyZtfEGaTLrkOhr3DDB2D_-Vs22Z8ig",
  "Messages": [...],
  "Spawns": [...],
  "Assignmengts": null,
  "Output": {
  "data": "",
  "print": true,
  "prompt": "\u001b[32m\u001b[90m@\u001b[34maos-2.0.1\u001b[90m[Inbox:\u001b[31m\u001b[90m]\u001b[0m> "
  },
  "Data": "",
  "Error": ""
}
```

### getResults(processId, limit)

| 方法                   | 描述                 | 参数                                           | 返回值                   |
|------------------------|----------------------|------------------------------------------------|--------------------------|
| `getResults(processId)`| 获取指定进程的所有结果 | `processId: string`, `limit: number`         | `MessageItemMap` |

```ts
const hyMatrix = new HyMatrix({
  debug: true
})
const processId = 'GuuH1wCOBatG-JoKu42NkJMC7Cx-rjD8F5EEICLTNP8'
const limit = 10
hyMatrix.getResults(processId,limit).then(console.log)

{
  "edges": [
    {
      "cursor": "eyJ0aW1lc3RhbXAiOjE3NTM4NDYwNzExNDksIm9yZGluYXRlIjo1LCJjcm9uIjoiMS0xMC1taW51dGVzIiwic29ydCI6IkFTQyJ9",
      "node": {
        "Nonce": "5",
        "Timestamp": "1753846071149",
        "Item-Id": "WjQGupfw-pHl6MluPxuSSvNb3e-oKNfg_rFSxIlXASw",
        "From-Process": "GuuH1wCOBatG-JoKu42NkJMC7Cx-rjD8F5EEICLTNP8",
        "Pushed-For": "WjQGupfw-pHl6MluPxuSSvNb3e-oKNfg_rFSxIlXASw",
        "Messages": [],
        "Spawns": [],
        "Assignmengts": null,
        "Output": {
          "data": "2.0.1",
          "prompt": "\u001b[32m\u001b[90m@\u001b[34maos-2.0.1\u001b[90m[Inbox:\u001b[31m\u001b[90m]\u001b[0m> ",
          "test": "{\n    [1] = \"2.0.1\"\n}"
        },
        "Data": "",
        "Error": ""
      },
    }
    // ...etc
  ]
}
```

### getMessage(msgId)

| 方法               | 描述             | 参数            | 返回值                |
|--------------------|------------------|------------------|------------------------|
| `getMessage(msgId)`| 查询消息详细信息 | `msgId: string` | `BundleItem`  |

```ts
const hyMatrix = new HyMatrix({
  debug: true
})
const messageId = 'vDDowE3NrNKfAyZtfEGaTLrkOhr3DDB2D_-Vs22Z8ig'
hyMatrix.getMessage(messageId).then(console.log)

{
  "signatureType": 3,
  "signature": "ad21YuS8X3iZXcAyGJoFr0X6-FuHvR391LlxrY47J6sxCWeUtABfzuwWf4uRmhAVw-rbcZqyjo28ZPWe_9B9CRw",
  "owner": "BBTIm0IztpJRvpiRLfiSxckjR-1e5BRfqFXcFdIs5uekXvJu7v5CME1ahX6uAXKJvYrMbIEVJ-LDnIYcwAe1aW4",
  "target": "GuuH1wCOBatG-JoKu42NkJMC7Cx-rjD8F5EEICLTNP8",
  "anchor": "",
  "tags": [...],
  "data": "",
  "id": "vDDowE3NrNKfAyZtfEGaTLrkOhr3DDB2D_-Vs22Z8ig",
  "tagsBy":     "DhpTREstVGltZXN0YW1wGjE3NTM4NTc3NjE3MzQaRGF0YS1Qcm90b2NvbAhoeW14DlZhcmlhbnQMdjAuMS4wCFR5cGUOTWVzc2FnZQxBY3Rpb24QVHJhbnNmZXISUmVjaXBpZW50Vl9xcmhwNF9jLWpsMUl3TEtjd2xER01DcXMzQng3M2VKZXB0QWhZTjl3Tm8QUXVhbnRpdHkGMTAwAA"
}
```
### getMessageByNonce(processId, nonce)

| 方法                        | 描述              | 参数                                         | 返回值                |
|-----------------------------|-------------------|----------------------------------------------|------------------------|
| `getMessageByNonce(...)`    | 根据随机值查询消息  | `processId: string`, `nonce: number`         | `BundleItem`  |

```ts
const hyMatrix = new HyMatrix({
  debug: true
})
const processId = 'GuuH1wCOBatG-JoKu42NkJMC7Cx-rjD8F5EEICLTNP8'
const nonce = 14
hyMatrix.getMessageByNonce(processId, nonce).then(console.log)

{
  "signatureType": 3,
  "signature": "ad21YuS8X3iZXcAyGJoFr0X6-FuHvR391LlxrY47J6sxCWeUtABfzuwWf4uRmhAVw-rbcZqyjo28ZPWe_9B9CRw",
  "owner": "BBTIm0IztpJRvpiRLfiSxckjR-1e5BRfqFXcFdIs5uekXvJu7v5CME1ahX6uAXKJvYrMbIEVJ-LDnIYcwAe1aW4",
  "target": "GuuH1wCOBatG-JoKu42NkJMC7Cx-rjD8F5EEICLTNP8",
  "anchor": "",
  "tags": [...],
  "data": "",
  "id": "vDDowE3NrNKfAyZtfEGaTLrkOhr3DDB2D_-Vs22Z8ig",
  "tagsBy":     "DhpTREstVGltZXN0YW1wGjE3NTM4NTc3NjE3MzQaRGF0YS1Qcm90b2NvbAhoeW14DlZhcmlhbnQMdjAuMS4wCFR5cGUOTWVzc2FnZQxBY3Rpb24QVHJhbnNmZXISUmVjaXBpZW50Vl9xcmhwNF9jLWpsMUl3TEtjd2xER01DcXMzQng3M2VKZXB0QWhZTjl3Tm8QUXVhbnRpdHkGMTAwAA"
}
```

### getAssignByNonce(processId, nonce)

| 方法                         | 描述                  | 参数                                         | 返回值                |
|------------------------------|-----------------------|----------------------------------------------|------------------------|
| `getAssignByNonce(...)`      | 根据随机值查询任务分配 | `processId: string`, `nonce: number`         | `BundleItem`  |

```ts
const hyMatrix = new HyMatrix({
  debug: true
})
const processId = 'GuuH1wCOBatG-JoKu42NkJMC7Cx-rjD8F5EEICLTNP8'
const nonce = 14
hyMatrix.getMessageByNonce(processId, nonce).then(console.log)

{
  "signatureType": 3,
  "signature": "6Jo8HM8mqv8YVb-lcFWf_W4_dUxFAYrf0f-P5Vsjqlp8Ie7Abh1D-bCxY0j6VwjmLtxGKMkNc_BpX2MPwEtvohs",
  "owner": "BKhc8fzcrT9QVrWp4i6RTpke9C5vNb5XjJX18LgrnRzCYGDZcIXztIrR-0hBb_mzF3pjqfl4tMyJ_bGzAWKrqFs",
  "target": "",
  "anchor": "",
  "tags": [...],
  "data": "",
  "id": "igsAKUQ0uGkm6f8o9hEAnQ2-fpEr1b3WpGXWtIwoFUM",
  "tagsBy":   "DhpEYXRhLVByb3RvY29sCGh5bXgOVmFyaWFudAx2MC4xLjAIVHlwZRRBc3NpZ25tZW50DlByb2Nlc3NWR3V1SDF3Q09CYXRHLUpvS3U0Mk5rSk1DN0N4LXJqRDhGNUVFSUNMVE5QOA5NZXNzYWdlVnZERG93RTNOck5LZkF5WnRmRUdhVExya09ocjNEREIyRF8tVnMyMlo4aWcKTm9uY2UEMTQSVGltZXN0YW1wGjE3NTM4NTc3NjI0NjgA"
}
```

### getAssignByMessage(msgId)

| 方法                         | 描述                    | 参数            | 返回值                |
|------------------------------|-------------------------|------------------|------------------------|
| `getAssignByMessage(msgId)`  | 根据消息 ID 查询任务分配 | `msgId: string` | `BundleItem`  |

```ts
const hyMatrix = new HyMatrix({
  debug: true
})
const messageId = 'vDDowE3NrNKfAyZtfEGaTLrkOhr3DDB2D_-Vs22Z8ig'

hyMatrix.getAssignByMessage(messageId).then(console.log)

{
  "signatureType": 3,
  "signature": "6Jo8HM8mqv8YVb-lcFWf_W4_dUxFAYrf0f-P5Vsjqlp8Ie7Abh1D-bCxY0j6VwjmLtxGKMkNc_BpX2MPwEtvohs",
  "owner": "BKhc8fzcrT9QVrWp4i6RTpke9C5vNb5XjJX18LgrnRzCYGDZcIXztIrR-0hBb_mzF3pjqfl4tMyJ_bGzAWKrqFs",
  "target": "",
  "anchor": "",
  "tags": [...],
  "data": "",
  "id": "igsAKUQ0uGkm6f8o9hEAnQ2-fpEr1b3WpGXWtIwoFUM",
  "tagsBy":   "DhpEYXRhLVByb3RvY29sCGh5bXgOVmFyaWFudAx2MC4xLjAIVHlwZRRBc3NpZ25tZW50DlByb2Nlc3NWR3V1SDF3Q09CYXRHLUpvS3U0Mk5rSk1DN0N4LXJqRDhGNUVFSUNMVE5QOA5NZXNzYWdlVnZERG93RTNOck5LZkF5WnRmRUdhVExya09ocjNEREIyRF8tVnMyMlo4aWcKTm9uY2UEMTQSVGltZXN0YW1wGjE3NTM4NTc3NjI0NjgA"
}
```

### getNodes()

| 方法       | 描述           | 参数 | 返回值             |
|------------|----------------|------|---------------------|
| `getNodes()` | 获取所有节点信息 | 无   | `HMNodeMap` |

```ts
const hyMatrix = new HyMatrix({
  debug: true
})

hyMatrix.getNodes().then(console.log)

{
  "0xCD1Ef67a57a7c03BFB05F175Be10e3eC79821138": {
  "Acc-Id": "0xCD1Ef67a57a7c03BFB05F175Be10e3eC79821138",
  "Name": "permadao",
  "Role": "follower",
  "Desc": "permadao test node",
  "URL": "https://hymx.permadao.io"
  },
  // ...etc
}
```
### getNode(accid?)

| 方法       | 描述             | 参数                    | 返回值           |
|------------|------------------|--------------------------|------------------|
| `getNode()`| 查询单个节点信息 | `accid?: string`         | `HMNode`|

```ts
const accid = '0xCD1Ef67a57a7c03BFB05F175Be10e3eC79821138'
const hyMatrix = new HyMatrix({
  accid: accid,
  debug: true
})
hyMatrix.getNode().then(console.log)
// hyMatrix.getNode(accid).then(console.log)

{
  "Acc-Id": "0xCD1Ef67a57a7c03BFB05F175Be10e3eC79821138",
  "Name": "permadao",
  "Role": "follower",
  "Desc": "permadao test node",
  "URL": "https://hymx.permadao.io"
}
```

### getNodesByProcess(processId)

| 方法                       | 描述                  | 参数                 | 返回值             |
|----------------------------|-----------------------|----------------------|---------------------|
| `getNodesByProcess(...)`   | 查询某个进程的节点信息 | `processId: string` | `HMNode[]` |

```ts
const hyMatrix = new HyMatrix({
  debug: true
})
const processId = 'GuuH1wCOBatG-JoKu42NkJMC7Cx-rjD8F5EEICLTNP8'
hyMatrix.getNodesByProcess(processId).then(console.log)

[
  {
    "Acc-Id": "0xCD1Ef67a57a7c03BFB05F175Be10e3eC79821138",
    "Name": "permadao",
    "Role": "follower",
    "Desc": "permadao test node",
    "URL": "https://hymx.permadao.io"
  },
  // ...
]
```

### getProcesses(accid?)

| 方法              | 描述                    | 参数                 | 返回值              |
|-------------------|-------------------------|----------------------|----------------------|
| `getProcesses()`  | 查询账号创建的进程列表   | `accid?: string`     | `string[]`  |

```ts
const accid = '0xCD1Ef67a57a7c03BFB05F175Be10e3eC79821138'
const hyMatrix = new HyMatrix({
  accid: accid,
  debug: true
})
hyMatrix.getProcesses().then(console.log)
// hyMatrix.getProcesses(accid).then(console.log)

[
  "GuuH1wCOBatG-JoKu42NkJMC7Cx-rjD8F5EEICLTNP8",
  // ...
  // ...
]
```

### balanceOf(accid?)

| 方法           | 描述         | 参数                  | 返回值           |
|----------------|--------------|------------------------|------------------|
| `balanceOf()`  | 查询账号余额 | `accid?: string`       | `string`|

```ts
const accid = '0xCD1Ef67a57a7c03BFB05F175Be10e3eC79821138'
const hyMatrix = new HyMatrix({
  accid: accid,
  debug: true
})
hyMatrix.balanceOf().then(console.log)
// hyMatrix.balanceOf(accid).then(console.log)

"0"
```

### stakeOf(accid?)

| 方法         | 描述           | 参数                  | 返回值           |
|--------------|----------------|------------------------|------------------|
| `stakeOf()`  | 查询账号质押金额 | `accid?: string`       | `string`|

```ts
const accid = '0xCD1Ef67a57a7c03BFB05F175Be10e3eC79821138'
const hyMatrix = new HyMatrix({
  accid: accid,
  debug: true
})
hyMatrix.stakeOf().then(console.log)
// hyMatrix.stakeOf(accid).then(console.log)

"0"
```

### sendMessage(params)

| 方法            | 描述         | 参数                            | 返回值                   |
|-----------------|--------------|----------------------------------|----------------------------|
| `sendMessage()` | 发送签名消息 | `params: SendMessageParams`     | `Response`  |

```ts
// node

import arweaveKeyfile form 'arweaveKeyfile.json'
const arJWK = arweaveKeyfile
// or
const ethereumPrivateKey = '0x...' // 0x + 64位私钥， 共66位

const hyMatrix3 = new HyMatrix({
  privateKey: ethereumPrivateKey,
  // arJWK: arweaveKeyFile
})

// web
import { Web3Provider } from '@ethersproject/providers'
const ethereumPrivateKey = '0x...' // 0x + 64位私钥， 共66位
const arJWK = arweaveKeyfile
const hyMatrix3 = new HyMatrix({
  signer: new Web3Provider(window.ethereum),
  // arJWK: 'use_wallet'
})

// 若多个 ethereum 钱包同时存在，可使用 `eip6963:announceProvider` 和 `eip6963:requestProvider` 区分
// 相关文档 https://eips.ethereum.org/EIPS/eip-6963#announce-and-request-events


```




