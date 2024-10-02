namespace DataAccess.Models;

public class CreateOrderDto
{
    public DateOnly? DeliveryDate { get; set; }
    public double TotalAmount { get; set; }
    public int? CustomerId { get; set; }
    
    public List<CreateOrderEntryDto> OrderEntries { get; set; } = new List<CreateOrderEntryDto>();
    
    public Order ToOrder()
    {
        var order = new Order
        {
            OrderDate = DateTime.UtcNow,
            DeliveryDate = this.DeliveryDate,
            TotalAmount = this.TotalAmount,
            CustomerId = this.CustomerId,
            
            OrderEntries = this.OrderEntries.Select(entryDto => new OrderEntry
            {
                ProductId = entryDto.ProductId,
                Quantity = entryDto.Quantity,
            }).ToList()

        };
        return order;
    }
}
