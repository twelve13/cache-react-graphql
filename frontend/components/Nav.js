//next.js takes care of moving between pages.  if you go to localhost:7777/pagename, it will take you to the pagename.js page
import Link from 'next/link';
import User from './User';

const Nav = () => (
	<User>
		{({ data: { me } }) => (
			<div>
				{me && (
					<div>				
						<Link href="/index">
							<a>Dashboard</a>
						</Link>
						<Link href="/summaries">
							<a>Summaries</a>
						</Link>
					</div>
					)
				}

				{!me && (
					<Link href="/signup">
						<a>Sign In</a>
					</Link>
				)}
			</div>
		)}
		
	</User>
)

export default Nav;