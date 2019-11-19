import UpdateAccount from '../components/UpdateAccount';

const Create = props => (
	<div>
		<UpdateAccount id={props.query.id} />
	</div>
);

export default Create;