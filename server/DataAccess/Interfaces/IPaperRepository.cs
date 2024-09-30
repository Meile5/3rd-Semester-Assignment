using DataAccess.Models;

namespace DataAccess.Interfaces;

public interface IPaperRepository
{
  
     List<Paper> GetAllPapers();
     
     List<Order> GetAllOrders();
    
}