
using DataAccess;
using DataAccess.Interfaces;
using DataAccess.Models;



namespace Service;

public interface IAdminService
{ 
    public List<OrderDto> GetAllOrders();
    public Task<PaperDto> CreatePaperAsync(PaperDto paperDto);
    public bool UpdateOrderStatus(int orderId, string newStatus);

}

public class AdminService(
    IAdminRepository adminRepository,
    PaperContext context
) : IAdminService
{

    public List<OrderDto> GetAllOrders()
    {
        var orders = adminRepository.GetAllOrders();
        return orders.OrderBy(o => o.OrderDate)
            .Select(OrderDto.FromEntity)
            .ToList();
    }

    public async Task<PaperDto> CreatePaperAsync(PaperDto paperDto)
    {
        var properties = new List<Property>();

        using (var transaction = await context.Database.BeginTransactionAsync())
        {
            try
            {
                foreach (var propertyDto in paperDto.Properties)
                {
                    var property = await adminRepository.GetPropertyByNameAsync(propertyDto.PropertyName);
                    if (property == null)
                    {
                        property = new Property { PropertyName = propertyDto.PropertyName };
                        await adminRepository.AddPropertyAsync(property);
                    }

                    properties.Add(property);
                }

                var paper = paperDto.ToEntity(paperDto);
                paper.Properties = properties;
                await adminRepository.AddPaperAsync(paper);
                
                await transaction.CommitAsync();
                
                return paperDto;
            }
            catch (Exception)
            {
                // Rollback the transaction if any error occurs
                await transaction.RollbackAsync();
                throw;
            }
        }
        


    }
    
    public bool UpdateOrderStatus(int orderId, string newStatus)
    {
        var success = adminRepository.UpdateOrderStatus(orderId, newStatus);
        return success;
    }

    
    

}
