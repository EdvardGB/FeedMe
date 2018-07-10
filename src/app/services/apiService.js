import token from '../../../KolonialToken';
let url = 'https://kolonial.no/api/v1/';

//curl -H "Accept: application/json" -H "Content-Type: application/json" -H "User-Agent: EdvardGBakken_Test/1.0" -H "X-Client-Token: n9FWvSYQJHzxDee8x1WFPKcN7HlVYqcpQnbBB7NIiQnmclt8EO" https://kolonial.no/api/v1/products/9329/

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
            'X-Client-Token': token
        })
    })
}

   

