class ParticularFilter {
    constructor(Recipes,searchItem) {
        this.Recipes = Recipes
        this.searchItem = searchItem
    }

    // Retourne la liste filtrée des éléments de recherche particulière
    filteredList() {
        let array = []
        
        this.Recipes
        .filter(recipe => {
            let elements

            switch (this.searchItem) {
                case "ingredient":
                    elements = recipe.ingredients

                    elements.forEach(element => {

                        array.push(element[this.searchItem])
                    })
                break
                case "appliance":
                    elements = recipe.appliance

                    array.push(elements)
                break
                case "ustensils":
                    elements = recipe.ustensils

                    elements.forEach(element => {
                        
                        array.push(element)
                    })
                break 

                default:
                break
            }
        })

        // Filtrage des resultats ; suppression des doulons
        const filteredArray = array.filter( (ele,pos) => array.indexOf(ele) == pos)
        
        return  filteredArray 
    }
}