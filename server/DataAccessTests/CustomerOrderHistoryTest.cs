using DataAccess;
using DataAccess.Models;
using PgCtx;
using SharedTestDependencies;

namespace xunittests;

public class CustomerOrderHistoryTest
{
    private readonly PgCtxSetup<PaperContext> _setup = new();
    
    [Fact]
    public void GetCustomerOrders_ReturnsOrdersWithEntriesAndProducts()
    {
        // Arrange
        
        var papers = new List<Paper>
        {
            TestObjects.CreatePaper(), 
            TestObjects.CreatePaper() 
        };
        
        var orders = new List<Order>
        {
            TestObjects.CreateOrder(), 
            TestObjects.CreateOrder() 
        };

        var ordersEntries = TestObjects.CreateOrderEntries(5);
        
        var customer = TestObjects.CreateCustomer();
        
        _setup.DbContextInstance.Papers.AddRange(papers);
        _setup.DbContextInstance.Customers.Add(customer); 
        _setup.DbContextInstance.Orders.AddRange(orders); 
        _setup.DbContextInstance.OrderEntries.AddRange(ordersEntries); 
        _setup.DbContextInstance.SaveChanges();

        // Act
        var result = new PaperRepository(_setup.DbContextInstance)
            .GetCustomerOrders(customer.Id);

        // Assert
        Assert.NotNull(result);
    }
}