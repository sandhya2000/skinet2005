import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShopService } from '../../core/services/shop.service';
import { ProductItemComponent } from "./product-item/product-item.component";
import { MatDialog } from '@angular/material/dialog';
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu'
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { ShopParams} from '../../shared/models/shopParms';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    ProductItemComponent,
    MatButton,
    MatIcon,
    MatMenu,
    MatSelectionList,
    MatListOption,
    MatMenuTrigger
],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  private shopService=inject(ShopService);
  private dialogService=inject(MatDialog)
  
  products: Product[] =[];
  
  sortOptions= [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low-High', value: 'priceAsc'},
    {name: 'Price: High-Low', value: 'priceDesc' }
  ]

  shopParms= new ShopParams();

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop(){
    this.shopService.getBrands();
    this.shopService.getTypes();
    this.getProducts()
  }

  getProducts(){
    this.shopService.getProducts(this.shopParms).subscribe({
      next: response=>this.products=response.data,
      error: error=>console.log(error),
      
    });
  } 

  onSortChange(event: MatSelectionListChange){
     const selectedOption= event.options[0];
     if(selectedOption)
     {
      this.shopParms.sort=selectedOption.value;
      this.getProducts();
     }
  }
  openFiltersDialog(){
    const dialogRef= this.dialogService.open(FiltersDialogComponent,{
      minWidth: '500px',
      data:{
         selectedBrands: this.shopParms.brands,
         selectedTypes: this.shopParms.types
      }
    });
   
  dialogRef.afterClosed().subscribe({
    next: result =>{
      if(result){
        console.log(result);
        this.shopParms.brands= result.selectedBrands;
        this.shopParms.types= result.selectedTypes;
        this.getProducts();
      }
    }
  })
    
  }
}
