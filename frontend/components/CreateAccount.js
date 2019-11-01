import React from 'react';
//to push data to database
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
//Wes created this ErrorMessage component to handle errors
import Error from './ErrorMessage';

//write query for the mutation
//this should match schema.graphql in backend
//mutation CREATE_ACCOUNT_MUTATION will take arguments, of the same name, need to assign the types
//then will be available via variables with the same names
//return the id

const CREATE_ACCOUNT_MUTATION = gql`
	mutation CREATE_ACCOUNT_MUTATION(
		$name: String!
		$goal_amount: Int!
		$notes: String
		$current_amount: Int!
	) {
		createAccount(
			name: $name
			goal_amount: $goal_amount
			notes: $notes
			current_amount: $current_amount
		) {
			id
		}
	}
`;

class CreateAccount extends React.Component {
	state = {
		name: '',
		current_amount: 0,
		goal_amount: 0,
		notes: '',
		status: true
	}
	handleChange = (event) => {
		const { name, type, value } = event.target;
		//need to make sure numbers are proper numbers - even if type is number, may still translate to string
		const parsedVal = type === 'number' ? parseInt(value) : value;
		this.setState({ [name]: parsedVal });
	}

	render() {
		return (
				<Mutation mutation={CREATE_ACCOUNT_MUTATION} variables={this.state}> 
				{(createAccount, {loading, error}) => (
			    	<div className="create-account">
        				<div>Add Account</div>
        				<form 
        					onSubmit={async event => {
        						//stop the form from submitting
								event.preventDefault();
								//call the mutation
								const response = await createAccount();
							}}
						>
        					<Error error={error}/>
        					<fieldset disabled={loading} aria-busy={loading}>
        						<label htmlFor="accountName">Name
          							<input 
          								type="text" 
          								id="name" 
          								name="name" 
          								placeholder="Account Name" 
          								value={this.state.name} 
          								onChange={this.handleChange}
          								required 
          							/>
          						</label>
          						<label htmlFor="name">Current Amount
          							<input 
          								type="number" 
          								id="current_amount" 
          								name="current_amount" 
          								placeholder="Current Amount" 
          								value={this.state.current_amount} 
          								onChange={this.handleChange}
          								required 
          							/>
          						</label>
          						<label htmlFor="name">Goal Amount
          							<input 
          								type="number" 
          								id="goal_amount" 
          								name="goal_amount" 
          								placeholder="Goal Amount" 
          								value={this.state.goal_mount} 
          								onChange={this.handleChange}
          								required 
          							/>
          						</label>
          						<label htmlFor="name">Notes
          							<input 
          								type="text" 
          								id="notes" 
          								name="notes" 
          								placeholder="Notes" 
          								value={this.state.notes}
          								onChange={this.handleChange} 
          							/>
          						</label>
          						<button type="submit">Submit</button>
          					</fieldset>
        				</form>
      				</div>
      				)}
      			</Mutation>
		);
	}
}

export default CreateAccount;
export { CREATE_ACCOUNT_MUTATION };