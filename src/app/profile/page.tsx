import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signOut } from "../login/actions";
import { Button } from "@/components/ui/button";
import GlassmorphismCard from "@/components/glassmorphism-card";
import { User, Mail, Calendar, LogOut, ArrowLeft, Inbox, Terminal, Clock, Briefcase } from "lucide-react";
import Link from "next/link";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If no user is authenticated, redirect to login
  if (!user) {
    redirect("/login");
  }

  const creationDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  // Fetch messages from Supabase Database
  let messages: any[] = [];
  let dbError: string | null = null;

  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      dbError = error.message;
    } else if (data) {
      messages = data;
    }
  } catch (err) {
    dbError = err instanceof Error ? err.message : "Database connection failed";
  }

  const sqlSetupCode = `create table contact_messages (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  message text not null,
  project_type text,
  timeline text
);

-- Enable Row Level Security (RLS)
alter table contact_messages enable row level security;

-- Policy to allow anonymous submissions
create policy "Allow anonymous inserts" on contact_messages
  for insert with check (true);

-- Policy to allow authenticated reads (only logged-in users like you can see)
create policy "Allow authenticated reads" on contact_messages
  for select to authenticated using (true);`;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 relative z-10">
      {/* Background Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Profile Details */}
          <div className="lg:col-span-1">
            <GlassmorphismCard className="p-6 md:p-8 border border-black/5 dark:border-white/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-3 border border-blue-500/20">
                  <User className="text-blue-500" size={28} />
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                  My Profile
                </h1>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Video Editor Workspace
                </p>
              </div>

              <div className="space-y-4 mb-6 bg-black/[0.02] dark:bg-white/[0.01] p-5 rounded-xl border border-black/5 dark:border-white/5">
                <div>
                  <p className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Email</p>
                  <p className="text-sm text-neutral-900 dark:text-white font-medium break-all">{user.email}</p>
                </div>

                <div>
                  <p className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">Joined</p>
                  <p className="text-sm text-neutral-900 dark:text-white font-medium">{creationDate}</p>
                </div>

                <div>
                  <p className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-1">User ID</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono select-all break-all">{user.id}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Link href="/" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 h-11 rounded-xl text-neutral-700 dark:text-white text-sm font-medium cursor-pointer"
                  >
                    <ArrowLeft className="mr-2" size={14} />
                    Back to Portfolio
                  </Button>
                </Link>
                
                <form action={signOut} className="w-full">
                  <Button
                    type="submit"
                    variant="destructive"
                    className="w-full bg-red-600 hover:bg-red-700 h-11 rounded-xl text-white text-sm font-medium cursor-pointer"
                  >
                    <LogOut className="mr-2" size={14} />
                    Sign Out
                  </Button>
                </form>
              </div>
            </GlassmorphismCard>
          </div>

          {/* RIGHT COLUMN: Database Queries & Leads */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Database Setup Required (Show if 'contact_messages' table relation does not exist) */}
            {dbError && (dbError.includes("relation") || dbError.includes("does not exist")) && (
              <GlassmorphismCard className="p-6 border border-yellow-500/20 bg-yellow-500/[0.02]">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500">
                    <Terminal size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-neutral-950 dark:text-white">Database Table Setup Needed</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      The table <code className="px-1 py-0.5 bg-black/5 dark:bg-white/10 rounded font-mono text-[11px] text-yellow-600 dark:text-yellow-400">contact_messages</code> is not initialized in your Supabase database yet.
                    </p>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-xs font-semibold text-neutral-600 dark:text-gray-300 mb-2">
                    Copy and run this SQL in your Supabase SQL Editor:
                  </p>
                  <pre className="p-4 bg-black/80 dark:bg-black/90 text-green-400 rounded-xl font-mono text-[10px] overflow-x-auto border border-white/5 select-all leading-relaxed max-h-48 overflow-y-auto">
                    {sqlSetupCode}
                  </pre>
                </div>
              </GlassmorphismCard>
            )}

            <GlassmorphismCard className="p-6 md:p-8 border border-black/5 dark:border-white/5">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/5 dark:border-white/5">
                <div className="flex items-center space-x-3">
                  <Inbox className="text-blue-500" size={22} />
                  <h2 className="text-xl font-bold text-neutral-950 dark:text-white">
                    Client Inquiries & Leads
                  </h2>
                </div>
                <span className="px-2.5 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-xs font-semibold">
                  {messages.length} Total
                </span>
              </div>

              {dbError && !dbError.includes("relation") ? (
                <div className="text-center py-12 border border-red-500/10 rounded-2xl bg-red-500/[0.01]">
                  <p className="text-red-500 text-sm font-medium">Database Error</p>
                  <p className="text-xs text-neutral-400 mt-1">{dbError}</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-16 text-neutral-500 dark:text-neutral-400">
                  <Inbox className="mx-auto mb-4 text-neutral-400 opacity-60" size={40} />
                  <p className="text-sm font-medium text-neutral-800 dark:text-gray-300">No message submissions yet</p>
                  <p className="text-xs text-neutral-400 mt-1">Submit a test message via your portfolio Contact page!</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {messages.map((msg) => {
                    const submissionTime = new Date(msg.created_at).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    return (
                      <div
                        key={msg.id}
                        className="p-5 bg-black/[0.01] dark:bg-white/[0.01] border border-black/5 dark:border-white/5 rounded-2xl hover:border-blue-500/20 transition-all group"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                          <div>
                            <h4 className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                              {msg.name}
                            </h4>
                            <a
                              href={`mailto:${msg.email}`}
                              className="text-xs text-neutral-500 dark:text-gray-400 hover:underline inline-flex items-center mt-0.5"
                            >
                              {msg.email}
                            </a>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-neutral-400 font-mono flex items-center bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-full">
                              <Clock size={10} className="mr-1" />
                              {submissionTime}
                            </span>
                          </div>
                        </div>

                        {/* Project Details Badges */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {msg.project_type && (
                            <span className="text-[10px] bg-blue-500/5 text-blue-600 dark:text-blue-400 px-2.5 py-0.5 rounded-full font-medium inline-flex items-center">
                              <Briefcase size={10} className="mr-1" />
                              {msg.project_type}
                            </span>
                          )}
                          {msg.timeline && (
                            <span className="text-[10px] bg-purple-500/5 text-purple-600 dark:text-purple-400 px-2.5 py-0.5 rounded-full font-medium">
                              Timeline: {msg.timeline}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-neutral-700 dark:text-gray-300 leading-relaxed bg-black/[0.02] dark:bg-white/[0.01] p-3 rounded-xl border border-black/5 dark:border-white/5 font-light whitespace-pre-wrap">
                          {msg.message}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </GlassmorphismCard>
          </div>

        </div>
      </div>
    </div>
  );
}
