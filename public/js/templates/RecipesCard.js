/* eslint-disable indent */
/* exported RecipesCard */
class RecipesCard {
	constructor(recipe) {
		this.recipe = recipe
	}

	// Creation de cartes des recettes
	createCard(){

		const card = document.createElement("div")
		card.setAttribute("class","ingredients_card")
		card.setAttribute("data-id",this.recipe.id)

		const recipeCard =`
        
            <div class="decoration"></div>
            <div class="ingredients_descrtiption">
                <h2 class="dish_title">
                    <span class="title">${this.recipe.name}</span>
                    <span class="preparation_time">
                        <i class="fa-regular fa-clock"></i>
                        <span class="time">${this.recipe.time} min</span>
                    </span>  
                </h2>
                <p>
                    <span class="components">${this.components()}</span> 
                    <span class="preparation">${this.recipe.description}</span>
                </p>
                <!--complementary_informations-->
                <p class=" complementary_infos none">
                    <span class="servings">
                        <span class="servings_label">Nombre de personne :</span>
                        <span class="servings_quantity"> ${this.recipe.servings}</span>
                    </span>
                    <span class="tools">
                    <span class="appliance">${this.recipe.appliance}</span>
                    <br />
                    <span class="ustensils">${this.recipe.ustensils}</span>                    
                    </span>                    
                </p>             
            </div>
        `
		card.innerHTML = recipeCard

		let preparation = card.children[1].children[1].children[1]
		this.textReducer(preparation)

		return card
	}

	// formatage des composants des ingredients
	components() { 
		const array = this.recipe.ingredients
		let result = []//

		for (let i = 0; i < array.length; i++) {
			const element = array[i]

			switch (element.unit) {
			case undefined:
				element.unit = " "                  
				break
			case "grammes":
				element.unit = "g"                  
				break
			case "cuill??res ?? soupe":
				element.unit = " cuill??res"                 
				break
			case "cuill??res ?? caf??":
				element.unit = " cuill??res"                 
				break
            
			default:
				break
			}

            
            const  hasQuantityProperty = Object.prototype.hasOwnProperty.call(element, "quantity")
            // Si l'objet ingredients n'a pas de propri??t?? quantity
			if (!hasQuantityProperty) {

				element.quantity = " "
			}
            
			result[i] = `<span class="component_title">${element.ingredient}:</span> <span class="component_quantity">${element.quantity}${element.unit}</span>
            <br />  `           
		}

		return result.join("")
	}

	//Reduction du texte de pr??paration
	textReducer(e) { 
		let charactersNumbers = 175 // nombre de caract??res voulu pour le texte de pr??patration
		let initialText = null
        
		if (e.textContent.length > charactersNumbers) {

			initialText =  e.textContent//stockage du texte initial
			e.textContent = reducer(e.textContent)

			// ??tat visible
			e.addEventListener("mouseover", () => {
				e.textContent = initialText
				e.style.overflowY = "scroll"
			})

			// Retour ?? la reducdtion
			e.addEventListener("mouseleave", () => {
				e.textContent = reducer(e.textContent)
				e.style.overflowY = "unset"
			})
		}        

		function reducer(text) {
			return text.slice(0, charactersNumbers).concat("...")
		}
	}
}