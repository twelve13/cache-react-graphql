import SingleAccount from '../components/SingleAccount';

const Account = props => (
	<div>
		<SingleAccount id={props.query.id}/>
	</div>
)

export default Account;