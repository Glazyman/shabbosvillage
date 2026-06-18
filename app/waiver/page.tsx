import Link from "next/link";
import Image from "next/image";

const waiverSections = [
  {
    title: "Definitions",
    body: "In this Agreement, the term \"Released Parties\" means Joseph Farkas, individually and doing business as Shabbos Village, together with the owner(s) of the real property on which the campground operates, and each of their respective heirs, successors, assigns, family members, employees, agents, volunteers, contractors, representatives, and insurers. The terms \"I,\" \"me,\" and \"my\" refer to the undersigned guest, signing individually and on behalf of every member of my party, including any minors. \"Activities\" means camping, lodging, and any and all recreational, social, religious, or other activities occurring on or related to the property.",
  },
  {
    title: "Assumption of Risk",
    body: "I understand and acknowledge that camping and outdoor activities are inherently dangerous and involve known and unknown risks that cannot be eliminated regardless of the care taken. These risks include, without limitation: uneven, rocky, or slippery terrain; trees, branches, and falling objects; insects, wildlife, and animals; allergens and plants; weather and environmental conditions; the creek, water, and drowning hazards; fire, smoke, cooking, and burns; vehicles and the access road; the conduct of other guests; and the potential for serious personal injury, illness, disability, permanent paralysis, or death, and for property damage or loss. KNOWING THESE RISKS, I VOLUNTARILY AND EXPRESSLY ASSUME ANY AND ALL SUCH RISKS, both known and unknown, whether or not described above, and accept full responsibility for any resulting injury, loss, or damage to me, my party, or my property.",
  },
  {
    title: "Release and Waiver of Liability",
    body: "In consideration of being permitted to enter and use the Shabbos Village property and to participate in the Activities, I, for myself and on behalf of my party and our respective heirs, executors, administrators, successors, and assigns, hereby FOREVER RELEASE, WAIVE, DISCHARGE, and COVENANT NOT TO SUE the Released Parties from and for any and all claims, demands, actions, causes of action, suits, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) of any kind whatsoever, arising out of or in any way connected with my presence on the property or participation in the Activities, INCLUDING ANY SUCH CLAIM CAUSED IN WHOLE OR IN PART BY THE ORDINARY NEGLIGENCE OF THE RELEASED PARTIES, to the fullest extent permitted by law. I understand that I am giving up substantial legal rights, including the right to sue.",
  },
  {
    title: "Hold Harmless and Indemnification",
    body: "I agree to DEFEND, INDEMNIFY, and HOLD HARMLESS the Released Parties from and against any and all claims, demands, actions, liabilities, damages, losses, judgments, costs, and expenses (including reasonable attorneys' fees and litigation costs) brought by me, by any member of my party, or by any third party, that arise out of, result from, or relate to my or my party's presence on the property, participation in the Activities, use of any facilities or equipment, or violation of this Agreement or of the campground rules, whether or not caused by the negligence of the Released Parties.",
  },
  {
    title: "Medical Treatment and Emergencies",
    body: "I authorize the Released Parties, in the event of an injury or medical emergency, to secure or administer such first aid or emergency medical care as may be deemed reasonably necessary for me or any minor in my party, and I agree to be solely responsible for all costs of such treatment and transport. I represent that I and the members of my party are in good health, are physically capable of safely participating in the Activities, and have no condition that would create an unreasonable risk to ourselves or others.",
  },
  {
    title: "Responsibility for Guests and Minors",
    body: "I accept full and sole responsibility for the safety, supervision, and conduct of every member of my party, including all minors. I represent that I have the legal authority to sign this Agreement on their behalf and that each member of my party has been informed of, understands, and agrees to abide by the campground rules. Children must be supervised by a responsible adult at all times, particularly near the creek, water, fire areas, and roadways.",
  },
  {
    title: "Personal Property",
    body: "I understand that the Released Parties are not responsible for, and assume no liability for, any loss, theft, or damage to personal property belonging to me or my party, whether stored in the shared food storage area, left at a campsite, or located anywhere else on the property. I bring and store all personal property at my own risk.",
  },
  {
    title: "Rules, Conduct, and Right to Remove",
    body: "I agree to comply with all posted and published campground rules, directional instructions, and the lawful directions of management. I will respect the property, the natural environment, and the calm, family-friendly, Shabbos-observant atmosphere of Shabbos Village. I acknowledge that the property has a single access road and that no vehicle may block access. Management reserves the right to remove me or any member of my party, without refund, for conduct that violates the rules or endangers or disturbs others.",
  },
  {
    title: "Insurance",
    body: "I understand and agree that the Released Parties do not carry or provide any medical, health, accident, disability, or personal property insurance for guests, and that I am solely responsible for obtaining and maintaining any insurance coverage I deem necessary for myself and my party.",
  },
  {
    title: "Severability and No Waiver",
    body: "I agree that this Agreement is intended to be as broad and inclusive as is permitted by the laws of the State of New York, and that if any portion is held invalid or unenforceable, the remainder shall continue in full legal force and effect, and the invalid portion shall be modified to the minimum extent necessary to make it enforceable. The failure of the Released Parties to enforce any provision shall not constitute a waiver of that or any other provision.",
  },
  {
    title: "Governing Law and Venue",
    body: "This Agreement shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict-of-law principles. I agree that the exclusive venue and jurisdiction for any dispute arising out of or relating to this Agreement or the Activities shall lie in the state courts located in the county in which the property is situated, and I consent to the personal jurisdiction of those courts.",
  },
  {
    title: "Entire Agreement and Acknowledgment",
    body: "I acknowledge that I have had sufficient opportunity to read this entire Agreement, that I have read and understand it, that it constitutes the entire agreement between me and the Released Parties concerning its subject matter and supersedes any prior representations, and that I am signing it freely, voluntarily, and without any inducement. I intend my signature to be a complete and unconditional release of liability to the greatest extent permitted by law.",
  },
];

export default function WaiverPage() {
  return (
    <div style={{ backgroundColor: "#FDFAF5" }}>

      {/* ── HERO ── */}
      <section style={{ position: "relative", height: "40vh", minHeight: "300px", overflow: "hidden" }}>
        <Image
          src="https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=1920&q=85"
          alt="Forest campground"
          fill
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
          priority
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,20,8,0.65)" }} />
        <div className="hero-text-bottom" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#D4A853", marginBottom: "16px" }}>Legal</p>
          <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 700, color: "#FDFAF5", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Hold Harmless Agreement
          </h1>
        </div>
      </section>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "clamp(40px,6vw,80px) clamp(20px,4vw,40px)" }}>

        {/* Intro */}
        <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "#4a4a3a", borderLeft: "2px solid #D4A853", paddingLeft: "20px", marginBottom: "56px" }}>
          This Release of Liability, Waiver, and Hold Harmless Agreement (&ldquo;Agreement&rdquo;) is entered into between you (the guest) and <strong>Joseph Farkas</strong>, individually and doing business as Shabbos Village. By completing a reservation, you acknowledge that you have carefully read, understand, and agree to be legally bound by the following terms, on behalf of yourself and all members of your party, including any minors.
        </p>

        {/* Waiver sections */}
        <div style={{ marginBottom: "56px" }}>
          {waiverSections.map((s, i) => (
            <div key={s.title} style={{ display: "flex", gap: "28px", alignItems: "flex-start", padding: "28px 0", borderBottom: i < waiverSections.length - 1 ? "1px solid #EDE4D3" : "none" }}>
              <span style={{ fontFamily: "var(--font-playfair)", fontSize: "0.85rem", fontStyle: "italic", color: "#D4A853", minWidth: "24px", paddingTop: "3px", flexShrink: 0 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.05rem", fontWeight: 700, color: "#2D5016", marginBottom: "10px" }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "#4a4a3a", margin: 0 }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Acknowledgement note */}
        <div style={{ borderTop: "2px solid #2D5016", paddingTop: "28px", marginBottom: "48px" }}>
          <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1a1a12", lineHeight: 1.7, margin: 0 }}>
            I HAVE READ THIS AGREEMENT, FULLY UNDERSTAND ITS TERMS, UNDERSTAND THAT I AM GIVING UP SUBSTANTIAL RIGHTS — INCLUDING MY RIGHT TO SUE — AND SIGN IT FREELY AND VOLUNTARILY. This Agreement is acknowledged electronically at the time of booking; your typed name and checkbox confirmation during checkout constitute a legally binding electronic signature under the federal ESIGN Act and applicable state law, and have the same force and effect as a handwritten signature.
          </p>
        </div>

        {/* CTA */}
        <div style={{ backgroundColor: "#F8F3E9", border: "1px solid #EDE4D3", borderRadius: "4px", padding: "clamp(24px,4vw,40px)", textAlign: "center" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8B5E3C", marginBottom: "12px" }}>
            Ready to book?
          </p>
          <p style={{ fontSize: "0.95rem", color: "#4a4a3a", lineHeight: 1.7, marginBottom: "28px" }}>
            You&apos;ll sign this agreement as part of the checkout process — no separate form needed.
          </p>
          <Link
            href="/book"
            style={{ display: "inline-block", backgroundColor: "#2D5016", color: "#FDFAF5", fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.06em", textTransform: "uppercase", padding: "14px 40px", borderRadius: "3px", textDecoration: "none" }}
          >
            Reserve & Sign at Checkout →
          </Link>
        </div>

      </div>
    </div>
  );
}
