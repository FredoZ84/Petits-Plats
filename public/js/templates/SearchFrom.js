class SearchForm {
    constructor(list,searcher,areaToFilter,SearchObject) {
        this.list = list   
        this.searcher  = searcher
        this.areaToFilter = areaToFilter
        this.SearchObject = SearchObject
        this.mainSearch ="recipes"
    }

    search(query) {   
            
        let SearchedElements = this.SearchObject.search(query)

        if (this.SearchObject.constructor.name == "SearchByCharacter" || this.SearchObject.constructor.name == "SearchByIngredient" || this.SearchObject.constructor.name == "SearchByAppliance" || this.SearchObject.constructor.name == "SearchByUstensils") {

            let particularSearchList = Array.from(document.getElementsByClassName("particular_search_list"))

            particularSearchList.forEach(areaList => {

                areaList.innerHTML = ""
        
                const Template = new ParticularButtonList(SearchedElements,areaList)
                Template.init()
            })       
        }
       
        this.displayList(SearchedElements)

    }

    clearAreaToFilter() {
        this.areaToFilter.innerHTML = ""
    }

    displayList(elements) {

        this.clearAreaToFilter()

        elements.forEach(element => {

            let searchFactory = new SearchFactory(this.searcher,this.areaToFilter,element)
            searchFactory.insertion()

        })
    }

    onSearch() {

        if (this.searcher.type == "search") {
            this.searcher.addEventListener('keyup', e => {
                let query = e.target.value 

                if (query.length >= 3) {
                    this.searcher.dataset.filtering = true
                    this.search(query)
                } else if (query.length === 0) {
                    this.searcher.dataset.filtering = false
                    this.displayList(this.list)

                    if (this.SearchObject.constructor.name == "SearchByCharacter") {
                        let particularSearchList = Array.from(document.getElementsByClassName("particular_search_list"))
    
                        particularSearchList.forEach(areaList => {
        
                            areaList.innerHTML = ""
                    
                            const Template = new ParticularButtonList(this.list,areaList)
                            Template.init()
                        })
                    }           
                }                
            })
            
        } else if (this.searcher.type == "tag") { // Recherche par Tag
            let query = this.searcher.value 
            this.search(query) 
        }
    }

    render() {    

        this.onSearch()
    }
}