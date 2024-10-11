
using DataAccess;
using DataAccess.Interfaces;
using DataAccess.Models;



namespace Service;

public interface IAdminService
{ 
    public List<OrderDto> GetAllOrders();
    public Task<PaperDto> CreatePaperAsync(PaperDto paperDto);
    public bool UpdateOrderStatus(int orderId, string newStatus);
    public Task<PaperDto?> EditPaperAsync(PaperDto paperDto);

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
    
    public async Task<PaperDto?> EditPaperAsync(PaperDto paperDto)
    {
        using (var transaction = await context.Database.BeginTransactionAsync())
        {
            try
            {
                var existingPaper = await adminRepository.GetPaperByIdAsync(paperDto.Id);
                if (existingPaper == null)
                {
                    return null; 
                }

                // Update the paper details
                existingPaper.Name = paperDto.Name;
                existingPaper.Price = paperDto.Price;
                existingPaper.Stock = paperDto.Stock;
                existingPaper.Discontinued = paperDto.Discontinued;

                // Update properties: add new ones and remove those not in the list
                var updatedProperties = new List<Property>();
                foreach (var propertyDto in paperDto.Properties)
                {
                    var existingProperty = await adminRepository.GetPropertyByNameAsync(propertyDto.PropertyName);
                    if (existingProperty == null)
                    {
                        // Create new property if it doesn't exist
                        existingProperty = new Property { PropertyName = propertyDto.PropertyName };
                        await adminRepository.AddPropertyAsync(existingProperty);
                    }

                    updatedProperties.Add(existingProperty);
                }

                existingPaper.Properties = updatedProperties;

                // Save changes
                await adminRepository.UpdatePaperAsync(existingPaper);
                await transaction.CommitAsync();

                return PaperDto.FromEntity(existingPaper);
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                throw; 
            }
        }
    }


    
    

}
