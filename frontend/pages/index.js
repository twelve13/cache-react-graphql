import React from 'react';
import Accounts from '../components/Accounts';
import CreateAccount from '../components/CreateAccount';

class Dashboard extends React.Component {
	render(){
		return (
			<div>
				<Accounts />
				<CreateAccount />
			</div>
		)
	}
}

export default Dashboard;