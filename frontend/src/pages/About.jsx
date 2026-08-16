import React from "react";
import { ArrowUpRight, Check, Globe2, Megaphone, Newspaper, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const team = [
  {
    name: "Majang Mejeng",
    role: "Editorial Team",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Creative Team",
    role: "Creative & Content",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Digital Team",
    role: "Digital & Media",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80",
  },
];

const services = [
  {
    number: "01",
    title: "Digital Media",
    description:
      "Menghadirkan informasi dan cerita lokal yang relevan, ringan, dan mudah diakses melalui platform digital.",
    icon: Newspaper,
  },
  {
    number: "02",
    title: "Creative Content",
    description:
      "Mengemas cerita melalui konten kreatif yang dekat dengan kebiasaan dan karakter masyarakat hari ini.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Digital Agency",
    description:
      "Membantu brand dan bisnis membangun komunikasi, marketing, serta public relation melalui platform digital.",
    icon: Megaphone,
  },
];

const About = () => {
  return (
    <main className="w-full overflow-hidden">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-orange-500/10 blur-[120px]" />

        <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-20 md:pb-28 md:pt-28">

          {/* Label */}
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-10 bg-orange-500" />

            <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
              About Majang Mejeng
            </span>
          </div>

          {/* Heading */}
          <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_0.8fr]">

            <div>
              <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                Stories from
                <br />
                <span className="text-orange-500">
                  where we live.
                </span>
              </h1>
            </div>

            <div className="max-w-xl lg:pb-2">
              <p className="text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
                Majang Mejeng adalah media kreatif lokal yang hadir untuk
                merekam, mengabarkan, dan mengangkat pelbagai cerita yang
                tumbuh dan berkembang di Lumajang.
              </p>

              <Link
                to="/contact"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-orange-500"
              >
                Work with us
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Hero image */}
          <div className="mt-14 overflow-hidden rounded-[2rem] border bg-muted shadow-2xl md:mt-20">
            <img
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1800&q=85"
              alt="Majang Mejeng"
              className="h-[360px] w-full object-cover md:h-[500px] lg:h-[600px]"
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO / STORY
      ========================================================= */}
      <section className="border-y">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">

          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">

            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
                Our Story
              </span>

              <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
                Setiap daerah
                <br />
                punya cerita.
              </h2>
            </div>

            <div className="max-w-3xl space-y-6 text-base leading-8 text-muted-foreground md:text-lg">

              <p>
                Kami percaya, setiap daerah memiliki cerita yang layak untuk
                didengar. Bukan hanya tentang peristiwa besar, tetapi juga
                tentang kehidupan warga, komunitas, UMKM, hingga berbagai
                fenomena yang hangat diperbincangkan di tengah masyarakat.
              </p>

              <p>
                Melalui platform digital, Majang Mejeng mengemas informasi
                lewat konten kreatif, ringan, dan relevan dengan kebiasaan
                masyarakat hari ini.
              </p>

              <p>
                Lebih dari sekadar media lokal, Majang Mejeng juga hadir
                sebagai bagian dari ekosistem kreatif digital yang dapat
                membantu brand dan bisnis dalam membangun komunikasi,
                marketing, dan public relation.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STATS
      ========================================================= */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">

          <div className="grid grid-cols-2 border-y md:grid-cols-4">

            <div className="border-b p-6 md:border-b-0 md:border-r md:p-8">
              <p className="text-4xl font-black tracking-tight md:text-5xl">
                2026
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Founded
              </p>
            </div>

            <div className="border-b p-6 md:border-b-0 md:border-r md:p-8">
              <p className="text-4xl font-black tracking-tight md:text-5xl">
                01
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Local Media
              </p>
            </div>

            <div className="border-r p-6 md:p-8">
              <p className="text-4xl font-black tracking-tight md:text-5xl">
                24/7
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Digital Publishing
              </p>
            </div>

            <div className="p-6 md:p-8">
              <p className="text-4xl font-black tracking-tight md:text-5xl">
                ∞
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Stories to Tell
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          WHAT WE DO
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">

        <div className="mb-14 grid gap-8 lg:grid-cols-2">

          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
              What We Do
            </span>

            <h2 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
              More than
              <br />
              <span className="text-muted-foreground">
                local media.
              </span>
            </h2>
          </div>

          <div className="flex items-end">
            <p className="max-w-lg text-base leading-7 text-muted-foreground md:text-lg">
              Kami menggabungkan media, kreativitas, dan teknologi untuk
              menciptakan konten yang memiliki relevansi dengan audiens
              lokal maupun digital.
            </p>
          </div>

        </div>

        {/* Services */}
        <div className="divide-y border-y">

          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.number}
                className="group grid gap-6 py-10 transition-colors md:grid-cols-[80px_80px_1fr_1fr] md:items-center"
              >

                <span className="text-sm font-bold text-orange-500">
                  {service.number}
                </span>

                <div className="hidden md:block">
                  <Icon className="h-7 w-7 text-muted-foreground transition-colors group-hover:text-orange-500" />
                </div>

                <h3 className="text-2xl font-bold md:text-3xl">
                  {service.title}
                </h3>

                <p className="max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                  {service.description}
                </p>

              </div>
            );
          })}

        </div>
      </section>

      {/* =========================================================
          VALUES
      ========================================================= */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">

          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">

            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
                Our Values
              </span>

              <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
                What we
                <br />
                believe in.
              </h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">

              <div className="rounded-3xl border bg-background p-7">
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/10">
                  <Check className="h-5 w-5 text-orange-500" />
                </div>

                <h3 className="text-xl font-bold">
                  Trusted
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Mengutamakan informasi yang relevan, bertanggung jawab,
                  dan dapat dipercaya.
                </p>
              </div>

              <div className="rounded-3xl border bg-background p-7">
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/10">
                  <Globe2 className="h-5 w-5 text-orange-500" />
                </div>

                <h3 className="text-xl font-bold">
                  Local
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Berangkat dari cerita lokal dan menghadirkannya kepada
                  audiens yang lebih luas.
                </p>
              </div>

              <div className="rounded-3xl border bg-background p-7">
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/10">
                  <Sparkles className="h-5 w-5 text-orange-500" />
                </div>

                <h3 className="text-xl font-bold">
                  Creative
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Menggunakan pendekatan kreatif agar informasi terasa
                  lebih dekat dan menarik.
                </p>
              </div>

              <div className="rounded-3xl border bg-background p-7">
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/10">
                  <Newspaper className="h-5 w-5 text-orange-500" />
                </div>

                <h3 className="text-xl font-bold">
                  Independent
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Membangun media yang independen dengan fokus pada
                  cerita dan kebutuhan audiens.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TEAM
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">

        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
              The People
            </span>

            <h2 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
              Meet our team.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-muted-foreground md:text-base">
            Orang-orang di balik cerita, kreativitas, dan berbagai
            aktivitas digital Majang Mejeng.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-3">

          {team.map((member) => (
            <div
              key={member.name}
              className="group overflow-hidden rounded-3xl border bg-card"
            >

              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="flex items-center justify-between p-6">

                <div>
                  <h3 className="text-lg font-bold">
                    {member.name}
                  </h3>

                  <p className="mt-1 text-sm text-orange-500">
                    {member.role}
                  </p>
                </div>

                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-orange-500" />

              </div>
            </div>
          ))}

        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:pb-32">

        <div className="relative overflow-hidden rounded-[2rem] bg-orange-500 px-8 py-16 text-white md:px-16 md:py-20">

          {/* Decorative */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border-[40px] border-white/10" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">

            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">
                Let's Work Together
              </span>

              <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
                Have a story
                <br />
                worth telling?
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-white/80">
                Mari berkolaborasi dan buat sesuatu yang berarti
                bersama Majang Mejeng.
              </p>
            </div>

            <Link
              to="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-bold text-black transition-transform hover:-translate-y-1"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4" />
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
};

export default About;