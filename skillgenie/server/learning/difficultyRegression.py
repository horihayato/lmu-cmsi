import sys
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import random

# algorithm from 
# http://stackoverflow.com/questions/17784587/gradient-descent-using-python-and-numpy/17796231#17796231

# Given a history of posts, considering the "time spent" between their inception and completion,
# their difficulty, and only if the user judged themselves as successful; what is the optimal time spent for
# successful completion of a task based on difficulty.

def gradientDescent(x, y, theta, alpha, m, numIterations):
    xTrans = x.transpose()
    for i in range(0, numIterations):
        hypothesis = np.dot(x, theta)
        loss = hypothesis - y
        cost = np.sum(loss ** 2) / (2 * m)

        # print x, theta, hypothesis
        # print("Iteration %d | Cost: %f" % (i, cost))

        gradient = np.dot(xTrans, loss) / m
        theta = theta - alpha * gradient

    return theta


def genData(arr):	
    arr = arr.split(",")
    arr = [ int(x) for x in arr ]
    length = len(arr) / 2

    constant = arr[0::2]
    z = [1] * length
    constant = zip(z, constant)

    target = arr[1::2]

    return constant, target


x, y = genData(sys.argv[1])
m, n = np.shape(x)
numIterations= 100
alpha = 0.0005
theta = np.ones(n)

theta = gradientDescent(np.array(x), np.array(y), theta, alpha, m, numIterations)
print theta[0], theta[1]







#this portion exists only for sampling purposes (viewing the best fit line, points, etc):
def toPoints(a, b):
    x = []
    y = []

    for i in range(0, len(a)):
        x.append(a[i][1])
        y.append(b[i])

    return x, y


oriX, oriY = toPoints(x, y)

#generating sample best fit data
sampleDiff = [random.randint(1, 50) for i in range(100)]
est = []
for i in range(len(sampleDiff)):
    est.append(sampleDiff[i]*theta[0] + theta[1])

#printing original points
print oriX
print oriY
#printing best fit sample
print sampleDiff
print est


# #graphing original data and sample
# fig = plt.figure()
# ax1 = fig.add_subplot(111)

# ax1.scatter(oriX, oriY,  c='b', marker="s", label='Original Data')
# ax1.scatter(sampleDiff, est,  c='r', marker="o", label='Best Fit Sample')
# plt.legend(loc='upper left');
# plt.axis([0, 50, 0, 100])
# plt.show()

