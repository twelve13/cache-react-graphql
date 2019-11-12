import React from 'react';
import Accounts from '../components/Accounts';
import CreateAccount from '../components/CreateAccount';
import Link from 'next/link';

class Dashboard extends React.Component {
	render(){
		return (
			<div>
				<Accounts />
				<Link href="createAccount">
					<a>Create New Account</a>
				</Link>
			</div>
		)
	}
}

export default Dashboard;