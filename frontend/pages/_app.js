//custom app container to persist layout between page changes
import App, { Container } from 'next/app';
import Page from '../components/Page';

class CacheApp extends App {
	//Component is going to be index.js or summaries.js when we visit the page
	render() {
		const { Component } = this.props;

		return (
			<Container>
				<Page>
					<Component />
				</Page>
			</Container>
		)
	}
}

export default CacheApp;