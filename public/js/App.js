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

        // Insertion des zones de recherche par critères
        const particularButton = new ParticularButton()
        particularButton.init()

        // Insertion  des lists aux zones de recherche par critères
        let lists = new ParticularButtonList(recipesDatas)
        lists.init()
}
}

const app = new App()
app.main()