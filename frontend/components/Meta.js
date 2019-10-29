//for all of the meta tags you usually have in html head
import Head from 'next/head';

const Meta = () => (
	<Head>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta charSet="utf-8" />
		<link href="https://fonts.googleapis.com/css?family=Poppins&display=swap" rel="stylesheet" />
		<link rel="stylesheet" type="text/css" href="../static/style.css" />
		<link rel="stylesheet" href="../static/nprogress.css"/>
		<title>Cache</title>
	</Head>
)

export default Meta;