'use strict'

//Imports
import { AuthorizationError, InputError } from './errors.js'

//Actions 

export async function postData(url, data) {
		
	//console.log(JSON.stringify(data)) 
	
	try {
		
		let response =  await fetch(url, {
				headers : {
					'Content-Type' : 'application/json' },
				body : JSON.stringify(data),
				method : 'POST',
				mode : 'cors',
		
			})
			
			
			return await handleResponse(response)
			
		
	} catch (err) {
    
    if (err instanceof AuthorizationError) {     
      throw new AuthorizationError(err.message)          
    }else if (err instanceof InputError) {     
      throw new InputError(err.message)
    }
		//console.log('Error:', err.message)
	}
	
}

export async function patchData(url, data) {
  
  //console.log(JSON.stringify(data))
  
  try {
    
    let response = await fetch(url, {
      headers : { 'Content-Type' : 'application/json' },
      body : JSON.stringify(data),
      method : 'PATCH',
      mode : 'cors'
      
    })
    
    return await handleResponse(response)
    
  }catch(err) {
    
    if (err instanceof AuthorizationError ) {
      throw new AuthorizationError(err.message)
    }else if (err instanceof InputError ) {
      throw new InputError(err.message)
    }
    
  }
}

export async function getData(url) {
	
	try {
		let response = await fetch(url, {
			'headers' : { 'Content-Type' : 'application/json' },
			'method' : 'GET',
			'mode' : 'cors',
		})
		
		return await handleResponse(response)
	
	} catch(err) {
		
		if (err instanceof AuthorizationError) {
			throw new AuthorizationError(err.message)
		}
		console.log('Error:', err.message)
	}
}

async function handleResponse(response) {
	
	if (response.status >= 200 && response.status < 300) {
		return await response.json()
	}else if (response.status == 401) {
		throw new AuthorizationError('Not authorized')
	}else if (response.status == 400) {
		throw new InputError('Invalid input')
	}else {
		throw Error('Errors encountered')
	}
	
}
