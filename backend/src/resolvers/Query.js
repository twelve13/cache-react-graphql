const { forwardTo } = require('prisma-binding');

const Query = {
	items: forwardto('db'),
	// forward to removes need for this code

	//  async accounts(parent, args, ctx, info) {
	// 	console.log("Getting accounts")
	// 	const items = await ctx.db.query.accounts();
	// 	return accounts;
	// }
};

module.exports = Query;
