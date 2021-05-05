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

def MPU_Init():
	#write to sample rate register
	bus.write_byte_data(Device_Address, SMPLRT_DIV, 7)

	#write to power management register
	bus.write_byte_data(Device_Address, PWR_MGMT_1, 1)

	#write to config register
	bus.write_byte_data(Device_Address, CONFIG, 0)

	#write to Gyro config register
	bus.write_byte_data(Device_Address, GYRO_CONFIG, 24)

	#write to interrupt enable config register
	bus.write_byte_data(Device_Address, INT_ENABLE, 1)


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

print("reading gyro and acc")

while True:

	#Read acc raw vals
	acc_x = read_raw_data(ACCEL_XOUT_H)
	acc_y = read_raw_data(ACCEL_YOUT_H)
	acc_z = read_raw_data(ACCEL_ZOUT_H)

	#read raw gyro vals
	gyro_x = read_raw_data(GYRO_XOUT_H)
	gyro_y = read_raw_data(GYRO_YOUT_H)
	gyro_z = read_raw_data(GYRO_ZOUT_H)

	#Fulle scale range +/- 250 degree/C as per sensitivity scale factor
	Ax = acc_x/16384.0
	Ay = acc_y/16384.0
	Az = acc_z/16384.0

	Gx = gyro_x/131.0
	Gy = gyro_y/131.0
	Gz = gyro_z/131.0

	print("Gx=%.2f" %Gx, "Gy=%.2f" %Gy,"Gz=%.2f" %Gz, "Ax=%.2f g" %Ax, "Ay=%.2f g" %Ay, "Az=%.2f g" %Az)

	sleep(1)
