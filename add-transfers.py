#!/usr/bin/env python3
import re

# All transfer stations (stations appearing on 2+ lines)
transfer_stations = {
    "あざみ野", "センター南", "センター北", "阿佐ケ谷", "綾瀬", "稲毛", "印旛日本医大",
    "羽田空港第3ターミナル", "浦和", "曳舟", "永田町", "押上（スカイツリー前）",
    "押上〈スカイツリー前〉", "横浜", "王子", "荻窪", "下高井戸", "下北沢", "霞ケ関",
    "海老名", "蒲田", "茅場町", "関内", "旗の台", "亀戸", "菊名", "吉祥寺", "京急蒲田",
    "京急川崎", "京成高砂", "京成上野", "橋本", "玉川上水", "錦糸町", "金沢八景",
    "銀座", "九段下", "駒込", "空港第２ビル（第２旅客ターミナル）", "恵比寿", "月島",
    "元住吉", "戸塚", "五反田", "吾野", "後楽園", "御茶ノ水", "御徒町", "弘明寺",
    "溝の口", "高円寺", "高津", "高田馬場", "高幡不動", "高尾", "高輪ゲートウェイ",
    "高麗", "高麗川", "国会議事堂前", "国分寺", "桜木町", "笹塚", "三越前",
    "三軒茶屋", "三鷹", "三田", "四ツ谷", "市ケ谷", "市川", "自由が丘", "汐留",
    "秋葉原", "住吉", "渋谷", "春日", "春日部", "小川町", "小竹向原", "小田原",
    "湘南台", "上大岡", "上野", "新横浜", "新鎌ヶ谷", "新丸子", "新橋", "新御徒町",
    "新宿", "新宿三丁目", "新小岩", "新松戸", "新川崎", "新百合ヶ丘", "新木場",
    "森下", "神田", "神保町", "人形町", "水道橋", "成田空港（第１旅客ターミナル）",
    "西船橋", "西日暮里", "赤坂見附", "赤羽", "赤羽岩淵", "川崎", "川越", "千葉",
    "千住大橋", "船橋", "船堀", "代々木", "代々木上原", "代々木公園", "大井町",
    "大船", "大崎", "大手町", "大塚・帝京大学", "大宮", "大森", "池袋", "竹ノ塚",
    "中野", "中野坂上", "中目黒", "町田", "調布", "津田沼", "鶴見", "天王洲アイル",
    "天空橋", "田園調布", "田端", "登戸", "東京", "東京テレポート", "東松戸",
    "東新宿", "東村山", "東大島", "東中野", "東天王町", "東武練馬", "東武動物公園",
    "東飯能", "東北沢", "東門前", "東陽町", "二子玉川", "二重橋前", "二俣川",
    "日暮里", "日比谷", "日本橋", "日吉", "白金高輪", "白金台", "函館", "飯田橋",
    "馬喰町", "馬喰横山", "浜松町", "浜町", "表参道", "分倍河原", "平和台",
    "北千住", "北習志野", "本八幡", "本所吾妻橋", "本郷三丁目", "目黒", "門前仲町",
    "野方", "柳瀬川", "有楽町", "溜池山王", "立川", "緑園都市", "練馬", "蓮根",
    "六本木", "和光市", "蕨", "鶯谷"
}

def add_transfer_flags(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    modified_lines = []
    changes = 0
    i = 0

    while i < len(lines):
        line = lines[i]
        modified_lines.append(line)

        # Check if this line contains a station name
        match = re.search(r'name: "([^"]+)"', line)
        if match:
            station_name = match.group(1)

            # Check if this is a transfer station
            if station_name in transfer_stations:
                # Look ahead to see if transfer: true already exists
                has_transfer = False
                j = i + 1
                # Check next few lines (within the same station object)
                while j < len(lines) and j < i + 10:
                    if 'transfer: true' in lines[j]:
                        has_transfer = True
                        break
                    if lines[j].strip().startswith('}') and ',' in lines[j]:
                        # End of this station object
                        break
                    j += 1

                # If no transfer flag exists, add it
                if not has_transfer:
                    # Find the lng line (should be next or within 2-3 lines)
                    k = i + 1
                    while k < len(lines) and k < i + 5:
                        if 'lng:' in lines[k]:
                            # Check if this lng line already has trailing comma or not
                            if lines[k].rstrip().endswith(','):
                                # Add transfer: true on next line with proper indentation
                                modified_lines.append('          transfer: true\n')
                                changes += 1
                            else:
                                # Add comma to lng line and then transfer
                                modified_lines[-1] = lines[k].rstrip() + ',\n'
                                modified_lines.append('          transfer: true\n')
                                changes += 1
                            break
                        modified_lines.append(lines[k])
                        k += 1
                    i = k
                    continue

        i += 1

    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(modified_lines)

    return changes

# Process both files
major_changes = add_transfer_flags("c:\\src\\tokyo-metro\\src\\majorOperators.jsx")
minor_changes = add_transfer_flags("c:\\src\\tokyo-metro\\src\\minorOperators.jsx")

print(f"majorOperators.jsx: {major_changes} changes")
print(f"minorOperators.jsx: {minor_changes} changes")
print(f"Total: {major_changes + minor_changes} transfer flags added")
