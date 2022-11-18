/* exported SearchForm */
/* global SearchFactory,
		ParticularButtonList
*/
class SearchForm {
	constructor(list,searcher,areaToFilter,SearchObject) {
		this.list = list   
		this.searcher  = searcher /// input de type search
		this.areaToFilter = areaToFilter
		this.SearchObject = SearchObject
		this.mainSearch ="recipes"
	}

	search(query) {   
        
		let SearchedElements = this.SearchObject.search(query)

		this.searchCondition(SearchedElements)
       
		this.displayList(SearchedElements)     
	}

	clearAreaToFilter() {

		this.areaToFilter.innerHTML = ""
	}

	displayList(elements) {

		this.clearAreaToFilter()

		if (this.searcher.name == this.mainSearch ) {
			
			if (elements.length > 0) {

				elements.forEach(element => {

					let searchFactory = new SearchFactory(this.searcher,this.areaToFilter,element)
					searchFactory.insertion()    
				})
				
			} else {
				this.areaToFilter.innerHTML =
				`<h2>
					Aucune recette ne correspond à votre critère… vous pouvez
					chercher « tarte aux pommes », « poisson », etc.
				</h2>`
			}
           
		} else {

			let searchFactory = new SearchFactory(this.searcher,this.areaToFilter,elements)
			searchFactory.insertion()            
		}        
	}
	// Mise à jour des listes des champs de recherche à condition de la recherche principale
	searchCondition(SearchedElements) {        
		
		if (this.searcher.name == this.mainSearch ) {// Si la recherche est principale

			if (SearchedElements.length > 0) {// Si la recherche  principale trouve des recettes                         

				this.updateLists(SearchedElements)               
			} else {// Si la recherche  principale ne trouve pas des recettes    

				this.clearAreaToFilter()           
				this.updateLists(null)  
			}
            
		} else {

			this.updateLists(SearchedElements)            
		}
	}

	onSearch() {

		if (this.searcher.type == "search") {
			
			if (this.searcher.value.length == 0) {
				this.searcher.addEventListener("keyup", e => {
					let query = e.target.value 
	
					if (query.length >= 3) {
						this.searcher.dataset.filtering = true
						this.search(query)
					} else if (query.length < 3) {
						this.searcher.dataset.filtering = false
						this.displayList(this.list)
						this.resetLists()
					}                
				})
			} else {
				let query = this.searcher.value 
				this.search(query)
			}		
            
		} else if (this.searcher.type == "tag") { // Recherche par Tag
			let query = this.searcher.value 
			this.search(query)             
		}       
	}

	// Reinitialisation des listes de champ de recherche
	resetLists() {
		
		if (this.searcher.name == this.mainSearch) {
			this.updateLists(this.list)
		}
	}

	updateLists(list) {

		let particularSearchList = Array.from(document.getElementsByClassName("particular_search_list"))
		
		particularSearchList.forEach(areaList => {

			if (list !== null) {			

				if (this.searcher.name == this.mainSearch) {
					areaList.innerHTML = ""
					const Template = new ParticularButtonList(list,areaList)
					Template.init()					
				}
			} else {

				areaList.innerHTML = ""
			}
		})
	}

	render() {    

		this.onSearch()  
	}
}