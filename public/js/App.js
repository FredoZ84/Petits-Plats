/*  global Api, 
    RecipesCard, 
    ParticularButton, 
    ParticularButtonList, 
    SearchForm, 
    SearchByCharacter, 
    ParticularFilter , 
    ParticularSearch
*/
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

		// Insertion des champs de recherche par critères
		const particularButton = new ParticularButton()
		particularButton.init()

		let particularSearchList = Array.from(document.getElementsByClassName("particular_search_list"))

		// Insertion des listes de critère aux champs de recherche pcorrespondant
		particularSearchList.forEach(list => {
            
			const Template = new ParticularButtonList(recipesDatas,list)
			Template.init()
		})

		// Opération du sytème de recherche
		const SearchRecipes = new SearchForm(recipesDatas,this.recipesSearch,this.recipesList,new SearchByCharacter(recipesDatas))                   
		SearchRecipes.render()        
        
		// Filtrage de critères
		const particularDatas = particularButton.datas()
		const particularSearchInput = Array.from(document.getElementsByClassName("particular_search_input"))

		for (let i = 0; i < particularSearchInput.length; i++) {

			particularSearchInput[i].data = particularDatas[i]
		}        

		particularSearchInput.forEach(input => {

			input.addEventListener("focus",()=>{
				if (this.recipesSearch.dataset.filtering) {

					const newRecipesDatas = new SearchByCharacter(recipesDatas).filterRecipes(this.recipesSearch.value)                    

					this.searchListParticular(newRecipesDatas,input.data)  
                    
				} else {     
					this.searchListParticular(recipesDatas,input.data)    
				}                
			}) 
		})               
	}

	// Methide de filtrage de critère
	searchListParticular(Datas,buttonData) {        

		const area = document.getElementById(buttonData.name +"_list")
		const filter = new ParticularFilter(Datas,area.dataset.search_item)
		const list = filter.filteredList(buttonData.searchItem)
		const input = document.getElementById(buttonData.name +"_search")
        
		let searchObject = new ParticularSearch(area)

		const SearchElements = new SearchForm(list,input,area,searchObject)
        
		SearchElements.render() 
	}

    
}

const app = new App()
app.main()