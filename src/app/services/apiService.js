import token from '../../../../KolonialToken';
let url = 'https://kolonial.no/api/v1/';

export function getAPIProduct(kategory, product){
    return fetch(url + kategory + '/' + product + '/', { 
        headers : new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Client-Token': token
        })
    })
}

export function getAPI(spesificUrl){
    return fetch(url + spesificUrl, { 
        headers : new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Client-Token': token,
        })
    })
}

export function ingredientAPISearch(string){
    return fetch(url +"search/?q=" + string, { 
        headers : new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Client-Token': token,
        })
    })
}

export function recipetAPISearch(string){
    return fetch(url +"search/recipes/?q=" + string, { 
        headers : new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Client-Token': token,
        })
    })
}
