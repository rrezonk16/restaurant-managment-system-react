using Database.Context;
using Database.Models;
using Database.Repository;
using Restaurant.DTOs;
using Restaurant.Mappings;
using System.Reflection.Metadata.Ecma335;

namespace Restaurant.Services
{
    public class TableService : ITableService
    {
        private readonly IRepository<Table> _repository;
        private readonly ILogger<TableDTO> _logger;
        private readonly ApplicationDbContext _context;

        public TableService(IRepository<Table> repository,ILogger<TableDTO> logger,ApplicationDbContext applicationDbContext)
        {
            _repository = repository;
            _logger = logger;
            _context = applicationDbContext;
        }       

        public async Task AddTable(TableDTO tableDTO, CancellationToken cancellationToken)
        {
            tableDTO.Status = "active";
            Table tableToAdd = TableMapper.TableDTOToModel(tableDTO);
            _repository.Add(tableToAdd);
            await _repository.SaveAsync(cancellationToken);
        }

        public Menu UpdateMenu(int id,MenuDTO menuDTO)
        {
            var menu = _context.Set<Menu>().FirstOrDefault(n => n.Id == id);
            if (menu != null)
            {
                menu.Name = menuDTO.Name;
                menu.Description = menuDTO.Description;
                menu.ChefId = menuDTO.ChefId;
                menu.Status = menuDTO.Status;
                _repository.Save();
            }
            return menu;
        }


        public Table UpdateTable(int id, TableDTO tableDTO)
        {
            var table = _context.Set<Table>().FirstOrDefault(n => n.Id == id);
            if (table != null)
            {
                table.RestaurantID = tableDTO.RestaurantID;
                table.Status = tableDTO.Status;
                table.NumberOfSeats = tableDTO.NumberOfSeats;
                _repository.Save();
            }
            return table;
        }

        public async Task<IEnumerable<TableDTO>> GetTablesByRestaurantId(int restaurantId, CancellationToken token)
        {
            var tables = await _repository.GetTablesByRestaurantId(restaurantId, token);
            return tables.Select(TableMapper.ModelToTableDTO).ToList();
        }

        

    }
}