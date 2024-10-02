using DataAccess.Models;

namespace DataAccess.Interfaces;

public interface IPaperRepository
{
  
     List<Paper> GetAllPapers();
     
     List<Order> GetAllOrders();

     Task<Order> InsertOrderAsync(Order order);

     Task AddOrderEntriesAsync(List<OrderEntry> orderEntries);

     Task DeductProductQuantityAsync(int productId, int quantity);


}