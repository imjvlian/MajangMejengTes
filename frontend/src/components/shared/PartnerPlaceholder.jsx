const partners = [
  {
    name: "Partner 1",
    image: "https://picsum.photos/seed/partner1/300/200",
    url: "#",
  },
  {
    name: "Partner 2",
    image: "https://picsum.photos/seed/partner2/300/200",
    url: "#",
  },
  {
    name: "Partner 3",
    image: "https://picsum.photos/seed/partner3/300/200",
    url: "#",
  },
  {
    name: "Partner 4",
    image: "https://picsum.photos/seed/partner4/300/200",
    url: "#",
  },
];

const PartnerPlaceholder = () => {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold border-b pb-3 mb-5">
        Our Partners
      </h2>

      <div className="rounded-xl border border-slate-700 p-6">
        <div className="grid grid-cols-2 gap-4">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-lg border border-slate-700 hover:border-blue-500 transition"
            >
              <img
                src={partner.image}
                alt={partner.name}
                className="w-full aspect-[3/2] object-cover group-hover:scale-105 transition-transform duration-300"
              />

              <div className="p-3">
                <p className="text-sm font-medium text-center">
                  {partner.name}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerPlaceholder;