import { Component, OnInit } from '@angular/core';
import {ProductsService} from "./services/products.service";
import {tap} from "rxjs/operators";
import {Product} from "./interfaces/product.interface";
import {ShoppingCartService} from "../../shared/services/shopping-cart.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products!:Product[]
  constructor(private service:ProductsService,private shoppingCartService:ShoppingCartService) { }

  ngOnInit(): void {
    this.service.getPrpoducts().pipe(
      tap((productsResponse: Product[]) => this.products= productsResponse )
    ).subscribe();
  }
  addToCart(currentProduct:Product):void{
    console.log('add to cart',currentProduct);
    this.shoppingCartService.updateCart(currentProduct);
  }

}
