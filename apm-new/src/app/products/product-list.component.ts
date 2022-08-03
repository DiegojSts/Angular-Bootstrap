import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProducts } from "./product";
import { ProductService } from "./product.services";

@Component({
  templateUrl: './product-list.component.html',
  providers: [ProductService],
  styleUrls: ['./product-list.component.css']

})
export class ProductListComponent implements OnInit, OnDestroy {
  private _listFilter = '';

  constructor(private productService: ProductService) { }

  pageTitle = "Product List";
  imageWidth = 20;
  imageMargin = 2;
  showImage: boolean = true;
  errorMessage = '';
  sub!: Subscription;
  filteredProducts: IProducts[] = [];
  products: IProducts[] = [];

  get listFilter() {
    return this._listFilter;

  }

  set listFilter(value) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

  performFilter(filterBy: string): IProducts[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProducts) =>

      product.productName.toLocaleLowerCase().includes(filterBy))
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products,
          this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    })
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List:' + message;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}