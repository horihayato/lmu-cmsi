		global bitCount
		
		section .text

		; nasm -felf64 bitCount.asm
		; gcc bitCountTests.c bitCount.o && ./a.out
		; algorithm from http://stackoverflow.com/questions/109023/how-to-count-the-number-of-set-bits-in-a-32-bit-integer/109117#109117

bitCount:
	
	mov 	esi, edi			;first arg into rdi (edi-32) mov to rsi (esi-32)
	shr		edi, 1
	and		edi, 0x55555555
	sub		esi, edi

	mov		edi, esi
	shr		edi, 2
	and 	edi, 0x33333333
	and 	esi, 0x33333333
	add		edi, esi

	mov		esi, edi
	shr		edi, 4
	add		edi, esi
	and 	edi, 0x0F0F0F0F

	mov		esi, edi
	shr		esi, 8
	add		edi, esi

	mov		esi, edi
	shr		esi, 16
	add		edi, esi

	and 	edi, 0x0000003F

	ret  




					 	;x = x - ((x >> 1) & 0x55555555);
					    ;x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
					    ;x = (x + (x >> 4)) & 0x0F0F0F0F;
					    ;x = x + (x >> 8);
					    ;x = x + (x >> 16);
					    ;return x & 0x0000003F;