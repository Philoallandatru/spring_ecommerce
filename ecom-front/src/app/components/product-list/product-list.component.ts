import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number;
  currentCategoryName: string;



  // inject product service
  constructor(private ProductService: ProductService, 
              private route: ActivatedRoute) {  }



  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  
  listProducts() {
    // check id parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {

      // get the 'id' param string, and convert to a number using the '+' symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
      this.currentCategoryName = this.route.snapshot.paramMap.get('name');
    } else {
      // not category id available, default to category id is 1
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }

    this.ProductService.getProductList(this.currentCategoryId).subscribe( // method is invoked once you subscribe
      data => {
        this.products = data; // asign results to the product array
      }
    )
  }

}
