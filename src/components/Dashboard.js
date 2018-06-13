import React, { Component } from 'react'
import Factory from './Factory'
import Dialog  from '@material-ui/core/Dialog'
import { withStyles } from '@material-ui/core/styles'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField'

export default class Dashboard extends Component {

	constructor() {
		super()
		this.state = {
			factories : [],
			open : false,
			factory : {
				name : '',
				children : [],
				min : 0,
				max : 0,
				numChild : 0,
			}
		}
	}

	handleInputChange = (event) => {
		const target = event.target 
		const value = target.type === 'number' ? parseInt(target.value) : target.value
		let  factory = { ...this.state.factory }
		const name = target.name 
		factory[name] = value 

		this.setState({

			factory
		})
	}

	//Save Factory 

	save = () => {

		const { factory, factories } = { ...this.state } 
		factories.push(factory)

		this.setState({
			factories : factories,
			factory : {
						name : '',
						children : [],
						min : 0,
						max : 0,
						numChild : 0,
					},
			open : false 
		})
		
	}

	//Edit Factory 
	edit = (index,name, max, min) => {
		//when you click edit you need to identify factory 
		
		const factories = this.state.factories
		const factory = factories[index]
		factory['min'] = min
		factory['name'] = name
		factories['max'] = max
		console.log(index)
		console.log(factory)
		
		const new_factories = Object.assign([], factories, { index: factory})		

		this.setState({
			factories : new_factories
		})

	}

	//generate 
	generate = () => {
		//set state of factory in factories 

	}


	//Create New Factory 
	showCreateFactory = () => {
		this.setState({ open : true })
	}

	closeCreateFactory = () => {
		this.setState({ open : false })
	}


	render() {
		const factories = this.state.factories
		const factoryItems = factories.map((factory, index) => (
			<li key={factory.key} data-id={index}><Factory factory={factory} edit={ this.edit } index={index} /> </li>

		))

		return (
			<section>
				<h3> Dashboard </h3>
				<article> 

					Root 
					<button onClick={ this.showCreateFactory }> Add Factory </button>
					
					<ul> { factoryItems } </ul>
					<Dialog  open={ this.state.open } modal={true}>
						<DialogTitle> Add New Factory </DialogTitle>
						<DialogContent>
							<TextField
					              autoFocus
					              margin="dense"
					              id="name"
					              name='name'
					              label="name"
					              type="text"
					              onChange = { this.handleInputChange }

					              
					        />
							<TextField
					              autoFocus
					              margin="dense"
					              id="max"
					              name='max'
					              label="max"
					              type="number"
					              onChange = { this.handleInputChange }

					              
					        />
							<TextField
					              autoFocus
					              margin="dense"
					              id="min"
					              label="min"
					              type="number"
					              name='min'
					              onChange = { this.handleInputChange }

					              
					         />
							<TextField
					              autoFocus
					              margin="dense"
					              id="children"
					              name='numChild'
					              label="# of children"
					              type="number"
					              max="15"
					              onChange = { this.handleInputChange }
					         
					         />
						</DialogContent>
						 <DialogActions>
            			<Button onClick={this.closeCreateFactory } color="primary">
              					Cancel
           				 </Button>
			            <Button onClick={this.save} color="primary">
			              Save
			              </Button>
          				</DialogActions>
					</Dialog>
				</article>
			</section>

		)
	}
}