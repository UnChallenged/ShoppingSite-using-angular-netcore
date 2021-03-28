using System;
using System.Collections.Generic;

namespace WebApplication1.Models
{
    public partial class OrderItems
    {
        public int ItemId { get; set; }
        public int? ProductId { get; set; }
        public string ProductName { get; set; }
        public int? ProductPrice { get; set; }
        public int? QuantityValue { get; set; }
        public int? OrderId { get; set; }

        public virtual Orders Order { get; set; }
    }
}
