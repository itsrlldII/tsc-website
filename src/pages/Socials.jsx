import React from "react";
import { ArrowUpRight } from "lucide-react";
import { SocialIcon } from "../components/SocialIcon";
import { SOCIAL_LINKS } from "../lib/tsc";
import { MEMBERS } from "../lib/members";

export default function Socials() {
  const members = MEMBERS;

  return (
    <div data-testid="socials-page" className="pt-28 md:pt-36">
      {/* Header */}
      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <p className="overline text-gold">▸ Network / Every Platform</p>

          <h1 className="display-xl mt-5 text-[13vw] md:text-[7rem] text-white">
            Connect With
            <br />
            <span className="text-gold">The Shadow Corp</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl">
            Follow the movement across every platform. One link for every
            corner of the network.
          </p>
        </div>
      </section>

      {/* TSC Official Links */}
      <section className="py-16 md:py-24" data-testid="tsc-official-links">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="overline text-gold">TSC Official</p>

              <h2 className="font-display mt-3 text-3xl md:text-5xl font-light uppercase tracking-tighter">
                Main channels
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.key}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                data-testid={`official-social-${s.key}`}
                className="tsc-card group p-6 md:p-8 flex items-center gap-6"
              >
                <span className="w-14 h-14 border border-white/10 flex items-center justify-center text-white group-hover:border-gold group-hover:text-gold transition-colors shrink-0">
                  <SocialIcon kind={s.key} className="w-5 h-5" />
                </span>

                <div className="flex-1 min-w-0">
                  <p className="overline text-gold">{s.label}</p>

                  <p className="mt-1 font-display text-xl md:text-2xl uppercase tracking-tight text-white truncate">
                    {s.handle}
                  </p>
                </div>

                <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-gold transition-colors shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Per-Member Socials */}
      <section
        className="py-16 md:py-24 bg-obsidian-surface border-y border-white/10"
        data-testid="per-member-socials"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="overline text-gold">Operative Channels</p>

          <h2 className="font-display mt-3 text-3xl md:text-5xl font-light uppercase tracking-tighter">
            Follow the members
          </h2>

          <p className="mt-4 text-white/60 max-w-xl">
            Each shadow carries their own feed. Jump into any member's personal
            channels.
          </p>

          <div className="mt-12 space-y-10">
            {members.map((m) => {
              const socials = Object.entries(m.socials || {}).filter(([, v]) => v);

              return (
                <div
                  key={m.id}
                  data-testid={`member-socials-${m.slug}`}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-t border-white/10 pt-10"
                >
                  <div className="md:col-span-3 flex items-center gap-4">
                    <div
                      className="w-14 h-14 border border-white/10 bg-cover bg-center"
                      style={{ backgroundImage: `url(${m.avatar_url})` }}
                    />

                    <div>
                      <p className="overline text-gold">
                        {m.role.split("/")[0].trim()}
                      </p>

                      <p className="font-display text-2xl uppercase tracking-tight mt-1">
                        {m.name}
                      </p>
                    </div>
                  </div>

                  <div className="md:col-span-9 flex flex-wrap gap-3">
                    {socials.map(([k, v]) => (
                      <a
                        key={k}
                        href={v}
                        target="_blank"
                        rel="noreferrer"
                        data-testid={`${m.slug}-socials-${k}`}
                        className="inline-flex items-center gap-3 border border-white/10 px-4 py-3 text-white/80 hover:border-gold hover:text-gold transition-colors"
                      >
                        <SocialIcon kind={k} />

                        <span className="font-mono text-xs uppercase tracking-[0.2em]">
                          {k}
                        </span>
                      </a>
                    ))}

                    {socials.length === 0 && (
                      <p className="text-white/40 text-sm font-mono">
                        No public channels yet.
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}