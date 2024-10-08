using DataAccess;
using DataAccess.Interfaces;
using DataAccess.Models;
using FluentValidation;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using Service;
using Service.Validators;
using Xunit;
using Xunit.Abstractions;

namespace ServiceTests.StubbingFramework
{
    public class MoqPaperServiceTests
    {
        private readonly IPaperService _paperService;
        private readonly Mock<IPaperRepository> _mockRepo;

        private readonly ITestOutputHelper _outputHelper;


        public MoqPaperServiceTests()
        {
            _mockRepo = new Mock<IPaperRepository>();
            var mockContext = It.IsAny<PaperContext>();
            Console.WriteLine(mockContext);
            _paperService = new PaperService(NullLogger<PaperService>.Instance, _mockRepo.Object,
                new CreateOrderValidator(), mockContext);
        }

        /*
        // Test is Failing
        [Fact]
        public async void CreateNewOrder_Successfully_CreatesNewOrder()
        {
            // Arrange
            var createOrderDto = new CreateOrderDto
            {
                DeliveryDate = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(3)),
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
            



            _mockRepo.Setup(repo => repo.InsertOrderAsync(It.IsAny<Order>()))
                .ReturnsAsync(expectedOrder);

            var result = await _paperService.CreateOrder(createOrderDto);

            Assert.NotNull(result);
            Assert.Equal(expectedOrder.Id, result.Id);
            Assert.Equal(expectedOrder.TotalAmount, result.TotalAmount);
            Assert.Equal(expectedOrder.CustomerId, result.CustomerId);
            Assert.Equal(expectedOrder.OrderEntries.Count, result.OrderEntries.Count);
        }
        */


        [Fact]
        public void CreateNewOrder_Should_TriggerDataValidation_For_Null_CustomerID()
        {
            var createOrderDto = new CreateOrderDto
            {
                DeliveryDate = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(3)),
                TotalAmount = 123.59,
                CustomerId = null,

                OrderEntries = new List<CreateOrderEntryDto>
                {
                    new CreateOrderEntryDto { ProductId = 1, Quantity = 5 },
                    new CreateOrderEntryDto { ProductId = 2, Quantity = 3 }
                }

            };
            Assert.ThrowsAnyAsync<ValidationException>(() => _paperService.CreateOrder(createOrderDto));
        }
    }

}
