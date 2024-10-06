using DataAccess.Models;

namespace DataAccess.Interfaces;

public interface IPaperRepository
{
  
     List<Paper> GetAllPapers();

     Task<Order> InsertOrderAsync(Order order);
     

     Task DeductProductQuantityAsync(int productId, int quantity);


     List<Order> GetCustomerOrders(int id);

     int GetTotalPapersCount();

     Task<List<Paper>> SearchItemsAsync(string query);

}