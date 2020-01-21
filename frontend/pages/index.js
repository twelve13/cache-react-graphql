import Accounts from '../components/Accounts';
import Link from 'next/link';
import PleaseSignIn from '../components/PleaseSignIn';

const Dashboard = props => (
	<div>
		<PleaseSignIn>
			<Accounts />
			<Link href="createAccount">
			<a>Create New Account</a>
			</Link>
		</PleaseSignIn>
	</div>
)

export default Dashboard;