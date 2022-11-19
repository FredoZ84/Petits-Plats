/* exported ParticularSearch */
class ParticularSearch  {
	constructor(list){
		this.elements = Array.from(list.children, e => {return e.value})
	}

	search(query) {
		let answer = []

		for (let i = 0; i < this.elements.length; i++) {
			if (this.elements[i].toLowerCase().includes(query.toLowerCase())) {                    

				answer.push(this.elements[i])
			}                       
		}
        
		return answer
	}
}