<template>
  <div>
    <ApolloQuery
      :query="require('../graphql/query/content')"
      :variables="{ id: Number(this.$route.params.id) }"
    >
      <template v-slot="{ result: { data, error } }">
        <div v-if="data">
          <h3>{{ data.content.name }}</h3>
          <p v-if="data.content.teaser">{{ data.content.teaser }}</p>
          <img
            v-if="data.content.primaryImage.src"
            v-bind:src="data.content.primaryImage.src"
            v-bind:alt="data.content.primaryImage.name"
          />
        </div>
        <div v-if="error">{{ error }}</div>
      </template>
    </ApolloQuery>
  </div>
</template>
