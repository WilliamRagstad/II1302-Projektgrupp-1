import requests

#url ='https://airdash.herokuapp.com/info'
testval = {
	'MAC': '3E0C2CA38FB4',
	'Accelerometer' : '12',
	'GPS' : {
		'lat': '-31.212',
		'long': '5.6752'
	}
}

headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.0; WOW64; rv:24.0) Gecko/20100101 FireFox/24.0', 'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
		'Accept-Language': 'en-US,en;q=0.5', 'Accept-Encoding': 'gzip', 'DNT' : '1', #Do not Track Request Headers
			'Connection' : 'close'}

x = requests.post('http://airdash.herokuapp.com/info', headers = headers, data = testval)

print(x.text)
print(x.status_code)