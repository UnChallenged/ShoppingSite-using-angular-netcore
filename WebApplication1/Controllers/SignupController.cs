using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignupController : ControllerBase
    {
        private int userId;
        protected int GetUserId()
        {
            return int.Parse(this.User.Claims.First(i => i.Type == "Uid").Value);
        }
        private readonly mysiteContext _context;

        public SignupController(mysiteContext context)
        {
            _context = context;
             
        }

        // GET: api/Signup
        [HttpGet]
        [Authorize(Policy = Policies.Admin)]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Signup/5 for admin
        [HttpGet]
        [Route("api/getuserbyid/{id}")]
        [Authorize(Policy = Policies.Admin)]
        public async Task<ActionResult<Users>> GetUser(int id)
        {
            var users = await _context.Users.FindAsync(id);

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }
        // GET: api/Signup/5
        [HttpGet("{id}")]
        [Authorize(Policy = Policies.Customer)]
        public async Task<ActionResult<Users>> GetUsers(int id)
        {
            userId = GetUserId();


            if (id!= userId)
            {
                return BadRequest();
            }
                var users = await _context.Users.FindAsync(id);

                if (users == null)
                {
                    return NotFound();
                }

                return users;   


        }

        // PUT: api/Signup/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize(Policy = Policies.Customer)]
        public async Task<IActionResult> PutUsers(int id, Users users)
        {
            userId = GetUserId();

            if (id != users.Uid&&id!=userId)
            {
                return BadRequest();
            }

            _context.Entry(users).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Signup
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Users>> PostUsers(Users users)
        {
            var exist = _context.Users.Any(u => u.UEmail == users.UEmail);
            if(exist)
            {
                return BadRequest("User is already registerd");

            }
            else
            {
                _context.Users.Add(users);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetUsers", new { id = users.Uid }, users);
            }

        }

        /*// DELETE: api/Signup/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Users>> DeleteUsers(int id)
        {
            var users = await _context.Users.FindAsync(id);
            if (users == null)
            {
                return NotFound();
            }

            _context.Users.Remove(users);
            await _context.SaveChangesAsync();

            return users;
        }
*/
        private bool UsersExists(int id)
        {
            return _context.Users.Any(e => e.Uid == id);
        }
    }
}
