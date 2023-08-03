const axios = require('axios');

async function getHubSpotBlogPosts(req, res) {
  const limit = Number(req.query.limit) || 8;
  const offset = Number(req.query.offset) || 0;
  const page = Number(req.query.page) || 1;

  const options = {
    method: 'GET',
    url: 'https://api.hubapi.com/content/api/v2/blog-posts',
    params: {
      limit,
      offset: offset + (page - 1) * limit,
      order_by: '-publish_date',
      archived: false,
      state: 'PUBLISHED',
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
    },
  };

  try {
    const response = await axios(options);

    const filteredData = response.data.objects
      .filter((post) => post.featured_image) // Only process posts with a featured image
      .map((post) => ({
        id: post.id,
        name: post.name,
        featured_image: post.featured_image,
        url: post.url,
        created: post.created,
        updated: post.updated,
        post_summary: post.post_summary,
        keywords: post.keywords,
        topic_ids: post.topic_ids,
      }));

    const totalPages = Math.ceil(response.data.total / limit);

    console.log('totalPages: ', totalPages);

    return res.status(200).send({ data: filteredData, totalPages });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
}

module.exports = getHubSpotBlogPosts;
