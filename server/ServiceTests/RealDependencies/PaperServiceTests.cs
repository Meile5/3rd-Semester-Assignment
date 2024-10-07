using DataAccess;
using DataAccess.Interfaces;
using DataAccess.Models;
using Microsoft.Extensions.Logging.Abstractions;
using PgCtx;
using SharedTestDependencies;
using Service;

namespace ServiceTests.RealDependencies
{
    public class PaperServiceTests
    {
        private readonly PgCtxSetup<PaperContext> _pgCtxSetup = new();
        private readonly IPaperService _paperService;

        public PaperServiceTests()
        {
            IPaperRepository paperRepository = new PaperRepository(_pgCtxSetup.DbContextInstance);
            _paperService = new PaperService(NullLogger<PaperService>.Instance, paperRepository,
                _pgCtxSetup.DbContextInstance);
        }

        [Fact]
        public void GetAllPapers_ReturnsAllPapers()
        {
            var paper = TestObjects.CreatePaper();
            var paper2 = TestObjects.CreatePaper();

            _pgCtxSetup.DbContextInstance.Papers.AddRange(paper, paper2);
            _pgCtxSetup.DbContextInstance.SaveChanges();

            var result = _paperService.GetAllPapers(10, 0);

            Assert.NotNull(result);
            Assert.Equal(2, result.Count);

            // Verify that the papers in the result are the ones added
            Assert.Contains(result, p => p.Name == paper.Name);
            Assert.Contains(result, p => p.Name == paper2.Name);

        }

        /*  [Fact]
      public void CreateNewOrder_Successfully_CreatesNewOrder()
         {
             var customer = new Customer
             {
                 Id = 1,
                 Name = "Test Customer",
                 Email = "test@example.com"
             };

             var customer = new Customer
             {
                 Id = 1,
                 Name = "Test Customer",
                 Email = "test@example.com"
             };

             _pgCtxSetup.DbContextInstance.Customers.Add(customer);
             _pgCtxSetup.DbContextInstance.SaveChanges();
             var createOrderDto = new CreateOrderDto
             {
                 DeliveryDate = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(1)),
                 TotalAmount = 150.0,
                 CustomerId = 1,
                 OrderEntries = new List<CreateOrderEntryDto>
                 {
                     new CreateOrderEntryDto { ProductId = 1, Quantity = 5 },
                     new CreateOrderEntryDto { ProductId = 2, Quantity = 3 }
                 }
             };

             var expectedOrder = new Order
             {
                 Id = 1,
                 DeliveryDate = createOrderDto.DeliveryDate,
                 TotalAmount = createOrderDto.TotalAmount,
                 CustomerId = createOrderDto.CustomerId,
                 OrderEntries = createOrderDto.OrderEntries.Select(e => new OrderEntry
                 {
                     ProductId = e.ProductId,
                     Quantity = e.Quantity
                 }).ToList()
             };

             _pgCtxSetup.DbContextInstance.Orders.Add(expectedOrder);
             _pgCtxSetup.DbContextInstance.SaveChanges();


             var result = _paperService.CreateOrder(createOrderDto).Result;

             Assert.NotNull(result);
             Assert.Equal(expectedOrder.Id, result.Id);
             Assert.Equal(expectedOrder.TotalAmount, result.TotalAmount);
             Assert.Equal(expectedOrder.CustomerId, result.CustomerId);
             Assert.Equal(expectedOrder.OrderEntries.Count, result.OrderEntries.Count);
         }


   }*/

    }
}