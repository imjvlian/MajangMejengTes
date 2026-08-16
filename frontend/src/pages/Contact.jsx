import React from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Handshake,
  Mail,
  MessageCircle,
  Megaphone,
  Newspaper,
  Users,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Contact = () => {
  const whatsappNumber = "6282139401193";

  const whatsappMessage = encodeURIComponent(
    "Halo Majang Mejeng, saya tertarik untuk bekerja sama. Saya ingin mendapatkan informasi lebih lanjut mengenai kerja sama yang tersedia."
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const collaborationTypes = [
    {
      icon: Newspaper,
      title: "Media Partnership",
      description:
        "Kerja sama publikasi, media partner, dan distribusi informasi.",
    },
    {
      icon: BriefcaseBusiness,
      title: "Brand Collaboration",
      description:
        "Kolaborasi kreatif dengan brand dan perusahaan untuk berbagai kebutuhan.",
    },
    {
      icon: Megaphone,
      title: "Sponsorship",
      description:
        "Dukungan sponsorship untuk program, kegiatan, maupun campaign.",
    },
    {
      icon: MessageCircle,
      title: "Content Collaboration",
      description:
        "Pembuatan dan pengembangan konten bersama kreator maupun organisasi.",
    },
    {
      icon: Users,
      title: "Event Partnership",
      description:
        "Kolaborasi untuk event, komunitas, kegiatan lokal, dan berbagai acara.",
    },
    {
      icon: ArrowUpRight,
      title: "Advertising",
      description:
        "Promosi dan advertising melalui platform digital Majang Mejeng.",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden border-b">
        {/* Background Decoration */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[120px]" />

          <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />

          <div className="absolute bottom-[-200px] left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-orange-500/5 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-500">
              <Handshake className="h-4 w-4" />
              Let's Work Together
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Let's build
              <br />
              <span className="text-orange-500">something together.</span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
              Majang Mejeng terbuka untuk berbagai peluang kerja sama,
              kolaborasi, partnership, media partnership, sponsorship, dan
              kebutuhan lainnya.
            </p>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Punya ide atau ingin berdiskusi mengenai kerja sama? Jangan ragu
              untuk menghubungi kami.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-green-600 px-7 font-bold text-white shadow-lg shadow-green-600/20 transition hover:-translate-y-1 hover:bg-green-700 hover:shadow-xl"
              >
                <FaWhatsapp className="h-5 w-5" />

                Contact Us on WhatsApp

                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <Link
                to="/news"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border px-7 font-semibold transition hover:bg-muted"
              >
                Explore Our Stories

                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK CONTACT
      ====================================================== */}
      <section className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-5 md:grid-cols-3">
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-3xl border bg-background p-6 transition duration-300 hover:-translate-y-1 hover:border-green-500/40 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10 text-green-600">
                <FaWhatsapp className="h-6 w-6" />
              </div>

              <p className="mt-5 text-sm font-semibold text-muted-foreground">
                WhatsApp
              </p>

              <h3 className="mt-1 text-lg font-bold">
                Start a conversation
              </h3>

              <div className="mt-4 flex items-center text-sm font-semibold text-green-600">
                Contact us

                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </a>

            {/* Email */}
            <div className="group rounded-3xl border bg-background p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
                <Mail className="h-6 w-6" />
              </div>

              <p className="mt-5 text-sm font-semibold text-muted-foreground">
                Email
              </p>

              <h3 className="mt-1 text-lg font-bold">
                Business inquiries
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Hubungi kami melalui WhatsApp untuk mendapatkan kontak bisnis
                yang sesuai.
              </p>
            </div>

            {/* Collaboration */}
            <div className="group rounded-3xl border bg-background p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
                <Handshake className="h-6 w-6" />
              </div>

              <p className="mt-5 text-sm font-semibold text-muted-foreground">
                Collaboration
              </p>

              <h3 className="mt-1 text-lg font-bold">
                Let's create together
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Brand, komunitas, media, kreator, maupun organisasi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PARTNERSHIP
      ====================================================== */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            {/* Left */}
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
                What We Offer
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
                Partnership
                <br />
                opportunities.
              </h2>

              <p className="mt-6 max-w-md text-lg leading-8 text-muted-foreground">
                Kami terbuka untuk bekerja sama dengan brand, perusahaan,
                komunitas, kreator, media, maupun pihak lainnya yang memiliki
                visi dan tujuan yang sejalan.
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-2 font-bold text-orange-500"
              >
                Discuss a collaboration

                <ArrowRightIcon />

                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>

            {/* Right */}
            <div className="grid gap-4 sm:grid-cols-2">
              {collaborationTypes.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group rounded-3xl border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-xl"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>

                      <span className="text-xs font-bold text-muted-foreground">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-6 text-lg font-bold">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY WORK WITH US
      ====================================================== */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left */}
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
                Why Majang Mejeng
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
                More than
                <br />
                just media.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                Kami ingin menjadi bagian dari cerita yang sedang Anda bangun.
                Dari sebuah ide kecil hingga campaign yang lebih besar, kami
                terbuka untuk menciptakan sesuatu yang relevan dan berdampak.
              </p>
            </div>

            {/* Right */}
            <div className="space-y-4">
              <div className="rounded-3xl border bg-background p-6">
                <div className="flex gap-4">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-bold">Local audience</h3>

                    <p className="mt-1 leading-7 text-muted-foreground">
                      Terhubung dengan audiens dan komunitas lokal melalui
                      pendekatan yang relevan.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border bg-background p-6">
                <div className="flex gap-4">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-bold">Creative approach</h3>

                    <p className="mt-1 leading-7 text-muted-foreground">
                      Menggabungkan storytelling, visual, dan platform digital
                      untuk menyampaikan pesan.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border bg-background p-6">
                <div className="flex gap-4">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-bold">Flexible collaboration</h3>

                    <p className="mt-1 leading-7 text-muted-foreground">
                      Bentuk kerja sama dapat disesuaikan dengan kebutuhan,
                      campaign, maupun tujuan Anda.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="relative overflow-hidden rounded-[2rem] bg-orange-500 px-8 py-16 text-center text-white md:px-16 md:py-20">
            {/* Decoration */}
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-black/10 blur-3xl" />

            <div className="relative mx-auto max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-100">
                Start a Conversation
              </p>

              <h2 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
                Have an idea?
                <br />
                Let's make it happen.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-orange-50">
                Ceritakan ide, kebutuhan, atau konsep kerja sama Anda kepada
                kami. Mari kita diskusikan kemungkinan kolaborasinya.
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-white px-8 font-bold text-orange-500 transition hover:bg-orange-50"
                >
                  <FaWhatsapp className="h-5 w-5" />

                  Contact Us on WhatsApp

                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <Link
                  to="/about"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/40 px-8 font-bold text-white transition hover:bg-white/10"
                >
                  About Majang Mejeng

                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

/*
 * Small reusable arrow component
 */

const ArrowRightIcon = () => {
  return (
    <span className="transition-transform group-hover:translate-x-1">
      →
    </span>
  );
};

export default Contact;