using System;
using System.Collections.Generic;

namespace WebApplication1.Models
{
    public partial class Orders
    {
        public Orders()
        {
            OrderItems = new HashSet<OrderItems>();
        }

        public int OrderId { get; set; }
        public int? Uid { get; set; }
        public DateTime? OrderDate { get; set; }
        public string OrderStatus { get; set; }
        public int? OrderPrice { get; set; }

        public virtual ICollection<OrderItems> OrderItems { get; set; }
    }
}
