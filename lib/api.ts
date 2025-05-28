type JobDescriptionEntry = {
  _id: string;
  title: string;
  description: string;
};

type JobDescriptionCollectionResponse = {
  jobDescriptionCollection: {
    items: JobDescriptionEntry[];
  };
};

async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  preview = false
): Promise<{ data: T }> {
  const response = await fetch(
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

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  return response.json();
}

function extractJobCollectionEntries(
  fetchResponse: { data: JobDescriptionCollectionResponse }
): JobDescriptionEntry[] {
  return fetchResponse?.data?.jobDescriptionCollection?.items ?? [];
}

/** Fetches the items array for a given job description title */
export async function getJobDescriptionEntries(slug: string): Promise<JobDescriptionEntry[]> {
  const graphql = await fetchGraphQL<JobDescriptionCollectionResponse>(
    `query {
      jobDescriptionCollection(where: {slug: "${slug}"}) {
        items {
          _id
          title
          description
        }
      }
    }`
  );

  return extractJobCollectionEntries(graphql);
}
