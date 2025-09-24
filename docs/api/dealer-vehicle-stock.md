### 查询经销商库存/车辆信息（最新库存记录）

— 版本 1.0

## 1. 基本信息
- **接口名称**: 查询经销商库存/车辆信息（最新库存记录）
- **接口描述**: 按品牌、条件或 VIN 列表查询经销商最新一条库存记录的车辆信息。
- **请求方式**: POST
- **接口地址**: `/api/v1/query/dealer/vehicle/stock`
- **环境**: `prod` | `uat`（示例）

## 2. 认证
- **类型**: HTTP Basic
- **说明**: `Authorization: Basic Base64(appKey:appSecret)`

## 3. 请求头
| 名称 | 必填 | 示例 | 说明 |
|---|---|---|---|
| Authorization | 是 | Basic dGVzdEFwcEtleTp0ZXN0QXBwU2VjcmV0 | HTTP Basic 凭据 |
| Content-Type | 是 | application/json | 请求体 JSON |

## 4. 请求体

### 4.1 JSON 结构
```json
{
  "brand": "某品牌",
  "filters": {
    "dealerCodes": ["D001", "D002"],
    "province": "上海",
    "city": "上海",
    "warehouseTypes": ["自建仓", "第三方仓"],
    "dateRange": {
      "begin": "2025-01-01T00:00:00+08:00",
      "end": "2025-12-31T23:59:59+08:00"
    }
  },
  "vins": ["LDC12345678900001", "LDC12345678900002"]
}
```

### 4.2 字段说明
| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| brand | String | 是 | 品牌标识 |
| filters | Object | 否 | 组合筛选条件 |
| filters.dealerCodes | Array[String] | 否 | 经销商编码列表 |
| filters.province | String | 否 | 省份 |
| filters.city | String | 否 | 城市 |
| filters.warehouseTypes | Array[String] | 否 | 仓库类型（自建仓/第三方仓等） |
| filters.dateRange | Object | 否 | 记录时间范围（闭区间） |
| filters.dateRange.begin | String(DateTime) | 否 | 开始时间（ISO8601） |
| filters.dateRange.end | String(DateTime) | 否 | 结束时间（ISO8601） |
| vins | Array[String] | 否 | VIN 列表；存在时优先生效 |

## 5. 响应

### 5.1 成功响应示例
```json
{
  "code": "0",
  "msg": "operation successful",
  "data": [
    {
      "vin": "LDC12345678900001",
      "brand": "某品牌",
      "modelCode": "ABC-2025",
      "modelName": "旗舰版",
      "vehicleTypeCode": "SUV",
      "vehicleTypeName": "运动型多用途车",
      "color": "珍珠白",
      "engineNo": "EN12345678",
      "productionOrderNumber": "PO202509010001",
      "microWarrantyNumber": "MWN-0001",
      "warehouseCode": "WH001",
      "warehouseName": "华东中心仓",
      "dealerCode": "D001",
      "dealerName": "上海XX经销商",
      "stockStatus": "在库",
      "stockInTime": "2025-09-01T08:30:00+08:00",
      "lastUpdateTime": "2025-09-24T10:00:00+08:00",
      "odometerKm": 0,
      "remark": null
    }
  ]
}
```

### 5.2 字段说明（data[]）
| 字段 | 类型 | 约束/示例 | 说明 |
|---|---|---|---|
| vin | String | LDC12345678900001 | 车辆 VIN |
| brand | String | 某品牌 | 品牌 |
| modelCode | String | ABC-2025 | 车型编码 |
| modelName | String | 旗舰版 | 车型名称 |
| vehicleTypeCode | String | SUV | 车辆类型编码 |
| vehicleTypeName | String | 运动型多用途车 | 车辆类型名称 |
| color | String | 珍珠白 | 车身颜色 |
| engineNo | String | EN12345678 | 发动机号 |
| productionOrderNumber | String | PO202509010001 | 生产/工单号 |
| microWarrantyNumber | String | MWN-0001 | 微担保号/微保单号（如有） |
| warehouseCode | String | WH001 | 仓库编码 |
| warehouseName | String | 华东中心仓 | 仓库名称 |
| dealerCode | String | D001 | 经销商编码 |
| dealerName | String | 上海XX经销商 | 经销商名称 |
| stockStatus | String | 在库/已出库 | 最新库存状态 |
| stockInTime | String(DateTime) | 2025-09-01T08:30:00+08:00 | 入库时间 |
| lastUpdateTime | String(DateTime) | 2025-09-24T10:00:00+08:00 | 最新库存更新时间 |
| odometerKm | Number | 0 | 里程（公里） |
| remark | String/null | - | 备注 |

### 5.3 失败响应示例
```json
{
  "code": "1001",
  "msg": "authorization failed",
  "data": null
}
```

## 6. 状态码说明
| code | 含义 |
|---|---|
| 0 | 成功 |
| 1001 | 认证失败或凭据无效 |
| 1002 | 参数错误 |
| 1003 | 无数据 |
| 1999 | 未知错误 |

## 7. 备注
- 若提供 `vins`，系统将忽略其他筛选条件并直接按 VIN 查询。
- HTTP Basic 认证需使用平台分配的 `appKey` 与 `appSecret`。
- 时间字段统一为 ISO8601 字符串并带时区。

## 8. 变更记录
| 版本 | 日期 | 作者 | 说明 |
|---|---|---|---|
| 1.0 | 2025-09-24 | 系统生成 | 初始版本 |

