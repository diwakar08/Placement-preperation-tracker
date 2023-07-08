const LocalStrategy = require('passport-local').Strategy
const bcrypt = require("bcrypt")

async function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user1 = await getUserByEmail(email)
        // console.log(user1)
        if(user1 == null)
        done(null, false, {message: 'error occured finding user'})
        const user = user1[0]
        if(user == null) {
            return done(null, false, { message: 'No user with this email'})
        }

        try {
            // console.log("p"+user.password)
            if(await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'password incorrect'})
            }
        } catch (e){
            return done(e)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

    passport.serializeUser((user, done) => { 
        done(null, user.id)
    })
    passport.deserializeUser( async (id, done) => { 
        const user1 = await getUserById(id) 
        done(null, user1)
    })
}

module.exports = initialize