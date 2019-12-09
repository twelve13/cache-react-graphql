import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import Head from 'next/head';

const SINGLE_ACCOUNT_QUERY = gql`
	query SINGLE_ACCOUNT_QUERY($id: ID!) {
		account(where: { id: $id }) {
			id
			name
		}
	}
`;

class SingleAccount extends React.Component {
	render() {
		return (
			<Query 
				query={SINGLE_ACCOUNT_QUERY} 
				variables={{
					id: this.props.id
				}}
			>
				{({ error, loading, data }) => {
					if (error) return <Error error={error} />;
					if (loading) return <p>Loading...</p>;
					// don't want to display component if id is invalid
					if (!data.account) return <p>No Account Found for {this.props.id}</p>
					// you can have multiple head tags throughout your application - they will all get collected and applied to the actual rendered head of the document
					const account = data.account;
					return (
						<div>
							<Head>
								<title>Cache | {account.name}</title>
							</Head>
							<h2>{account.name}</h2>
						</div>
					)
				}}
			</Query>
		);
	}
}

export default SingleAccount;