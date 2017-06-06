import { Mg2Catalog } from './../../models/mg2-catalog';
import { Mg2Customer } from './../../models/mg2-customer';
import { Mg2Search } from './../../models/mg2-search';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Magento2SearchCriteria } from './magento2-search-criteria';
import 'rxjs/add/operator/map';

/*
  Generated class for the Magento2ServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Magento2ServiceProvider {
  private magentoAPI: string;
  private mg2Search: any = new Mg2Search();
  private mg2Customer: Mg2Customer;
  private mg2Catalog: Array<{
    name: string, imagen: string, icon: string,
    product_count: string, description: string
  }>;
  private mg2Products: Array<{ catalog: any, products: Array<any> }>;

  public headers: any = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http) {
    this.magentoAPI = "http://http://13.56.49.79/rest/V1/"; // Used for app builder
    this.magentoAPI = "/magentoAPI/";
    this.mg2Catalog = [];
    this.mg2Products = [];
    console.log('Hello Magento2ServiceProvider Provider');
  }
  getCategories() {
    let options = new RequestOptions({ headers: this.headers });
    this.headers.append('Content-Type', 'application/json');
    return this.http.get(this.magentoAPI + "categories", options)
      .map(response => response.json());
    // .subscribe(data => {
    //   console.log( data );
    // });
  }

  getProductsByCategoryId(id) {
    let filter = this.mg2Search.filter("category_id", id, null);
    this.mg2Search.addFilter(filter);
    this.mg2Search.addPageSize(50);
    return this.http.get(this.magentoAPI + "products" + "?" + this.mg2Search.getResultFilter())
      .map(response => response.json());
    // .subscribe(data => {
    //   console.log( data );
    // });
  }

  getProductMediaBySku(sku) {
    return this.http.get(this.magentoAPI + "products_media/" + sku + "/media")
      .map(response => response.json());
  }

  /* GETTERS AND SETTERS*/  
  
  setMg2Products(catalog, products) {
    this.mg2Products.push({ catalog: catalog, products: products });
  }

  getMg2Products(){
    return this.mg2Products;
  }

  setMg2Catalog(items) {
    this.mg2Catalog = items;
  }
  getMg2Catalog() {
    return this.mg2Catalog;
  }



}
