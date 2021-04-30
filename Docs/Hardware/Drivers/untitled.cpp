#include <stdio.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <unistd.h>

//#include <Viktor.h>
//#include <Basel.h>


#define BLOCKSIZE 4096

//inte egen kod utan lånad för att lära sig mmap
int foo(unsigned int *gpio) {
	
	//öppnar virmem mapping filen
	int fdgpio=open("/dev/gpiomem", O_RDWR);
	//om filen har ej kunnats öppna släng iväg ett felmedelande
	if(fdgpio<0) {
		printf("Error opening /dev/gpiomem try sudo");
		//return code -1 är filbehörighets fel error
		return -1;
	}
	//gpio pekaren antar mmap funktionen.
	gpio=(unsigned int *)mmap(0,BLOCKSIZE,PROT_READ+PROT_WRITE,
				MAP_SHARED,fdgpio,0);
	//skriver ut pekaren
	printf("mmap'd gpiomem at pointer %p\n",gpio);
	
	int temp = gpio[0]&0xfffff8ff;
	temp |= 0x00000100;
	gpio[0] = temp;
	gpio[7] = 1<<7;
	sleep(10);
	//returnerarvärdet av pin 8
	return (gpio[13]&1<<8);
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
	
	unsigned int *test = 0;
	//printar vad GPIO pin 8 är
	foo(test);
	//printf("\nmatiga funktionen ger oss: %d", test);
	return 0;
}
















