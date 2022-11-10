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
            
            if (e.key == "Enter") { this.createTag(e.target) }            
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

        let tag = document.createElement("div") 
            tag.value = e.value
            tag.innerHTML = ` <span class="tag_name">${e.value}</span> <i class="fa-regular fa-circle-xmark"></i>`
            tag.name = "recipes"
            tag.type = "tag"
            tag.setAttribute("class","tag")
            tag.setAttribute("data-search_item",searchItem)
            //tag.setAttribute("disabled","disabled")
            tag.classList.add(bgColorClass)
            tag.referenceListArea = e.parentElement
            
        this.searchByTagArea.appendChild(tag)

        let SearchObject = null


        switch (searchItem) {
            case "ingredient":
                SearchObject = new SearchByIngredient(this.Recipes)

            break
            case "appliance":
                SearchObject = new SearchByAppliance(this.Recipes)
                
            break
            case "ustensils":
                SearchObject = new SearchByUstensils(this.Recipes)
            break 
        
            default:
                break
        }

        // Filtrage de recette principal
        const SearchRecipes = new SearchForm(this.Recipes,tag,this.recipesList,SearchObject)
        SearchRecipes.render()

        this.removeTag(tag)

        // Condition de reinsertion de liste en cas de filtrage
        if (inputSearch.dataset.filtering) {

            listArea.innerHTML = ""

            let Template = new ParticularButtonList(this.Recipes,listArea)
            Template.init() 

            inputSearch.dataset.filtering = false
        }
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