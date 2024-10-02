namespace DataAccess.Models;

public class OrderResponseEntryDto
{
    public int Id { get; set; }

    public int Quantity { get; set; }
    
    public int ProductId { get; set; }
    
    public int ?OrderId { get; set; }

}