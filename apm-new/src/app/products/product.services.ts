import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { IProducts } from "./product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

  private productUrl = 'api/products/products.json';

  constructor(private http: HttpClient){}

    getProducts(): Observable<IProducts[]> {
        return this.http.get<IProducts[]>(this.productUrl)
        .pipe(
          tap(data =>  JSON.stringify(data)),
          catchError(this.handleError)
        );

    }

    getProduct(id: number): Observable<IProducts | undefined> {
      return this.getProducts()
      .pipe(
        map((products: IProducts[]) => products.find(p => p.productId === id))
      );
    }
   


    private handleError(err: HttpErrorResponse){
      let errorMessage = '';

      if (err.error instanceof ErrorEvent){
        console.log(`An error ocurried', ${err.message}`);
      } else {
        errorMessage = `Server returned code ${err.status}, error message is ${err.error.message}`
      }
      console.log(errorMessage);
      return throwError(()=> errorMessage);
    }
}