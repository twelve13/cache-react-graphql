import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Account from './Account';

//Apollo pushes for the render prop instead of a high order component like redux does

const ALL_ACCOUNTS_QUERY = gql`
	query ALL_ACCOUNTS_QUERY {
		accounts {
			id
			name
			goal_amount
			notes
			current_amount
			status
		}	
	}
`;


class Accounts extends React.Component {
	//The only child of a Query must be a function
	//destructure payload into the 3 important things we need: data, error, and loading
	render(){
		return (
			<div>
				<p>Accounts!</p>
				<Query query={ALL_ACCOUNTS_QUERY}>
					{({data, error, loading}) => {
						if(loading) return <p>Loading...</p>
						if(error) return <p>Oh no: {error.message}</p>
						return (
							<div className="accounts-container">
								{data.accounts.map(account => <Account account={account} key={account.id} />)}
							</div>
						)
					}}
				</Query>
			</div>
		)
	}
}

export default Accounts;