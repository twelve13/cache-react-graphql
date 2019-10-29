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
	}
};

module.exports = Mutations;
