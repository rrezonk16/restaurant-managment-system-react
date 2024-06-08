using Database.Repository;
using Microsoft.AspNetCore.Mvc;
using Database.Models;
using Restaurant.Services;
using Restaurant.DTOs;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Data.SqlClient;

namespace Restaurant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IRepository<Users> _repository;
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;

        public UserController(IRepository<Users> repository, IUserService userService, IConfiguration configuration)
        {
            _repository = repository;
            _userService = userService;
            _configuration = configuration;
        }

        [HttpGet]
        [Authorize] // This endpoint requires authentication
        [Route("[action]/{id}")]
        public async Task<Users> GetUser(int id, CancellationToken cancellationToken)
        {
            return await _repository.Get(id, cancellationToken);
        }

        [HttpGet]
        [Authorize] // This endpoint requires authentication
        [Route("[action]/{id}")]
        public async Task<IActionResult> GetUsersID(int id, CancellationToken cancellationToken)
        {
            var user = await _repository.Get(id, cancellationToken);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user.Id);
        }

        [HttpGet]
        [Authorize] 
        [Route("[action]")]
        public IEnumerable<Users> GetAllUsers()
        {
            return _repository.GetAll();
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Register(UserDTO userDTO, CancellationToken cancellationToken)
        {
            await _userService.RegisterUser(userDTO, cancellationToken);
            return Ok();
        }

        [HttpDelete("delete-user-by-id/{id}")]
        [Authorize] // This endpoint requires authentication
        public void DeleteUser(int id, CancellationToken cancellationToken)
        {
            string connectionString = "Server=.;Database=restaurant;Integrated Security=True;TrustServerCertificate=True";

            string query = "Delete FROM Users WHERE id = @id";

            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                sqlConnection.Open();
                using (SqlCommand sqlCommand = new SqlCommand(query, sqlConnection))
                {
                    sqlCommand.Parameters.AddWithValue("@id", id);
                    int rowsAffected = sqlCommand.ExecuteNonQuery();
                }
            }
        }

        [HttpPut("update-user-by-id/{id}")]
        [Authorize] // This endpoint requires authentication
        public IActionResult UpdateUser(int id, [FromBody] UserDTO userDTO, CancellationToken cancellationToken)
        {
            var book = _userService.UpdateUser(id, userDTO);
            return Ok(book);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> LogIn(AuthRequestObject authRequest, CancellationToken cancellationToken)
        {
            var user = await _userService.LogIn(authRequest.email, authRequest.password, cancellationToken);
            if (user == null)
            {
                return Unauthorized("Invalid email or password");
            }

            if (!int.TryParse(_configuration["Jwt:Expiration"], out int exp))
                exp = 20;

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim("id", user.Id.ToString()),
                new Claim("name", user.Name),
                new Claim("surname", user.Surname),
                new Claim("roleId", user.RoleId.ToString())
            };
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddMinutes(exp),
                signingCredentials: signIn);

            var response = new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                id = user.Id,
                name = user.Name,
                surname = user.Surname,
                email = user.Email,
                roleId = user.RoleId
            };

            return Ok(response);
        }

        // New endpoint to get users by RoleId
        [HttpGet]
        [Authorize] // This endpoint requires authentication
        [Route("GetUsersByRoleId/{roleId}")]
        public IActionResult GetUsersByRoleId(int roleId)
        {
            var users = _repository.GetAll().Where(u => u.RoleId == roleId).ToList();
            if (users == null || !users.Any())
            {
                return NotFound();
            }
            return Ok(users);
        }
    }
}
