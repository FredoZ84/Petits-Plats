class Tag {
    constructor(Recipes) {
        this.Recipes = Recipes
        this.searchByTagArea = document.getElementById("search_by_tag_area") 
        this.recipesList = document.getElementById("recipes_list")    
    }
    
   //insertion unique du tag
    tagInsertion(searchItem) {        
        
        searchItem.addEventListener("click", (e) => { this.createTag(e.target) })

        searchItem.addEventListener("keyup", (e) => {      
            
            if (e.key == "Enter") { this.createTag(e.target)  }            
        }) 

        // Attribution de la propriété disabled au bouton de liste de référence si tag existant
        if (this.disabledCondition(searchItem)) {
            this.disabledAttribution(searchItem)
        }
    }

    // Creation du tag et gestion de sa suppression
    createTag(e) {

        this.disabledAttribution(e)    

        let listArea = e.parentElement

        listArea.classList.add("none") // masquage de la liste 

        let inputSearch = e.parentElement.previousElementSibling.firstElementChild 

        inputSearch.value = inputSearch.getAttribute("data-value_initial")
        
        let searchArea = e.parentElement.parentElement // zone de recherche correspondante
        let searchItem = searchArea.children[1].dataset.search_item // définition de l'item de recherche
        let bgColorClass = searchArea.classList[1]

        let tag = document.createElement("button") 
            tag.value = e.value
            tag.innerHTML = ` <span class="tag_name">${e.value}</span> <i class="fa-regular fa-circle-xmark"></i>`
            tag.name = "recipes"
            tag.type = "button"
            tag.setAttribute("class","tag")
            tag.setAttribute("data-search_item",searchItem)
            tag.classList.add(bgColorClass)
            tag.referenceListArea = e.parentElement
            
        this.searchByTagArea.appendChild(tag)

        this.activeTag(tag)

        this.activeTagEvent(tag)

        this.removeTag(tag)

    }

    // Attribution de la classe Active
    activeTag(tag) {

        // attribution d'un soulignage à partir du second tag
        if (this.searchByTagArea.children.length > 1 ) {
            tag.classList.add("underline")
        }

        tag.classList.add("active")
        
        this.desactiveTag(tag) 
        
        this.searchTag(tag)
    }

    activeTagEvent(tag) {

        tag.addEventListener("click", (e) => {

            e.preventDefault()
            e.stopPropagation()  
            this.activeTag(tag)            
        })
    }

    removeTag(tag) {

        tag.children[1].addEventListener("click", (e) => {
            this.removalEffects(e,tag)
        })

        // Suppression du tag au clavier
        tag.addEventListener("keyup", (e) => {

            if (e.key == "Delete") {this.removalEffects(e,tag)  }           
        })        

        /*tag.addEventListener("focus", (e) => {

            alert("appuyer sur suppr pour supprimé le tag")           
        })*/
    }

    removalEffects(e,tag) {

        // Si on suuprime le tag actif alors la liste des recette est raz
        if (tag.classList.contains("active")) {

            alert("Liste des recettes raz")
            this.recipesList.innerHTML = ""

            this.Recipes
            .forEach(recipe => {

                const Template = new RecipesCard(recipe)
                this.recipesList.appendChild(Template.createCard())                    
            })
        }

        e.preventDefault()
        e.stopPropagation()

        // Recherche de l'index du bouton de référence
        const index = Array.from(tag.referenceListArea.children).findIndex((element) => element.value == tag.value)

        //Définition du bouton de référence
        let referenceElement = tag.referenceListArea.children[index]

        // Suppression de la propriété disabled du bouton de référence
        this.removeDisabledAttribution(referenceElement)

        // Suppression du tag
        this.searchByTagArea.removeChild(tag)            
    }

    // Suppression de la classe active
    desactiveTag(tag) {


        if (document.getElementsByClassName("tag")) {
            let allTags = document.getElementsByClassName("tag")

            for (let i = 0; i < allTags.length; i++) {

                if (tag !== allTags[i]) {

                    if (allTags[i].classList.contains("active")) {
    
                        allTags[i].classList.remove("underline")
                        allTags[i].classList.remove("active")        
                    }                     
                }                             
            } 
        }        
    }

        // Filtrage des recettes en fonction du tag sélectionnés
        searchTag(tag) {

            if (tag.dataset.search_item == "ingredient") {
    
                const ingredientContaining = new SearchForm(this.Recipes,tag,this.recipesList,new SearchByIngredient(this.Recipes))
                ingredientContaining.render()          
    
            } else if(tag.dataset.search_item == "appliance") {            
    
                const applianceContaining = new SearchForm(this.Recipes,tag,this.recipesList,new SearchByAppliance(this.Recipes))
                applianceContaining.render()           
    
            } else if (tag.dataset.search_item == "ustensils") {
    
                const ustensilsContaining = new SearchForm(this.Recipes,tag,this.recipesList,new SearchByUstensils(this.Recipes))
                ustensilsContaining.render()                      
            }
        }

    // Attribution de la propriiété "disabled" au bouton de liste selectionné et de celle title
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