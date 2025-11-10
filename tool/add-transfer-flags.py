#!/usr/bin/env python3
import re
import sys

# List of all transfer station names (stations that appear on 2+ lines)
transfer_stations = [
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
    "六本木", "和光市", "蕨"
]

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    changes_made = 0

    for station in transfer_stations:
        # Find all occurrences of this station
        # Pattern: name: "STATION", followed by lat/lng, but NOT already having transfer: true
        pattern = rf'(\s+name: "{re.escape(station)}",\s+lat: [0-9.]+,\s+lng: [0-9.]+)(,?\s*\n)'

        def replacement(match):
            nonlocal changes_made
            # Check if transfer: true already exists in the next few characters
            end_pos = match.end()
            next_chars = content[end_pos:end_pos+100]
            if 'transfer: true' in next_chars.split('}')[0]:
                return match.group(0)  # Already has transfer flag

            changes_made += 1
            # Add transfer: true before the closing
            return match.group(1) + ',\n          transfer: true' + match.group(2)

        content = re.sub(pattern, replacement, content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}: {changes_made} stations modified")
        return changes_made
    else:
        print(f"No changes needed for {filepath}")
        return 0

if __name__ == "__main__":
    major_changes = process_file("c:\\src\\tokyo-metro\\src\\majorOperators.jsx")
    minor_changes = process_file("c:\\src\\tokyo-metro\\src\\minorOperators.jsx")
    print(f"\nTotal changes: {major_changes + minor_changes}")
