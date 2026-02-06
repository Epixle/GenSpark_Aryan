-- The question that I will be looking to answer for this set is:
-- What products are sold frequently in each country?

-- Retrieve the relevant columns from the 3 different tables
SELECT
  s.Country,
  p.ProductID,
  p.ProductName,
  od.Quantity
FROM orderdetails od
JOIN products p   ON p.ProductID = od.ProductID
JOIN suppliers s  ON s.SupplierID = p.SupplierID;

-- Group the results by the country and the product
SELECT
  s.Country,
  p.ProductID,
  p.ProductName,
  SUM(od.Quantity) AS UnitsSold
FROM orderdetails od
JOIN products p   ON p.ProductID = od.ProductID
JOIN suppliers s  ON s.SupplierID = p.SupplierID
GROUP BY
  s.Country,
  p.ProductID,
  p.ProductName;

-- Retrieve only the countries where more than 100 units of that product has been sold
SELECT
  s.Country,
  p.ProductID,
  p.ProductName,
  SUM(od.Quantity) AS UnitsSold
FROM orderdetails od
JOIN products p   ON p.ProductID = od.ProductID
JOIN suppliers s  ON s.SupplierID = p.SupplierID
GROUP BY
  s.Country,
  p.ProductID,
  p.ProductName
HAVING UnitsSold >= 100
ORDER BY
  s.Country,
  ProductID
  
-- The final table shows products where there are more than 100 units sold in that country.
-- This can help show companies what products they might need to stock up on either in general,
-- or for that specific country.