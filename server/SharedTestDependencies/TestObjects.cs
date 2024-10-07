using Bogus;
using DataAccess.Models;

namespace SharedTestDependencies;

public class TestObjects
{
    
    public static Order CreateOrder()
    {
        return new Faker<Order>()
            .RuleFor(o => o.CustomerId, f => f.Random.Int(1,100))
            .RuleFor(o => o.OrderDate, f => DateTime.UtcNow)
            .RuleFor(o => o.DeliveryDate, f => DateOnly.FromDateTime(f.Date.Future()))
            .RuleFor(o => o.TotalAmount, f => f.Random.Double(10, 1000))
            .RuleFor(o => o.OrderEntries, f => new Faker<OrderEntry>()
                .RuleFor(oe => oe.ProductId, f => f.Random.Int(1, 50)) 
                .RuleFor(oe => oe.Quantity, f => f.Random.Int(50, 100)) 
                .Generate(2)); 
    }
    public static CreateOrderDto CreateOrderDto()
    {
        return new Faker<CreateOrderDto>()
            .RuleFor(o => o.CustomerId, f => f.Random.Int(1,100))
            .RuleFor(o => o.DeliveryDate, f => DateOnly.FromDateTime(f.Date.Future()))
            .RuleFor(o => o.TotalAmount, f => f.Random.Double(10, 1000))
            .RuleFor(o => o.OrderEntries, f => new Faker<CreateOrderEntryDto>()
                .RuleFor(oe => oe.ProductId, f => f.Random.Int(1, 50)) 
                .RuleFor(oe => oe.Quantity, f => f.Random.Int(2, 5)) 
                .Generate(2)); 
    }
    
    public static Paper CreatePaper()
    {
        return new Faker <Paper>()
            .RuleFor(p => p.Id, f => f.Random.Int(1,100))
            .RuleFor(p => p.Name, f => f.Commerce.ProductName()) 
            .RuleFor(p => p.Stock, f => f.Random.Int(7, 100)) 
            .RuleFor(p => p.Price, f => f.Random.Double(1.0, 100.0)) 
            .RuleFor(p => p.Properties, f => new Faker<Property>()
                    .RuleFor(p => p.Id, f => f.Random.Int(1,100))
                    .RuleFor(p => p.PropertyName, f => f.Commerce.Color()) // Generate a fake property name
                    .Generate(3)
            );

    }
    
    public static Customer CreateCustomer() 
    {
        return new Faker<Customer>()
            .RuleFor(c => c.Id, f => f.Random.Int(1, 1000))
            .RuleFor(c => c.Name, f => f.Name.FullName())
            .RuleFor(c => c.Address, f => f.Address.StreetAddress())
            .RuleFor(c => c.Phone, f => f.Phone.PhoneNumber())
            .RuleFor(c => c.Email, f => f.Internet.Email())
            .RuleFor(c => c.Orders, f => new List<Order>());  
    }
    
    public static List<OrderEntry> CreateOrderEntries(int count)
    {
        return new Faker<OrderEntry>()
            .RuleFor(oe => oe.ProductId, f => f.Random.Int(1, 50)) // Random Product ID
            .RuleFor(oe => oe.Quantity, f => f.Random.Int(50, 100)) // Random Quantity
            .RuleFor(oe => oe.OrderId, f => f.Random.Int(1, 100)) // Random Order ID (Optional)
            .RuleFor(oe => oe.Product, f => TestObjects.CreatePaper()) // Generate a fake Paper (Product)
            .Generate(count); // Generate 'count' number of OrderEntries
    }
}