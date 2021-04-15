import random
import sys
#Running the script will create a data.txt file containing heatmap data
#for heatmap.ts
orig_stdout = sys.stdout
f = open('data.txt', 'w')
sys.stdout = f
long = 59.32932;
lat =  18.06858;
print("var heatmapData = [")
for x in range(100):
    longitude = (random.randint(-1000, 1000)/10000)+long
    lattitude = (random.randint(-1000, 1000)/10000)+lat
    coordinate = str("%.4f" % longitude)+", "+str("%.4f" % lattitude)
    print("new google.maps.LatLng("+coordinate+"),")

print("new google.maps.LatLng("+coordinate+")")
print("]")
sys.stdout = orig_stdout
f.close()