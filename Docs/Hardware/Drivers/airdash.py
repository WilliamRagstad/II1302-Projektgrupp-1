import smbus
import requests
from time import sleep
from picamera import PiCamera


#Reg decs
PWR_MGMT_1 = 0X6B
SMPLRT_DIV = 0X19
CONFIG = 0X1A
GYRO_CONFIG = 0X1B
INT_ENABLE = 0X38
ACCEL_XOUT_H = 0X3B
ACCEL_YOUT_H = 0X3D
ACCEL_ZOUT_H = 0X3F
GYRO_XOUT_H = 0X43
GYRO_YOUT_H = 0X45
GYRO_ZOUT_H = 0X47
ACCEL_CONFIG = 0X1C

# cam setup
Cam = PiCamera()

#accel mpu6050 init
def MPU_Init():
	bus.write_byte_data(Device_Address, SMPLRT_DIV, 0)
	bus.write_byte_data(Device_Address, PWR_MGMT_1, 1)
	bus.write_byte_data(Device_Address, CONFIG, 0)
	bus.write_byte_data(Device_Address, GYRO_CONFIG, 0)
	bus.write_byte_data(Device_Address, INT_ENABLE, 1)
	bus.write_byte_data(Device_Address, ACCEL_CONFIG, 24)

#reads the raw data from the mpu6050 unit
def read_raw_data(addr):
	high = bus.read_byte_data(Device_Address, addr)
	low = bus.read_byte_data(Device_Address, addr+1)
	value = ((high << 8) | low)
	if(value > 32768):
		value = value - 65536
	return value

bus = smbus.SMBus(1)

Device_Address = 0X68

MPU_Init()

#data dump
file1 = open("blackBox.txt", "w")

#camera start recording
Cam.start_recording("/home/pi/Documents/Docs/Hardware/Drivers/test.h264")


highestA = 0
#read-loop
while True:

	#read raw data
	acc_x = read_raw_data(ACCEL_XOUT_H)
	acc_y = read_raw_data(ACCEL_YOUT_H)
	acc_z = read_raw_data(ACCEL_ZOUT_H)

	#imput gyro raw here

	#scale to +- 16g
	Ax = acc_x/2048.0
	Ay = acc_y/2048.0
	Az = acc_z/2048.0

	#insert scaled gyro raw here

	if(abs(Ax) >= 4.0 or  abs(Ay) >= 4.0  or abs(Az) >= 4.0):
		file1.write('{}\n'.format(Az))
		file1.write('{}\n'.format(Ay))
		file1.write('{}\n'.format(Ax))
		highestA = max(Ax, Ay, Az)
		Cam.stop_recording()
		break
	sleep(0.02)
file1.close()


#netcode goes here
latitude = 39.90564
longitude = 116.39755

headers  = { 'content-type' : 'application/raw', 'content-legnth' : '128',
	"x-MAC": '133742069', "x-Accelerometer": '{accVal}'.format(accVal = highestA),
	"x-Lat": '{Lat}'.format(Lat = latitude), 
	"x-Lng": '{Long}'.format(Long = longitude)}

data = { 'content-type' : 'application/raw', 'content-legnth' : '128',
	"x-MAC": '133742069', "x-Accelerometer": '{accVal}'.format(accVal = highestA),
	"x-Lat": '{Lat}'.format(Lat = latitude), 
	"x-Lng": '{Long}'.format(Long = longitude)}

x = requests.post('http://airdash.herokuapp.com/info', headers = headers,
	data = data)
print(x.text)
print(x.status_code)
