#include <stdio.h>
#include <stdint.h>
#include <assert.h>

double powdiff(double x, double y, int32_t b);

int main() {
    assert(powdiff(5, 5, 20) == 0);
    assert(powdiff(50, 45, 10) == 9765625);
    assert(powdiff(206, 204, 20) == 1048576);
    assert(powdiff(206, 204, -3) == 0.125);
    assert(powdiff(-30, -26, -4) == 0.00390625);
    assert(powdiff(16.5, 15, 3) == 3.375);
    puts("All tests passed");
    return 0;
}