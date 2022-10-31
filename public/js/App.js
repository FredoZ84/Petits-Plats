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

        // Filtrage de recette principal
        const SearchRecipes = new SearchForm(recipesDatas,this.recipesSearch,this.recipesList,new RecipesSearch(recipesDatas))
        SearchRecipes.render()
        
        // Filtrage de critères
        const  particularDatas = particularButton.datas()

        particularDatas.forEach(particularData => {

            this.searchListParticular(recipesDatas,particularData) 
        }) 
    }

    // Methide de filtrage de critère
    searchListParticular(Datas,buttonData) {

        const particularButtonList = new ParticularButtonList()
        const list = particularButtonList.filteredList(Datas,buttonData.searchItem)
        const input = document.getElementById(buttonData.name +"_search")
        const area = document.getElementById(buttonData.name +"_list")
        const searchObject = new ParticularSearch(area)

        const SearchElements = new SearchForm(list,input,area,searchObject)
        SearchElements.render() 
    }
}

const app = new App()
app.main()