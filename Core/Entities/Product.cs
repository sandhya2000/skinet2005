using System;

namespace Core.Entities;

public class Product:BaseEntity
{
  public required String Name { get; set; }
  public decimal Price { get; set; }
  public required String Description { get; set; }
  public required String Pictureurl { get; set; } 
  public required String Type { get; set; }
  public required string Brand { get; set; }
  public int QuantityInStock { get; set; }
}
