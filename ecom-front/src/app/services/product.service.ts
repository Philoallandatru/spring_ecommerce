import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from "rxjs/operators";
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = "http://localhost:8080/api/products";
  
  private searchUrl = "http://localhost:8080/api/product-category";

  constructor(private httpClient: HttpClient) { }

  getProduct(theProductId: number): Observable<Product> {
    const ProductUrl = `${this.baseUrl}/${theProductId}`
    return this.httpClient.get<Product>(ProductUrl);
  }



  // returns an observable, map the json data from spring date rest to product array
  getProductList(theCategoryId: number): Observable<Product[]> {

    //  need to build url based on category
    const searchUrl =  `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
 }

  getProductCategories() {
    return this.httpClient.get<GetResponseProductCategory>(this.searchUrl).pipe(

      // map the json data from spring data rest to productCategory array
      map(response => response._embedded.productCategory)
    );
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    //need to build url based on keyword
    const searchUrl =  `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}

// unwraos the json from spring date rest _embedded entry
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}


