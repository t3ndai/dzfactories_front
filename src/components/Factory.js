import React, { Component } from 'react'
import Dialog  from '@material-ui/core/Dialog'
import { withStyles } from '@material-ui/core/styles'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField'
import io from 'socket.io-client'
import { API_URL } from '../config'
import { postData, patchData, getData, deleteData } from '../utils'

const socket = io(API_URL)

export default class Factory extends Component {

	constructor(props) {
		super(props)
		this.state = {
			factory_id : 0,
			name : '',
			children : [],
			min : '',
			max : '',
			numChild : 0,
			open : false 
		}
	}

	componentDidMount = () => {
		let { factory_id, name, max, min, children, numchild } = { ...this.props.factory }
		this.setState({
			factory_id : factory_id,
			name : name,
			max : max,
			min : min,
			children : children,
			numChild : numchild,
		})
	}

	componentDidUpdate = (prevProps) => {
	  	if (prevProps.factory !==  this.props.factory) {
			let { factory_id, name, max, min, children, numchild } = { ...this.props.factory }
			this.setState({
				factory_id : factory_id,
				name : name,
				max : max,
				min : min,
				children : children,
				numchild : numchild,
			})
		}
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

		const {factory_id, name, max, min} = { ...this.state }
		const index = this.props.index
		this.props.edit(index, name, max, min)

		const factory = {
			factory_id : factory_id,
			name : name,
			max : max,
			min : min,
		}

		//console.log(factory)

		patchData(API_URL+'factories', factory)
			.then((res) => console.log(res))
			.catch((err) => console.log(err))
		
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
		let { factory_id, max, min, numchild } = { ...this.state }
		const children = []

		console.log(factory_id, max, min, numchild)
		min = Math.ceil(min)
		max = Math.ceil(max)

		while (children.length < numchild) {
			let randomChild = Math.floor(Math.random() * (max - min + 1))

			children.push(randomChild)
		} 

		const index = this.props.index
		//this.props.generate(index,children)

		const factory = {
			factory_id : factory_id,
			children : children
		}

		patchData(API_URL+'factories', factory)
			.then((res) => console.log(res))
			.catch((err) => console.log(err))

		this.setState({
			children : children
		})
		

	}

	remove = () => {
		const { factory_id } = { ...this.state }

		const factory = {
			factory_id : factory_id
		}

		deleteData(API_URL+'factories', factory)
			.catch((err) => console.log(err))

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
				<button onClick={ this.remove }> Delete Me </button>
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