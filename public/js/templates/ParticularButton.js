class ParticularButton {
    constructor() {
        this.particularSearchArea = document.getElementById("particular_search_area")
    }
    
    init() { 

        // insertion des données des boutons de recherche
        const datas = this.datas()

        datas.forEach(data => {

            let button = this.createButton(data)
            this.particularSearchArea.appendChild(button)                              
        })

        let Allsearch = Array.from(document.getElementsByClassName("particular_search"))
        
        Allsearch.forEach(search => {

            this.AreaSearchEvent(search) 
        })        
        
        // fermeture des zones de recherche
        // Au focus de l'input de recherche principal
        const recipesSearch = document.getElementById("recipes_search")

        recipesSearch.addEventListener("focus", (e) => {
            this.closeArea(null)
        }) 

        // Au retour sur un focus précedent(input principal ou tag)
        const firstSearch = document.getElementById("ingredients_search")

        firstSearch.addEventListener("focus", (e) => {
            
           document.addEventListener("keyup", (e) => {
                if (e.key == "Shift") {
                    this.closeArea(null)
                }
            })
        })
        
        // A l'entrée du curseur dans la zone des tags
        const searchByTagArea = document.getElementById("search_by_tag_area")
        
        searchByTagArea.addEventListener("mouseenter", () => {

            this.closeArea(null)            
        })
    }

    datas() {

        const Ingredients = new FormDataButton("ingredients","Rechercher un ingredient","Ingrédients","primary","ingredient")

        const Devices = new FormDataButton("devices","Rechercher un appareils","Appareils","secondary","appliance")

        const Ustensils = new FormDataButton("ustensils","Rechercher un ustensiles","Ustensiles","tertiary","ustensils")
        
        const datasArray = [Ingredients,Devices,Ustensils]

        return datasArray   
    }

    // création de la zone de recherche
    createButton(e) {

        const searchArea = document.createElement("div")
              searchArea.setAttribute("class","particular_search")
              searchArea.classList.add(`bg_color_${e.bgColor}`)
              searchArea.setAttribute("aria-expanded","false")
              searchArea.setAttribute("role","menu")
        
        const content = 
        `        
        <div class="particular_head">
            <input type="search" id="${e.name}_search" name="${e.name}" 
                                    class="particular_search_input"  
                                    placeholder="${e.placeholder}" 
                                    value="${e.value}"                                     
                                    data-value_initial="${e.value}" />
            <i class="fa-solid fa-chevron-up"></i>                
        </div>
        <div id="${e.name}_list" class="particular_search_list none" data-search_item="${e.searchItem}"></div>
        ` 
        searchArea.innerHTML = content

        return searchArea
    }    

    // fonctionnalité des boutons ; Affichage/MAsquage   de la liste corrrespondante
    AreaSearchEvent(area) {

        let inputSearch = area.children[0].children[0]
        let wrapperList = area.children[1]

        inputSearch.addEventListener("focus", (e) => {

            let element = e.target

            this.closeArea(element)

            element.value = ""
            area.ariaExpanded = true 
            wrapperList.classList.remove("none")                
        })        
    }
    
    closeArea(e) {
        let areas = Array.from(document.getElementsByClassName("particular_search"))

        areas.forEach(area => {
            if (e !== area.children[0].children[0] || e == null) {
                area.ariaExpanded = false

                let inputSearch = area.children[0].children[0]
                    inputSearch.value = inputSearch.dataset.value_initial

                let wrapperList = area.children[1]
                    wrapperList.classList.add("none")                
            } 
        })
    }
}