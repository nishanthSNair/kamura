import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for kamuralife.com.",
  alternates: { canonical: "https://kamuralife.com/terms" },
};

export default function TermsPage() {
  return (
    <article className="bg-[#FAFCF7] pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-2xl mx-auto px-6 md:px-8">
        <p className="text-[10.5px] tracking-[0.32em] uppercase text-terracotta font-semibold font-sans mb-5">
          Legal
        </p>
        <h1 className="font-serif text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.012em] text-[#173C3B] mb-3">
          Terms of Use
        </h1>
        <p className="text-[13px] text-[#173C3B]/55 font-sans mb-12">
          Last updated: 2026-05-10
        </p>

        <div className="prose prose-stone max-w-none">
          <p>
            These Terms govern your use of{" "}
            <a href="https://kamuralife.com">kamuralife.com</a> (the
            &ldquo;Site&rdquo;), operated by Kamura.
          </p>

          <h2>Not medical advice</h2>
          <p>
            Content on the Site — including treatment summaries, peptide
            information, and the Kamura Score — is for general educational
            purposes only. It is not a substitute for professional medical
            advice, diagnosis, or treatment. Always seek the advice of a
            qualified physician with any questions you may have regarding a
            medical condition.
          </p>

          <h2>No commerce yet</h2>
          <p>
            At the time of this writing, no products or bookings are available
            for sale through the Site. Waitlist sign-ups are intent
            indications, not transactions, and create no obligation on either
            party.
          </p>

          <h2>Accounts</h2>
          <p>
            If you create an account, you are responsible for keeping your
            credentials safe and for activity under your account.
          </p>

          <h2>Acceptable use</h2>
          <ul>
            <li>Don&rsquo;t scrape the Site at scale or attempt to disrupt it.</li>
            <li>Don&rsquo;t use the Site to spam, harass, or impersonate others.</li>
            <li>Don&rsquo;t reverse-engineer features or circumvent security controls.</li>
          </ul>

          <h2>Third-party content and links</h2>
          <p>
            The Site may reference research papers, third-party clinics,
            products, and services. Inclusion is not endorsement, and we are
            not responsible for the content, availability, or accuracy of
            third-party sites.
          </p>

          <h2>Liability</h2>
          <p>
            To the maximum extent permitted by law, Kamura is not liable for
            any indirect, incidental, or consequential damages arising from
            your use of the Site. Your sole remedy if you are dissatisfied is
            to stop using the Site.
          </p>

          <h2>Governing law</h2>
          <p>
            These Terms are governed by the laws of the United Arab Emirates.
            Disputes will be resolved in the courts of Dubai.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these Terms occasionally. Continued use of the Site
            after a change means you accept the updated Terms.
          </p>

          <h2>Contact</h2>
          <p>
            <a href="mailto:hello@kamuralife.com">hello@kamuralife.com</a>
          </p>

          <p className="text-[12px] text-[#173C3B]/55 mt-12">
            <em>
              This is a working draft pending legal review. It does not
              constitute legal advice.
            </em>
          </p>
        </div>
      </div>
    </article>
  );
}
