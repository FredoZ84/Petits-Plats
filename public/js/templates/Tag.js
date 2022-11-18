/* exported Tag*/
/* global SearchByIngredient,
	SearchByAppliance,
	SearchByUstensils,
	SearchForm,
	SearchByCharacter,
	SearchFactory
*/
class Tag {
	constructor(Recipes) {
		this.Recipes = Recipes
		this.searchByTagArea = document.getElementById("search_by_tag_area") 
		this.recipeSearch = document.getElementById("recipes_search") 
	}
    
	//Insertion du tag
	tagInsertion(searchItem) {        
		// Au clique sur un critère
		searchItem.addEventListener("click", (e) => { this.createTag(e.target) })
		// A l'appui de la touche "Entrée" sur un critère
		searchItem.addEventListener("keyup", (e) => {      
            
			if (e.key == "Enter") { this.createTag(e.target) }            
		}) 

		// Attribution de la propriété disabled au critère de liste de référence si tag existant
		if (this.disabledCondition(searchItem)) {
			this.disabledAttribution(searchItem)
		}
	}

	// Creation du tag et gestion de sa suppression
	createTag(e) {
        
		//Effets
		this.disabledAttribution(e) // disabled sur l'input de critère cliqué
		this.recipeSearchEffects("desactivation") // disabled sur l'input de recherche principale

		// Références
		let listArea = e.parentElement // liste d'orgine ex : ingredient ou appareil ou ustensil
		let inputSearch = e.parentElement.previousElementSibling.firstElementChild

		listArea.classList.add("none") // masquage de la liste
		inputSearch.value = inputSearch.getAttribute("data-value_initial") // réinitialisation de la valeur de l'input search
           
		let searchArea = e.parentElement.parentElement // zone de recherche correspondante
		let searchItem = searchArea.children[1].dataset.search_item // définition de l'item de recherche
		let bgColorClass = searchArea.classList[1]

		// Création
		let tag = this.tagFormat(e.value, searchItem, bgColorClass,listArea)
		this.searchByTagArea.appendChild(tag)

		// Opération
		this.tagSearch(tag,this.Recipes)

		// Préparation de suppression
		this.removeTag(tag)
	}

	tagSearch(tag,recipesList) {
		let SearchObject = null
		let areaToFilter = document.getElementById("recipes_list")
		

		switch (tag.dataset.search_item) {
		case "ingredient":
			SearchObject = new SearchByIngredient(recipesList)

			break
		case "appliance":
			SearchObject = new SearchByAppliance(recipesList)
                
			break
		case "ustensils":
			SearchObject = new SearchByUstensils(recipesList)
			break 
        
		default:
			break
		}

		// Filtrage de recette principal
		let SearchRecipes = new SearchForm(recipesList,tag,areaToFilter,SearchObject)
		SearchRecipes.render()
	}

	recipeSearchEffects(e) {

		const desactivation = {
			diasbled:"disabled",
			title:"pour effectuer une nouvelle recherche veuillez actualiser",
			class: "clearUp"
		}

		if (e == "desactivation") {
			for (const property in desactivation) {
			
				this.recipeSearch.setAttribute(property, desactivation[property])
			}		
			
			this.recipeSearch.nextElementSibling.setAttribute("class", desactivation.class)
			
		} else if (e == "activation") {
			for (const property in desactivation) {
			
				this.recipeSearch.removeAttribute(property, desactivation[property])
			}		
			
			this.recipeSearch.nextElementSibling.removeAttribute("class", desactivation.class)
		}

	}

	tagFormat(value, searchItem, bgColorClass,listArea) {
		let tag = document.createElement("div") 
		tag.value = value
		tag.innerHTML = ` <span class="tag_name">${value}</span> <i class="fa-regular fa-circle-xmark"></i>`
		tag.name = "recipes"
		tag.type = "tag"
		tag.setAttribute("class","tag")
		tag.setAttribute("data-search_item",searchItem)
		tag.classList.add(bgColorClass)
		tag.referenceListArea = listArea
		tag.searchRecipeList = this.Recipes // Stockage de la liste par rapport à la recherche correspondante

		return tag
	}


	removeTag(tag) {

		tag.children[1].addEventListener("click", (e) => {
			this.removalEffects(e,tag)
		})

		// Suppression du tag au clavier
		tag.addEventListener("keyup", (e) => {

			if (e.key == "Delete") {this.removalEffects(e,tag)  }           
		})
	}

	removalEffects(e,tag) {

		e.preventDefault()
		e.stopPropagation()

		// Recherche de l'index du critère de référence
		const index = Array.from(tag.referenceListArea.children).findIndex((element) => element.value == tag.value)

		//Définition du critère de référence
		let referenceElement = tag.referenceListArea.children[index]

		// Suppression de la propriété disabled du bouton de référence
		this.removeDisabledAttribution(referenceElement)

		// Suppression du tag
		this.searchByTagArea.removeChild(tag)

		this.originalRecipesList()
		//Mise à jour de la recherche 
		this.searchUpdate()	
		
	}

	originalRecipesList() {
		if (document.getElementsByClassName("tag")) {

			let allTags = Array.from(document.getElementsByClassName("tag"))

			if (allTags.length > 1) {
				console.log(allTags[0].searchRecipeList)
				return allTags[0].searchRecipeList
			}
		}
	}

	//Mise à jour lors de la suppression des tags
	searchUpdate() {

		const recipesSearch = document.getElementById("recipes_search")

		if (recipesSearch.value == "") {
			let allTags = Array.from(document.getElementsByClassName("tag"))
			allTags[0].searchRecipeList = this.originalRecipesList()
			
			if (allTags.length > 1 ) {					

				for (let i = 0; i < allTags.length; i++) {
					const elements = allTags[i]
					console.log(elements)

					this.tagSearch(elements,elements.searchRecipeList)					
					
				}
			} else if (allTags.length === 1 )   {
				const lastTag = allTags[0]	
				// recherches des tag restants		
				this.tagSearch(lastTag,lastTag.searchRecipeList)
				
				
			} else {
				this.recipeSearchEffects("activation")
				let areaToFilter = document.getElementById("recipes_list")
				areaToFilter.innerHTML = ""

				const reset = new SearchFactory(this.recipeSearch,areaToFilter,null)
				reset.insertion()
			}
		} else {
			let areaToFilter = document.getElementById("recipes_list")
			const originalRecipesList = this.originalRecipesList()
			let searchObject = new SearchByCharacter(originalRecipesList)

			const SearchRecipes = new SearchForm(originalRecipesList,recipesSearch,areaToFilter,searchObject)                   
			SearchRecipes.render()  

			let allTags = Array.from(document.getElementsByClassName("tag"))
			allTags[0].searchRecipeList = this.originalRecipesList()
			
			if (allTags.length > 1 ) {					

				for (let i = 0; i < allTags.length; i++) {
					const elements = allTags[i]
					console.log(elements)

					this.tagSearch(elements,elements.searchRecipeList)					
					
				}
			} else if (allTags.length === 1 )   {
				const lastTag = allTags[0]	
				// recherches des tag restants		
				this.tagSearch(lastTag,lastTag.searchRecipeList)
				
			
		}
	}

	// Attribution de la propriété "disabled" au bouton de liste selectionné et de celle title
	disabledAttribution(e) {

		e.setAttribute("disabled","disabled")
		e.setAttribute("title", "Tag déjà inséré")
	}

	// Suppression de la propriiété "disabled" au bouton de liste selectionné
	removeDisabledAttribution(e) {

		if (e.getAttribute("disabled") ) {

			if (e.getAttribute("title") && e.getAttribute("title") == "Tag déjà inséré") {

				e.removeAttribute("disabled","disabled")
				e.removeAttribute("title", "Tag déjà inséré")
			}            
		}        
	}

	// Permet d'éviter les doublons des tags après une recherche au clavier.
	disabledCondition(e) {

		if (document.getElementsByClassName("tag_name")) {
            
			let allTagsName = document.getElementsByClassName("tag_name")
    
			for (let i = 0; i < allTagsName.length; i++) {
                
				if (e.value == allTagsName[i].textContent ) {
                    
					return true
				} 
			}
		}
	}
}