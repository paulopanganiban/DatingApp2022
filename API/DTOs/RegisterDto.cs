using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    // in React terms
    // export interface RegisterDto { username: string, password: string }

    public class RegisterDto
    {
        // using DTO is a good place for validations
        // we are most likely working with the [ApiController] magic tricks
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(16, MinimumLength = 4)]
        public string Password { get; set; }
    }
}