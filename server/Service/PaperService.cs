﻿
using DataAccess;
using DataAccess.Interfaces;
using DataAccess.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Service.Validators;


namespace Service;

public interface IPaperService
{
    public List<PaperDto> GetAllPapers(int limit, int startAt);
    public Task<OrderResponseDto> CreateOrder(CreateOrderDto createOrderDto);

    public List<PaperDto> GetFilteredPapers(int limit, int startAt, string? sortField, string? sortOrder,
        string? priceRange, string? propertieSelected);

    public List<OrderDto> GetCustomerOrders(int id);
    public int GetTotalPapersCount();
    public Task<List<PaperDto>> SearchItemsAsync(string query);
    public List<PropertyDto> GetAllProperties();
    public List<PaperDto> GetCustomersPapers(int limit, int startAt);
    public int GetTotalPapersCountCustomers();

}

public class PaperService(
        ILogger<PaperService> logger,
        IPaperRepository paperRepository,
        IValidator<CreateOrderDto> createOrderValidator,
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

    public List<PaperDto> GetCustomersPapers(int limit, int startAt) 
    {
        var papers = paperRepository.GetCustomersPapers();
        return papers.OrderBy(p => p.Id) 
            .Skip(startAt) 
            .Take(limit) 
            .Select(PaperDto.FromEntity) 
            .ToList();
    }

    public List<PaperDto> GetFilteredPapers(int limit, int startAt, 
        string? sortField, string? sortOrder, string? priceRange, string? propertieSelected)
    {
        var papers = paperRepository.GetFilteredPapers(sortField, sortOrder, priceRange, propertieSelected);
    
        // Apply pagination (skip and limit)
        return papers
            .Skip(startAt)
            .Take(limit)
            .Select(PaperDto.FromEntity) // Convert to DTO
            .ToList();
    }


    public int GetTotalPapersCount() 
    {
        return paperRepository.GetTotalPapersCount();
    }
    
    public int GetTotalPapersCountCustomers() 
    {
        return paperRepository.GetTotalPapersCountCustomers();
    }

    public List<OrderDto> GetCustomerOrders(int id)
    {
        var orders = paperRepository.GetCustomerOrders(id);
        return orders.OrderBy(o => o.OrderDate)
            .Select(OrderDto.FromEntity)
            .ToList();
    }

    public async Task<OrderResponseDto> CreateOrder(CreateOrderDto createOrderDto)
    {
        
        var order = createOrderDto.ToOrder(); 
        
        using (var transaction = await context.Database.BeginTransactionAsync())
        {
            try
            {
                var insertedOrder = await paperRepository.InsertOrderAsync(order);
                
                foreach (var entry in createOrderDto.OrderEntries)
                {
                    await paperRepository.DeductProductQuantityAsync(entry.ProductId, entry.Quantity);
                }
                await transaction.CommitAsync();
                return OrderResponseDto.FromOrder(insertedOrder);
            }
            catch (Exception)
            {
                // Rollback the transaction if any error occurs
                await transaction.RollbackAsync();
                throw;
            }
        }
        
    }
    
    public async Task<List<PaperDto>> SearchItemsAsync(string query)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return new List<PaperDto>(); 
        }
        
        var results = await paperRepository.SearchItemsAsync(query);

       
        return results.Select(PaperDto.FromEntity).ToList();
        
    }
    
    public List<PropertyDto> GetAllProperties()
    {
        var results = paperRepository.GetAllProperties();
        return results.Select(PropertyDto.FromEntity).ToList();
    }

}
