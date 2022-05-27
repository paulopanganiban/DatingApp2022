using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    // a constructor is like the useState in React
    // it is used to initialize the state of the class
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        public AccountController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        // Action result is the interface/class that provides the BadRequest, Ok, etc.
        // React terms is: const Register<Task<ActionResult<AppUser>>> = (registerDto: RegisterDtoProps)
        // 
        public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) return BadRequest("User already exists");
            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = registerDto.Username,
                PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };
            // add user
            // hover for more info, in short, you need to await the save changes async
            _context.Users.Add(user);
            // we call our database here and save the user to the users table
            await _context.SaveChangesAsync();
            return user;
        }


        // export const function helper in React terms 
        // const UserExists = (username: string): boolean => {
        // _context.User.AnyAsync returns boolean
        // return await _context.Users.AnyAsync(x => x.UserName == username);

        // create a variable inside the controller AccountController
        // that can only be accessed to itself
        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}