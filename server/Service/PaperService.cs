
using DataAccess;
using DataAccess.Interfaces;
using DataAccess.Models;
using Microsoft.Extensions.Logging;



namespace Service;

public interface IPaperService
{
    public List<PaperDto> GetAllPapers(int limit, int startAt);
    public List<Order> GetAllOrders();
    public Task CreateOrder(CreateOrderRequest request);

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

    public List<Order> GetAllOrders()
    {
        var orders = paperRepository.GetAllOrders();
        return orders.OrderBy(o => o.Id)
            .ToList();
    }
    
    public async Task CreateOrder(CreateOrderRequest request)
    {
        var order = request.Order.ToOrder();
        await paperRepository.InsertOrderAsync(order);
        
        var orderEntryEntities = request.OrderEntries.Select(entryDto =>
        {
            var orderEntry = entryDto.ToOrderEntry();
            orderEntry.OrderId = order.Id; 
            return orderEntry;
        }).ToList();


        await paperRepository.AddOrderEntriesAsync(orderEntryEntities);

        // Deduct product quantities
        foreach (var entry in orderEntryEntities)
        {
           
                await paperRepository.DeductProductQuantityAsync(entry.ProductId, entry.Quantity);
            
           
        }
    }
    
}
