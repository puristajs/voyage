import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { z } from 'zod'
import { Surreal } from 'surrealdb.node'
export default NuxtAuthHandler({
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'mail@example.com' },
        password: { label: 'Password', type: 'password', placeholder: 'your password' },
      },
      async authorize(payload: any) {
        const credentials = z
          .object({ username: z.string().email(), password: z.string().min(1) })
          .safeParse(payload)
        if (!credentials.success) {
          throw createError({
            statusCode: 400,
            statusMessage: 'Bad request',
          })
        }
        const appConfig = useAppConfig()
        const db = new Surreal()
        try {
          await db.connect(appConfig.surrealDb.url)
          await db.signin(appConfig.surrealDb.auth)
          await db.use(appConfig.surrealDb.db)
        } catch (error) {
          console.error(error)
          throw createError({
            statusCode: 503,
            statusMessage: 'Service Unavailable',
          })
        }

        const users = await db.query(
          `SELECT * FROM user WHERE email='${credentials.data.username}' AND crypto::argon2::compare(password, '${credentials.data.password}') LIMIT 1;`
        )

        if (!users.length) {
          throw createError({
            statusCode: 401,
            statusMessage: 'Invalid username or password',
          })
        }
        return users[0].id
      },
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: 'enter-your-client-id-here',
      clientSecret: 'enter-your-client-secret-here',
    }),
  ],
})
