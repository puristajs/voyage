<script setup lang="ts">

</script>

<template>
  <pre
    v-bind="$attrs"
    class="bounce-in-from-right"
  ><code class="language-typescript" style="width: 40vw; height: 300px;overflow: hidden;">export const signUpCommandBuilder = userV1ServiceBuilder
  .getCommandBuilder('signUp', 'registers a new user at our product')
  .setSuccessEventName(ServiceEvent.NewUserRegistered)
  .addPayloadSchema(userV1SignUpInputPayloadSchema)
  .addParameterSchema(userV1SignUpInputParameterSchema)
  .addOutputSchema(userV1SignUpOutputPayloadSchema)
  .exposeAsHttpEndpoint('POST', 'user/signup')
  .setCommandFunction(async function (context, payload, _parameter) {
    const result = (await context.states.getState(StateStoreKey.Users)) as { [StateStoreKey.Users]: User[] | undefined }

    if (result.users?.some((user) => user.email === payload.email)) {
      throw new HandledError(StatusCode.BadRequest, 'the user already exists')
    }

    const user: User = {
      ...payload,
      userId: randomUUID(),
    }

    const users = result.users ?? []
    users.push(user)

    await context.states.setState(StateStoreKey.Users, users)

    // add your business logic here
    context.logger.info('new user added')

    return user
  })</code></pre>
</template>

<style scoped>
.bounce-in-from-right {
  display: block;
  background: #282c34;
  font-family: monospace;
  color: #abb2bf;
  animation: bounce-in-from-right ease-out forwards;
  animation-timeline: view();
  padding-left: 13px;
  padding-top: 13px;
  border-radius: 5px;
}

/* bounce element from right into the screen */
@keyframes bounce-in-from-right {
  0% {
    transform: translateX(100%);
  }
  25% {
    transform: translateX(0%);
  }
}
</style>