namespace DataAccess.Models;

public class CreateOrderEntryDto
{
    
    public int Quantity { get; set; }
    
    public int ProductId { get; set; }
    
    public int OrderId { get; set; }

    
}