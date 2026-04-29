import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Play, Users } from "lucide-react";
import { ORG, SOCIAL_LINKS, CONTENT_FEED, PILLARS } from "../lib/tsc";
import { MEMBERS, TSC_OFFICIAL } from "../lib/members";
import { fetchTwitchLiveStatus } from "../lib/live";
import { SocialIcon } from "../components/SocialIcon";
import MemberCard from "../components/MemberCard";

const HERO_BG =
  "https://images.unsplash.com/photo-1770745559994-545619d3c3da?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwzfHxkYXJrJTIwbHV4dXJ5JTIwYWJzdHJhY3QlMjB0ZXh0dXJlfGVufDB8fHx8MTc3NzMyNjM0M3ww&ixlib=rb-4.1.0&q=85";

const ABOUT_BG =
  "https://images.pexels.com/photos/31650443/pexels-photo-31650443.jpeg";

export default function Home() {
  const [liveMap, setLiveMap] = useState({});

useEffect(() => {
  fetchTwitchLiveStatus()
    .then(setLiveMap)
    .catch(() => setLiveMap({}));
}, []);

const members = [TSC_OFFICIAL, ...MEMBERS].slice(0, 4).map((member) => {
  const twitchLogin = String(member.twitch_login || "").toLowerCase();
  const liveData = liveMap[twitchLogin];

  return {
    ...member,
    live: Boolean(liveData),
    liveData,
  };
});
  const youtube = SOCIAL_LINKS.find((social) => social.key === "youtube");
  const discord = SOCIAL_LINKS.find((social) => social.key === "discord");

  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section className="relative min-h-screen flex items-end overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_BG})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/75 to-black" />
          <div className="mist-layer" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-8">
              <p className="overline text-gold reveal">
                ▸ 001 / The Shadow Corp
              </p>

              <h1 className="display-xl mt-6 text-[15vw] sm:text-[12vw] md:text-[9rem] lg:text-[11rem] text-white reveal reveal-delay-1">
                This is
                <br />
                <span className="text-gold">the shadow</span>
                <br />
                <span className="text-mist">corp.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base md:text-lg text-white/70 reveal reveal-delay-2">
                {ORG.mission} An organization for recruits, creators, and
                competitors who move differently across every title, every
                platform, every lane.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4 reveal reveal-delay-3">
                <a
                  href={ORG.discordInvite}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="hero-join-discord"
                  className="btn-tsc"
                >
                  <SocialIcon kind="discord" />
                  Join Discord
                </a>

                <Link
                  to="/apply"
                  data-testid="hero-apply-now"
                  className="btn-tsc-outline"
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link to="/socials" data-testid="hero-follow" className="btn-ghost">
                  Follow Us
                </Link>
              </div>
            </div>

            <div className="md:col-span-4 hidden md:block">
              <div className="border border-white/10 p-6 bg-black/40 backdrop-blur-md reveal reveal-delay-4">
                <p className="overline text-gold">Status</p>

                <p className="font-display text-3xl font-light mt-3 tracking-tight">
                  <span className="live-dot mr-3 align-middle" />
                  Recruiting
                </p>

                <p className="mt-2 text-sm text-white/60">
                  {MEMBERS.length} active operatives · Open positions across
                  Player, Creator, Staff, Editor, Designer, and Dev.
                </p>

                <div className="gold-rule my-5" />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/50">Scope</span>
                    <span className="text-white">Multi-title</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/50">Region</span>
                    <span className="text-white">Global</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/50">Year</span>
                    <span className="text-white">{ORG.year}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
           {/* SOCIAL TICKER BAR */}
      <section className="border-y border-white/10 bg-obsidian-surface overflow-hidden">
        <div className="py-5 relative">
          <div className="ticker-track">
            {[...SOCIAL_LINKS, ...SOCIAL_LINKS].map((s, i) => (
              <a
                key={`${s.key}-${i}`}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                data-testid={`ticker-social-${s.key}-${i}`}
                className="flex items-center gap-3 px-8 text-white/70 hover:text-gold transition-colors"
              >
                <SocialIcon kind={s.key} className="w-4 h-4" />

                <span className="font-mono uppercase tracking-[0.25em] text-xs">
                  {s.label}
                </span>

                <span className="text-white/20">—</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE / CONTENT STATUS */}
      <section className="py-16 bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="tsc-card p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="overline text-gold">▸ Live / Updates</p>

              <h2 className="font-display mt-3 text-3xl md:text-5xl font-light uppercase tracking-tighter">
                Follow the Shadow Feed
              </h2>

              <p className="mt-3 text-white/60 max-w-2xl">
                Catch streams, content drops, clips, recruitment posts, and
                behind-the-scenes updates through the official TSC socials.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={youtube?.url || "#"}
                target="_blank"
                rel="noreferrer"
                className="btn-tsc"
              >
                <Play className="w-4 h-4" />
                YouTube
              </a>

              <a
                href={ORG.discordInvite}
                target="_blank"
                rel="noreferrer"
                className="btn-tsc-outline"
              >
                <SocialIcon kind="discord" />
                Discord
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="relative py-24 md:py-32" data-testid="about-section">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${ABOUT_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="overline text-gold">▸ 002 / About</p>

              <h2 className="font-display mt-4 text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-tighter">
                What is
                <br />
                <span className="text-mist">The Shadow</span>
                <br />
                Corp?
              </h2>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                TSC is an{" "}
                <span className="text-gold">
                  esports, content, community, and game development
                </span>{" "}
                organization built to grow talent from the ground up. Players,
                creators, editors, designers, and builders operating under one
                banner: talent first, noise later.
              </p>

              <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
                {PILLARS.map((p, i) => (
                  <div
                    key={p.label}
                    className={`pt-4 border-t ${
                      i % 2 === 0 ? "border-gold/30" : "border-mist/40"
                    }`}
                  >
                    <p
                      className={`font-mono text-xs tracking-[0.25em] ${
                        i % 2 === 0 ? "text-gold" : "text-mist"
                      }`}
                    >
                      {p.value}
                    </p>

                    <p className="font-display text-xl mt-2 uppercase tracking-tight">
                      {p.label}
                    </p>

                    <p className="mt-1 text-xs text-white/40">{p.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section> 
            {/* CURRENT MEMBERS */}
      <section className="py-24 md:py-32" data-testid="members-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <p className="overline text-gold">▸ 003 / Roster</p>

              <h2 className="font-display mt-4 text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-tighter">
                Current Members
              </h2>

              <p className="mt-3 text-white/60 max-w-xl">
                The players, creators, and builders behind the movement.
              </p>
            </div>

            <Link to="/members" data-testid="view-all-members" className="btn-ghost">
              View All Members <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {members.map((m) => (
              <MemberCard key={m.id} member={m} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT STRIP */}
      <section
        className="py-24 md:py-32 bg-obsidian-surface border-y border-white/10"
        data-testid="content-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <p className="overline text-gold">▸ 004 / Content</p>

              <h2 className="font-display mt-4 text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-tighter">
                Latest From
                <br />
                The Shadow Feed
              </h2>

              <p className="mt-3 text-white/60 max-w-xl">
                Follow the official channels for highlights, edits, live
                sessions, development updates, and recruitment drops.
              </p>
            </div>

            <a
              href={youtube?.url || "#"}
              target="_blank"
              rel="noreferrer"
              data-testid="content-watch-all"
              className="btn-ghost"
            >
              Watch All <Play className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {CONTENT_FEED.map((c, idx) => (
              <a
                key={c.title}
                href={youtube?.url || "#"}
                target="_blank"
                rel="noreferrer"
                data-testid={`content-card-${idx}`}
                className={`tsc-card p-6 md:p-8 group ${
                  idx === 0
                    ? "md:col-span-6 md:row-span-2 aspect-video md:aspect-auto"
                    : "md:col-span-6 aspect-video md:aspect-auto md:min-h-[180px]"
                } relative overflow-hidden flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between">
                  <span className="overline text-gold">{c.tag}</span>

                  <span className="font-mono text-xs text-white/50">
                    {c.duration}
                  </span>
                </div>

                <div className="mt-auto">
                  <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-light uppercase tracking-tight">
                    {c.title}
                  </h3>

                  <p className="mt-2 text-xs text-white/50 font-mono uppercase tracking-[0.2em]">
                    {c.game}
                  </p>
                </div>

                <div className="absolute right-6 bottom-6 w-10 h-10 border border-white/10 flex items-center justify-center text-white/60 group-hover:border-gold group-hover:text-gold transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BLOCK */}
      <section className="py-24 md:py-32" data-testid="cta-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="tsc-card p-10 md:p-14 flex flex-col justify-between min-h-[360px] relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-mist/10 blur-3xl pointer-events-none" />

            <div className="relative">
              <p className="overline text-gold">Recruitment</p>

              <h3 className="font-display mt-4 text-4xl md:text-5xl font-light uppercase tracking-tighter">
                Think you belong in the shadows?
              </h3>

              <p className="mt-4 text-white/60 max-w-md">
                Player, creator, staff, editor, designer, or developer. Four
                tracks. One movement.
              </p>
            </div>

            <Link
              to="/apply"
              data-testid="cta-apply"
              className="btn-tsc mt-8 self-start relative"
            >
              Apply Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div
            className="tsc-card p-10 md:p-14 flex flex-col justify-between min-h-[360px] bg-[#0a0a0a] relative overflow-hidden"
            data-testid="discord-cta-card"
          >
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-mist/10 blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <p className="overline text-mist">Headquarters</p>

                <div className="flex items-center gap-2 px-3 py-1.5 border border-white/10">
                  <Users className="w-3 h-3 text-white/60" />

                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/70">
                    Community hub
                  </span>
                </div>
              </div>

              <h3 className="font-display mt-4 text-4xl md:text-5xl font-light uppercase tracking-tighter">
                Enter the
                <br />
                Discord server
              </h3>

              <p className="mt-4 text-white/60 max-w-md">
                Daily chat, scrim coordination, content drops, recruitment,
                updates, and behind-the-scenes.
              </p>
            </div>

            <a
              href={discord?.url || ORG.discordInvite}
              target="_blank"
              rel="noreferrer"
              data-testid="cta-discord"
              className="btn-tsc-outline mt-8 self-start relative"
            >
              <SocialIcon kind="discord" /> Join Discord
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}