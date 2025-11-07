import re
import math

def get_distance(lat1, lng1, lat2, lng2):
    R = 6371
    dLat = (lat2 - lat1) * math.pi / 180
    dLng = (lng2 - lng1) * math.pi / 180
    a = (math.sin(dLat/2) * math.sin(dLat/2) +
         math.cos(lat1 * math.pi / 180) * math.cos(lat2 * math.pi / 180) *
         math.sin(dLng/2) * math.sin(dLng/2))
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    return R * c * 1000

DISTANCE_THRESHOLD = 150  # 150m

# 모든 파일에서 역 데이터 수집
files = ['src/opJR.jsx', 'src/opMajor1.jsx', 'src/opMajor2.jsx', 'src/opMinor.jsx']
all_stations = []

for filename in files:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 역 정보 추출
    station_pattern = r'{\s*name:\s*"([^"]+)",\s*lat:\s*([\d.]+),\s*lng:\s*([\d.]+)(?:,\s*transfer:\s*true)?'
    matches = re.finditer(station_pattern, content)
    
    for match in matches:
        name, lat, lng = match.group(1), float(match.group(2)), float(match.group(3))
        all_stations.append({
            'name': name,
            'lat': lat,
            'lng': lng,
            'file': filename
        })

# 환승역으로 표시되어야 할 역들 찾기
transfer_stations = set()

# 1. 이름이 같은 역
name_counts = {}
for station in all_stations:
    name = station['name']
    if name not in name_counts:
        name_counts[name] = 0
    name_counts[name] += 1

for name, count in name_counts.items():
    if count > 1:
        transfer_stations.add(name)

print(f"이름 기반 환승역: {len(transfer_stations)}개")

# 2. 거리가 가까운 역 (이름이 다른 경우)
nearby_pairs = []
for i in range(len(all_stations)):
    for j in range(i + 1, len(all_stations)):
        s1, s2 = all_stations[i], all_stations[j]
        
        if s1['name'] != s2['name']:
            dist = get_distance(s1['lat'], s1['lng'], s2['lat'], s2['lng'])
            if dist <= DISTANCE_THRESHOLD:
                transfer_stations.add(s1['name'])
                transfer_stations.add(s2['name'])
                nearby_pairs.append((s1['name'], s2['name'], round(dist)))

print(f"거리 기반 추가 환승역: {len(nearby_pairs)}개 쌍")
print(f"총 환승역: {len(transfer_stations)}개\n")

# 가까운 역 쌍 출력 (상위 20개)
print("=== 거리 기반으로 추가된 환승역 (상위 20개) ===")
nearby_pairs.sort(key=lambda x: x[2])
for i, (name1, name2, dist) in enumerate(nearby_pairs[:20], 1):
    print(f"{i}. {name1} ↔ {name2} ({dist}m)")

print(f"\n각 파일에 transfer: true 추가 중...")

# 각 파일 처리
for filename in files:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = content
    added_count = 0
    
    # 각 환승역에 대해 처리
    for station_name in transfer_stations:
        # 이미 transfer: true가 있는지 확인하기 위한 패턴
        pattern_with_transfer = rf'(name:\s*"{re.escape(station_name)}",\s*lat:\s*[\d.]+,\s*lng:\s*[\d.]+),\s*transfer:\s*true'
        
        # transfer가 없는 패턴
        pattern_without_transfer = rf'(name:\s*"{re.escape(station_name)}",\s*lat:\s*([\d.]+),\s*lng:\s*([\d.]+))(?!,\s*transfer:)'
        
        # 이미 transfer: true가 있으면 건너뛰기
        if re.search(pattern_with_transfer, modified):
            continue
        
        # transfer가 없으면 추가
        matches = list(re.finditer(pattern_without_transfer, modified))
        for match in reversed(matches):  # 뒤에서부터 처리 (인덱스 변화 방지)
            start, end = match.span()
            modified = modified[:end] + ',\n          transfer: true' + modified[end:]
            added_count += 1
    
    if added_count > 0:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(modified)
        print(f"  {filename}: {added_count}개 역에 transfer 추가")
    else:
        print(f"  {filename}: 변경 없음")

print("\n완료!")
