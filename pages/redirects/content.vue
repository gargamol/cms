<script>
import gql from 'graphql-tag';

// @ToDO replace name with the equivalent of node.siteContext.url

const getSlug = gql`
  query Content($id: Int!) {
    content(input: { id: $id, status: any }) {
      name
    }
  }
`;

export default {
  mounted() {
    this.$apollo
      .query({ query: getSlug, variables: { id: Number(this.$route.params.id) } })
      .then(({ data }) => {
        console.log('name', data.content.name);
      });
  },
};
</script>
