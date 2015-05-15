#include <stdlib.h>

/* Macro "if x is less than y, return y else return x" */
#define maxChar(x,y)((x)<(y)?(y):(x));

char* maxString(char* a, char* b) {

    /* Determine which string is largest & make space */
    int largest = maxChar(strlen(a), strlen(b));

    //printf("%d", n);
    char* result = malloc(largest);

    for (int i = 0; i < largest; i++) {
    	//printf("%c", result[i] );
    	result[i] = maxChar(a[i], b[i]);
    }

    result[largest] = '\0';

    return result;
}