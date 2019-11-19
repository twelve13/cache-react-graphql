import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_ACCOUNTS_QUERY } from './Accounts';

const DELETE_ACCOUNT_MUTATION = gql`
	mutation DELETE_ACCOUNT_MUTATION($id: ID!) {
		deleteAccount(id: $id) {
			id
		}
	}
`;

class DeleteAccount extends React.Component {
	updateInterface = (cache, payload) => {
		//manually update the cache on the client so it matches the server
		//1. Read the cache for the accounts we want
		const data = cache.readQuery({ query: ALL_ACCOUNTS_QUERY });
		console.log(data);
		console.log(payload);
		//2. Filter the deleted account out of the page
		data.accounts = data.accounts.filter(account => account.id !== payload.data.deleteAccount.id);
		//3. Put the accounts back
		cache.writeQuery({ query: ALL_ACCOUNTS_QUERY, data })
	}
	render() {
		return (
			<Mutation 
				mutation={DELETE_ACCOUNT_MUTATION} 
				variables={{ id: this.props.id }}
				//so page refreshes after account deleted from the back end
				update={this.updateInterface}
			>
				{/*this.props.children is whatever is written between the tags for the DeleteAccount component when used*/}
				{(deleteAccount, { error }) => (
					<button onClick={() => {
						if(confirm('Are you sure you want to delete this account?')) {
							deleteAccount()
						}
					}}>{this.props.children}</button>
				)}
			</Mutation>
		);
	}
}

export default DeleteAccount;