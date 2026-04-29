const tokenCache = {
  accessToken: null,
  expiresAt: 0,
};

async function getAppAccessToken() {
  const now = Date.now();

  if (tokenCache.accessToken && tokenCache.expiresAt > now + 60_000) {
    return tokenCache.accessToken;
  }

  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing Twitch environment variables.");
  }

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "client_credentials",
  });

  const response = await fetch(`https://id.twitch.tv/oauth2/token?${params}`, {
    method: "POST",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Twitch token request failed: ${text}`);
  }

  const tokenData = await response.json();

  tokenCache.accessToken = tokenData.access_token;
  tokenCache.expiresAt = now + tokenData.expires_in * 1000;

  return tokenCache.accessToken;
}

exports.handler = async () => {
  try {
    const clientId = process.env.TWITCH_CLIENT_ID;

    const users = (process.env.TWITCH_USERS || "")
      .split(",")
      .map((user) => user.trim().toLowerCase())
      .filter(Boolean);

    if (!clientId || users.length === 0) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ streams: [] }),
      };
    }

    const accessToken = await getAppAccessToken();

    const query = users
      .map((user) => `user_login=${encodeURIComponent(user)}`)
      .join("&");

    const response = await fetch(`https://api.twitch.tv/helix/streams?${query}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-Id": clientId,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Twitch streams request failed: ${text}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60",
      },
      body: JSON.stringify({
        streams: data.data || [],
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};