<template>
  <h1>Secret page</h1>
</template>

<script>
import gql from 'graphql-tag';

const getSlug = gql`
query Content($id: Int!) {
  content(input: { id: $id, status: any }) {
    slug
}
`;

export default {
  mounted() {
    this.$apollo.query({ query: getSlug, id: Number(this.$route.params.id) }).then(({ data }) => {
      console.log(('data', data));
    });
  },
};
</script>
