# Get user input of string. Repeat until valid input
while True:
	s = input("Enter a string: ")

	# If valid, break loop
	if s:
		break

	print("Input is not valid, please try again\n")


# Print length of string
print(len(s))

# Split string and print length of resulting array
strArray = s.split(" ")
print(len(strArray))

# Print cleaned string
print(s.strip())

# Print string with
print(s.lower())

# Print string upper
print(s.upper())

# Gets user input of word to replace. Repeats until valid input
while True:
	replace = input("\nWhat word would you like to replace?: ")

	if replace:
		break

	print("Input is not valid, please try again\n")

# If input is in the string, continue with replacement process else end program
if replace.lower() in s.lower():
	# Asks if user wants to replace word. Repeats until valid input
	while True:
		print(f"\nThis word has been found in position {s.lower().find(replace.lower())}.")
		decision = input("Would you like to replace it (Y/N)?: ")

		if decision:
			break
		
		print("Input is not valid, please try again\n")

	if decision.lower() == "y":
		# Gets user input of replacement word. Repeats until valid input
		while True:
			replacement = input("\nWhat would you like to replace it with?: ")

			if replacement:
				break

			print("Input is not valid, please try again\n")
		
		# Print out the string with the chosen word replaced with new word and add Title Case
		print(f"\n{s.lower().replace(replace.lower(), replacement.lower()).title()}")
else:
	print("Could not find this word. Ending program")
