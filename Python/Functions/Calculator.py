def add(a, b):
	'''Returns the sum of two input numbers'''
	return a + b

def sub(a, b):
	'''Returns the difference of two input numbers'''
	return a - b

def mul(a, b):
	'''Returns the product of two input numbers'''
	return a * b

def div(a, b, decimal = 2):
	'''Returns the quotient of two input numbers
	@param a: Numerator of division equation
	@param b: Denominator of division equation
	@param decimal: Determines how many digits final answer rounds to
	@returns: Quotient if equation can be divided, string warning if denominator is 0'''
	return round(a / b, decimal) if b != 0 else "Cannot divide by 0"

def pow(a, b):
	'''Returns first input raised to the second input
	@param a: The base of the equation
	@param b: The exponent that raises the base
	@return: a raised to the b'''
	return a**b

def isEven(a):
	'''Returns boolean on if input is even'''
	return a % 2 == 0

def avg(*a):
	'''Returns the average of a list of numbers (0 if empty)
	Takes *args as input so list can be varying sizes
	@param *a: A varying length list of numbers
	@return: Average of list or 0 if list is empty'''
	return sum(a) / len(a) if len(a) != 0 else 0.0
