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
                }                
            })
            
        } else if (this.searcher.type == "button") { // Recherche par Tag
            let query = this.searcher.value 
            this.search(query)
        }
    }

    render() {    

        this.onSearch()
    }
}