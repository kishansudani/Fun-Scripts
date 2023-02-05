"""
Warning this file is not completed yet.
DO not use this file.
"""

player = []
computer_Ai = []
num = []
plainSheet = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]
dic = {
    1: [0, 0, True],
    2: [0, 1, True],
    3: [0, 2, True],
    4: [1, 0, True],
    5: [1, 1, True],
    6: [1, 2, True],
    7: [2, 0, True],
    8: [2, 1, True],
    9: [2, 2, True]
}


def dis():
    for i in range(3):
        for j in range(3):
            print('| ', plainSheet[i][j], end=" ")
        print('|')


def updateList():
    num.clear()  # to empty the list
    for x, y in dic.items():
        if y[2] == True:  # check if value of key in index 2 is True or false
            num.append(x)


def winCondition():
    pass


def again():  # if user select number which is already in used then this function ask for try again
    while True:
        print('please select any ', num)
        x = int(input())
        if x not in num:
            print('Please select number which is not used')
            continue
        return x


def inputFunc(turn):  # for input value
    print(f'{turn} please select any place from ', num)
    val = int(input())
    if val not in num:
        print('Please select number which is not used')
        val = again()
    # return multiple value {val1 = dict key value} {val2 = selected number for where to place sign}
    return dic[val], val


def playerTurn():
    lis, num = inputFunc('X')  # recive multiple value
    plainSheet[lis[0]][lis[1]] = 'X'
    dic[num] = [lis[0], lis[1], False]
    player.append(num)
    updateList()
    dis()
    winCondition()


def computerTurn():
    pass


def main():
    updateList()
    while True:
        playerTurn()
        computerTurn()


if __name__ == "__main__":
    main()