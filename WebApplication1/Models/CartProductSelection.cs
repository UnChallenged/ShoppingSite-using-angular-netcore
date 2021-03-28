namespace WebApplication1.Models
{
    public class cartProductSelection
    {
        public long itemId { get; set; }
        public long productId { get; set; }
        public string productName { get; set; }
        public decimal productPrice { get; set; }
        public int productQuantity { get; set; }
    }
}
