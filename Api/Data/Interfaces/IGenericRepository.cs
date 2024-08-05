namespace ChatKaro.API.Data.Interfaces;

/// <summary>
/// Defines a generic repository interface for performing CRUD operations on entities of type T.
/// </summary>
/// <typeparam name="T">The type of the entity.</typeparam>
public interface IGenericRepository<T> where T : class
{
    /// <summary>
    /// Asynchronously retrieves all entities of type T.
    /// </summary>
    /// <returns>A task representing the asynchronous operation, containing a collection of entities.</returns>
    Task<IEnumerable<T?>> GetAllAsync();

    /// <summary>
    /// Asynchronously retrieves an entity of type T by its identifier.
    /// </summary>
    /// <param name="id">The identifier of the entity to retrieve.</param>
    /// <returns>A task representing the asynchronous operation, containing the entity if found; otherwise, null.</returns>
    Task<T?> GetByIdAsync(int id);

    /// <summary>
    /// Asynchronously adds a new entity of type T.
    /// </summary>
    /// <param name="entity">The entity to add.</param>
    /// <returns>A task representing the asynchronous operation.</returns>
    Task AddAsync(T? entity);

    /// <summary>
    /// Asynchronously updates an existing entity of type T.
    /// </summary>
    /// <param name="entity">The entity to update.</param>
    /// <returns>A task representing the asynchronous operation.</returns>
    Task UpdateAsync(T entity);

    /// <summary>
    /// Asynchronously deletes an entity of type T by its identifier.
    /// </summary>
    /// <param name="id">The identifier of the entity to delete.</param>
    /// <returns>A task representing the asynchronous operation.</returns>
    Task DeleteAsync(int id);
}