import Accounts from '../components/Accounts';
import Link from 'next/link';

const Dashboard = props => (
	<div>
		<Accounts />
		<Link href="createAccount">
		<a>Create New Account</a>
		</Link>
	</div>
)

export default Dashboard;