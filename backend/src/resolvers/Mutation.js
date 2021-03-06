//for hashing passwords
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
	async createAccount(parent, args, ctx, info) {
		//check if they are logged in
		if(!ctx.request.userId) {
			throw new Error('You must be logged in to do that!');
		}
		//ctx.db is how we access the database
		const account = await ctx.db.mutation.createAccount({
			data: {
				//This is how to create a relationship between the Account and the User
				user: {
					connect: {
						id: ctx.request.userId
					}
				},
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
	},
	async signup(parent, args, ctx, info) {
		//lowercase their email
		args.email = args.email.toLowerCase();
		//hash their password
		//second argument is a salt, makes hash unique across websites, salt length of 10
		const password = await bcrypt.hash(args.password, 10);
		//create the user in the database
		const user = await ctx.db.mutation.createUser({
			data: {
				...args,
				//this is the equivalent of
				//name: args.name,
				//email: args.email,
				//password: args.password
				//then overwrite the password
				password: password,
				permissions: { set: ['USER'] }	
			}
		}, info);
		//create the JWT token for them
		const createdToken = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
		//we set the jwt as a cookie on the response
		ctx.response.cookie('token', createdToken, {
			//so we can't access the token via javascript
			httpOnly: true,
			//how long you want the cookie to last
			maxAge: 1000 * 60 * 60 * 24 * 365 //1 year cookie
		});
		//return the user to the browser
		return user;
	},
	async signin(parent, { email, password }, ctx, info) {
		//1. check if there is a user with that email
		const user = await ctx.db.query.user({ where: { email } });
		if(!user) {
			throw new Error(`No such user found for email ${email}`);
		}
		//2. check if their password is correct
		const valid = await bcrypt.compare(password, user.password);
		if(!valid) {
			throw new Error('Invalid Password!');
		}
		//3. generate the JWT token
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
		//4. set the cookie with the token
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365
		})
		//5. return the user
		return user;
	},
	signout(parent, args, ctx, info) {
		ctx.response.clearCookie('token');
		return { message: 'Successfully signed out'}
	}
};

module.exports = Mutations;
