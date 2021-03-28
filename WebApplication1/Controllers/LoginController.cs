using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    // [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly mysiteContext _context;

        private readonly IConfiguration _config;

        public LoginController(IConfiguration config, mysiteContext context)
        {
            _config = config;
            _context = context;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("api/login")]
        public IActionResult Login([FromBody]Users login)
        {

            IActionResult response = Unauthorized();
            Users user = AuthenticateUser(login);
            if (user != null)
            {
                var tokenString = GenerateJWT(user);
                response = Ok(new
                {
                    token = tokenString,
                    userDetails = user,
                });
            }
            return response;
        }

        Users AuthenticateUser(Users loginCredentials)
        {

            Users user = _context.Users.SingleOrDefault(x => x.UEmail == loginCredentials.UEmail && x.UPassword == loginCredentials.UPassword);
            return user;

        }
        string GenerateJWT(Users userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.UEmail),
                new Claim("UName", userInfo.UName.ToString()),
                new Claim("Uid", userInfo.Uid.ToString()),
                new Claim("role",userInfo.UType),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
