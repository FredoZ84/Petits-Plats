/* eslint-disable indent */
/* exported RecipesSearch,
    SearchByIngredient,
    SearchByAppliance,
    SearchByUstensils,
    SearchByCharacter
*/
class MainSearch {
    constructor(Recipes) {
        this.Recipes = Recipes    
    }

    search(query) {
        return this.filterRecipes(query)
    }
}

class RecipesSearch extends MainSearch {
    constructor(Recipes) {
        super(Recipes)
    }

    filterRecipes(query) {

        let answer = []

        for (let i = 0; i < this.Recipes.length; i++) {
                
            if (this.Recipes[i].name.toLowerCase().includes(query.toLowerCase())) {                    

                answer.push(this.Recipes[i])
            }        
        } 
        
        return answer
    }
}

class SearchByIngredient extends MainSearch {
    constructor(Recipes) {
        super(Recipes)
    }

    filterRecipes(query) {

        let answer = []
        
        for (let i = 0; i < this.Recipes.length; i++) {
            for (let a = 0; a < this.Recipes[i].ingredients.length; a++) {
                if (this.Recipes[i].ingredients[a].ingredient.toLowerCase().includes(query.toLowerCase())) { 

                    answer.push(this.Recipes[i])
                } 
            }            
        }
        
        return answer
    }  
}

class SearchByAppliance extends MainSearch {
    constructor(Recipes) {
        super(Recipes)
    }

    filterRecipes(query) {
        
        let answer = []

        for (let i = 0; i < this.Recipes.length; i++) {
                
            if (this.Recipes[i].appliance.toLowerCase().includes(query.toLowerCase())) {                    

                answer.push(this.Recipes[i])
            }      
        } 
        
        return answer
    }  
}

class SearchByUstensils extends MainSearch {
    constructor(Recipes) {
        super(Recipes)
    }

    filterRecipes(query) {
        
        let answer = []
        
        for (let i = 0; i < this.Recipes.length; i++) {
            for (let a = 0; a < this.Recipes[i].ustensils.length; a++) {
                if (this.Recipes[i].ustensils[a].toLowerCase().includes(query.toLowerCase())) { 

                    answer.push(this.Recipes[i])
                } 
            }            
        }
        
        return answer       
    }
}

class SearchByCharacter extends MainSearch {
    constructor(Recipes) {
        super(Recipes)
    }

    filterRecipes(query) {

        const searchName = new RecipesSearch(this.Recipes)

        const searchByIngredient =  new SearchByIngredient(this.Recipes)

        const searchByDescription = new SearchByDescription(this.Recipes)

        const array = searchName.filterRecipes(query).concat(searchByIngredient.filterRecipes(query),searchByDescription.filterRecipes(query))
                        
        // Filtrage des resultats ;suppression des doulons
        const filteredArray = array.filter((ele,pos) => array.indexOf(ele) == pos)
        
        return filteredArray
    }  
}