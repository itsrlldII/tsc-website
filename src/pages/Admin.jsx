import React, { useState } from "react";
import { toast } from "sonner";
import { verifyAdmin, fetchApplications, fetchContactMessages } from "../lib/api";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Lock, RefreshCw } from "lucide-react";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    if (!password) return;
    try {
      await verifyAdmin(password);
      setAuthed(true);
      await refresh(password);
    } catch {
      toast.error("Wrong password");
    }
  };

  const refresh = async (pw = password) => {
    setLoading(true);
    try {
      const [apps, msgs] = await Promise.all([
        fetchApplications(pw),
        fetchContactMessages(pw),
      ]);
      setApplications(apps);
      setMessages(msgs);
    } catch {
      toast.error("Refresh failed");
    } finally {
      setLoading(false);
    }
  };

  if (!authed) {
    return (
      <div data-testid="admin-login-page" className="pt-28 md:pt-36 min-h-[80vh] flex items-center">
        <div className="max-w-md w-full mx-auto px-4">
          <form onSubmit={login} className="tsc-card p-8" data-testid="admin-login-form">
            <div className="w-12 h-12 border border-gold flex items-center justify-center text-gold mx-auto mb-6">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="font-display text-3xl uppercase tracking-tighter text-center">
              Admin Access
            </h2>
            <p className="text-center text-white/50 text-sm mt-2">
              Enter the shadow key
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              data-testid="admin-password"
              className="tsc-input mt-6"
            />
            <button type="submit" className="btn-tsc mt-6 w-full" data-testid="admin-login-submit">
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="admin-page" className="pt-28 md:pt-36 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="overline text-gold">▸ Admin / Submissions</p>
            <h1 className="font-display mt-3 text-4xl md:text-5xl font-light uppercase tracking-tighter">
              Control Room
            </h1>
          </div>
          <button onClick={() => refresh()} className="btn-ghost" data-testid="admin-refresh">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        <Tabs defaultValue="applications">
          <TabsList className="bg-obsidian-surface border border-white/10 rounded-none p-1">
            <TabsTrigger
              value="applications"
              data-testid="admin-tab-apps"
              className="rounded-none data-[state=active]:bg-gold data-[state=active]:text-black font-mono uppercase tracking-[0.2em] text-xs px-6"
            >
              Applications ({applications.length})
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              data-testid="admin-tab-messages"
              className="rounded-none data-[state=active]:bg-gold data-[state=active]:text-black font-mono uppercase tracking-[0.2em] text-xs px-6"
            >
              Messages ({messages.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="mt-6 space-y-4">
            {applications.length === 0 && (
              <p className="text-white/40 font-mono text-sm">No applications yet.</p>
            )}
            {applications.map((a) => (
              <div key={a.id} className="tsc-card p-6" data-testid={`admin-app-${a.id}`}>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="overline text-gold">{a.type}</p>
                    <h3 className="font-display text-2xl mt-1 uppercase tracking-tight">
                      {a.name}
                    </h3>
                    <p className="text-sm text-white/60 mt-1">{a.email} {a.discord && `• ${a.discord}`}</p>
                  </div>
                  <p className="text-xs text-white/40 font-mono">
                    {new Date(a.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  {a.main_game && <div><span className="text-white/40">Game:</span> {a.main_game}</div>}
                  {a.rank && <div><span className="text-white/40">Rank:</span> {a.rank}</div>}
                  {a.platform && <div><span className="text-white/40">Platform:</span> {a.platform}</div>}
                </div>
                {a.socials && <p className="mt-3 text-sm text-white/70 break-all"><span className="text-white/40">Socials: </span>{a.socials}</p>}
                {a.experience && <p className="mt-3 text-sm text-white/70"><span className="text-white/40">Experience: </span>{a.experience}</p>}
                <p className="mt-3 text-sm text-white/80 border-l border-gold pl-3">
                  {a.why}
                </p>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="messages" className="mt-6 space-y-4">
            {messages.length === 0 && (
              <p className="text-white/40 font-mono text-sm">No messages yet.</p>
            )}
            {messages.map((m) => (
              <div key={m.id} className="tsc-card p-6" data-testid={`admin-msg-${m.id}`}>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="overline text-gold">{m.inquiry_type}</p>
                    <h3 className="font-display text-2xl mt-1 uppercase tracking-tight">
                      {m.name}
                    </h3>
                    <p className="text-sm text-white/60 mt-1">
                      {m.email}{m.company && ` • ${m.company}`}
                    </p>
                  </div>
                  <p className="text-xs text-white/40 font-mono">
                    {new Date(m.created_at).toLocaleString()}
                  </p>
                </div>
                <p className="mt-4 text-sm text-white/80 border-l border-gold pl-3 whitespace-pre-wrap">
                  {m.message}
                </p>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
