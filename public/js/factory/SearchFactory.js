/* exported SearchFactory */
/* global RecipesCard, ParticularButtonList, Api */
class SearchFactory {
	constructor(searcher,areaToFilter,element){
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

			Template = new RecipesCard(this.element)
			this.areaToFilter.appendChild(Template.createCard())
		} else {

			if (this.element.length > 0) {
				Template = new ParticularButtonList(this.element,this.areaToFilter)
				Template.init()
			} else {
				Template = new ParticularButtonList(recipesDatas,this.areaToFilter)
				Template.init()
			}
		}
	}
}