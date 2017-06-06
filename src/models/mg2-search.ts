export class Mg2Search{
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
  constructor(){

  }

  public getResultFilter(){
      return this.resultFilter;
  }

  public filter(field, value, type) {
    return { field: field, value: value, type: type };
  }

  public restartResultFilter() {
    this.resultFilter = "";
    this.andCount = 0;
    this.orCount = 0;
    this.filterCount = 0;
  }

  public and() {
    if (this.filterCount > 0) {
      this.andCount += 1;
    }
  }

  public or() {
    if (this.filterCount > 0) {
      this.orCount += 1;
    }
  }

  public addPageSize(size) {
    this.resultFilter += this.searchPageSize + size;
  }

  public addFilter(filters: any) {
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