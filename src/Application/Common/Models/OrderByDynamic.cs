using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Domain.Enums;

namespace CleanArchitecture.Application.Common.Models;
public static class QueryExtensions
{
    public static IQueryable<TSource> OrderByDynamic<TSource, TKey>(this IQueryable<TSource> query, Expression<Func<TSource, TKey>> keySelector, SortOrder order)
    {
        return order == SortOrder.Descending ? query.OrderByDescending(keySelector) : query.OrderBy(keySelector);
    }
}