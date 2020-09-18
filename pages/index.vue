<template>
  <ApolloQuery
    :query="require('../graphql/websiteScheduledContent')"
    :variables="{ sectionId: 56199, pagination: { limit: 3 } }"
  >
    <template v-slot="{ result: { data } }">
      <!-- Result -->
      <div v-if="data">
        <div v-for="item in data.websiteScheduledContent.edges" :key="item.node.name">
          {{ item.node.name }}
        </div>
      </div>
    </template>
  </ApolloQuery>
</template>

<script>
export default {};
</script>
