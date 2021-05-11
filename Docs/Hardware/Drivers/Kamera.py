from picamera import PiCamera
from time import sleep
ThotCam = PiCamera()
ThotCam.rotation = (69 * 90)

print("OnlyFans pic for my KAWAiI subs!!")
ThotCam.start_preview()
ThotCam.start_recording("/home/pi/Desktop/Hot_tub_Review.h264")
sleep(5)
ThotCam.stop_recording()
sleep(0.1)
ThotCam.capture("/home/pi/Desktop/Bathwater.jpg")
ThotCam.stop_preview()

