// lib/api.ts
export async function fetchGraphQL(
    query: string,
    variables?: string | Record<string, any>,
    preview = false
  ): Promise<string> {
    const res = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            preview
              ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
              : process.env.CONTENTFUL_ACCESS_TOKEN
          }`,
        },
        body: JSON.stringify({ query, variables }),
      }
    );
    return res.json();
  }
  
  /** Fetches the items array for a given job description title */
  export async function getJobDescriptionEntries(
    slug: string
  ): Promise<Array<{ _id: string; title: string; description: string }>> {
    const gql = `query($slug: String!) {
      jobDescriptionCollection(where: { slug: $slug }) {
        items {
          _id
          title
          description
        }
      }
    }`;
  
    const response = await fetchGraphQL(gql, { slug });
    return (
      response?.data?.jobDescriptionCollection?.items ?? []
    );
  }
  