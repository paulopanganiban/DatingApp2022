using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        // we are gonna inject our config to this class through a constructor
        private readonly SymmetricSecurityKey _key;
        // symmetric is a type of encryption where only 1 key
        // is used to both crypt and decrpyt electronic information
        public TokenService(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }


        public string CreateToken(AppUser user)
        {
            // identify the claims
            // adding claims
            var claims = new List<Claim> 
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
            };
            // create credentials
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);
            // describe how token will look
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };
            // we need to create to use the classes above to create a token
            var tokenHandler = new JwtSecurityTokenHandler();
            // create token
            var token = tokenHandler.CreateToken(tokenDescriptor);
            // return the written token to whoever needs it
            return tokenHandler.WriteToken(token);
        }
    }
}