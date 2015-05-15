#include <stdlib.h>


char* rotater(char* s, int k) {
    int length = strlen(s);
    char* result = malloc(length);
    int place = 0;

    for (int i = k; i < length; i++){ //Puts non-rotated chars starting at k-th place
        //printf("here0 and place is %d\n", place);
        result[place++] = s[i];
    } 

    for (int i = 0; i < k; i++){//Puts rotated chars up to k-th place
        //printf("here1 and place is %d\n", place);
        result[place++] = s[i];
    } 

    result[length] = '\0';

    return result;
}