using Microsoft.EntityFrameworkCore;

namespace ChatKaro.API.Helpers;

public class PagedList<T> : List<T>
{
    public PagedList(IEnumerable<T> item, int count, int pageNumber, int pageSize )
    {
        CurrentPage = pageNumber;
        TotalPages = (int) Math.Ceiling(count/(double) pageSize);
        PageSize = pageSize;
        TotalCount = count;
        AddRange(item);
    }

    public int CurrentPage { get; set; }
    public int TotalPages { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="source"></param>
    /// <param name="pageNumber"></param>
    /// <param name="pageSize"></param>
    /// <returns></returns>
    public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize)
    {
        var count = await source.CountAsync();

        var items = await source.Skip((pageNumber - 1)*pageSize).Take(pageSize).ToListAsync();
            
        return new PagedList<T>(items,count,pageNumber,pageSize);
    }
}