import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pagination } from '../../shared/models/pagination';
import { Product } from '../../shared/models/product';
import { ShopParams } from '../../shared/models/shopParms';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl='https://localhost:5001/api/'
  private http=inject(HttpClient);
  types: string[] =[];
  brands: string[] = [];

  getProducts(shopParms: ShopParams){
    let params= new HttpParams();

    if(shopParms.brands.length>0) {
      params=params.append('brands', shopParms.brands.join(','))
    }
    if(shopParms.types.length>0){
        params=params.append('types', shopParms.types.join(','))
      }
     
     if(shopParms.sort){
        params=params.append('sort',shopParms.sort);
     }
     if(shopParms.search){
        params=params.append('search',shopParms.search)
     }
      params= params.append('pageSize', shopParms.pageSize)
      params=params.append('pageIndex', shopParms.pageNumber)

    return this.http.get<Pagination<Product>>(this.baseUrl+ 'products',{params});
  }
  
  getBrands(){
    if(this.brands.length>0)return;
    return this.http.get<string[]>(this.baseUrl+'products/brands').subscribe({
      next: response => this.brands = response
    })
  }

  getTypes(){
    if(this.types.length>0)return;
    return this.http.get<string[]>(this.baseUrl+'products/types').subscribe({
      next: response => this.types = response
    })
  }
}
