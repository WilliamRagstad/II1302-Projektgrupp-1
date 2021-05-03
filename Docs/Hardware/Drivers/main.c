#include "rpi.h"
//struct bcm2835_peripheral gpio = {GPIO_BASE};

int main(void){
	
	
	if (map_peripheral(&gpio)==-1) {
		printf("failed to map\n");
		return -1;
	}
	INP_GPIO(4);
	OUT_GPIO(4);
	
	while(1) {
		GPIO_SET = 1 << 4;
		sleep(0.01);
		
		GPIO_CLR = 1 << 4;
		sleep(0.01);
	}
	return 0;
}
