import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../model/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-dash-board',
  templateUrl: './product-dash-board.component.html',
  styleUrls: ['./product-dash-board.component.scss']
})
export class ProductDashBoardComponent implements OnInit {
  product: Array<IProduct> = []
  constructor(private productservice: ProductsService) { }

  ngOnInit(): void {
    this.productservice.fetchproducts().subscribe({
      next: res => {
        this.product = res
      },
      error: err => {
        console.log(err);

      }
    })
  }
  trackByFun(index: number, product: IProduct) {
    return product.pid
  }

}
