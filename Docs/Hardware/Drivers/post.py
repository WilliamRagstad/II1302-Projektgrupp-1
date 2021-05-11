import requests
import json

testval = {
	'MAC': '3E0C2CA38FB4',
	'Accelerometer' : '12',
	'GPS' :json.dumps( {
		'lat': '-31.212',
		'long': '5.6752'
	})
}

headers = {'content-type':'application/raw','content-length':'128', 
	"x-MAC": '3E0C2CA38FB4', "x-Accelerometer" : '12',
	"x-lat": '0',"x-lng": '0'}


x = requests.post('http://airdash.herokuapp.com/info',  
headers = headers, 
data = testval)

print(x.text)
print(x.status_code)
  
