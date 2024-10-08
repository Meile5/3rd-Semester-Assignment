﻿
namespace DataAccess.Models;

public class PaperDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public double Price { get; set; }
    public bool Discontinued { get; set; }
    public int Stock { get; set; }
    public List<PropertyDto> Properties { get; set; } = new List<PropertyDto>();
    
    // Static method to map from entity to DTO
    public static PaperDto FromEntity(Paper paper)
    {
        return new PaperDto
        {
            Id = paper.Id,
            Name = paper.Name,
            Price = paper.Price,
            Stock = paper.Stock,
            Discontinued = paper.Discontinued,
            Properties = paper.Properties.Select(prop => new PropertyDto
            {
                Id = prop.Id,
                PropertyName = prop.PropertyName
            }).ToList()
        };
    }
    
    public Paper ToEntity(PaperDto paper)
    {
        return new Paper
        {
            Id = paper.Id,
            Name = paper.Name,
            Price = paper.Price,
            Stock = paper.Stock,
            Discontinued = paper.Discontinued,
            Properties = paper.Properties.Select(prop => new Property
            {
                Id = prop.Id,
                PropertyName = prop.PropertyName
            }).ToList()
        };
    }
}