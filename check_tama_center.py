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

# 모든 파일에서 多摩センター 역 찾기
files = ['src/opJR.jsx', 'src/opMajor1.jsx', 'src/opMajor2.jsx', 'src/opMinor.jsx']
tama_stations = []

for filename in files:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 多摩センター 관련 역 찾기
    pattern = r'name:\s*"([^"]*多摩[センタ][^"]*)",\s*lat:\s*([\d.]+),\s*lng:\s*([\d.]+)'
    matches = re.findall(pattern, content)
    
    for name, lat, lng in matches:
        tama_stations.append({
            'name': name,
            'lat': float(lat),
            'lng': float(lng),
            'file': filename
        })

print("=== 多摩センター 관련 역 목록 ===\n")
for station in tama_stations:
    print(f"{station['name']}")
    print(f"  위치: ({station['lat']}, {station['lng']})")
    print(f"  파일: {station['file']}\n")

# 거리 계산
keio = None
odakyu = None
tama_monorail = None

for station in tama_stations:
    if station['name'] == '京王多摩センター':
        keio = station
    elif station['name'] == '小田急多摩センター':
        odakyu = station
    elif station['name'] == '多摩センター':
        tama_monorail = station

print("=== 거리 계산 ===\n")

if keio and odakyu:
    distance = get_distance(keio['lat'], keio['lng'], odakyu['lat'], odakyu['lng'])
    print(f"京王多摩センター ↔ 小田急多摩センター")
    print(f"거리: {round(distance)}m")
    print(f"환승역 판정: {'O (환승역)' if distance <= 150 else 'X (너무 멈)'}\n")

if keio and tama_monorail:
    distance = get_distance(keio['lat'], keio['lng'], tama_monorail['lat'], tama_monorail['lng'])
    print(f"京王多摩センター ↔ 多摩センター")
    print(f"거리: {round(distance)}m")
    print(f"환승역 판정: {'O (환승역)' if distance <= 150 else 'X (너무 멈)'}\n")

if odakyu and tama_monorail:
    distance = get_distance(odakyu['lat'], odakyu['lng'], tama_monorail['lat'], tama_monorail['lng'])
    print(f"小田急多摩センター ↔ 多摩センター")
    print(f"거리: {round(distance)}m")
    print(f"환승역 판정: {'O (환승역)' if distance <= 150 else 'X (너무 멈)'}\n")

print(f"현재 임계값: 150m")
