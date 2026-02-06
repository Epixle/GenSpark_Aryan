select *
from orders as o
inner join customers as c
on o.CustomerID = c.CustomerID;

select OrderID, o.CustomerID, CustomerName, Country
from orders as o
inner join customers as c
on o.CustomerID = c.CustomerID;

select OrderID, o.CustomerID, CustomerName, Country
from orders as o
left join customers as c
on o.CustomerID = c.CustomerID;

select OrderID, o.CustomerID, CustomerName, Country
from orders as o
inner join customers as c
on o.CustomerID = c.CustomerID
where Country = 'USA';

select OrderID, o.CustomerID, CustomerName, Country
from orders as o
inner join customers as c
on o.CustomerID = c.CustomerID
order by Country, OrderID;