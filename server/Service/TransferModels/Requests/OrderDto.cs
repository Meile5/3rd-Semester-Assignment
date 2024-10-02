namespace DataAccess.Models;

public class OrderDto
{
    public int ?Id { get; set; }
    public DateOnly? DeliveryDate { get; set; }
    public double TotalAmount { get; set; }
    public int? CustomerId { get; set; }

    
    public Order ToOrder()
    {
        return new Order
        {
            DeliveryDate = this.DeliveryDate,
            TotalAmount = this.TotalAmount,
            CustomerId = this.CustomerId
        };
    }
}
