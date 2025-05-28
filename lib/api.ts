

async function fetchGraphQL(query: string, variables?: Record<string, any>, preview = false): Promise<any> {
  return fetch(
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
    },
  ).then((response) => response.json());
}
  function extractJobCollectionEntries(fetchResponse: any): any {
    return fetchResponse?.data;
  }
  
  /** Fetches the items array for a given job description title */
  export async function getJobDescriptionEntries(slug: string) {
    const graphql = await fetchGraphQL(
    `query {
      jobDescriptionCollection(where: {slug: "${slug}"}) {
        items {
          _id
          title
          description
        }
      }
    }`,
    )
    return extractJobCollectionEntries(graphql);
  }
  