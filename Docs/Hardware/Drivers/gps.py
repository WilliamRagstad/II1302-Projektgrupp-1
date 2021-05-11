import time
import serial
from gpiozero import LED


ser = serial.Serial(port = '/dev/ttyS0',baudrate=9600,parity=serial.PARITY_NONE,stopbits=serial.STOPBITS_ONE,bytesize=serial.EIGHTBITS,timeout=1)
fon = LED(18)
fon.on()

time.sleep(3)
test = "0d"

ser.write(b'$PMTK104*37\r\n')
time.sleep(5)
ser.write(b'$PMTK220,1000*1F\r\n')
print("$PMTK104*37\r\n")

counter = 0

while True:
	print(ser.readline())
	#ser.write(b"$PQGETSLEEP")
	time.sleep(1)
	counter +=1
