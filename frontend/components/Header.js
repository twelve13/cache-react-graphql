import Nav from './Nav';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress'; //for the progress bar

Router.onRouteChangeStart = () => {
	NProgress.start();
}

Router.onRouteChangeComplete = () => {
	NProgress.done();
}

Router.onRouteChangeError = () => {
	NProgress.done();
}

const Header = () => (
	<div>
		<div className="header">
			<div className="logo"><Link href="/"><a>Cache</a></Link></div>
			<Nav />
		</div>
	</div>
)

export default Header;