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
        var customer = TestObjects.CreateCustomer();
        
        var order1 =TestObjects.CreateOrderHistory(customer);
        var order2 =TestObjects.CreateOrderHistory(customer);

        var paper1 = TestObjects.CreatePaper();
        var paper2 = TestObjects.CreatePaper();
        
        var ordersEntry1 = TestObjects.CreateOrderEntries(paper1, order1);
        var ordersEntry2 = TestObjects.CreateOrderEntries(paper2, order2);

        var papers = new List<Paper> { paper1, paper2 };
        var orders = new List<Order> { order1, order2 };
        var ordersEntries = new List<OrderEntry> { ordersEntry1, ordersEntry2 };
        int customerId = customer.Id;
        
        _setup.DbContextInstance.Customers.Add(customer); 
        _setup.DbContextInstance.Orders.AddRange(orders); 
        _setup.DbContextInstance.Papers.AddRange(papers);
        _setup.DbContextInstance.OrderEntries.AddRange(ordersEntries);
        _setup.DbContextInstance.SaveChanges();

        // Act
        var result = new PaperRepository(_setup.DbContextInstance)
            .GetCustomerOrders(customerId);

        // Assert
        Assert.NotNull(result);
    }
}