<template>
  <ApolloQuery
    :query="require('../graphql/websiteScheduledContent')"
    :variables="{ sectionId: 56199, pagination: { limit: 10 } }"
  >
    <template v-slot="{ result: { loading, error, data } }">
      <!-- Loading -->
      <div v-if="loading" class="loading apollo">Loading...</div>

      <!-- Error -->
      <div v-else-if="error" class="error apollo">An error occurred</div>

      <!-- Result -->
      <div v-else-if="data" class="result apollo">
        <div v-for="item of data.websiteScheduledContent.edges">
          {{ item.node.name }}
        </div>
      </div>

      <!-- No result -->
      <div v-else class="no-result apollo">No result :(</div>
    </template>
  </ApolloQuery>
</template>

<script>
export default {};
</script>
