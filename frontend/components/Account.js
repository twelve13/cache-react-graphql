import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import DeleteAccount from './DeleteAccount';

class Account extends React.Component {
	static propTypes = {
		account: PropTypes.object.isRequired
	}

	render() {
		const { account } = this.props;
		return (
			<div className="account">
				<Link href={{
					pathname: '/account',
					query: { id: account.id }
				}}>
					<a>{account.name}</a>
				</Link>
				<p>Current Amount: {account.current_amount}</p>
				<p>Goal Amount: {account.goal_amount}</p>
				<p>Notes: {account.notes}</p>
				<Link href={{
					pathname: 'updateAccount',
					query: { id: account.id },
				}}
				>
					<a>Edit</a>
				</Link>
				{/*//pass in which account to delete*/}
				<DeleteAccount id={account.id}>Delete Account</DeleteAccount>
			</div>
		)
	}
}

export default Account;