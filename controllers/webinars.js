const axios = require('axios');
const axiosRetry = require('axios-retry');
const dotenv = require('dotenv');
dotenv.config();

const ZOOM_OAUTH_ENDPOINT = process.env.ZOOM_OAUTH_ENDPOINT;
const ZOOM_API_ENDPOINT = process.env.ZOOM_API_ENDPOINT;
const ACCOUNT_ID = process.env.ACCOUNT_ID;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

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
        grant_type: 'account_credentials',
        account_id: ACCOUNT_ID,
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
  // console.log('Token (before fetching): ', accessToken);

  if (!accessToken || isTokenExpired()) {
    try {
      await getAccessToken();
      // console.log('Token (after fetching): ', accessToken); // <-- moved here
    } catch (error) {
      return res.status(500).send(error.message);
    }
  } else {
    // console.log('Token (existing): ', accessToken);
  }

  try {
    const response = await axios.get(`${ZOOM_API_ENDPOINT}/users/me/webinars`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    // console.log('response.data', response.data);
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
