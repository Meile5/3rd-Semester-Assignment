using DataAccess.Models;

namespace DataAccess.Interfaces;

public interface IAdminRepository
{
    List<Order> GetAllOrders();
    Task AddPaperAsync(Paper paper);
    Task AddPropertyAsync(Property property);
    Task<Property?> GetPropertyByNameAsync(string propertyName);

}