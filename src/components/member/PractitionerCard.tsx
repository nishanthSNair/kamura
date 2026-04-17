import Link from "next/link";

interface Provider {
  id: string;
  business_name: string;
  slug: string;
  category: string;
  phone: string;
  city: string;
  verified: boolean;
}

interface Props {
  provider: Provider | null;
  nextSession?: {
    booking_date: string;
    start_time: string;
    service_name: string;
  } | null;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function PractitionerCard({ provider, nextSession }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/70 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="font-serif text-base text-gray-900">Your practitioner</h3>
        {provider && (
          <p className="text-[11px] text-gray-500 font-sans mt-0.5">
            Approved your protocol
          </p>
        )}
      </div>

      {!provider ? (
        <div className="p-6 text-center">
          <p className="text-sm text-gray-500 font-sans mb-4">
            Connect with a Kamura-verified practitioner to get your stack
            clinically reviewed.
          </p>
          <Link
            href="/explore"
            className="inline-block px-4 py-2 rounded-full bg-[#2a1612] text-white text-[10px] tracking-[0.15em] uppercase font-semibold font-sans hover:bg-[#1a0f0c]"
          >
            Find a Practitioner
          </Link>
        </div>
      ) : (
        <div className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-terracotta to-terracotta-dark text-white flex items-center justify-center font-serif text-sm font-semibold shrink-0">
              {initials(provider.business_name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-serif text-base text-gray-900 flex items-center gap-1.5">
                {provider.business_name}
                {provider.verified && (
                  <span className="text-emerald-700 text-xs" title="Verified">✓</span>
                )}
              </p>
              <p className="text-[11px] text-gray-500 font-sans">
                {provider.category} · {provider.city}
              </p>
            </div>
          </div>

          {nextSession && (
            <div className="p-3 rounded-xl bg-[#EDE7DB]/60 mb-4">
              <p className="text-[10px] tracking-[0.15em] uppercase text-terracotta font-sans font-semibold mb-1">
                Next session
              </p>
              <p className="text-sm text-gray-900 font-sans font-semibold">
                {new Date(nextSession.booking_date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
                <span className="text-gray-400"> · </span>
                {nextSession.start_time.slice(0, 5)}
              </p>
              <p className="text-xs text-gray-500 font-sans">{nextSession.service_name}</p>
            </div>
          )}

          <div className="flex gap-2">
            <Link
              href={`/provider/${provider.slug}`}
              className="flex-1 px-3 py-2 rounded-full border border-gray-300 text-[10px] tracking-[0.15em] uppercase text-gray-700 font-sans font-semibold hover:border-terracotta hover:text-terracotta text-center"
            >
              Profile
            </Link>
            {provider.phone && (
              <a
                href={`https://wa.me/${provider.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-3 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] tracking-[0.15em] uppercase text-emerald-700 font-sans font-semibold hover:bg-emerald-100 text-center"
              >
                Message
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
