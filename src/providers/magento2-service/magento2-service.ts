import { Mg2Catalog } from './../../models/mg2-catalog';
import { Mg2Customer } from './../../models/mg2-customer';
import { Mg2Search } from './../../models/mg2-search';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
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
  private token: any;
  private mg2Products: Array<{ catalog: any, products: Array<any> }>;

  public headers: any = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http) {
    this.magentoAPI = "http:/magento.docker.local/rest/V1/"; // Used for app builder
    this.magentoAPI = "/magentoAPI/";
    this.mg2Catalog = [];
    this.mg2Products = [];
    this.token = null;
    console.log('Hello Magento2ServiceProvider Provider');
  }

  customerInfoService() {
    let headers = this.headers;
    headers.append('Authorization', "Bearer " + this.token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.magentoAPI + "customers/me", options)
      .map(response => response.json());
    // .subscribe(data => {console.log(data, "STRING: ", JSON.stringify(data));});

  }

  registerNewCustomer(token, request) {
    let headers = this.headers;
    headers.append('Authorization', "Bearer " + token);
    let options = new RequestOptions({ headers: headers });
    let data = {
      customer : {
        email: request.email,
        firstname: request.name,
        lastname: request.lastnames,
        gender: ()=>{switch(request.gender){ case "male": return 1; case "female": return 2; default : return 0;}}
      },password: request.pwd
    }
    console.log(JSON.stringify(data));
    return this.http.post(this.magentoAPI + "customers", data,options)
      .map(response => response.json());

  }

  adminServiceToken() {
    let options = new RequestOptions({ headers: this.headers });
    let credentials = new Mg2Customer("user", "bitnami1");
    return this.http.post(this.magentoAPI + "integration/admin/token",
      credentials.getLoginParams()).map(response => response.json());

  }

  loginService(data) {
    let options = new RequestOptions({ headers: this.headers });
    this.mg2Customer = new Mg2Customer(data.usr, data.pwd);
    return this.http.post(this.magentoAPI + "integration/customer/token",
      this.mg2Customer.getLoginParams()).map(response => response.json());
    // .subscribe(data => { console.log(data, "STRING:", JSON.stringify("data")) });

  }

  activateCustomerService(token, email, key) {
    let headers = this.headers;
    headers.append('Authorization', "Bearer " + token);
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.magentoAPI + "customers/" + email + "/activate",
      { confirmationKey: key }, options)
      .map(response => response.json());

  }

  getCategories() {
    let options = new RequestOptions({ headers: this.headers });
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

  getMg2Products() {
    return this.mg2Products;
  }

  setMg2Catalog(items) {
    this.mg2Catalog = items;
  }

  getMg2Catalog() {
    return this.mg2Catalog;
  }

  getToken() {
    return this.token;
  }
  setToken(token) {
    this.mg2Customer.setToken(token);
    this.token = token;
    console.log("TOKEN Updated", token);
  }




}
