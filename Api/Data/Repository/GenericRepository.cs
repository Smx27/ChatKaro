using Microsoft.EntityFrameworkCore;
using ChatKaro.API.Data.Interfaces;

namespace ChatKaro.API.Data.Repository;

/// <summary>
/// Represents a generic repository for performing CRUD operations on entities of type T.
/// </summary>
/// <typeparam name="T">The type of the entity.</typeparam>
public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    private readonly DbContext _context;
    private readonly DbSet<T> _dbSet;

    /// <summary>
    /// Initializes a new instance of the GenericRepository class with the specified DbContext.
    /// </summary>
    /// <param name="context">The DbContext to use for database operations.</param>
    protected GenericRepository(DbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    /// <summary>
    /// Creates an instance of the GenericRepository with the specified DbContext.
    /// </summary>
    /// <param name="context">The DbContext to use for database operations.</param>
    /// <returns>A new instance of GenericRepository.</returns>
    public static GenericRepository<T> CreateInstance(DbContext context)
    {
        return new GenericRepository<T>(context);
    }

    /// <summary>
    /// Asynchronously retrieves all entities of type T.
    /// </summary>
    /// <returns>A task representing the asynchronous operation, containing a collection of entities.</returns>
    public async Task<IEnumerable<T?>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }

    /// <summary>
    /// Asynchronously retrieves an entity of type T by its identifier.
    /// </summary>
    /// <param name="id">The identifier of the entity to retrieve.</param>
    /// <returns>A task representing the asynchronous operation, containing the entity if found; otherwise, null.</returns>
    public async Task<T?> GetByIdAsync(int id)
    {
        return await _dbSet.FindAsync(id);
    }

    /// <summary>
    /// Asynchronously adds a new entity of type T to the database.
    /// </summary>
    /// <param name="entity">The entity to add.</param>
    /// <returns>A task representing the asynchronous operation.</returns>
    public async Task AddAsync(T? entity)
    {
        if (entity != null) await _dbSet.AddAsync(entity);
    }

    /// <summary>
    /// Asynchronously updates an existing entity of type T.
    /// </summary>
    /// <param name="entity">The entity to update.</param>
    /// <returns>A task representing the asynchronous operation.</returns>
    public async Task UpdateAsync(T entity)
    {
        _context.Entry(entity).State = EntityState.Modified;
        await Task.CompletedTask;
    }

    /// <summary>
    /// Asynchronously deletes an entity of type T by its identifier.
    /// </summary>
    /// <param name="id">The identifier of the entity to delete.</param>
    /// <returns>A task representing the asynchronous operation.</returns>
    public async Task DeleteAsync(int id)
    {
        var entity = await _dbSet.FindAsync(id);
        if (entity != null)
        {
            _dbSet.Remove(entity);
        }
    }
}