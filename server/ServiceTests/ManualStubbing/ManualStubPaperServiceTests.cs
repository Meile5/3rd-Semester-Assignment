using DataAccess.Models;
using Microsoft.Extensions.Logging.Abstractions;
using Service;
using Service.Validators;

namespace ServiceTests.ManualStubbing;

public class ManualStubPaperServiceTests
{
    private readonly PaperService _paperService;
    

    public ManualStubPaperServiceTests()
    {
        _paperService = new PaperService(NullLogger<PaperService>.Instance, 
            new StubPaperRepository(),
            new CreateOrderValidator(), 
            null);
    }

    
    // Test is Failing
    [Fact]
    public void CreateOrder_Should_Successfully_Return_An_Order()
    {
        var createOrderDto = new CreateOrderDto
        {
            DeliveryDate = new DateOnly(2024, 10, 08),
            TotalAmount = 124.58,
            OrderEntries = new List<CreateOrderEntryDto>
            {
                new CreateOrderEntryDto { ProductId = 1, Quantity = 5 },
                new CreateOrderEntryDto { ProductId = 2, Quantity = 3 }
            },
            CustomerId = 1
        };
        
        var result = _paperService.CreateOrder(createOrderDto).Result;
        
        Assert.Equal(1, result.Id);
        Assert.Equal(124.58, result.TotalAmount);
        Assert.Equal(new DateOnly(2024, 10, 08), result.DeliveryDate);
        Assert.Equal(2, result.OrderEntries.Count);
    }
    
}