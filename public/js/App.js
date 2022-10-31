class App {
    constructor() {
        this.recipesSearch = document.getElementById("recipes_search")
        this.recipesList = document.getElementById("recipes_list")
        this.recipesApi = new Api("./private/data/recipes.json")
    }

    async main() {

        // Recupération des données
        const recipesDatas = await this.recipesApi.get()
        
        // Insertion des recettes
        recipesDatas.forEach(recipe => {

            const Template = new RecipesCard(recipe)
            this.recipesList.appendChild(Template.createCard())                    
        })
    }
}

const app = new App()
app.main()