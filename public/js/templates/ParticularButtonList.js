class ParticularButtonList {
    constructor(Recipes,area) {
        this.recipes = Recipes
        this.area = area    
    }
    
    //Retoune la liste avec l'input tag
    init() {    
        
        let filteredList = this.filteredList(this.area.dataset.search_item)// liste non formattée

        this.searchItemFormatAll(filteredList,this.area) // formattage des listes
    }    

    // Retourne la liste filtrée des éléments de recherche particulière
    filteredList(searchItem) {
        let array = []         
        
        for (let i = 0; i < this.recipes.length; i++) {

            let element

            switch (searchItem) {
                case "ingredient":
                    element = this.recipes[i].ingredients
                    for (let object = 0; object < element.length; object++) {

                        array.push(element[object][searchItem])
                    } 
                break
                case "appliance":
                    element = this.recipes[i].appliance
                    array.push(element)
                break
                case "ustensils":
                    element = this.recipes[i].ustensils
                    for (let object = 0; object < element.length; object++) {

                        array.push(element[object])

                    }
                break 

                default:
                break
            }            
        }

        // Filtrage des resultats ; suppression des doulons
        const filteredArray = array.filter( (ele,pos) => array.indexOf(ele) == pos)
        
        return  filteredArray 
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
        let tag = new Tag(this.recipes)
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