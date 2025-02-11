using System;
using System.Linq.Expressions;

namespace Core.Interfaces;

public interface ISpecification<T>
{
  Expression<Func<T, bool>>? Creteria { get; }

  Expression<Func<T, object>>? OrderBy { get; }
  Expression<Func<T, object>>? OrderByDescending { get; }
  bool IsDistinct {get; }
}

public interface ISpecification<T,TResult> :ISpecification<T>
{
  Expression<Func<T, TResult>>? select {get;}
}