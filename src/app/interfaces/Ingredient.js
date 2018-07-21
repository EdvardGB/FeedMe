export default class Ingredient {
    constructor(data){
        this.alternativeProducts = this.aleternatives(data['alternative_products']);
        this.price = data['gross_price'];
        this.name = data.name;
        this.thumbnail = data.images ? data.images.thumbnail : null 
        this.id = data.id

        this.inFridge = false;
        this.inShoppingList = false;
    }

    aleternatives(products){
        if (products){
            return products.map(product =>{
                return new Ingredient(product)
            })
        }
        return null
    }


}
