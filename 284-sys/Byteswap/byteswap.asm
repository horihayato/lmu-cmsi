        global  byteswap
        section .text

        ; algorithm from http://www.csharp-examples.net/reverse-bytes/

byteswap:


		mov		rsi, rdi
		mov		rdx, rdi
		mov		rcx, rdi

		and		rdi, 0x000000FF
		shl		rdi, 24

		and 	rsi, 0x0000FF00
		shl		rsi, 8

		and 	rdx, 0x00FF0000
		shr		rdx, 8

		and 	rcx, 0xFF000000
		shr		rcx, 24

		or		rdi, rsi
		or		rdi, rdx
		or		rdi, rcx

		ret



 ;(value & 0x000000FFU) << 24 | (value & 0x0000FF00U) << 8 |
 ;(value & 0x00FF0000U) >> 8 | (value & 0xFF000000U) >> 24