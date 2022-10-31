class Search {
    constructor(Recipes) {
        this.Recipes = Recipes    
    }

    search(query) {
        return this.filterRecipes(query)
    }
}

class RecipesSearch extends Search {
    constructor(Recipes) {
        super(Recipes)
    }

    filterRecipes(query) {
        
        return this.Recipes.filter(Recipe =>
            Recipe.name.toLowerCase().includes(query.toLowerCase())
        )
    }
}

class SearchByIngredient extends Search {
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

class SearchByAppliance extends Search {
    constructor(Recipes) {
        super(Recipes)
    }

    filterRecipes(query) {
        
        return this.Recipes.filter(Recipe =>
            Recipe.appliance.toLowerCase().includes(query.toLowerCase())
        )
    }  
}

class SearchByUstensils extends Search {
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
