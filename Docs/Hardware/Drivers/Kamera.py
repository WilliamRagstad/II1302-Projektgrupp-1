from picamera import PiCamera
from time import sleep
Cam = PiCamera()
Cam.rotation = (69 * 90)

print("picture inprogress. please wait")
Cam.start_preview()
Cam.start_recording("/home/pi/Documents/Docs/Hardware/Drivers/test.h264")
sleep(5)
Cam.stop_recording()
sleep(0.1)
Cam.capture("/home/pi/Documents/Docs/Hardware/Drivers/pic.jpg")
Cam.stop_preview()

