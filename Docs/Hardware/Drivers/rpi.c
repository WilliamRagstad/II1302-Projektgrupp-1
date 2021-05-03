#include "rpi.h"


int map_peripheral(struct bcm2835_peripheral *p) {
	if ((p->mem_fd = open("/dev/mem", O_RDWR|O_SYNC))<0) {
		printf("cant open /dev/mem, try perms or sudo idk fuck\n");
		return -1;
	}

	p->map = mmap (
		NULL,4096 , 
		PROT_READ|PROT_WRITE,
		MAP_SHARED,
		p->mem_fd,
		p->addr_p);
	if (p->map == MAP_FAILED) {
		perror("mmap");
		return -1;
	}
	p->addr= (volatile unsigned int *)p->map;
	return 0;
}



void unmap_peripheral(struct bcm2835_peripheral *p) {
	munmap(p->map, 4096);
	close(p->mem_fd);
}





int main() {
	if (map_peripheral(&gpio) == -1) {
		printf("fuck me\n");
		return -1;
	}
	INP_GPIO(3);
	OUT_GPIO(3);
	while (1) {
		GPIO_SET=1<<3;
		sleep (1);
		GPIO_CLR=1<<3;
		sleep(1);
	}
	
	return 0;

}
