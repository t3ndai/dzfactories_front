import React, { Component } from 'react'

export default class Factory extends Component {

	constructor(props) {
		super(props)
		this.state = {
			id : 1,
			name : 'new',
			children : [12,13,5],
			min : 1,
			max : 15,
			numChild : 3,
		}
	}

	//edit 
	showEdit = () => {

		return (
			<dialog>
				<form>

					<label for='name'> Name </label>
					<input id='name' type='text' name='name'> </input>
					<label for='max'> Max </label>
					<input id='max' type='number' name='max'></input>
					<label for='min'> Min </label>
					<input id='min' type='number' name='min'></input>

				</form>
			</dialog>
		)

	}



	//generate
	generate = () => {
		let { max, min, numChild } = { ...this.state }
		const children = []
		min = Math.ceil(min)
		max = Math.ceil(max)

		while (children.length < numChild) {
			let randomChild = Math.floor(Math.random() * (max - min + 1))

			children.push(randomChild)
		} 

		this.setState({
			children : children
		})

	}



	render() {
		const  { name, children, min, max } = { ...this.state }
		const  childrenItems = children.map((child) => 
			<li> { child } </li>
		)
		return (
			
			<article>

				<p> {name} </p>
				<ul>
					{ childrenItems }
				</ul>
				<p> min :{ min } </p>
				<p> max :{ max } </p>

				<button onClick={ this.showEdit }> Edit Me </button>
				<button onClick={ this.generate }> Generate </button>

			</article>

		)
	}

}