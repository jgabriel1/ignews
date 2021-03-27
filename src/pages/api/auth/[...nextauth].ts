import { query as q } from 'faunadb';
import NextAuth from 'next-auth';
import { session } from 'next-auth/client';
import Providers from 'next-auth/providers';

import { fauna } from '../../../services/fauna';

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user',
    }),
  ],
  callbacks: {
    async session(session) {
      try {
        const userActiveSubscription = await fauna.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index('subscription_by_user_ref'), //
                q.Select(
                  'ref',
                  q.Get(
                    q.Match(
                      q.Index('user_by_email'),
                      q.Casefold(session.user.email)
                    ) // Match
                  ) // Get
                ) // Select
              ), // Match
              q.Match(
                q.Index('subscription_by_status'),
                'active' //
              ), // Match
            ]) // Intersection
          ) // Get
        );

        return {
          ...session,
          activeSubscription: userActiveSubscription,
        };
      } catch {
        return {
          ...session,
          activeSubscription: null,
        };
      }
    },
    async signIn(user, account, profile) {
      const { email } = user;

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email) //
                ) // Match
              ) // Exists
            ), // Not
            q.Create(
              q.Collection('users'),
              { data: { email } } //
            ), // Create
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email) //
              ) // Match
            ) // Get
          ) // If
        );

        return true;
      } catch {
        return false;
      }
    },
  },
});
