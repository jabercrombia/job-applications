type GraphQLResponse<T> = {
  data?: T;
};

export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  preview = false
): Promise<GraphQLResponse<T>> {
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
  return await res.json();
}

  export type JobDescriptionEntry = {
    _id: string;
    title: string;
    description: string;
  };
  
  type JobDescriptionQueryResult = {
    jobDescriptionCollection: {
      items: JobDescriptionEntry[];
    };
  };
  
  
  /** Fetches the items array for a given job description title */
  export async function getJobDescriptionEntries(
    slug: string
  ): Promise<JobDescriptionEntry[]> {
    const gql = `query($slug: String!) {
      jobDescriptionCollection(where: { slug: $slug }) {
        items {
          _id
          title
          description
        }
      }
    }`;
  
    const response = await fetchGraphQL<JobDescriptionQueryResult>(gql, { slug });
    return response.data?.jobDescriptionCollection.items ?? [];
  }
  