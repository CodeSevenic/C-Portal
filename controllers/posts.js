const axios = require('axios');

// Creating a function getHubSpotBlogPosts which takes parameters limit, offset, and page
async function getHubSpotBlogPosts(limit = 20, offset = 0, page = 1) {
  const options = {
    method: 'GET',
    url: 'https://api.hubapi.com/content/api/v2/blog-posts',
    params: {
      limit: limit,
      offset: offset + (page - 1) * limit,
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
    },
  };

  try {
    const response = await axios(options);
    return response.data.objects;
  } catch (error) {
    console.error(error);
  }
}

module.exports = getHubSpotBlogPosts;
