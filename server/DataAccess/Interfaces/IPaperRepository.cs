using DataAccess.Models;

namespace DataAccess.Interfaces;

public interface IPaperRepository
{
  
     List<Paper> GetAllPapers();

     List<Paper> GetFilteredPapers(string? sortName, string? sortOrder, string? priceRange, string? propertieSelected);

     Task<Order> InsertOrderAsync(Order order);
     
     Task DeductProductQuantityAsync(int productId, int quantity);

     List<Order> GetCustomerOrders(int id);

     int GetTotalPapersCount();

     Task<List<Paper>> SearchItemsAsync(string query);

}