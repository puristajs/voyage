import { createError, getRequestHeader, getRouterParam, getRequestURL } from 'h3'
import { createVerifier } from 'fast-jwt'
import { Surreal } from 'surrealdb.node'

const TOKEN_TYPE = 'Bearer'

const extractToken = (authHeaderValue: string) => {
  const [, token] = authHeaderValue.split(`${TOKEN_TYPE} `)
  return token
}

const appConfig = useAppConfig()

export default defineEventHandler(async (event) => {
  if (!getRequestURL(event).pathname.startsWith('api/projects')) {
    return
  }

  const authHeaderValue = getRequestHeader(event, 'authorization')
  if (typeof authHeaderValue === 'undefined') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Need to pass valid Bearer-authorization header to access this endpoint',
    })
  }

  const extractedToken = extractToken(authHeaderValue)
  let tokenPayload: { id: string }
  try {
    const verify = createVerifier({ key: appConfig.TOKEN_PUBLIC_KEY })
    tokenPayload = verify(extractedToken)

    console.log(tokenPayload)
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'You must be logged in to use this endpoint',
    })
  }

  const db = new Surreal()
  await db.connect(appConfig.surrealDb.url)
  await db.signin(appConfig.surrealDb.auth)
  await db.use(appConfig.surrealDb.db)

  const user = await db.select(tokenPayload.id)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'You must be logged in to use this endpoint',
    })
  }

  const projectId = getRouterParam(event, 'projectId')
  if (projectId) {
    const project = await db.query(`SELECT ONLY ${user.id}->access->${projectId}`)
    if (!project) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Not allowed to access project',
      })
    }
  }

  event.context.auth = { user, projectId }
})
