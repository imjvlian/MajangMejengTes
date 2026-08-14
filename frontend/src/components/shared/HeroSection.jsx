import {
  ArrowRight,
  Building2,
  Newspaper,
  ShieldCheck,
  Globe2,
  BadgeCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = ({ latestPost }) => {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-blue-500/10" />

      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-orange-500/20 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* LEFT */}

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-500">
              <Building2 size={16} />
              Independent Digital Media
            </div>

            <h1 className="mt-8 text-5xl lg:text-7xl font-black leading-tight tracking-tight">
              Stories That
              <br />
              <span className="text-orange-500">Inform & Inspire</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
              Majang Mejeng adalah media kreatif lokal yang hadir untuk merekam,
              mengabarkan, dan mengangkat pelbagai cerita yang tumbuh dan
              berkembang di Lumajang.
            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/about">
                <Button className="rounded-full bg-orange-500 hover:bg-orange-600 h-12 px-8">
                  About Us
                </Button>
              </Link>

              <Link to="/news">
                <Button variant="ghost" className="rounded-full h-12 px-8">
                  Explore Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Values */}

            <div className="mt-14 grid grid-cols-2 gap-5">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-orange-500" />

                <span>Trusted Journalism</span>
              </div>

              <div className="flex items-center gap-3">
                <Globe2 className="text-orange-500" />

                <span>Independent Media</span>
              </div>

              <div className="flex items-center gap-3">
                <BadgeCheck className="text-orange-500" />

                <span>Modern Publishing</span>
              </div>

              <div className="flex items-center gap-3">
                <Newspaper className="text-orange-500" />

                <span>Daily Updates</span>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="relative">
            {/* Browser */}

            <div className="overflow-hidden rounded-3xl border bg-card shadow-2xl">
              <div className="flex items-center gap-2 border-b px-5 py-4">
                <div className="h-3 w-3 rounded-full bg-red-500" />

                <div className="h-3 w-3 rounded-full bg-yellow-500" />

                <div className="h-3 w-3 rounded-full bg-green-500" />

                <div className="ml-4 rounded-full bg-muted px-4 py-1 text-sm text-muted-foreground">
                  https://majangmejeng.com
                </div>
              </div>

              <iframe
                src="https://www.instagram.com/majangmejeng_"
                className="w-full h-[500px]"
              />
            </div>

            {/* Floating Latest Article */}

            {latestPost && (
              <Link
                to={`/post/${latestPost.slug}`}
                className="absolute -bottom-10 -left-10 hidden w-80 rounded-2xl border bg-background p-5 shadow-2xl transition hover:-translate-y-1 lg:block"
              >
                <p className="text-xs uppercase tracking-widest text-orange-500 font-semibold">
                  Latest Article
                </p>

                <h3 className="mt-3 line-clamp-2 text-lg font-bold">
                  {latestPost.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Click to read the newest article published on Majang Mejeng.
                </p>
              </Link>
            )}

            {/* Floating Company */}

            <div className="absolute -top-8 -right-8 hidden rounded-2xl border bg-background p-5 shadow-xl lg:block">
              <p className="text-3xl font-black text-orange-500">2026</p>

              <p className="text-sm text-muted-foreground">
                Founded with a mission to deliver reliable digital journalism.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
