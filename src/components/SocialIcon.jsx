import React from "react";
import {
  SiTiktok,
  SiYoutube,
  SiTwitch,
  SiInstagram,
  SiX,
  SiDiscord,
  SiKick,
} from "react-icons/si";
import { Globe } from "lucide-react";

export function SocialIcon({ kind, className = "w-4 h-4" }) {
  switch (kind) {
    case "tiktok":
      return <SiTiktok className={className} />;
    case "youtube":
      return <SiYoutube className={className} />;
    case "twitch":
      return <SiTwitch className={className} />;
    case "instagram":
      return <SiInstagram className={className} />;
    case "x":
    case "twitter":
      return <SiX className={className} />;
    case "discord":
      return <SiDiscord className={className} />;
    case "kick":
      return <SiKick className={className} />;
    case "website":
      return <Globe className={className} />;
    default:
      return <Globe className={className} />;
  }
}
