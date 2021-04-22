import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private productService: ProductService, 
              private route: ActivatedRoute) { }
  product: Product = new Product();


  ngOnInit(): void {
    this.route.paramMap.subscribe(
      data => {
        this.handleProductDetails();
    });
  }

  handleProductDetails() {
    const theProductId: number = +this.route.snapshot.paramMap.get('id'); // get id from param

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    );
  }

}
