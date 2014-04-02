module.exports = {
	development: {
		db: 'localhost:27017/oracle',
		uri: 'http://localhost:5000',
		app: {
			name: 'twitMap'
		},
		log: {
		},
		facebook: {
			clientID: "",
			clientSecret: "",
			callbackURL: "http://localhost:5000/auth/facebook/callback"
		}
	},
  	production: {
    	db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
		uri: 'http://oracle.muglak.net',
		app: {
			name: 'twitMap'
		},
		log: {
		},
		facebook: {
			clientID: "",
			clientSecret: "",
			callbackURL: "http://oracle.xmuglakx.net/auth/facebook/callback"
		}
 	}
}
