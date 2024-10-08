using DataAccess.Interfaces;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DataAccess;
public class AdminRepository : IAdminRepository
{
    private readonly PaperContext _context;

    public AdminRepository(PaperContext context)
    {
        _context = context;
    }


    public List<Order> GetAllOrders()
    {
        var orders = _context.Orders
            .Include(o => o.Customer)
            .Include(order => order.OrderEntries)
            .ThenInclude(orderEntry => orderEntry.Product) 
            .ToList();

        return orders;
    }
    
    
}
