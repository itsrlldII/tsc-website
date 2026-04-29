// Shared constants for The Shadow Corp

export const ORG = {
  name: "The Shadow Corp",
  short: "TSC",
  tagline: "Built from the shadows. Designed to dominate.",
  mission: "An esports, game development, content, and community collective built for the next era.",
  email: "tscoffical001@gmail.com",
  discordInvite: "https://discord.gg/X9YrTJHnmC",
  applicationform: "https://discord.gg/X9YrTJHnmC",
  logo: "https://customer-assets.emergentagent.com/job_esports-collective/artifacts/hi9yhv30_IMG_2311.png",
  year: new Date().getFullYear(),
};

export const SOCIAL_LINKS = [
  { key: "discord", label: "Discord", handle: "Join the Headquarters", url: "https://discord.gg/X9YrTJHnmC" },
  { key: "tiktok", label: "TikTok", handle: "Watch clips & edits", url: "https://www.tiktok.com/@theshadowcorp.gg?lang=en" },
  { key: "youtube", label: "YouTube", handle: "Long-form content", url: "https://www.youtube.com/@TheShadowCorpgg" },
  { key: "twitch", label: "Twitch", handle: "Watch live", url: "https://www.twitch.tv/tsc_esports" },
  { key: "instagram", label: "Instagram", handle: "Behind the scenes", url: "https://www.instagram.com/theshadowcorp.gg/" },
  { key: "x", label: "X / Twitter", handle: "Real-time updates", url: "https://x.com/theshadowcorpgg" },
];

export const SOCIAL_META = {
  tiktok: { label: "TikTok" },
  youtube: { label: "YouTube" },
  twitch: { label: "Twitch" },
  instagram: { label: "Instagram" },
  x: { label: "X" },
  discord: { label: "Discord" },
  kick: { label: "Kick" },
  website: { label: "Site" },
};

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/members", label: "Members" },
  { to: "/apply", label: "Apply" },
  { to: "/socials", label: "Socials" },
  { to: "/contact", label: "Contact" },
];

export const APPLY_CATEGORIES = [
  {
    key: "player",
    label: "Player",
    blurb: "Compete under the shadow banner across ranked, scrims, leagues, and tournaments.",
  },
  {
    key: "creator",
    label: "Creator",
    blurb: "Streamers, TikTokers, YouTubers, and editors helping grow the movement through content.",
  },
  {
    key: "staff",
    label: "Staff",
    blurb: "Managers, coaches, analysts, recruiters, social leads, and community mods.",
  },
  {
    key: "editor",
    label: "Editor / Designer / Dev",
    blurb: "Video editors, graphic designers, developers, and builders shaping the TSC creative stack.",
  },
];

export const INQUIRY_TYPES = [
  { key: "sponsorship", label: "Sponsorship" },
  { key: "brand", label: "Brand Collab" },
  { key: "collab", label: "Content Collab" },
  { key: "press", label: "Press / Media" },
  { key: "general", label: "General" },
];

export const PILLARS = [
  { label: "Esports", value: "01", note: "Players. Scrims. Tournaments." },
  { label: "Game Dev", value: "02", note: "Original titles. Internal tools." },
  { label: "Content", value: "03", note: "Clips, streams, edits, and long-form." },
  { label: "Community", value: "04", note: "Discord. Events. The network." },
];

export const CONTENT_FEED = [
  { tag: "Clip", title: "TSC Ranked Highlights", game: "Rocket League", duration: "00:42" },
  { tag: "Vlog", title: "Building The Shadow Corp", game: "Behind the Scenes", duration: "08:15" },
  { tag: "Highlight", title: "Mxko • Competitive Moments", game: "Rocket League", duration: "02:10" },
  { tag: "Stream", title: "TSC Live Sessions", game: "Live Content", duration: "LIVE" },
];