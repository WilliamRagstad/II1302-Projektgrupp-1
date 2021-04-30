#include <stdio.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <unistd.h>

//#include <Viktor.h>
//#include <Basel.h>



//inte egen kod utan lånad för att lära sig mmap
long foo(void) {
	int fdgpio=open("/dev/gpiomem", O_RDWR);
	if(fdgpio<0) {
		printf("Error opening /dev/gpiomem try sudo");
		return -1;
	}
	unsigned int *gpio=(unsigned int *)mmap(0,4096,PROT_READ+PROT_WRITE,
				MAP_SHARED,fdgpio,0);
	printf("mmap'd gpiomem at pointer %p\n",gpio);
	
	printf("GPLEV0 = %d\n", gpio[13]);
	
	printf("GPSET0 = %d\n", gpio[7]);

	printf("GPCLR0 = %d\n", gpio[10]);

	for (int i = 1; i<5; i++) {
		printf("GPFSEL%d = %d\n",i, gpio[i]);
	}
return gpio[13]&(1<<8);
}

int main() {
	
	/*
	programstruktur:
	* main.c tar funktions deklarationer från mmap.h, 
	* acelerometer.h och gps.h
	* 
//*/
	
	
	
	printf("\nfoo ger oss: %ld", foo());
	
	return 0;
}

















