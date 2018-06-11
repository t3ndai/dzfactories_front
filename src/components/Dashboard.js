import React, { Component } from 'react'
import Factory from './Factory'

export default class Dashboard extends Component {

	constructor() {
		super()
		this.state = {
			factories : []
		}
	}

	//Create New Factory 
	showCreateFactory() {
		return (
			<dialog>
				<form>

					<label for='name'> Name </label>
					<input id='name' type='text' name='name'> </input>
					<label for='max'> Max </label>
					<input id='max' type='number' name='max'></input>
					<label for='min'> Min </label>
					<input id='min' type='number' name='min'></input>
					<label for='children'> Children </label>
					<input id='children' type='number' name='children'></input>

				</form>
			</dialog>
		)
	}

	render() {
		return (
			<section>
				<h3> Dashboard </h3>
				<article> 

					Root 
					<button onClick={ this.showCreateFactory }> Add Factory </button>
					<Factory />


				</article>
			</section>

		)
	}
}