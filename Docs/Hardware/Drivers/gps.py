import time
import serial
from gpiozero import LED
from operator import xor

def checksum(data):
    base = 0
    for element in data:
        if(element == 42):
            break
        if(element != 36):
            print(element, ' ', base)
            base = xor(base, element)
    #print(base)
    #print('{:X}'.format(base // 16))
  
    #print(base)
    
    return (b'$' + data + b'*' + ('{:X}'.format(base // 16)).encode() + ('{:X}'.format(base % 16)).encode() + b'\r\n')

print(checksum(b'PQ1PPS,W,4,100')) 
ser = serial.Serial(port = '/dev/ttyS0',baudrate=9600,parity=serial.PARITY_NONE,stopbits=serial.STOPBITS_ONE,bytesize=serial.EIGHTBITS,timeout=1)
fon = LED(18)
fon.on()

time.sleep(3)
test = "0d"
ser.write(checksum(b'PQ1PPS,W,4,100'))

#ser.write(b'$PQ1PPS,W,4,100*1D\r\n') # Sets 1PPS as always out
print("Setting 1PPS to always out.")
print("$PQ1PPS,W,4,100*1D\r\n")
time.sleep(1)
ser.write(b'$P\r\n')
print("$PMTK104*37\r\n")

counter = 0

while True:
	print(ser.readline())
	#ser.write(b"$PQGETSLEEP")
	time.sleep(1)
	counter +=1
