import csv
from datetime import datetime

def loadTransactions():
    transactions = []

    try:
        with open("Transactions.csv", newline = "") as file:
            reader = csv.reader(file)

            # Skip the header
            next(reader, None)
            
            for row in reader:
                if len(row) < 4:
                    continue

                date_s = row[0].strip()
                ttype = row[1].strip().lower()
                amt_s = row[2].strip()
                cat = row[3].strip()
                note = row[4].strip() if len(row) > 4 else ""

                # basic safety if file contains bad rows
                try:
                    date_obj = datetime.strptime(date_s, "%Y-%m-%d").date()
                    amount = float(amt_s)
                except ValueError:
                    continue

                if ttype not in ("income", "expense"):
                    continue

                transactions.append([date_obj, ttype, amount, cat, note])

            return transactions
    except FileNotFoundError:
        print("Could not find file")
        return []

def saveTransactions(transactions):
    with open("Transactions.csv", "w", newline = "", encoding = "utf-8") as file:
        writer = csv.writer(file)

        writer.writerow(["date", "type", "amount", "category", "note"])

        for row in transactions:
            writer.writerow([row[0].strftime("%Y-%m-%d"), row[1], f"{row[2]:.2f}", row[3], row[4]])

def getValidDate(prompt):
    while True:
        s = input(prompt).strip()
        try:
            return datetime.strptime(s, "%Y-%m-%d").date()
        except ValueError:
            print("Invalid date. Use YYYY-MM-DD (example: 2025-10-31).")


def getValidFloat(prompt):
    while True:
        s = input(prompt).strip()
        try:
            value = float(s)
            if value <= 0:
                print("Amount must be greater than 0.")
                continue
            return value
        except ValueError:
            print("Invalid amount. Enter a number (example: 12.50).")


def addTransaction(transactions):
    print("Add Transaction")

    date_obj = getValidDate("Date (YYYY-MM-DD): ")

    while True:
        ttype = input("Type (income/expense): ").strip().lower()
        if ttype in ("income", "expense"):
            break
        print("Invalid type. Enter 'income' or 'expense'.")

    amount = getValidFloat("Amount: ")

    category = input("Category: ").strip()
    while not category:
        print("Category cannot be blank.")
        category = input("Category: ").strip()

    note = input("Note (optional): ").strip()

    transactions.append([date_obj, ttype, amount, category, note])
    print("Transaction added.")


def listTransactions(transactions):
    print("Transactions (latest first)")

    if not transactions:
        print("No transactions yet.")
        return

    # newest date first
    ordered = sorted(transactions, key = lambda row: row[0], reverse = True)

    for row in ordered:
        sign = "+" if row[1] == "income" else "-"
        
        note = f" | note: {row[4]}" if row[4] else ""
        
        print(f"{row[0].strftime('%Y-%m-%d')} | {row[1]:<7} | {sign}${row[2]:,.2f} | {row[3]}{note}")


def showBalance(transactions):
    income = sum(t[2] for t in transactions if t[1] == "income")
    expense = sum(t[2] for t in transactions if t[1] == "expense")
    bal = income - expense

    print("Totals")
    print(f"Income  : ${income:,.2f}")
    print(f"Expenses: ${expense:,.2f}")
    print(f"Balance : ${bal:,.2f}")


def categoryBreakdown(transactions):
    # Top 3 categories by expense spend
    spend = {}

    for t in transactions:
        if t[1] != "expense":
            continue
        cat = t[3] if t[3] else "Uncategorized"
        spend[cat] = spend.get(cat, 0.0) + t[2]

    print("Category breakdown (top 3 by spend)")

    if not spend:
        print("No expenses yet.")
        return

    ranked = sorted(spend.items(), key=lambda kv: kv[1], reverse=True)[:3]
    for i, (cat, total) in enumerate(ranked, start=1):
        print(f"{i}. {cat}: ${total:,.2f}")


def monthlySummary(transactions):
    while True:
        month = input("Enter month (YYYY-MM): ").strip()
        try:
            dt = datetime.strptime(month + "-01", "%Y-%m-%d").date()
            year, mon = dt.year, dt.month
            break
        except ValueError:
            print("Invalid month. Use YYYY-MM (example: 2025-10).")

    month_txns = [t for t in transactions if t[0].year == year and t[0].month == mon]

    print(f"Monthly summary for {year:04d}-{mon:02d}")

    if not month_txns:
        print("No transactions in this month.")
        return

    income = sum(t[2] for t in month_txns if t[1] == "income")
    expense = sum(t[2] for t in month_txns if t[1] == "expense")
    net = income - expense

    print(f"Income  : ${income:,.2f}")
    print(f"Expenses: ${expense:,.2f}")
    print(f"Net     : ${net:,.2f}")


def main():
    transactions = loadTransactions()

    while True:
        decision = input('''What would you like to do?:
1. Add transaction
2. List transactions
3. Monthly summary
4. Category breakdown
5. Show balance
6. Save & Exit
> ''').strip()

        print()

        match decision:
            case "1": addTransaction(transactions)
            case "2": listTransactions(transactions)
            case "3": monthlySummary(transactions)
            case "4": categoryBreakdown(transactions)
            case "5": showBalance(transactions)
            case "6":
                saveTransactions(transactions)
                print("Saved to Transactions.csv")
                break
            case _: print("Input is not valid. Please try again.")

        print()


main()