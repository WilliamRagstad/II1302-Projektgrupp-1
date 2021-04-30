#include "rpi.h"

int main(){
	if (map_peripheral(&gpio)==-1) {
		printf("failed to map\n");
		return -1;
	}
	INP_GPIO(4);
	OUT_GPIO(4);
	
	while(1) {
		GPIO_SET = 1 << 4;
		sleep(1);
		
		GPIO_CLR(4);
		sleep(1);
	}
	return 0;
}
