select count(*) from orders;

select count(*) from orders
where OrderID > 10300;

select sum(price), avg(price) from products;

select min(price), max(price) from products;

select SupplierID, min(Price), max(Price)
from products
group by SupplierID
having max(Price) > 50;

-- See how much money each order made
select OrderID, sum(Quantity * Price)
from orderdetails as od
join products as p
on od.ProductID = p.ProductID
group by OrderID;