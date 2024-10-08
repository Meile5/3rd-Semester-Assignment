using DataAccess.Models;

namespace DataAccess.Interfaces;

public interface IAdminRepository
{
    List<Order> GetAllOrders();
}