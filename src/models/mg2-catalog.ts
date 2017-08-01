export class Mg2Catalog {
    private list: Array<{
        name: string, imagen: string,
        icon: string, product_count: string, description: string
    }>;
    constructor() {
        this.list = [];
    }
    setList(list: any) {
        this.list = list;
    }
    addItem(item: any) {
        this.list.push(item);
    }
    getList() {
        return this.list;
    }

}