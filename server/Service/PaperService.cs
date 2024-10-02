
using DataAccess;
using DataAccess.Interfaces;
using DataAccess.Models;
using Microsoft.Extensions.Logging;



namespace Service;

public interface IPaperService
{
    public List<PaperDto> GetAllPapers(int limit, int startAt);
    //public List<Order> GetAllOrders();
    public Task<OrderResponseDto> CreateOrder(CreateOrderDto createOrderDto);

    public List<Order> GetCustomerOrders(int id);
    public int GetTotalPapersCount();

}

public class PaperService(
        //ILogger<PaperService> logger,
        IPaperRepository paperRepository,
        PaperContext context
        ) : IPaperService
{
    
public List<PaperDto> GetAllPapers(int limit, int startAt) 
    {
        var papers = paperRepository.GetAllPapers(); // Fetch papers from repository
        return papers.OrderBy(p => p.Id) // Order by Id
            .Skip(startAt) // Skip based on startAt
            .Take(limit) // Take the limit
            .Select(PaperDto.FromEntity) // Map to DTO
            .ToList();
    }

    public int GetTotalPapersCount() 
    {
        return paperRepository.GetTotalPapersCount();
    }

    public List<Order> GetCustomerOrders(int id)
    {
        var orders = paperRepository.GetCustomerOrders(id);
        return orders.OrderBy(o => o.OrderDate)
            .ToList();
    }

    public async Task<OrderResponseDto> CreateOrder(CreateOrderDto createOrderDto)
    {
        var order = createOrderDto.ToOrder();
        
        var insertedOrder = await paperRepository.InsertOrderAsync(order);

      
        var orderResponseDto = OrderResponseDto.FromOrder(insertedOrder);

        return orderResponseDto;

        /*
         foreach (var entry in orderEntryEntities)
         {

                 await paperRepository.DeductProductQuantityAsync(entry.ProductId, entry.Quantity);


         }
     }*/
    }

}
