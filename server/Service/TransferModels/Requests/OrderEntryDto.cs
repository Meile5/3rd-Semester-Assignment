namespace DataAccess.Models;

public class OrderEntryDto
{
    public int Id { get; set; }
    
    public int Quantity { get; set; }
    
    public int ?ProductId { get; set; }
    
    public int OrderId { get; set; }

    public OrderEntry ToOrderEntry()
    {
        return new OrderEntry()
        {
            Id = this.Id, 
            Quantity = this.Quantity,
           
            
        };
    }
}