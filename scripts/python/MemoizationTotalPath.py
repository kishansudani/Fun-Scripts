def path(m,n, dic = {}):
    val = str(m)+':'+str(n)
    if val in dic.keys():
        return dic[val]
    if(m == 0 or n ==0):
        return 0
    if(m == 1 and n == 1):
        return 1
    dic[val] = path(m-1, n, dic) + path(m, n-1, dic)
    print(dic)
    return dic[val]

print(path(18,18))