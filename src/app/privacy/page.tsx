import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Kamura collects, uses, and protects your personal information. UAE PDPL-aligned.",
  alternates: { canonical: "https://kamuralife.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="bg-[#FAFCF7] pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-2xl mx-auto px-6 md:px-8">
        <p className="text-[10.5px] tracking-[0.32em] uppercase text-terracotta font-semibold font-sans mb-5">
          Legal
        </p>
        <h1 className="font-serif text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.012em] text-[#173C3B] mb-3">
          Privacy Policy
        </h1>
        <p className="text-[13px] text-[#173C3B]/55 font-sans mb-12">
          Last updated: 2026-05-10
        </p>

        <div className="prose prose-stone max-w-none">
          <p>
            This Privacy Policy describes how Kamura (&ldquo;Kamura&rdquo;,
            &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses, and protects
            your personal information when you use{" "}
            <a href="https://kamuralife.com">kamuralife.com</a> (the
            &ldquo;Site&rdquo;). By using the Site, you agree to this policy.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>Email address</strong>, when you join one of our
              waitlists or subscribe to updates.
            </li>
            <li>
              <strong>Account information</strong> (full name, profile
              preferences, wellness goals), if you create an account.
            </li>
            <li>
              <strong>Usage data</strong> (pages visited, device type,
              approximate location, referrer) collected via Google Analytics
              and Vercel Analytics.
            </li>
            <li>
              <strong>IP address and user agent</strong> at the moment you
              submit a form, retained for abuse prevention.
            </li>
          </ul>

          <h2>How we use it</h2>
          <ul>
            <li>To notify you when products and services launch.</li>
            <li>
              To personalise the content and recommendations you see when
              signed in.
            </li>
            <li>To improve the Site, fix bugs, and prevent abuse.</li>
            <li>To comply with applicable law.</li>
          </ul>
          <p>
            We do <strong>not</strong> sell your personal information. We do
            not run third-party advertising on the Site.
          </p>

          <h2>Where it&rsquo;s stored</h2>
          <p>
            Account and email-list data is stored in Supabase, hosted in the
            EU (Frankfurt). Analytics data is processed by Google (Google
            Analytics) and Vercel (Web Analytics &amp; Speed Insights).
          </p>

          <h2>Your rights</h2>
          <p>
            You have the right to access, correct, or delete your personal
            information. Email{" "}
            <a href="mailto:hello@kamuralife.com">hello@kamuralife.com</a> and
            we will respond within 30 days. You may unsubscribe from any
            waitlist at any time using the link in our emails.
          </p>

          <h2>Children</h2>
          <p>
            The Site is not directed at children under 16. We do not knowingly
            collect data from children.
          </p>

          <h2>Changes</h2>
          <p>
            We may update this policy from time to time. Material changes will
            be communicated via email if you have an account.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy? Email{" "}
            <a href="mailto:hello@kamuralife.com">hello@kamuralife.com</a>.
          </p>

          <p className="text-[12px] text-[#173C3B]/55 mt-12">
            <em>
              This is a working draft pending legal review. It is intended to
              comply with the UAE Personal Data Protection Law (Federal
              Decree-Law No. 45 of 2021) but does not constitute legal advice.
            </em>
          </p>
        </div>
      </div>
    </article>
  );
}
