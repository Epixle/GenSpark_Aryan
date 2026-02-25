# Gets user input of their age and converts it into int for later use
age = int(input("How old are you? "))

# If age is greater than 18, say they can vote else find the difference and print how many years left
if age >= 18:
	print("Congratulations! You are eligible to vote. Go make a difference!")
else:
	print(f"Oops! You're not eligible yet. But hey, only {18 - age} more years to go!")
