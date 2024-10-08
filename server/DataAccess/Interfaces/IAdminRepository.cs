﻿using DataAccess.Models;

namespace DataAccess.Interfaces;

public interface IAdminRepository
{
    List<Order> GetAllOrders();
    Task AddPaperAsync(Paper paper);
    Task AddPropertyAsync(Property property);
    Task<Property?> GetPropertyByNameAsync(string propertyName);
    bool UpdateOrderStatus(int orderId, string newStatus);
    Task<Paper?> GetPaperByIdAsync(int id);
    Task UpdatePaperAsync(Paper paper);

}