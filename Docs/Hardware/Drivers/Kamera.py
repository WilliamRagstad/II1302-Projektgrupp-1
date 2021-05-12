from picamera import PiCamera
from time import sleep
Cam = PiCamera()
Cam.framerate = 24
Cam.video_stabilization = True
Cam.resolution = (1920, 1080)
Cam.rotation = (69 * 90)

print("picture inprogress. please wait")
Cam.start_preview(fullscreen=False, window=(100,200,300,400))
Cam.start_recording("/home/pi/Documents/github/Docs/Hardware/Drivers/test.h264")
sleep(30)
Cam.stop_recording()
sleep(0.1)
Cam.capture("/home/pi/Documents/github/Docs/Hardware/Drivers/pic.jpg")
Cam.stop_preview()

