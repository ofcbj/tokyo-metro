#!/usr/bin/env python3
import re

key_stations = [
    "新宿", "渋谷", "池袋", "東京", "品川", "横浜", "上野", "秋葉原", "新橋",
    "大崎", "目黒", "大手町", "表参道", "赤坂見附", "永田町", "日比谷", "銀座",
    "有楽町", "飯田橋", "市ケ谷", "四ツ谷", "新宿三丁目", "御茶ノ水", "神田",
    "日本橋", "茅場町", "人形町", "門前仲町", "九段下", "神保町", "後楽園",
    "本郷三丁目", "霞ケ関", "青山一丁目"
]

def check_station_coverage(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    print(f"\n=== {filepath} ===")
    total_without_transfer = 0

    for station in key_stations:
        # Find all occurrences
        pattern = rf'name: "{re.escape(station)}"'
        matches = list(re.finditer(pattern, content))

        if len(matches) == 0:
            continue

        # Count how many have transfer flags
        with_transfer = 0
        without_transfer = 0

        for match in matches:
            # Check 200 characters after the match for transfer: true
            end_pos = match.end()
            next_section = content[end_pos:end_pos+200]
            # Look until we hit the closing brace of this station object
            station_end = next_section.find('},')
            if station_end == -1:
                station_end = next_section.find('}')
            station_obj = next_section[:station_end] if station_end != -1 else next_section

            if 'transfer: true' in station_obj:
                with_transfer += 1
            else:
                without_transfer += 1
                total_without_transfer += 1

        if len(matches) > 1:  # Only report transfer stations
            status = "OK" if without_transfer == 0 else "MISSING"
            print(f"  [{status}] {station}: {len(matches)} occurrences, {with_transfer} with transfer flag, {without_transfer} missing")

    return total_without_transfer

major_missing = check_station_coverage("c:\\src\\tokyo-metro\\src\\majorOperators.jsx")
minor_missing = check_station_coverage("c:\\src\\tokyo-metro\\src\\minorOperators.jsx")

print(f"\n=== SUMMARY ===")
print(f"Key stations missing transfer flags in majorOperators.jsx: {major_missing}")
print(f"Key stations missing transfer flags in minorOperators.jsx: {minor_missing}")
print(f"Total missing: {major_missing + minor_missing}")

# Also count total transfer flags
with open("c:\\src\\tokyo-metro\\src\\majorOperators.jsx", 'r') as f:
    major_count = f.read().count('transfer: true')
with open("c:\\src\\tokyo-metro\\src\\minorOperators.jsx", 'r') as f:
    minor_count = f.read().count('transfer: true')

print(f"\nTotal transfer flags added:")
print(f"  majorOperators.jsx: {major_count}")
print(f"  minorOperators.jsx: {minor_count}")
print(f"  TOTAL: {major_count + minor_count}")
