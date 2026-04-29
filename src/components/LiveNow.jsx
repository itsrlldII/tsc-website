import React, { useEffect, useState } from "react";
import { ArrowUpRight, Radio, Users } from "lucide-react";
import { fetchLiveStreams } from "../lib/api";

const REFRESH_MS = 60_000;

function formatViewers(n) {
  if (!n && n !== 0) return "—";
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return `${n}`;
}

export default function LiveNow() {
  const [state, setState] = useState({ streams: [], configured: false, note: null, loading: true });

  const load = async () => {
    try {
      const data = await fetchLiveStreams();
      setState({
        streams: data.streams || [],
        configured: !!data.configured,
        note: data.note,
        loading: false,
      });
    } catch {
      setState((s) => ({ ...s, loading: false, note: "Couldn't reach live feed." }));
    }
  };

  useEffect(() => {
    load();
    const id = setInterval(load, REFRESH_MS);
    return () => clearInterval(id);
  }, []);

  const liveStreams = state.streams.filter((s) => s.is_live);
  const offlineStreams = state.streams.filter((s) => !s.is_live);
  const hasAny = state.streams.length > 0;

  return (
    <section
      data-testid="live-now-section"
      className="relative py-16 md:py-20 border-y border-white/10 overflow-hidden"
    >
      {/* misty purple atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-mist-fade" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <p className="overline text-mist flex items-center gap-2" data-testid="live-now-label">
              <span className={`live-dot ${liveStreams.length === 0 ? "opacity-40" : ""}`} />
              Live Now — Twitch Feed
            </p>
            <h2 className="font-display mt-3 text-3xl md:text-5xl font-light uppercase tracking-tighter">
              {liveStreams.length > 0
                ? `${liveStreams.length} shadow${liveStreams.length > 1 ? "s" : ""} streaming`
                : "All shadows offline"}
            </h2>
          </div>
          <div className="text-right">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">
              Auto-refresh · 60s
            </p>
            {!state.configured && (
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-mist mt-1" data-testid="live-not-configured">
                ▸ Twitch API keys not set
              </p>
            )}
          </div>
        </div>

        {state.loading && (
          <p className="text-white/40 font-mono text-sm" data-testid="live-loading">Loading live feed…</p>
        )}

        {!state.loading && !hasAny && (
          <p className="text-white/40 font-mono text-sm">No members have Twitch logins set.</p>
        )}

        {/* Live streams grid */}
        {liveStreams.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6" data-testid="live-streams-grid">
            {liveStreams.map((s) => (
              <a
                key={s.slug}
                href={`https://twitch.tv/${s.twitch_login}`}
                target="_blank"
                rel="noreferrer"
                data-testid={`live-stream-${s.slug}`}
                className="tsc-card group relative overflow-hidden border-mist/40 hover:border-mist"
              >
                <div className="aspect-video relative overflow-hidden bg-black">
                  {s.thumbnail_url ? (
                    <img
                      src={s.thumbnail_url}
                      alt={s.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-60"
                      style={{ backgroundImage: `url(${s.avatar_url})` }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/80 backdrop-blur-md px-2.5 py-1 border border-mist/60">
                    <span className="live-dot" />
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-mist">
                      Live
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2.5 py-1 border border-white/10">
                    <Users className="w-3 h-3 text-white/70" />
                    <span className="font-mono text-[0.7rem] text-white">
                      {formatViewers(s.viewer_count)}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-display text-xl uppercase tracking-tight truncate">
                        {s.name}
                      </p>
                      <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/50 mt-1 truncate">
                        {s.game_name || "—"}
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-mist transition-colors shrink-0" />
                  </div>
                  <p className="mt-3 text-sm text-white/70 line-clamp-2">
                    {s.title || "Untitled stream"}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Offline row */}
        {offlineStreams.length > 0 && (
          <div>
            <p className="overline text-white/40 mb-4">Offline</p>
            <div className="flex flex-wrap gap-3" data-testid="live-offline-row">
              {offlineStreams.map((s) => (
                <a
                  key={s.slug}
                  href={`https://twitch.tv/${s.twitch_login}`}
                  target="_blank"
                  rel="noreferrer"
                  data-testid={`offline-stream-${s.slug}`}
                  className="flex items-center gap-3 border border-white/10 pr-4 pl-1 py-1 hover:border-mist/60 transition-colors"
                >
                  <span
                    className="w-8 h-8 border-r border-white/10 bg-cover bg-center grayscale opacity-60"
                    style={{ backgroundImage: `url(${s.avatar_url})` }}
                  />
                  <span className="font-display uppercase tracking-tight text-sm text-white/70">
                    {s.name}
                  </span>
                  <Radio className="w-3 h-3 text-white/30" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
