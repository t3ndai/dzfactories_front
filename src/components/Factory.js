import React, { Component } from 'react'
import Dialog  from '@material-ui/core/Dialog'
import { withStyles } from '@material-ui/core/styles'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField'

export default class Factory extends Component {

	constructor(props) {
		super(props)
		this.state = {
			id : 0,
			name : 'new',
			children : [],
			min : '',
			max : '',
			numChild : 0,
			open : false 
		}
	}

	componentDidMount = () => {
		let { name, max, min, children, numChild } = { ...this.props.factory }
		this.setState({
			name : name,
			max : max,
			min : min,
			children : children,
			numChild : numChild,
		})
	}

	//edit 
	showEditFactory = () => {

		
		this.setState({ open : true })

			
	}

	closeEditFactory = () => {
		this.setState({ open : false })
	}

	//save
	save = () => {

		const {name, max, min} = { ...this.state }
		const index = this.props.index
		this.props.edit(index, name, max, min)
		
		this.closeEditFactory()
	}

	//handleInput 
	handleInputChange = (event) => {
		const target = event.target 
		const value = target.type === 'number' ? parseInt(target.value) : target.value
		const name = target.name 

		this.setState({

			[name] : value 
		})
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

		const index = this.props.index
		this.props.generate(index,children)

		this.setState({
			children : children
		})
		

	}



	render() {
		const  { name, min, max, children } = { ...this.state }
		const  childrenItems = children.map((child) => 
			<li> { child } </li>
		)
		return (
			
			<article>

				<p> {name} </p>
				<ul>
					{ childrenItems.length ? childrenItems : [] }
				</ul>
				<p> min :{ min } </p>
				<p> max :{ max } </p>

				<button onClick={ this.showEditFactory }> Edit Me </button>
				<button onClick={ this.generate }> Generate </button>
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
							
						</DialogContent>
						 <DialogActions>
            			<Button onClick={this.closeEditFactory } color="primary">
              					Cancel
           				 </Button>
			            <Button onClick={this.save} color="primary">
			              Save
			              </Button>
          				</DialogActions>
					</Dialog>

			</article>

		)
	}

}