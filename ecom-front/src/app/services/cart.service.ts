import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  storage: Storage = sessionStorage;

  constructor() { 
    let data = JSON.parse(this.storage.getItem('cartItem'));

    if (data != null) {
      this.cartItems = data;
      this.computeCartTotals();
    }
  }

  persistCartItems() {
    this.storage.setItem('cartItem', JSON.stringify(this.cartItems));

  }

  addToCart(theCartItem) {
    // check if the item is already in the cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id == theCartItem.id)
    }

    // check if we found it
    alreadyExistsInCart = (existingCartItem != undefined);

    if (alreadyExistsInCart) {
      existingCartItem.quantity += 1;
    } else {
      this.cartItems.push(theCartItem);
    }

    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log the cart data for debugging purpose
    this.logCartData(totalPriceValue, totalQuantityValue);

    this.persistCartItems();

  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart:');
    for (let tempCartItem of this.cartItems) {
      console.log(`name+ ${tempCartItem.name}`);

    }
    console.log(`${totalPriceValue}, ${totalQuantityValue}`);
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;
    if (theCartItem.quantity == 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id == theCartItem.id);

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }
}
