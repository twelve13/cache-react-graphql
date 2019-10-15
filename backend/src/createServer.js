//import GraphQL Yoga
const { GraphQLServer } = require('graphql-yoga');
//import resolvers - where does the data come from or what does the data do in the batabase?
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const db = require('./db.js');

//Create the GraphQL Yoga server
//Step 2: Create function that will ingest schema.graphql and match everything with either mutation or query resolver
//Step 3: Expose the database to requests
function createServer() {
	return new GraphQLServer({
		typeDefs: 'src/schema.graphql',
		resolvers: {
			Mutation,
			Query
		},
		resolverValidationOptions: {
			requireResolversForResolveType: false
		},
		context: req => ({...req, db })
	});
}

module.exports = createServer;