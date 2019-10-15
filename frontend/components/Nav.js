//next.js takes care of moving between pages.  if you go to localhost:7777/pagename, it will take you to the pagename.js page
import Link from 'next/link';

const Nav = () => (
	<div>
		<Link href="/index">
			<a>Dashboard</a>
		</Link>
		<Link href="/summaries">
			<a>Summaries</a>
		</Link>
	</div>
)

export default Nav;