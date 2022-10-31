class ParticularButtonList {
    constructor(Recipes) {
        this.recipes = Recipes
        this.areas = document.querySelectorAll(".particular_search_list")       
    }
    
    //Retoune la liste avec l'input tag
    init() {    
        
        let filteredList = []
        let formatList = []

        for (let i = 0; i < this.areas.length; i++) {

            filteredList[i] = this.filteredList(this.recipes,this.areas[i].dataset.search_item)// liste non formattée 

            formatList[i] = this.searchItemFormatAll(filteredList[i],this.areas[i]) // formattage des listes            
        }

        let searchItems = document.querySelectorAll(".particular_search_list input[type=\"button\"]")

        for (let i = 0; i < searchItems.length; i++) {
            this.presetEffects(searchItems[i])
        }
    }    

    // Retourne la liste filtrée des éléments de recherche particulière
    filteredList(recipes,searchItem) {
        let array = []    
        
        for (let i = 0; i < recipes.length; i++) {

            let element

            switch (searchItem) {
                case "ingredient":
                    element = recipes[i].ingredients
                    for (let object = 0; object < element.length; object++) {

                        array[i] =  element[object][searchItem]
                    } 
                break
                case "appliance":
                    element = recipes[i].appliance
                    array[i] =  element
                break
                case "ustensils":
                    element = recipes[i].ustensils
                    for (let object = 0; object < element.length; object++) {

                        array[i] =  element[object]

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
    searchItemFormat(area,string) {
        string = this.uppercaseFirstCharacter(string)

        let input = document.createElement("input")
            input.type = "button" 
            input.setAttribute("value",string)        

        area.appendChild(input)
    }

    searchItemFormatAll(list,area) {

        let array = []

        for (let i = 0; i < list.length; i++) {

            array+= this.searchItemFormat(area,list[i])            
        }

        return array
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