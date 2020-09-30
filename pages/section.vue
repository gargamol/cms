<template>
  <div>
    <ApolloQuery
      :query="require('../graphql/query/websiteScheduledContent')"
      :variables="{ sectionId: 56199, limit: 3 }"
    >
      <template v-slot="{ result: { data } }">
        <!-- Result -->
        <div v-if="data">
          <div v-for="item in data.websiteScheduledContent.edges" :key="item.node.name">
            <h3>{{ item.node.name }}</h3>
            <p v-if="item.node.teaser != '...'">{{ item.node.teaser }}</p>
            <img v-bind:src="item.node.primaryImage.src" v-bind:alt="item.node.primaryImage.name" />
          </div>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>
