import itertools
import os

os.system('cls')

# 4 diffrent combinations


def quads(n, required_results=None):
    arr1, arr2, arr3, arr4 = range(
        1, n+1), range(1, n+1), range(1, n+1), range(1, n+1)
    results = set()
    for combination in itertools.product(arr1, arr2, arr3, arr4):
        results.add(combination)
        if (required_results and required_results == len(results)):
            break
    return results


val = list(quads(4))
print(val)