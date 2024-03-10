export default defineAppConfig({
  title: 'PURISTA Voyage - Explore and visualize your PURISTA based typescript backend application',
  description:
    'The intuitive UI designed for PURISTA-based applications, facilitating document visualization and collaborative work.',
  cookieSecretKey: process.env.COOKIE_SECRET_KEY,
  surrealDb: {
    url: process.env.SURREAL_URL ?? 'ws://127.0.0.1:8000',
    auth: {
      username: process.env.SURREAL_USERNAME ?? 'root',
      password: process.env.SURREAL_PASSWORD ?? 'root',
    },
    db: {
      db: process.env.SURREAL_DATABASE ?? 'voyage',
      ns: process.env.SURREAL_NAMESPACE ?? 'voyage',
    },
  },
})
