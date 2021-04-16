import random
import sys
#Running the script will create a wdata.txt file containing weighted heatmap data
#for heatmap.ts
orig_stdout = sys.stdout
f = open('wdata.ts', 'w')
sys.stdout = f
long = 59.32932;
lat =  18.06858;
print("export const HEATMAP_DATA = () => [")
for x in range(100):
    longitude = (random.randint(-1000, 1000)/10000)+long
    lattitude = (random.randint(-1000, 1000)/10000)+lat
    weight = random.randint(1, 10)
    coordinate = str("%.4f" % longitude)+", "+str("%.4f" % lattitude)
    print("\t{location: new window.google.maps.LatLng("+coordinate+"), weight:"+str(weight)+"},")

print("\t{location: new window.google.maps.LatLng("+coordinate+"), weight:"+str(weight)+"}")
print("]")
sys.stdout = orig_stdout
f.close()
