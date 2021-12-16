class MyCart {
    constructor(){
        this.carts = [];
        try {
            this.carts = JSON.parse(localStorage.getItem("myCart"));
        } catch (e) {

        }
        if(!this.carts){
            this.carts = [];
        }
    }
    check = (product) => {
        var t = this.carts.filter(function(e){
            return (e.name == product.name) && (e.sheet == product.sheet);
        })
        if(t.length > 0){
            return true;
        } else {
            return false;
        }
    }
    reload = () => {
        localStorage.setItem("myCart", JSON.stringify(this.carts));
        this.carts = JSON.parse(localStorage.getItem("myCart"));
    }
    add = (product) => {
        if(this.check(product)){

        } else {
            this.carts.push(product);
            this.reload();
        }
    }
    remove = (product) => {
        if(this.check(product)){
            var index = this.carts.findIndex(e => {
                return (e.sheet == product.sheet) && (e.name == product.name);
            });
            this.carts.splice(index, 1);
            this.reload();
        } else {

        }
    }
    getProducts = () => {
        var d = [];
        this.carts.forEach(function(e){
            d.push(new CretaCart(e));
        })
        d.sort(function(a,b){
            if(a.getName() > b.getName()){
                return 1;
            } else if (b.getName() > a.getName()) {
                return -1;
            } else {
                return 0;
            }
        })
        return d;
    }
    getTotal = () => {
        var total = 0;
        this.carts.forEach(function(e){
            total += e.price * e.quanlity;
        })
        return total;
    }
    send = (name, phone, code, next) => {
        $.post("/api/carts", {
            name: name,
            phone: phone,
            cart: this.carts,
            code: code
        }, function(d){
            if(typeof next == "function"){
                next(d);
            }
        })
    }
    clear = () => {
        this.carts = [];
        this.reload();
    }
}

var my_cart = new MyCart();
class CretaCart {
    constructor(product){
        if(product == undefined){
            product = {}
        }
        this.data = product;
        this.data.quanlity = product.quanlity || 1;
        this.quanlity = this.data.quanlity || 1;
        this.cart = my_cart;
    }
    add = function(){
        this.cart.add(this.data);
    }
    remove = function(){
        this.cart.remove(this.data);
    }
    check = function(){
        return this.cart.check(this.data);
    }
    getName = () => {
        return this.data.name;
    }
    getPrice = () => {
        return this.data.price;
    }
    change = ()=>{
        console.log(this);
    }
    setQuanlity = (num) => {
        this.data.quanlity = num;
        this.cart.remove(this.data);
        this.cart.add(this.data);
    }
    getQuanlity = () => {
        return this.data.quanlity;
    }
}

Vue.component("add-cart", {
    props: ['product'],
    data: function(){
        return{
            model: new CretaCart()
        }
    },
    methods: {
        
    },
    created: function(){
        this.model = new CretaCart(this.product);
    },
    template: `
        <div>
            <div v-if="model.check() == false">
                <button type="button" class="btn btn-warning" @click="model.add()"><i class="material-icons">add_shopping_cart</i></button>
            </div>
            <div v-else>
                <button type="button" class="btn btn-secondary" @click="model.remove()"><i class="material-icons">add_shopping_cart</i></button>
            </div>
        </div>
    `
})