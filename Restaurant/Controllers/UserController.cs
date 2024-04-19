using Database.Repository;
using Microsoft.AspNetCore.Mvc;
using Database.Models;
using Database.Repository;
using Org.BouncyCastle.Utilities;
using System.CodeDom;
using Restaurant.Services;
using Restaurant.DTOs;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Runtime.InteropServices;
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
        [Route("[action]/{id}")]
        public async Task<Users> GetUser(int id, CancellationToken cancellationToken)
        {
            return await _repository.Get(id, cancellationToken);
        }

        [HttpGet]
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

        [HttpDelete]
        public void DeleteUser(int id,CancellationToken cancellationToken)
        {
            string connectionString = "Server=.;Database=restaurant;Integrated Security=True;TrustServerCertificate=True";

            string query = "Delete FROM Users WHERE id = @id";

            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                sqlConnection.Open();
                using (SqlCommand sqlCommand = new SqlCommand(query,sqlConnection))
                {
                    sqlCommand.Parameters.AddWithValue("@id", id);
                    int rowsAffected = sqlCommand.ExecuteNonQuery();
                }
            }
        }

        [HttpPut("update-user-by-id/{id}")]
        public IActionResult UpdateUser(int id,[FromBody]UserDTO userDTO, CancellationToken cancellationToken)
        {
            var book = _userService.UpdateUser(id, userDTO);
            return Ok(book);
        }
       
        [AllowAnonymous]
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> LogIn(AuthRequestObject authRequest, CancellationToken cancellationToken)
        {
            string connectionString = "Server=.;Database=restaurant;Integrated Security=True;TrustServerCertificate=True";

            string query = "SELECT Email, Password FROM Users WHERE Email = " + "'" + authRequest.email + "'";

            using (SqlConnection connection = new SqlConnection(connectionString))
            using (SqlCommand command = new SqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("Email", authRequest.email);

                try
                {
                    await connection.OpenAsync();
                    using (SqlDataReader reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            string retrievedEmail = reader["Email"].ToString();
                            string retrievedPassword = reader["Password"].ToString();

                            if (!int.TryParse(_configuration["Jwt:Expiration"], out int exp))
                                exp = 20;

                            var expiry = DateTime.Now.AddMinutes(int.Parse(_configuration["Jwt:Expiration"]));

                            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                            var singIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                            var token = new JwtSecurityToken(
                                _configuration["Jwt:Issuer"],
                                _configuration["Jwt:Audience"],
                                expires: DateTime.UtcNow.AddMinutes(exp),
                                signingCredentials: singIn);

                            return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                        }
                        else
                        {
                            return Unauthorized("Invalid email or password");
                        }
                    }
                }
                catch (Exception ex)
                {
                    // Handle exceptions
                    Console.WriteLine(ex.Message);
                    return StatusCode(500, "An error occurred while processing your request.");
                }
            }
        }
    }
}
