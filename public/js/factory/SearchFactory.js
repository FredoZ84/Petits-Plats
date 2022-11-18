/* exported SearchFactory */
/* global RecipesCard, ParticularButtonList, Api */
class SearchFactory {
	constructor(searcher,areaToFilter,element) {
		this.mainSearch = "recipes"
		this.searcher = searcher
		this.areaToFilter = areaToFilter
		this.element = element
		this.recipesApi = new Api("./private/data/recipes.json")      
	}

	async insertion() {

		const recipesDatas = await this.recipesApi.get()

		let Template = null
		


		if (this.searcher.name === this.mainSearch) {

			if (this.element == null) {
				this.reset(recipesDatas)
			} else {
				Template = new RecipesCard(this.element)
				this.areaToFilter.appendChild(Template.createCard())
			}

		} else {			

			Template = new ParticularButtonList(recipesDatas,this.areaToFilter)
			Template.searchItemFormatAll(this.element)
			
		}
	}

	reset(datas) {
		// Réinsertion des recettes
		datas.forEach(recipe => {

			const Template = new RecipesCard(recipe)
			this.areaToFilter.appendChild(Template.createCard())                    
		})

		let particularSearchList = Array.from(document.getElementsByClassName("particular_search_list"))

		// Insertion des listes de critère aux champs de recherche pcorrespondant
		particularSearchList.forEach(list => {
			
			const Template = new ParticularButtonList(datas,list)
			Template.init()
		})
	}
}