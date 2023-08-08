const axios = require('axios');
const axiosRetry = require('axios-retry');

const ZOOM_OAUTH_ENDPOINT = 'https://zoom.us/oauth/token';
const ZOOM_API_ENDPOINT = 'https://api.zoom.us/v2';
const CLIENT_ID = 'rSTtXnRSLa0cjucCIM3A';
const CLIENT_SECRET = 'oSJRpxVllakfmg4xw6z34u2XxVz7Wth2';

let accessToken;
let tokenExpiresAt = 0;

axiosRetry(axios, { retries: 3 }); // Retry failed requests for up to 3 times

function isTokenExpired() {
  const now = Date.now() / 1000;
  return now >= tokenExpiresAt;
}

async function getAccessToken() {
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  try {
    const response = await axios.post(ZOOM_OAUTH_ENDPOINT, null, {
      params: {
        grant_type: 'client_credentials',
      },
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.data.access_token) {
      throw new Error('Zoom API responded without an access token');
    }

    accessToken = response.data.access_token;

    const expiresIn = response.data.expires_in;
    tokenExpiresAt = Date.now() / 1000 + expiresIn - 60;
  } catch (error) {
    throw new Error('Failed to retrieve the access token: ' + error.message);
  }
}

async function fetchWebinars(req, res) {
  if (!accessToken || isTokenExpired()) {
    try {
      await getAccessToken();
      console.log('Token (after fetching): ', accessToken); // <-- moved here
    } catch (error) {
      return res.status(500).send(error.message);
    }
  } else {
    console.log('Token (existing): ', accessToken);
  }

  try {
    const response = await axios.get(`${ZOOM_API_ENDPOINT}/users/me/webinars`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('response.data', response.data);
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 401 && !isTokenExpired()) {
      // Token might be invalid but not expired (for reasons other than expiration)
      // Clear current token and force a retry
      accessToken = null;
      return fetchWebinars(req, res);
    }

    console.error('Error fetching webinars:', error);
    res.status(500).send('Failed to fetch webinars.');
  }
}

module.exports = {
  fetchWebinars,
};
