import Signup from '../components/Signup';
import Signin from '../components/Signin';

const SignupPage = props => (
	<div className="signup-grid">
		<Signup />
		<Signin />
		<Signup />
	</div>
);

export default SignupPage;