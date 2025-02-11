using System;
using System.Reflection.Metadata.Ecma335;
using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Data;

public class SpecificationEvaluator<T> where T : BaseEntity
{
    public static IQueryable<T> GetQuery(IQueryable<T> query, ISpecification<T> spec)
    {
        if(spec.Creteria!=null)
        {
            query= query.Where(spec.Creteria);
        }

        if(spec.OrderBy!=null)
        {
            query =query.OrderBy(spec.OrderBy);
        }

        if(spec.OrderByDescending!=null)
        {
            query =query.OrderByDescending(spec.OrderByDescending);
        }

        if(spec.IsDistinct)
        {
            query=query.Distinct();
        }

        return query;
    }
    public static IQueryable<TResult> GetQuery<TSpec,TResult>(IQueryable<T> query, ISpecification<T, TResult> spec)
    {
        if(spec.Creteria!=null)
        {
            query= query.Where(spec.Creteria);
        }

        if(spec.OrderBy!=null)
        {
            query =query.OrderBy(spec.OrderBy);
        }

        if(spec.OrderByDescending!=null)
        {
            query =query.OrderByDescending(spec.OrderByDescending);
        }
        var selectQuery=query as IQueryable<TResult>;
        if(spec.select!=null)
        {
            selectQuery=query.Select(spec.select);
        }

        if(spec.IsDistinct)
        {
            selectQuery=selectQuery?.Distinct();
        }

        return selectQuery ?? query.Cast<TResult>();
    }
}
