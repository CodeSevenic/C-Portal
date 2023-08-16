const axios = require('axios');
const axiosRetry = require('axios-retry');

const ZOOM_OAUTH_ENDPOINT = 'https://zoom.us/oauth/token';
const ZOOM_API_ENDPOINT = 'https://api.zoom.us/v2';
const ACCOUNT_ID = 'qjkq_RUNQVmpxQ47asR6bA';
const CLIENT_ID = '0tQ_JXkYRgahfuvfQVSUhg';
const CLIENT_SECRET = 'j1ghjVG279cbpiWUnW6gLZqlIHFhCIrj';

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

const HUBSPOT_API_URL = 'https://api.hubapi.com';
const ACCESS_TOKEN = process.env.HUBSPOT_API_KEY;

async function fetchAllEvents() {
  try {
    const response = await axios.get(
      `${HUBSPOT_API_URL}/marketing/v3/marketing-events/events/search`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        params: {
          q: 'hubspot-johannesburg-presents-contact-hygiene-in-hubspot-practical-strategies-to-increase-your-marketing-results',
        },
      }
    );

    console.log(response);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Error fetching events:', error.message);
    }
    console.log('Error fetching events:', error);
  }
}

fetchAllEvents();

module.exports = {
  fetchWebinars,
};
