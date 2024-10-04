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
    
    public static Paper CreatePaper()
    {
        return new Faker <Paper>()
            .RuleFor(p => p.Id, f => f.Random.Int(1,100))
            .RuleFor(p => p.Name, f => f.Commerce.ProductName()) 
            .RuleFor(p => p.Stock, f => f.Random.Int(0, 100)) 
            .RuleFor(p => p.Price, f => f.Random.Double(1.0, 100.0)) 
            .RuleFor(p => p.Properties, f => new Faker<Property>()
                    .RuleFor(p => p.Id, f => f.Random.Int(1,100))
                    .RuleFor(p => p.PropertyName, f => f.Commerce.Color()) // Generate a fake property name
                    .Generate(3)
            );

    }
    
}