/* exported ParticularButtonList */
/* global ParticularFilter, Tag  */
class ParticularButtonList {
	constructor(Recipes,area) {
		this.Recipes = Recipes
		this.area = area
		this.particularSearchArea = document.getElementById("particular_search_area")
	}
    
	//Retoune la liste avec l'input tag
	init() {
        
		let filter = new ParticularFilter(this.Recipes,this.area.dataset.search_item)
        
		let filteredList = filter.filteredList()// liste non formattée

		this.searchItemFormatAll(filteredList,this.area) // formattage des listes
	} 
    
	// Mets en majuscule le premier caractère d'un mot ou d'un texte
	uppercaseFirstCharacter(string) {
        
		return string[0].toUpperCase() +  string.slice(1)
	}
    
	// Encadre un texte dans une balise de paragraphe
	searchItemFormat(string) {
		string = this.uppercaseFirstCharacter(string)

		let input = document.createElement("input")
		input.type = "button" 
		input.setAttribute("value",string)  
		input.setAttribute("class","criterion")      

		this.area.appendChild(input)

		this.presetEffects(input)
        
		// Association des tags
		let tag = new Tag(this.Recipes)
		tag.tagInsertion(this.area.lastChild)
	}

	searchItemFormatAll(list) {

		for (let i = 0; i < list.length; i++) {

			this.searchItemFormat(list[i])            
		}

		/*Navigation par clavier, à la sortie du dernier critère de la dernière zone,
        retour au focus de la recherche principale*/
        
		const AllParticularSearchList  = document.getElementsByClassName("particular_search_list")
		const lastParticularSearchList = AllParticularSearchList[AllParticularSearchList.length - 1]

		if (this.area == lastParticularSearchList) {

			const ultimateCriterion = this.area.lastChild
			ultimateCriterion.addEventListener("focus", () => {
				ultimateCriterion.addEventListener("keyup", (e)=> {
					if (e.key == "Tab") {
						const recipesSearch = document.getElementById("recipes_search")
						recipesSearch.focus()
					}
				})
			})
		}  
	}

	// Effet de pré sélection sur un bouton de recherche
	presetEffects(searchItem) {
		// Post- création
		let inputSearch = searchItem.parentElement.previousElementSibling.firstElementChild 

		searchItem.addEventListener("mouseover", temporaryValue)

		searchItem.addEventListener("focus", temporaryValue)

		//Affectation d'une valeur temporaire
		function temporaryValue(e) {
			inputSearch.value = e.target.value
		} 
	}
}