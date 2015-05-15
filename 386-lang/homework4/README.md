

2] Eliminated in class 11/25

<br><br><br>




3]
####Python:
```
def findMin(a, i = 0, currMin = None):
  if i == len(a) - 1:
    if a[i] < currMin: 
      return a[i] 
    else:
      return currMin

  elif a[i] < currMin:
    currMin = a[i]

  elif currMin == None:
    currMin = a[i]

  return findMin(a, i + 1 , currMin)
```





####C:
```
int minHelper (int* a, int len, int i, int currMin) {
  if (i == len - 1) {
    if (a[i] < currMin) {
      return a[i];
    } else {
      return currMin;
    }
  }

  else if (a[i] < currMin) {
    currMin = a[i];
  }

  return minHelper(a, len, i + 1, currMin);
}

int findMin(int* a, int len) {
  return minHelper(a, len, 0, a[0]);
} 
```






####JavaScript:
```
function findMin(a, i, currMin) {
    if (i === undefined){
    	i = 0;
    }

    if (i === a.length - 1) {
	    if (a[i] < currMin) {
	      return a[i];
	    } else {
	      return currMin;
	    }
    }

    else if (currMin === undefined) {
        currMin = a[i]
    }

    else if (a[i] < currMin) {
		currMin = a[i] 
	}

    return findMin(a, i + 1, currMin)
} 
```







<br><br><br>


4]
####For C:

a is an array of n pointers to doubles. <br>
b is a pointer to array of n doubles.<br>
c is an array of n pointers to a function returning doubles.<br>
d is a function returning a pointer to an array of n doubles.<br>

####In Go:
 ```
var a [n]*float64
var b *[n]float64
var c [n]*func()float64
var d func()*[n]float64
 ```
####In Rust:
 ```
let a: [*mut f64, ..n];          
let b: *mut [f64, ..n];       
let c: [fn() -> f64, ..n];     
fn d() -> *mut [f64, ..n];        
 ```




<br><br><br>



5]

In regards to the primitive types (int y) these two structs are structurally equivalent. However, when we consider that they are both pointing to one another, there is a very likely possibility that it a program using these structs will get caught in an infinite loop. We can say that the two structs are structurally equivalent on the most basic level, but because the code is extremely error prone, it is crucial that the complier checks other "non-primitive" types for a definitive type. What I mean by this is: the complier cannot with absolute certainty assert the type of the pointer for x in struct A because it points to struct B (potentially in a loop), which is not as definitive as x pointing to a final "C" class.






<br><br><br>




6]

####JavaScript:
```
function a() {
	console.log("uno");
}

function b() {
	console.log("dos");
}

function evalOrder(first, second) {}

evalOrder(a(), b());
```



<br><br><br>




7]


After main() is put on the stack, foo() is called and placed on top of the stack. In foo(), int i is never initialized with a value or assigned a value. int i is incremented within the printf() in foo(), and although i was never properly initialized the i = i + 1 (i++) works as expected. This is because each time that foo() is called, the new space in the stack remains where the previous foo() call was stored.<br><br>

In other systems where 0 1 2 3 4 5 6 7 8 9 is not printed, subsequent foo() calls do not remain in the same storage space as previous calls, and thus, i remains uninitialized.





<br><br><br>



8]

Shallow Binding: 10203040<br>
Deep Binding: 10020044<br><br>

In the shallow binding scenario, every call to setX() and printX() within foo uses the local variable x, while all calls made in the main section (not passed to foo()) use the global x. In deep binding, S & P within foo() use the global x because the setX() and printX() passed to foo() in the main section already refer to the global x, as opposed to the local x in shallow binding.




<br><br><br>


9]

In the given Fortran program, 2 is passed by reference into foo(), which then increments the value to 3. This effects the print* 2 statement also, because all hard-coded, non-variable 2s refer back to the same address in memory.<br><br>

New versions of Fortran most likely solve this issue by passing an individual reference for each value, which would serve to protect other equivalent values being used for other things.




<br><br><br>





10]


a) 1, 2, 3, 4<br>
b) 2, 2, 2, 4<br>
c) 2, 2, 3, 4<br>
d) 2, 2, 3, 3<br>


