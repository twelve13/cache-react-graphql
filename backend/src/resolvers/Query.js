const { forwardTo } = require('prisma-binding');

const Query = {
	accounts: forwardTo('db'),
	account: forwardTo('db'),
	accountsConnection: forwardTo('db'),
	me(parent, args, ctx, info) {
		//check if there is a current user ID - if there isn't, return null
		if(!ctx.request.userId) {
			return null;
		}
		return ctx.db.query.user({
			where: { id: ctx.request.userId}
		}, info);
	}
	// forward to removes need for this code

	//  async accounts(parent, args, ctx, info) {
	// 	console.log("Getting accounts")
	// 	const items = await ctx.db.query.accounts();
	// 	return accounts;
	// }
};

module.exports = Query;
