global main

extern puts

;nasm -felf64 character-lister.asm
;gcc character-lister.o && ./a.out



section .text


main:
        mov     rdx, buffer           ; rdx will be next memory cell to fill
        mov     al, 32                ; al is next character to store
lister:
        mov byte     [rdx], al             ; store character in memory
        inc     al                     ; next character
        inc     rdx                    ; next memory cell

        cmp     al, 127               ; are we done?
        je      end                      ; yes
        test    al, 15                ; should we write a newline next?
        jnz     lister                      ; nah, just do next character
        mov byte    [edx], 10             ; store a newline
        inc     rdx                    ; remember to "skip over" the newline
        jmp     lister                      ; and go to next character
end:
        mov byte   [rdx], 0             ; store string terminator for puts
        mov     rdi, buffer
        call    puts
        ret

; Storing all chars
        section .bss
buffer:
        resb  101