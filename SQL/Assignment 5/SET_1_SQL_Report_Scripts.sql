-- TASK 1
-- The question that I will be looking to answer for this set is:
-- Which employees perform excellent and which perform mediocre?

-- TASK 2
-- Retrieve the relevant columns from the 3 different tables
SELECT
	EmployeeID,
    o.OrderID,
    od.Quantity,
    p.Price
FROM orders o
JOIN orderdetails od ON od.OrderID = o.OrderID
JOIN products p ON p.ProductID = od.ProductID;

-- TASK 3
-- Group the columns based on how many items each employee has sold and how much they earned
SELECT
  o.EmployeeID,
  COUNT(DISTINCT o.OrderID) AS Sales,
  COUNT(*) AS ProductsSold,
  SUM(od.Quantity * p.Price) AS Revenue
FROM orders o
JOIN orderdetails od ON od.OrderID = o.OrderID
JOIN products p ON p.ProductID = od.ProductID
GROUP BY o.EmployeeID;

-- TASK 4 AND 5		(5 is fulfilled here because top and bottom employee is obtained)
-- Sort the employees by revenue and set the limit to base a really good and really bad employee.
SELECT
  o.EmployeeID,
  COUNT(DISTINCT o.OrderID) AS Sales,
  COUNT(*) AS ProductsSold,
  SUM(od.Quantity * p.Price) AS Revenue
FROM orders o
JOIN orderdetails od ON od.OrderID = o.OrderID
JOIN products p ON p.ProductID = od.ProductID
GROUP BY o.EmployeeID
HAVING Revenue NOT BETWEEN 25000 AND 100000
ORDER BY Revenue DESC;

-- Using this query, we can determine the best and worst performing employees by revenue and answer the question.
-- The table shows that employee 4 has a very high revenue while employee 9 is very low. Everyone else performs moderately.
-- The business can use this to give employee 4 a pay raise, fire employee 9, etc.