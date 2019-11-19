//ctx.db is how we access the database

const Mutations = {
	async createAccount(parent, args, ctx, info) {
		//TODO: check if they are logged in

		const account = await ctx.db.mutation.createAccount({
			data: {
				...args
			}
		}, info);

		return account;
	},
	updateAccount(parent, args, ctx, info) {
		//first take a copy of the updates
		const updates = { ...args };
		//remove the ID from the updates bc you cant update the id
		delete updates.id;
		//run the update method
		return ctx.db.mutation.updateAccount(
			{	
				data: updates,
				where: {
					id: args.id,
				},
			},
			info
		);
	},
	async deleteAccount(parent, args, ctx, info) {
		const where = { id: args.id };
		//1. find the account
		const account = await ctx.db.query.account({ where }, `{ id name}`);
		//2. delete it
		return ctx.db.mutation.deleteAccount({ where }, info);
	}
};

module.exports = Mutations;
