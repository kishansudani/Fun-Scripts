def base58_to_int(base58)

    @characters = %w[
        1 2 3 4 5 6 7 8 9
      A B C D E F G H   J K L M N   P Q R S T U V W X Y Z
      a b c d e f g h i j k   m n o p q r s t u v w x y z
      ]
    
    # create an integer to hold the result
    total = 0
  
    # reverse the base58 string so we can read characters from right to left
    base58 = base58.reverse
    
    # run through each character, including the index so we know how many character we've read
    base58.each_char.with_index do |char, i|
    
      # get the index number for this character
      char_i = @characters.index(char)
      
      # work out how many 58s this character represents (increment the power for each character)
      value  = char_i * (58**i)
      
      # add to total
      total = total + value
    end
  
    return total
  
  end
  
  puts base58_to_int("BukQL") #=> 123456789