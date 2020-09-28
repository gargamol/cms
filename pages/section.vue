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
    <section>
      <div class="field">
        <b-checkbox>Basic</b-checkbox>
      </div>
      <div class="field">
        <b-checkbox v-model="checkbox">
          {{ checkbox }}
        </b-checkbox>
      </div>
      <div class="field">
        <b-checkbox v-model="checkboxCustom" true-value="Yes" false-value="No">
          {{ checkboxCustom }}
        </b-checkbox>
      </div>
      <div class="field">
        <b-checkbox :indeterminate="true"> Indeterminate </b-checkbox>
      </div>
      <div class="field">
        <b-checkbox disabled>Disabled</b-checkbox>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkbox: false,
      checkboxCustom: 'Yes',
    };
  },
};
</script>
