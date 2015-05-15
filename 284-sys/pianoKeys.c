#include <stdio.h>
#include <string.h>
#include <math.h>

char *keyNotes[] = {"A","A#","B","C","C#","D","D#","E","F","F#","G","G#"};
/*Begins at A0 - 27.5000 up to C8 - 4186.0100 */

int semitones = sizeof(keyNotes)/sizeof(char*);

int octave = 0;

int main() {
    for (int i = 0; i < 88; i++) {

        char *note = keyNotes[(i%semitones)];

        if(strcmp(note, "C") == 0){
        	octave++;
        }

        double freq = pow(2.0, (double)i/semitones) * 27.5;

        printf("%s%d - Freq: %f \n", note, octave, freq);
    }

    return 0;

}