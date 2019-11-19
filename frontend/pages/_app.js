//custom app container to persist layout between page changes
import App, { Container } from 'next/app';
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';

class CacheApp extends App {
	//Component is going to be index.js or summaries.js when we visit the page
	//expose page numbers
	//this runs before the render function
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {};
		//if page we want to render has props, surface those via pageProps
		if(Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}
		//this exposes the query to the user
		pageProps.query = ctx.query;
		return { pageProps };
	}
	render() {
		console.log(this.props);
		const { Component } = this.props;

		return (
			<Container>
				<ApolloProvider client={this.props.apollo}>
					<Page>
						<Component {...this.props.pageProps}/>
					</Page>
				</ApolloProvider>
			</Container>
		)
	}
}

//make Apollo client accessible via this.props
export default withData(CacheApp);