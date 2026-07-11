import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signOut } from "../login/actions";
import { Button } from "@/components/ui/button";
import GlassmorphismCard from "@/components/glassmorphism-card";
import { User, Mail, Calendar, LogOut, ArrowLeft } from "lucide-react";
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

  return (
    <div className="min-h-screen flex items-center justify-center pt-32 pb-20 px-4 relative z-10">
      {/* Background Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-lg">
        <GlassmorphismCard className="p-8 md:p-10 border border-black/5 dark:border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
          
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
              <User className="text-blue-500" size={36} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
              User Dashboard
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Manage your authenticated session
            </p>
          </div>

          <div className="space-y-6 mb-8 bg-black/[0.02] dark:bg-white/[0.01] p-6 rounded-2xl border border-black/5 dark:border-white/5">
            <div className="flex items-center space-x-4">
              <div className="p-2.5 bg-neutral-100 dark:bg-neutral-800/50 rounded-xl text-neutral-500 dark:text-gray-400">
                <Mail size={18} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-neutral-400 font-mono uppercase tracking-wider">Email Address</p>
                <p className="text-neutral-900 dark:text-white font-medium break-all">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-2.5 bg-neutral-100 dark:bg-neutral-800/50 rounded-xl text-neutral-500 dark:text-gray-400">
                <Calendar size={18} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-neutral-400 font-mono uppercase tracking-wider">Member Since</p>
                <p className="text-neutral-900 dark:text-white font-medium">{creationDate}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-2.5 bg-neutral-100 dark:bg-neutral-800/50 rounded-xl text-neutral-500 dark:text-gray-400">
                <User size={18} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-neutral-400 font-mono uppercase tracking-wider">User ID</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono select-all break-all">{user.id}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/" className="flex-1">
              <Button
                variant="outline"
                className="w-full border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 h-12 rounded-xl text-neutral-700 dark:text-white font-medium cursor-pointer"
              >
                <ArrowLeft className="mr-2" size={16} />
                Portfolio
              </Button>
            </Link>
            
            <form action={signOut} className="flex-1">
              <Button
                type="submit"
                variant="destructive"
                className="w-full bg-red-600 hover:bg-red-700 h-12 rounded-xl text-white font-medium cursor-pointer"
              >
                <LogOut className="mr-2" size={16} />
                Sign Out
              </Button>
            </form>
          </div>
        </GlassmorphismCard>
      </div>
    </div>
  );
}
