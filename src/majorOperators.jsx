// 3개 이상의 노선을 가진 주요 운영회사 데이터
export const majorOperators = {
  "도에이": [
    {
      id: "asakusa-line",
      nameKo: "아사쿠사선",
      nameJp: "Asakusa Line",
      color: "#E85298",
      stations: [
        { name: "니시마고메/西馬込", lat: 35.5980, lng: 139.7210 },
        { name: "마고메/馬込", lat: 35.6003, lng: 139.7078 },
        { name: "나카나이/中延", lat: 35.6081, lng: 139.7131 },
        { name: "타치아이가와/立会川", lat: 35.6181, lng: 139.7147 },
        { name: "고탄다/五反田", lat: 35.6257, lng: 139.7238, transfer: true },
        { name: "다카나와/高輪", lat: 35.6331, lng: 139.7331 },
        { name: "다카와바시/高輪橋", lat: 35.6385, lng: 139.7393 },
        { name: "신바시/新橋", lat: 35.6664, lng: 139.7583, transfer: true },
        { name: "히가시긴자/東銀座", lat: 35.6699, lng: 139.7668 },
        { name: "니혼바시/日本橋", lat: 35.6830, lng: 139.7743, transfer: true },
        { name: "닛포리/日暮里", lat: 35.7276, lng: 139.7707, transfer: true },
        { name: "오시아게/押上", lat: 35.7104, lng: 139.8133, transfer: true }
      ]
    },
    {
      id: "mita-line",
      nameKo: "미타선",
      nameJp: "Mita Line",
      color: "#0079C2",
      stations: [
        { name: "메구로/目黒", lat: 35.6338, lng: 139.7157, transfer: true },
        { name: "시로카네다카나와/白金高輪", lat: 35.6387, lng: 139.7334, transfer: true },
        { name: "시로카네타카나와/白金台", lat: 35.6378, lng: 139.7281 },
        { name: "아자부주반/麻布十番", lat: 35.6549, lng: 139.7368, transfer: true },
        { name: "미타/三田", lat: 35.6485, lng: 139.7454, transfer: true },
        { name: "시바코엔/芝公園", lat: 35.6542, lng: 139.7517 },
        { name: "오나리몬/御成門", lat: 35.6617, lng: 139.7517 },
        { name: "우치사이와이초/内幸町", lat: 35.6687, lng: 139.7550 },
        { name: "오테마치/大手町", lat: 35.6867, lng: 139.7662, transfer: true },
        { name: "스에히로초/末広町", lat: 35.7017, lng: 139.7731 },
        { name: "니시타카시마다이라/西高島平", lat: 35.7894, lng: 139.6728, transfer: true }
      ]
    },
    {
      id: "shinjuku-line",
      nameKo: "신주쿠선",
      nameJp: "Shinjuku Line",
      color: "#6CBB5A",
      stations: [
        { name: "신선/新線新宿", lat: 35.6938, lng: 139.7017 },
        { name: "신주쿠산초메/新宿三丁目", lat: 35.6895, lng: 139.7063, transfer: true },
        { name: "아키시마벤텐/秋葉原", lat: 35.6984, lng: 139.7731, transfer: true },
        { name: "이와모토초/岩本町", lat: 35.6935, lng: 139.7772, transfer: true },
        { name: "모리시타/森下", lat: 35.6881, lng: 139.7917 },
        { name: "하마초/浜町", lat: 35.6893, lng: 139.7885 },
        { name: "모토야와타/本八幡", lat: 35.7218, lng: 139.9294, transfer: true }
      ]
    },
    {
      id: "oedo-line-loop",
      nameKo: "오에도선",
      nameJp: "Oedo Line Loop",
      color: "#B6007A",
      stations: [
        { name: "도초마에/都庁前", lat: 35.6896, lng: 139.6918, transfer: true },
        { name: "신주쿠니시구치/新宿西口", lat: 35.6931, lng: 139.6992, transfer: true },
        { name: "신주쿠/新宿", lat: 35.6896, lng: 139.7006, transfer: true },
        { name: "요요기/代々木", lat: 35.6831, lng: 139.7022, transfer: true },
        { name: "시부야/渋谷", lat: 35.658, lng: 139.7016, transfer: true },
        { name: "아자부주반/麻布十番", lat: 35.6549, lng: 139.7368, transfer: true },
        { name: "롯폰기/六本木", lat: 35.6633, lng: 139.7292, transfer: true },
        { name: "아카사카/赤坂", lat: 35.6743, lng: 139.7364, transfer: true },
        { name: "다이몬/大門", lat: 35.6557, lng: 139.7517, transfer: true },
        { name: "츠키지시조/築地市場", lat: 35.6654, lng: 139.7710, transfer: true },
        { name: "히카리가오카/光が丘", lat: 35.7286, lng: 139.6284, transfer: true }
      ]
    },
    {
      id: "nippori-toneri-liner",
      nameKo: "닛포리-토네리 라이너",
      nameJp: "Nippori-Toneri Liner",
      color: "#666666",
      stations: [
        { name: "닛포리/日暮里", lat: 35.7276, lng: 139.7707, transfer: true },
        { name: "미누마다이신스이코엔/見沼代親水公園", lat: 35.7778, lng: 139.7903, transfer: true }
      ]
    }
  ],
  "도쿄메트로": [
    {
      id: "ginza",
      nameKo: "긴자선",
      nameJp: "銀座線",
      color: "#FF9500",
      stations: [
        { name: "시부야/渋谷", lat: 35.6580, lng: 139.7016, transfer: true },
        { name: "오모테산도/表参道", lat: 35.6654, lng: 139.7126, transfer: true },
        { name: "아오야마잇초메/青山一丁目", lat: 35.6726, lng: 139.7242, transfer: true },
        { name: "아카사카미츠케/赤坂見附", lat: 35.6792, lng: 139.7364, transfer: true },
        { name: "타메이케산노/溜池山王", lat: 35.6732, lng: 139.7421, transfer: true },
        { name: "토라노몬/虎ノ門", lat: 35.6694, lng: 139.7498 },
        { name: "긴자/銀座", lat: 35.6720, lng: 139.7645, transfer: true },
        { name: "니혼바시/日本橋", lat: 35.6830, lng: 139.7743, transfer: true },
        { name: "우에노/上野", lat: 35.7118, lng: 139.7770, transfer: true },
        { name: "아사쿠사/浅草", lat: 35.7114, lng: 139.7967, transfer: true }
      ]
    },
    {
      id: "marunouchi-line-main",
      nameKo: "마루노우치선 본선",
      nameJp: "Marunouchi Line Main",
      color: "#F62E36",
      stations: [
        { name: "오기쿠보/荻窪", lat: 35.7047, lng: 139.6197, transfer: true },
        { name: "미나미아사가야/南阿佐ヶ谷", lat: 35.6994, lng: 139.6356, transfer: true },
        { name: "신코엔지/新中野", lat: 35.6972, lng: 139.6458, transfer: true },
        { name: "나카노후지미초/中野富士見町", lat: 35.6947, lng: 139.6558, transfer: true },
        { name: "나카노사카우에/中野坂上", lat: 35.6974, lng: 139.6828, transfer: true },
        { name: "신주쿠/新宿", lat: 35.6896, lng: 139.7006, transfer: true },
        { name: "시부야/渋谷", lat: 35.658, lng: 139.7016, transfer: true },
        { name: "긴자/銀座", lat: 35.672, lng: 139.7645, transfer: true },
        { name: "도쿄/東京", lat: 35.6812, lng: 139.7671, transfer: true },
        { name: "오테마치/大手町", lat: 35.6867, lng: 139.7662, transfer: true },
        { name: "이케부쿠로/池袋", lat: 35.7295, lng: 139.7109, transfer: true },
      
      ]
    },
    {
      id: "marunouchi-line-branch",
      nameKo: "마루노우치선 지선",
      nameJp: "Marunouchi Line Branch",
      color: "#F62E36",
      stations: [
        { name: "나카노사카우에/中野坂上", lat: 35.6974, lng: 139.6828, transfer: true },
        { name: "호난초/方南町", lat: 35.6836, lng: 139.6654, transfer: true },
      ]
    },
    {
      id: "hibiya-line",
      nameKo: "히비야선",
      nameJp: "Hibiya Line",
      color: "#B5B5AC",
      stations: [
        { name: "기타센주/北千住", lat: 35.7497, lng: 139.8049, transfer: true },
        { name: "미나미센주/南千住", lat: 35.7331, lng: 139.7992 },
        { name: "긴시초/錦糸町", lat: 35.6967, lng: 139.8143, transfer: true },
        { name: "쓰키지/築地", lat: 35.6678, lng: 139.7717 },
        { name: "히비야/日比谷", lat: 35.6751, lng: 139.7586, transfer: true },
        { name: "긴자/銀座", lat: 35.6720, lng: 139.7645, transfer: true },
        { name: "롯폰기/六本木", lat: 35.6633, lng: 139.7292, transfer: true },
        { name: "에비스/恵比寿", lat: 35.6468, lng: 139.7100, transfer: true },
        { name: "나카메구로/中目黒", lat: 35.6433, lng: 139.6978, transfer: true }
      ]
    },
    {
      id: "tozai-line",
      nameKo: "도자이선",
      nameJp: "Tozai Line",
      color: "#009BBF",
      stations: [
        { name: "나카노/中野", lat: 35.7056, lng: 139.6657, transfer: true },
        { name: "타카다노바바/高田馬場", lat: 35.7128, lng: 139.7038, transfer: true },
        { name: "와세다/早稲田", lat: 35.7094, lng: 139.7203 },
        { name: "이다바시/飯田橋", lat: 35.7026, lng: 139.7458, transfer: true },
        { name: "쿠단시타/九段下", lat: 35.6956, lng: 139.7517 },
        { name: "오테마치/大手町", lat: 35.6867, lng: 139.7662, transfer: true },
        { name: "니혼바시/日本橋", lat: 35.6830, lng: 139.7743, transfer: true },
        { name: "모노리스나카/門前仲町", lat: 35.6703, lng: 139.7925 },
        { name: "니시후나바시/西船橋", lat: 35.7073, lng: 139.9585, transfer: true }
      ]
    },
    {
      id: "chiyoda-line",
      nameKo: "치요다선",
      nameJp: "Chiyoda Line",
      color: "#00BB85",
      stations: [
        { name: "요요기우에하라/代々木上原", lat: 35.6695, lng: 139.6832, transfer: true },
        { name: "요요기코엔/代々木公園", lat: 35.6689, lng: 139.6892 },
        { name: "메이지진구마에/明治神宮前", lat: 35.6703, lng: 139.7026, transfer: true },
        { name: "오모테산도/表参道", lat: 35.6654, lng: 139.7126, transfer: true },
        { name: "노기자카/乃木坂", lat: 35.6667, lng: 139.7261 },
        { name: "아카사카/赤坂", lat: 35.6743, lng: 139.7364, transfer: true },
        { name: "코쿠카이기지도마에/国会議事堂前", lat: 35.6781, lng: 139.7450 },
        { name: "오테마치/大手町", lat: 35.6867, lng: 139.7662, transfer: true },
        { name: "신오차노미즈/新御茶ノ水", lat: 35.6956, lng: 139.7656 },
        { name: "기타아야세/北綾瀬", lat: 35.7756, lng: 139.8328, transfer: true }
      ]
    },
    {
      id: "yurakucho-line",
      nameKo: "유라쿠초선",
      nameJp: "Yurakucho Line",
      color: "#C1A470",
      stations: [
        { name: "와코시/和光市", lat: 35.7808, lng: 139.6058, transfer: true },
        { name: "치카테츠아카츠카/地下鉄赤塚", lat: 35.7694, lng: 139.6442 },
        { name: "헤이와다이/平和台", lat: 35.7511, lng: 139.6531 },
        { name: "히카와다이/氷川台", lat: 35.7497, lng: 139.6653 },
        { name: "코타케무카이하라/小竹向原", lat: 35.7481, lng: 139.6792 },
        { name: "센카와/千川", lat: 35.7381, lng: 139.6881 },
        { name: "이케부쿠로/池袋", lat: 35.7295, lng: 139.7109, transfer: true },
        { name: "고탄다/五反田", lat: 35.6257, lng: 139.7238, transfer: true },
        { name: "신바시/新橋", lat: 35.6664, lng: 139.7583, transfer: true },
        { name: "긴자/銀座", lat: 35.6720, lng: 139.7645, transfer: true },
        { name: "신키바/新木場", lat: 35.6456, lng: 139.8267, transfer: true }
      ]
    },
    {
      id: "hanzomon-line",
      nameKo: "한조몬선",
      nameJp: "Hanzomon Line",
      color: "#8F76D6",
      stations: [
        { name: "시부야/渋谷", lat: 35.6580, lng: 139.7016, transfer: true },
        { name: "오모테산도/表参道", lat: 35.6654, lng: 139.7126, transfer: true },
        { name: "아오야마잇초메/青山一丁目", lat: 35.6726, lng: 139.7242, transfer: true },
        { name: "나가타초/永田町", lat: 35.6792, lng: 139.7404, transfer: true },
        { name: "한조몬/半蔵門", lat: 35.6870, lng: 139.7507 },
        { name: "오테마치/大手町", lat: 35.6867, lng: 139.7662, transfer: true },
        { name: "미츠코시마에/三越前", lat: 35.6879, lng: 139.7740 },
        { name: "스이텐구마에/水天宮前", lat: 35.6825, lng: 139.7853 },
        { name: "오시아게/押上", lat: 35.7104, lng: 139.8133, transfer: true }
      ]
    },
    {
      id: "namboku-line",
      nameKo: "난보쿠선",
      nameJp: "Namboku Line",
      color: "#00AC9B",
      stations: [
        { name: "메구로/目黒", lat: 35.6338, lng: 139.7157, transfer: true },
        { name: "시로카네다카나와/白金高輪", lat: 35.6387, lng: 139.7334, transfer: true },
        { name: "시로카네타카나와/白金台", lat: 35.6378, lng: 139.7281 },
        { name: "아자부주반/麻布十番", lat: 35.6549, lng: 139.7368, transfer: true },
        { name: "롯폰기잇초메/六本木一丁目", lat: 35.6657, lng: 139.7391 },
        { name: "타메이케산노/溜池山王", lat: 35.6732, lng: 139.7421, transfer: true },
        { name: "나가타초/永田町", lat: 35.6792, lng: 139.7404, transfer: true },
        { name: "요쓰야/四ツ谷", lat: 35.6868, lng: 139.7299, transfer: true },
        { name: "이치가야/市ヶ谷", lat: 35.6916, lng: 139.7429, transfer: true },
        { name: "이다바시/飯田橋", lat: 35.7026, lng: 139.7458, transfer: true },
        { name: "고라쿠엔/後楽園", lat: 35.7078, lng: 139.7517 },
        { name: "도다이마에/東大前", lat: 35.7175, lng: 139.7581 },
        { name: "혼고산초메/本郷三丁目", lat: 35.7078, lng: 139.7603 },
        { name: "아카바네이와부치/赤羽岩淵", lat: 35.7508, lng: 139.7211, transfer: true }
      ]
    },
    {
      id: "fukutoshin-line",
      nameKo: "후쿠토신선",
      nameJp: "Fukutoshin Line",
      color: "#9C5E31",
      stations: [
        { name: "와코시/和光市", lat: 35.7808, lng: 139.6058, transfer: true },
        { name: "이케부쿠로/池袋", lat: 35.7295, lng: 139.7109, transfer: true },
        { name: "조시가야/雑司が谷", lat: 35.7208, lng: 139.7147 },
        { name: "니시와세다/西早稲田", lat: 35.7086, lng: 139.7092 },
        { name: "히가시신주쿠/東新宿", lat: 35.6978, lng: 139.7075 },
        { name: "신주쿠산초메/新宿三丁目", lat: 35.6895, lng: 139.7063, transfer: true },
        { name: "기타산도/北参道", lat: 35.6756, lng: 139.7031 },
        { name: "메이지진구마에/明治神宮前", lat: 35.6703, lng: 139.7026, transfer: true },
        { name: "시부야/渋谷", lat: 35.6580, lng: 139.7016, transfer: true }
      ]
    },
  ],
  "JR 동일본": [
    {
      id: "yamanote",
      nameKo: "야마노테선",
      nameJp: "山手線",
      color: "#9ACD32",
      stations: [
        { name: "도쿄/東京", lat: 35.6812, lng: 139.7671, transfer: true },
        { name: "칸다/神田", lat: 35.6916, lng: 139.7708 },
        { name: "아키하바라/秋葉原", lat: 35.6984, lng: 139.7731, transfer: true },
        { name: "우에노/上野", lat: 35.7118, lng: 139.7770, transfer: true },
        { name: "닛포리/日暮里", lat: 35.7276, lng: 139.7707, transfer: true },
        { name: "타바타/田端", lat: 35.7376, lng: 139.7609 },
        { name: "이케부쿠로/池袋", lat: 35.7295, lng: 139.7109, transfer: true },
        { name: "신주쿠/新宿", lat: 35.6896, lng: 139.7006, transfer: true },
        { name: "시부야/渋谷", lat: 35.6580, lng: 139.7016, transfer: true },
        { name: "에비스/恵比寿", lat: 35.6468, lng: 139.7100, transfer: true },
        { name: "메구로/目黒", lat: 35.6338, lng: 139.7157, transfer: true },
        { name: "고탄다/五反田", lat: 35.6257, lng: 139.7238, transfer: true },
        { name: "시나가와/品川", lat: 35.6284, lng: 139.7387, transfer: true },
        { name: "하마마츠초/浜松町", lat: 35.6555, lng: 139.7576, transfer: true },
        { name: "신바시/新橋", lat: 35.6664, lng: 139.7583, transfer: true },
        { name: "유라쿠초/有楽町", lat: 35.6751, lng: 139.7634, transfer: true }
      ]
    },
    {
      id: "chuo-rapid",
      nameKo: "주오선(쾌속)",
      nameJp: "中央線(快速)",
      color: "#F15A22",
      stations: [
        { name: "도쿄/東京", lat: 35.6812, lng: 139.7671, transfer: true },
        { name: "칸다/神田", lat: 35.6916, lng: 139.7708 },
        { name: "오차노미즈/御茶ノ水", lat: 35.6995, lng: 139.7656, transfer: true },
        { name: "요쓰야/四ツ谷", lat: 35.6868, lng: 139.7299, transfer: true },
        { name: "신주쿠/新宿", lat: 35.6896, lng: 139.7006, transfer: true },
        { name: "나카노/中野", lat: 35.7056, lng: 139.6657, transfer: true }
      ]
    },
    {
      id: "sobu",
      nameKo: "소부선",
      nameJp: "総武線",
      color: "#FFD400",
      stations: [
        { name: "지바/千葉", lat: 35.6115, lng: 140.1121 },
        { name: "긴시초/錦糸町", lat: 35.6967, lng: 139.8143, transfer: true },
        { name: "아키하바라/秋葉原", lat: 35.6984, lng: 139.7731, transfer: true },
        { name: "신주쿠/新宿", lat: 35.6896, lng: 139.7006, transfer: true }
      ]
    },
    {
      id: "chuo-sobu-local-line",
      nameKo: "주오-소부선 각역정차",
      nameJp: "Chuo-Sobu Local Line",
      color: "#FFD400",
      stations: [
        { name: "치바/千葉", lat: 35.6115, lng: 140.1121, transfer: true },
        { name: "긴시초/錦糸町", lat: 35.6967, lng: 139.8143, transfer: true },
        { name: "아키하바라/秋葉原", lat: 35.6984, lng: 139.7731, transfer: true },
        { name: "오차노미즈/御茶ノ水", lat: 35.6995, lng: 139.7656, transfer: true },
        { name: "요쓰야/四ツ谷", lat: 35.6868, lng: 139.7299, transfer: true },
        { name: "신주쿠/新宿", lat: 35.6896, lng: 139.7006, transfer: true },
        { name: "나카노/中野", lat: 35.7056, lng: 139.6657, transfer: true },
        { name: "미타카/三鷹", lat: 35.6836, lng: 139.5596, transfer: true },
      
      ]
    },
    {
      id: "sobu-rapid-line",
      nameKo: "소부선 쾌속",
      nameJp: "Sobu Rapid Line",
      color: "#FFD400",
      stations: [
        { name: "도쿄/東京", lat: 35.6812, lng: 139.7671, transfer: true },
        { name: "긴시초/錦糸町", lat: 35.6967, lng: 139.8143, transfer: true },
        { name: "치바/千葉", lat: 35.6115, lng: 140.1121, transfer: true },
      
      ]
    },
    {
      id: "joban-line-local",
      nameKo: "조반선 각역정차",
      nameJp: "Joban Line Local",
      color: "#666666",
      stations: [
        { name: "우에노/上野", lat: 35.7118, lng: 139.777, transfer: true },
        { name: "닛포리/日暮里", lat: 35.7276, lng: 139.7707, transfer: true },
        { name: "미카와시마/三河島", lat: 35.7331, lng: 139.7731, transfer: true },
        { name: "미나미센주/南千住", lat: 35.7331, lng: 139.7992, transfer: true },
        { name: "도리데/取手", lat: 35.9094, lng: 140.0628, transfer: true },
      
      ]
    },
    {
      id: "joban-line-rapid",
      nameKo: "조반선 쾌속",
      nameJp: "Joban Line Rapid",
      color: "#666666",
      stations: [
        { name: "우에노/上野", lat: 35.7118, lng: 139.777, transfer: true },
        { name: "닛포리/日暮里", lat: 35.7276, lng: 139.7707, transfer: true },
        { name: "아비코/我孫子", lat: 35.8583, lng: 140.0131, transfer: true },
      
      ]
    },
    {
      id: "keihin-tohoku-line",
      nameKo: "게이힌토호쿠선",
      nameJp: "Keihin-Tohoku Line",
      color: "#666666",
      stations: [
        { name: "오미야/大宮", lat: 35.9064, lng: 139.6231, transfer: true },
        { name: "우라와/浦和", lat: 35.8581, lng: 139.6567, transfer: true },
        { name: "아카바네/赤羽", lat: 35.7778, lng: 139.7211, transfer: true },
        { name: "이케부쿠로/池袋", lat: 35.7295, lng: 139.7109, transfer: true },
        { name: "신주쿠/新宿", lat: 35.6896, lng: 139.7006, transfer: true },
        { name: "시부야/渋谷", lat: 35.658, lng: 139.7016, transfer: true },
        { name: "시나가와/品川", lat: 35.6284, lng: 139.7387, transfer: true },
        { name: "요코하마/横浜", lat: 35.4658, lng: 139.6222, transfer: true },
        { name: "오후나/大船", lat: 35.3533, lng: 139.5311, transfer: true },
      
      ]
    },
    {
      id: "yokosuka-line",
      nameKo: "요코스카선",
      nameJp: "Yokosuka Line",
      color: "#666666",
      stations: [
        { name: "도쿄/東京", lat: 35.6812, lng: 139.7671, transfer: true },
        { name: "신바시/新橋", lat: 35.6664, lng: 139.7583, transfer: true },
        { name: "요코하마/横浜", lat: 35.4658, lng: 139.6222, transfer: true },
        { name: "오후나/大船", lat: 35.3533, lng: 139.5311, transfer: true },
        { name: "구리하마/久里浜", lat: 35.2333, lng: 139.7, transfer: true },
      
      ]
    },
    {
      id: "saikyo-line",
      nameKo: "사이쿄선",
      nameJp: "Saikyo Line",
      color: "#666666",
      stations: [
        { name: "오사키/大崎", lat: 35.6197, lng: 139.7286, transfer: true },
        { name: "에비스/恵比寿", lat: 35.6468, lng: 139.71, transfer: true },
        { name: "시부야/渋谷", lat: 35.658, lng: 139.7016, transfer: true },
        { name: "신주쿠/新宿", lat: 35.6896, lng: 139.7006, transfer: true },
        { name: "이케부쿠로/池袋", lat: 35.7295, lng: 139.7109, transfer: true },
        { name: "오미야/大宮", lat: 35.9064, lng: 139.6231, transfer: true },
      
      ]
    },
    {
      id: "shonan-shinjuku-line",
      nameKo: "쇼난신주쿠라인",
      nameJp: "Shonan-Shinjuku Line",
      color: "#666666",
      stations: [
        { name: "오사키/大崎", lat: 35.6197, lng: 139.7286, transfer: true },
      ]
    },
    {
      id: "musashino-line",
      nameKo: "무사시노선",
      nameJp: "Musashino Line",
      color: "#666666",
      stations: [
        { name: "후추혼마치/府中本町", lat: 35.6681, lng: 139.4772, transfer: true },
        { name: "키요세/清瀬", lat: 35.7847, lng: 139.5267, transfer: true },
        { name: "신마츠도/新松戸", lat: 35.8253, lng: 139.9208, transfer: true },
        { name: "니시후나바시/西船橋", lat: 35.7073, lng: 139.9585, transfer: true },
      
      ]
    },
    {
      id: "nambu-line",
      nameKo: "난부선",
      nameJp: "Nambu Line",
      color: "#666666",
      stations: [
        { name: "다치카와/立川", lat: 35.6939, lng: 139.4136, transfer: true },
        { name: "후추/府中", lat: 35.6681, lng: 139.4772, transfer: true },
        { name: "무사시코가네이/武蔵小金井", lat: 35.7011, lng: 139.5067, transfer: true },
        { name: "무사시나카하라/武蔵中原", lat: 35.5758, lng: 139.6403, transfer: true },
        { name: "가와사키/川崎", lat: 35.5306, lng: 139.7, transfer: true },
      
      ]
    },
    {
      id: "yokohama-line",
      nameKo: "요코하마선",
      nameJp: "Yokohama Line",
      color: "#666666",
      stations: [
        { name: "히가시카나가와/東神奈川", lat: 35.4778, lng: 139.6281, transfer: true },
        { name: "요코하마/横浜", lat: 35.4658, lng: 139.6222, transfer: true },
        { name: "호도가야/保土ヶ谷", lat: 35.4467, lng: 139.5997, transfer: true },
        { name: "카미오오카/上大岡", lat: 35.4092, lng: 139.5967, transfer: true },
        { name: "하치오지/八王子", lat: 35.6558, lng: 139.3289, transfer: true },
      
      ]
    },
    {
      id: "keiyo-line",
      nameKo: "게이요선",
      nameJp: "Keiyo Line",
      color: "#666666",
      stations: [
        { name: "도쿄/東京", lat: 35.6812, lng: 139.7671, transfer: true },
      ]
    },
    {
      id: "hachiko-line-south",
      nameKo: "하치코선 남부",
      nameJp: "Hachiko Line South",
      color: "#666666",
      stations: [
        { name: "하치오지/八王子", lat: 35.6558, lng: 139.3289, transfer: true },
        { name: "고마가와/高麗川", lat: 35.8961, lng: 139.3181, transfer: true },
      
      
      ]
    },
    {
      id: "ome-line",
      nameKo: "오메선",
      nameJp: "Ome Line",
      color: "#666666",
      stations: [
        { name: "다치카와/立川", lat: 35.6939, lng: 139.4136, transfer: true },
        { name: "하이지마/拝島", lat: 35.7211, lng: 139.3431, transfer: true },
        { name: "오쿠타마/奥多摩", lat: 35.8092, lng: 139.0961, transfer: true },
      
      ]
    },
    {
      id: "itsukaichi-line",
      nameKo: "이쓰카이치선",
      nameJp: "Itsukaichi Line",
      color: "#666666",
      stations: [
        { name: "하이지마/拝島", lat: 35.7211, lng: 139.3431, transfer: true },
        { name: "무사시이쓰카이치/武蔵五日市", lat: 35.7306, lng: 139.2281, transfer: true },
      
      
      ]
    },
    {
      id: "kawagoe-line",
      nameKo: "가와고에선",
      nameJp: "Kawagoe Line",
      color: "#666666",
      stations: [
        { name: "오미야/大宮", lat: 35.9064, lng: 139.6231, transfer: true },
        { name: "가와고에/川越", lat: 35.9253, lng: 139.4858, transfer: true },
      
      
      ]
    },
    {
      id: "tokaido-main-line-kanto",
      nameKo: "도카이도선 간토",
      nameJp: "Tokaido Main Line Kanto",
      color: "#666666",
      stations: [
        { name: "도쿄/東京", lat: 35.6812, lng: 139.7671, transfer: true },
        { name: "시나가와/品川", lat: 35.6284, lng: 139.7387, transfer: true },
        { name: "요코하마/横浜", lat: 35.4658, lng: 139.6222, transfer: true },
        { name: "오다와라/小田原", lat: 35.2561, lng: 139.1553, transfer: true },
        { name: "아타미/熱海", lat: 35.1031, lng: 139.0725, transfer: true },
      
      ]
    },
    {
      id: "negishi-line",
      nameKo: "네기시선",
      nameJp: "Negishi Line",
      color: "#666666",
      stations: [
        { name: "요코하마/横浜", lat: 35.4658, lng: 139.6222, transfer: true },
        { name: "이소고/磯子", lat: 35.4203, lng: 139.6175, transfer: true },
        { name: "오후나/大船", lat: 35.3533, lng: 139.5311, transfer: true },
      
      ]
    },
  ],
  "세이부철도": [
    {
      id: "seibu-ikebukuro",
      nameKo: "세이부 이케부쿠로선",
      nameJp: "西武池袋線",
      color: "#1C8AC8",
      stations: [
        { name: "이케부쿠로/池袋", lat: 35.7295, lng: 139.7109, transfer: true },
        { name: "네리마/練馬", lat: 35.7395, lng: 139.6532, transfer: true },
        { name: "샤쿠지코엔/石神井公園", lat: 35.7407, lng: 139.6014 },
        { name: "히바리가오카/ひばりヶ丘", lat: 35.7606, lng: 139.5390 }
      ]
    },
    {
      id: "ikebukuro-line",
      nameKo: "이케부쿠로선",
      nameJp: "Ikebukuro Line",
      color: "#666666",
      stations: [
        { name: "이케부쿠로/池袋", lat: 35.7295, lng: 139.7109, transfer: true },
        { name: "네리마/練馬", lat: 35.7395, lng: 139.6532, transfer: true },
        { name: "한노/飯能", lat: 35.8519, lng: 139.3181, transfer: true },
      ]
    },
    {
      id: "seibu-chichibu-line",
      nameKo: "세이부치치부선",
      nameJp: "Seibu-Chichibu Line",
      color: "#666666",
      stations: [
        { name: "아가노/吾野", lat: 35.8961, lng: 139.3181, transfer: true },
        { name: "세이부치치부/西武秩父", lat: 35.9903, lng: 139.0847, transfer: true },
      ]
    },
    {
      id: "haijima-line",
      nameKo: "하이지마선",
      nameJp: "Haijima Line",
      color: "#666666",
      stations: [
        { name: "고다이라/小平", lat: 35.7281, lng: 139.4772, transfer: true },
        { name: "하이지마/拝島", lat: 35.7211, lng: 139.3431, transfer: true },
      ]
    },
    {
      id: "tamagawa-line",
      nameKo: "다마가와선",
      nameJp: "Tamagawa Line",
      color: "#666666",
      stations: [
        { name: "무사시사카이/武蔵境", lat: 35.7031, lng: 139.5431, transfer: true },
        { name: "고레마사/是政", lat: 35.6681, lng: 139.4772, transfer: true },
      ]
    },
    {
      id: "tamako-line",
      nameKo: "다마코선",
      nameJp: "Tamako Line",
      color: "#666666",
      stations: [
        { name: "고쿠분지/国分寺", lat: 35.7031, lng: 139.4797, transfer: true },
        { name: "세이부유엔치/西武遊園地", lat: 35.7681, lng: 139.4103, transfer: true },
      ]
    },
    {
      id: "seikouen-line",
      nameKo: "세이부엔선",
      nameJp: "Seikouen Line",
      color: "#666666",
      stations: [
        { name: "히가시무라야마/東村山", lat: 35.7558, lng: 139.4653, transfer: true },
        { name: "세이부유엔치/西武遊園地", lat: 35.7681, lng: 139.4103, transfer: true },
      ]
    },
    {
      id: "toshimaen-line",
      nameKo: "도시마엔선",
      nameJp: "Toshimaen Line",
      color: "#666666",
      stations: [
        { name: "네리마/練馬", lat: 35.7395, lng: 139.6532, transfer: true },
        { name: "도시마엔/豊島園", lat: 35.7281, lng: 139.6472, transfer: true },
      ]
    },
  ],
  "도큐전철": [
    {
      id: "toyoko-line",
      nameKo: "도요코선",
      nameJp: "Toyoko Line",
      color: "#666666",
      stations: [
        { name: "시부야/渋谷", lat: 35.658, lng: 139.7016, transfer: true },
        { name: "다이칸야마/代官山", lat: 35.6481, lng: 139.7031, transfer: true },
        { name: "나카메구로/中目黒", lat: 35.6433, lng: 139.6978, transfer: true },
        { name: "무사시코스기/武蔵小杉", lat: 35.5758, lng: 139.6603, transfer: true },
        { name: "요코하마/横浜", lat: 35.4658, lng: 139.6222, transfer: true },
      
      ]
    },
    {
      id: "den-en-toshi-line",
      nameKo: "덴엔토시선",
      nameJp: "Den-en-toshi Line",
      color: "#666666",
      stations: [
        { name: "시부야/渋谷", lat: 35.658, lng: 139.7016, transfer: true },
        { name: "후타코타마가와/二子玉川", lat: 35.6117, lng: 139.6267, transfer: true },
        { name: "주오린칸/中央林間", lat: 35.5081, lng: 139.4447, transfer: true },
      
      ]
    },
    {
      id: "meguro-line",
      nameKo: "메구로선",
      nameJp: "Meguro Line",
      color: "#666666",
      stations: [
        { name: "메구로/目黒", lat: 35.6338, lng: 139.7157, transfer: true },
        { name: "무사시코스기/武蔵小杉", lat: 35.5758, lng: 139.6603, transfer: true },
        { name: "히요시/日吉", lat: 35.5481, lng: 139.6472, transfer: true },
      
      ]
    },
    {
      id: "oimachi-line",
      nameKo: "오이마치선",
      nameJp: "Oimachi Line",
      color: "#666666",
      stations: [
        { name: "오이마치/大井町", lat: 35.6061, lng: 139.7347, transfer: true },
        { name: "미조노구치/溝の口", lat: 35.5981, lng: 139.6103, transfer: true },
      
      
      ]
    },
    {
      id: "ikegami-line",
      nameKo: "이케가미선",
      nameJp: "Ikegami Line",
      color: "#666666",
      stations: [
        { name: "고탄다/五反田", lat: 35.6257, lng: 139.7238, transfer: true },
        { name: "가마타/蒲田", lat: 35.5625, lng: 139.7161, transfer: true },
      
      
      ]
    },
    {
      id: "tamagawa-line-tokyu",
      nameKo: "다마가와선",
      nameJp: "Tamagawa Line",
      color: "#666666",
      stations: [
        { name: "무사시사카이/武蔵境", lat: 35.7031, lng: 139.5431, transfer: true },
        { name: "고레마사/是政", lat: 35.6681, lng: 139.4772, transfer: true },
      
      
      ]
    },
    {
      id: "setagaya-line",
      nameKo: "세타가야선",
      nameJp: "Setagaya Line",
      color: "#666666",
      stations: [
        { name: "산겐자야/三軒茶屋", lat: 35.6431, lng: 139.6681, transfer: true },
        { name: "시모타카이도/下高井戸", lat: 35.6661, lng: 139.6417, transfer: true },
      
      
      ]
    },
  ],
  "케이오전철": [
    {
      id: "keio-new-line",
      nameKo: "케이오신선",
      nameJp: "Keio New Line",
      color: "#666666",
      stations: [
        { name: "신주쿠/新宿", lat: 35.6896, lng: 139.7006, transfer: true },
        { name: "사사즈카/笹塚", lat: 35.6731, lng: 139.6681, transfer: true },
      
      
      ]
    },
    {
      id: "keio-line",
      nameKo: "케이오선",
      nameJp: "Keio Line",
      color: "#E85298",
      stations: [
        { name: "신주쿠/新宿", lat: 35.6896, lng: 139.7006, transfer: true },
        { name: "시모키타자와/下北沢", lat: 35.6613, lng: 139.6681, transfer: true },
        { name: "조후/調布", lat: 35.6516, lng: 139.5407, transfer: true },
        { name: "게이오하치오지/京王八王子", lat: 35.6578, lng: 139.3431, transfer: true }
      ]
    },
    {
      id: "sagamihara-line",
      nameKo: "사가미하라선",
      nameJp: "Sagamihara Line",
      color: "#666666",
      stations: [
        { name: "조후/調布", lat: 35.6516, lng: 139.5407, transfer: true },
        { name: "하시모토/橋本", lat: 35.5958, lng: 139.3431, transfer: true },
      
      
      ]
    },
    {
      id: "takao-line",
      nameKo: "다카오선",
      nameJp: "Takao Line",
      color: "#666666",
      stations: [
        { name: "키타노/北野", lat: 35.6431, lng: 139.3758, transfer: true },
        { name: "다카오산구치/高尾山口", lat: 35.6325, lng: 139.2811, transfer: true },
      
      
      ]
    },
    {
      id: "dobutsuen-line",
      nameKo: "도부쓰엔선",
      nameJp: "Dobutsuen Line",
      color: "#666666",
      stations: [
        { name: "다카하타후도/高幡不動", lat: 35.6611, lng: 139.4103, transfer: true },
        { name: "다마도부쓰코엔/多摩動物公園", lat: 35.6481, lng: 139.4047, transfer: true },
      
      
      ]
    },
    {
      id: "keibajyo-line",
      nameKo: "게이바조선",
      nameJp: "Keibajyo Line",
      color: "#666666",
      stations: [
        { name: "히가시후추/東府中", lat: 35.6681, lng: 139.4772, transfer: true },
        { name: "후추케이바조마에/府中競馬正門前", lat: 35.6681, lng: 139.4772, transfer: true },
      
      
      ]
    },
    {
      id: "inokashira-line",
      nameKo: "이노카시라선",
      nameJp: "Inokashira Line",
      color: "#666666",
      stations: [
        { name: "시부야/渋谷", lat: 35.658, lng: 139.7016, transfer: true },
        { name: "시모키타자와/下北沢", lat: 35.6613, lng: 139.6681, transfer: true },
        { name: "기치조지/吉祥寺", lat: 35.7031, lng: 139.5797, transfer: true },
      
      ]
    },
  ],
  "오다큐전철": [
    {
      id: "odawara-line",
      nameKo: "오다와라선",
      nameJp: "Odawara Line",
      color: "#666666",
      stations: [
        { name: "신주쿠/新宿", lat: 35.6896, lng: 139.7006, transfer: true },
        { name: "시모키타자와/下北沢", lat: 35.6613, lng: 139.6681, transfer: true },
        { name: "신유리가오카/新百合ヶ丘", lat: 35.5999, lng: 139.5092, transfer: true },
        { name: "오다와라/小田原", lat: 35.2561, lng: 139.1553, transfer: true },
      
      ]
    },
    {
      id: "enoshima-line-odakyu",
      nameKo: "에노시마선",
      nameJp: "Enoshima Line",
      color: "#666666",
      stations: [
        { name: "오후나/大船", lat: 35.3533, lng: 139.5311, transfer: true },
        { name: "쇼난에노시마/湘南江の島", lat: 35.3097, lng: 139.4831, transfer: true },
      
      
      ]
    },
    {
      id: "tama-line",
      nameKo: "다마선",
      nameJp: "Tama Line",
      color: "#666666",
      stations: [
        { name: "신유리가오카/新百合ヶ丘", lat: 35.5999, lng: 139.5092, transfer: true },
        { name: "가라키다/唐木田", lat: 35.6181, lng: 139.4103, transfer: true },
      
      
      ]
    },
  ],
  "도부철도": [
    {
      id: "isesaki-lineskytree-line",
      nameKo: "이세사키선/스카이트리라인",
      nameJp: "Isesaki Line/Skytree Line",
      color: "#666666",
      stations: [
        { name: "아사쿠사/浅草", lat: 35.7114, lng: 139.7967, transfer: true },
        { name: "키타센주/北千住", lat: 35.7497, lng: 139.8049, transfer: true },
        { name: "도치기/栃木", lat: 36.5681, lng: 139.7306, transfer: true },
      
      ]
    },
    {
      id: "tobu-urban-park-linenoda",
      nameKo: "도부어반파크라인/노다선",
      nameJp: "Tobu Urban Park Line/Noda",
      color: "#666666",
      stations: [
        { name: "오미야/大宮", lat: 35.9064, lng: 139.6231, transfer: true },
        { name: "후나바시/船橋", lat: 35.6947, lng: 139.9825, transfer: true },
      
      
      ]
    },
    {
      id: "tobu-tojo-line",
      nameKo: "도부도조선",
      nameJp: "Tobu Tojo Line",
      color: "#004098",
      stations: [
        { name: "이케부쿠로/池袋", lat: 35.7295, lng: 139.7109, transfer: true },
        { name: "와코시/和光市", lat: 35.7808, lng: 139.6058, transfer: true },
        { name: "요리이/寄居", lat: 36.1181, lng: 139.1947, transfer: true }
      ]
    },
    {
      id: "kameido-line",
      nameKo: "가메이도선",
      nameJp: "Kameido Line",
      color: "#666666",
      stations: [
        { name: "가메이도/亀戸", lat: 35.6972, lng: 139.8261, transfer: true },
        { name: "가메이도스이진/亀戸水神", lat: 35.6972, lng: 139.8261, transfer: true },
      
      
      ]
    },
    {
      id: "tobu-daishi-line",
      nameKo: "다이시선",
      nameJp: "Daishi Line",
      color: "#666666",
      stations: [
        { name: "니시아라이/西新井", lat: 35.7778, lng: 139.7903, transfer: true },
        { name: "다이시마에/大師前", lat: 35.7778, lng: 139.7903, transfer: true },
      
      
      ]
    },
  ],
  "케이큐전철": [
    {
      id: "keikyu-main-line",
      nameKo: "본선",
      nameJp: "Main Line",
      color: "#666666",
      stations: [
        { name: "시나가와/品川", lat: 35.6284, lng: 139.7387, transfer: true },
        { name: "우라가/浦賀", lat: 35.25, lng: 139.7167, transfer: true },
      ]
    },
    {
      id: "airport-line",
      nameKo: "공항선",
      nameJp: "Airport Line",
      color: "#666666",
      stations: [
        { name: "케이큐가마타/京急蒲田", lat: 35.5625, lng: 139.7161, transfer: true },
        { name: "하네다공항 T1-T2/羽田空港", lat: 35.5494, lng: 139.7792, transfer: true },
      
      
      ]
    },
    {
      id: "keikyu-daishi-line",
      nameKo: "다이시선",
      nameJp: "Daishi Line",
      color: "#666666",
      stations: [
        { name: "케이큐가와사키/京急川崎", lat: 35.5306, lng: 139.7, transfer: true },
        { name: "고지마신덴/小島新田", lat: 35.5306, lng: 139.7, transfer: true },
      ]
    },
    {
      id: "zushi-line",
      nameKo: "즈시선",
      nameJp: "Zushi Line",
      color: "#666666",
      stations: [
        { name: "가나자와핫케이/金沢八景", lat: 35.3331, lng: 139.6222, transfer: true },
        { name: "즈시/逗子", lat: 35.2969, lng: 139.5781, transfer: true },
        { name: "하야마/葉山", lat: 35.2708, lng: 139.5831, transfer: true },
      
      ]
    },
    {
      id: "kurihama-line",
      nameKo: "구리하마선",
      nameJp: "Kurihama Line",
      color: "#666666",
      stations: [
        { name: "호리노우치/堀ノ内", lat: 35.25, lng: 139.7167, transfer: true },
        { name: "미사키구치/三崎口", lat: 35.1831, lng: 139.6331, transfer: true },
      
      
      ]
    },
  ],
  "케이세이전철": [
    {
      id: "keisei-main-line",
      nameKo: "본선",
      nameJp: "Main Line",
      color: "#666666",
      stations: [
        { name: "케이세이우에노/京成上野", lat: 35.7118, lng: 139.7770, transfer: true },
        { name: "나리타공항 T1/成田空港", lat: 35.7722, lng: 140.3861, transfer: true },
      
      
      ]
    },
    {
      id: "oshiage-line",
      nameKo: "오시아게선",
      nameJp: "Oshiage Line",
      color: "#666666",
      stations: [
        { name: "오시아게/押上", lat: 35.7104, lng: 139.8133, transfer: true },
        { name: "아오토/青砥", lat: 35.7458, lng: 139.8431, transfer: true },
      
      
      ]
    },
    {
      id: "higashi-narita-line",
      nameKo: "히가시나리타선",
      nameJp: "Higashi-Narita Line",
      color: "#666666",
      stations: [
        { name: "케이세이나리타/京成成田", lat: 35.7722, lng: 140.3861, transfer: true },
        { name: "히가시나리타/東成田", lat: 35.7722, lng: 140.3861, transfer: true },
      
      
      ]
    },
    {
      id: "narita-sky-access-line",
      nameKo: "나리타스카이액세스선",
      nameJp: "Narita Sky Access Line",
      color: "#666666",
      stations: [
        { name: "아오토/青砥", lat: 35.7458, lng: 139.8431, transfer: true },
        { name: "나리타공항 T2-T3/成田空港", lat: 35.7722, lng: 140.3861, transfer: true },
      
      
      ]
    },
  ],
};

