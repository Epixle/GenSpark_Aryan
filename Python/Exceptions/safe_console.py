'''
WHAT ERRORS ARE HANDLED AND HOW

There are 4 functions that support safety/error handling.

main(): The main function has two cases where a ValueError is thrown. The first is when
the program is converting the user input to int. If the user has not properly input a
number, it will throw a value error that gets caught by the exception ValueError block.
If the input is an int but it is not one of the used numbers, the code raises a ValueError
exception that goes into the same block. 

Once the user chooses a valid input, it goes into the 3 tools which also have safeties.

safeNumParser(): This asks for the user's age and, just like main(), gets an input and
converts it to int. If the input is not an int, it throws a ValueError. It also throws a
ValueError if the input is a negative number. The error says that age needs to be positive
and retries giving the user the option to go back to menu by entering -1.

safeListAccess(): Like main() and safeNumParser(), this asks for a choice input that
needs an int. If it's not an int, it throws a ValueError and explains that number needs
to be positive. If an int is entered, then it checks the list for the value. If the number
is too big/out of bounds, the program throws a IndexError that is caught and gives a
traceback-like explanation that the input was out of bounds and the user needs to re-input
a value within 0-4, the proper bounds. This try except block also includes else and finally
to represent the complete structure.

safeDictLookup(): This method asks the user for the key they want to lookup and tries to
do a get() on the dictionary. If the key is not in the dictionary, it returns a default
value that gets printed and explains the key was not found.

Both safeListAccess() and safeDictLookup() asks at the very end if the user wants to
retry or go to the menu, so this just does a very simple switch block that gets a yes or
no input. If neither are found, it terminates the program.
'''
# safe_console.py

def safeNumParser():
    while True:
        try:
            age = int(input("How old are you? (-1 to return to menu): ").strip())

            if age == -1:
                return "Exited from number parser"
            elif age < 0:
                raise ValueError
            
            return age
        except ValueError:
            print("Age must be a whole number! Please try again")
        finally:
            print()


def safeListAccess():
    while True:
        myList = ["Apple", "Banana", "Orange", "Mango", "Pear"]
        print(myList)
        
        try:
            index = int(input("What is your favorite fruit (0-4)?: ").strip())

            favorite = myList[index]
        except ValueError:
            print("You entered text or an empty input instead of a whole number! Please try again")
        except IndexError:
            print("Out of bounds for this array! Choose a number that is between 0 and 4 inclusive")
        else:
            print(f"Your favorite fruit is {favorite}! Mine is Mango!")
        finally:
            again = input("Do you want to try again (Y/N)?: ").strip().title()

            if again in ("Yes", "Y"):
                print()
                continue
            elif again in ("No", "N"):
                print()
                break
            else:
                print("Input not recognized - going back to menu")
                print()
                break

def safeDictLookup():
    while True:
        myDict = {"fname": "Albert", "lname": "Einstein", "country": "Germany", "age": 76, "E": "mc^2"}
        print(myDict.keys())

        key = input("What do you want to know?: ").strip()

        print(f"{key}:", myDict.get(key, "This value was not found"))

        again = input("Do you want to try again (Y/N)?: ").strip().title()
        
        if again in ("Yes", "Y"):
            print()
            continue
        elif again in ("No", "N"):
            print()
            break
        else:
            print("Input not recognized - going back to menu")
            print()
            break

def main():
    while True:
        try:
            decision = int(input('''What would you like to do?:
    1. Safe Number Parser
    2. Safe List Access
    3. Safe Dictionary Lookup
    4. Exit
> ''').strip())

            print() # Buffer

            # Call function depending on input
            match decision:
                case 1: 
                    result = safeNumParser()
                    
                    if isinstance(result, int):
                        print(f"You are {result} years old!")
                    else:
                        print(result)
                case 2: safeListAccess()
                case 3: safeDictLookup()
                case 4: break
                case _: raise ValueError

            print() # Buffer

        except ValueError:
            print("Input not recognized. Need to choose a number between 1-4.")

main()