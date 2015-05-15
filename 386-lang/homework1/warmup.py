#1
def change(i):
    q, remainder = divmod(i, 25)
    d, remainder = divmod(remainder, 10)
    n, p = divmod(remainder, 5)

    return q, d, n, p



#2 
#similar to http://stackoverflow.com/questions/4371231/removing-punctuation-from-python-list-items
def strip_quotes(s):
    return "".join(c for c in s if c not in ('\'','\"'))



#3
import random

def scramble(s):
    length = len(s)

    return "".join(random.sample(s, length))


#4
def powers_of_two(i):
    x = 1

    while x <= i:
        yield x
        x = x * 2


#5
def prefixes(s):
    s = s + " "
    string = s
    length_scale = 1

    while length_scale < len(s):
        i = -1 * (len(s) - length_scale)
        string = s[:i]
        length_scale = len(string) + 1
        yield string


#6
def interleave(x, y):
    result = []
    lenx = len(x)
    leny = len(y)

    # Interleaves pairs
    result = zip(x,y)

    # Adds leftover tail
    result += x[leny:] + y[lenx:]

    return result




#7
def stutter(array):
    return interleave(array, array)






