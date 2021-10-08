import { Component, OnInit } from '@angular/core';
import {DataService} from "../../shared/services/data.service";
import {delay, switchMap, tap} from "rxjs/operators";
import {Store} from "../../shared/Interfaces/stores.interface";
import {NgForm} from '@angular/forms';
import {DateTime} from "luxon";
import {Details, DetailsOrder, Order} from "../../shared/Interfaces/order.interface";
import {Product} from "../products/interfaces/product.interface";
import {ShoppingCartService} from "../../shared/services/shopping-cart.service";
import {Router} from "@angular/router";
import {ProductsService} from "../products/services/products.service";


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  //Properties
  model = {
    name:'',
    store:'',
    shippingAddress:'',
    city:''
  }
  stores:Store[] = [];
  isDevlivery:boolean = true;
  cart:Product[] = [];

  constructor(private dataService:DataService,private shoppingCartService:ShoppingCartService,private  router:Router, private productService:ProductsService) {
    this.checkCarIsEmpty()
  }

  ngOnInit(): void {
    this.getStores()
    this.getDataCart()
  }

  onPickupOrDelivery(value:boolean):void{
    this.isDevlivery = value
  }
  private getStores():void{
    this.dataService.getStores().pipe(
      tap((storeResponse: Store[]) => this.stores= storeResponse )
    ).subscribe()
  }

  onSubmit({ value: formData }: NgForm):void{
    const data:Order = {
      ...formData,
      date:DateTime.now().toLocaleString(),
      isDevlivery: this.isDevlivery
    }
    this.dataService.saveOrders(data).pipe(
      tap(res => console.log('order created',res)),
      switchMap(({ id: orderId }) => {
        const details  = this.buildDetailsOrder();
        return this.dataService.saveDetailsOrder({details,orderId}).pipe(
          tap(res =>{
            console.log('details created',res);
            this.router.navigate(['/checkout/thank-you-page']);
          }),
          delay(2000),
          tap(()=> this.shoppingCartService.resetShoppingCart())
        )
      })
    ).subscribe();
  }

  private buildDetailsOrder():Details[]{
    const details:Details[] = []
    this.cart.forEach(currentProduct =>{
      const {id:productId,name:productName,qty:quantity,stock}  = currentProduct
      const updateStock = (stock - quantity)
      this.productService.updateStock(productId,updateStock).pipe(
        tap(()=> details.push({productId,productName,quantity}))
      ).subscribe()
    })

    return  details
  }
  private getDataCart():void{
    this.shoppingCartService.cartAction$
      .pipe(
        tap((currentProducts:Product[]) => this.cart = currentProducts )
      ).subscribe();
  }
  private checkCarIsEmpty():void{
    this.shoppingCartService.cartAction$.pipe(
      tap((products:Product[])=>{
        if(Array.isArray(products) && !products.length){
          this.router.navigate(['/products'])
        }
      })
    ).subscribe()
  }
}
