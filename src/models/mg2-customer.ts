/**
 * Esta clase contiene la información del cliente que se haya logueado.
 */
export class Mg2Customer {
    private orders: any;
    private addresses: any;
    private limits: any;
    private token: string;

    constructor(private usr: string, private pwd: string) { }

    getLoginParams() {
        return { username: this.usr, password: this.pwd };
    }
    getToken() {
        return this.token;
    }
    setToken(token: string) {
        this.token = token;
    }
    getOrders() {
        return this.orders;
    }
    setOrders(orders: any) {
        this.orders = orders;

    }
    setLimits(limits: any) {
        this.limits = limits;
    }
    getLimits() {
        return this.limits;
    }
    getAddresses() {
        return this.addresses;
    }
    setAddresses(addresses) {
        this.addresses = addresses;
    }
}