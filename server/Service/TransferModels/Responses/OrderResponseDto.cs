namespace DataAccess.Models;

public class OrderResponseDto
{
    public int Id { get; set; }

    public DateOnly? DeliveryDate { get; set; }
    public double TotalAmount { get; set; }
    public int? CustomerId { get; set; }
    public string Status { get; set; } = null!;
    public DateTime OrderDate { get; set; }
    public List<OrderResponseEntryDto> OrderEntries { get; set; } = new List<OrderResponseEntryDto>();
    
    public static OrderResponseDto FromOrder(Order order)
    {
        return new OrderResponseDto
        {
            Id = order.Id,  
            DeliveryDate = order.DeliveryDate,
            TotalAmount = order.TotalAmount,
            CustomerId = order.CustomerId,
            Status = order.Status,  
            OrderDate = order.OrderDate,
            OrderEntries = order.OrderEntries.Select(entry => new OrderResponseEntryDto
            {
                Id = entry.Id,  
                ProductId = entry.ProductId,
                Quantity = entry.Quantity,
                OrderId = entry.OrderId
               
            }).ToList()
        };
    }
}