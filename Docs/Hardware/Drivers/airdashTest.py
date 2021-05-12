import random
import decimal
import smbus
import requests
import subprocess
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

Cam.resolution = (640, 360)
Cam.framerate = 24

#camera start recording
Cam.start_recording("/home/pi/Documents/Docs/Hardware/Drivers/airdashVideo.h264")
Cam.start_preview()
#Cam.wait_recording(100)
highestA = 0
#read-loop

Ax = 0
Ay = 0
Az = 0
while max(abs(Ax), abs(Ay), abs(Az)) < 4.0:
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
	sleep(0.02)

file1.write('{}\n'.format(Az))
file1.write('{}\n'.format(Ay))
file1.write('{}\n'.format(Ax))
highestA = max(Ax, Ay, Az)
print('stopped recording!')
Cam.close()

file1.close()


#netcode goes here
latitude = random.choice(range(-90, 90)) + decimal.Decimal(random.choice(range(00000, 99999))/100000)
longitude = random.choice(range(-90, 90)) + decimal.Decimal(random.choice(range(00000, 99999))/100000)

headers  = { 'content-type' : 'application/raw', 'content-legnth' : '128',
	"x-MAC": '133742069', "x-Accelerometer": '{accVal}'.format(accVal = highestA),
	"x-Lat": '{Lat}'.format(Lat = latitude), 
	"x-Lng": '{Long}'.format(Long = longitude)}

fileheader = { 'content-type' : 'video/h264',
	"x-MAC": '8008135'}

x = requests.post('http://airdash.herokuapp.com/info', headers = headers)
#print(x.text)
print(x.status_code)


files ={'files': open('airdashVideo.h264','rb')}

x = requests.post('http://airdash.herokuapp.com/video', headers = fileheader,
	data=open('airdashVideo.h264','rb')) 

#print(x.text)
print(x.status_code)
