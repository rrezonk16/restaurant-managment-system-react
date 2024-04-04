using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Database.Models;
using Microsoft.EntityFrameworkCore;

namespace Database.Context
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)  : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Menu>();
            modelBuilder.Entity<MenuItems>();
            modelBuilder.Entity<Users>();
            modelBuilder.Entity<Roles>();
        }
    }
}
