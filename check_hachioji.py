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

# 모든 파일에서 八王子 역 찾기
files = ['src/opJR.jsx', 'src/opMajor1.jsx', 'src/opMajor2.jsx', 'src/opMinor.jsx']
hachioji_stations = []

for filename in files:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 八王子 관련 역 찾기
    pattern = r'name:\s*"([^"]*八王子[^"]*)",\s*lat:\s*([\d.]+),\s*lng:\s*([\d.]+)'
    matches = re.findall(pattern, content)
    
    for name, lat, lng in matches:
        hachioji_stations.append({
            'name': name,
            'lat': float(lat),
            'lng': float(lng),
            'file': filename
        })

print("=== 八王子 관련 역 목록 ===\n")
for station in hachioji_stations:
    print(f"{station['name']}")
    print(f"  위치: ({station['lat']}, {station['lng']})")
    print(f"  파일: {station['file']}\n")

# 八王子와 京王八王子 거리 계산
jr_hachioji = None
keio_hachioji = None

for station in hachioji_stations:
    if station['name'] == '八王子':
        jr_hachioji = station
    elif station['name'] == '京王八王子':
        keio_hachioji = station

if jr_hachioji and keio_hachioji:
    distance = get_distance(
        jr_hachioji['lat'], jr_hachioji['lng'],
        keio_hachioji['lat'], keio_hachioji['lng']
    )
    print(f"=== 거리 계산 ===")
    print(f"{jr_hachioji['name']} ↔ {keio_hachioji['name']}")
    print(f"거리: {round(distance)}m")
    print(f"\n현재 임계값: 150m")
    print(f"환승역 판정: {'O (환승역)' if distance <= 150 else 'X (너무 멈)'}")
else:
    print("八王子 또는 京王八王子 역을 찾을 수 없습니다.")
