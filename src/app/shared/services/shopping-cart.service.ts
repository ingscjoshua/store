import {Injectable} from "@angular/core";
import {Product} from "../../pages/products/interfaces/product.interface";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn:'root'
})
export class ShoppingCartService{
  products:Product[] = [] ;
  private cartSubject = new BehaviorSubject<Product[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);
  private quantitySubject = new BehaviorSubject<number>(0);

   get totalAction$(): Observable<number>{
     return this.totalSubject.asObservable();
  }
  get totalquantityAction$(): Observable<number>{
     return this.quantitySubject.asObservable();
  }
  get cartAction$(): Observable<Product[]>{
     return this.cartSubject.asObservable();
  }

  updateCart(product:Product):void{
     this.addToCart(product);
     this.quantityProducts();
     this.calcTotal();
  }

  private addToCart(currentProduct:Product):void{
     const isProductoInCart = this.products.find(({id})=>id === currentProduct.id)
    if(isProductoInCart){
      isProductoInCart.qty += 1
    }
    else {
     currentProduct.qty = 1
      this.products.push(currentProduct);
    }
    this.cartSubject.next(this.products);
  }

  private quantityProducts():void{
     const totalQuantity = this.products.reduce((currentTotal,product) => currentTotal += product.qty,0);
     this.quantitySubject.next(totalQuantity);
  }

  private  calcTotal():void{
     const total = this.products.reduce((currentTotal,product) => currentTotal +=(product.price * product.qty),0);
     this.totalSubject.next(total);
  }

  resetShoppingCart():void{
     this.cartSubject.next([])
    this.totalSubject.next(0)
    this.quantitySubject.next(0)
    this.products = []
  }

}
