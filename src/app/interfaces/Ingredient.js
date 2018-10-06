export default class Ingredient {
    constructor(data){
        const product = data.product ? data.product : data.name ? data : null
        this.alternativeProducts = product.alternativeProducts ? this.aleternatives(product['alternative_products']) : [];
        this.price = product.price || product["gross_price"]
        this.name = product.name;
        this.thumbnail = product.images ? 
            product.images['0'] ? 
                product.images['0'].thumbnail 
                : product.images.thumbnail
            :  null 
        this.id = product.id

        this.mesure = product['unit_price_quantity_abbreviation']
        this.amount;
        this.scale(parseFloat(data['portion_quantity']))
        this.inFridge = false;
        this.inShoppingList = false;
        
    }

    scale(value){
        const mesureFluid = ['l', 'dl', 'cl', 'ml']
        const mesureWeight = ['kg', 'hg', 'g', 'mg']
        let counter = 0
        while(value < 1){
            value = value*10
            counter++
        }
        
        if(this.mesure == 'kg'){  
            this.mesure = mesureWeight[counter]
            if(counter>1){value = value*10}
        } else {
             this.mesure = mesureFluid[counter]
        }
        this.amount = value.toFixed(1)
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
