export class Magento2SearchCriteria {
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

    constructor() {
        console.log('Hello SearchCriteria');
    }

    generateANDFilter(filters: Array<{ field: string, value: string, type: string }>) {
        let result: string = "";
        let aux: string = "";
        for (let i = 0; i < filters.length; i++) {
            aux = this.searchFilterGroups + i + this.searchFilters + "0" + this.searchField + filters[i].field;
            result = this.filterCreator(result, aux + "&");

            aux = this.searchFilterGroups + i + this.searchFilters + "0" + this.searchValue + filters[i].value;

            if (filters[i].type === "like") {
                aux = this.searchFilterGroups + i + this.searchFilters + "0" + this.searchValue + this.wildcard + filters[i].value + this.wildcard;
            }
            result = this.filterCreator(result, aux + "&");
            aux = this.searchFilterGroups + i + this.searchFilters + "0" + this.searchConditionType + filters[i].type;

            result = this.filterCreator(result, aux + "&");
        }
        console.log("Criteria", result);
        return result;
    }

    filterAdd(param) {
        this.resultFilter = this.resultFilter + param;
    }

    getResultFilter() {
        return this.resultFilter;
    }

    restartResultFilter() {
        this.resultFilter = "";
        this.andCount = 0;
        this.orCount = 0;
        this.filterCount = 0;
    }

    and() {
        if (this.filterCount > 0) {
            this.andCount += 1;
        }
    }

    or() {
        if (this.filterCount > 0) {
            this.orCount += 1;
        }
    }

    addPageSize(size){
        this.resultFilter += this.searchPageSize + size;
    }
    
    addFilter(filters: any) {
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
        console.log("Criteria", this.resultFilter);
    }



    generateORFilter(filters: Array<{ field: string, value: string, type: string }>) {
        let result: string = "";
        let aux: string = "";
        for (let i = 0; i < filters.length; i++) {
            aux = this.searchFilterGroups + "0" + this.searchFilters + i + this.searchField + filters[i].field;
            result = this.filterCreator(result, aux + "&");

            aux = this.searchFilterGroups + "0" + this.searchFilters + i + this.searchValue + filters[i].value;
            if (filters[i].type === "like") {
                aux = this.searchFilterGroups + "0" + this.searchFilters + i + this.searchValue + this.wildcard + filters[i].value + this.wildcard;
            }
            result = this.filterCreator(result, aux + "&");
            aux = this.searchFilterGroups + "0" + this.searchFilters + i + this.searchConditionType + filters[i].type;

            result = this.filterCreator(result, aux + "&");
        }
        console.log("Criteria", result);
        return result;
    }

    filterCreator(result, param) {
        return result + param;
    }


}