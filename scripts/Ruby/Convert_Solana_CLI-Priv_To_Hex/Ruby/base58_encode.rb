# A simple function that converts an _integer_ to base58:

def int_to_base58(i)

    @characters = %w[
        1 2 3 4 5 6 7 8 9
      A B C D E F G H   J K L M N   P Q R S T U V W X Y Z
      a b c d e f g h i j k   m n o p q r s t u v w x y z
  ]
  
    # create an empty string (in preparation to hold the new characters)
    buffer = ''
  
    # keep finding the remainder until our starting number hits zero
    while i > 0
      # find the remainder after dividing by 58 (% = modulus)
      remainder = i % 58
  
      # add the base58 character to the start of the string
      buffer = @characters[remainder] + buffer
  
      # divide our integer by 58, and repeat...
      i = i / 58
    end
  
    return buffer
  
  end
  
  puts int_to_base58(123456789) #=> BukQL