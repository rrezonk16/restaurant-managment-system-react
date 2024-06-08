﻿using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Database.Models;
using Microsoft.EntityFrameworkCore;


namespace Database.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Menu>();

            modelBuilder.Entity<Reservation>();

            //modelBuilder.Entity<Users>();
            modelBuilder.Entity<Users>()
           .HasMany(u => u.Orders)
           .WithOne(o => o.User)
           .HasForeignKey(o => o.userID);

            modelBuilder.Entity<Users>()
            .HasOne(u => u.Role)
            .WithMany()
            .HasForeignKey(u => u.RoleId);

            modelBuilder.Entity<Orders>();

            modelBuilder.Entity<Table>()
         .HasOne(t => t.Order)
         .WithOne(o => o.Table)
         .HasForeignKey<Orders>(o => o.TableId);

            modelBuilder.Entity<MenuItems>()
                .HasOne(mi => mi.Menu)
                .WithMany()
                .HasForeignKey(mi => mi.MenuID);

            modelBuilder.Entity<Roles>();
        }
    }
}
