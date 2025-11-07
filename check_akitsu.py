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

# 모든 파일에서 秋津 역 찾기
files = ['src/opJR.jsx', 'src/opMajor1.jsx', 'src/opMajor2.jsx', 'src/opMinor.jsx']
akitsu_stations = []

for filename in files:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 秋津 관련 역 찾기
    pattern = r'name:\s*"([^"]*秋津[^"]*)",\s*lat:\s*([\d.]+),\s*lng:\s*([\d.]+)'
    matches = re.findall(pattern, content)
    
    for name, lat, lng in matches:
        akitsu_stations.append({
            'name': name,
            'lat': float(lat),
            'lng': float(lng),
            'file': filename
        })

print("=== 秋津 관련 역 목록 ===\n")
for station in akitsu_stations:
    print(f"{station['name']}")
    print(f"  위치: ({station['lat']}, {station['lng']})")
    print(f"  파일: {station['file']}\n")

# 秋津와 新秋津 거리 계산
akitsu = None
shin_akitsu = None

for station in akitsu_stations:
    if station['name'] == '秋津':
        akitsu = station
    elif station['name'] == '新秋津':
        shin_akitsu = station

if akitsu and shin_akitsu:
    distance = get_distance(
        akitsu['lat'], akitsu['lng'],
        shin_akitsu['lat'], shin_akitsu['lng']
    )
    print(f"=== 거리 계산 ===")
    print(f"{akitsu['name']} ↔ {shin_akitsu['name']}")
    print(f"거리: {round(distance)}m")
    print(f"\n현재 임계값: 150m")
    print(f"환승역 판정: {'O (환승역)' if distance <= 150 else 'X (너무 멈)'}")
    
    if distance > 150:
        print(f"\n참고: 이 거리는 도보로 약 {round(distance / 80)} 분 정도 소요됩니다.")
else:
    print("秋津 또는 新秋津 역을 찾을 수 없습니다.")
