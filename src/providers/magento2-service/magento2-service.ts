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

  public headers: any = new Headers({ 'Content-Type': 'application/json' });
  private resultFilter: string = "";
  private andCount: any = 0;
  private orCount: any = 0;
  private filterCount: any = 0;

  public searchPageSize: string = "searchCriteria[page_size]=";
  public searchFilterGroups: string = "searchCriteria[filter_groups][";
  public searchFilters: string = "][filters][";
  public searchField: string = "][field]=";
  public searchValue: string = "][value]=";
  public searchConditionType: string = "][condition_type]=";
  public wildcard: string = "%25";

  constructor(public http: Http) {
    this.magentoAPI = "http://http://13.56.49.79/rest/V1/"; // Used for app builder
    this.magentoAPI = "/magentoAPI/";                        // Used for localhost test
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
    let filter = this.filter("category_id", id, null);
    this.addFilter(filter);
    this.addPageSize(50);
    return this.http.get(this.magentoAPI + "products" + "?" + this.resultFilter)
      .map(response => response.json());
    // .subscribe(data => {
    //   console.log( data );
    // });
  }

  getProductMediaBySku(sku){

    return this.http.get(this.magentoAPI + "products_media/"+ sku + "/media")
      .map(response => response.json());

  }

  /**
   * ADD FROM HERE TO CLASS
   */
  private filter(field, value, type) {
    return { field: field, value: value, type: type };
  }

  private restartResultFilter() {
    this.resultFilter = "";
    this.andCount = 0;
    this.orCount = 0;
    this.filterCount = 0;
  }

  private and() {
    if (this.filterCount > 0) {
      this.andCount += 1;
    }
  }

  private or() {
    if (this.filterCount > 0) {
      this.orCount += 1;
    }
  }

  private addPageSize(size) {
    this.resultFilter += this.searchPageSize + size;
  }

  private addFilter(filters: any) {
    let aux: string = "";
    this.filterCount++;
    aux = this.searchFilterGroups + this.andCount + this.searchFilters + this.orCount + this.searchField + filters.field;
    this.filterAdd(aux + "&");
    aux = this.searchFilterGroups + this.andCount + this.searchFilters + this.orCount + this.searchValue + filters.value;
    if (filters.type !== null) {
      if (filters.type === "like") {
        aux = this.searchFilterGroups + this.andCount + this.searchFilters + this.orCount + this.searchValue + this.wildcard + filters.value + this.wildcard;
      }
      this.filterAdd(aux + "&");
      aux = this.searchFilterGroups + this.andCount + this.searchFilters + this.orCount + this.searchConditionType + filters.type;
      this.filterAdd(aux + "&");
    }
    else{
      this.filterAdd(aux + "&");
    }
    console.log("Criteria", this.resultFilter);
  }

  private filterAdd(param) {
    this.resultFilter = this.resultFilter + param;
  }

}
