using System;
using System.Collections.Generic;

namespace WebApplication1.Models
{
    public partial class Products
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int? ProductPrice { get; set; }
        public int? ProductQuantity { get; set; }
        public string ProductImage { get; set; }
        public int? CatId { get; set; }
    }
}
