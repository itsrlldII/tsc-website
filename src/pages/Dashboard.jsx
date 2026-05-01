import React, { useEffect, useState } from "react";
import { LogOut, Shield, User } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      const { data } = await supabase.auth.getSession();
      const currentSession = data.session;
      setSession(currentSession);

      if (currentSession?.user?.id) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", currentSession.user.id)
          .single();

        setProfile(profileData);
      }

      setLoadingProfile(false);
    }

    loadDashboard();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const role = profile?.role || "recruit";
  const status = profile?.status || "pending";

  return (
    <div className="pt-28 md:pt-36 min-h-screen" data-testid="dashboard-page">
      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <p className="overline text-gold">▸ Member Portal</p>

          <h1 className="display-xl mt-5 text-[14vw] md:text-[7rem] text-white">
            Shadow
            <br />
            <span className="text-gold">Dashboard</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl">
            Your TSC access hub. More tools unlock as your role expands.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="tsc-card p-8">
            <div className="w-12 h-12 border border-gold flex items-center justify-center text-gold">
              <User className="w-6 h-6" />
            </div>

            <p className="overline text-gold mt-6">Profile</p>

            {loadingProfile ? (
              <p className="mt-4 text-white/50 font-mono">Loading...</p>
            ) : (
              <>
                <h2 className="font-display mt-3 text-4xl uppercase tracking-tighter">
                  {profile?.display_name || session?.user?.email || "Member"}
                </h2>

                <p className="mt-3 text-white/60">
                  @{profile?.username || "unknown"}
                </p>

                <div className="gold-rule my-6" />

                <p className="text-sm text-white/60">
                  Discord: {profile?.discord || "Not set"}
                </p>

                <p className="text-sm text-white/60 mt-2">
                  Twitch: {profile?.twitch_login || "Not set"}
                </p>
              </>
            )}
          </div>

          <div className="tsc-card p-8">
            <div className="w-12 h-12 border border-mist flex items-center justify-center text-mist">
              <Shield className="w-6 h-6" />
            </div>

            <p className="overline text-mist mt-6">Access</p>

            <h2 className="font-display mt-3 text-4xl uppercase tracking-tighter">
              {status}
            </h2>

            <div className="gold-rule my-6" />

            <p className="text-sm text-white/60">
              Role: <span className="text-white">{role}</span>
            </p>

            {status === "pending" && (
              <p className="mt-4 text-sm text-white/50">
                Your account is awaiting staff approval. You can still access
                the basic portal while TSC reviews your profile.
              </p>
            )}
          </div>

          <div className="tsc-card p-8 flex flex-col justify-between">
            <div>
              <p className="overline text-gold">System</p>

              <h2 className="font-display mt-3 text-4xl uppercase tracking-tighter">
                Session Active
              </h2>

              <p className="mt-4 text-white/60 text-sm">
                Logged in as {session?.user?.email}
              </p>
            </div>

            <button onClick={logout} className="btn-tsc-outline mt-8 self-start">
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}