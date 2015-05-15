#include <stdio.h>
#include <string.h>

char *keyNotes[] = {"A","A#","B","C","C#","D","D#","E","F","F#","G","G#"};

int semitones = sizeof(keyNotes)/sizeof(char*);


int noteToIndex(char *note) {
    for (int i = 0; i < semitones; i++){
        if (strcmp(note, keyNotes[i]) == 0){
            return i;
        }
    }
    return 0;
}



void scaler(char *note, int majOrMin) {

    int major[] = {2,2,1,2,2,2};
    int minor[] = {2,1,2,2,1,2};
    int noteIndex = noteToIndex(note);

    for (int i = 0; i <= 6; i++) {
        printf("%s  ", keyNotes[noteIndex]);

        if (majOrMin == 0){
            //printf("      noteIndex = %d \n", noteIndex);
            noteIndex = noteIndex + major[i];
        } else if (majOrMin == 1) {
            //printf("      noteIndex = %d \n", noteIndex);
            noteIndex = noteIndex + minor[i];
        }

        if (noteIndex >= semitones){ //catches 12+ note indexes & reduces to beginning of scale steps
            noteIndex = noteIndex - semitones;
        }

    }
}


int main(int argc, char** argv) {
    printf("%s major:", argv[1]);
    scaler(argv[1], 0);

    printf("\n%s minor:", argv[1]);
    scaler(argv[1], 1);

    printf("\n");
    return 0;
}
