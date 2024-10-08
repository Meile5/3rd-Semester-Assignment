
using DataAccess.Interfaces;
using DataAccess.Models;



namespace Service;

public interface IAdminService
{ 
    public List<OrderDto> GetAllOrders();

}

public class AdminService(
        IAdminRepository adminRepository
        ) : IAdminService
{
    
    public List<OrderDto> GetAllOrders()
    {
        var orders = adminRepository.GetAllOrders();
        return orders.OrderBy(o => o.OrderDate)
            .Select(OrderDto.FromEntity)
            .ToList();
    }
  

}
