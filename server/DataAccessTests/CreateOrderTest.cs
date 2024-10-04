using DataAccess;
using PgCtx;
using SharedTestDependencies;

namespace xunittests;

public class CreateOrderTest
{
    
    private readonly PgCtxSetup<PaperContext> _setup = new();
    
    [Fact]
    public void CreateOrder_ReturnsOrder()
    {
        var order = TestObjects.CreateOrder();
        
        var result = new PaperRepository(_setup.DbContextInstance).InsertOrderAsync(order);
       

        Assert.NotNull(result);
    }
}

