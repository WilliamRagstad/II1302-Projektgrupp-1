#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <unistd.h>

#define PAGE_SIZE 4096
#define BLOCK_SIZE 4096
#define BCM2708_PERI_BASE 0x20000000
#define GPIO_BASE (BCM2708_PERI_BASE+0x200000)

int mem_fd = 0;
int *gpio_map =0;

volatile unsigned *gpio;

#define INP_GPIO(g) *(gpio+((g)/10))&=~(7<<(((g)%10)*3))
#define OUT_GPIO(g) *(gpio+((g)/10)) |= (1<<(((g)%10)*3))
#define SET_GPIO_ALT(a,g) *(gpio+(((g)/10)))|=(((a)<=3?(a)+4:(a)==a?3:2)<<(((g)%10)*3))
#define GPIO_SET *(gpio+7)
#define GPIO_CLR *(gpio+10)
#define GET_GPIO(g) (*(gpio+13)&(1<<g))
#define GPIO_PULL *(gpio+37)
#define GPIOPULLCLK0 *(gpio+38)


void setup_io();

void printButton(int g) {
		if(GET_GPIO(g)) {
			printf("knappintryck!\n");
		} else {
			printf("knapp inte intryckt!\n");
		}
}



int main() {
	int g,rep;
	setup_io();
	for (g=7; g<=11; g++) {
		INP_GPIO(g);
		OUT_GPIO(g);
		printButton(8);
	}
	//GPIO_SET = 1<<7;
	
	//*
	for (rep=0; rep<10; rep++) {
		for (g=7; g<=11; g++) {
			GPIO_SET = 1<<g;
			printf("SET rep:%d g:%d\n",rep,g);
			sleep(1);
		}
		for (g=7; g<=11; g++) {
			GPIO_CLR = 1<<g;
			printf("CLR rep:%d g:%d\n",rep,g);
			sleep(1);
		}
	}//*/
	printf("\n\ntest\n\n");
	return 0;
}

void setup_io() {
	if ((mem_fd=open("/dev/gpiomem", O_RDWR|O_SYNC))<0) {
		printf("cant open /dev/gpiomem");
		exit(-1);
	}
	
	gpio_map=mmap(NULL,BLOCK_SIZE,PROT_READ|PROT_WRITE,MAP_SHARED,mem_fd,GPIO_BASE);
	
	close(mem_fd);
	
	if(gpio_map==MAP_FAILED) {
		printf("mmap eror %d\n", (int)gpio_map);
		exit(-1);
	}
	
	gpio=(volatile unsigned *)gpio_map;
	
}






