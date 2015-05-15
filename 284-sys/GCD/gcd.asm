global gcd

section .text

;nasm -felf64 gcd.asm
;gcc euclid.c gcd.o && ./a.out

gcd:
        cmp     rsi, 0                ; y == 0?
        jne     loop                  ; if not, go do work
        mov     rax, rdi              ; otherwise, just return x
        ret

loop:
        mov     rax, rdi 
        xor     rdx, rdx              ; rdx:rax <- x
        div     rsi                   ; rdx <- remainder
        mov     rdi, rsi              ; y
        mov     rsi, rdx              ; x % y
        call    gcd                   ; gcd(y, x % y)
        ret