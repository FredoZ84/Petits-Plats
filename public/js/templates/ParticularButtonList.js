class ParticularButtonList {
    constructor(Recipes,area) {
        this.Recipes = Recipes
        this.area = area    
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