import React from 'react';
//to push data to database
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
//Wes created this ErrorMessage component to handle errors
import Error from './ErrorMessage';

//write query for the mutation
//this should match schema.graphql in backend
//mutation CREATE_ACCOUNT_MUTATION will take arguments, of the same name, need to assign the types
//then will be available via variables with the same names
//return the id

const SINGLE_ACCOUNT_QUERY = gql`
  query SINGLE_ACCOUNT_QUERY($id: ID!) {
    account(where: { id: $id }) {
      id
      name
      current_amount
      goal_amount
      notes
    }
  }
`

const UPDATE_ACCOUNT_MUTATION = gql`
	mutation UPDATE_ACCOUNT_MUTATION(
    $id: ID!
		$name: String
		$goal_amount: Int
		$notes: String
		$current_amount: Int
	) {
		updateAccount(
      id: $id
			name: $name
			goal_amount: $goal_amount
			notes: $notes
			current_amount: $current_amount
		) {
			id
      name
      goal_amount
      notes
      current_amount
		}
	}
`;

class UpdateAccount extends React.Component {
	state = {

	}
	handleChange = (event) => {
		const { name, type, value } = event.target;
		//need to make sure numbers are proper numbers - even if type is number, may still translate to string
		const parsedVal = type === 'number' ? parseInt(value) : value;
		this.setState({ [name]: parsedVal });
	}
  updateAccount = async (event, updateAccountMutation) => {
    event.preventDefault();
    console.log('updating item, heres the state')
    //state only reflects the fields that are changed
    console.log(this.state);
    const response = await updateAccountMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      }
    });
    console.log("updated")
  }

	render() {
		return (
      <Query query={SINGLE_ACCOUNT_QUERY} variables={{
        id: this.props.id
      }}>
        {({data, loading}) => {
          if(loading) return <p>Loading...</p>;
          //if no or invalid id
          if(!data.account) return <p>No Account Found</p>;
      return (
        //next the mutation inside the query
				<Mutation mutation={UPDATE_ACCOUNT_MUTATION} variables={this.state}> 
				{(updateAccount, {loading, error}) => (
			    	<div className="create-account">
        				<div>Add Account</div>
        				<form onSubmit={event => this.updateAccount(event, updateAccount)}>
        					<Error error={error}/>
        					<fieldset disabled={loading} aria-busy={loading}>
        						<label htmlFor="accountName">Name
          							<input 
          								type="text" 
          								id="name" 
          								name="name" 
          								placeholder="Account Name" 
          								defaultValue={data.account.name} 
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
          								defaultValue={data.account.current_amount} 
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
          								defaultValue={data.account.goal_amount} 
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
          								defaultValue={data.account.notes}
          								onChange={this.handleChange} 
          							/>
          						</label>
          						<button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
          					</fieldset>
        				</form>
      				</div>
      				)}
      			</Mutation>
                      )
        }}
      </Query>
		);
	}
}

export default UpdateAccount;
export { UPDATE_ACCOUNT_MUTATION };