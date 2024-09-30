using DataAccess.Interfaces;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DataAccess;
public class PaperRepository : IPaperRepository
{
    private readonly PaperContext _context;

    public PaperRepository(PaperContext context)
    {
        _context = context;
    }

    public List<Paper> GetAllPapers()
    {
        //  load related Properties for each Paper
        var papers = _context.Papers
            .Include(p => p.Properties) 
            .ToList();
    
        return papers;
    }

    public List<Order> GetAllOrders()
    {
        var orders = _context.Orders
            .Include(o => o.OrderEntries)
            .ToList();
        return orders;
    }
}
