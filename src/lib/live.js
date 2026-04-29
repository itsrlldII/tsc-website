export async function fetchTwitchLiveStatus() {
  const response = await fetch("/.netlify/functions/twitch-live");

  if (!response.ok) {
    throw new Error("Failed to load Twitch live status.");
  }

  const data = await response.json();
  const streams = Array.isArray(data.streams) ? data.streams : [];

  return streams.reduce((acc, stream) => {
    const login = String(stream.user_login || "").toLowerCase();

    acc[login] = {
      live: true,
      title: stream.title,
      game: stream.game_name,
      viewerCount: stream.viewer_count,
      startedAt: stream.started_at,
      thumbnailUrl: stream.thumbnail_url,
      url: `https://www.twitch.tv/${login}`,
    };

    return acc;
  }, {});
}