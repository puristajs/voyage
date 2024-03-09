import { Surreal } from 'surrealdb.node'
import type { SchemaObject } from 'openapi3-ts/oas31'

enum EBMessageType {
  /**
   * Command message type:
   * Message which is sent from a single sender to exactly one single receiver.
   * The sender expects a answer response from receiver within a specific time frame (ttl).
   * If the sender does not receive a answer within this time frame, the command will be rejected with timeout error.
   */
  Command = 'command', // a message which expects an answer message from receiver

  /** a success response from receiver of a command message */
  CommandSuccessResponse = 'commandSuccessResponse',

  /** a error response from receiver of a command message */
  CommandErrorResponse = 'commandErrorResponse',

  /**
   * Info message type:
   * Message which is sent from a single sender to unspecified receivers.
   * The sender does not expect any answer to this message and does not process any reply to this message.
   * Info messages are fire & forget broadcasting messages.
   */
  /** indicates that a service is booting */
  InfoServiceInit = 'infoServiceInit',
  /** indicates that a service is ready */
  InfoServiceReady = 'infoServiceReady',
  /** indicates that a service is not able to process requests (e.g. db not available) */
  InfoServiceNotReady = 'infoServiceNotReady',
  /** send when a service provides a new function */
  InfoServiceFunctionAdded = 'infoServiceFunctionAdded',
  /** indicates that a service is going to shut down and does no longer accept new requests */
  InfoServiceDrain = 'infoServiceDrain',
  /** last event from service before service is destroyed */
  InfoServiceShutdown = 'infoServiceShutdown',
  /** a service invoked a other function and did not get a answer within given ttl */
  InfoInvokeTimeout = 'infoInvokeTimeout',
  /** a subscription function is throwing */
  InfoSubscriptionError = 'infoSubscriptionError',
  /** a custom message / custom event */
  CustomMessage = 'customMessage',
}

type CommandDefinition = {
  commandName: string
  commandDescription: string
  metadata: {
    expose: {
      contentTypeRequest?: string
      contentEncodingRequest?: string
      contentTypeResponse?: string
      contentEncodingResponse?: string
      inputPayload?: SchemaObject
      outputPayload?: SchemaObject
      parameter?: SchemaObject
      deprecated?: boolean
    }
  }
  eventBridgeConfig: {
    durable: boolean
    autoacknowledge: boolean
    shared: boolean
  }
  deprecated: boolean
}

type SubscriptionDefinition = {
  subscriptionName: string
  subscriptionDescription: string
  metadata: {
    expose: {
      contentTypeRequest?: string
      contentEncodingRequest?: string
      contentTypeResponse?: string
      contentEncodingResponse?: string
      inputPayload?: SchemaObject
      outputPayload?: SchemaObject
      parameter?: SchemaObject
    }
  }
  eventBridgeConfig: {
    durable: boolean
    autoacknowledge: boolean
    shared: boolean
  }
  /** filter for messages produced by given sender */
  sender?: {
    serviceName?: string
    serviceVersion?: string
    serviceTarget?: string
    instanceId?: string
  }
  /** filter for messages consumed by given receiver */
  receiver?: {
    serviceName?: string
    serviceVersion?: string
    serviceTarget?: string
    instanceId?: string
  }
  /** filter for message type */
  messageType?: EBMessageType
  /** filter forevent name */
  eventName?: string
  /** event name to be used for custom message if the subscription functions returns value  */
  emitEventName?: string
  /** filter for principal id */
  principalId?: string
  /** filter for tenant id */
  tenantId?: string
  /** hooks of subscription */
  deprecated: boolean
}

type FullServiceDefinition = {
  [serviceName: string]: {
    [serviceVersion: string]: {
      description: string
      deprecated: boolean
      commands: {
        [commandName: string]: CommandDefinition
      }
      subscriptions: {
        [subscriptionName: string]: SubscriptionDefinition
      }
    }
  }
}

type ImportFile = {
  version: string
  rest?: {
    apiPath: string
    domain: string
  }
  services: FullServiceDefinition
}
const appConfig = useAppConfig()
export default defineEventHandler(async (event) => {
  const body: ImportFile = await readBody(event)

  const db = new Surreal()
  await db.connect(appConfig.surrealDb.url)
  await db.signin(appConfig.surrealDb.auth)
  await db.use(appConfig.surrealDb.db)

  const knownServicesDb = await db.query('SELECT name, version FROM service')

  const knownServices = new Set()
  knownServicesDb.forEach((entry) => knownServices.add(`${entry.name}:${entry.version}`))
  console.log(knownServices)

  const queries = Object.entries(body.services).reduce((prev, [serviceName, versionEntry]) => {
    const versions = Object.entries(versionEntry).map(([version, service]) => {
      let ret = ''
      if (knownServices.has(`${serviceName}:${version}`)) {
        ret = `UPDATE service:{ name: '${serviceName}', version: '${version}' } CONTENT ${JSON.stringify(
          {
            name: serviceName,
            version,
            ...service,
          }
        )};`
      } else {
        ret = `CREATE service:{ name: '${serviceName}', version: '${version}' } CONTENT ${JSON.stringify(
          {
            name: serviceName,
            version,
            ...service,
          }
        )};`
      }

      return ret
    })

    return [...prev, ...versions]
  }, [] as string[])

  const query = `BEGIN TRANSACTION;
    ${queries.join('\n')}
  COMMIT TRANSACTION;
  `

  //console.log(queries)
  const result = await db.query(query)

  return { result }
})
