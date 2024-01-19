const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: '1031836626649-26rrajsifv1l504fd71b0n6ctrc43lqr.apps.googleusercontent.com', // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
        clientSecret: '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', // e.g. _ASDFA%KFJWIASDFASD#FAD-
        callbackURL: "https://localhost:8000/users/auth/google/callback",
    },

   async function(accessToken, refreshToken, profile, done) {
        // find a user
        try {
            const user = await User.findOne({ email: profile.emails[0].value }).exec();
    
            console.log(accessToken, refreshToken);
            console.log(profile);
    
            if (user) {
                // if found, set this user as req.user
                return done(null, user);
            } else {
                // if not found, create the user and set it as req.user
                const newUser = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                });
    
                return done(null, newUser);
            }
        } catch (err) {
            console.log('Error in Google strategy-passport:', err);
            return done(err);
        }
    }
    

    //  function(accessToken, refreshToken, profile, done){
        // find a user
        
    //     User.findOne({email: profile.emails[0].value}).exec(function(err, user){
    //         if (err){console.log('error in google strategy-passport', err); return;}
    //         console.log(accessToken, refreshToken);
    //         console.log(profile);

    //         if (user){
    //             // if found, set this user as req.user
    //             return done(null, user);
    //         }else{
    //             // if not found, create the user and set it as req.user
    //             User.create({
    //                 name: profile.displayName,
    //                 email: profile.emails[0].value,
    //                 password: crypto.randomBytes(20).toString('hex')
    //             }, function(err, user){
    //                 if (err){console.log('error in creating user google strategy-passport', err); return;}

    //                 return done(null, user);
    //             });
    //         }

    //     }); 
    // }


));


module.exports = passport;
