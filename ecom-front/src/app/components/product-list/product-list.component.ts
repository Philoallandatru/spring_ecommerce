import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  // templateUrl: './product-list.component.html',
  // templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];

  // inject product service
  constructor(private ProductService: ProductService) {  }


  ngOnInit(): void {
    this.listProducts();
  }

  
  listProducts() {
    this.ProductService.getProductList().subscribe( // method is invoked once you subscribe
      data => {
        this.products = data; // asign results to the product array
      }
    )
  }

}
