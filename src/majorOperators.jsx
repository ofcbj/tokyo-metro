// 3개 이상의 노선을 가진 주요 운영회사 데이터
export const majorOperators = {
  "東京都交通局": [
    {
      id: "99302",
      nameKo: "아사쿠사선",
      nameJp: "都営浅草線",
      color: "#E85298",
      stations: [
        {
          name: "西馬込",
          lat: 35.586859,
          lng: 139.705942
        },
        {
          name: "馬込",
          lat: 35.596435,
          lng: 139.711772
        },
        {
          name: "中延",
          lat: 35.605769,
          lng: 139.713736
        },
        {
          name: "戸越",
          lat: 35.614633,
          lng: 139.716495
        },
        {
          name: "五反田",
          lat: 35.627102,
          lng: 139.724175
        },
        {
          name: "高輪台",
          lat: 35.631679,
          lng: 139.730305
        },
        {
          name: "泉岳寺",
          lat: 35.638692,
          lng: 139.74002,
          transfer: true
        },
        {
          name: "三田",
          lat: 35.64818,
          lng: 139.748775,
          transfer: true
        },
        {
          name: "大門",
          lat: 35.656785,
          lng: 139.75466,
          transfer: true
        },
        {
          name: "新橋",
          lat: 35.665577,
          lng: 139.759451
        },
        {
          name: "東銀座",
          lat: 35.669464,
          lng: 139.767253,
          transfer: true
        },
        {
          name: "宝町",
          lat: 35.675461,
          lng: 139.771767
        },
        {
          name: "日本橋",
          lat: 35.681688,
          lng: 139.775721
        },
        {
          name: "人形町",
          lat: 35.686307,
          lng: 139.782285,
          transfer: true
        },
        {
          name: "東日本橋",
          lat: 35.692126,
          lng: 139.784821
        },
        {
          name: "浅草橋",
          lat: 35.697451,
          lng: 139.786305
        },
        {
          name: "蔵前",
          lat: 35.703236,
          lng: 139.790931,
          transfer: true
        },
        {
          name: "浅草",
          lat: 35.709461,
          lng: 139.79697
        },
        {
          name: "本所吾妻橋",
          lat: 35.70858,
          lng: 139.804624
        },
        {
          name: "押上（スカイツリー前）",
          lat: 35.710702,
          lng: 139.812935,
          transfer: true
        }
      ]
    },
    {
      id: "99303",
      nameKo: "미타선",
      nameJp: "都営三田線",
      color: "#0079C2",
      stations: [
        {
          name: "目黒",
          lat: 35.633272,
          lng: 139.7155,
          transfer: true
        },
        {
          name: "白金台",
          lat: 35.637917,
          lng: 139.726133,
          transfer: true
        },
        {
          name: "白金高輪",
          lat: 35.642903,
          lng: 139.734104,
          transfer: true
        },
        {
          name: "三田",
          lat: 35.64818,
          lng: 139.748775,
          transfer: true
        },
        {
          name: "芝公園",
          lat: 35.654074,
          lng: 139.749824
        },
        {
          name: "御成門",
          lat: 35.661215,
          lng: 139.751535
        },
        {
          name: "内幸町",
          lat: 35.66975,
          lng: 139.75561
        },
        {
          name: "日比谷",
          lat: 35.676036,
          lng: 139.759998
        },
        {
          name: "大手町",
          lat: 35.684856,
          lng: 139.762959
        },
        {
          name: "神保町",
          lat: 35.695492,
          lng: 139.75812
        },
        {
          name: "水道橋",
          lat: 35.703398,
          lng: 139.75516
        },
        {
          name: "春日",
          lat: 35.709598,
          lng: 139.75325,
          transfer: true
        },
        {
          name: "白山",
          lat: 35.721408,
          lng: 139.752136
        },
        {
          name: "千石",
          lat: 35.727957,
          lng: 139.744792
        },
        {
          name: "巣鴨",
          lat: 35.733502,
          lng: 139.738519
        },
        {
          name: "西巣鴨",
          lat: 35.743508,
          lng: 139.728712
        },
        {
          name: "新板橋",
          lat: 35.748785,
          lng: 139.720101
        },
        {
          name: "板橋区役所前",
          lat: 35.751284,
          lng: 139.710102
        },
        {
          name: "板橋本町",
          lat: 35.761339,
          lng: 139.705535
        },
        {
          name: "本蓮沼",
          lat: 35.768782,
          lng: 139.702324
        },
        {
          name: "志村坂上",
          lat: 35.775725,
          lng: 139.69538
        },
        {
          name: "志村三丁目",
          lat: 35.777391,
          lng: 139.685937
        },
        {
          name: "蓮根",
          lat: 35.784335,
          lng: 139.678993
        },
        {
          name: "西台",
          lat: 35.78699,
          lng: 139.673971
        },
        {
          name: "高島平",
          lat: 35.789056,
          lng: 139.661216
        },
        {
          name: "新高島平",
          lat: 35.790189,
          lng: 139.654275
        },
        {
          name: "西高島平",
          lat: 35.791833,
          lng: 139.64594
        }
      ]
    },
    {
      id: "99304",
      nameKo: "신주쿠선",
      nameJp: "都営新宿線",
      color: "#6CBB5A",
      stations: [
        {
          name: "新宿",
          lat: 35.68869,
          lng: 139.698812,
          transfer: true
        },
        {
          name: "新宿三丁目",
          lat: 35.690616,
          lng: 139.706271
        },
        {
          name: "曙橋",
          lat: 35.692402,
          lng: 139.722881
        },
        {
          name: "市ヶ谷",
          lat: 35.691556,
          lng: 139.737639
        },
        {
          name: "九段下",
          lat: 35.695589,
          lng: 139.751948,
          transfer: true
        },
        {
          name: "神保町",
          lat: 35.695966,
          lng: 139.757606,
          transfer: true
        },
        {
          name: "小川町",
          lat: 35.695056,
          lng: 139.766667
        },
        {
          name: "岩本町",
          lat: 35.695534,
          lng: 139.775866
        },
        {
          name: "馬喰横山",
          lat: 35.69212,
          lng: 139.782768
        },
        {
          name: "浜町",
          lat: 35.688516,
          lng: 139.788154
        },
        {
          name: "森下",
          lat: 35.68796,
          lng: 139.797042,
          transfer: true
        },
        {
          name: "菊川",
          lat: 35.688379,
          lng: 139.806016
        },
        {
          name: "住吉",
          lat: 35.689073,
          lng: 139.815681,
          transfer: true
        },
        {
          name: "西大島",
          lat: 35.689349,
          lng: 139.826206
        },
        {
          name: "大島",
          lat: 35.689905,
          lng: 139.83565
        },
        {
          name: "東大島",
          lat: 35.690355,
          lng: 139.845963
        },
        {
          name: "船堀",
          lat: 35.683795,
          lng: 139.864258
        },
        {
          name: "一之江",
          lat: 35.686055,
          lng: 139.882934
        },
        {
          name: "瑞江",
          lat: 35.693318,
          lng: 139.89761
        },
        {
          name: "篠崎",
          lat: 35.706017,
          lng: 139.903698
        },
        {
          name: "本八幡",
          lat: 35.722929,
          lng: 139.926628
        }
      ]
    },
    {
      id: "99301",
      nameKo: "오에도선",
      nameJp: "都営大江戸線",
      color: "#B6007A",
      stations: [
        {
          name: "都庁前",
          lat: 35.690551,
          lng: 139.69257
        },
        {
          name: "新宿西口",
          lat: 35.693315,
          lng: 139.699155
        },
        {
          name: "東新宿",
          lat: 35.69792,
          lng: 139.707549
        },
        {
          name: "若松河田",
          lat: 35.699218,
          lng: 139.718184
        },
        {
          name: "牛込柳町",
          lat: 35.699518,
          lng: 139.725027
        },
        {
          name: "牛込神楽坂",
          lat: 35.700851,
          lng: 139.735802
        },
        {
          name: "飯田橋",
          lat: 35.702927,
          lng: 139.744999
        },
        {
          name: "春日",
          lat: 35.709598,
          lng: 139.75325,
          transfer: true
        },
        {
          name: "本郷三丁目",
          lat: 35.707462,
          lng: 139.760095
        },
        {
          name: "上野御徒町",
          lat: 35.707893,
          lng: 139.774332
        },
        {
          name: "新御徒町",
          lat: 35.707045,
          lng: 139.781958
        },
        {
          name: "蔵前",
          lat: 35.703236,
          lng: 139.790931,
          transfer: true
        },
        {
          name: "両国",
          lat: 35.696881,
          lng: 139.797421
        },
        {
          name: "森下",
          lat: 35.68796,
          lng: 139.797042,
          transfer: true
        },
        {
          name: "清澄白河",
          lat: 35.682105,
          lng: 139.798851,
          transfer: true
        },
        {
          name: "門前仲町",
          lat: 35.671851,
          lng: 139.796209,
          transfer: true
        },
        {
          name: "月島",
          lat: 35.664871,
          lng: 139.784233,
          transfer: true
        },
        {
          name: "勝どき",
          lat: 35.658507,
          lng: 139.776442
        },
        {
          name: "築地市場",
          lat: 35.664895,
          lng: 139.766915
        },
        {
          name: "汐留",
          lat: 35.663703,
          lng: 139.760642
        },
        {
          name: "大門",
          lat: 35.656785,
          lng: 139.75466,
          transfer: true
        },
        {
          name: "赤羽橋",
          lat: 35.655007,
          lng: 139.743642
        },
        {
          name: "麻布十番",
          lat: 35.656503,
          lng: 139.736116
        },
        {
          name: "六本木",
          lat: 35.663921,
          lng: 139.731567
        },
        {
          name: "青山一丁目",
          lat: 35.672929,
          lng: 139.72396
        },
        {
          name: "国立競技場",
          lat: 35.679831,
          lng: 139.714932
        },
        {
          name: "代々木",
          lat: 35.683218,
          lng: 139.701666
        },
        {
          name: "新宿",
          lat: 35.68869,
          lng: 139.698812,
          transfer: true
        },
        {
          name: "西新宿五丁目",
          lat: 35.689798,
          lng: 139.684304
        },
        {
          name: "中野坂上",
          lat: 35.69709,
          lng: 139.682279
        },
        {
          name: "東中野",
          lat: 35.706891,
          lng: 139.682987
        },
        {
          name: "中井",
          lat: 35.714035,
          lng: 139.686356
        },
        {
          name: "落合南長崎",
          lat: 35.723608,
          lng: 139.683303
        },
        {
          name: "新江古田",
          lat: 35.732538,
          lng: 139.670653
        },
        {
          name: "練馬",
          lat: 35.737404,
          lng: 139.65477
        },
        {
          name: "豊島園",
          lat: 35.742567043044,
          lng: 139.64894845621
        },
        {
          name: "練馬春日町",
          lat: 35.751452,
          lng: 139.640236
        },
        {
          name: "光が丘",
          lat: 35.758526,
          lng: 139.628603
        }
      ]
    },
    {
      id: "99342",
      nameKo: "닛포리-토네리 라이너",
      nameJp: "日暮里・舎人ライナー",
      color: "#E74C3C",
      stations: [
        {
          name: "日暮里",
          lat: 35.727908,
          lng: 139.771287,
          transfer: true
        },
        {
          name: "西日暮里",
          lat: 35.731954,
          lng: 139.766857,
          transfer: true
        },
        {
          name: "赤土小学校前",
          lat: 35.742454,
          lng: 139.768989
        },
        {
          name: "熊野前",
          lat: 35.748972,
          lng: 139.769695
        },
        {
          name: "足立小台",
          lat: 35.754658,
          lng: 139.770381
        },
        {
          name: "扇大橋",
          lat: 35.763897,
          lng: 139.770808
        },
        {
          name: "高野",
          lat: 35.768359,
          lng: 139.770679
        },
        {
          name: "江北",
          lat: 35.774021,
          lng: 139.770306
        },
        {
          name: "西新井大師西",
          lat: 35.781505,
          lng: 139.770094
        },
        {
          name: "谷在家",
          lat: 35.788774,
          lng: 139.770043
        },
        {
          name: "舎人公園",
          lat: 35.79623,
          lng: 139.770183
        },
        {
          name: "舎人",
          lat: 35.8057,
          lng: 139.770108
        },
        {
          name: "見沼代親水公園",
          lat: 35.814544,
          lng: 139.770719
        }
      ]
    }
  ],
  "東京メトロ": [
    {
      id: "28001",
      nameKo: "긴자선",
      nameJp: "東京メトロ銀座線",
      color: "#FF9500",
      stations: [
        {
          name: "浅草",
          lat: 35.710733,
          lng: 139.797592
        },
        {
          name: "田原町",
          lat: 35.709897,
          lng: 139.790897
        },
        {
          name: "稲荷町",
          lat: 35.711273,
          lng: 139.782593
        },
        {
          name: "上野",
          lat: 35.711482,
          lng: 139.777122,
          transfer: true
        },
        {
          name: "上野広小路",
          lat: 35.70768,
          lng: 139.772877
        },
        {
          name: "末広町",
          lat: 35.702972,
          lng: 139.771713
        },
        {
          name: "神田",
          lat: 35.693587,
          lng: 139.770899
        },
        {
          name: "三越前",
          lat: 35.687101,
          lng: 139.773594
        },
        {
          name: "日本橋",
          lat: 35.682078,
          lng: 139.773516,
          transfer: true
        },
        {
          name: "京橋",
          lat: 35.676856,
          lng: 139.770126
        },
        {
          name: "銀座",
          lat: 35.671989,
          lng: 139.763965,
          transfer: true
        },
        {
          name: "新橋",
          lat: 35.667434,
          lng: 139.758432
        },
        {
          name: "虎ノ門",
          lat: 35.670236,
          lng: 139.749832
        },
        {
          name: "溜池山王",
          lat: 35.673621,
          lng: 139.741419,
          transfer: true
        },
        {
          name: "赤坂見附",
          lat: 35.677021,
          lng: 139.737047,
          transfer: true
        },
        {
          name: "青山一丁目",
          lat: 35.672765,
          lng: 139.724159,
          transfer: true
        },
        {
          name: "外苑前",
          lat: 35.670527,
          lng: 139.717857
        },
        {
          name: "表参道",
          lat: 35.665247,
          lng: 139.712314,
          transfer: true
        },
        {
          name: "渋谷",
          lat: 35.659066,
          lng: 139.701,
          transfer: true
        }
      ]
    },
    {
      id: "28002",
      nameKo: "마루노우치선",
      nameJp: "東京メトロ丸ノ内線",
      color: "#F62E36",
      stations: [
        {
          name: "池袋",
          lat: 35.730256,
          lng: 139.711086,
        },
        {
          name: "新大塚",
          lat: 35.72569,
          lng: 139.729971,
        },
        {
          name: "茗荷谷",
          lat: 35.716989,
          lng: 139.737184,
        },
        {
          name: "後楽園",
          lat: 35.707898,
          lng: 139.751864,
        },
        {
          name: "本郷三丁目",
          lat: 35.706671,
          lng: 139.759914,
        },
        {
          name: "御茶ノ水",
          lat: 35.700614,
          lng: 139.763952,
        },
        {
          name: "淡路町",
          lat: 35.6953595,
          lng: 139.7675149,
        },
        {
          name: "大手町",
          lat: 35.686564,
          lng: 139.7662,
        },
        {
          name: "東京",
          lat: 35.681753,
          lng: 139.764708,
        },
        {
          name: "銀座",
          lat: 35.671989,
          lng: 139.763965,
        },
        {
          name: "霞ケ関",
          lat: 35.673838,
          lng: 139.750899,
        },
        {
          name: "国会議事堂前",
          lat: 35.67393,
          lng: 139.745219,
        },
        {
          name: "赤坂見附",
          lat: 35.677021,
          lng: 139.737047,
        },
        {
          name: "四ツ谷",
          lat: 35.684586,
          lng: 139.729947,
        },
        {
          name: "四谷三丁目",
          lat: 35.687958,
          lng: 139.720103,
        },
        {
          name: "新宿御苑前",
          lat: 35.688588,
          lng: 139.71069,
        },
        {
          name: "新宿三丁目",
          lat: 35.690847,
          lng: 139.704895,
        },
        {
          name: "新宿",
          lat: 35.69235,
          lng: 139.700711,
        },
        {
          name: "西新宿",
          lat: 35.694298,
          lng: 139.692778,
        },
        {
          name: "中野坂上",
          lat: 35.69792,
          lng: 139.68291,
        },
        {
          name: "新中野",
          lat: 35.697491,
          lng: 139.66903,
        },
        {
          name: "東高円寺",
          lat: 35.697802,
          lng: 139.657822,
        },
        {
          name: "新高円寺",
          lat: 35.697985,
          lng: 139.648068,
        },
        {
          name: "南阿佐ケ谷",
          lat: 35.699624,
          lng: 139.63576,
        },
        {
          name: "荻窪",
          lat: 35.704304,
          lng: 139.620116,
        },
        {
          name: "中野新橋",
          lat: 35.692123,
          lng: 139.673997,
        },
        {
          name: "中野富士見町",
          lat: 35.690514,
          lng: 139.666933,
        },
        {
          name: "方南町",
          lat: 35.683496,
          lng: 139.656498,
        }
      ]
    },
    {
      id: "28003",
      nameKo: "히비야선",
      nameJp: "東京メトロ日比谷線",
      color: "#B5B5AC",
      stations: [
        {
          name: "北千住",
          lat: 35.748916,
          lng: 139.804276,
          transfer: true
        },
        {
          name: "南千住",
          lat: 35.733398,
          lng: 139.799273
        },
        {
          name: "三ノ輪",
          lat: 35.729623,
          lng: 139.791485
        },
        {
          name: "入谷",
          lat: 35.719862,
          lng: 139.783924
        },
        {
          name: "上野",
          lat: 35.711482,
          lng: 139.777122,
          transfer: true
        },
        {
          name: "仲御徒町",
          lat: 35.706649,
          lng: 139.776138
        },
        {
          name: "秋葉原",
          lat: 35.698162,
          lng: 139.775459
        },
        {
          name: "小伝馬町",
          lat: 35.690737,
          lng: 139.778433
        },
        {
          name: "人形町",
          lat: 35.686307,
          lng: 139.782285,
          transfer: true
        },
        {
          name: "茅場町",
          lat: 35.679752,
          lng: 139.780005,
          transfer: true
        },
        {
          name: "八丁堀",
          lat: 35.674851,
          lng: 139.776982
        },
        {
          name: "築地",
          lat: 35.668115,
          lng: 139.772603
        },
        {
          name: "東銀座",
          lat: 35.669464,
          lng: 139.767253,
          transfer: true
        },
        {
          name: "銀座",
          lat: 35.671989,
          lng: 139.763965,
          transfer: true
        },
        {
          name: "日比谷",
          lat: 35.67459,
          lng: 139.76017
        },
        {
          name: "霞ケ関",
          lat: 35.673838,
          lng: 139.750899,
          transfer: true
        },
        {
          name: "虎ノ門ヒルズ",
          lat: 35.667444,
          lng: 139.747778
        },
        {
          name: "神谷町",
          lat: 35.662978,
          lng: 139.745069
        },
        {
          name: "六本木",
          lat: 35.662836,
          lng: 139.731443
        },
        {
          name: "広尾",
          lat: 35.652279,
          lng: 139.722202
        },
        {
          name: "恵比寿",
          lat: 35.647332,
          lng: 139.708988
        },
        {
          name: "中目黒",
          lat: 35.643854,
          lng: 139.698621,
          transfer: true
        }
      ]
    },
    {
      id: "28004",
      nameKo: "도자이선",
      nameJp: "東京メトロ東西線",
      color: "#009BBF",
      stations: [
        {
          name: "中野",
          lat: 35.705765,
          lng: 139.665835,
          transfer: true
        },
        {
          name: "落合",
          lat: 35.710976,
          lng: 139.687284
        },
        {
          name: "高田馬場",
          lat: 35.713338,
          lng: 139.704745
        },
        {
          name: "早稲田",
          lat: 35.705723,
          lng: 139.721319
        },
        {
          name: "神楽坂",
          lat: 35.70379,
          lng: 139.734546
        },
        {
          name: "飯田橋",
          lat: 35.701725,
          lng: 139.745986
        },
        {
          name: "九段下",
          lat: 35.695589,
          lng: 139.751948,
          transfer: true
        },
        {
          name: "竹橋",
          lat: 35.690662,
          lng: 139.756817
        },
        {
          name: "大手町",
          lat: 35.684801,
          lng: 139.766086
        },
        {
          name: "日本橋",
          lat: 35.682078,
          lng: 139.773516,
          transfer: true
        },
        {
          name: "茅場町",
          lat: 35.679752,
          lng: 139.780005,
          transfer: true
        },
        {
          name: "門前仲町",
          lat: 35.671851,
          lng: 139.796209,
          transfer: true
        },
        {
          name: "木場",
          lat: 35.669351,
          lng: 139.807042
        },
        {
          name: "東陽町",
          lat: 35.669629,
          lng: 139.817596
        },
        {
          name: "南砂町",
          lat: 35.668796,
          lng: 139.83065
        },
        {
          name: "西葛西",
          lat: 35.664631,
          lng: 139.859259
        },
        {
          name: "葛西",
          lat: 35.663554,
          lng: 139.872458
        },
        {
          name: "浦安",
          lat: 35.665932,
          lng: 139.893193
        },
        {
          name: "南行徳",
          lat: 35.672687,
          lng: 139.902311
        },
        {
          name: "行徳",
          lat: 35.682686,
          lng: 139.914254
        },
        {
          name: "妙典",
          lat: 35.690935,
          lng: 139.924209
        },
        {
          name: "原木中山",
          lat: 35.703517,
          lng: 139.942029
        },
        {
          name: "西船橋",
          lat: 35.707127,
          lng: 139.958972
        }
      ]
    },
    {
      id: "28005",
      nameKo: "치요다선",
      nameJp: "東京メトロ千代田線",
      color: "#00BB85",
      stations: [
        {
          name: "北綾瀬",
          lat: 35.777117,
          lng: 139.832035
        },
        {
          name: "綾瀬",
          lat: 35.762222,
          lng: 139.825019,
          transfer: true
        },
        {
          name: "北千住",
          lat: 35.748916,
          lng: 139.804276,
          transfer: true
        },
        {
          name: "町屋",
          lat: 35.742733,
          lng: 139.780501
        },
        {
          name: "西日暮里",
          lat: 35.732257,
          lng: 139.766511
        },
        {
          name: "千駄木",
          lat: 35.725549,
          lng: 139.763243
        },
        {
          name: "根津",
          lat: 35.7174,
          lng: 139.765655
        },
        {
          name: "湯島",
          lat: 35.708243,
          lng: 139.769916
        },
        {
          name: "新御茶ノ水",
          lat: 35.698072,
          lng: 139.766014
        },
        {
          name: "大手町",
          lat: 35.686154,
          lng: 139.763399
        },
        {
          name: "二重橋前",
          lat: 35.681071,
          lng: 139.761948
        },
        {
          name: "日比谷",
          lat: 35.674241,
          lng: 139.758732
        },
        {
          name: "霞ケ関",
          lat: 35.673838,
          lng: 139.750899,
          transfer: true
        },
        {
          name: "国会議事堂前",
          lat: 35.67393,
          lng: 139.745219,
          transfer: true
        },
        {
          name: "赤坂",
          lat: 35.67323,
          lng: 139.738348
        },
        {
          name: "乃木坂",
          lat: 35.666572,
          lng: 139.726215
        },
        {
          name: "表参道",
          lat: 35.665247,
          lng: 139.712314,
          transfer: true
        },
        {
          name: "明治神宮前〈原宿〉",
          lat: 35.669071,
          lng: 139.703995
        },
        {
          name: "代々木公園",
          lat: 35.669187,
          lng: 139.689099
        },
        {
          name: "代々木上原",
          lat: 35.669159,
          lng: 139.680153,
          transfer: true
        }
      ]
    },
    {
      id: "28006",
      nameKo: "유라쿠초선",
      nameJp: "東京メトロ有楽町線",
      color: "#C1A470",
      stations: [
        {
          name: "和光市",
          lat: 35.788507,
          lng: 139.612434,
          transfer: true
        },
        {
          name: "地下鉄成増",
          lat: 35.776557,
          lng: 139.631497,
          transfer: true
        },
        {
          name: "地下鉄赤塚",
          lat: 35.769939,
          lng: 139.644021,
          transfer: true
        },
        {
          name: "平和台",
          lat: 35.757863,
          lng: 139.653762,
          transfer: true
        },
        {
          name: "氷川台",
          lat: 35.74955,
          lng: 139.665567,
          transfer: true
        },
        {
          name: "小竹向原",
          lat: 35.743803,
          lng: 139.678572,
          transfer: true
        },
        {
          name: "千川",
          lat: 35.738229,
          lng: 139.689271,
          transfer: true
        },
        {
          name: "要町",
          lat: 35.73323,
          lng: 139.698715,
          transfer: true
        },
        {
          name: "池袋",
          lat: 35.729565,
          lng: 139.710088
        },
        {
          name: "東池袋",
          lat: 35.725732,
          lng: 139.719546
        },
        {
          name: "護国寺",
          lat: 35.719044,
          lng: 139.72754
        },
        {
          name: "江戸川橋",
          lat: 35.709495,
          lng: 139.733538
        },
        {
          name: "飯田橋",
          lat: 35.701934,
          lng: 139.743669,
          transfer: true
        },
        {
          name: "市ケ谷",
          lat: 35.691389,
          lng: 139.73625
        },
        {
          name: "麹町",
          lat: 35.684006,
          lng: 139.737613
        },
        {
          name: "永田町",
          lat: 35.678757,
          lng: 139.740258,
          transfer: true
        },
        {
          name: "桜田門",
          lat: 35.677405,
          lng: 139.75149
        },
        {
          name: "有楽町",
          lat: 35.675714,
          lng: 139.763265
        },
        {
          name: "銀座一丁目",
          lat: 35.67435,
          lng: 139.767045
        },
        {
          name: "新富町",
          lat: 35.670462,
          lng: 139.773711
        },
        {
          name: "月島",
          lat: 35.664871,
          lng: 139.784233,
          transfer: true
        },
        {
          name: "豊洲",
          lat: 35.654908,
          lng: 139.79621
        },
        {
          name: "辰巳",
          lat: 35.645576,
          lng: 139.81052
        },
        {
          name: "新木場",
          lat: 35.645832,
          lng: 139.826254
        }
      ]
    },
    {
      id: "28008",
      nameKo: "한조몬선",
      nameJp: "東京メトロ半蔵門線",
      color: "#8F76D6",
      stations: [
        {
          name: "渋谷",
          lat: 35.659066,
          lng: 139.701,
          transfer: true
        },
        {
          name: "表参道",
          lat: 35.665247,
          lng: 139.712314,
          transfer: true
        },
        {
          name: "青山一丁目",
          lat: 35.672765,
          lng: 139.724159,
          transfer: true
        },
        {
          name: "永田町",
          lat: 35.678757,
          lng: 139.740258,
          transfer: true
        },
        {
          name: "半蔵門",
          lat: 35.685703,
          lng: 139.74163
        },
        {
          name: "九段下",
          lat: 35.695589,
          lng: 139.751948,
          transfer: true
        },
        {
          name: "神保町",
          lat: 35.695966,
          lng: 139.757606,
          transfer: true
        },
        {
          name: "大手町",
          lat: 35.68686,
          lng: 139.764107
        },
        {
          name: "三越前",
          lat: 35.684908,
          lng: 139.773147
        },
        {
          name: "水天宮前",
          lat: 35.682683,
          lng: 139.785377
        },
        {
          name: "清澄白河",
          lat: 35.682105,
          lng: 139.798851,
          transfer: true
        },
        {
          name: "住吉",
          lat: 35.689073,
          lng: 139.815681,
          transfer: true
        },
        {
          name: "錦糸町",
          lat: 35.697578,
          lng: 139.814941
        },
        {
          name: "押上〈スカイツリー前〉",
          lat: 35.710702,
          lng: 139.812935,
          transfer: true
        }
      ]
    },
    {
      id: "28009",
      nameKo: "난보쿠선",
      nameJp: "東京メトロ南北線",
      color: "#00AC9B",
      stations: [
        {
          name: "赤羽岩淵",
          lat: 35.783417,
          lng: 139.722103
        },
        {
          name: "志茂",
          lat: 35.777948,
          lng: 139.732599
        },
        {
          name: "王子神谷",
          lat: 35.765172,
          lng: 139.735933
        },
        {
          name: "王子",
          lat: 35.753966,
          lng: 139.737618
        },
        {
          name: "西ケ原",
          lat: 35.746008,
          lng: 139.742322
        },
        {
          name: "駒込",
          lat: 35.736959,
          lng: 139.746442
        },
        {
          name: "本駒込",
          lat: 35.724155,
          lng: 139.753828
        },
        {
          name: "東大前",
          lat: 35.717633,
          lng: 139.758025
        },
        {
          name: "後楽園",
          lat: 35.707898,
          lng: 139.751864,
          transfer: true
        },
        {
          name: "飯田橋",
          lat: 35.701934,
          lng: 139.743669,
          transfer: true
        },
        {
          name: "市ケ谷",
          lat: 35.692972,
          lng: 139.736389
        },
        {
          name: "四ツ谷",
          lat: 35.686032,
          lng: 139.72955
        },
        {
          name: "永田町",
          lat: 35.678757,
          lng: 139.740258,
          transfer: true
        },
        {
          name: "溜池山王",
          lat: 35.673621,
          lng: 139.741419,
          transfer: true
        },
        {
          name: "六本木一丁目",
          lat: 35.665595,
          lng: 139.739
        },
        {
          name: "麻布十番",
          lat: 35.654682,
          lng: 139.737051
        },
        {
          name: "白金高輪",
          lat: 35.642903,
          lng: 139.734104,
          transfer: true
        },
        {
          name: "白金台",
          lat: 35.637917,
          lng: 139.726133,
          transfer: true
        },
        {
          name: "目黒",
          lat: 35.633272,
          lng: 139.7155,
          transfer: true
        }
      ]
    },
    {
      id: "28010",
      nameKo: "후쿠토신선",
      nameJp: "東京メトロ副都心線",
      color: "#9C5E31",
      stations: [
        {
          name: "和光市",
          lat: 35.788507,
          lng: 139.612434,
          transfer: true
        },
        {
          name: "地下鉄成増",
          lat: 35.776557,
          lng: 139.631497,
          transfer: true
        },
        {
          name: "地下鉄赤塚",
          lat: 35.769939,
          lng: 139.644021,
          transfer: true
        },
        {
          name: "平和台",
          lat: 35.757863,
          lng: 139.653762,
          transfer: true
        },
        {
          name: "氷川台",
          lat: 35.74955,
          lng: 139.665567,
          transfer: true
        },
        {
          name: "小竹向原",
          lat: 35.743803,
          lng: 139.678572,
          transfer: true
        },
        {
          name: "千川",
          lat: 35.738229,
          lng: 139.689271,
          transfer: true
        },
        {
          name: "要町",
          lat: 35.73323,
          lng: 139.698715,
          transfer: true
        },
        {
          name: "池袋",
          lat: 35.731464,
          lng: 139.708291
        },
        {
          name: "雑司が谷",
          lat: 35.720233,
          lng: 139.714795
        },
        {
          name: "西早稲田",
          lat: 35.708242,
          lng: 139.709101
        },
        {
          name: "東新宿",
          lat: 35.698915,
          lng: 139.707593
        },
        {
          name: "新宿三丁目",
          lat: 35.690853,
          lng: 139.704828
        },
        {
          name: "北参道",
          lat: 35.678459,
          lng: 139.705453
        },
        {
          name: "明治神宮前〈原宿〉",
          lat: 35.668497,
          lng: 139.705367
        },
        {
          name: "渋谷",
          lat: 35.659545,
          lng: 139.702417,
          transfer: true
        }
      ]
    }
  ],
  "JR東日本": [
    {
      id: "11302",
      nameKo: "야마노테선",
      nameJp: "JR山手線",
      color: "#9ACD32",
      stations: [
        {
          name: "大崎",
          lat: 35.619772,
          lng: 139.728439,
          transfer: true
        },
        {
          name: "五反田",
          lat: 35.625974,
          lng: 139.723822
        },
        {
          name: "目黒",
          lat: 35.633923,
          lng: 139.715775
        },
        {
          name: "恵比寿",
          lat: 35.646685,
          lng: 139.71007,
          transfer: true
        },
        {
          name: "渋谷",
          lat: 35.658871,
          lng: 139.701238,
          transfer: true
        },
        {
          name: "原宿",
          lat: 35.670646,
          lng: 139.702592
        },
        {
          name: "代々木",
          lat: 35.683061,
          lng: 139.702042,
          transfer: true
        },
        {
          name: "新宿",
          lat: 35.689729,
          lng: 139.700464,
          transfer: true
        },
        {
          name: "新大久保",
          lat: 35.700875,
          lng: 139.700261
        },
        {
          name: "高田馬場",
          lat: 35.712677,
          lng: 139.703715
        },
        {
          name: "目白",
          lat: 35.720476,
          lng: 139.706228
        },
        {
          name: "池袋",
          lat: 35.730256,
          lng: 139.711086,
          transfer: true
        },
        {
          name: "大塚",
          lat: 35.731412,
          lng: 139.728584
        },
        {
          name: "巣鴨",
          lat: 35.733445,
          lng: 139.739303
        },
        {
          name: "駒込",
          lat: 35.736825,
          lng: 139.748053
        },
        {
          name: "田端",
          lat: 35.737781,
          lng: 139.761229,
          transfer: true
        },
        {
          name: "西日暮里",
          lat: 35.731954,
          lng: 139.766857,
          transfer: true
        },
        {
          name: "日暮里",
          lat: 35.727908,
          lng: 139.771287,
          transfer: true
        },
        {
          name: "鶯谷",
          lat: 35.721484,
          lng: 139.778015,
          transfer: true
        },
        {
          name: "上野",
          lat: 35.71379,
          lng: 139.777043,
          transfer: true
        },
        {
          name: "御徒町",
          lat: 35.707282,
          lng: 139.774727,
          transfer: true
        },
        {
          name: "秋葉原",
          lat: 35.698619,
          lng: 139.773288,
          transfer: true
        },
        {
          name: "神田",
          lat: 35.691173,
          lng: 139.770641,
          transfer: true
        },
        {
          name: "東京",
          lat: 35.681391,
          lng: 139.766103,
          transfer: true
        },
        {
          name: "有楽町",
          lat: 35.675441,
          lng: 139.763806,
          transfer: true
        },
        {
          name: "新橋",
          lat: 35.666195,
          lng: 139.758587,
          transfer: true
        },
        {
          name: "浜松町",
          lat: 35.655391,
          lng: 139.757135,
          transfer: true
        },
        {
          name: "田町",
          lat: 35.645736,
          lng: 139.747575,
          transfer: true
        },
        {
          name: "高輪ゲートウェイ",
          lat: 35.6355,
          lng: 139.7407,
          transfer: true
        },
        {
          name: "品川",
          lat: 35.62876,
          lng: 139.738999,
          transfer: true
        }
      ]
    },
    {
      id: "11312",
      nameKo: "주오선(쾌속)",
      nameJp: "JR中央線(快速)",
      color: "#F15A22",
      stations: [
        {
          name: "東京",
          lat: 35.681391,
          lng: 139.766103,
        },
        {
          name: "神田",
          lat: 35.691173,
          lng: 139.770641,
          transfer: true
        },
        {
          name: "御茶ノ水",
          lat: 35.699605,
          lng: 139.764955,
          transfer: true
        },
        {
          name: "四ツ谷",
          lat: 35.686041,
          lng: 139.730644,
          transfer: true
        },
        {
          name: "新宿",
          lat: 35.689729,
          lng: 139.700464,
          transfer: true
        },
        {
          name: "中野",
          lat: 35.705765,
          lng: 139.665835,
          transfer: true
        },
        {
          name: "高円寺",
          lat: 35.705326,
          lng: 139.649664,
          transfer: true
        },
        {
          name: "阿佐ケ谷",
          lat: 35.704818,
          lng: 139.635868,
          transfer: true
        },
        {
          name: "荻窪",
          lat: 35.704523,
          lng: 139.620109,
          transfer: true
        },
        {
          name: "西荻窪",
          lat: 35.703842,
          lng: 139.599361,
          transfer: true
        },
        {
          name: "吉祥寺",
          lat: 35.703119,
          lng: 139.579765,
          transfer: true
        },
        {
          name: "三鷹",
          lat: 35.702683,
          lng: 139.560325,
          transfer: true
        },
        {
          name: "武蔵境",
          lat: 35.702083,
          lng: 139.543402,
          transfer: true
        },
        {
          name: "東小金井",
          lat: 35.701643,
          lng: 139.524837
        },
        {
          name: "武蔵小金井",
          lat: 35.701337,
          lng: 139.506483
        },
        {
          name: "国分寺",
          lat: 35.700123,
          lng: 139.480841
        },
        {
          name: "西国分寺",
          lat: 35.699744,
          lng: 139.465994,
          transfer: true
        },
        {
          name: "国立",
          lat: 35.69923,
          lng: 139.44634
        },
        {
          name: "立川",
          lat: 35.698202,
          lng: 139.413704,
          transfer: true
        },
        {
          name: "日野",
          lat: 35.679244,
          lng: 139.39393
        },
        {
          name: "豊田",
          lat: 35.659502,
          lng: 139.381495
        },
        {
          name: "八王子",
          lat: 35.655555,
          lng: 139.338998,
          transfer: true
        },
        {
          name: "西八王子",
          lat: 35.656621,
          lng: 139.31264
        },
        {
          name: "高尾",
          lat: 35.642026,
          lng: 139.282288
        }
      ]
    },
    {
      id: "11314",
      nameKo: "소부선",
      nameJp: "JR総武本線",
      color: "#FFD400",
      stations: [
        {
          name: "東京",
          lat: 35.681391,
          lng: 139.766103,
        },
        {
          name: "新日本橋",
          lat: 35.688687,
          lng: 139.77323,
          transfer: true
        },
        {
          name: "馬喰町",
          lat: 35.693365,
          lng: 139.78238,
          transfer: true
        },
        {
          name: "錦糸町",
          lat: 35.696802,
          lng: 139.814136,
          transfer: true
        },
        {
          name: "新小岩",
          lat: 35.716903,
          lng: 139.857777,
          transfer: true
        },
        {
          name: "市川",
          lat: 35.728903,
          lng: 139.908142,
          transfer: true
        },
        {
          name: "船橋",
          lat: 35.701865,
          lng: 139.984707,
          transfer: true
        },
        {
          name: "津田沼",
          lat: 35.691367,
          lng: 140.020179,
          transfer: true
        },
        {
          name: "稲毛",
          lat: 35.637264,
          lng: 140.09256,
          transfer: true
        },
        {
          name: "千葉",
          lat: 35.613425,
          lng: 140.112837,
          transfer: true
        },
        {
          name: "東千葉",
          lat: 35.617014,
          lng: 140.122261,
          transfer: true
        },
        {
          name: "都賀",
          lat: 35.636088,
          lng: 140.149222,
          transfer: true
        },
        {
          name: "四街道",
          lat: 35.662756,
          lng: 140.165023,
          transfer: true
        },
        {
          name: "物井",
          lat: 35.68566,
          lng: 140.200263,
          transfer: true
        },
        {
          name: "佐倉",
          lat: 35.709743,
          lng: 140.226722,
          transfer: true
        },
        {
          name: "南酒々井",
          lat: 35.704217,
          lng: 140.267828,
          transfer: true
        },
        {
          name: "榎戸",
          lat: 35.683967,
          lng: 140.288136,
          transfer: true
        },
        {
          name: "八街",
          lat: 35.663228,
          lng: 140.317304,
          transfer: true
        },
        {
          name: "日向",
          lat: 35.628402,
          lng: 140.362447,
          transfer: true
        },
        {
          name: "成東",
          lat: 35.608513,
          lng: 140.410109,
          transfer: true
        },
        {
          name: "松尾",
          lat: 35.63604,
          lng: 140.457587,
          transfer: true
        },
        {
          name: "横芝",
          lat: 35.661739,
          lng: 140.490736,
          transfer: true
        },
        {
          name: "飯倉",
          lat: 35.685638,
          lng: 140.522328,
          transfer: true
        },
        {
          name: "八日市場",
          lat: 35.699317,
          lng: 140.552419,
          transfer: true
        },
        {
          name: "干潟",
          lat: 35.718308,
          lng: 140.603304,
          transfer: true
        },
        {
          name: "旭",
          lat: 35.721831,
          lng: 140.655041,
          transfer: true
        },
        {
          name: "飯岡",
          lat: 35.729339,
          lng: 140.683896,
          transfer: true
        },
        {
          name: "倉橋",
          lat: 35.737836,
          lng: 140.714018,
          transfer: true
        },
        {
          name: "猿田",
          lat: 35.747383,
          lng: 140.7374,
          transfer: true
        },
        {
          name: "松岸",
          lat: 35.739386,
          lng: 140.795143,
          transfer: true
        },
        {
          name: "銚子",
          lat: 35.729449,
          lng: 140.827557,
          transfer: true
        }
      ]
    },
    {
      id: "11313",
      nameKo: "주오-소부선 각역정차",
      nameJp: "JR中央・総武線",
      color: "#FFD400",
      stations: [
        {
          name: "三鷹",
          lat: 35.702683,
          lng: 139.560325,
        },
        {
          name: "吉祥寺",
          lat: 35.703119,
          lng: 139.579765,
          transfer: true
        },
        {
          name: "西荻窪",
          lat: 35.703842,
          lng: 139.599361,
          transfer: true
        },
        {
          name: "荻窪",
          lat: 35.704523,
          lng: 139.620109,
          transfer: true
        },
        {
          name: "阿佐ケ谷",
          lat: 35.704818,
          lng: 139.635868,
          transfer: true
        },
        {
          name: "高円寺",
          lat: 35.705326,
          lng: 139.649664,
          transfer: true
        },
        {
          name: "中野",
          lat: 35.705765,
          lng: 139.665835,
          transfer: true
        },
        {
          name: "東中野",
          lat: 35.706529,
          lng: 139.684436
        },
        {
          name: "大久保",
          lat: 35.700784,
          lng: 139.69732
        },
        {
          name: "新宿",
          lat: 35.689729,
          lng: 139.700464,
          transfer: true
        },
        {
          name: "代々木",
          lat: 35.683061,
          lng: 139.702042,
          transfer: true
        },
        {
          name: "千駄ケ谷",
          lat: 35.681231,
          lng: 139.711644
        },
        {
          name: "信濃町",
          lat: 35.680031,
          lng: 139.720729
        },
        {
          name: "四ツ谷",
          lat: 35.686041,
          lng: 139.730644,
          transfer: true
        },
        {
          name: "市ケ谷",
          lat: 35.691,
          lng: 139.735583
        },
        {
          name: "飯田橋",
          lat: 35.701835,
          lng: 139.745143
        },
        {
          name: "水道橋",
          lat: 35.702039,
          lng: 139.754312
        },
        {
          name: "御茶ノ水",
          lat: 35.699605,
          lng: 139.764955,
          transfer: true
        },
        {
          name: "秋葉原",
          lat: 35.698619,
          lng: 139.773288,
          transfer: true
        },
        {
          name: "浅草橋",
          lat: 35.697403,
          lng: 139.784427
        },
        {
          name: "両国",
          lat: 35.69579,
          lng: 139.793334
        },
        {
          name: "錦糸町",
          lat: 35.696802,
          lng: 139.814136,
          transfer: true
        },
        {
          name: "亀戸",
          lat: 35.697345,
          lng: 139.826262
        },
        {
          name: "平井",
          lat: 35.70643,
          lng: 139.842181
        },
        {
          name: "新小岩",
          lat: 35.716903,
          lng: 139.857777,
          transfer: true
        },
        {
          name: "小岩",
          lat: 35.733207,
          lng: 139.881755
        },
        {
          name: "市川",
          lat: 35.728903,
          lng: 139.908142,
          transfer: true
        },
        {
          name: "本八幡",
          lat: 35.720898,
          lng: 139.92741
        },
        {
          name: "下総中山",
          lat: 35.714276,
          lng: 139.943092
        },
        {
          name: "西船橋",
          lat: 35.707283,
          lng: 139.959536,
          transfer: true
        },
        {
          name: "船橋",
          lat: 35.701865,
          lng: 139.984707,
          transfer: true
        },
        {
          name: "東船橋",
          lat: 35.699811,
          lng: 140.00393
        },
        {
          name: "津田沼",
          lat: 35.691367,
          lng: 140.020179,
          transfer: true
        },
        {
          name: "幕張本郷",
          lat: 35.672664,
          lng: 140.042241
        },
        {
          name: "幕張",
          lat: 35.6594,
          lng: 140.057899
        },
        {
          name: "新検見川",
          lat: 35.65169,
          lng: 140.073025
        },
        {
          name: "稲毛",
          lat: 35.637264,
          lng: 140.09256,
          transfer: true
        },
        {
          name: "西千葉",
          lat: 35.622639,
          lng: 140.103337
        },
        {
          name: "千葉",
          lat: 35.613425,
          lng: 140.112837,
          transfer: true
        }
      ]
    },
    {
      id: "11320",
      nameKo: "조반선",
      nameJp: "JR常磐線(上野～取手)",
      color: "#9B59B6",
      stations: [
        {
          name: "上野",
          lat: 35.71379,
          lng: 139.777043,
        },
        {
          name: "日暮里",
          lat: 35.727908,
          lng: 139.771287,
          transfer: true
        },
        {
          name: "三河島",
          lat: 35.733383,
          lng: 139.777131,
        },
        {
          name: "南千住",
          lat: 35.734033,
          lng: 139.7994,
          transfer: true
        },
        {
          name: "北千住",
          lat: 35.749677,
          lng: 139.804872,
          transfer: true
        },
        {
          name: "綾瀬",
          lat: 35.762222,
          lng: 139.825019,
          transfer: true
        },
        {
          name: "亀有",
          lat: 35.766527,
          lng: 139.847573,
        },
        {
          name: "金町",
          lat: 35.769582,
          lng: 139.870482,
        },
        {
          name: "松戸",
          lat: 35.784472,
          lng: 139.900779,
        },
        {
          name: "北松戸",
          lat: 35.800459,
          lng: 139.911528,
        },
        {
          name: "馬橋",
          lat: 35.811682,
          lng: 139.917305,
        },
        {
          name: "新松戸",
          lat: 35.825467,
          lng: 139.921076,
          transfer: true
        },
        {
          name: "北小金",
          lat: 35.833436,
          lng: 139.931303,
        },
        {
          name: "南柏",
          lat: 35.844655,
          lng: 139.954111,
        },
        {
          name: "柏",
          lat: 35.862316,
          lng: 139.971148,
          transfer: true
        },
        {
          name: "北柏",
          lat: 35.875623,
          lng: 139.988035,
        },
        {
          name: "我孫子",
          lat: 35.87279,
          lng: 140.010466,
        },
        {
          name: "天王台",
          lat: 35.872558,
          lng: 140.04121,
        },
        {
          name: "取手",
          lat: 35.89553,
          lng: 140.063004,
        }
      ]
    },
    {
      id: "11332",
      nameKo: "게이힌토호쿠선",
      nameJp: "JR京浜東北線",
      color: "#27AE60",
      stations: [
        {
          name: "大宮",
          lat: 35.906439,
          lng: 139.62405,
          transfer: true
        },
        {
          name: "さいたま新都心",
          lat: 35.893867,
          lng: 139.633587
        },
        {
          name: "与野",
          lat: 35.884393,
          lng: 139.639085
        },
        {
          name: "北浦和",
          lat: 35.872053,
          lng: 139.645951
        },
        {
          name: "浦和",
          lat: 35.858496,
          lng: 139.657109,
          transfer: true
        },
        {
          name: "南浦和",
          lat: 35.847648,
          lng: 139.669125,
          transfer: true
        },
        {
          name: "蕨",
          lat: 35.827959,
          lng: 139.690357
        },
        {
          name: "西川口",
          lat: 35.815514,
          lng: 139.704312
        },
        {
          name: "川口",
          lat: 35.801869,
          lng: 139.717472
        },
        {
          name: "赤羽",
          lat: 35.778026,
          lng: 139.720928,
          transfer: true
        },
        {
          name: "東十条",
          lat: 35.763803,
          lng: 139.726858
        },
        {
          name: "王子",
          lat: 35.752538,
          lng: 139.73809
        },
        {
          name: "上中里",
          lat: 35.74728,
          lng: 139.745769
        },
        {
          name: "田端",
          lat: 35.737781,
          lng: 139.761229,
          transfer: true
        },
        {
          name: "西日暮里",
          lat: 35.731954,
          lng: 139.766857,
          transfer: true
        },
        {
          name: "日暮里",
          lat: 35.727908,
          lng: 139.771287,
          transfer: true
        },
        {
          name: "鶯谷",
          lat: 35.721484,
          lng: 139.778015,
          transfer: true
        },
        {
          name: "上野",
          lat: 35.71379,
          lng: 139.777043,
          transfer: true
        },
        {
          name: "御徒町",
          lat: 35.707282,
          lng: 139.774727,
          transfer: true
        },
        {
          name: "秋葉原",
          lat: 35.698619,
          lng: 139.773288,
          transfer: true
        },
        {
          name: "神田",
          lat: 35.691173,
          lng: 139.770641,
          transfer: true
        },
        {
          name: "東京",
          lat: 35.681391,
          lng: 139.766103,
          transfer: true
        },
        {
          name: "有楽町",
          lat: 35.675441,
          lng: 139.763806,
          transfer: true
        },
        {
          name: "新橋",
          lat: 35.666195,
          lng: 139.758587,
          transfer: true
        },
        {
          name: "浜松町",
          lat: 35.655391,
          lng: 139.757135,
          transfer: true
        },
        {
          name: "田町",
          lat: 35.645736,
          lng: 139.747575,
          transfer: true
        },
        {
          name: "高輪ゲートウェイ",
          lat: 35.6355,
          lng: 139.7407,
          transfer: true
        },
        {
          name: "品川",
          lat: 35.62876,
          lng: 139.738999,
          transfer: true
        },
        {
          name: "大井町",
          lat: 35.606257,
          lng: 139.73485
        },
        {
          name: "大森",
          lat: 35.588903,
          lng: 139.728079
        },
        {
          name: "蒲田",
          lat: 35.562517,
          lng: 139.716032
        },
        {
          name: "川崎",
          lat: 35.531311,
          lng: 139.697485,
          transfer: true
        },
        {
          name: "鶴見",
          lat: 35.508387,
          lng: 139.67614
        },
        {
          name: "新子安",
          lat: 35.487064,
          lng: 139.654776
        },
        {
          name: "東神奈川",
          lat: 35.47804,
          lng: 139.633466,
          transfer: true
        },
        {
          name: "横浜",
          lat: 35.466195,
          lng: 139.622704,
          transfer: true
        }
      ]
    },
    {
      id: "11308",
      nameKo: "요코스카선",
      nameJp: "JR横須賀線",
      color: "#F39C12",
      stations: [
        {
          name: "東京",
          lat: 35.681391,
          lng: 139.766103,
          transfer: true
        },
        {
          name: "新橋",
          lat: 35.666195,
          lng: 139.758587,
          transfer: true
        },
        {
          name: "品川",
          lat: 35.62876,
          lng: 139.738999,
          transfer: true
        },
        {
          name: "西大井",
          lat: 35.601616,
          lng: 139.721729,
          transfer: true
        },
        {
          name: "武蔵小杉",
          lat: 35.575965,
          lng: 139.663278
        },
        {
          name: "新川崎",
          lat: 35.551784,
          lng: 139.671481,
          transfer: true
        },
        {
          name: "横浜",
          lat: 35.466195,
          lng: 139.622704,
          transfer: true
        },
        {
          name: "保土ケ谷",
          lat: 35.446746,
          lng: 139.599671,
          transfer: true
        },
        {
          name: "東戸塚",
          lat: 35.430353,
          lng: 139.556794,
          transfer: true
        },
        {
          name: "戸塚",
          lat: 35.400432,
          lng: 139.534282,
          transfer: true
        },
        {
          name: "大船",
          lat: 35.353466,
          lng: 139.531127,
          transfer: true
        },
        {
          name: "北鎌倉",
          lat: 35.337198,
          lng: 139.545134
        },
        {
          name: "鎌倉",
          lat: 35.318793,
          lng: 139.550428
        },
        {
          name: "逗子",
          lat: 35.297392,
          lng: 139.578292
        },
        {
          name: "東逗子",
          lat: 35.298781,
          lng: 139.601768
        },
        {
          name: "田浦",
          lat: 35.29271,
          lng: 139.637726
        },
        {
          name: "横須賀",
          lat: 35.284022,
          lng: 139.655855
        },
        {
          name: "衣笠",
          lat: 35.257091,
          lng: 139.661193
        },
        {
          name: "久里浜",
          lat: 35.233107,
          lng: 139.700862
        }
      ]
    },
    {
      id: "11321",
      nameKo: "사이쿄선",
      nameJp: "JR埼京線",
      color: "#D35400",
      stations: [
        {
          name: "大崎",
          lat: 35.619772,
          lng: 139.728439,
          transfer: true
        },
        {
          name: "恵比寿",
          lat: 35.646685,
          lng: 139.71007,
          transfer: true
        },
        {
          name: "渋谷",
          lat: 35.658871,
          lng: 139.701238,
          transfer: true
        },
        {
          name: "新宿",
          lat: 35.689729,
          lng: 139.700464,
          transfer: true
        },
        {
          name: "池袋",
          lat: 35.730256,
          lng: 139.711086,
          transfer: true
        },
        {
          name: "板橋",
          lat: 35.745435,
          lng: 139.719507
        },
        {
          name: "十条",
          lat: 35.760321,
          lng: 139.722233
        },
        {
          name: "赤羽",
          lat: 35.778026,
          lng: 139.720928,
          transfer: true
        },
        {
          name: "北赤羽",
          lat: 35.787007,
          lng: 139.70569
        },
        {
          name: "浮間舟渡",
          lat: 35.791209,
          lng: 139.691341
        },
        {
          name: "戸田公園",
          lat: 35.807906,
          lng: 139.678203
        },
        {
          name: "戸田",
          lat: 35.817665,
          lng: 139.669548
        },
        {
          name: "北戸田",
          lat: 35.826883,
          lng: 139.661201
        },
        {
          name: "武蔵浦和",
          lat: 35.845422,
          lng: 139.646809
        },
        {
          name: "中浦和",
          lat: 35.853769,
          lng: 139.6375
        },
        {
          name: "南与野",
          lat: 35.867456,
          lng: 139.631117
        },
        {
          name: "与野本町",
          lat: 35.880968,
          lng: 139.626075
        },
        {
          name: "北与野",
          lat: 35.890678,
          lng: 139.628521
        },
        {
          name: "大宮",
          lat: 35.906439,
          lng: 139.62405,
          transfer: true
        }
      ]
    },
    {
      id: "11333",
      nameKo: "쇼난신주쿠라인",
      nameJp: "JR湘南新宿ライン",
      color: "#C0392B",
      stations: [
        {
          name: "大宮",
          lat: 35.906439,
          lng: 139.62405,
          transfer: true
        },
        {
          name: "浦和",
          lat: 35.858496,
          lng: 139.657109,
          transfer: true
        },
        {
          name: "赤羽",
          lat: 35.778026,
          lng: 139.720928,
          transfer: true
        },
        {
          name: "池袋",
          lat: 35.730256,
          lng: 139.711086,
          transfer: true
        },
        {
          name: "新宿",
          lat: 35.689729,
          lng: 139.700464,
          transfer: true
        },
        {
          name: "渋谷",
          lat: 35.658871,
          lng: 139.701238,
          transfer: true
        },
        {
          name: "恵比寿",
          lat: 35.646685,
          lng: 139.71007,
          transfer: true
        },
        {
          name: "大崎",
          lat: 35.619772,
          lng: 139.728439,
          transfer: true
        },
        {
          name: "西大井",
          lat: 35.601616,
          lng: 139.721729,
          transfer: true
        },
        {
          name: "武蔵小杉",
          lat: 35.57669,
          lng: 139.65963,
          transfer: true
        },
        {
          name: "新川崎",
          lat: 35.551784,
          lng: 139.671481,
          transfer: true
        },
        {
          name: "横浜",
          lat: 35.466195,
          lng: 139.622704,
          transfer: true
        },
        {
          name: "保土ケ谷",
          lat: 35.446746,
          lng: 139.599671,
          transfer: true
        },
        {
          name: "東戸塚",
          lat: 35.430353,
          lng: 139.556794,
          transfer: true
        },
        {
          name: "戸塚",
          lat: 35.400432,
          lng: 139.534282,
          transfer: true
        },
        {
          name: "大船",
          lat: 35.353466,
          lng: 139.531127,
          transfer: true
        }
      ]
    },
    {
      id: "11305",
      nameKo: "무사시노선",
      nameJp: "JR武蔵野線",
      color: "#8E44AD",
      stations: [
        {
          name: "府中本町",
          lat: 35.665766,
          lng: 139.477142,
          transfer: true
        },
        {
          name: "北府中",
          lat: 35.68088,
          lng: 139.471792
        },
        {
          name: "西国分寺",
          lat: 35.699744,
          lng: 139.465994,
          transfer: true
        },
        {
          name: "新小平",
          lat: 35.73128,
          lng: 139.470745
        },
        {
          name: "新秋津",
          lat: 35.778331,
          lng: 139.493592
        },
        {
          name: "東所沢",
          lat: 35.79461,
          lng: 139.513878
        },
        {
          name: "新座",
          lat: 35.80381,
          lng: 139.556328
        },
        {
          name: "北朝霞",
          lat: 35.815475,
          lng: 139.587322
        },
        {
          name: "西浦和",
          lat: 35.844139,
          lng: 139.627707
        },
        {
          name: "武蔵浦和",
          lat: 35.846047,
          lng: 139.647974
        },
        {
          name: "南浦和",
          lat: 35.847648,
          lng: 139.669125,
          transfer: true
        },
        {
          name: "東浦和",
          lat: 35.864079,
          lng: 139.704627
        },
        {
          name: "東川口",
          lat: 35.875246,
          lng: 139.744087
        },
        {
          name: "南越谷",
          lat: 35.876106,
          lng: 139.790499
        },
        {
          name: "越谷レイクタウン",
          lat: 35.876353,
          lng: 139.822178
        },
        {
          name: "吉川",
          lat: 35.87662,
          lng: 139.843162
        },
        {
          name: "吉川美南",
          lat: 35.868056,
          lng: 139.858167
        },
        {
          name: "新三郷",
          lat: 35.858667,
          lng: 139.869341
        },
        {
          name: "三郷",
          lat: 35.845004,
          lng: 139.886341
        },
        {
          name: "南流山",
          lat: 35.838035,
          lng: 139.903865
        },
        {
          name: "新松戸",
          lat: 35.825467,
          lng: 139.921076,
          transfer: true
        },
        {
          name: "新八柱",
          lat: 35.792013,
          lng: 139.938393
        },
        {
          name: "東松戸",
          lat: 35.770611,
          lng: 139.943848
        },
        {
          name: "市川大野",
          lat: 35.755432,
          lng: 139.951227
        },
        {
          name: "船橋法典",
          lat: 35.730435,
          lng: 139.966771
        },
        {
          name: "西船橋",
          lat: 35.707283,
          lng: 139.959536,
          transfer: true
        }
      ]
    },
    {
      id: "11303",
      nameKo: "난부선",
      nameJp: "JR南武線",
      color: "#2C3E50",
      stations: [
        {
          name: "浜川崎",
          lat: 35.510428,
          lng: 139.713483
        },
        {
          name: "小田栄",
          lat: 35.5145,
          lng: 139.704944
        },
        {
          name: "川崎新町",
          lat: 35.518234,
          lng: 139.699348
        },
        {
          name: "八丁畷",
          lat: 35.523071,
          lng: 139.691446
        },
        {
          name: "川崎",
          lat: 35.531311,
          lng: 139.697485,
          transfer: true
        },
        {
          name: "尻手",
          lat: 35.530939,
          lng: 139.684233
        },
        {
          name: "矢向",
          lat: 35.539408,
          lng: 139.68055
        },
        {
          name: "鹿島田",
          lat: 35.551459,
          lng: 139.674964
        },
        {
          name: "平間",
          lat: 35.560565,
          lng: 139.671039
        },
        {
          name: "向河原",
          lat: 35.572891,
          lng: 139.66725
        },
        {
          name: "武蔵小杉",
          lat: 35.57669,
          lng: 139.65963,
          transfer: true
        },
        {
          name: "武蔵中原",
          lat: 35.581498,
          lng: 139.640613
        },
        {
          name: "武蔵新城",
          lat: 35.587369,
          lng: 139.629419
        },
        {
          name: "武蔵溝ノ口",
          lat: 35.598923,
          lng: 139.61139
        },
        {
          name: "津田山",
          lat: 35.604259,
          lng: 139.600002
        },
        {
          name: "久地",
          lat: 35.610363,
          lng: 139.592714
        },
        {
          name: "宿河原",
          lat: 35.615429,
          lng: 139.579565
        },
        {
          name: "登戸",
          lat: 35.620889,
          lng: 139.570028
        },
        {
          name: "中野島",
          lat: 35.630135,
          lng: 139.5501
        },
        {
          name: "稲田堤",
          lat: 35.633701,
          lng: 139.535173
        },
        {
          name: "矢野口",
          lat: 35.641305,
          lng: 139.520849
        },
        {
          name: "稲城長沼",
          lat: 35.644184,
          lng: 139.502811
        },
        {
          name: "南多摩",
          lat: 35.649249,
          lng: 139.489781
        },
        {
          name: "府中本町",
          lat: 35.665766,
          lng: 139.477142,
          transfer: true
        },
        {
          name: "分倍河原",
          lat: 35.668493,
          lng: 139.468798,
          transfer: true
        },
        {
          name: "西府",
          lat: 35.670912,
          lng: 139.457477
        },
        {
          name: "谷保",
          lat: 35.681377,
          lng: 139.446724
        },
        {
          name: "矢川",
          lat: 35.685079,
          lng: 139.431611
        },
        {
          name: "西国立",
          lat: 35.69375,
          lng: 139.423887
        },
        {
          name: "立川",
          lat: 35.698202,
          lng: 139.413704,
          transfer: true
        }
      ]
    },
    {
      id: "11306",
      nameKo: "요코하마선",
      nameJp: "JR横浜線",
      color: "#1ABC9C",
      stations: [
        {
          name: "東神奈川",
          lat: 35.47804,
          lng: 139.633466,
          transfer: true
        },
        {
          name: "大口",
          lat: 35.492375,
          lng: 139.646288
        },
        {
          name: "菊名",
          lat: 35.509749,
          lng: 139.630147
        },
        {
          name: "新横浜",
          lat: 35.506824,
          lng: 139.617348
        },
        {
          name: "小机",
          lat: 35.508533,
          lng: 139.599787
        },
        {
          name: "鴨居",
          lat: 35.510955,
          lng: 139.56707
        },
        {
          name: "中山",
          lat: 35.514745,
          lng: 139.539692
        },
        {
          name: "十日市場",
          lat: 35.526254,
          lng: 139.51669
        },
        {
          name: "長津田",
          lat: 35.531698,
          lng: 139.49468
        },
        {
          name: "成瀬",
          lat: 35.535412,
          lng: 139.472875
        },
        {
          name: "町田",
          lat: 35.542004,
          lng: 139.445579
        },
        {
          name: "古淵",
          lat: 35.556055,
          lng: 139.419151
        },
        {
          name: "淵野辺",
          lat: 35.568784,
          lng: 139.395075
        },
        {
          name: "矢部",
          lat: 35.573275,
          lng: 139.386373
        },
        {
          name: "相模原",
          lat: 35.58113,
          lng: 139.371007
        },
        {
          name: "橋本",
          lat: 35.594975,
          lng: 139.344586
        },
        {
          name: "相原",
          lat: 35.60694,
          lng: 139.33169
        },
        {
          name: "八王子みなみ野",
          lat: 35.630664,
          lng: 139.330678
        },
        {
          name: "片倉",
          lat: 35.639704,
          lng: 139.34119
        },
        {
          name: "八王子",
          lat: 35.655555,
          lng: 139.338998,
          transfer: true
        }
      ]
    },
    {
      id: "11326",
      nameKo: "게이요선",
      nameJp: "JR京葉線",
      color: "#3498DB",
      stations: [
        {
          name: "東京",
          lat: 35.681391,
          lng: 139.766103,
          transfer: true
        },
        {
          name: "八丁堀",
          lat: 35.674617,
          lng: 139.777705
        },
        {
          name: "越中島",
          lat: 35.667946,
          lng: 139.792713
        },
        {
          name: "潮見",
          lat: 35.658702,
          lng: 139.817341
        },
        {
          name: "新木場",
          lat: 35.646172,
          lng: 139.827402
        },
        {
          name: "葛西臨海公園",
          lat: 35.644392,
          lng: 139.861529
        },
        {
          name: "舞浜",
          lat: 35.636115,
          lng: 139.883714
        },
        {
          name: "新浦安",
          lat: 35.649526,
          lng: 139.912553
        },
        {
          name: "市川塩浜",
          lat: 35.666554,
          lng: 139.923684
        },
        {
          name: "西船橋",
          lat: 35.707283,
          lng: 139.959536,
          transfer: true
        },
        {
          name: "二俣新町",
          lat: 35.691273,
          lng: 139.959525
        },
        {
          name: "南船橋",
          lat: 35.681804,
          lng: 139.995773
        },
        {
          name: "新習志野",
          lat: 35.667342,
          lng: 140.012825
        },
        {
          name: "幕張豊砂",
          lat: 35.6579,
          lng: 140.0272
        },
        {
          name: "海浜幕張",
          lat: 35.648373,
          lng: 140.041917
        },
        {
          name: "検見川浜",
          lat: 35.637291,
          lng: 140.058888
        },
        {
          name: "稲毛海岸",
          lat: 35.629501,
          lng: 140.074034
        },
        {
          name: "千葉みなと",
          lat: 35.606172,
          lng: 140.10341
        },
        {
          name: "蘇我",
          lat: 35.582065,
          lng: 140.130767
        }
      ]
    },
    {
      id: "11317",
      nameKo: "하치코선 남부",
      nameJp: "JR八高線(八王子～高麗川)",
      color: "#F1C40F",
      stations: [
        {
          name: "八王子",
          lat: 35.655555,
          lng: 139.338998,
          transfer: true
        },
        {
          name: "北八王子",
          lat: 35.669232,
          lng: 139.363348
        },
        {
          name: "小宮",
          lat: 35.685799,
          lng: 139.368481
        },
        {
          name: "拝島",
          lat: 35.721278,
          lng: 139.343468,
          transfer: true
        },
        {
          name: "東福生",
          lat: 35.745811,
          lng: 139.33594
        },
        {
          name: "箱根ケ崎",
          lat: 35.771158,
          lng: 139.346805
        },
        {
          name: "金子",
          lat: 35.810822,
          lng: 139.328546
        },
        {
          name: "東飯能",
          lat: 35.852928,
          lng: 139.325965,
          transfer: true
        },
        {
          name: "高麗川",
          lat: 35.896328,
          lng: 139.33809,
          transfer: true
        }
      ]
    },
    {
      id: "11315",
      nameKo: "오메선",
      nameJp: "JR青梅線",
      color: "#E67E22",
      stations: [
        {
          name: "立川",
          lat: 35.698202,
          lng: 139.413704,
          transfer: true
        },
        {
          name: "西立川",
          lat: 35.703526,
          lng: 139.393556
        },
        {
          name: "東中神",
          lat: 35.706337,
          lng: 139.384529
        },
        {
          name: "中神",
          lat: 35.709058,
          lng: 139.375816
        },
        {
          name: "昭島",
          lat: 35.713305,
          lng: 139.361564
        },
        {
          name: "拝島",
          lat: 35.721278,
          lng: 139.343468,
          transfer: true
        },
        {
          name: "牛浜",
          lat: 35.734547,
          lng: 139.333677
        },
        {
          name: "福生",
          lat: 35.742456,
          lng: 139.327763
        },
        {
          name: "羽村",
          lat: 35.758073,
          lng: 139.316188
        },
        {
          name: "小作",
          lat: 35.776048,
          lng: 139.302233
        },
        {
          name: "河辺",
          lat: 35.78473,
          lng: 139.284032
        },
        {
          name: "東青梅",
          lat: 35.789768,
          lng: 139.272841
        },
        {
          name: "青梅",
          lat: 35.790512,
          lng: 139.258096
        },
        {
          name: "宮ノ平",
          lat: 35.787545,
          lng: 139.237289
        },
        {
          name: "日向和田",
          lat: 35.788665,
          lng: 139.229515
        },
        {
          name: "石神前",
          lat: 35.79683,
          lng: 139.225096
        },
        {
          name: "二俣尾",
          lat: 35.803946,
          lng: 139.216161
        },
        {
          name: "軍畑",
          lat: 35.807382,
          lng: 139.207431
        },
        {
          name: "沢井",
          lat: 35.80594,
          lng: 139.193324
        },
        {
          name: "御嶽",
          lat: 35.801468,
          lng: 139.182589
        },
        {
          name: "川井",
          lat: 35.813697,
          lng: 139.16429
        },
        {
          name: "古里",
          lat: 35.816247,
          lng: 139.152102
        },
        {
          name: "鳩ノ巣",
          lat: 35.815127,
          lng: 139.128932
        },
        {
          name: "白丸",
          lat: 35.811735,
          lng: 139.114861
        },
        {
          name: "奥多摩",
          lat: 35.809357,
          lng: 139.096961
        }
      ]
    },
    {
      id: "11316",
      nameKo: "이쓰카이치선",
      nameJp: "JR五日市線",
      color: "#95A5A6",
      stations: [
        {
          name: "拝島",
          lat: 35.721278,
          lng: 139.343468,
          transfer: true
        },
        {
          name: "熊川",
          lat: 35.728321,
          lng: 139.33584
        },
        {
          name: "東秋留",
          lat: 35.725904,
          lng: 139.311665
        },
        {
          name: "秋川",
          lat: 35.727998,
          lng: 139.286715
        },
        {
          name: "武蔵引田",
          lat: 35.729711,
          lng: 139.269907
        },
        {
          name: "武蔵増戸",
          lat: 35.730961,
          lng: 139.256355
        },
        {
          name: "武蔵五日市",
          lat: 35.732248,
          lng: 139.228039
        }
      ]
    },
    {
      id: "11322",
      nameKo: "가와고에선",
      nameJp: "JR川越線",
      color: "#34495E",
      stations: [
        {
          name: "大宮",
          lat: 35.906439,
          lng: 139.62405,
          transfer: true
        },
        {
          name: "日進",
          lat: 35.931555,
          lng: 139.606111
        },
        {
          name: "西大宮",
          lat: 35.92228133,
          lng: 139.5797968
        },
        {
          name: "指扇",
          lat: 35.917023,
          lng: 139.564951
        },
        {
          name: "南古谷",
          lat: 35.903344,
          lng: 139.519082
        },
        {
          name: "川越",
          lat: 35.906742,
          lng: 139.483078,
          transfer: true
        },
        {
          name: "西川越",
          lat: 35.91909,
          lng: 139.459746
        },
        {
          name: "的場",
          lat: 35.917478,
          lng: 139.435376
        },
        {
          name: "笠幡",
          lat: 35.907551,
          lng: 139.40622
        },
        {
          name: "武蔵高萩",
          lat: 35.901729,
          lng: 139.371123
        },
        {
          name: "高麗川",
          lat: 35.896328,
          lng: 139.33809,
          transfer: true
        }
      ]
    },
    {
      id: "11301",
      nameKo: "도카이도선 간토",
      nameJp: "JR東海道本線(東京～熱海)",
      color: "#7F8C8D",
      stations: [
        {
          name: "東京",
          lat: 35.681391,
          lng: 139.766103,
          transfer: true
        },
        {
          name: "新橋",
          lat: 35.666195,
          lng: 139.758587,
          transfer: true
        },
        {
          name: "品川",
          lat: 35.62876,
          lng: 139.738999,
          transfer: true
        },
        {
          name: "川崎",
          lat: 35.531311,
          lng: 139.697485,
          transfer: true
        },
        {
          name: "横浜",
          lat: 35.466195,
          lng: 139.622704,
          transfer: true
        },
        {
          name: "戸塚",
          lat: 35.400432,
          lng: 139.534282,
          transfer: true
        },
        {
          name: "大船",
          lat: 35.353466,
          lng: 139.531127,
          transfer: true
        },
        {
          name: "藤沢",
          lat: 35.338882,
          lng: 139.487293
        },
        {
          name: "辻堂",
          lat: 35.336847,
          lng: 139.447106
        },
        {
          name: "茅ケ崎",
          lat: 35.330741,
          lng: 139.407197
        },
        {
          name: "平塚",
          lat: 35.327647,
          lng: 139.349063
        },
        {
          name: "大磯",
          lat: 35.311299,
          lng: 139.313388
        },
        {
          name: "二宮",
          lat: 35.298644,
          lng: 139.256925
        },
        {
          name: "国府津",
          lat: 35.280832,
          lng: 139.212932
        },
        {
          name: "鴨宮",
          lat: 35.275744,
          lng: 139.180147
        },
        {
          name: "小田原",
          lat: 35.256225,
          lng: 139.155772
        },
        {
          name: "早川",
          lat: 35.238875,
          lng: 139.145014
        },
        {
          name: "根府川",
          lat: 35.202455,
          lng: 139.138504
        },
        {
          name: "真鶴",
          lat: 35.156837,
          lng: 139.132148
        },
        {
          name: "湯河原",
          lat: 35.146178,
          lng: 139.102142
        },
        {
          name: "熱海",
          lat: 35.103573,
          lng: 139.077679
        }
      ]
    },
    {
      id: "11307",
      nameKo: "네기시선",
      nameJp: "JR根岸線",
      color: "#BDC3C7",
      stations: [
        {
          name: "横浜",
          lat: 35.466195,
          lng: 139.622704,
          transfer: true
        },
        {
          name: "桜木町",
          lat: 35.451112,
          lng: 139.630881
        },
        {
          name: "関内",
          lat: 35.443336,
          lng: 139.636984
        },
        {
          name: "石川町",
          lat: 35.438808,
          lng: 139.642934
        },
        {
          name: "山手",
          lat: 35.426891,
          lng: 139.646425
        },
        {
          name: "根岸",
          lat: 35.415887,
          lng: 139.636034
        },
        {
          name: "磯子",
          lat: 35.399881,
          lng: 139.617916
        },
        {
          name: "新杉田",
          lat: 35.386863,
          lng: 139.619483
        },
        {
          name: "洋光台",
          lat: 35.378785,
          lng: 139.596852
        },
        {
          name: "港南台",
          lat: 35.375183,
          lng: 139.576243
        },
        {
          name: "本郷台",
          lat: 35.36787,
          lng: 139.550159
        },
        {
          name: "大船",
          lat: 35.353466,
          lng: 139.531127,
          transfer: true
        }
      ]
    }
  ],
  "西武鉄道": [
    {
      id: "22001",
      nameKo: "세이부 이케부쿠로선",
      nameJp: "西武池袋線",
      color: "#1C8AC8",
      stations: [
        {
          name: "池袋",
          lat: 35.72913,
          lng: 139.711461,
        },
        {
          name: "椎名町",
          lat: 35.726572,
          lng: 139.694363,
        },
        {
          name: "東長崎",
          lat: 35.73003,
          lng: 139.683294,
        },
        {
          name: "江古田",
          lat: 35.737557,
          lng: 139.672814,
        },
        {
          name: "桜台",
          lat: 35.738797,
          lng: 139.662602,
        },
        {
          name: "練馬",
          lat: 35.737893,
          lng: 139.654368,
          transfer: true
        },
        {
          name: "中村橋",
          lat: 35.736767,
          lng: 139.637456,
        },
        {
          name: "富士見台",
          lat: 35.735867,
          lng: 139.62969,
        },
        {
          name: "練馬高野台",
          lat: 35.740622,
          lng: 139.616749,
        },
        {
          name: "石神井公園",
          lat: 35.743563,
          lng: 139.606981,
        },
        {
          name: "大泉学園",
          lat: 35.749406,
          lng: 139.586732,
        },
        {
          name: "保谷",
          lat: 35.748222,
          lng: 139.567753,
        },
        {
          name: "ひばりヶ丘",
          lat: 35.751485,
          lng: 139.545852,
        },
        {
          name: "東久留米",
          lat: 35.760445,
          lng: 139.533739,
        },
        {
          name: "清瀬",
          lat: 35.772221,
          lng: 139.519917,
        },
        {
          name: "秋津",
          lat: 35.778614,
          lng: 139.496539,
        },
        {
          name: "所沢",
          lat: 35.786627,
          lng: 139.473324,
        },
        {
          name: "西所沢",
          lat: 35.789303,
          lng: 139.455959,
        },
        {
          name: "小手指",
          lat: 35.800535,
          lng: 139.438016,
        },
        {
          name: "狭山ヶ丘",
          lat: 35.810445,
          lng: 139.416975,
        },
        {
          name: "武蔵藤沢",
          lat: 35.820963,
          lng: 139.412736,
        },
        {
          name: "稲荷山公園",
          lat: 35.845112,
          lng: 139.39842,
        },
        {
          name: "入間市",
          lat: 35.842904,
          lng: 139.390294,
        },
        {
          name: "仏子",
          lat: 35.83769,
          lng: 139.360115,
        },
        {
          name: "元加治",
          lat: 35.84058,
          lng: 139.345316,
        },
        {
          name: "飯能",
          lat: 35.851189,
          lng: 139.318824,
          transfer: true
        },
        {
          name: "東飯能",
          lat: 35.852928,
          lng: 139.325965,
          transfer: true
        },
        {
          name: "高麗",
          lat: 35.881982,
          lng: 139.304414,
          transfer: true
        },
        {
          name: "武蔵横手",
          lat: 35.885256,
          lng: 139.280667,
          transfer: true
        },
        {
          name: "東吾野",
          lat: 35.892439,
          lng: 139.260281,
          transfer: true
        },
        {
          name: "吾野",
          lat: 35.908502,
          lng: 139.226787,
          transfer: true
        }
      ]
    },
    {
      id: "22002",
      nameKo: "세이부치치부선",
      nameJp: "西武秩父線",
      color: "#FF6348",
      stations: [
        {
          name: "飯能",
          lat: 35.851189,
          lng: 139.318824,
          transfer: true
        },
        {
          name: "東飯能",
          lat: 35.852928,
          lng: 139.325965,
          transfer: true
        },
        {
          name: "高麗",
          lat: 35.881982,
          lng: 139.304414,
          transfer: true
        },
        {
          name: "武蔵横手",
          lat: 35.885256,
          lng: 139.280667,
          transfer: true
        },
        {
          name: "東吾野",
          lat: 35.892439,
          lng: 139.260281,
          transfer: true
        },
        {
          name: "吾野",
          lat: 35.908502,
          lng: 139.226787,
          transfer: true
        },
        {
          name: "西吾野",
          lat: 35.927082,
          lng: 139.202425
        },
        {
          name: "正丸",
          lat: 35.938324,
          lng: 139.181521
        },
        {
          name: "芦ヶ久保",
          lat: 35.976505,
          lng: 139.135982
        },
        {
          name: "横瀬",
          lat: 35.985548,
          lng: 139.097818
        },
        {
          name: "西武秩父",
          lat: 35.990061,
          lng: 139.083548
        }
      ]
    },
    {
      id: "22008",
      nameKo: "하이지마선",
      nameJp: "西武拝島線",
      color: "#FF4757",
      stations: [
        {
          name: "小平",
          lat: 35.736963,
          lng: 139.488491
        },
        {
          name: "萩山",
          lat: 35.740759,
          lng: 139.476903,
          transfer: true
        },
        {
          name: "小川",
          lat: 35.737573,
          lng: 139.463493
        },
        {
          name: "東大和市",
          lat: 35.732829,
          lng: 139.434249
        },
        {
          name: "玉川上水",
          lat: 35.731751,
          lng: 139.418435
        },
        {
          name: "武蔵砂川",
          lat: 35.728876,
          lng: 139.392319
        },
        {
          name: "西武立川",
          lat: 35.7262,
          lng: 139.370124
        },
        {
          name: "拝島",
          lat: 35.721278,
          lng: 139.343468,
          transfer: true
        }
      ]
    },
    {
      id: "22012",
      nameKo: "다마가와선",
      nameJp: "西武多摩川線",
      color: "#5352ED",
      stations: [
        {
          name: "武蔵境",
          lat: 35.702083,
          lng: 139.543402,
          transfer: true
        },
        {
          name: "新小金井",
          lat: 35.695908,
          lng: 139.526603
        },
        {
          name: "多磨",
          lat: 35.676821,
          lng: 139.51713
        },
        {
          name: "白糸台",
          lat: 35.666517,
          lng: 139.509862
        },
        {
          name: "競艇場前",
          lat: 35.656232,
          lng: 139.499721
        },
        {
          name: "是政",
          lat: 35.656242,
          lng: 139.488592
        }
      ]
    },
    {
      id: "22011",
      nameKo: "다마코선",
      nameJp: "西武多摩湖線",
      color: "#3742FA",
      stations: [
        {
          name: "国分寺",
          lat: 35.700836,
          lng: 139.479547
        },
        {
          name: "一橋学園",
          lat: 35.72217,
          lng: 139.480039
        },
        {
          name: "青梅街道",
          lat: 35.73098,
          lng: 139.476628
        },
        {
          name: "萩山",
          lat: 35.740759,
          lng: 139.476903,
          transfer: true
        },
        {
          name: "八坂",
          lat: 35.744925,
          lng: 139.467676
        },
        {
          name: "武蔵大和",
          lat: 35.756427,
          lng: 139.444008
        },
        {
          name: "多摩湖",
          lat: 35.765881,
          lng: 139.442747
        }
      ]
    },
    {
      id: "22009",
      nameKo: "세이부엔선",
      nameJp: "西武西武園線",
      color: "#2ED573",
      stations: [
        {
          name: "東村山",
          lat: 35.76006,
          lng: 139.465839
        },
        {
          name: "西武園",
          lat: 35.767684,
          lng: 139.448904
        }
      ]
    },
    {
      id: "22004",
      nameKo: "도시마엔선",
      nameJp: "西武豊島線",
      color: "#1E90FF",
      stations: [
        {
          name: "練馬",
          lat: 35.737893,
          lng: 139.654368,
          transfer: true
        },
        {
          name: "豊島園",
          lat: 35.742054,
          lng: 139.647979
        }
      ]
    }
  ],
  "東急電鉄": [
    {
      id: "26001",
      nameKo: "도요코선",
      nameJp: "東急東横線",
      color: "#FFA502",
      stations: [
        {
          name: "渋谷",
          lat: 35.659545,
          lng: 139.702417,
          transfer: true
        },
        {
          name: "代官山",
          lat: 35.648193,
          lng: 139.703284
        },
        {
          name: "中目黒",
          lat: 35.643854,
          lng: 139.698621,
          transfer: true
        },
        {
          name: "祐天寺",
          lat: 35.637163,
          lng: 139.690758
        },
        {
          name: "学芸大学",
          lat: 35.628786,
          lng: 139.68522
        },
        {
          name: "都立大学",
          lat: 35.617835,
          lng: 139.676393
        },
        {
          name: "自由が丘",
          lat: 35.607224,
          lng: 139.668664,
          transfer: true
        },
        {
          name: "田園調布",
          lat: 35.596815,
          lng: 139.667356,
          transfer: true
        },
        {
          name: "多摩川",
          lat: 35.589591,
          lng: 139.668723,
          transfer: true
        },
        {
          name: "新丸子",
          lat: 35.58049,
          lng: 139.661964,
          transfer: true
        },
        {
          name: "武蔵小杉",
          lat: 35.575752,
          lng: 139.659652,
          transfer: true
        },
        {
          name: "元住吉",
          lat: 35.565698,
          lng: 139.654668,
          transfer: true
        },
        {
          name: "日吉",
          lat: 35.5539,
          lng: 139.646944,
          transfer: true
        },
        {
          name: "綱島",
          lat: 35.536906,
          lng: 139.63491
        },
        {
          name: "大倉山",
          lat: 35.52243,
          lng: 139.629808
        },
        {
          name: "菊名",
          lat: 35.509854,
          lng: 139.63137
        },
        {
          name: "妙蓮寺",
          lat: 35.498779,
          lng: 139.633194
        },
        {
          name: "白楽",
          lat: 35.489555,
          lng: 139.627875
        },
        {
          name: "東白楽",
          lat: 35.483523,
          lng: 139.629364
        },
        {
          name: "反町",
          lat: 35.47474,
          lng: 139.625337
        },
        {
          name: "横浜",
          lat: 35.466372,
          lng: 139.622299
        }
      ]
    },
    {
      id: "26003",
      nameKo: "덴엔토시선",
      nameJp: "東急田園都市線",
      color: "#FF6348",
      stations: [
        {
          name: "渋谷",
          lat: 35.65802,
          lng: 139.702148
        },
        {
          name: "池尻大橋",
          lat: 35.650603,
          lng: 139.684319
        },
        {
          name: "三軒茶屋",
          lat: 35.643716,
          lng: 139.670156,
          transfer: true
        },
        {
          name: "駒沢大学",
          lat: 35.633471,
          lng: 139.661702
        },
        {
          name: "桜新町",
          lat: 35.631666,
          lng: 139.644779
        },
        {
          name: "用賀",
          lat: 35.626436,
          lng: 139.633928
        },
        {
          name: "二子玉川",
          lat: 35.611788,
          lng: 139.626685,
          transfer: true
        },
        {
          name: "二子新地",
          lat: 35.606994,
          lng: 139.622338,
          transfer: true
        },
        {
          name: "高津",
          lat: 35.603248,
          lng: 139.616934,
          transfer: true
        },
        {
          name: "溝の口",
          lat: 35.59984,
          lng: 139.610487,
          transfer: true
        },
        {
          name: "梶が谷",
          lat: 35.593963,
          lng: 139.605885
        },
        {
          name: "宮崎台",
          lat: 35.587228,
          lng: 139.591313
        },
        {
          name: "宮前平",
          lat: 35.584951,
          lng: 139.581983
        },
        {
          name: "鷺沼",
          lat: 35.579762,
          lng: 139.573268
        },
        {
          name: "たまプラーザ",
          lat: 35.577427,
          lng: 139.558447
        },
        {
          name: "あざみ野",
          lat: 35.568645,
          lng: 139.553462
        },
        {
          name: "江田",
          lat: 35.558671,
          lng: 139.551518
        },
        {
          name: "市が尾",
          lat: 35.551483,
          lng: 139.541496
        },
        {
          name: "藤が丘",
          lat: 35.543454,
          lng: 139.527655
        },
        {
          name: "青葉台",
          lat: 35.542855,
          lng: 139.517376
        },
        {
          name: "田奈",
          lat: 35.536204,
          lng: 139.504855
        },
        {
          name: "長津田",
          lat: 35.53196,
          lng: 139.493548
        },
        {
          name: "つくし野",
          lat: 35.527559,
          lng: 139.485139
        },
        {
          name: "すずかけ台",
          lat: 35.517094,
          lng: 139.481684
        },
        {
          name: "南町田グランベリーパーク",
          lat: 35.511502,
          lng: 139.470318
        },
        {
          name: "つきみ野",
          lat: 35.510546,
          lng: 139.458651
        },
        {
          name: "中央林間",
          lat: 35.507671,
          lng: 139.444935
        }
      ]
    },
    {
      id: "26002",
      nameKo: "메구로선",
      nameJp: "東急目黒線",
      color: "#FF7F50",
      stations: [
        {
          name: "目黒",
          lat: 35.633272,
          lng: 139.7155,
          transfer: true
        },
        {
          name: "不動前",
          lat: 35.626526,
          lng: 139.71469
        },
        {
          name: "武蔵小山",
          lat: 35.620538,
          lng: 139.704524
        },
        {
          name: "西小山",
          lat: 35.615455,
          lng: 139.698694
        },
        {
          name: "洗足",
          lat: 35.61043,
          lng: 139.694367
        },
        {
          name: "大岡山",
          lat: 35.607456,
          lng: 139.685909,
          transfer: true
        },
        {
          name: "奥沢",
          lat: 35.603947,
          lng: 139.672355
        },
        {
          name: "田園調布",
          lat: 35.596815,
          lng: 139.667356,
          transfer: true
        },
        {
          name: "多摩川",
          lat: 35.589591,
          lng: 139.668723,
          transfer: true
        },
        {
          name: "新丸子",
          lat: 35.58049,
          lng: 139.661964,
          transfer: true
        },
        {
          name: "武蔵小杉",
          lat: 35.575752,
          lng: 139.659652,
          transfer: true
        },
        {
          name: "元住吉",
          lat: 35.565698,
          lng: 139.654668,
          transfer: true
        },
        {
          name: "日吉",
          lat: 35.5539,
          lng: 139.646944,
          transfer: true
        }
      ]
    },
    {
      id: "26004",
      nameKo: "오이마치선",
      nameJp: "東急大井町線",
      color: "#FF8C00",
      stations: [
        {
          name: "大井町",
          lat: 35.607535,
          lng: 139.735025
        },
        {
          name: "下神明",
          lat: 35.608704,
          lng: 139.726256
        },
        {
          name: "戸越公園",
          lat: 35.608856,
          lng: 139.718159
        },
        {
          name: "中延",
          lat: 35.60571,
          lng: 139.712526
        },
        {
          name: "荏原町",
          lat: 35.60382,
          lng: 139.707571
        },
        {
          name: "旗の台",
          lat: 35.604923,
          lng: 139.702286,
          transfer: true
        },
        {
          name: "北千束",
          lat: 35.606311,
          lng: 139.693303
        },
        {
          name: "大岡山",
          lat: 35.607456,
          lng: 139.685909,
          transfer: true
        },
        {
          name: "緑が丘",
          lat: 35.60638,
          lng: 139.679482
        },
        {
          name: "自由が丘",
          lat: 35.607224,
          lng: 139.668664,
          transfer: true
        },
        {
          name: "九品仏",
          lat: 35.60538,
          lng: 139.660992
        },
        {
          name: "尾山台",
          lat: 35.606971,
          lng: 139.653862
        },
        {
          name: "等々力",
          lat: 35.608369,
          lng: 139.647938
        },
        {
          name: "上野毛",
          lat: 35.611957,
          lng: 139.638917
        },
        {
          name: "二子玉川",
          lat: 35.611788,
          lng: 139.626685,
          transfer: true
        },
        {
          name: "二子新地",
          lat: 35.606994,
          lng: 139.622338,
          transfer: true
        },
        {
          name: "高津",
          lat: 35.603248,
          lng: 139.616934,
          transfer: true
        },
        {
          name: "溝の口",
          lat: 35.59984,
          lng: 139.610487,
          transfer: true
        }
      ]
    },
    {
      id: "26005",
      nameKo: "이케가미선",
      nameJp: "東急池上線",
      color: "#FFB6C1",
      stations: [
        {
          name: "五反田",
          lat: 35.625262,
          lng: 139.724175
        },
        {
          name: "大崎広小路",
          lat: 35.622244,
          lng: 139.722339
        },
        {
          name: "戸越銀座",
          lat: 35.615928,
          lng: 139.714862
        },
        {
          name: "荏原中延",
          lat: 35.610056,
          lng: 139.712196
        },
        {
          name: "旗の台",
          lat: 35.604923,
          lng: 139.702286,
          transfer: true
        },
        {
          name: "長原",
          lat: 35.60219,
          lng: 139.697881
        },
        {
          name: "洗足池",
          lat: 35.599648,
          lng: 139.690896
        },
        {
          name: "石川台",
          lat: 35.596888,
          lng: 139.685063
        },
        {
          name: "雪が谷大塚",
          lat: 35.592038,
          lng: 139.681083
        },
        {
          name: "御嶽山",
          lat: 35.585236,
          lng: 139.682473
        },
        {
          name: "久が原",
          lat: 35.579499,
          lng: 139.685678
        },
        {
          name: "千鳥町",
          lat: 35.572983,
          lng: 139.69142
        },
        {
          name: "池上",
          lat: 35.572025,
          lng: 139.702822
        },
        {
          name: "蓮沼",
          lat: 35.564173,
          lng: 139.708544
        },
        {
          name: "蒲田",
          lat: 35.561767,
          lng: 139.714626,
          transfer: true
        }
      ]
    },
    {
      id: "26006",
      nameKo: "다마가와선",
      nameJp: "東急多摩川線",
      color: "#FFDAB9",
      stations: [
        {
          name: "多摩川",
          lat: 35.589591,
          lng: 139.668723,
          transfer: true
        },
        {
          name: "沼部",
          lat: 35.582526,
          lng: 139.67326
        },
        {
          name: "鵜の木",
          lat: 35.575452,
          lng: 139.680554
        },
        {
          name: "下丸子",
          lat: 35.571397,
          lng: 139.685576
        },
        {
          name: "武蔵新田",
          lat: 35.567806,
          lng: 139.692506
        },
        {
          name: "矢口渡",
          lat: 35.562462,
          lng: 139.700389
        },
        {
          name: "蒲田",
          lat: 35.561767,
          lng: 139.714626,
          transfer: true
        }
      ]
    },
    {
      id: "26007",
      nameKo: "세타가야선",
      nameJp: "東急世田谷線",
      color: "#98D8C8",
      stations: [
        {
          name: "三軒茶屋",
          lat: 35.643716,
          lng: 139.670156,
          transfer: true
        },
        {
          name: "西太子堂",
          lat: 35.644545,
          lng: 139.666382
        },
        {
          name: "若林",
          lat: 35.645933,
          lng: 139.659911
        },
        {
          name: "松陰神社前",
          lat: 35.643947,
          lng: 139.655211
        },
        {
          name: "世田谷",
          lat: 35.643564,
          lng: 139.650945
        },
        {
          name: "上町",
          lat: 35.643656,
          lng: 139.646276
        },
        {
          name: "宮の坂",
          lat: 35.647508,
          lng: 139.64494
        },
        {
          name: "山下",
          lat: 35.653844,
          lng: 139.646509
        },
        {
          name: "松原",
          lat: 35.660048,
          lng: 139.642
        },
        {
          name: "下高井戸",
          lat: 35.66615,
          lng: 139.641372,
          transfer: true
        }
      ]
    }
  ],
  "京王電鉄": [
    {
      id: "24007",
      nameKo: "케이오신선",
      nameJp: "京王新線",
      color: "#6BCF7F",
      stations: [
        {
          name: "新線新宿",
          lat: 35.68869,
          lng: 139.698812,
          transfer: true
        },
        {
          name: "初台",
          lat: 35.68123,
          lng: 139.686354
        },
        {
          name: "幡ヶ谷",
          lat: 35.677061,
          lng: 139.676183
        },
        {
          name: "笹塚",
          lat: 35.673758,
          lng: 139.667251,
          transfer: true
        }
      ]
    },
    {
      id: "24001",
      nameKo: "케이오선",
      nameJp: "京王線",
      color: "#E85298",
      stations: [
        {
          name: "新宿",
          lat: 35.690163,
          lng: 139.699187
        },
        {
          name: "笹塚",
          lat: 35.673758,
          lng: 139.667251,
          transfer: true
        },
        {
          name: "代田橋",
          lat: 35.671092,
          lng: 139.659413
        },
        {
          name: "明大前",
          lat: 35.668758,
          lng: 139.650352,
          transfer: true
        },
        {
          name: "下高井戸",
          lat: 35.66615,
          lng: 139.641372,
          transfer: true
        },
        {
          name: "桜上水",
          lat: 35.66768,
          lng: 139.63129
        },
        {
          name: "上北沢",
          lat: 35.668857,
          lng: 139.62329
        },
        {
          name: "八幡山",
          lat: 35.669982,
          lng: 139.614927
        },
        {
          name: "芦花公園",
          lat: 35.670479,
          lng: 139.608247
        },
        {
          name: "千歳烏山",
          lat: 35.667921,
          lng: 139.60067
        },
        {
          name: "仙川",
          lat: 35.662257,
          lng: 139.584908
        },
        {
          name: "つつじヶ丘",
          lat: 35.657936,
          lng: 139.575103
        },
        {
          name: "柴崎",
          lat: 35.653997,
          lng: 139.56658
        },
        {
          name: "国領",
          lat: 35.650087,
          lng: 139.558036
        },
        {
          name: "布田",
          lat: 35.649904,
          lng: 139.551557
        },
        {
          name: "調布",
          lat: 35.652181,
          lng: 139.543988,
          transfer: true
        },
        {
          name: "西調布",
          lat: 35.657169,
          lng: 139.529822
        },
        {
          name: "飛田給",
          lat: 35.660121,
          lng: 139.523666
        },
        {
          name: "武蔵野台",
          lat: 35.664159,
          lng: 139.511289
        },
        {
          name: "多磨霊園",
          lat: 35.666197,
          lng: 139.502615
        },
        {
          name: "東府中",
          lat: 35.668766,
          lng: 139.495257,
          transfer: true
        },
        {
          name: "府中",
          lat: 35.672245,
          lng: 139.4799
        },
        {
          name: "分倍河原",
          lat: 35.668493,
          lng: 139.468798,
          transfer: true
        },
        {
          name: "中河原",
          lat: 35.659549,
          lng: 139.457602
        },
        {
          name: "聖蹟桜ヶ丘",
          lat: 35.650814,
          lng: 139.446979
        },
        {
          name: "百草園",
          lat: 35.657362,
          lng: 139.431285
        },
        {
          name: "高幡不動",
          lat: 35.662361,
          lng: 139.412953,
          transfer: true
        },
        {
          name: "南平",
          lat: 35.654559,
          lng: 139.392008
        },
        {
          name: "平山城址公園",
          lat: 35.647371,
          lng: 139.379926
        },
        {
          name: "長沼",
          lat: 35.642788,
          lng: 139.365849
        },
        {
          name: "北野",
          lat: 35.644479,
          lng: 139.354489,
          transfer: true
        },
        {
          name: "京王八王子",
          lat: 35.657416,
          lng: 139.343851
        }
      ]
    },
    {
      id: "24002",
      nameKo: "사가미하라선",
      nameJp: "京王相模原線",
      color: "#4D9DE0",
      stations: [
        {
          name: "調布",
          lat: 35.652181,
          lng: 139.543988,
          transfer: true
        },
        {
          name: "京王多摩川",
          lat: 35.644499,
          lng: 139.536606
        },
        {
          name: "京王稲田堤",
          lat: 35.633895,
          lng: 139.531099
        },
        {
          name: "京王よみうりランド",
          lat: 35.632934,
          lng: 139.517597
        },
        {
          name: "稲城",
          lat: 35.636166,
          lng: 139.500398
        },
        {
          name: "若葉台",
          lat: 35.619325,
          lng: 139.472189
        },
        {
          name: "京王永山",
          lat: 35.630102,
          lng: 139.448204
        },
        {
          name: "京王多摩センター",
          lat: 35.62518,
          lng: 139.42402
        },
        {
          name: "京王堀之内",
          lat: 35.624438,
          lng: 139.400314
        },
        {
          name: "南大沢",
          lat: 35.6141,
          lng: 139.3798
        },
        {
          name: "多摩境",
          lat: 35.601826,
          lng: 139.366987
        },
        {
          name: "橋本",
          lat: 35.595518,
          lng: 139.343226
        }
      ]
    },
    {
      id: "24003",
      nameKo: "다카오선",
      nameJp: "京王高尾線",
      color: "#E15F41",
      stations: [
        {
          name: "北野",
          lat: 35.644479,
          lng: 139.354489,
          transfer: true
        },
        {
          name: "京王片倉",
          lat: 35.644343,
          lng: 139.337035
        },
        {
          name: "山田",
          lat: 35.644411,
          lng: 139.321082
        },
        {
          name: "めじろ台",
          lat: 35.643601,
          lng: 139.308446
        },
        {
          name: "狭間",
          lat: 35.640637,
          lng: 139.293808
        },
        {
          name: "高尾",
          lat: 35.641645,
          lng: 139.281551
        },
        {
          name: "高尾山口",
          lat: 35.632377,
          lng: 139.269856
        }
      ]
    },
    {
      id: "24005",
      nameKo: "도부쓰엔선",
      nameJp: "京王動物園線",
      color: "#F19066",
      stations: [
        {
          name: "高幡不動",
          lat: 35.662361,
          lng: 139.412953,
          transfer: true
        },
        {
          name: "多摩動物公園",
          lat: 35.649215,
          lng: 139.404627
        }
      ]
    },
    {
      id: "24004",
      nameKo: "게이바조선",
      nameJp: "京王競馬場線",
      color: "#BB8FCE",
      stations: [
        {
          name: "東府中",
          lat: 35.668766,
          lng: 139.495257,
          transfer: true
        },
        {
          name: "府中競馬正門前",
          lat: 35.668288,
          lng: 139.485019
        }
      ]
    },
    {
      id: "24006",
      nameKo: "이노카시라선",
      nameJp: "京王井の頭線",
      color: "#85C1E2",
      stations: [
        {
          name: "渋谷",
          lat: 35.6587,
          lng: 139.700872
        },
        {
          name: "神泉",
          lat: 35.657244,
          lng: 139.693579
        },
        {
          name: "駒場東大前",
          lat: 35.65868,
          lng: 139.684308
        },
        {
          name: "池ノ上",
          lat: 35.660402,
          lng: 139.67344
        },
        {
          name: "下北沢",
          lat: 35.661539,
          lng: 139.66691
        },
        {
          name: "新代田",
          lat: 35.662593,
          lng: 139.660524
        },
        {
          name: "東松原",
          lat: 35.662634,
          lng: 139.655535
        },
        {
          name: "明大前",
          lat: 35.668758,
          lng: 139.650352,
          transfer: true
        },
        {
          name: "永福町",
          lat: 35.67629,
          lng: 139.642733
        },
        {
          name: "西永福",
          lat: 35.678918,
          lng: 139.634936
        },
        {
          name: "浜田山",
          lat: 35.681603,
          lng: 139.627528
        },
        {
          name: "高井戸",
          lat: 35.683253,
          lng: 139.615115
        },
        {
          name: "富士見ヶ丘",
          lat: 35.684805,
          lng: 139.607072
        },
        {
          name: "久我山",
          lat: 35.688138,
          lng: 139.599211
        },
        {
          name: "三鷹台",
          lat: 35.692046,
          lng: 139.589298
        },
        {
          name: "井の頭公園",
          lat: 35.697304,
          lng: 139.583112
        },
        {
          name: "吉祥寺",
          lat: 35.702291,
          lng: 139.580306
        }
      ]
    }
  ],
  "小田急電鉄": [
    {
      id: "25001",
      nameKo: "오다와라선",
      nameJp: "小田急線",
      color: "#52B788",
      stations: [
        {
          name: "新宿",
          lat: 35.691435,
          lng: 139.699574
        },
        {
          name: "南新宿",
          lat: 35.683483,
          lng: 139.69867
        },
        {
          name: "参宮橋",
          lat: 35.678586,
          lng: 139.693568
        },
        {
          name: "代々木八幡",
          lat: 35.669715,
          lng: 139.688913
        },
        {
          name: "代々木上原",
          lat: 35.669159,
          lng: 139.680153,
          transfer: true
        },
        {
          name: "東北沢",
          lat: 35.665379,
          lng: 139.673014
        },
        {
          name: "下北沢",
          lat: 35.661655,
          lng: 139.667516
        },
        {
          name: "世田谷代田",
          lat: 35.65834,
          lng: 139.661557
        },
        {
          name: "梅ヶ丘",
          lat: 35.656024,
          lng: 139.653628
        },
        {
          name: "豪徳寺",
          lat: 35.653807,
          lng: 139.647381
        },
        {
          name: "経堂",
          lat: 35.650991,
          lng: 139.635993
        },
        {
          name: "千歳船橋",
          lat: 35.647616,
          lng: 139.624544
        },
        {
          name: "祖師ヶ谷大蔵",
          lat: 35.643236,
          lng: 139.609659
        },
        {
          name: "成城学園前",
          lat: 35.640114,
          lng: 139.598958
        },
        {
          name: "喜多見",
          lat: 35.636697,
          lng: 139.587445
        },
        {
          name: "狛江",
          lat: 35.632001,
          lng: 139.577127
        },
        {
          name: "和泉多摩川",
          lat: 35.627349,
          lng: 139.573695
        },
        {
          name: "登戸",
          lat: 35.62115,
          lng: 139.569449
        },
        {
          name: "向ヶ丘遊園",
          lat: 35.617273,
          lng: 139.564719
        },
        {
          name: "生田",
          lat: 35.614954,
          lng: 139.542024
        },
        {
          name: "読売ランド前",
          lat: 35.614723,
          lng: 139.527903
        },
        {
          name: "百合ヶ丘",
          lat: 35.60903,
          lng: 139.516121
        },
        {
          name: "新百合ヶ丘",
          lat: 35.603705,
          lng: 139.507608,
          transfer: true
        },
        {
          name: "柿生",
          lat: 35.589597,
          lng: 139.497614
        },
        {
          name: "鶴川",
          lat: 35.583077,
          lng: 139.481759
        },
        {
          name: "玉川学園前",
          lat: 35.563486,
          lng: 139.463388
        },
        {
          name: "町田",
          lat: 35.544222,
          lng: 139.445236
        },
        {
          name: "相模大野",
          lat: 35.532208,
          lng: 139.437836,
          transfer: true
        },
        {
          name: "小田急相模原",
          lat: 35.515134,
          lng: 139.422571
        },
        {
          name: "相武台前",
          lat: 35.499294,
          lng: 139.408509
        },
        {
          name: "座間",
          lat: 35.480913,
          lng: 139.399899
        },
        {
          name: "海老名",
          lat: 35.452709,
          lng: 139.390905
        },
        {
          name: "厚木",
          lat: 35.443081,
          lng: 139.377896
        },
        {
          name: "本厚木",
          lat: 35.439338,
          lng: 139.364261
        },
        {
          name: "愛甲石田",
          lat: 35.417634,
          lng: 139.344098
        },
        {
          name: "伊勢原",
          lat: 35.396081,
          lng: 139.313768
        },
        {
          name: "鶴巻温泉",
          lat: 35.381131,
          lng: 139.277813
        },
        {
          name: "東海大学前",
          lat: 35.373151,
          lng: 139.271236
        },
        {
          name: "秦野",
          lat: 35.370075,
          lng: 139.226009
        },
        {
          name: "渋沢",
          lat: 35.374032,
          lng: 139.184405
        },
        {
          name: "新松田",
          lat: 35.345082,
          lng: 139.139848
        },
        {
          name: "開成",
          lat: 35.326532,
          lng: 139.135785
        },
        {
          name: "栢山",
          lat: 35.310679,
          lng: 139.14258
        },
        {
          name: "富水",
          lat: 35.296759,
          lng: 139.145166
        },
        {
          name: "螢田",
          lat: 35.285055,
          lng: 139.152036
        },
        {
          name: "足柄",
          lat: 35.271763,
          lng: 139.15447
        },
        {
          name: "小田原",
          lat: 35.256229,
          lng: 139.155396
        }
      ]
    },
    {
      id: "25002",
      nameKo: "에노시마선",
      nameJp: "小田急江ノ島線",
      color: "#D4A373",
      stations: [
        {
          name: "相模大野",
          lat: 35.532208,
          lng: 139.437836,
          transfer: true
        },
        {
          name: "東林間",
          lat: 35.520541,
          lng: 139.438883
        },
        {
          name: "中央林間",
          lat: 35.508066,
          lng: 139.444105
        },
        {
          name: "南林間",
          lat: 35.495627,
          lng: 139.447911
        },
        {
          name: "鶴間",
          lat: 35.49057,
          lng: 139.450572
        },
        {
          name: "大和",
          lat: 35.46965,
          lng: 139.461553
        },
        {
          name: "桜ヶ丘",
          lat: 35.450486,
          lng: 139.465734
        },
        {
          name: "高座渋谷",
          lat: 35.432519,
          lng: 139.464854
        },
        {
          name: "長後",
          lat: 35.41261,
          lng: 139.465307
        },
        {
          name: "湘南台",
          lat: 35.396488,
          lng: 139.466451
        },
        {
          name: "六会日大前",
          lat: 35.383761,
          lng: 139.470665
        },
        {
          name: "善行",
          lat: 35.36285,
          lng: 139.473199
        },
        {
          name: "藤沢本町",
          lat: 35.348188,
          lng: 139.476046
        },
        {
          name: "藤沢",
          lat: 35.338558,
          lng: 139.486971
        },
        {
          name: "本鵠沼",
          lat: 35.331129,
          lng: 139.475412
        },
        {
          name: "鵠沼海岸",
          lat: 35.320744,
          lng: 139.47121
        },
        {
          name: "片瀬江ノ島",
          lat: 35.309345,
          lng: 139.482934
        }
      ]
    },
    {
      id: "25003",
      nameKo: "다마선",
      nameJp: "小田急多摩線",
      color: "#EB984E",
      stations: [
        {
          name: "新百合ヶ丘",
          lat: 35.603705,
          lng: 139.507608,
          transfer: true
        },
        {
          name: "五月台",
          lat: 35.600174,
          lng: 139.493542
        },
        {
          name: "栗平",
          lat: 35.605731,
          lng: 139.481298
        },
        {
          name: "黒川",
          lat: 35.613203,
          lng: 139.470731
        },
        {
          name: "はるひ野",
          lat: 35.618885,
          lng: 139.464534
        },
        {
          name: "小田急永山",
          lat: 35.629972,
          lng: 139.447943
        },
        {
          name: "小田急多摩センター",
          lat: 35.624902,
          lng: 139.424298
        },
        {
          name: "唐木田",
          lat: 35.616672,
          lng: 139.411622
        }
      ]
    }
  ],
  "東武鉄道": [
    {
      id: "21002",
      nameKo: "이세사키선/스카이트리라인",
      nameJp: "東武伊勢崎線",
      color: "#DC7633",
      stations: [
        {
          name: "浅草",
          lat: 35.711883,
          lng: 139.798214
        },
        {
          name: "とうきょうスカイツリー",
          lat: 35.71043,
          lng: 139.809332
        },
        {
          name: "押上〈スカイツリー前〉",
          lat: 35.710702,
          lng: 139.812935,
          transfer: true
        },
        {
          name: "曳舟",
          lat: 35.718418,
          lng: 139.816634,
          transfer: true
        },
        {
          name: "東向島",
          lat: 35.724324,
          lng: 139.819306
        },
        {
          name: "鐘ヶ淵",
          lat: 35.733712,
          lng: 139.820344
        },
        {
          name: "堀切",
          lat: 35.742977,
          lng: 139.817727
        },
        {
          name: "牛田",
          lat: 35.744555,
          lng: 139.811816
        },
        {
          name: "北千住",
          lat: 35.749891,
          lng: 139.805564
        },
        {
          name: "小菅",
          lat: 35.759039,
          lng: 139.812935
        },
        {
          name: "五反野",
          lat: 35.765852,
          lng: 139.809643
        },
        {
          name: "梅島",
          lat: 35.772437,
          lng: 139.797916
        },
        {
          name: "西新井",
          lat: 35.777323,
          lng: 139.790372,
          transfer: true
        },
        {
          name: "竹ノ塚",
          lat: 35.794368,
          lng: 139.790788
        },
        {
          name: "谷塚",
          lat: 35.814926,
          lng: 139.801483
        },
        {
          name: "草加",
          lat: 35.828476,
          lng: 139.803397
        },
        {
          name: "獨協大学前〈草加松原〉",
          lat: 35.84333,
          lng: 139.800622
        },
        {
          name: "新田",
          lat: 35.854086,
          lng: 139.795391
        },
        {
          name: "蒲生",
          lat: 35.866851,
          lng: 139.791686
        },
        {
          name: "新越谷",
          lat: 35.875186,
          lng: 139.789905
        },
        {
          name: "越谷",
          lat: 35.887529,
          lng: 139.786213
        },
        {
          name: "北越谷",
          lat: 35.901724,
          lng: 139.780008
        },
        {
          name: "大袋",
          lat: 35.92437,
          lng: 139.777868
        },
        {
          name: "せんげん台",
          lat: 35.935832,
          lng: 139.774478
        },
        {
          name: "武里",
          lat: 35.949102,
          lng: 139.770675
        },
        {
          name: "一ノ割",
          lat: 35.96412,
          lng: 139.766219
        },
        {
          name: "春日部",
          lat: 35.980095,
          lng: 139.752345,
          transfer: true
        },
        {
          name: "北春日部",
          lat: 35.990655,
          lng: 139.744012
        },
        {
          name: "姫宮",
          lat: 36.004384,
          lng: 139.738674
        },
        {
          name: "東武動物公園",
          lat: 36.024604,
          lng: 139.726901
        },
        {
          name: "和戸",
          lat: 36.039562,
          lng: 139.701156
        },
        {
          name: "久喜",
          lat: 36.065684,
          lng: 139.67727
        },
        {
          name: "鷲宮",
          lat: 36.09626,
          lng: 139.656945
        },
        {
          name: "花崎",
          lat: 36.109891,
          lng: 139.633522
        },
        {
          name: "加須",
          lat: 36.122992,
          lng: 139.595584
        },
        {
          name: "南羽生",
          lat: 36.14959,
          lng: 139.55696
        },
        {
          name: "羽生",
          lat: 36.170345,
          lng: 139.533949
        },
        {
          name: "川俣",
          lat: 36.208778,
          lng: 139.52652
        },
        {
          name: "茂林寺前",
          lat: 36.226331,
          lng: 139.527058
        },
        {
          name: "館林",
          lat: 36.246606,
          lng: 139.527811
        },
        {
          name: "多々良",
          lat: 36.273732,
          lng: 139.500179
        },
        {
          name: "県",
          lat: 36.290615,
          lng: 139.472336
        },
        {
          name: "福居",
          lat: 36.305208,
          lng: 139.458634
        },
        {
          name: "東武和泉",
          lat: 36.315595,
          lng: 139.45509
        },
        {
          name: "足利市",
          lat: 36.32948,
          lng: 139.448113
        },
        {
          name: "野州山辺",
          lat: 36.32633,
          lng: 139.431981
        },
        {
          name: "韮川",
          lat: 36.307913,
          lng: 139.401704
        },
        {
          name: "太田",
          lat: 36.294228,
          lng: 139.378779
        },
        {
          name: "細谷",
          lat: 36.282523,
          lng: 139.348509
        },
        {
          name: "木崎",
          lat: 36.271393,
          lng: 139.312988
        },
        {
          name: "世良田",
          lat: 36.272931,
          lng: 139.282038
        },
        {
          name: "境町",
          lat: 36.277191,
          lng: 139.256177
        },
        {
          name: "剛志",
          lat: 36.295428,
          lng: 139.223792
        },
        {
          name: "新伊勢崎",
          lat: 36.318052,
          lng: 139.201816
        },
        {
          name: "伊勢崎",
          lat: 36.326622,
          lng: 139.194559
        }
      ]
    },
    {
      id: "21004",
      nameKo: "도부어반파크라인/노다선",
      nameJp: "東武アーバンパークライン（東武野田線）",
      color: "#AF7AC5",
      stations: [
        {
          name: "大宮",
          lat: 35.907599,
          lng: 139.624458
        },
        {
          name: "北大宮",
          lat: 35.91716,
          lng: 139.624726
        },
        {
          name: "大宮公園",
          lat: 35.92374,
          lng: 139.632903
        },
        {
          name: "大和田",
          lat: 35.929359,
          lng: 139.65051
        },
        {
          name: "七里",
          lat: 35.936464,
          lng: 139.665948
        },
        {
          name: "岩槻",
          lat: 35.950239,
          lng: 139.693197
        },
        {
          name: "東岩槻",
          lat: 35.963273,
          lng: 139.712192
        },
        {
          name: "豊春",
          lat: 35.968014,
          lng: 139.72601
        },
        {
          name: "八木崎",
          lat: 35.978376,
          lng: 139.741785
        },
        {
          name: "春日部",
          lat: 35.980095,
          lng: 139.752345,
          transfer: true
        },
        {
          name: "藤の牛島",
          lat: 35.98026,
          lng: 139.778038
        },
        {
          name: "南桜井",
          lat: 35.980441,
          lng: 139.807988
        },
        {
          name: "川間",
          lat: 35.979172,
          lng: 139.83385
        },
        {
          name: "七光台",
          lat: 35.970884,
          lng: 139.852906
        },
        {
          name: "清水公園",
          lat: 35.959364,
          lng: 139.85967
        },
        {
          name: "愛宕",
          lat: 35.950154,
          lng: 139.864817
        },
        {
          name: "野田市",
          lat: 35.943652,
          lng: 139.870728
        },
        {
          name: "梅郷",
          lat: 35.931575,
          lng: 139.891086
        },
        {
          name: "運河",
          lat: 35.914392,
          lng: 139.906063
        },
        {
          name: "江戸川台",
          lat: 35.897344,
          lng: 139.91045
        },
        {
          name: "初石",
          lat: 35.883783,
          lng: 139.917861
        },
        {
          name: "流山おおたかの森",
          lat: 35.872051,
          lng: 139.925898
        },
        {
          name: "豊四季",
          lat: 35.86657,
          lng: 139.93929
        },
        {
          name: "柏",
          lat: 35.862316,
          lng: 139.971148,
          transfer: true
        },
        {
          name: "新柏",
          lat: 35.838128,
          lng: 139.966994
        },
        {
          name: "増尾",
          lat: 35.829704,
          lng: 139.976604
        },
        {
          name: "逆井",
          lat: 35.823336,
          lng: 139.983812
        },
        {
          name: "高柳",
          lat: 35.808211,
          lng: 139.998936
        },
        {
          name: "六実",
          lat: 35.793715,
          lng: 139.999195
        },
        {
          name: "新鎌ヶ谷",
          lat: 35.780221,
          lng: 139.999455
        },
        {
          name: "鎌ヶ谷",
          lat: 35.763765,
          lng: 139.997266
        },
        {
          name: "馬込沢",
          lat: 35.741586,
          lng: 139.992199
        },
        {
          name: "塚田",
          lat: 35.722102,
          lng: 139.982859
        },
        {
          name: "新船橋",
          lat: 35.710993,
          lng: 139.979765
        },
        {
          name: "船橋",
          lat: 35.7021,
          lng: 139.98436
        }
      ]
    },
    {
      id: "21001",
      nameKo: "도부도조선",
      nameJp: "東武東上線",
      color: "#004098",
      stations: [
        {
          name: "池袋",
          lat: 35.730924,
          lng: 139.710678
        },
        {
          name: "北池袋",
          lat: 35.741283,
          lng: 139.716749
        },
        {
          name: "下板橋",
          lat: 35.745721,
          lng: 139.714785
        },
        {
          name: "大山",
          lat: 35.748398,
          lng: 139.702589
        },
        {
          name: "中板橋",
          lat: 35.756214,
          lng: 139.694628
        },
        {
          name: "ときわ台",
          lat: 35.758771,
          lng: 139.689015
        },
        {
          name: "上板橋",
          lat: 35.763596,
          lng: 139.67641
        },
        {
          name: "東武練馬",
          lat: 35.768698,
          lng: 139.661964
        },
        {
          name: "下赤塚",
          lat: 35.770558,
          lng: 139.644482
        },
        {
          name: "成増",
          lat: 35.777723,
          lng: 139.632708
        },
        {
          name: "和光市",
          lat: 35.788507,
          lng: 139.612434,
          transfer: true
        },
        {
          name: "朝霞",
          lat: 35.796736,
          lng: 139.600321
        },
        {
          name: "朝霞台",
          lat: 35.814328,
          lng: 139.587189
        },
        {
          name: "志木",
          lat: 35.822105,
          lng: 139.575367
        },
        {
          name: "柳瀬川",
          lat: 35.830723,
          lng: 139.562071
        },
        {
          name: "みずほ台",
          lat: 35.838233,
          lng: 139.55078
        },
        {
          name: "鶴瀬",
          lat: 35.845776,
          lng: 139.539347
        },
        {
          name: "ふじみ野",
          lat: 35.860735,
          lng: 139.523389
        },
        {
          name: "上福岡",
          lat: 35.873855,
          lng: 139.511782
        },
        {
          name: "新河岸",
          lat: 35.890911,
          lng: 139.497257
        },
        {
          name: "川越",
          lat: 35.906742,
          lng: 139.483078,
          transfer: true
        },
        {
          name: "川越市",
          lat: 35.914146,
          lng: 139.476989
        },
        {
          name: "霞ヶ関",
          lat: 35.925635,
          lng: 139.442897
        },
        {
          name: "鶴ヶ島",
          lat: 35.936771,
          lng: 139.423825
        },
        {
          name: "若葉",
          lat: 35.948919,
          lng: 139.408782
        },
        {
          name: "坂戸",
          lat: 35.957181,
          lng: 139.394032
        },
        {
          name: "北坂戸",
          lat: 35.972098,
          lng: 139.396932
        },
        {
          name: "高坂",
          lat: 36.002572,
          lng: 139.397747
        },
        {
          name: "東松山",
          lat: 36.034608,
          lng: 139.401651
        },
        {
          name: "森林公園",
          lat: 36.045239,
          lng: 139.374947
        },
        {
          name: "つきのわ",
          lat: 36.04352,
          lng: 139.345541
        },
        {
          name: "武蔵嵐山",
          lat: 36.044001,
          lng: 139.32829
        },
        {
          name: "小川町",
          lat: 36.05903,
          lng: 139.260412
        },
        {
          name: "東武竹沢",
          lat: 36.0754,
          lng: 139.237591
        },
        {
          name: "みなみ寄居",
          lat: 36.092417,
          lng: 139.2365
        },
        {
          name: "男衾",
          lat: 36.107415,
          lng: 139.234442
        },
        {
          name: "鉢形",
          lat: 36.11378,
          lng: 139.208649
        },
        {
          name: "玉淀",
          lat: 36.117071,
          lng: 139.200052
        },
        {
          name: "寄居",
          lat: 36.117597,
          lng: 139.194508
        }
      ]
    },
    {
      id: "21005",
      nameKo: "가메이도선",
      nameJp: "東武亀戸線",
      color: "#5DADE2",
      stations: [
        {
          name: "曳舟",
          lat: 35.718418,
          lng: 139.816634,
          transfer: true
        },
        {
          name: "小村井",
          lat: 35.710316,
          lng: 139.827595
        },
        {
          name: "東あずま",
          lat: 35.707067,
          lng: 139.831883
        },
        {
          name: "亀戸水神",
          lat: 35.699976,
          lng: 139.833422
        },
        {
          name: "亀戸",
          lat: 35.697708,
          lng: 139.826791
        }
      ]
    },
    {
      id: "21006",
      nameKo: "다이시선",
      nameJp: "東武大師線",
      color: "#48C9B0",
      stations: [
        {
          name: "西新井",
          lat: 35.777323,
          lng: 139.790372,
          transfer: true
        },
        {
          name: "大師前",
          lat: 35.778989,
          lng: 139.781647
        }
      ]
    }
  ],
  "京急電鉄": [
    {
      id: "27001",
      nameKo: "본선",
      nameJp: "京急本線",
      color: "#F8B739",
      stations: [
        {
          name: "泉岳寺",
          lat: 35.638692,
          lng: 139.74002,
          transfer: true
        },
        {
          name: "品川",
          lat: 35.628284,
          lng: 139.73809
        },
        {
          name: "北品川",
          lat: 35.622458,
          lng: 139.739191
        },
        {
          name: "新馬場",
          lat: 35.61762,
          lng: 139.741366
        },
        {
          name: "青物横丁",
          lat: 35.609351,
          lng: 139.742958
        },
        {
          name: "鮫洲",
          lat: 35.604977,
          lng: 139.742227
        },
        {
          name: "立会川",
          lat: 35.598489,
          lng: 139.738886
        },
        {
          name: "大森海岸",
          lat: 35.587576,
          lng: 139.73544
        },
        {
          name: "平和島",
          lat: 35.57868,
          lng: 139.73491
        },
        {
          name: "大森町",
          lat: 35.572431,
          lng: 139.732027
        },
        {
          name: "梅屋敷",
          lat: 35.566873,
          lng: 139.728266
        },
        {
          name: "京急蒲田",
          lat: 35.560796,
          lng: 139.723681,
          transfer: true
        },
        {
          name: "雑色",
          lat: 35.549725,
          lng: 139.715005
        },
        {
          name: "六郷土手",
          lat: 35.540577,
          lng: 139.7076
        },
        {
          name: "京急川崎",
          lat: 35.53285,
          lng: 139.700893,
          transfer: true
        },
        {
          name: "八丁畷",
          lat: 35.523054,
          lng: 139.691346
        },
        {
          name: "鶴見市場",
          lat: 35.517594,
          lng: 139.68642
        },
        {
          name: "京急鶴見",
          lat: 35.507032,
          lng: 139.677743
        },
        {
          name: "花月総持寺",
          lat: 35.500358,
          lng: 139.672813
        },
        {
          name: "生麦",
          lat: 35.4956,
          lng: 139.6673
        },
        {
          name: "京急新子安",
          lat: 35.487242,
          lng: 139.655848
        },
        {
          name: "子安",
          lat: 35.484556,
          lng: 139.644965
        },
        {
          name: "神奈川新町",
          lat: 35.481559,
          lng: 139.640152
        },
        {
          name: "京急東神奈川",
          lat: 35.477412,
          lng: 139.634669
        },
        {
          name: "神奈川",
          lat: 35.471304,
          lng: 139.627364
        },
        {
          name: "横浜",
          lat: 35.466066,
          lng: 139.623055
        },
        {
          name: "戸部",
          lat: 35.456631,
          lng: 139.61956
        },
        {
          name: "日ノ出町",
          lat: 35.445524,
          lng: 139.626696
        },
        {
          name: "黄金町",
          lat: 35.439694,
          lng: 139.62246
        },
        {
          name: "南太田",
          lat: 35.436923,
          lng: 139.613408
        },
        {
          name: "井土ヶ谷",
          lat: 35.433895,
          lng: 139.60061
        },
        {
          name: "弘明寺",
          lat: 35.42437,
          lng: 139.596791
        },
        {
          name: "上大岡",
          lat: 35.409418,
          lng: 139.596552
        },
        {
          name: "屏風浦",
          lat: 35.394176,
          lng: 139.610387
        },
        {
          name: "杉田",
          lat: 35.383796,
          lng: 139.615734
        },
        {
          name: "京急富岡",
          lat: 35.366743,
          lng: 139.629772
        },
        {
          name: "能見台",
          lat: 35.360528,
          lng: 139.629233
        },
        {
          name: "金沢文庫",
          lat: 35.342966,
          lng: 139.621606
        },
        {
          name: "金沢八景",
          lat: 35.331223,
          lng: 139.62018,
          transfer: true
        },
        {
          name: "追浜",
          lat: 35.315461,
          lng: 139.624905
        },
        {
          name: "京急田浦",
          lat: 35.300892,
          lng: 139.625252
        },
        {
          name: "安針塚",
          lat: 35.286641,
          lng: 139.64292
        },
        {
          name: "逸見",
          lat: 35.28048,
          lng: 139.653149
        },
        {
          name: "汐入",
          lat: 35.280241,
          lng: 139.662443
        },
        {
          name: "横須賀中央",
          lat: 35.27858,
          lng: 139.670217
        },
        {
          name: "県立大学",
          lat: 35.269731,
          lng: 139.677033
        },
        {
          name: "堀ノ内",
          lat: 35.26322,
          lng: 139.686932,
          transfer: true
        },
        {
          name: "京急大津",
          lat: 35.261068,
          lng: 139.695334
        },
        {
          name: "馬堀海岸",
          lat: 35.259651,
          lng: 139.707328
        },
        {
          name: "浦賀",
          lat: 35.250933,
          lng: 139.714999
        }
      ]
    },
    {
      id: "27002",
      nameKo: "공항선",
      nameJp: "京急空港線",
      color: "#EC7063",
      stations: [
        {
          name: "京急蒲田",
          lat: 35.560796,
          lng: 139.723681,
          transfer: true
        },
        {
          name: "糀谷",
          lat: 35.5545,
          lng: 139.72962
        },
        {
          name: "大鳥居",
          lat: 35.552531,
          lng: 139.739356
        },
        {
          name: "穴守稲荷",
          lat: 35.550326,
          lng: 139.746669
        },
        {
          name: "天空橋",
          lat: 35.548908,
          lng: 139.75423
        },
        {
          name: "羽田空港第3ターミナル",
          lat: 35.544676,
          lng: 139.768968
        },
        {
          name: "羽田空港第1・第2ターミナル",
          lat: 35.549809,
          lng: 139.785962
        }
      ]
    },
    {
      id: "27003",
      nameKo: "다이시선",
      nameJp: "京急大師線",
      color: "#A569BD",
      stations: [
        {
          name: "京急川崎",
          lat: 35.53285,
          lng: 139.700893,
          transfer: true
        },
        {
          name: "港町",
          lat: 35.535014,
          lng: 139.712578
        },
        {
          name: "鈴木町",
          lat: 35.53535,
          lng: 139.720655
        },
        {
          name: "川崎大師",
          lat: 35.535711,
          lng: 139.725946
        },
        {
          name: "東門前",
          lat: 35.536566,
          lng: 139.734298
        },
        {
          name: "大師橋",
          lat: 35.536611,
          lng: 139.740381
        },
        {
          name: "小島新田",
          lat: 35.534798,
          lng: 139.747575
        }
      ]
    },
    {
      id: "27004",
      nameKo: "즈시선",
      nameJp: "京急逗子線",
      color: "#5499C7",
      stations: [
        {
          name: "金沢八景",
          lat: 35.331223,
          lng: 139.62018,
          transfer: true
        },
        {
          name: "六浦",
          lat: 35.32269,
          lng: 139.611532
        },
        {
          name: "神武寺",
          lat: 35.306233,
          lng: 139.592947
        },
        {
          name: "逗子・葉山",
          lat: 35.294189,
          lng: 139.580359
        }
      ]
    },
    {
      id: "27005",
      nameKo: "구리하마선",
      nameJp: "京急久里浜線",
      color: "#45B39D",
      stations: [
        {
          name: "堀ノ内",
          lat: 35.26322,
          lng: 139.686932,
          transfer: true
        },
        {
          name: "新大津",
          lat: 35.257013,
          lng: 139.69016
        },
        {
          name: "北久里浜",
          lat: 35.249355,
          lng: 139.686368
        },
        {
          name: "京急久里浜",
          lat: 35.231332,
          lng: 139.702139
        },
        {
          name: "ＹＲＰ野比",
          lat: 35.212229,
          lng: 139.685068
        },
        {
          name: "京急長沢",
          lat: 35.20548,
          lng: 139.674048
        },
        {
          name: "津久井浜",
          lat: 35.198419,
          lng: 139.665279
        },
        {
          name: "三浦海岸",
          lat: 35.188084,
          lng: 139.653138
        },
        {
          name: "三崎口",
          lat: 35.177515,
          lng: 139.633207
        }
      ]
    }
  ],
  "京成電鉄": [
    {
      id: "23001",
      nameKo: "본선",
      nameJp: "京成本線",
      color: "#F5B041",
      stations: [
        {
          name: "京成上野",
          lat: 35.711232,
          lng: 139.773571,
          transfer: true
        },
        {
          name: "日暮里",
          lat: 35.727908,
          lng: 139.771287,
          transfer: true
        },
        {
          name: "新三河島",
          lat: 35.73714,
          lng: 139.773834
        },
        {
          name: "町屋",
          lat: 35.742354,
          lng: 139.781499
        },
        {
          name: "千住大橋",
          lat: 35.74243,
          lng: 139.796934
        },
        {
          name: "京成関屋",
          lat: 35.744008,
          lng: 139.81183
        },
        {
          name: "堀切菖蒲園",
          lat: 35.747649,
          lng: 139.827545
        },
        {
          name: "お花茶屋",
          lat: 35.747585,
          lng: 139.83988
        },
        {
          name: "青砥",
          lat: 35.745883,
          lng: 139.856292,
          transfer: true
        },
        {
          name: "京成高砂",
          lat: 35.750932,
          lng: 139.866875,
          transfer: true
        },
        {
          name: "京成小岩",
          lat: 35.742158,
          lng: 139.88371
        },
        {
          name: "江戸川",
          lat: 35.737723,
          lng: 139.896226
        },
        {
          name: "国府台",
          lat: 35.736301,
          lng: 139.90322
        },
        {
          name: "市川真間",
          lat: 35.73121,
          lng: 139.911717
        },
        {
          name: "菅野",
          lat: 35.728272,
          lng: 139.919413
        },
        {
          name: "京成八幡",
          lat: 35.723811,
          lng: 139.92816
        },
        {
          name: "鬼越",
          lat: 35.719776,
          lng: 139.937932
        },
        {
          name: "京成中山",
          lat: 35.716998,
          lng: 139.944203
        },
        {
          name: "東中山",
          lat: 35.714385,
          lng: 139.952683
        },
        {
          name: "京成西船",
          lat: 35.711627,
          lng: 139.958863
        },
        {
          name: "海神",
          lat: 35.705888,
          lng: 139.971888
        },
        {
          name: "京成船橋",
          lat: 35.700161,
          lng: 139.985451
        },
        {
          name: "大神宮下",
          lat: 35.693945,
          lng: 139.991431
        },
        {
          name: "船橋競馬場",
          lat: 35.689606,
          lng: 139.997998
        },
        {
          name: "谷津",
          lat: 35.685257,
          lng: 140.007658
        },
        {
          name: "京成津田沼",
          lat: 35.68364,
          lng: 140.024823
        },
        {
          name: "京成大久保",
          lat: 35.686016,
          lng: 140.048629
        },
        {
          name: "実籾",
          lat: 35.686852,
          lng: 140.068289
        },
        {
          name: "八千代台",
          lat: 35.701465,
          lng: 140.090942
        },
        {
          name: "京成大和田",
          lat: 35.712309,
          lng: 140.108578
        },
        {
          name: "勝田台",
          lat: 35.715445,
          lng: 140.126053
        },
        {
          name: "志津",
          lat: 35.717406,
          lng: 140.144982
        },
        {
          name: "ユーカリが丘",
          lat: 35.721801,
          lng: 140.156354
        },
        {
          name: "京成臼井",
          lat: 35.730017,
          lng: 140.180796
        },
        {
          name: "京成佐倉",
          lat: 35.725205,
          lng: 140.229633
        },
        {
          name: "大佐倉",
          lat: 35.729908,
          lng: 140.25079
        },
        {
          name: "京成酒々井",
          lat: 35.736867,
          lng: 140.270132
        },
        {
          name: "宗吾参道",
          lat: 35.752669,
          lng: 140.280975
        },
        {
          name: "公津の杜",
          lat: 35.760446,
          lng: 140.294904
        },
        {
          name: "京成成田",
          lat: 35.776308,
          lng: 140.315473
        },
        {
          name: "東成田",
          lat: 35.770091,
          lng: 140.387225
        },
        {
          name: "空港第２ビル（第２旅客ターミナル）",
          lat: 35.773693,
          lng: 140.387163,
          transfer: true
        },
        {
          name: "成田空港（第１旅客ターミナル）",
          lat: 35.763983,
          lng: 140.384644,
          transfer: true
        }
      ]
    },
    {
      id: "23002",
      nameKo: "오시아게선",
      nameJp: "京成押上線",
      color: "#EB984E",
      stations: [
        {
          name: "押上（スカイツリー前）",
          lat: 35.710702,
          lng: 139.812935,
          transfer: true
        },
        {
          name: "京成曳舟",
          lat: 35.718441,
          lng: 139.820012
        },
        {
          name: "八広",
          lat: 35.727687,
          lng: 139.828738
        },
        {
          name: "四ツ木",
          lat: 35.731962,
          lng: 139.834918
        },
        {
          name: "京成立石",
          lat: 35.738281,
          lng: 139.848558
        },
        {
          name: "青砥",
          lat: 35.745883,
          lng: 139.856292,
          transfer: true
        },
        {
          name: "京成高砂",
          lat: 35.750932,
          lng: 139.866875,
          transfer: true
        }
      ]
    },
    {
      id: "23005",
      nameKo: "히가시나리타선",
      nameJp: "京成千原線",
      color: "#CD6155",
      stations: [
        {
          name: "千葉中央",
          lat: 35.607354,
          lng: 140.117809
        },
        {
          name: "千葉寺",
          lat: 35.590311,
          lng: 140.132236
        },
        {
          name: "大森台",
          lat: 35.584126,
          lng: 140.149398
        },
        {
          name: "学園前",
          lat: 35.560364,
          lng: 140.158416
        },
        {
          name: "おゆみ野",
          lat: 35.550029,
          lng: 140.166264
        },
        {
          name: "ちはら台",
          lat: 35.534017,
          lng: 140.17029
        }
      ]
    },
    {
      id: "23006",
      nameKo: "나리타스카이액세스선",
      nameJp: "成田スカイアクセス",
      color: "#8E44AD",
      stations: [
        {
          name: "京成上野",
          lat: 35.711232,
          lng: 139.773571,
          transfer: true
        },
        {
          name: "日暮里",
          lat: 35.727908,
          lng: 139.771287,
          transfer: true
        },
        {
          name: "青砥",
          lat: 35.745883,
          lng: 139.856292,
          transfer: true
        },
        {
          name: "京成高砂",
          lat: 35.750932,
          lng: 139.866875,
          transfer: true
        },
        {
          name: "東松戸",
          lat: 35.769954,
          lng: 139.942957
        },
        {
          name: "新鎌ヶ谷",
          lat: 35.779481,
          lng: 139.998361
        },
        {
          name: "千葉ニュータウン中央",
          lat: 35.800175,
          lng: 140.116159
        },
        {
          name: "印旛日本医大",
          lat: 35.787512,
          lng: 140.203112
        },
        {
          name: "成田湯川",
          lat: 35.799115,
          lng: 140.291596
        },
        {
          name: "空港第２ビル（第２旅客ターミナル）",
          lat: 35.773693,
          lng: 140.387163,
          transfer: true
        },
        {
          name: "成田空港（第１旅客ターミナル）",
          lat: 35.763983,
          lng: 140.384644,
          transfer: true
        }
      ]
    }
  ]
};
