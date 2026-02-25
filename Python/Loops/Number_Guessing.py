import random

number_to_guess = random.randint(1, 100)

print("Guess what the number is (1 - 100)")

guess = 0
count = 0
while guess != number_to_guess:
	guess = int(input("\nEnter a number: "))
	count += 1

	if count == 10 and guess != number_to_guess:
		print("Game over! You couldn't get it time! Better luck next time.")
		break

	if guess > number_to_guess:
		print("Too high! Guess again.")
	elif guess < number_to_guess:
		print("Too low! Guess again.")
	else:
		print(f"Congratulations! You guessed it! Guessed it in {count} attempts!")
