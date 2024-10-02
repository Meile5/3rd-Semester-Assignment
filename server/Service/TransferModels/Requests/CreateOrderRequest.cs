namespace DataAccess.Models;

public class CreateOrderRequest
{
    public OrderDto Order { get; set; }
    public List<OrderEntryDto> OrderEntries { get; set; }
}
