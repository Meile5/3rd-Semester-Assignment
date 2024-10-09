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
    
    public async Task AddPaperAsync(Paper paper)
    {
        _context.Papers.Add(paper);
        await _context.SaveChangesAsync();
    }

    public async Task AddPropertyAsync(Property property)
    {
        _context.Properties.Add(property);
        await _context.SaveChangesAsync();
    }

    public async Task<Property?> GetPropertyByNameAsync(string propertyName)
    {
        return await _context.Properties.FirstOrDefaultAsync(p => p.PropertyName == propertyName);
    }
    
    public bool UpdateOrderStatus(int orderId, string newStatus)
    {
        var order = _context.Orders.SingleOrDefault(o => o.Id == orderId);

        if (order == null)
        {
            return false; 
        }

        order.Status = newStatus;
        _context.SaveChanges();

        return true; 
    }

    
    
}
