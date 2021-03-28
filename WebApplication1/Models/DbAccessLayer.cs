using System.Collections.Generic;
using System.Linq;

namespace WebApplication1.Models
{
    public class DbAccessLayer
    {

        mysiteContext db = new mysiteContext();
        public IEnumerable<Users> GetAllUsers()
        {
            try
            {
                return db.Users.ToList();
            }
            catch
            {
                throw;
            }
        }
        public IEnumerable<Products> getproducts()
        {
            try
            {
                return db.Products.ToList();
            }
            catch
            {
                throw;
            }
        }
        public IEnumerable<Categories> getcategories()
        {
            try
            {
                return db.Categories.ToList();
            }
            catch
            {
                throw;
            }
        }
        public int addproduct(Products product)
        {
            try
            {
                db.Products.Add(product);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        public int Deleteproduct(int id)
        {
            try
            {
                Products product = db.Products.Find(id);
                db.Products.Remove(product);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

    }
}
