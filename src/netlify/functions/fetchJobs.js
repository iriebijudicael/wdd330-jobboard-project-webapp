export async function handler(event) {
  const { query = "java", location = "Worldwide" } =
    event.queryStringParameters || {};

  const host = "jobs-api14.p.rapidapi.com";

  const url = `https://${host}/v2/linkedin/search?datePosted=month&workplaceTypes=remote%3Bhybrid%3BonSite&query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}&experienceLevels=intern%3Bentry%3Bassociate%3BmidSenior%3Bdirector&employmentTypes=contractor%3Bfulltime%3Bparttime%3Bintern%3Btemporary`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "x-rapidapi-host": host
      }
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "API request failed" })
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data.jobs || data.data || data)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
