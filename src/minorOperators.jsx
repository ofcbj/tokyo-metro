// 3개 미만의 노선을 가진 소규모 운영회사 데이터
export const minorOperators = {
  "相模鉄道": [
    {
      id: "29001",
      nameKo: "본선",
      nameJp: "相鉄本線",
      color: "#666666",
      stations: [
        {
          name: "요코하마/横浜",
          lat: 35.4658,
          lng: 139.6222,
          transfer: true
        },
        {
          name: "에비나/海老名",
          lat: 35.4481,
          lng: 139.3917,
          transfer: true
        }
      ]
    },
    {
      id: "29002",
      nameKo: "이즈미노선",
      nameJp: "相鉄いずみ野線",
      color: "#666666",
      stations: [
        {
          name: "후타마타가와/二俣川",
          lat: 35.4658,
          lng: 139.6222,
          transfer: true
        },
        {
          name: "쇼난다이/湘南台",
          lat: 35.3958,
          lng: 139.4667,
          transfer: true
        }
      ]
    }
  ],
  "横浜高速鉄道": [
    {
      id: "99310",
      nameKo: "미나토미라이선",
      nameJp: "みなとみらい線",
      color: "#666666",
      stations: [
        {
          name: "요코하마/横浜",
          lat: 35.4658,
          lng: 139.6222,
          transfer: true
        },
        {
          name: "모토마치추카가이/元町・中華街",
          lat: 35.4431,
          lng: 139.65,
          transfer: true
        }
      ]
    }
  ],
  "横浜市交通局": [
    {
      id: "99316",
      nameKo: "블루라인",
      nameJp: "ブルーライン",
      color: "#666666",
      stations: [
        {
          name: "쇼난다이/湘南台",
          lat: 35.3958,
          lng: 139.4667,
          transfer: true
        },
        {
          name: "아자미노/あざみ野",
          lat: 35.5678,
          lng: 139.5531,
          transfer: true
        }
      ]
    },
    {
      id: "99343",
      nameKo: "그린라인",
      nameJp: "グリーンライン",
      color: "#666666",
      stations: [
        {
          name: "나카야마/中山",
          lat: 35.4658,
          lng: 139.6222,
          transfer: true
        },
        {
          name: "히요시/日吉",
          lat: 35.5481,
          lng: 139.6472,
          transfer: true
        }
      ]
    }
  ],
  "東京臨海高速鉄道": [
    {
      id: "99337",
      nameKo: "린카이선",
      nameJp: "りんかい線",
      color: "#666666",
      stations: [
        {
          name: "오사키/大崎",
          lat: 35.6197,
          lng: 139.7286,
          transfer: true
        },
        {
          name: "신키바/新木場",
          lat: 35.6456,
          lng: 139.8267,
          transfer: true
        }
      ]
    }
  ],
  "首都圏新都市鉄道": [
    {
      id: "99309",
      nameKo: "츠쿠바 익스프레스",
      nameJp: "つくばエクスプレス",
      color: "#666666",
      stations: [
        {
          name: "아키하바라/秋葉原",
          lat: 35.6984,
          lng: 139.7731,
          transfer: true
        },
        {
          name: "키타센주/北千住",
          lat: 35.7497,
          lng: 139.8049,
          transfer: true
        },
        {
          name: "츠쿠바/つくば",
          lat: 36.0831,
          lng: 140.1111,
          transfer: true
        }
      ]
    }
  ],
  "東京モノレール": [
    {
      id: "99336",
      nameKo: "하네다공항선",
      nameJp: "東京モノレール",
      color: "#666666",
      stations: [
        {
          name: "하마마쓰초/浜松町",
          lat: 35.6555,
          lng: 139.7576,
          transfer: true
        },
        {
          name: "하네다공항 T2/羽田空港",
          lat: 35.5494,
          lng: 139.7792,
          transfer: true
        }
      ]
    }
  ],
  "多摩都市モノレール": [
    {
      id: "99334",
      nameKo: "다마 모노레일",
      nameJp: "多摩モノレール",
      color: "#666666",
      stations: [
        {
          name: "가미키타다이/上北台",
          lat: 35.7281,
          lng: 139.4103,
          transfer: true
        },
        {
          name: "다마센터/多摩センター",
          lat: 35.6231,
          lng: 139.4247,
          transfer: true
        }
      ]
    }
  ],
  "ゆりかもめ": [
    {
      id: "99311",
      nameKo: "유리카모메선",
      nameJp: "ゆりかもめ",
      color: "#666666",
      stations: [
        {
          name: "신바시/新橋",
          lat: 35.6664,
          lng: 139.7583,
          transfer: true
        },
        {
          name: "아오미/青海",
          lat: 35.6256,
          lng: 139.7803,
          transfer: true
        },
        {
          name: "도요스/豊洲",
          lat: 35.6581,
          lng: 139.7953,
          transfer: true
        }
      ]
    }
  ],
  "埼玉高速鉄道": [
    {
      id: "99307",
      nameKo: "사이타마 고속철도선",
      nameJp: "埼玉高速鉄道線",
      color: "#666666",
      stations: [
        {
          name: "아카바네이와부치/赤羽岩淵",
          lat: 35.7508,
          lng: 139.7211,
          transfer: true
        },
        {
          name: "미소노/美園",
          lat: 35.8519,
          lng: 139.3181,
          transfer: true
        }
      ]
    }
  ],
  "埼玉新都市交通": [
    {
      id: "99321",
      nameKo: "이나선/뉴 셔틀",
      nameJp: "ニューシャトル",
      color: "#666666",
      stations: [
        {
          name: "오미야/大宮",
          lat: 35.9064,
          lng: 139.6231,
          transfer: true
        },
        {
          name: "우치주쿠/内宿",
          lat: 35.9064,
          lng: 139.6231,
          transfer: true
        }
      ]
    }
  ],
  "北総鉄道": [
    {
      id: "99340",
      nameKo: "호쿠소선",
      nameJp: "北総鉄道北総線",
      color: "#666666",
      stations: [
        {
          name: "게이세이다카사고/京成高砂",
          lat: 35.7458,
          lng: 139.8431,
          transfer: true
        },
        {
          name: "인바니혼이다이/印旛日本医大",
          lat: 35.7722,
          lng: 140.1111,
          transfer: true
        }
      ]
    }
  ],
  "東葉高速鉄道": [
    {
      id: "99338",
      nameKo: "도요 고속선",
      nameJp: "東葉高速線",
      color: "#666666",
      stations: [
        {
          name: "니시후나바시/西船橋",
          lat: 35.7073,
          lng: 139.9585,
          transfer: true
        },
        {
          name: "도요카쓰다이/東葉勝田台",
          lat: 35.6947,
          lng: 139.9825,
          transfer: true
        }
      ]
    }
  ]
};
