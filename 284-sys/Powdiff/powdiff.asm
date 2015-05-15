        global  powdiff
        section .text


			    ;xmm0 - x 64bit float
				;xmm1 - y 64bit float
				;rdi - b 8bit signed

				;nasm -felf64 powdiff.asm
				;gcc powdiffTests.c powdiff.o && ./a.out


powdiff:
	mov		rax, 0
	subpd		xmm0,xmm1

pow:
	addpd		xmm0, xmm0
	inc		rax
	cmp		rax, rdi
	je		end
	call	pow

end:
	ret

