/**
 * Single source of truth for all content on the landing page. All copy is
 * intentionally free of em and en dashes per editorial guideline.
 *
 * Real names, quotes, partner orgs, and AUSCEP participants are taken from
 * asme.org.au and the public AUSCEP startup directory.
 */

export const site = {
  name: "ASME",
  fullName: "Australian Society for Medical Entrepreneurship & Innovation",
  tagline: "A home for clinician entrepreneurs.",
  description:
    "Build, invest, and shape the future of healthcare. Without leaving clinical practice behind.",
  url: "https://asme.org.au",
  email: "info@asme.org.au",
  joinUrl: "/join",
} as const;

export const nav = [
  { label: "What we do", href: "/#what" },
  { label: "Pathways", href: "/#pathways" },
  { label: "AUSCEP", href: "/#auscep" },
  { label: "Community", href: "/#community" },
  { label: "Insights", href: "/blog" },
] as const;

export const hero = {
  eyebrow: "For clinicians who build",
  headline: "A home for clinician entrepreneurs.",
  sub: "Doctors, nurses, allied health, pharmacists, students. Build, invest, and shape the future of healthcare without leaving clinical practice behind.",
  primaryCta: {
    label: "Join the community",
    href: "/join",
  },
  secondaryCta: { label: "Explore AUSCEP", href: "#auscep" },
  metrics: [
    { value: "2,000+", label: "Clinicians" },
    { value: "$100M+", label: "Raised" },
    { value: "100k+", label: "Lives impacted" },
  ],
} as const;

export const manifesto = {
  eyebrow: "The premise",
  lines: [
    "Clinicians are under leveraged.",
    "You've lived the pain.",
    "You can build the solutions.",
  ],
  body: [
    "We are a not-for-profit home for doctors, medical students & other clinicians interested in using their training and experience to make an impact at scale on healthcare through entrepreneurship and innovation.",
    "Whether you are a current or aspiring business founder, intrapreneur, innovative clinician, management consultant, working in private equity & VC, media, politics and more, ASME is the society for you.",
  ],
} as const;

export const whatWeDo = [
  {
    title: "Network",
    blurb:
      "A peer group of clinician founders, operators, investors, and advisors. Warm intros, not cold outreach.",
    glyph: "network",
  },
  {
    title: "Programs",
    blurb:
      "AUSCEP and structured tracks that take you from idea to first cheque to scaled company.",
    glyph: "compass",
  },
  {
    title: "Events",
    blurb:
      "High-signal dinners, founder roundtables, and clinical-investor matchings. Invite-only by default.",
    glyph: "spark",
  },
  {
    title: "Career pathways",
    blurb:
      "A real map for what comes after the registrar years. Founder, VC, operator, advisor, board.",
    glyph: "path",
  },
] as const;

export type ClinicianRole = {
  title: string;
  examples: string;
  glyph: "stethoscope" | "heart-pulse" | "activity" | "pill" | "graduation" | "siren" | "brain" | "microscope";
};

export const clinicianRoles: ClinicianRole[] = [
  {
    title: "Doctors",
    examples: "Consultants, registrars, GPs, surgeons, JMOs.",
    glyph: "stethoscope",
  },
  {
    title: "Nurses",
    examples: "RNs, nurse practitioners, midwives, clinical leads.",
    glyph: "heart-pulse",
  },
  {
    title: "Allied Health",
    examples: "Physios, OTs, dietitians, audiologists, social workers.",
    glyph: "activity",
  },
  {
    title: "Pharmacists",
    examples: "Hospital, community, clinical, industry.",
    glyph: "pill",
  },
  {
    title: "Med & Health Students",
    examples: "Medical, nursing, pharmacy, allied health students.",
    glyph: "graduation",
  },
  {
    title: "Paramedics",
    examples: "Pre-hospital, retrieval, ambulance leadership.",
    glyph: "siren",
  },
  {
    title: "Psychology & Mental Health",
    examples: "Clinical psychologists, therapists, psychiatrists.",
    glyph: "brain",
  },
  {
    title: "Dental & Specialist",
    examples: "Dentists, prosthodontists, oral health, sub-specialty.",
    glyph: "microscope",
  },
];

export type Pathway = {
  id: "founder" | "investor" | "operator" | "advisor" | "curious";
  title: string;
  pitch: string;
  unlocks: string[];
};

export const pathways: Pathway[] = [
  {
    id: "founder",
    title: "Founder",
    pitch:
      "You have identified a wedge. A workflow that is broken, a market that is mispriced, a patient cohort that is underserved. ASME helps you find co-founders, capital, and your first customers.",
    unlocks: ["AUSCEP cohort entry", "Co-founder matching", "First-cheque introductions"],
  },
  {
    id: "investor",
    title: "Investor",
    pitch:
      "You want clinical pattern matching at the cap table. We connect you to vetted deal flow, syndicates, and a peer group of clinicians writing cheques.",
    unlocks: ["Curated deal flow", "Syndicate access", "Diligence office hours"],
  },
  {
    id: "operator",
    title: "Operator",
    pitch:
      "You do not want to start a company. You want to run one. Health-tech operating roles where clinical credibility is a moat.",
    unlocks: ["Operator job board", "Equity & comp benchmarks", "Founder team matching"],
  },
  {
    id: "advisor",
    title: "Advisor",
    pitch:
      "Your judgement is the product. Get matched with founders who need a clinician on the cap table. Paid in equity, not pizza.",
    unlocks: ["Advisor placements", "Equity grant playbooks", "Clinical advisory boards"],
  },
  {
    id: "curious",
    title: "Curious",
    pitch:
      "You are not sure what shape this takes yet. Start here. Read, attend, ask. No commitment, no jargon, no gatekeeping.",
    unlocks: ["Member-only newsletter", "Open events & socials", "Career path 1:1s"],
  },
];

export const auscep = {
  eyebrow: "Flagship program",
  title: "AUSCEP",
  subtitle: "The Australian Clinical Entrepreneur Program.",
  description:
    "An industry-leading innovation program designed to advance clinician-led transformation across Australia's healthcare workforce. 12 months. Cohort based. Application only.",
  pillars: [
    {
      title: "Build your toolkit",
      body: "Eight immersive in-person workshops and online webinars that combine clinical practice with entrepreneurial thinking.",
    },
    {
      title: "Grow with mentors",
      body: "Ongoing mentorship from experienced clinicians and operators who help you navigate key decisions and de-risk the path.",
    },
    {
      title: "Sharpen your idea",
      body: "Focused 1:1 consultations with the delivery team to review your venture, critique the model, and set clear next steps.",
    },
    {
      title: "Showcase & connect",
      body: "A targeted network of collaborators, investors, and partners. Forums designed to unlock pilots, funding, and partnerships.",
    },
  ],
  outcomes: [
    "100+ Australian clinicians supported since 2022",
    "$20M+ raised by participants",
    "18,000 lives impacted across pilots and rollouts",
  ],
  cta: {
    label: "Apply for the next cohort",
    href: "/join",
  },
} as const;

/** Real AUSCEP cohort participants from asme.org.au/startup-directory. */
export type Member = {
  name: string;
  role: string;
  org: string;
  type: "Doctor" | "GP" | "Allied Health" | "Surgeon" | "Psychologist" | "Anaesthetist" | "Paramedic" | "Physiotherapist" | "Dentist" | "Operator";
  bio: string;
  initials: string;
  accent: "blue" | "coral" | "soft-blue";
};

export const members: Member[] = [
  {
    name: "Alexandra Hu",
    role: "Doctor",
    org: "Skan",
    type: "Doctor",
    bio: "Building Skan, an automated full-body skin check designed to detect suspicious skin lesions and aim for earlier melanoma detection.",
    initials: "AH",
    accent: "blue",
  },
  {
    name: "Birinder Giddey",
    role: "CMO & Executive of Medical Services",
    org: "AeroHealth Link",
    type: "Operator",
    bio: "Integrating CASA-compliant drone logistics with Local Health Service Networks to move urgent pathology, blood products, and medicines between rural sites and hubs in minutes.",
    initials: "BG",
    accent: "coral",
  },
  {
    name: "Brenda Taylor",
    role: "Clinical Psychologist",
    org: "Focus Forward Courses",
    type: "Psychologist",
    bio: "Making ADHD education more accessible to the thousands of people who are newly diagnosed as adults.",
    initials: "BT",
    accent: "soft-blue",
  },
  {
    name: "Cameron Grayden",
    role: "Paediatric Anaesthetist",
    org: "Aeris",
    type: "Anaesthetist",
    bio: "Improving the safety of endotracheal intubation. Leveraging clinical expertise to develop new technologies that improve patient outcomes.",
    initials: "CG",
    accent: "blue",
  },
  {
    name: "Elleesha King",
    role: "Team Manager",
    org: "Ambulance Victoria",
    type: "Paramedic",
    bio: "Pulse Tile is a single-use pulse-sensing device for suspected cardiac arrest. It cuts delays from difficult manual pulse palpation and the subjective nature of breathing assessment in DRSABCD.",
    initials: "EK",
    accent: "coral",
  },
  {
    name: "Benjamin Gold",
    role: "Allied Health Professional",
    org: "Medical Support Solutions",
    type: "Allied Health",
    bio: "Vascutherm 5 is a mobile compression and iceless cooling/heating device for use post-operatively, after injury, or after strenuous exercise.",
    initials: "BG",
    accent: "soft-blue",
  },
  {
    name: "Anne Stephenson",
    role: "General Practitioner",
    org: "IMG Coaching",
    type: "GP",
    bio: "Helping IMGs build communication confidence through practical coaching, simulated patients, and small-group sessions so they can connect with patients more easily.",
    initials: "AS",
    accent: "blue",
  },
  {
    name: "Catherene Pham",
    role: "Specialist Prosthodontist Surgeon",
    org: "Bio-Ti Implants",
    type: "Dentist",
    bio: "4D bio-printed titanium implants for slow release and concentrated drug and hormone delivery.",
    initials: "CP",
    accent: "coral",
  },
  {
    name: "Ettie Ben-Shabat",
    role: "Physiotherapist",
    org: "Clinician, researcher, educator",
    type: "Physiotherapist",
    bio: "Clinician-researcher-educator focused on teaching practical sensory and motor recovery to clinicians treating stroke and neurological conditions.",
    initials: "EB",
    accent: "soft-blue",
  },
];

/**
 * Real AUSCEP alumni testimonials with their names, titles, and quotes
 * (verbatim from asme.org.au / programs-opportunities).
 */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  accent: "blue" | "coral" | "soft-blue";
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "I'm finishing up the program a more confident entrepreneur with a stronger sense of purpose and resolve to make a difference, no matter how long it takes. I hope I can stay connected to AUSCEP for ongoing inspiration and collaboration in the future. Thanks!",
    name: "Dr. Gill Singleton",
    role: "GP Clinical Entrepreneur",
    initials: "GS",
    accent: "coral",
  },
  {
    quote:
      "The AUSCEP program has been invaluable in helping us refine our business, identify our value, and facilitate introductions to incredibly useful connections and mentors within the health entrepreneurship space.",
    name: "Dr. Georgia Downing",
    role: "Medical Doctor",
    initials: "GD",
    accent: "blue",
  },
  {
    quote:
      "As a busy clinician very preoccupied with delivering clinical care, I didn't know there was a world of healthcare innovation that I can only now see with some clarity since the AUSCEP program. I love being part of it. This course has changed my future and its impact on my clinical work from now on.",
    name: "Dr. Derek Eng",
    role: "Palliative Medicine",
    initials: "DE",
    accent: "soft-blue",
  },
  {
    quote:
      "I would highly recommend clinicians to apply and join the AUSCEP program. It is a unique opportunity to meet your tribe and learn key knowledge about entrepreneurship in order to contribute towards unsuffering the world. Your adventure and innovation journey starts here. You will be supported, mentored, and provided with professional links. It is time to light a flame instead of cursing the darkness.",
    name: "Dr. Mark Lin",
    role: "Consultant Psychiatrist",
    initials: "ML",
    accent: "blue",
  },
  {
    quote:
      "This program was pivotal in giving me the confidence to establish myself as an entrepreneur. Being surrounded by amazing and inspiring people who are driving innovation and change in the most challenging of environments is life changing. We cannot be what we cannot see, and knowing that there is a supportive community of people who have been there before gives you the confidence to continue. That is essential to drive change within healthcare.",
    name: "Sarah Oorschot",
    role: "Clinical Pharmacist",
    initials: "SO",
    accent: "coral",
  },
];

export type Eventish = {
  title: string;
  type: "Dinner" | "Roundtable" | "Pitch night" | "Workshop" | "Demo day";
  city: "Sydney" | "Melbourne" | "Brisbane" | "Perth" | "Adelaide" | "Online";
  date: string;
  blurb: string;
  upcoming: boolean;
};

export const events: Eventish[] = [
  {
    title: "Founder & Investor dinner",
    type: "Dinner",
    city: "Sydney",
    date: "Jun 12, 2026",
    blurb: "Twelve clinician founders, twelve investors, one table. Application required.",
    upcoming: true,
  },
  {
    title: "Pitch Night",
    type: "Pitch night",
    city: "Melbourne",
    date: "Jun 26, 2026",
    blurb: "Six AUSCEP companies pitch live to Australia's most active health investors.",
    upcoming: true,
  },
  {
    title: "Operator office hours",
    type: "Workshop",
    city: "Online",
    date: "Jul 03, 2026",
    blurb: "Equity, comp, and the real maths of joining a Series A health-tech as employee number five.",
    upcoming: true,
  },
  {
    title: "AUSCEP Demo Day",
    type: "Demo day",
    city: "Sydney",
    date: "Mar 14, 2026",
    blurb: "30 clinician founders. 11 investors in the room. Five term sheets in the week that followed.",
    upcoming: false,
  },
];

/**
 * Real partners and ecosystem orgs taken from asme.org.au.
 * Logo files live in public/partners/ and were sourced from the same CDN.
 */
export type Partner = {
  name: string;
  logo: string;
  href: string;
  className?: string; // optional sizing override
};

export const partners: Partner[] = [
  {
    name: "MTPConnect",
    logo: "/partners/mtpconnect.png",
    href: "https://www.mtpconnect.org.au",
  },
  {
    name: "LaunchVic",
    logo: "/partners/launchvic.png",
    href: "https://launchvic.org",
  },
  {
    name: "The University of Melbourne",
    logo: "/partners/uni-melbourne.png",
    href: "https://www.unimelb.edu.au",
  },
  {
    name: "DBG Health",
    logo: "/partners/dbg-health.png",
    href: "https://dbghealth.com.au",
  },
  {
    name: "Doctorpreneurs",
    logo: "/partners/doctorpreneurs.png",
    href: "https://www.doctorpreneurs.com",
  },
  {
    name: "Heart Foundation",
    logo: "/partners/heart-foundation.png",
    href: "https://www.heartfoundation.org.au",
  },
  {
    name: "UNSW Founders",
    logo: "/partners/unsw-founders.png",
    href: "https://www.unsw.edu.au/research/founders",
  },
  {
    name: "ARC Innovation at Sheba Medical Center",
    logo: "/partners/arc.png",
    href: "https://arc.sheba.gov.il",
  },
  {
    name: "Square Peg Capital",
    logo: "/partners/square-peg.jpg",
    href: "https://www.squarepegcap.com",
  },
  {
    name: "ANDHealth",
    logo: "/partners/andhealth.png",
    href: "https://www.andhealth.com.au",
  },
  {
    name: "SOPE",
    logo: "/partners/sope.png",
    href: "https://sopenet.org",
  },
];

/** Endorsements from senior figures in Australian medicine. */
export type Endorsement = {
  quote: string;
  name: string;
  role: string;
};

export const endorsements: Endorsement[] = [
  {
    quote:
      "I have always believed that doctors are uniquely placed to identify problems and see opportunities to improve healthcare. I founded this society to provide a home for all those clinicians who wish to use their training, experience, and skills to make an impact at scale.",
    name: "Dr. Brandon Carp",
    role: "President & Founder, ASME",
  },
  {
    quote:
      "ASME is a great initiative for medical graduates and doctors who would like to become entrepreneurs and impact healthcare at scale.",
    name: "Dr. Ben Hurst",
    role: "CEO, HotDoc",
  },
  {
    quote:
      "ASME is a key piece of the jigsaw, engaging coalface clinicians in the innovations that will drive tomorrow.",
    name: "Professor Fiona Wood AM",
    role: "Director, Burns WA. Inventor of Spray on Skin",
  },
];
