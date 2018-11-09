# FeedMe
**version: 1.0.0**

Sample application. Only the minimal is implemented!

**WARNING**
- Major bugs
- No error handling
- No universal token for API

## Project description

This project is based on the [Kolonial API](https://github.com/kolonialno/api-docs)
The idea is to search for recipies, add it's ingredients to a shopping list, "go shopping" and then add 
the ingredients to the "fridge" (to be renamed). 

Ingredients should be prioritized by the number of ingredients in the fridge.

# To be done
- Better ui design
- Smarter use of API
- Local storage
- convert into a PWA
- Better coding in general :)

## Install & run
```
npm install
npm start
```
**create KolonialToken.js in ../Feedme (parent) folder with:**
```
const token = 'abckdsnflksdnflads,vhasdlkfubasdjbfsdf' <== your token given to you by Kolonial
export default token
```


