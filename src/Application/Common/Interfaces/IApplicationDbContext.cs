using CleanArchitecture.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    public DbSet<UserToken> UserRefreshTokens { get; }
    public DbSet<ApplicationUser> ApplicationUsers { get;}
    DbSet<TodoList> TodoLists { get; }

    DbSet<TodoItem> TodoItems { get; }

    DbSet<Brand> Brands { get; }

    DbSet<CarModel> CarModels { get; }
    DbSet<CarType> CarTypes { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
