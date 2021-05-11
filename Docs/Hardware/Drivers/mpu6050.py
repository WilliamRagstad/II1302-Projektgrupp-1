import smbus  #import SMBus module of I2C
from time import sleep #import

#some MPU6050 Registers and their Address

PWR_MGMT_1 = 0x6B
SMPLRT_DIV = 0x19
CONFIG = 0x1A
GYRO_CONFIG = 0x1B
INT_ENABLE = 0x38
ACCEL_XOUT_H = 0x3B
ACCEL_YOUT_H = 0x3D
ACCEL_ZOUT_H = 0x3F
GYRO_XOUT_H = 0x43
GYRO_YOUT_H = 0x45
GYRO_ZOUT_H = 0x47
ACCEL_CONFIG = 0x1C


def MPU_Init():
	#write to sample rate register
	bus.write_byte_data(Device_Address, SMPLRT_DIV, 0)

	#write to power management register
	bus.write_byte_data(Device_Address, PWR_MGMT_1, 1)

	#write to config register
	bus.write_byte_data(Device_Address, CONFIG, 0)

	#write to Gyro config register
	bus.write_byte_data(Device_Address, GYRO_CONFIG, 24)

	#write to interrupt enable config register
	bus.write_byte_data(Device_Address, INT_ENABLE, 1)

	#write to accelerometer configuration register, allow 16g detection
	bus.write_byte_data(Device_Address, ACCEL_CONFIG, 24)

def read_raw_data(addr):

	#Accelero and Gyro value are 16bit
	high = bus.read_byte_data(Device_Address, addr)
	low = bus.read_byte_data(Device_Address, addr+1)

	#concat high and low vals
	value = ((high << 8) | low)

	#to get signed value from mpu6050
	if(value > 32768):
		value = value - 65536
	return value


bus = smbus.SMBus(1)  # or bus = smbus.SMBus(0) for older version boards

Device_Address = 0x68 # MPU6050 device address

MPU_Init()

print("reading acc")

file1 = open("datafile.txt", "w")
s1 = "Ax = "
s2 = "Ay = "
s3 = "Az = "
while True:

	#Read acc raw vals
	acc_x = read_raw_data(ACCEL_XOUT_H)
	acc_y = read_raw_data(ACCEL_YOUT_H)
	acc_z = read_raw_data(ACCEL_ZOUT_H)

	#read raw gyro vals
	gyro_x = read_raw_data(GYRO_XOUT_H)
	gyro_y = read_raw_data(GYRO_YOUT_H)
	gyro_z = read_raw_data(GYRO_ZOUT_H)

	#scale to +- 16g
	Ax = acc_x/2048.0
	Ay = acc_y/2048.0
	Az = acc_z/2048.0

	Gx = gyro_x/131.0
	Gy = gyro_y/131.0
	Gz = gyro_z/131.0




#	acc_data = ["Ax = %.2f g", %Ax, "Ay = %.2f g" %Ay, "Az = %.2f g" %Az]

#	file1 = open("datafile.txt", "w")
#	file1.write(s1)
#	file1.write('{}\n'.format(Ax))
#	file1.write(s2)
#	file1.write('{}\n'.format(Ay))
#	file1.write(s3)
#	file1.write('{}\n'.format(Az))

#	print("Gx=%.2f" %Gx, "Gy=%.2f" %Gy,"Gz=%.2f" %Gz, "Ax=%.2f g" %Ax, "Ay=%.2f g" %Ay, "Az=%.2f g" %Az)
#	print("Ax = %.2f g" %Ax, "Ay = %.2f g" %Ay, "Az = %.2f g" %Az)

	if(Az >=  4.0 ):
		print("crash")
		print("Az = %.2f g" %Az)
		file1.write(s3)
		file1.write('{}\n'.format(Az))

	if(Az <= -4.0):
		print("crash")
		print("Az = %.2f g" %Az)
		file1.write(s3)
		file1.write('{}\n'.format(Az))

	#sleep(1)
	sleep(0.02)
f.close()
