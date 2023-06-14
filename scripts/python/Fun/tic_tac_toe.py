X_len = []
Y_len = []
plainSheet = [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']]
num = []
dic = {
    0: [0,0,True],1: [0,1,True],2: [0,2,True],3: [1,0,True],4: [1,1,True],5: [1,2,True], 6: [2,0,True], 7: [2,1,True], 8: [2,2,True]
}


def disp():     #for displaying the game on the screen
    for i in range(3):
        for j in range(3):
            print('| ',plainSheet[i][j],end=" ")
        print('|')

def updateList():   #update list of number for which value is not used
    num.clear()     #to empty the list
    for x,y in dic.items():
        if y[2] == True:    #check if value of key in index 2 is True or false
            num.append(x)

def again():    #if user select number which is already in used then this function ask for try again
    while True:
        print('please select any ',num)
        x = int(input())
        if x not in num:
            print('Please select number which is not used')
            continue
        return x


def inputFunc(turn): # for input value
    print(f'{turn} please select any place from ',num)
    val = int(input())
    if val not in num:
        print('Please select number which is not used')
        val = again()
    return dic[val],val #return multiple value {val1 = dict key value} {val2 = selected number for where to place sign}


def startForX():    #this function is for user which choose X
    lis, num = inputFunc('X') #recive multiple value
    plainSheet[lis[0]][lis[1]] = 'X'
    dic[num] = [lis[0],lis[1],False]
    X_len.append(num)

def startForY():    #this function is for user which choose O
    lis, num = inputFunc('O')
    plainSheet[lis[0]][lis[1]] = 'O'
    dic[num] = [lis[0],lis[1],False]
    Y_len.append(num)

def winCondition(winer): # for checking winning condition
    if len(X_len) + len(Y_len) >=5:
        if (plainSheet[0][0] == plainSheet[0][1] == plainSheet[0][2]) and plainSheet[0][2] != ' ':
            winner(winer)
        elif (plainSheet[0][0] == plainSheet[1][0] == plainSheet[2][0]) and plainSheet[2][0] != ' ':
            winner(winer)
        elif (plainSheet[0][0] == plainSheet[1][1] == plainSheet[2][2]) and plainSheet[2][2] != ' ':
            winner(winer)
        elif (plainSheet[1][0] == plainSheet[1][1] == plainSheet[1][2]) and plainSheet[1][2] != ' ':
            winner(winer)
        elif (plainSheet[2][0] == plainSheet[2][1] == plainSheet[2][2]) and plainSheet[2][2] != ' ':
            winner(winer)
        elif (plainSheet[0][2] == plainSheet[1][1] == plainSheet[2][0]) and plainSheet[2][0] != ' ':
            winner(winer)
        elif (plainSheet[0][1] == plainSheet[1][1] == plainSheet[2][1]) and plainSheet[2][1] != ' ':
            winner(winer)
        elif (plainSheet[0][2] == plainSheet[1][2] == plainSheet[2][2]) and plainSheet[2][2] != ' ':
            winner(winer)

def winner(winer):
    print('The winner is ', winer)
    quit()

def startFunc(): #for starting the game
    for i in range(8):
        startForX()
        updateList()
        disp()
        winCondition('X')
        if len(num) == 0:
            print('DRAW')
            quit()
        startForY()
        updateList()
        disp()
        winCondition('O')
    
            

if __name__ == "__main__": 
    updateList()
    startFunc()