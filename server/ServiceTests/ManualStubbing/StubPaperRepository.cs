using DataAccess.Interfaces;
using DataAccess.Models;

namespace ServiceTests.ManualStubbing;

public class StubPaperRepository : IPaperRepository
{
    public List<Paper> GetAllPapers()
    {
        throw new NotImplementedException();
    }

    public List<Paper> GetFilteredPapers(string? sortName, string? sortOrder, string? priceRange, string? propertieSelected)
    {
        throw new NotImplementedException();
    }

    public Task<Order> InsertOrderAsync(Order order)
    {
        throw new NotImplementedException();
    }

    public Task DeductProductQuantityAsync(int productId, int quantity)
    {
        throw new NotImplementedException();
    }

    public List<Order> GetCustomerOrders(int id)
    {
        throw new NotImplementedException();
    }

    public int GetTotalPapersCount()
    {
        throw new NotImplementedException();
    }

    public Task<List<Paper>> SearchItemsAsync(string query)
    {
        throw new NotImplementedException();
    }

    public List<Property> GetAllProperties()
    {
        throw new NotImplementedException();
    }
}