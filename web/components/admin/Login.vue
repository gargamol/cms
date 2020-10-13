<template>
  <div>
    <ApolloMutation
      :mutation="require('../graphql/mutaion/login.gql')"
      :variables="{ username, password }"
      @done="onDone"
    >
      <template v-slot="{ mutate, loading, error }">
        <form>
          <input
            id="input-email"
            v-model="username"
            type="email"
            required
            placeholder="Enter Username"
            autocomplete="username"
          />

          <input
            id="passworld"
            v-model="password"
            type="password"
            placeholder="Enter Password"
            required
            autocomplete="current-password"
          />

          <button :disabled="loading" @click="mutate()" type="submit" variant="primary">
            Submit
          </button>
        </form>
        <p v-if="error">{{ error }}</p>
      </template>
    </ApolloMutation>
  </div>
</template>

<script>
import gql from 'graphql-tag';
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
      value: '',
    };
  },
  methods: {
    onDone(val) {
      this.$apolloHelpers.onLogin(val.data.login.value);
      localStorage.setItem('user', this.username);
      this.$router.push('/admin');
    },
  },
};
</script>
