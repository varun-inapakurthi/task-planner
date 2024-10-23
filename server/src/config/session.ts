import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
console.log(`Environment: ${isProduction ? 'Production' : 'Development'}`);

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 24 * 60 * 60,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    domain: isProduction ? '.vercel.app' : undefined,
    path: '/',
  },
  name: 'sessionId',
});

console.log('Session middleware configuration:');
console.log(`  Secret: ${process.env.SESSION_SECRET ? 'Set from env' : 'Using default'}`);
console.log(`  MongoDB URL: ${process.env.MONGO_URI ? 'Set from env' : 'Not set'}`);
console.log(`  Cookie settings:`);
console.log(`    Secure: ${isProduction}`);
console.log(`    SameSite: ${isProduction ? 'none' : 'lax'}`);
console.log(`    Domain: ${isProduction ? '.vercel.app' : 'Not set (default)'}`);
console.log(`    HttpOnly: true`);
console.log(`    Max Age: ${1000 * 60 * 60 * 24} ms (24 hours)`);

// Add this function to test the session middleware
export function testSessionMiddleware(req: any, res: any, next: any) {
  console.log('Session middleware applied to request');
  console.log('Session ID:', req.sessionID);
  console.log('Session data:', req.session);
  next();
}
