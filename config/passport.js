const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET_KEY,
        callbackURL: '/auth/google/callback'
    },
        async (accessToken, refreshToken,profile,done) => { 
            // console.log(profile)
            const newUser = {
                googleId: profile.id,
                displayName: profile.displayName,
                firstName: profile.givenName,
                lastName: profile.familyName,
                image: profile.photos[0].value
            }
            try {
                let user = await User.findOne({ googleId: profile.id })
                if (user) {
                    done(null, user)
                }
                else {
                    user = await User.create(newUser)
                    done(null, user)
                }
            }
            catch (err) { 
                console.log(err)
            }
        }))
    passport.serializeUser((user, done)=> {
        done(null, user.id)
        
    }) 
    passport.deserializeUser(async (id, done) => {
        done(null, await User.findById(id))
    })
    // passport.deserializeUser((id, done)=> { 
    //     User.findById(id, (err, user)=>done(err, user)
    //     )
    // })
}