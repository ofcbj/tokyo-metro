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
          name: "니시마고메/西馬込",
          lat: 35.598,
          lng: 139.721
        },
        {
          name: "마고메/馬込",
          lat: 35.6003,
          lng: 139.7078
        },
        {
          name: "나카나이/中延",
          lat: 35.6081,
          lng: 139.7131
        },
        {
          name: "타치아이가와/立会川",
          lat: 35.6181,
          lng: 139.7147
        },
        {
          name: "고탄다/五反田",
          lat: 35.6257,
          lng: 139.7238,
          transfer: true
        },
        {
          name: "다카나와/高輪",
          lat: 35.6331,
          lng: 139.7331
        },
        {
          name: "다카와바시/高輪橋",
          lat: 35.6385,
          lng: 139.7393
        },
        {
          name: "신바시/新橋",
          lat: 35.6664,
          lng: 139.7583,
          transfer: true
        },
        {
          name: "히가시긴자/東銀座",
          lat: 35.6699,
          lng: 139.7668
        },
        {
          name: "니혼바시/日本橋",
          lat: 35.683,
          lng: 139.7743,
          transfer: true
        },
        {
          name: "닛포리/日暮里",
          lat: 35.7276,
          lng: 139.7707,
          transfer: true
        },
        {
          name: "오시아게/押上",
          lat: 35.7104,
          lng: 139.8133,
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
          name: "메구로/目黒",
          lat: 35.6338,
          lng: 139.7157,
          transfer: true
        },
        {
          name: "시로카네다카나와/白金高輪",
          lat: 35.6387,
          lng: 139.7334,
          transfer: true
        },
        {
          name: "시로카네타카나와/白金台",
          lat: 35.6378,
          lng: 139.7281
        },
        {
          name: "아자부주반/麻布十番",
          lat: 35.6549,
          lng: 139.7368,
          transfer: true
        },
        {
          name: "미타/三田",
          lat: 35.6485,
          lng: 139.7454,
          transfer: true
        },
        {
          name: "시바코엔/芝公園",
          lat: 35.6542,
          lng: 139.7517
        },
        {
          name: "오나리몬/御成門",
          lat: 35.6617,
          lng: 139.7517
        },
        {
          name: "우치사이와이초/内幸町",
          lat: 35.6687,
          lng: 139.755
        },
        {
          name: "오테마치/大手町",
          lat: 35.6867,
          lng: 139.7662,
          transfer: true
        },
        {
          name: "스에히로초/末広町",
          lat: 35.7017,
          lng: 139.7731
        },
        {
          name: "니시타카시마다이라/西高島平",
          lat: 35.7894,
          lng: 139.6728,
          transfer: true
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
          name: "신선/新線新宿",
          lat: 35.6938,
          lng: 139.7017
        },
        {
          name: "신주쿠산초메/新宿三丁目",
          lat: 35.6895,
          lng: 139.7063,
          transfer: true
        },
        {
          name: "아키시마벤텐/秋葉原",
          lat: 35.6984,
          lng: 139.7731,
          transfer: true
        },
        {
          name: "이와모토초/岩本町",
          lat: 35.6935,
          lng: 139.7772,
          transfer: true
        },
        {
          name: "모리시타/森下",
          lat: 35.6881,
          lng: 139.7917
        },
        {
          name: "하마초/浜町",
          lat: 35.6893,
          lng: 139.7885
        },
        {
          name: "모토야와타/本八幡",
          lat: 35.7218,
          lng: 139.9294,
          transfer: true
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
          name: "도초마에/都庁前",
          lat: 35.6896,
          lng: 139.6918,
          transfer: true
        },
        {
          name: "신주쿠니시구치/新宿西口",
          lat: 35.6931,
          lng: 139.6992,
          transfer: true
        },
        {
          name: "신주쿠/新宿",
          lat: 35.6896,
          lng: 139.7006,
          transfer: true
        },
        {
          name: "요요기/代々木",
          lat: 35.6831,
          lng: 139.7022,
          transfer: true
        },
        {
          name: "시부야/渋谷",
          lat: 35.658,
          lng: 139.7016,
          transfer: true
        },
        {
          name: "아자부주반/麻布十番",
          lat: 35.6549,
          lng: 139.7368,
          transfer: true
        },
        {
          name: "롯폰기/六本木",
          lat: 35.6633,
          lng: 139.7292,
          transfer: true
        },
        {
          name: "아카사카/赤坂",
          lat: 35.6743,
          lng: 139.7364,
          transfer: true
        },
        {
          name: "다이몬/大門",
          lat: 35.6557,
          lng: 139.7517,
          transfer: true
        },
        {
          name: "츠키지시조/築地市場",
          lat: 35.6654,
          lng: 139.771,
          transfer: true
        },
        {
          name: "히카리가오카/光が丘",
          lat: 35.7286,
          lng: 139.6284,
          transfer: true
        }
      ]
    },
    {
      id: "99342",
      nameKo: "닛포리-토네리 라이너",
      nameJp: "日暮里・舎人ライナー",
      color: "#666666",
      stations: [
        {
          name: "닛포리/日暮里",
          lat: 35.7276,
          lng: 139.7707,
          transfer: true
        },
        {
          name: "미누마다이신스이코엔/見沼代親水公園",
          lat: 35.7778,
          lng: 139.7903,
          transfer: true
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
          name: "시부야/渋谷",
          lat: 35.658,
          lng: 139.7016,
          transfer: true
        },
        {
          name: "오모테산도/表参道",
          lat: 35.6654,
          lng: 139.7126,
          transfer: true
        },
        {
          name: "아오야마잇초메/青山一丁目",
          lat: 35.6726,
          lng: 139.7242,
          transfer: true
        },
        {
          name: "아카사카미츠케/赤坂見附",
          lat: 35.6792,
          lng: 139.7364,
          transfer: true
        },
        {
          name: "타메이케산노/溜池山王",
          lat: 35.6732,
          lng: 139.7421,
          transfer: true
        },
        {
          name: "토라노몬/虎ノ門",
          lat: 35.6694,
          lng: 139.7498
        },
        {
          name: "긴자/銀座",
          lat: 35.672,
          lng: 139.7645,
          transfer: true
        },
        {
          name: "니혼바시/日本橋",
          lat: 35.683,
          lng: 139.7743,
          transfer: true
        },
        {
          name: "우에노/上野",
          lat: 35.7118,
          lng: 139.777,
          transfer: true
        },
        {
          name: "아사쿠사/浅草",
          lat: 35.7114,
          lng: 139.7967,
          transfer: true
        }
      ]
    },
    {
      id: "28002",
      nameKo: "마루노우치선 본선",
      nameJp: "東京メトロ丸ノ内線",
      color: "#F62E36",
      stations: [
        {
          name: "오기쿠보/荻窪",
          lat: 35.7047,
          lng: 139.6197,
          transfer: true
        },
        {
          name: "미나미아사가야/南阿佐ヶ谷",
          lat: 35.6994,
          lng: 139.6356,
          transfer: true
        },
        {
          name: "신코엔지/新中野",
          lat: 35.6972,
          lng: 139.6458,
          transfer: true
        },
        {
          name: "나카노후지미초/中野富士見町",
          lat: 35.6947,
          lng: 139.6558,
          transfer: true
        },
        {
          name: "나카노사카우에/中野坂上",
          lat: 35.6974,
          lng: 139.6828,
          transfer: true
        },
        {
          name: "신주쿠/新宿",
          lat: 35.6896,
          lng: 139.7006,
          transfer: true
        },
        {
          name: "시부야/渋谷",
          lat: 35.658,
          lng: 139.7016,
          transfer: true
        },
        {
          name: "긴자/銀座",
          lat: 35.672,
          lng: 139.7645,
          transfer: true
        },
        {
          name: "도쿄/東京",
          lat: 35.6812,
          lng: 139.7671,
          transfer: true
        },
        {
          name: "오테마치/大手町",
          lat: 35.6867,
          lng: 139.7662,
          transfer: true
        },
        {
          name: "이케부쿠로/池袋",
          lat: 35.7295,
          lng: 139.7109,
          transfer: true
        }
      ]
    },
    {
      id: "28002",
      nameKo: "마루노우치선 지선",
      nameJp: "東京メトロ丸ノ内線",
      color: "#F62E36",
      stations: [
        {
          name: "나카노사카우에/中野坂上",
          lat: 35.6974,
          lng: 139.6828,
          transfer: true
        },
        {
          name: "호난초/方南町",
          lat: 35.6836,
          lng: 139.6654,
          transfer: true
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
          name: "기타센주/北千住",
          lat: 35.7497,
          lng: 139.8049,
          transfer: true
        },
        {
          name: "미나미센주/南千住",
          lat: 35.7331,
          lng: 139.7992
        },
        {
          name: "긴시초/錦糸町",
          lat: 35.6967,
          lng: 139.8143,
          transfer: true
        },
        {
          name: "쓰키지/築地",
          lat: 35.6678,
          lng: 139.7717
        },
        {
          name: "히비야/日比谷",
          lat: 35.6751,
          lng: 139.7586,
          transfer: true
        },
        {
          name: "긴자/銀座",
          lat: 35.672,
          lng: 139.7645,
          transfer: true
        },
        {
          name: "롯폰기/六本木",
          lat: 35.6633,
          lng: 139.7292,
          transfer: true
        },
        {
          name: "에비스/恵比寿",
          lat: 35.6468,
          lng: 139.71,
          transfer: true
        },
        {
          name: "나카메구로/中目黒",
          lat: 35.6433,
          lng: 139.6978,
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
          name: "나카노/中野",
          lat: 35.7056,
          lng: 139.6657,
          transfer: true
        },
        {
          name: "타카다노바바/高田馬場",
          lat: 35.7128,
          lng: 139.7038,
          transfer: true
        },
        {
          name: "와세다/早稲田",
          lat: 35.7094,
          lng: 139.7203
        },
        {
          name: "이다바시/飯田橋",
          lat: 35.7026,
          lng: 139.7458,
          transfer: true
        },
        {
          name: "쿠단시타/九段下",
          lat: 35.6956,
          lng: 139.7517
        },
        {
          name: "오테마치/大手町",
          lat: 35.6867,
          lng: 139.7662,
          transfer: true
        },
        {
          name: "니혼바시/日本橋",
          lat: 35.683,
          lng: 139.7743,
          transfer: true
        },
        {
          name: "모노리스나카/門前仲町",
          lat: 35.6703,
          lng: 139.7925
        },
        {
          name: "니시후나바시/西船橋",
          lat: 35.7073,
          lng: 139.9585,
          transfer: true
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
          name: "요요기우에하라/代々木上原",
          lat: 35.6695,
          lng: 139.6832,
          transfer: true
        },
        {
          name: "요요기코엔/代々木公園",
          lat: 35.6689,
          lng: 139.6892
        },
        {
          name: "메이지진구마에/明治神宮前",
          lat: 35.6703,
          lng: 139.7026,
          transfer: true
        },
        {
          name: "오모테산도/表参道",
          lat: 35.6654,
          lng: 139.7126,
          transfer: true
        },
        {
          name: "노기자카/乃木坂",
          lat: 35.6667,
          lng: 139.7261
        },
        {
          name: "아카사카/赤坂",
          lat: 35.6743,
          lng: 139.7364,
          transfer: true
        },
        {
          name: "코쿠카이기지도마에/国会議事堂前",
          lat: 35.6781,
          lng: 139.745
        },
        {
          name: "오테마치/大手町",
          lat: 35.6867,
          lng: 139.7662,
          transfer: true
        },
        {
          name: "신오차노미즈/新御茶ノ水",
          lat: 35.6956,
          lng: 139.7656
        },
        {
          name: "기타아야세/北綾瀬",
          lat: 35.7756,
          lng: 139.8328,
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
          name: "와코시/和光市",
          lat: 35.7808,
          lng: 139.6058,
          transfer: true
        },
        {
          name: "치카테츠아카츠카/地下鉄赤塚",
          lat: 35.7694,
          lng: 139.6442
        },
        {
          name: "헤이와다이/平和台",
          lat: 35.7511,
          lng: 139.6531
        },
        {
          name: "히카와다이/氷川台",
          lat: 35.7497,
          lng: 139.6653
        },
        {
          name: "코타케무카이하라/小竹向原",
          lat: 35.7481,
          lng: 139.6792
        },
        {
          name: "센카와/千川",
          lat: 35.7381,
          lng: 139.6881
        },
        {
          name: "이케부쿠로/池袋",
          lat: 35.7295,
          lng: 139.7109,
          transfer: true
        },
        {
          name: "고탄다/五反田",
          lat: 35.6257,
          lng: 139.7238,
          transfer: true
        },
        {
          name: "신바시/新橋",
          lat: 35.6664,
          lng: 139.7583,
          transfer: true
        },
        {
          name: "긴자/銀座",
          lat: 35.672,
          lng: 139.7645,
          transfer: true
        },
        {
          name: "신키바/新木場",
          lat: 35.6456,
          lng: 139.8267,
          transfer: true
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
          name: "시부야/渋谷",
          lat: 35.658,
          lng: 139.7016,
          transfer: true
        },
        {
          name: "오모테산도/表参道",
          lat: 35.6654,
          lng: 139.7126,
          transfer: true
        },
        {
          name: "아오야마잇초메/青山一丁目",
          lat: 35.6726,
          lng: 139.7242,
          transfer: true
        },
        {
          name: "나가타초/永田町",
          lat: 35.6792,
          lng: 139.7404,
          transfer: true
        },
        {
          name: "한조몬/半蔵門",
          lat: 35.687,
          lng: 139.7507
        },
        {
          name: "오테마치/大手町",
          lat: 35.6867,
          lng: 139.7662,
          transfer: true
        },
        {
          name: "미츠코시마에/三越前",
          lat: 35.6879,
          lng: 139.774
        },
        {
          name: "스이텐구마에/水天宮前",
          lat: 35.6825,
          lng: 139.7853
        },
        {
          name: "오시아게/押上",
          lat: 35.7104,
          lng: 139.8133,
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
          name: "메구로/目黒",
          lat: 35.6338,
          lng: 139.7157,
          transfer: true
        },
        {
          name: "시로카네다카나와/白金高輪",
          lat: 35.6387,
          lng: 139.7334,
          transfer: true
        },
        {
          name: "시로카네타카나와/白金台",
          lat: 35.6378,
          lng: 139.7281
        },
        {
          name: "아자부주반/麻布十番",
          lat: 35.6549,
          lng: 139.7368,
          transfer: true
        },
        {
          name: "롯폰기잇초메/六本木一丁目",
          lat: 35.6657,
          lng: 139.7391
        },
        {
          name: "타메이케산노/溜池山王",
          lat: 35.6732,
          lng: 139.7421,
          transfer: true
        },
        {
          name: "나가타초/永田町",
          lat: 35.6792,
          lng: 139.7404,
          transfer: true
        },
        {
          name: "요쓰야/四ツ谷",
          lat: 35.6868,
          lng: 139.7299,
          transfer: true
        },
        {
          name: "이치가야/市ヶ谷",
          lat: 35.6916,
          lng: 139.7429,
          transfer: true
        },
        {
          name: "이다바시/飯田橋",
          lat: 35.7026,
          lng: 139.7458,
          transfer: true
        },
        {
          name: "고라쿠엔/後楽園",
          lat: 35.7078,
          lng: 139.7517
        },
        {
          name: "도다이마에/東大前",
          lat: 35.7175,
          lng: 139.7581
        },
        {
          name: "혼고산초메/本郷三丁目",
          lat: 35.7078,
          lng: 139.7603
        },
        {
          name: "아카바네이와부치/赤羽岩淵",
          lat: 35.7508,
          lng: 139.7211,
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
          name: "와코시/和光市",
          lat: 35.7808,
          lng: 139.6058,
          transfer: true
        },
        {
          name: "이케부쿠로/池袋",
          lat: 35.7295,
          lng: 139.7109,
          transfer: true
        },
        {
          name: "조시가야/雑司が谷",
          lat: 35.7208,
          lng: 139.7147
        },
        {
          name: "니시와세다/西早稲田",
          lat: 35.7086,
          lng: 139.7092
        },
        {
          name: "히가시신주쿠/東新宿",
          lat: 35.6978,
          lng: 139.7075
        },
        {
          name: "신주쿠산초메/新宿三丁目",
          lat: 35.6895,
          lng: 139.7063,
          transfer: true
        },
        {
          name: "기타산도/北参道",
          lat: 35.6756,
          lng: 139.7031
        },
        {
          name: "메이지진구마에/明治神宮前",
          lat: 35.6703,
          lng: 139.7026,
          transfer: true
        },
        {
          name: "시부야/渋谷",
          lat: 35.658,
          lng: 139.7016,
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
          name: "도쿄/東京",
          lat: 35.6812,
          lng: 139.7671,
          transfer: true
        },
        {
          name: "칸다/神田",
          lat: 35.6916,
          lng: 139.7708
        },
        {
          name: "아키하바라/秋葉原",
          lat: 35.6984,
          lng: 139.7731,
          transfer: true
        },
        {
          name: "우에노/上野",
          lat: 35.7118,
          lng: 139.777,
          transfer: true
        },
        {
          name: "닛포리/日暮里",
          lat: 35.7276,
          lng: 139.7707,
          transfer: true
        },
        {
          name: "타바타/田端",
          lat: 35.7376,
          lng: 139.7609
        },
        {
          name: "이케부쿠로/池袋",
          lat: 35.7295,
          lng: 139.7109,
          transfer: true
        },
        {
          name: "신주쿠/新宿",
          lat: 35.6896,
          lng: 139.7006,
          transfer: true
        },
        {
          name: "시부야/渋谷",
          lat: 35.658,
          lng: 139.7016,
          transfer: true
        },
        {
          name: "에비스/恵比寿",
          lat: 35.6468,
          lng: 139.71,
          transfer: true
        },
        {
          name: "메구로/目黒",
          lat: 35.6338,
          lng: 139.7157,
          transfer: true
        },
        {
          name: "고탄다/五反田",
          lat: 35.6257,
          lng: 139.7238,
          transfer: true
        },
        {
          name: "시나가와/品川",
          lat: 35.6284,
          lng: 139.7387,
          transfer: true
        },
        {
          name: "하마마츠초/浜松町",
          lat: 35.6555,
          lng: 139.7576,
          transfer: true
        },
        {
          name: "신바시/新橋",
          lat: 35.6664,
          lng: 139.7583,
          transfer: true
        },
        {
          name: "유라쿠초/有楽町",
          lat: 35.6751,
          lng: 139.7634,
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
          name: "도쿄/東京",
          lat: 35.6812,
          lng: 139.7671,
          transfer: true
        },
        {
          name: "칸다/神田",
          lat: 35.6916,
          lng: 139.7708
        },
        {
          name: "오차노미즈/御茶ノ水",
          lat: 35.6995,
          lng: 139.7656,
          transfer: true
        },
        {
          name: "요쓰야/四ツ谷",
          lat: 35.6868,
          lng: 139.7299,
          transfer: true
        },
        {
          name: "신주쿠/新宿",
          lat: 35.6896,
          lng: 139.7006,
          transfer: true
        },
        {
          name: "나카노/中野",
          lat: 35.7056,
          lng: 139.6657,
          transfer: true
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
          name: "지바/千葉",
          lat: 35.6115,
          lng: 140.1121
        },
        {
          name: "긴시초/錦糸町",
          lat: 35.6967,
          lng: 139.8143,
          transfer: true
        },
        {
          name: "아키하바라/秋葉原",
          lat: 35.6984,
          lng: 139.7731,
          transfer: true
        },
        {
          name: "신주쿠/新宿",
          lat: 35.6896,
          lng: 139.7006,
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
          name: "치바/千葉",
          lat: 35.6115,
          lng: 140.1121,
          transfer: true
        },
        {
          name: "긴시초/錦糸町",
          lat: 35.6967,
          lng: 139.8143,
          transfer: true
        },
        {
          name: "아키하바라/秋葉原",
          lat: 35.6984,
          lng: 139.7731,
          transfer: true
        },
        {
          name: "오차노미즈/御茶ノ水",
          lat: 35.6995,
          lng: 139.7656,
          transfer: true
        },
        {
          name: "요쓰야/四ツ谷",
          lat: 35.6868,
          lng: 139.7299,
          transfer: true
        },
        {
          name: "신주쿠/新宿",
          lat: 35.6896,
          lng: 139.7006,
          transfer: true
        },
        {
          name: "나카노/中野",
          lat: 35.7056,
          lng: 139.6657,
          transfer: true
        },
        {
          name: "미타카/三鷹",
          lat: 35.6836,
          lng: 139.5596,
          transfer: true
        }
      ]
    },
    {
      id: "11314",
      nameKo: "소부선 쾌속",
      nameJp: "JR総武本線",
      color: "#FFD400",
      stations: [
        {
          name: "도쿄/東京",
          lat: 35.6812,
          lng: 139.7671,
          transfer: true
        },
        {
          name: "긴시초/錦糸町",
          lat: 35.6967,
          lng: 139.8143,
          transfer: true
        },
        {
          name: "치바/千葉",
          lat: 35.6115,
          lng: 140.1121,
          transfer: true
        }
      ]
    },
    {
      id: "11320",
      nameKo: "조반선 각역정차",
      nameJp: "JR常磐線(上野～取手)",
      color: "#666666",
      stations: [
        {
          name: "우에노/上野",
          lat: 35.7118,
          lng: 139.777,
          transfer: true
        },
        {
          name: "닛포리/日暮里",
          lat: 35.7276,
          lng: 139.7707,
          transfer: true
        },
        {
          name: "미카와시마/三河島",
          lat: 35.7331,
          lng: 139.7731,
          transfer: true
        },
        {
          name: "미나미센주/南千住",
          lat: 35.7331,
          lng: 139.7992,
          transfer: true
        },
        {
          name: "도리데/取手",
          lat: 35.9094,
          lng: 140.0628,
          transfer: true
        }
      ]
    },
    {
      id: "11320",
      nameKo: "조반선 쾌속",
      nameJp: "JR常磐線(上野～取手)",
      color: "#666666",
      stations: [
        {
          name: "우에노/上野",
          lat: 35.7118,
          lng: 139.777,
          transfer: true
        },
        {
          name: "닛포리/日暮里",
          lat: 35.7276,
          lng: 139.7707,
          transfer: true
        },
        {
          name: "아비코/我孫子",
          lat: 35.8583,
          lng: 140.0131,
          transfer: true
        }
      ]
    },
    {
      id: "11332",
      nameKo: "게이힌토호쿠선",
      nameJp: "JR京浜東北線",
      color: "#666666",
      stations: [
        {
          name: "오미야/大宮",
          lat: 35.9064,
          lng: 139.6231,
          transfer: true
        },
        {
          name: "우라와/浦和",
          lat: 35.8581,
          lng: 139.6567,
          transfer: true
        },
        {
          name: "아카바네/赤羽",
          lat: 35.7778,
          lng: 139.7211,
          transfer: true
        },
        {
          name: "이케부쿠로/池袋",
          lat: 35.7295,
          lng: 139.7109,
          transfer: true
        },
        {
          name: "신주쿠/新宿",
          lat: 35.6896,
          lng: 139.7006,
          transfer: true
        },
        {
          name: "시부야/渋谷",
          lat: 35.658,
          lng: 139.7016,
          transfer: true
        },
        {
          name: "시나가와/品川",
          lat: 35.6284,
          lng: 139.7387,
          transfer: true
        },
        {
          name: "요코하마/横浜",
          lat: 35.4658,
          lng: 139.6222,
          transfer: true
        },
        {
          name: "오후나/大船",
          lat: 35.3533,
          lng: 139.5311,
          transfer: true
        }
      ]
    },
    {
      id: "11308",
      nameKo: "요코스카선",
      nameJp: "JR横須賀線",
      color: "#666666",
      stations: [
        {
          name: "도쿄/東京",
          lat: 35.6812,
          lng: 139.7671,
          transfer: true
        },
        {
          name: "신바시/新橋",
          lat: 35.6664,
          lng: 139.7583,
          transfer: true
        },
        {
          name: "요코하마/横浜",
          lat: 35.4658,
          lng: 139.6222,
          transfer: true
        },
        {
          name: "오후나/大船",
          lat: 35.3533,
          lng: 139.5311,
          transfer: true
        },
        {
          name: "구리하마/久里浜",
          lat: 35.2333,
          lng: 139.7,
          transfer: true
        }
      ]
    },
    {
      id: "11321",
      nameKo: "사이쿄선",
      nameJp: "JR埼京線",
      color: "#666666",
      stations: [
        {
          name: "오사키/大崎",
          lat: 35.6197,
          lng: 139.7286,
          transfer: true
        },
        {
          name: "에비스/恵比寿",
          lat: 35.6468,
          lng: 139.71,
          transfer: true
        },
        {
          name: "시부야/渋谷",
          lat: 35.658,
          lng: 139.7016,
          transfer: true
        },
        {
          name: "신주쿠/新宿",
          lat: 35.6896,
          lng: 139.7006,
          transfer: true
        },
        {
          name: "이케부쿠로/池袋",
          lat: 35.7295,
          lng: 139.7109,
          transfer: true
        },
        {
          name: "오미야/大宮",
          lat: 35.9064,
          lng: 139.6231,
          transfer: true
        }
      ]
    },
    {
      id: "11333",
      nameKo: "쇼난신주쿠라인",
      nameJp: "JR湘南新宿ライン",
      color: "#666666",
      stations: [
        {
          name: "오사키/大崎",
          lat: 35.6197,
          lng: 139.7286,
          transfer: true
        }
      ]
    },
    {
      id: "11305",
      nameKo: "무사시노선",
      nameJp: "JR武蔵野線",
      color: "#666666",
      stations: [
        {
          name: "후추혼마치/府中本町",
          lat: 35.6681,
          lng: 139.4772,
          transfer: true
        },
        {
          name: "키요세/清瀬",
          lat: 35.7847,
          lng: 139.5267,
          transfer: true
        },
        {
          name: "신마츠도/新松戸",
          lat: 35.8253,
          lng: 139.9208,
          transfer: true
        },
        {
          name: "니시후나바시/西船橋",
          lat: 35.7073,
          lng: 139.9585,
          transfer: true
        }
      ]
    },
    {
      id: "11303",
      nameKo: "난부선",
      nameJp: "JR南武線",
      color: "#666666",
      stations: [
        {
          name: "다치카와/立川",
          lat: 35.6939,
          lng: 139.4136,
          transfer: true
        },
        {
          name: "후추/府中",
          lat: 35.6681,
          lng: 139.4772,
          transfer: true
        },
        {
          name: "무사시코가네이/武蔵小金井",
          lat: 35.7011,
          lng: 139.5067,
          transfer: true
        },
        {
          name: "무사시나카하라/武蔵中原",
          lat: 35.5758,
          lng: 139.6403,
          transfer: true
        },
        {
          name: "가와사키/川崎",
          lat: 35.5306,
          lng: 139.7,
          transfer: true
        }
      ]
    },
    {
      id: "11306",
      nameKo: "요코하마선",
      nameJp: "JR横浜線",
      color: "#666666",
      stations: [
        {
          name: "히가시카나가와/東神奈川",
          lat: 35.4778,
          lng: 139.6281,
          transfer: true
        },
        {
          name: "요코하마/横浜",
          lat: 35.4658,
          lng: 139.6222,
          transfer: true
        },
        {
          name: "호도가야/保土ヶ谷",
          lat: 35.4467,
          lng: 139.5997,
          transfer: true
        },
        {
          name: "카미오오카/上大岡",
          lat: 35.4092,
          lng: 139.5967,
          transfer: true
        },
        {
          name: "하치오지/八王子",
          lat: 35.6558,
          lng: 139.3289,
          transfer: true
        }
      ]
    },
    {
      id: "11326",
      nameKo: "게이요선",
      nameJp: "JR京葉線",
      color: "#666666",
      stations: [
        {
          name: "도쿄/東京",
          lat: 35.6812,
          lng: 139.7671,
          transfer: true
        }
      ]
    },
    {
      id: "11317",
      nameKo: "하치코선 남부",
      nameJp: "JR八高線(八王子～高麗川)",
      color: "#666666",
      stations: [
        {
          name: "하치오지/八王子",
          lat: 35.6558,
          lng: 139.3289,
          transfer: true
        },
        {
          name: "고마가와/高麗川",
          lat: 35.8961,
          lng: 139.3181,
          transfer: true
        }
      ]
    },
    {
      id: "11315",
      nameKo: "오메선",
      nameJp: "JR青梅線",
      color: "#666666",
      stations: [
        {
          name: "다치카와/立川",
          lat: 35.6939,
          lng: 139.4136,
          transfer: true
        },
        {
          name: "하이지마/拝島",
          lat: 35.7211,
          lng: 139.3431,
          transfer: true
        },
        {
          name: "오쿠타마/奥多摩",
          lat: 35.8092,
          lng: 139.0961,
          transfer: true
        }
      ]
    },
    {
      id: "11316",
      nameKo: "이쓰카이치선",
      nameJp: "JR五日市線",
      color: "#666666",
      stations: [
        {
          name: "하이지마/拝島",
          lat: 35.7211,
          lng: 139.3431,
          transfer: true
        },
        {
          name: "무사시이쓰카이치/武蔵五日市",
          lat: 35.7306,
          lng: 139.2281,
          transfer: true
        }
      ]
    },
    {
      id: "11322",
      nameKo: "가와고에선",
      nameJp: "JR川越線",
      color: "#666666",
      stations: [
        {
          name: "오미야/大宮",
          lat: 35.9064,
          lng: 139.6231,
          transfer: true
        },
        {
          name: "가와고에/川越",
          lat: 35.9253,
          lng: 139.4858,
          transfer: true
        }
      ]
    },
    {
      id: "11301",
      nameKo: "도카이도선 간토",
      nameJp: "JR東海道本線(東京～熱海)",
      color: "#666666",
      stations: [
        {
          name: "도쿄/東京",
          lat: 35.6812,
          lng: 139.7671,
          transfer: true
        },
        {
          name: "시나가와/品川",
          lat: 35.6284,
          lng: 139.7387,
          transfer: true
        },
        {
          name: "요코하마/横浜",
          lat: 35.4658,
          lng: 139.6222,
          transfer: true
        },
        {
          name: "오다와라/小田原",
          lat: 35.2561,
          lng: 139.1553,
          transfer: true
        },
        {
          name: "아타미/熱海",
          lat: 35.1031,
          lng: 139.0725,
          transfer: true
        }
      ]
    },
    {
      id: "11307",
      nameKo: "네기시선",
      nameJp: "JR根岸線",
      color: "#666666",
      stations: [
        {
          name: "요코하마/横浜",
          lat: 35.4658,
          lng: 139.6222,
          transfer: true
        },
        {
          name: "이소고/磯子",
          lat: 35.4203,
          lng: 139.6175,
          transfer: true
        },
        {
          name: "오후나/大船",
          lat: 35.3533,
          lng: 139.5311,
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
          name: "이케부쿠로/池袋",
          lat: 35.7295,
          lng: 139.7109,
          transfer: true
        },
        {
          name: "네리마/練馬",
          lat: 35.7395,
          lng: 139.6532,
          transfer: true
        },
        {
          name: "샤쿠지코엔/石神井公園",
          lat: 35.7407,
          lng: 139.6014
        },
        {
          name: "히바리가오카/ひばりヶ丘",
          lat: 35.7606,
          lng: 139.539
        }
      ]
    },
    {
      id: "22001",
      nameKo: "이케부쿠로선",
      nameJp: "西武池袋線",
      color: "#666666",
      stations: [
        {
          name: "이케부쿠로/池袋",
          lat: 35.7295,
          lng: 139.7109,
          transfer: true
        },
        {
          name: "네리마/練馬",
          lat: 35.7395,
          lng: 139.6532,
          transfer: true
        },
        {
          name: "한노/飯能",
          lat: 35.8519,
          lng: 139.3181,
          transfer: true
        }
      ]
    },
    {
      id: "22002",
      nameKo: "세이부치치부선",
      nameJp: "西武秩父線",
      color: "#666666",
      stations: [
        {
          name: "아가노/吾野",
          lat: 35.8961,
          lng: 139.3181,
          transfer: true
        },
        {
          name: "세이부치치부/西武秩父",
          lat: 35.9903,
          lng: 139.0847,
          transfer: true
        }
      ]
    },
    {
      id: "22008",
      nameKo: "하이지마선",
      nameJp: "西武拝島線",
      color: "#666666",
      stations: [
        {
          name: "고다이라/小平",
          lat: 35.7281,
          lng: 139.4772,
          transfer: true
        },
        {
          name: "하이지마/拝島",
          lat: 35.7211,
          lng: 139.3431,
          transfer: true
        }
      ]
    },
    {
      id: "22012",
      nameKo: "다마가와선",
      nameJp: "西武多摩川線",
      color: "#666666",
      stations: [
        {
          name: "무사시사카이/武蔵境",
          lat: 35.7031,
          lng: 139.5431,
          transfer: true
        },
        {
          name: "고레마사/是政",
          lat: 35.6681,
          lng: 139.4772,
          transfer: true
        }
      ]
    },
    {
      id: "22011",
      nameKo: "다마코선",
      nameJp: "西武多摩湖線",
      color: "#666666",
      stations: [
        {
          name: "고쿠분지/国分寺",
          lat: 35.7031,
          lng: 139.4797,
          transfer: true
        },
        {
          name: "세이부유엔치/西武遊園地",
          lat: 35.7681,
          lng: 139.4103,
          transfer: true
        }
      ]
    },
    {
      id: "22009",
      nameKo: "세이부엔선",
      nameJp: "西武西武園線",
      color: "#666666",
      stations: [
        {
          name: "히가시무라야마/東村山",
          lat: 35.7558,
          lng: 139.4653,
          transfer: true
        },
        {
          name: "세이부유엔치/西武遊園地",
          lat: 35.7681,
          lng: 139.4103,
          transfer: true
        }
      ]
    },
    {
      id: "22004",
      nameKo: "도시마엔선",
      nameJp: "西武豊島線",
      color: "#666666",
      stations: [
        {
          name: "네리마/練馬",
          lat: 35.7395,
          lng: 139.6532,
          transfer: true
        },
        {
          name: "도시마엔/豊島園",
          lat: 35.7281,
          lng: 139.6472,
          transfer: true
        }
      ]
    }
  ],
  "東急電鉄": [
    {
      id: "26001",
      nameKo: "도요코선",
      nameJp: "東急東横線",
      color: "#666666",
      stations: [
        {
          name: "시부야/渋谷",
          lat: 35.658,
          lng: 139.7016,
          transfer: true
        },
        {
          name: "다이칸야마/代官山",
          lat: 35.6481,
          lng: 139.7031,
          transfer: true
        },
        {
          name: "나카메구로/中目黒",
          lat: 35.6433,
          lng: 139.6978,
          transfer: true
        },
        {
          name: "무사시코스기/武蔵小杉",
          lat: 35.5758,
          lng: 139.6603,
          transfer: true
        },
        {
          name: "요코하마/横浜",
          lat: 35.4658,
          lng: 139.6222,
          transfer: true
        }
      ]
    },
    {
      id: "26003",
      nameKo: "덴엔토시선",
      nameJp: "東急田園都市線",
      color: "#666666",
      stations: [
        {
          name: "시부야/渋谷",
          lat: 35.658,
          lng: 139.7016,
          transfer: true
        },
        {
          name: "후타코타마가와/二子玉川",
          lat: 35.6117,
          lng: 139.6267,
          transfer: true
        },
        {
          name: "주오린칸/中央林間",
          lat: 35.5081,
          lng: 139.4447,
          transfer: true
        }
      ]
    },
    {
      id: "26002",
      nameKo: "메구로선",
      nameJp: "東急目黒線",
      color: "#666666",
      stations: [
        {
          name: "메구로/目黒",
          lat: 35.6338,
          lng: 139.7157,
          transfer: true
        },
        {
          name: "무사시코스기/武蔵小杉",
          lat: 35.5758,
          lng: 139.6603,
          transfer: true
        },
        {
          name: "히요시/日吉",
          lat: 35.5481,
          lng: 139.6472,
          transfer: true
        }
      ]
    },
    {
      id: "26004",
      nameKo: "오이마치선",
      nameJp: "東急大井町線",
      color: "#666666",
      stations: [
        {
          name: "오이마치/大井町",
          lat: 35.6061,
          lng: 139.7347,
          transfer: true
        },
        {
          name: "미조노구치/溝の口",
          lat: 35.5981,
          lng: 139.6103,
          transfer: true
        }
      ]
    },
    {
      id: "26005",
      nameKo: "이케가미선",
      nameJp: "東急池上線",
      color: "#666666",
      stations: [
        {
          name: "고탄다/五反田",
          lat: 35.6257,
          lng: 139.7238,
          transfer: true
        },
        {
          name: "가마타/蒲田",
          lat: 35.5625,
          lng: 139.7161,
          transfer: true
        }
      ]
    },
    {
      id: "26006",
      nameKo: "다마가와선",
      nameJp: "東急多摩川線",
      color: "#666666",
      stations: [
        {
          name: "무사시사카이/武蔵境",
          lat: 35.7031,
          lng: 139.5431,
          transfer: true
        },
        {
          name: "고레마사/是政",
          lat: 35.6681,
          lng: 139.4772,
          transfer: true
        }
      ]
    },
    {
      id: "26007",
      nameKo: "세타가야선",
      nameJp: "東急世田谷線",
      color: "#666666",
      stations: [
        {
          name: "산겐자야/三軒茶屋",
          lat: 35.6431,
          lng: 139.6681,
          transfer: true
        },
        {
          name: "시모타카이도/下高井戸",
          lat: 35.6661,
          lng: 139.6417,
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
      color: "#666666",
      stations: [
        {
          name: "신주쿠/新宿",
          lat: 35.6896,
          lng: 139.7006,
          transfer: true
        },
        {
          name: "사사즈카/笹塚",
          lat: 35.6731,
          lng: 139.6681,
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
          name: "신주쿠/新宿",
          lat: 35.6896,
          lng: 139.7006,
          transfer: true
        },
        {
          name: "시모키타자와/下北沢",
          lat: 35.6613,
          lng: 139.6681,
          transfer: true
        },
        {
          name: "조후/調布",
          lat: 35.6516,
          lng: 139.5407,
          transfer: true
        },
        {
          name: "게이오하치오지/京王八王子",
          lat: 35.6578,
          lng: 139.3431,
          transfer: true
        }
      ]
    },
    {
      id: "24002",
      nameKo: "사가미하라선",
      nameJp: "京王相模原線",
      color: "#666666",
      stations: [
        {
          name: "조후/調布",
          lat: 35.6516,
          lng: 139.5407,
          transfer: true
        },
        {
          name: "하시모토/橋本",
          lat: 35.5958,
          lng: 139.3431,
          transfer: true
        }
      ]
    },
    {
      id: "24003",
      nameKo: "다카오선",
      nameJp: "京王高尾線",
      color: "#666666",
      stations: [
        {
          name: "키타노/北野",
          lat: 35.6431,
          lng: 139.3758,
          transfer: true
        },
        {
          name: "다카오산구치/高尾山口",
          lat: 35.6325,
          lng: 139.2811,
          transfer: true
        }
      ]
    },
    {
      id: "24005",
      nameKo: "도부쓰엔선",
      nameJp: "京王動物園線",
      color: "#666666",
      stations: [
        {
          name: "다카하타후도/高幡不動",
          lat: 35.6611,
          lng: 139.4103,
          transfer: true
        },
        {
          name: "다마도부쓰코엔/多摩動物公園",
          lat: 35.6481,
          lng: 139.4047,
          transfer: true
        }
      ]
    },
    {
      id: "24004",
      nameKo: "게이바조선",
      nameJp: "京王競馬場線",
      color: "#666666",
      stations: [
        {
          name: "히가시후추/東府中",
          lat: 35.6681,
          lng: 139.4772,
          transfer: true
        },
        {
          name: "후추케이바조마에/府中競馬正門前",
          lat: 35.6681,
          lng: 139.4772,
          transfer: true
        }
      ]
    },
    {
      id: "24006",
      nameKo: "이노카시라선",
      nameJp: "京王井の頭線",
      color: "#666666",
      stations: [
        {
          name: "시부야/渋谷",
          lat: 35.658,
          lng: 139.7016,
          transfer: true
        },
        {
          name: "시모키타자와/下北沢",
          lat: 35.6613,
          lng: 139.6681,
          transfer: true
        },
        {
          name: "기치조지/吉祥寺",
          lat: 35.7031,
          lng: 139.5797,
          transfer: true
        }
      ]
    }
  ],
  "小田急電鉄": [
    {
      id: "25001",
      nameKo: "오다와라선",
      nameJp: "小田急線",
      color: "#666666",
      stations: [
        {
          name: "신주쿠/新宿",
          lat: 35.6896,
          lng: 139.7006,
          transfer: true
        },
        {
          name: "시모키타자와/下北沢",
          lat: 35.6613,
          lng: 139.6681,
          transfer: true
        },
        {
          name: "신유리가오카/新百合ヶ丘",
          lat: 35.5999,
          lng: 139.5092,
          transfer: true
        },
        {
          name: "오다와라/小田原",
          lat: 35.2561,
          lng: 139.1553,
          transfer: true
        }
      ]
    },
    {
      id: "25002",
      nameKo: "에노시마선",
      nameJp: "小田急江ノ島線",
      color: "#666666",
      stations: [
        {
          name: "오후나/大船",
          lat: 35.3533,
          lng: 139.5311,
          transfer: true
        },
        {
          name: "쇼난에노시마/湘南江の島",
          lat: 35.3097,
          lng: 139.4831,
          transfer: true
        }
      ]
    },
    {
      id: "25003",
      nameKo: "다마선",
      nameJp: "小田急多摩線",
      color: "#666666",
      stations: [
        {
          name: "신유리가오카/新百合ヶ丘",
          lat: 35.5999,
          lng: 139.5092,
          transfer: true
        },
        {
          name: "가라키다/唐木田",
          lat: 35.6181,
          lng: 139.4103,
          transfer: true
        }
      ]
    }
  ],
  "東武鉄道": [
    {
      id: "21002",
      nameKo: "이세사키선/스카이트리라인",
      nameJp: "東武伊勢崎線",
      color: "#666666",
      stations: [
        {
          name: "아사쿠사/浅草",
          lat: 35.7114,
          lng: 139.7967,
          transfer: true
        },
        {
          name: "키타센주/北千住",
          lat: 35.7497,
          lng: 139.8049,
          transfer: true
        },
        {
          name: "도치기/栃木",
          lat: 36.5681,
          lng: 139.7306,
          transfer: true
        }
      ]
    },
    {
      id: "21004",
      nameKo: "도부어반파크라인/노다선",
      nameJp: "東武アーバンパークライン（東武野田線）",
      color: "#666666",
      stations: [
        {
          name: "오미야/大宮",
          lat: 35.9064,
          lng: 139.6231,
          transfer: true
        },
        {
          name: "후나바시/船橋",
          lat: 35.6947,
          lng: 139.9825,
          transfer: true
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
          name: "이케부쿠로/池袋",
          lat: 35.7295,
          lng: 139.7109,
          transfer: true
        },
        {
          name: "와코시/和光市",
          lat: 35.7808,
          lng: 139.6058,
          transfer: true
        },
        {
          name: "요리이/寄居",
          lat: 36.1181,
          lng: 139.1947,
          transfer: true
        }
      ]
    },
    {
      id: "21005",
      nameKo: "가메이도선",
      nameJp: "東武亀戸線",
      color: "#666666",
      stations: [
        {
          name: "가메이도/亀戸",
          lat: 35.6972,
          lng: 139.8261,
          transfer: true
        },
        {
          name: "가메이도스이진/亀戸水神",
          lat: 35.6972,
          lng: 139.8261,
          transfer: true
        }
      ]
    },
    {
      id: "21006",
      nameKo: "다이시선",
      nameJp: "東武大師線",
      color: "#666666",
      stations: [
        {
          name: "니시아라이/西新井",
          lat: 35.7778,
          lng: 139.7903,
          transfer: true
        },
        {
          name: "다이시마에/大師前",
          lat: 35.7778,
          lng: 139.7903,
          transfer: true
        }
      ]
    }
  ],
  "京急電鉄": [
    {
      id: "27001",
      nameKo: "본선",
      nameJp: "京急本線",
      color: "#666666",
      stations: [
        {
          name: "시나가와/品川",
          lat: 35.6284,
          lng: 139.7387,
          transfer: true
        },
        {
          name: "우라가/浦賀",
          lat: 35.25,
          lng: 139.7167,
          transfer: true
        }
      ]
    },
    {
      id: "27002",
      nameKo: "공항선",
      nameJp: "京急空港線",
      color: "#666666",
      stations: [
        {
          name: "케이큐가마타/京急蒲田",
          lat: 35.5625,
          lng: 139.7161,
          transfer: true
        },
        {
          name: "하네다공항 T1-T2/羽田空港",
          lat: 35.5494,
          lng: 139.7792,
          transfer: true
        }
      ]
    },
    {
      id: "27003",
      nameKo: "다이시선",
      nameJp: "京急大師線",
      color: "#666666",
      stations: [
        {
          name: "케이큐가와사키/京急川崎",
          lat: 35.5306,
          lng: 139.7,
          transfer: true
        },
        {
          name: "고지마신덴/小島新田",
          lat: 35.5306,
          lng: 139.7,
          transfer: true
        }
      ]
    },
    {
      id: "27004",
      nameKo: "즈시선",
      nameJp: "京急逗子線",
      color: "#666666",
      stations: [
        {
          name: "가나자와핫케이/金沢八景",
          lat: 35.3331,
          lng: 139.6222,
          transfer: true
        },
        {
          name: "즈시/逗子",
          lat: 35.2969,
          lng: 139.5781,
          transfer: true
        },
        {
          name: "하야마/葉山",
          lat: 35.2708,
          lng: 139.5831,
          transfer: true
        }
      ]
    },
    {
      id: "27005",
      nameKo: "구리하마선",
      nameJp: "京急久里浜線",
      color: "#666666",
      stations: [
        {
          name: "호리노우치/堀ノ内",
          lat: 35.25,
          lng: 139.7167,
          transfer: true
        },
        {
          name: "미사키구치/三崎口",
          lat: 35.1831,
          lng: 139.6331,
          transfer: true
        }
      ]
    }
  ],
  "京成電鉄": [
    {
      id: "23001",
      nameKo: "본선",
      nameJp: "京成本線",
      color: "#666666",
      stations: [
        {
          name: "케이세이우에노/京成上野",
          lat: 35.7118,
          lng: 139.777,
          transfer: true
        },
        {
          name: "나리타공항 T1/成田空港",
          lat: 35.7722,
          lng: 140.3861,
          transfer: true
        }
      ]
    },
    {
      id: "23002",
      nameKo: "오시아게선",
      nameJp: "京成押上線",
      color: "#666666",
      stations: [
        {
          name: "오시아게/押上",
          lat: 35.7104,
          lng: 139.8133,
          transfer: true
        },
        {
          name: "아오토/青砥",
          lat: 35.7458,
          lng: 139.8431,
          transfer: true
        }
      ]
    },
    {
      id: "23005",
      nameKo: "히가시나리타선",
      nameJp: "京成千原線",
      color: "#666666",
      stations: [
        {
          name: "케이세이나리타/京成成田",
          lat: 35.7722,
          lng: 140.3861,
          transfer: true
        },
        {
          name: "히가시나리타/東成田",
          lat: 35.7722,
          lng: 140.3861,
          transfer: true
        }
      ]
    },
    {
      id: "23006",
      nameKo: "나리타스카이액세스선",
      nameJp: "成田スカイアクセス",
      color: "#666666",
      stations: [
        {
          name: "아오토/青砥",
          lat: 35.7458,
          lng: 139.8431,
          transfer: true
        },
        {
          name: "나리타공항 T2-T3/成田空港",
          lat: 35.7722,
          lng: 140.3861,
          transfer: true
        }
      ]
    }
  ]
};
