﻿
using DataAccess;
using DataAccess.Interfaces;
using DataAccess.Models;
using Microsoft.Extensions.Logging;



namespace Service;

public interface IPaperService
{
    public List<PaperDto> GetAllPapers(int limit, int startAt);
    public List<Order> GetCustomerOrders(int id);
    
}

public class PaperService(
        //ILogger<PaperService> logger,
        IPaperRepository paperRepository,
        PaperContext context
        ) : IPaperService
{
    
public List<PaperDto> GetAllPapers(int limit, int startAt) 
    {
        var papers = paperRepository.GetAllPapers(); // Fetch papers from repository
        return papers.OrderBy(p => p.Id) // Order by Id
            .Skip(startAt) // Skip based on startAt
            .Take(limit) // Take the limit
            .Select(PaperDto.FromEntity) // Map to DTO
            .ToList();
    }

    public List<Order> GetCustomerOrders(int id)
    {
        var orders = paperRepository.GetCustomerOrders(id);
        return orders.OrderBy(o => o.OrderDate)
            .ToList();
    }
}
