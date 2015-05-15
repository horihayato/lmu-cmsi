#include <stdio.h>
#include <stdint.h>
#include <assert.h>
#include <inttypes.h>

uint32_t bitCount(uint32_t x);

int main() {
    assert(bitCount(0) == 0);
    assert(bitCount(-1) == 32);
    assert(bitCount(0x264b743d) == 15);
    assert(bitCount(0x12345678) == 13);
    puts("All tests passed");
    return 0;
}