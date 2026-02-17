const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

if (process.env.NODE_ENV !== 'test') {
passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
      },
        async (accessToken, refreshToken, profile,done)=> {
         try {
            let user = await User.findOne({ githubId: profile.id });
            if (!user) {
               user = await User.create({
                  githubId: profile.id,
                  username: profile.username,
                  displayName: profile.displayName,
                  email: profile.email?.value || null,
               });
               console.log('User logged in:', user);
            }
          return done(null,user);
         }catch (err) {
            return done(err);
         }
        }
    )
 );

 passport.serializeUser((user, done) => done(null, user.id));
 passport.deserializeUser(async (id,done) => {
   try{
      const user = await User.findById(id);
      done(null, user);
   } catch (err) {
    done(err);
   }
 });
}