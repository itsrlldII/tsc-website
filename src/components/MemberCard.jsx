import React from "react";
import { Link } from "react-router-dom";
import { SocialIcon } from "./SocialIcon";

function LiveBadge({ member, size = "sm" }) {
  if (!member.live) return null;

  const href =
    member.socials?.twitch ||
    (member.twitch_login ? `https://twitch.tv/${member.twitch_login}` : "#");

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`inline-flex items-center gap-2 border border-red-500/60 bg-black/75 text-red-400 font-mono uppercase tracking-[0.18em] backdrop-blur-md ${
        size === "lg"
          ? "px-3 py-1 text-[0.65rem]"
          : "px-2.5 py-1 text-[0.6rem]"
      }`}
    >
      <span
        className={`rounded-full bg-red-500 animate-pulse ${
          size === "lg" ? "w-2 h-2" : "w-1.5 h-1.5"
        }`}
      />
      Live
    </a>
  );
}

export default function MemberCard({ member, variant = "grid" }) {
  const socials = Object.entries(member.socials || {}).filter(
    ([, v]) => v && v.length > 0
  );
  const games = Array.isArray(member.games) ? member.games : [];
  const primaryGame = games[0] || member.game || "—";

  if (variant === "full") {
    return (
      <article
        data-testid={`member-full-${member.slug}`}
        className="tsc-card grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden relative"
      >
        <div className="md:col-span-5 relative aspect-[4/5] md:aspect-auto overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center scale-100 hover:scale-105 transition-transform duration-700"
            style={{ backgroundImage: `url(${member.avatar_url})` }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-mist-fade" />

          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
            <span className="overline text-gold">
              {member.joined || "2025"}
            </span>

            <LiveBadge member={member} size="lg" />
          </div>

          <div className="absolute bottom-4 left-4">
            <p className="overline text-mist">Shadow Operative</p>
          </div>
        </div>

        <div className="md:col-span-7 p-8 md:p-10 flex flex-col">
          <div className="flex items-center gap-3 flex-wrap">
            <p className="overline text-gold">{member.role}</p>
            <LiveBadge member={member} />
          </div>

          <h3 className="font-display mt-3 text-5xl md:text-6xl font-light uppercase tracking-tighter">
            {member.name}
          </h3>

          <div className="gold-rule my-6 w-24" />

          <div className="mb-6">
            <p className="overline text-white/40 mb-3">Games / Disciplines</p>

            <div
              className="flex flex-wrap gap-2"
              data-testid={`member-${member.slug}-games`}
            >
              {games.length === 0 && (
                <span className="text-white/40 font-mono text-xs">—</span>
              )}

              {games.map((g, i) => (
                <span
                  key={g + i}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-[0.2em] border ${
                    i === 0
                      ? "border-gold text-gold"
                      : "border-mist text-mist"
                  }`}
                >
                  {g}
                </span>
              ))}
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
            <div>
              <dt className="overline text-white/40">Platform</dt>
              <dd className="mt-1 text-white">{member.platform || "—"}</dd>
            </div>

            <div>
              <dt className="overline text-white/40">Team</dt>
              <dd className="mt-1 text-white">{member.team || "TSC"}</dd>
            </div>

            <div>
              <dt className="overline text-white/40">Joined</dt>
              <dd className="mt-1 text-white">{member.joined || "—"}</dd>
            </div>

            <div>
              <dt className="overline text-white/40">Twitch</dt>
              <dd className="mt-1 text-white">
                {member.twitch_login ? `@${member.twitch_login}` : "—"}
              </dd>
            </div>
          </dl>

          <p className="mt-6 text-sm text-white/70 leading-relaxed max-w-prose">
            {member.bio}
          </p>

          {member.focus && (
            <p className="mt-4 text-xs font-mono uppercase tracking-[0.2em] text-white/50">
              Focus — {member.focus}
            </p>
          )}

          <div className="mt-auto pt-8 flex items-center gap-2 flex-wrap">
            {socials.map(([k, v]) => (
              <a
                key={k}
                href={v}
                target="_blank"
                rel="noreferrer"
                data-testid={`member-${member.slug}-social-${k}`}
                aria-label={k}
                className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/80 hover:border-gold hover:text-gold transition-colors"
              >
                <SocialIcon kind={k} />
              </a>
            ))}
          </div>
        </div>
      </article>
    );
  }

  return (
    <Link
      to="/members"
      data-testid={`member-card-${member.slug}`}
      className="tsc-card relative block aspect-[3/4] overflow-hidden group"
    >
      <div
        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
        style={{ backgroundImage: `url(${member.avatar_url})` }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-mist-fade" />

      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
        <span className="overline text-white/80">
          {String(member.slug).toUpperCase()}
        </span>

        {member.live ? (
          <LiveBadge member={member} />
        ) : (
          <span className="overline text-gold">★</span>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="overline text-gold mb-2">
          {member.role.split("/")[0].trim()}
        </p>

        <h4 className="font-display text-3xl md:text-4xl font-light uppercase tracking-tighter text-white">
          {member.name}
        </h4>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {games.slice(0, 3).map((g, i) => (
            <span
              key={g + i}
              className={`px-2 py-0.5 text-[0.6rem] font-mono uppercase tracking-[0.18em] border ${
                i === 0
                  ? "border-gold/60 text-gold"
                  : "border-mist/60 text-mist"
              }`}
            >
              {g}
            </span>
          ))}

          {games.length === 0 && (
            <span className="text-[0.65rem] text-white/40 font-mono uppercase tracking-[0.2em]">
              {primaryGame}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center gap-2">
          {socials.slice(0, 5).map(([k]) => (
            <span
              key={k}
              className="w-7 h-7 border border-white/20 flex items-center justify-center text-white/70"
            >
              <SocialIcon kind={k} className="w-3 h-3" />
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}