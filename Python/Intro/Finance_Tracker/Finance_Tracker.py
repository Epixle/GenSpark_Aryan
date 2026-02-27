import csv

with open('Transactions.csv', newline = '') as transactions:
    reader = csv.reader(transactions)
    next(reader)
    
    for row in reader:
        print(row[0].split("\t"))

def addTransaction():
    return

def listTransactions():
    return

def summary():
    return

def category():
    return

def balance():
    return

def main():
    # Ask user for their decision until they exit
    while True:
        decision = input('''What would you like to do?:
    1. Add transaction
    2. List transactions
    3. Monthly summary
    4. Category breakdown
    5. Show balance
    6. Save and Exit
> ''').strip()

        print() # Buffer

        # Call function depending on input
        match decision:
            case "1": addTransaction()
            case "2": listTransactions()
            case "3": summary()
            case "4": category()
            case "5": balance()
            case "6": break
            case _: print("Input is not valid. Please try again.")

        print() # Buffer