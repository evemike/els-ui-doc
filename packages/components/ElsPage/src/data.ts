export const homeData = {
  // 轮播图 走马灯 图片 ， 当数组长度是 0 的时候，走马灯模块将会不显示
  "CAROUSEL":["banner1","banner2","banner3"],
  // 轮播图悬浮图层
  "LAYER":{
    "show":true,
    "background":"",
    "title":"打造服务企业 赋能政府 助力民生产业数字化平台",
    "icons":[
      {"img":"icon1","text":"","link":""},
      {"img":"icon2","text":"","link":""},
      {"img":"icon3","text":"","link":""},
      {"img":"icon4","text":"","link":""},
      {"img":"icon5","text":"","link":""}
    ]
  },
  // 页面显示内容的顺序 , 内容具体配置在下方
  "CONTENTS": [
    "BIG-DATA",
    "IOT",
    "BIDDING",
    "COMPARISON",
    "INDUSTRIAL-CITY",
    "AI",
    "APP-FACTORY",
    "LOW-CODE",
    "INDUSTRIAL-CONFIGURATION",
    "INDUSTRIAL-SAFE"
  ],
  // 大数据平台
  "BIG-DATA": {
    "background": "#014ACA",
    "title": "工业大数据平台",
    "desc": "主要基于Hadoop体系构建，针对工业企业缺乏数据基础、元数据管理、海量数据存储、工业机理通过大数据进行故障分析、预测维修等困难进行技术攻破，降低工业企业应用大数据的成本和门槛。"
  },
  // 工业物联网平台 IOT
  "IOT": {
    "background": "#FFF",
    "title": "工业物联网平台",
    "desc": "工业物联网平台是一个健壮、可扩展和用户友好的平台，为设备提供安全可靠的连接通信能力，向下连接海量工业设备，支撑设备数据采集、数据分析；向上提供云端API，服务端通过远程调用将指令下发至设备端，实现远程控制。工业物联网平台也提供了其他增值能力，如网关、设备管理、规则引擎、边缘计算、可视化报表等，为各类IoT场景、行业客户和开发者赋能"
  },
  // 招投标
  "BIDDING": {
    "background": "#014ACA",
    "title": "招投标",
    "desc": "平台致力于为招投标中介机构（招标代理机构、咨询机构、建设单位、设计单位）、各类供应商、采购商以及海内外机构提供项目招标、采购、招商等信息的发布与查询。平台具有信息的准确性和权威性、丰富的信息数量、信息快捷和准确、广泛的信息覆盖面、强大的技术力量与专业的团队以及优质的服务等优势"
  },
  // 询比价
  "COMPARISON": {
    "background": "#FFF",
    "title": "询比价",
    "desc": "询比价双方可以直接使用本电子询比价平台，在线发布询价项目，并可随时使用专家和供应企业资源，保障高质量完成询价工作。 同时，本平台提供准确的行业讯息和高效的决策分析功能，方便各级领导和监管部门随时掌握业务动态。 本专业平台快捷实现电子询价，帮助询价方专注核心业务，节约管理成本。"
  },
  // 工业品超市
  "INDUSTRIAL-CITY": {
    "background": "#014ACA",
    "title": "工业品超市",
    "desc": "工业品超市是数构工业互联网公司打造的工业品品牌产品在线采购平台，超市汇聚8大主要分类、千余个品牌、上万款产品，为客户提供一站式采购解决方案。"
  },
  // 工业AI平台
  "AI": {
    "background": "#FFF",
    "title": "工业AI平台",
    "desc": "工业AI平台为工业用户提供多种经典机器学习算法和工业算法组件， 支持工业用户以拖拽算法组件及其依赖组件的形式快速构建算法流程并，配置数据源，一键启动执行算法并生成可视化算法输出结果。"
  },
  // 工业应用工厂
  "APP-FACTORY": {
    "background": "#014ACA",
    "title": "工业应用工厂",
    "desc": "工业应用工厂为工业用户提供基于容器技术的企业级Paa平台，基于Docker和Kubernetes提供对应用“开发态”、“部署态”、“运行态”的应用全生命周期管理能力，利用可视化、可配置、自动化持续集成，帮助企业用户快速构建工业应用。"
  },
  // 低代码服务
  "LOW-CODE": {
    "background": "#FFF",
    "title": "低代码服务",
    "desc": "低代码开发平台提供零代码或低代码方式快速交付工业应用的能力，使具有不同经验水平的开发人员通过图形化设计器以拖拽组件和模型驱动的逻辑方式快速构建工业应用。"
  },
  // 工业组态
  "INDUSTRIAL-CONFIGURATION": {
    "background": "#014ACA",
    "title": "工业组态",
    "desc": "工业组态为工业用户提供丰富的可视化组态设计器，涵盖多行业及领域的工业组件、常用非工业组件并提供自定义组件服务，以拖拽组件并配置数据源及告警策略的方式快速构建工业组态及数据大屏等。"
  },
  // 工业安全
  "INDUSTRIAL-SAFE": {
    "background": "#FFF",
    "title": "工业安全",
    "desc": "检测所有在平台上传和下载的文件，保证其安全性，并在此页面中做统一展示。可以直观查看与平台相关的所有文件的安全状态。另外我们连接公共漏洞库，即时展示工控安全范畴内的实时安全情报，结合安全热词和TOP5的风险进行整体态势的感知和主动式防护。"
  }
}


export const introduceData = {
  // 需要显示的详情页，这回影响首页上面的跳转按钮
  "SHOW": [
    "BIG-DATA",
    "IOT",
    "BIDDING",
    "COMPARISON",
    "INDUSTRIAL-CITY",
    "AI",
    "APP-FACTORY",
    "LOW-CODE",
    "INDUSTRIAL-CONFIGURATION",
    "INDUSTRIAL-SAFE"
  ],
  // 大数据平台
  "BIG-DATA": {
    "layout":["zhili","fenxi","cangku"],
    "header":{
      "background":"#014ACA",
      "title":"工业大数据平台",
      "desc":"主要基于Hadoop体系构建，针对工业企业缺乏数据基础、元数据管理、海量数据存储、工业机理通过大数据进行故障分析、预测维修等困难进行技术攻破，降低工业企业应用大数据的成本和门槛。",
      "link":"",
      "linkText":""
    },
    "zhili":{
      "mode":"tabs",
      "title":"数据治理",
      "desc":"数据治理是汉云工业互联网平台为您提供的数",
      "data":[
        {
          "title":"功能特性",
          "data":[
            {
              "icon":"icon-introduce-35",
              "title":"深度洞察",
              "subhead":"",
              "content":["平台聚焦工业大数据管理，洞察工业数据价值。提供丰富的询比价信息，报价方也可直接浏览进行报价申请加入。"]
            },
            {
              "icon":"icon-introduce-26",
              "title":"可管理",
              "subhead":"",
              "content":["提供数据资产管理、数据质量、数据血缘、数据安全和生命周期管理等功能特性。"]
            },
            {
              "icon":"icon-introduce-13",
              "title":"多性能",
              "subhead":"",
              "content":["有效支撑数据仓库构建、数据交互式查询和处理分析、海量工业数据智能报表构建。"]
            }
          ]
        }
        // {
        //   "title":"功能模块",
        //   "data":[]
        // }
      ]
    },
    "fenxi":{
      "mode":"tabs",
      "title":"数据分析",
      "desc":"",
      "data":[
        {
          "title":"实时流数据分析",
          "data":[
            {
              "icon":"icon-introduce-15",
              "title":"低门槛",
              "subhead":"",
              "content":["只用掌握SQL就能进行实时分析。"]
            },
            {
              "icon":"icon-introduce-27",
              "title":"低门槛",
              "subhead":"",
              "content":["可支持上千个节点。"]
            },
            {
              "icon":"icon-introduce-40",
              "title":"高性能",
              "subhead":"",
              "content":["高吞吐-每秒处理的数据量很大、低延迟-数据产生时Flink立刻可以处理掉，数据的产生到处理间隔的时间很短。"]
            }
          ]
        }
        // {
        //   "title":"离线分析计算",
        //   "data":[]
        // },
        // {
        //   "title":"日志分析",
        //   "data":[]
        // }
      ]
    },
    "cangku":{
      "mode":"card",
      "title":"数据仓库",
      "desc":"H-DW数据仓库（简称H-DW）为您提供简单、快速、经济高效的 PB 级云端数据仓库解决方案。H-DW是一种基于 MPP（大规模并行处理）架构的数仓服务。借助于H-DW，您可以使用丰富的 PostgreSQL 等开源生态工具，实现对 海量工业数据的即时查询分析、ETL 处理及可视化探索。",
      "data":[
        {
          "icon":"icon-introduce-14",
          "title":"弹性伸缩",
          "subhead":"",
          "content":["提供便利的弹性扩容能力，通过云控制台或者云AOI简单操作便可以实现数百节点的伸缩或变配。根据业务需求可选择计算单元、CPU、内存、存储空间的等比扩展，提高性能以适配业务的发展。"]
        },
        {
          "icon":"icon-introduce-46",
          "title":"简单易用",
          "subhead":"",
          "content":["通过控制台操作，即可实现集群管理、监控维护等工作，无需关注底层基础设施的繁重运维工作，完全支持ANSI SQL 2008标准，使用标准SQL即可构建企业级数据仓库。支持直接查询COS数据，而无需提前数据预加载。"]
        },
        {
          "icon":"icon-introduce-42",
          "title":"无缝集成",
          "subhead":"",
          "content":["支持COS云存储扩展，实现存储空间的无限扩展。搭配多种工具及方案支持多源数据（如传统关系型数据库、Ckafka、流计算等）告诉导入，实现对云端多元数据的汇聚分析。"]
        },
        {
          "icon":"icon-introduce-44",
          "title":"性能卓越",
          "subhead":"",
          "content":["基于分布式大规模并行处理MPP框架，可线性扩展存储及计算能力。支持行列混合存储，可按业务需求选择最佳存储方案。查询引擎深度优化，查询效率数倍于传统数据仓库。"]
        },
        {
          "icon":"icon-introduce-10",
          "title":"安全可靠",
          "subhead":"",
          "content":["双节点同步冗余，实现用户无感的故障转移和容灾备份。分布式部署。计算单元、服务器、机柜三重防护，提高重要数据基础设施保障。用户集群独立部署，吃吃VPC隔离，数据访问安全多重保障。"]
        }
      ]
    }
  },
  // 工业物联网平台 IOT
  "IOT": {
    "layout":["introduce"],
    "header":{
      "background":"",
      "title":"工业物联网平台",
      "desc":"工业物联网平台是一个健壮、可扩展和用户友好的平台，为设备提供安全可靠的连接通信能力，向下连接海量工业设备，支撑设备数据采集、数据分析；向上提供云端API，服务端通过远程调用将指令下发至设备端，实现远程控制。工业物联网平台也提供了其他增值能力，如网关、设备管理、规则引擎、边缘计算、可视化报表等，为各类IoT场景、行业客户和开发者赋能",
      "link":"",
      "linkText":""
    },
    "introduce":{
      "mode":"list",
      "title":"功能介绍",
      "desc":"",
      "data":[
        {
          "icon":"icon-introduce-33",
          "title":"设备接入",
          "subhead":"",
          "desc":"工业物联网平台支持海量设备连接上云，设备与云端进行稳定可靠地双向通信。",
          "content":[
            "提供网关，将连接到传统和第三方系统的设备与H-IoT集成。",
            "提供2G/ 3G /4G、NB-IoT、LoRaWAN、Wi-Fi等不同网络设备接入方案，解决企业异构网络设备接入管理痛点。",
            "提供MQTT、CoAP、HTTP/S、OPC-UA、OPC-UA等多种协议的设备端SDK，既满足长连接的实时性需求，也满足短连接的低功耗需求。"
          ]
        },
        {
          "icon":"icon-introduce-52",
          "title":"设备管理",
          "desc":"工业物联网平台提供完整的设备生命周期管理功能，支持设备注册、功能定义、数据解析、远程配置、固件升级、远程维护、实时监控、分组管理、设备删除等功能。",
          "content":[
            "提供设备物模型，基于设备生命周期事件的触发操作。例如，如果设备处于联机/脱机状态，则创建警报。",
            "将遥测或属性从设备复制到相关资源，以便可以聚合遥测。例如，来自多个设备的数据可以聚合到相关资产中。",
            "提供数据存储能力，方便用户海量设备数据的存储及实时访问。",
            "提供设备多租户管理机制，安全可靠。"
          ]
        },
        {
          "icon":"icon-introduce-54",
          "title":"规则引擎",
          "desc":"工业物联网平台规则引擎是一个易于使用的框架，用于构建基于事件的工作流。",
          "content":[
            "消息-任何传入事件。它可以是来自设备、设备生命周期事件、REST API事件、RPC请求等的传入数据。",
            "规则节点-对传入的消息执行函数分析。有许多不同的节点类型可以过滤、转换或对传入消息执行某些操作。",
            "规则链-节点之间通过关系配置相互连接，即规则节点的出站消息将发送到下一个连接的规则节点。"
          ]
        },
        {
          "icon":"icon-introduce-12",
          "title":"边缘计算",
          "desc":"工业物联网平台边缘计算将云端的能力下沉到边缘侧，解决边缘实时性、可靠性、运维经济性等方面遇到的问题。 对于运维，云端提供一体化的运维工具，可以在云端集中运维，降低运维成本，提升运维效率。",
          "content":[
            "快速编程，可通过场景规则、函数计算、流数据分析提升开发应用，并将其部署到边缘节点",
            "可在本地对设备数据进行聚合清洗、分级处理。处理后的数据进入大数据平台进行分析存储。"
          ]
        }
      ]
    }
  },
  // 招投标
  "BIDDING": {
    "layout":["features"],
    "header":{
      "background":"",
      "title":"招投标",
      "desc":"平台致力于为招投标中介机构（招标代理机构、咨询机构、建设单位、设计单位）、各类供应商、采购商以及海内外机构提供项目招标、采购、招商等信息的发布与查询。平台具有信息的准确性和权威性、丰富的信息数量、信息快捷和准确、广泛的信息覆盖面、强大的技术力量与专业的团队以及优质的服务等优势",
      "link":"",
      "linkText":""
    },
    "features":{
      "mode":"card",
      "title":"功能特性",
      "data":[
        {
          "icon":"icon-introduce-55",
          "title":"准确性和权威性",
          "subhead":"",
          "content":["与全国众多的招标代理机构和业主单位建立坚实的合作，获取各个行业和地区更为全面和准确的招标、采购及项目信息。"]
        },
        {
          "icon":"icon-introduce-56",
          "title":"丰富的信息数量",
          "subhead":"",
          "content":["国内招标公告数量、拟在建项目、审批项目每日更新数量丰富。"]
        },
        {
          "icon":"icon-introduce-47",
          "title":"信息快捷和准确",
          "subhead":"",
          "content":["VIP独家项目、拟在建项目、招标预告与招标公告相结合，企业提高把握项目的能力和提前调配资源时间。"]
        },
        {
          "icon":"icon-introduce-20",
          "title":"广泛的信息覆盖面",
          "subhead":"",
          "content":["全国各个地区政府采购中心和地区招标代理结构都有完善合作，各个行业所有信息全面提供给您，让您掌握更多商机和信息，开拓业务！"]
        },
        {
          "icon":"icon-introduce-13",
          "title":"优质的服务",
          "subhead":"",
          "content":["我们将会为您设置一对一客服，帮助您搜索到您想要的信息，筛选过滤后并且及时地以电话、邮件、传真等方式通知您。"]
        }
      ]
    }
  },
  // 询比价
  "COMPARISON": {
    "layout":["features"],
    "header":{
      "background":"#014ACA",
      "title":"询比价",
      "desc":"询比价双方可以直接使用本电子询比价平台，在线发布询价项目，并可随时使用专家和供应企业资源，保障高质量完成询价工作。 同时，本平台提供准确的行业讯息和高效的决策分析功能，方便各级领导和监管部门随时掌握业务动态。 本专业平台快捷实现电子询价，帮助询价方专注核心业务，节约管理成本。",
      "link":"http://123.178.235.110:8086/main/purchase/sourcing/inquiry"
    },
    "features":{
      "mode":"card",
      "title":"功能特性",
      "data":[
        {
          "icon":"icon-introduce-55",
          "title":"丰富的询比价信息",
          "subhead":"",
          "content":["平台提供丰富的询比价信息，报价方也可直接浏览进行报价申请加入。"]
        },
        {
          "icon":"icon-introduce-56",
          "title":"公平公正的流程",
          "subhead":"",
          "content":["本系统的优势是提供了公平公正的流程，并符合国家的法规，以及安全监管，权限隔离，并提供多种询比价模式。"]
        },
        {
          "icon":"icon-introduce-47",
          "title":"提供更丰富的功能和接口",
          "subhead":"",
          "content":["在全流程的基础上，提供更丰富的功能和接口， 能满足不同行业的询比价需求。"]
        }
      ]
    }
  },
  // 工业品超市
  "INDUSTRIAL-CITY": {
    "layout":["features"],
    "header":{
      "background":"#014ACA",
      "title":"工业品超市",
      "desc":"工业品超市是数构工业互联网公司打造的工业品品牌产品在线采购平台，超市汇聚8大主要分类、千余个品牌、上万款产品，为客户提供一站式采购解决方案。",
      "link":"http://123.178.235.110:8086/main/purchasingMall/shoppingIndex"
    },
    "features":{
      "mode":"card",
      "title":"功能特性",
      "data":[
        {
          "icon":"icon-introduce-55",
          "title":"海量商品供应",
          "subhead":"",
          "content":["工业品超市为客户提供一站式的工业用品采购与管理服务，主要经营辅料、易耗品、通用设备、备品备件等工业用品"]
        },
        {
          "icon":"icon-introduce-56",
          "title":"通用设备在线运维",
          "subhead":"",
          "content":["数字化管理，大数据运算，一键安装更便捷更高效"]
        },
        {
          "icon":"icon-introduce-47",
          "title":"专业化物流",
          "subhead":"",
          "content":["可以提供专业化的物流服务，物流服务专业化体现在具有快捷完善的配货能力、具有高效的送货能力"]
        }
      ]
    }
  },
  // 工业AI平台
  "AI": {
    "layout":["features"],
    "header":{
      "background":"#014ACA",
      "title":"工业AI平台",
      "desc":"工业AI平台为工业用户提供多种经典机器学习算法和工业算法组件， 支持工业用户以拖拽算法组件及其依赖组件的形式快速构建算法流程并，配置数据源，一键启动执行算法并生成可视化算法输出结果。",
      "link":""
    },
    "features":{
      "mode":"card",
      "title":"功能特性",
      "desc":"基于数构云基础功能打造的一站式AI服务方案，本平台提供了包含数据加工，引导式建模，分布式计算以及灵活模型部署模块。海量业务沉淀的工业机理模型，专业便捷的机器学习模型，模型迭代训练以及多版本模型对比分析。支持算法工程师以及具备有限机器学习的业务用户快速构建模型，数构云平台能力更方便用户高效利用硬件计算资源，提高产业生产力。",
      "data":[
        {
          "icon":"icon-introduce-38",
          "title":"数据源准备",
          "subhead":"",
          "content":["数据加载，支持本地数据文件以及数据库数据导入"]
        },
        {
          "icon":"icon-introduce-30",
          "title":"模型训练",
          "subhead":"",
          "content":["基于场景的业务模型训练过程管理，支持模型定制，迭代以及应用输出"]
        },
        {
          "icon":"icon-introduce-51",
          "title":"智能预测",
          "subhead":"",
          "content":["利用训练好的业务模型，对实际数据进行预测"]
        },
        {
          "icon":"icon-introduce-52",
          "title":"执行器管理",
          "subhead":"",
          "content":["执行器管理，支持计算资源的分配调度以及可视化监控。"]
        }
      ]
    }
  },
  // 工业应用工厂
  "APP-FACTORY": {
    "layout":["features"],
    "header":{
      "background":"#014ACA",
      "title":"工业应用工厂",
      "desc":"工业应用工厂为工业用户提供基于容器技术的企业级Paa平台，基于Docker和Kubernetes提供对应用“开发态”、“部署态”、“运行态”的应用全生命周期管理能力，利用可视化、可配置、自动化持续集成，帮助企业用户快速构建工业应用。",
      "link":""
    },
    "features":{
      "mode":"card",
      "title":"功能特性",
      "data":[
        {
          "icon":"icon-introduce-45",
          "title":"一键部署",
          "subhead":"",
          "content":["提供可视化持续流水线，实现从源码到发布的一键式部署。"]
        },
        {
          "icon":"icon-introduce-18",
          "title":"多租户管理",
          "subhead":"",
          "content":["灵活的多租户模型，可适配企业客户不同的租户模型需求，满足企业运营的灵活化管理。"]
        },
        {
          "icon":"icon-introduce-29",
          "title":"扩容方便",
          "subhead":"",
          "content":["支持应用发布、灰度发布、扩容缩容等（应用部署相关功能）和调度；提供 4 层负载和 7 层负载能力等。"]
        },
        {
          "icon":"icon-introduce-31",
          "title":"扩容方便",
          "subhead":"",
          "content":["支持应用发布、灰度发布、扩容缩容等（应用部署相关功能）和调度；提供 4 层负载和 7 层负载能力等。"]
        },
        {
          "icon":"icon-introduce-25",
          "title":"执行器管理",
          "subhead":"",
          "content":["标准化的应用开发，支持灰度发布及应用回滚高效弹性伸缩，应对天量行情。"]
        }
      ]
    }
  },
  // 低代码服务
  "LOW-CODE": {
    "layout":["features"],
    "header":{
      "background":"#014ACA",
      "title":"低代码服务",
      "desc":"低代码开发平台提供零代码或低代码方式快速交付工业应用的能力，使具有不同经验水平的开发人员通过图形化设计器以拖拽组件和模型驱动的逻辑方式快速构建工业应用。",
      "link":""
    },
    "features":{
      "mode":"card",
      "title":"功能特性",
      "data":[
        {
          "icon":"icon-introduce-55",
          "title":"可视化设计",
          "subhead":"",
          "content":["可视化动态设计流程，清晰直观展示业务逻辑。"]
        },
        {
          "icon":"icon-introduce-56",
          "title":"源代码扩展",
          "subhead":"",
          "content":["源码可供自由扩展生成所需应用。"]
        },
        {
          "icon":"icon-introduce-47",
          "title":"云原生技术",
          "subhead":"",
          "content":["云生态技术简单、高效，采用云原生技术为基础，适配绝大多数开发者能力，无缝对接后期组件升级。"]
        }
      ]
    }
  },
  // 工业组态
  "INDUSTRIAL-CONFIGURATION": {
    "layout":["features"],
    "header":{
      "background":"#014ACA",
      "title":"工业组态",
      "desc":"工业组态为工业用户提供丰富的可视化组态设计器，涵盖多行业及领域的工业组件、常用非工业组件并提供自定义组件服务，以拖拽组件并配置数据源及告警策略的方式快速构建工业组态及数据大屏等。",
      "link":""
    },
    "features":{
      "mode":"card",
      "title":"功能特性",
      "data":[
        {
          "icon":"icon-introduce-17",
          "title":"多源数据支持",
          "subhead":"",
          "content":["组件范围广泛，支持多种类型数据源，可与物联网API接口完美对接，租户数据隔离安全可靠。"]
        },
        {
          "icon":"icon-introduce-43",
          "title":"无码化操作",
          "subhead":"",
          "content":["简单易用，支持可视化设计、在线预览、发布分享等。"]
        }
      ]
    }
  },
  // 工业安全
  "INDUSTRIAL-SAFE": {
    "layout":["features"],
    "header":{
      "background":"",
      "title":"工业安全",
      "desc":"检测所有在平台上传和下载的文件，保证其安全性，并在此页面中做统一展示。可以直观查看与平台相关的所有文件的安全状态。另外我们连接公共漏洞库，即时展示工控安全范畴内的实时安全情报，结合安全热词和TOP5的风险进行整体态势的感知和主动式防护。",
      "link":"",
      "linkText":""
    },
    "features":{
      "mode":"card",
      "title":"功能特性",
      "data":[
        {
          "icon":"icon-introduce-55",
          "title":"文件检测",
          "subhead":"",
          "content":["可以检测文件，并依据检测结果将文件分为 含风险文件、需复检文件、安全文件 三类"]
        },
        {
          "icon":"icon-introduce-56",
          "title":"漏洞扫描",
          "subhead":"",
          "content":["定时扫描漏洞，即时报告以修复漏洞"]
        },
        {
          "icon":"icon-introduce-47",
          "title":"实时情报",
          "subhead":"",
          "content":["实时报告服务运行状态"]
        }
      ]
    }
  }
}
