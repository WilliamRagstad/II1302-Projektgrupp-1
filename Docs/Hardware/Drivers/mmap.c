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
	
	return gpio[13]&(1<<8);
}

int main() {
	
	/*
	programstruktur:
	* start läser in värdena
	* 
	* formaterar
	* 
	* etablerar en binding till servern
	* 
	* skickar videon
	* 
	* skickar resten datan
	* 
	* gör att videon nu skriver vidare tills den får slut på disk minne
	* (i test fallet kör vi på en hel minuts lagring)
	//*/
	
	
	
	printf("\nmatiga funktionen ger oss: %ld", foo());
	
	return 0;
}

















