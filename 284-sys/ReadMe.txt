System Organization - Fall 2013
=============================

Small Application Programs in C and Assembly.

=============================
C
=============================

pianoKeys - Names of the 88 piano keys and their frequencies.

scales - Input a key & output major and minor scale.

maxString - Takes in two "strings" and returns a new string containing, in each position i, the maximum of the two characters at corresponding positions of the two input strings. 

rotate - Takes in a string s and an int k and returns a newly allocated string which is the k-fold left rotation of s.

=============================
NASM Assembly
=============================
Bit Count - Write a 64-bit assembly language function to return the number of 1-bits in its sole argument, a 32-bit integer.

Byteswap - Write an assembly language function that reverses the byte order of a 4-byte integer, for example 0x3d744b26 would be turned into 0x264b743d. The function should accept a pointer to the integer to be converted.

Character Lister - Write a 64-bit assembly language program, using a C library, that writes Unicode characters U+0020 through U+007E to standard output, 16 characters per line.

GCD - Write a 64-bit assembly language function, in its own file, that computes the GCD of its two input arguments. Assume the arguments are unsigned numbers. Use Euclid's algorithm, which says that: 

gcd(x, y) = (y == 0) ? x : gcd(y, x mod y)


Power of Difference (Powdiff) - Write a 64-bit assembly language function of three arguments: the first is a 64-bit floating point value x, the second is a 64-bit floating point value y, and the third is an 8-bit signed integer b; the function returns the 64-bit floating point value (x−y)^b.
