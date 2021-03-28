using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly mysiteContext _context;
        private int userId;
        protected int GetUserId()
        {
            return int.Parse(this.User.Claims.First(i => i.Type == "Uid").Value);
        }
        public OrdersController(mysiteContext context)
        {
            _context = context;
        }

        // GET: api/Orders

        [HttpGet]
        [Authorize(Policy = Policies.Admin)]
        public async Task<ActionResult<IEnumerable<Orders>>> GetOrders()
        {

            return await _context.Orders.
                Include(i=>i.OrderItems).
                ToListAsync();
        }
        [HttpGet]
        [Route("api/getorderbyid/{id}")]
        [Authorize(Policy = Policies.Customer)]
        public async Task<ActionResult<IEnumerable<Orders>>> GetOrdersOfUsers(int id)
        {
            userId = GetUserId();
            if (id!=userId)
            {
                return BadRequest();
            }

            
            return await _context.Orders.              
                Include(i => i.OrderItems).
                Where(i => i.Uid== id).
                ToListAsync();
        }
        /* // GET: api/Orders/5
         [HttpGet("{id}")]
         [Authorize(Policy = Policies.Admin)]
         public async Task<ActionResult<Orders>> GetOrders(int id)
         {
             var orders = await _context.Orders.FindAsync(id);

             if (orders == null)
             {
                 return NotFound();
             }

             return orders;
         }*/

  

        [Route("api/updateorder/{id}/{status}")]
        [HttpPut]
        [Authorize(Policy = Policies.Admin)]
        public void UpdateOrder(int id, string status)
        {

            try
            {
                var order = new Orders{ OrderId = id, OrderStatus = status };
                _context.Attach(order);
                _context.Entry(order).Property(x => x.OrderStatus).IsModified = true;
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                {
                    throw;
                }
            }

        }

        // POST: api/Orders
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Authorize(Policy = Policies.Customer)]
        public async Task<ActionResult<Orders>> PostOrders(Orders orders)
        {
            _context.Orders.Add(orders);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrders", new { id = orders.OrderId }, orders);
        }

/*        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Orders>> DeleteOrders(int id)
        {
            var orders = await _context.Orders.FindAsync(id);
            if (orders == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(orders);
            await _context.SaveChangesAsync();

            return orders;
        }

        private bool OrdersExists(int id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }*/
    }
}
