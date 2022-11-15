/* exported ParticularSearch */
class ParticularSearch  {
	constructor(list){
		this.elements = Array.from(list.children, e => {return e.value})
	}

	search(query) {
		return this.elements.filter(element =>
			element.toLowerCase().includes(query.toLowerCase())    
		)
	}
}