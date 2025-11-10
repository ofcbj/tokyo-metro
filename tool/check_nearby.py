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

# 역 데이터 추출
stations = []
files = ['src/opJR.jsx', 'src/opMajor1.jsx', 'src/opMajor2.jsx', 'src/opMinor.jsx']

for filename in files:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # 역 정보 추출 (정규식)
    station_pattern = r'name:\s*"([^"]+)",\s*lat:\s*([\d.]+),\s*lng:\s*([\d.]+)'
    matches = re.findall(station_pattern, content)
    
    for name, lat, lng in matches:
        stations.append({
            'name': name,
            'lat': float(lat),
            'lng': float(lng),
            'file': filename
        })

print(f"총 {len(stations)}개의 역 데이터 수집됨\n")

# 이름이 다르지만 가까운 역 찾기
nearby_pairs = []
for i in range(len(stations)):
    for j in range(i + 1, len(stations)):
        s1, s2 = stations[i], stations[j]
        
        if s1['name'] != s2['name']:
            dist = get_distance(s1['lat'], s1['lng'], s2['lat'], s2['lng'])
            if dist <= 200:
                nearby_pairs.append({
                    'station1': s1['name'],
                    'station2': s2['name'],
                    'distance': round(dist),
                    'file1': s1['file'],
                    'file2': s2['file']
                })

# 거리순 정렬
nearby_pairs.sort(key=lambda x: x['distance'])

print("=== 이름이 다르지만 200m 이내인 환승역 후보 (상위 50개) ===\n")
for i, pair in enumerate(nearby_pairs[:50], 1):
    print(f"{i}. {pair['station1']} ↔ {pair['station2']}")
    print(f"   거리: {pair['distance']}m\n")

print(f"\n총 {len(nearby_pairs)}개의 환승 가능 역 쌍 발견")
