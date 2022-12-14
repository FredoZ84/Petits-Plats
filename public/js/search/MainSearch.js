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
        
        return this.Recipes.filter(Recipe =>
            Recipe.name.toLowerCase().includes(query.toLowerCase())
        )
    }
}

class SearchByIngredient extends MainSearch {
    constructor(Recipes) {
        super(Recipes)
    }

    filterRecipes(query) {
        
        return this.Recipes.filter(Recipe => {
            return Recipe.ingredients.some(ingredient =>
              ingredient.ingredient.toLowerCase().includes(query.toLowerCase()))
        })        
    }  
}

class SearchByAppliance extends MainSearch {
    constructor(Recipes) {
        super(Recipes)
    }

    filterRecipes(query) {
        
        return this.Recipes.filter(Recipe =>
            Recipe.appliance.toLowerCase().includes(query.toLowerCase())
        )
    }  
}

class SearchByUstensils extends MainSearch {
    constructor(Recipes) {
        super(Recipes)
    }

    filterRecipes(query) {
        
        return this.Recipes.filter(Recipe => {
            return Recipe.ustensils.some(ustensil =>
              ustensil.toLowerCase().includes(query.toLowerCase()))
        })        
    }  
}

class SearchByDescription extends MainSearch {
    constructor(Recipes) {
        super(Recipes)
    }

    filterRecipes(query) {
        
        return this.Recipes.filter(Recipe =>
            Recipe.description.toLowerCase().includes(query.toLowerCase())
        )
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