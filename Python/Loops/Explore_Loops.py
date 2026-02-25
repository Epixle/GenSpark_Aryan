num1 = int(input("Enter the starting number: "))

while num1 > 0:
	print(f"{num1}")
	num1 -= 1

print("Blast off!")


num2 = int(input("Enter a number: "))

for i in range(10):
	print(f"{num2} x {i + 1} = {num2 * (i + 1)}")


num3 = int(input("Enter a number: "))

if num3 < 0:
	print(f"The factorial of {num3} is undefined!")
else:
	temp = num3
	total = 1
	while num3 > 0:
		total *= num3
		num3 -= 1

	print(f"The factorial of {temp} is {total}!")
