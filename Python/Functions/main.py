import Calculator as calc


# Validates user input
def validate(prompt, negative = True):
    """
    Validates input to make sure it is an integer.
    @param prompt: The question to ask user
    @return: A valid int
    """
    # Keep asking for an input until it is valid
    while True:
        answer = input(prompt).strip()

        # If the input is blank, make user input again
        if not answer:
            print("Input is not valid. Please try again")
            continue

        # If input is a number, return it else make user input again
        if answer.lstrip("-").isdigit():
            value = int(answer)
            
            # If validating decimal, cannot be negative
            if negative or value >= 0:
                return value

        print("Input is not valid. Please try again.")


def getNum(numDigits):
    '''
    Asks the user for the numbers they want to use for their equation
    @param numDigits: Determines how many digits getNum needs to return.
    If 0 is passed, calculate average which is unlimited (*args)
    @return nums: An array with all the numbers needed for the equation.
    '''
    # Create nums list to store numbers to return
    nums = []

    # For calculations other than average, return numDigits values
    if numDigits:
        for i in range(numDigits):
            nums.append(validate(f"What is number #{i + 1}?: "))

        return nums

    i = 1

    # If average, create a loop until user is done adding numbers
    while True:
        # Ask if user wants to add another number
        addNew = input(f"Would you like to add number #{i} (Y/N)?: ").strip().title()

        # If yes, obtain next number else break the loop
        if addNew in ("Yes", "Y"):
            nums.append(validate(f"What is number #{i}?: "))
            i += 1
        elif addNew in ("No", "N"):
            return nums
        else:
            print("Input is not valid. Please try again")


# Ask user for their decision until they exit
while True:
    decision = input('''What would you like to do?:
    1. Add two numbers
    2. Subtract two numbers
    3. Multiply two numbers
    4. Divide two numbers
    5. Power of a number
    6. Find if number is even
    7. Average of multiple numbers
    8. Exit
> ''').strip()

    print() # Buffer

    # Call function depending on input
    match decision:
        case "1": print(calc.add(*getNum(2)))
        case "2": print(calc.sub(*getNum(2)))
        case "3": print(calc.mul(*getNum(2)))
        case "4": print(calc.div(*getNum(2)))
        case "5": print(calc.pow(*getNum(2)))
        case "6": print(calc.isEven(*getNum(1)))
        case "7":
            result = calc.avg(*getNum(0))

            # If a whole number, print it out else round to decimal place user input
            if result.is_integer():
                print(result)
            else:
                places = validate("How many decimal places do you want?: ", negative = False)
                print(round(result, places))
        case "8": break
        case _: print("Input is not valid. Please try again.")

    
    print() # Buffer
