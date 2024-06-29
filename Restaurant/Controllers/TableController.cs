﻿using Database.Models;
using Database.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Restaurant.DTOs;
using Restaurant.Services;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Restaurant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableController : ControllerBase
    {
        private readonly IRepository<Table> _repository;
        private readonly ITableService _tableService;

        public TableController(IRepository<Table> repository, ITableService tableService)
        {
            _repository = repository;
            _tableService = tableService;
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<Table> GetTable(int id, CancellationToken token)
        {
            return await _repository.Get(id, token);
        }

        [HttpGet]
        [Route("[action]")]
        public IEnumerable<Table> GetTables()
        {
            return _repository.GetAll();
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> AddTable(TableDTO tableDTO, CancellationToken cancellationToken)
        {
            await _tableService.AddTable(tableDTO, cancellationToken);
            return Ok();
        }

        [HttpDelete("delete-table-by-id/{id}")]
        public void DeleteTable(int id)
        {
            string connectionString = "Server=.;Database=restaurant_roles;Integrated Security=True;TrustServerCertificate=True";

            string query = "Delete FROM Table WHERE Id = @id";

            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                sqlConnection.Open();
                using (SqlCommand sqlCommand = new SqlCommand(query, sqlConnection))
                {
                    sqlCommand.Parameters.AddWithValue("@id", id);
                    int rowsAffected = sqlCommand.ExecuteNonQuery();
                    sqlConnection.Close();
                }
            }
        }

        [HttpPut("update-table-by-id/{id}")]
        public IActionResult UpdateTable(int id, [FromBody] TableDTO tableDTO)
        {
            var menu = _tableService.UpdateTable(id, tableDTO);
            return Ok(menu);
        }

        [HttpGet]
        [Route("GetTablesByRestaurantId/{restaurantId}")]
        public async Task<IActionResult> GetTablesByRestaurantId(int restaurantId, CancellationToken token)
        {
            var tables = await _tableService.GetTablesByRestaurantId(restaurantId, token);
            return Ok(tables);
        }
    }
}
