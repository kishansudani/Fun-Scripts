def fib(n, dic={}):
    if n in dic.keys():
        return dic[n]
    dic[n] = fib(n - 1, dic) + fib(n - 2, dic)
    print(dic)
    return dic[n]


dic = {1: 1, 2: 1}

print(fib(30, dic))