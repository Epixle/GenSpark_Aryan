select * from customers;

select CustomerID from customers;

select * from customers where
CustomerID < 25 and
City = 'London';

select * from customers
order by CustomerID desc;

select * from customers
order by CustomerID desc
limit 10;

select CustomerID, CustomerName, City from customers where
CustomerID < 50
order by CustomerID desc
limit 3;