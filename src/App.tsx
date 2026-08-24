import { useState, type CSSProperties } from 'react';
import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Cloud,
  Code2,
  Cpu,
  ExternalLink,
  Globe2,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Minus,
  Network,
  Server,
  Sparkles,
  Terminal,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { Loader } from '@/components/ui/loader';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import logo from '@/assets/logo/aws_logo.jpeg';
import awsCloudImageHorizontal from '@/assets/images/aws_cloud_horizontal.png';
import awsCloudImageVertical from '@/assets/images/aws_cloud_vertical.png';
import amanKumarHappyPhoto from '@/assets/team/aman-kumar-happy.png';
import amberAryaPhoto from '@/assets/team/amber-arya.png';
import amitKumarPhoto from '@/assets/team/amit-kumar.jpeg';
import biruKumarPhoto from '@/assets/team/biru-kumar.png';
import amanjeetKumarPhoto from '@/assets/team/amanjeet-kumar.jpeg';
import viratRajPhoto from '@/assets/team/virat-raj.jpeg';

type TeamMember = {
  name: string;
  role: string;
  shortRole: string;
  initials: string;
  accent: string;
  photo: string;
  responsibilities: string[];
  linkedin: string;
};

const team: TeamMember[] = [
  {
    name: 'Aman Kumar Happy',
    role: 'Community Leader',
    shortRole: 'Community Leader',
    initials: 'AK',
    accent: '#FFD43B',
    photo: amanKumarHappyPhoto,
    responsibilities: ['Community direction', 'Chapter coordination', 'Builder culture'],
    linkedin: 'https://www.linkedin.com/in/amankumarhappy/',
  },
  {
    name: 'Amber Arya',
    role: 'Technical Lead',
    shortRole: 'Technical Lead',
    initials: 'AA',
    accent: '#7DA9E8',
    photo: amberAryaPhoto,
    responsibilities: ['AWS & cloud sessions', 'Hands-on labs', 'Projects & hackathons'],
    linkedin: 'https://www.linkedin.com/in/amber-arya',
  },
  {
    name: 'Amit Kumar',
    role: 'Co-Technical Lead',
    shortRole: 'Co-Technical Lead',
    initials: 'AK',
    accent: '#89C6B3',
    photo: amitKumarPhoto,
    responsibilities: ['Demos & PPTs', 'Participant support', 'Technical documentation'],
    linkedin: 'https://www.linkedin.com/in/mr-amit-kumar-bb8088296/',
  },
  {
    name: 'Biru Kumar',
    role: 'Marketing & PR Lead',
    shortRole: 'Marketing & PR Lead',
    initials: 'BK',
    accent: '#F0A66D',
    photo: biruKumarPhoto,
    responsibilities: ['Event promotion', 'Social media', 'College outreach'],
    linkedin: 'https://www.linkedin.com/in/birukumar/',
  },
  {
    name: 'Amanjeet Kumar',
    role: 'Co-Marketing & PR Lead',
    shortRole: 'Co-Marketing & PR Lead',
    initials: 'AK',
    accent: '#C4A7E7',
    photo: amanjeetKumarPhoto,
    responsibilities: ['Content & captions', 'Photography & video', 'Post-event coverage'],
    linkedin: 'https://www.linkedin.com/in/amanjeet-kumar-9a8393374/',
  },
  {
    name: 'Virat Raj',
    role: 'Operations & Event Lead',
    shortRole: 'Operations & Event Lead',
    initials: 'VK',
    accent: '#E7D27A',
    photo: viratRajPhoto,
    responsibilities: ['Venue & logistics', 'Attendance & schedule', 'Certificates'],
    linkedin: 'https://www.linkedin.com/in/virat-raj-a42a70242',
  },
];

const focusAreas = [
  ['01', 'AWS CLOUD', 'Cloud computing, serverless foundations and the AWS ecosystem.', Cloud],
  ['02', 'AI / ML', 'Explore intelligent systems and practical machine learning workflows.', Cpu],
  ['03', 'DEVOPS', 'Ship reliably with automation, containers and modern delivery practices.', Zap],
  ['04', 'BACKEND', 'Design APIs, databases and systems that power real products.', Server],
  ['05', 'SECURITY', 'Build with identity, access and cloud security at the core.', Network],
  ['06', 'OPEN SOURCE', 'Learn in public, contribute together and grow your builder portfolio.', Globe2],
] as const;

const resources = {
  Beginner: ['Cloud Fundamentals', 'AWS Fundamentals', 'IAM', 'S3', 'EC2'],
  Intermediate: ['Lambda', 'VPC', 'APIs', 'Databases', 'Serverless'],
  Advanced: ['Cloud Architecture', 'DevOps', 'Cloud Security', 'System Design', 'AI / ML'],
};

const socialLinks = [
  { name: 'WhatsApp', label: 'WHATSAPP COMMUNITY', description: 'Updates, discussions and announcements for the whole builder community.', href: 'https://chat.whatsapp.com/Ku8BAWKIpWuHsR4bcQ4uXY', icon: MessageCircle },
  { name: 'Meetup', label: 'MEETUP', description: 'Register for upcoming events and keep the chapter calendar close.', href: 'https://www.meetup.com/aws-sbg-at-government-engineering-college-buxar/', icon: Users },
  { name: 'LinkedIn', label: 'LINKEDIN', description: 'Follow AWS SBG GEC Buxar for professional updates and opportunities.', href: 'https://www.linkedin.com/company/aws-student-builder-group-gec-buxar', icon: Linkedin },
  { name: 'Instagram', label: 'INSTAGRAM', description: 'Event highlights, community activities and behind-the-scenes content.', href: 'https://www.instagram.com/aws.sbg.gecbuxar/', icon: Instagram },
  { name: 'Email', label: 'EMAIL US', description: 'For chapter questions, collaboration ideas and general support.', href: 'mailto:aws.sbg.gec.buxar@gmail.com', icon: Mail },
];

const legalContent = {
  disclaimer: {
    title: 'Disclaimer',
    text: 'AWS SBG GEC Buxar is a student-led technology community at Government Engineering College, Buxar. This website is provided for community information, learning resources and event updates. Unless specifically stated, it is not an official Amazon Web Services or Amazon.com, Inc. website, and the community is responsible for its own content and activities.',
  },
  privacy: {
    title: 'Privacy Policy',
    text: 'This website does not ask visitors to create an account or directly collect personal information. If you contact us by email, join a linked community platform, or submit the enquiry form, the information you provide is handled by the relevant platform and may be used by AWS SBG GEC Buxar only to respond to your request, share relevant community updates, or coordinate events. We do not sell personal information.',
  },
  terms: {
    title: 'Terms & Conditions',
    text: 'By using this website, you agree to use its learning resources, links and community information responsibly. Event availability, schedules and third-party links may change without notice. Participation in community channels and events should be respectful, lawful and aligned with the collaborative builder culture described on this website.',
  },
} as const;

type LegalDocument = keyof typeof legalContent;

function SectionLabel({ children }: { children: string }) {
  return <div className="section-label"><Minus size={16} strokeWidth={3} /> {children}</div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [eventTab, setEventTab] = useState<'UPCOMING' | 'PAST'>('UPCOMING');
  const [expandedMember, setExpandedMember] = useState<string | null>(null);
  const [legalDocument, setLegalDocument] = useState<LegalDocument | null>(null);
  const [loading, setLoading] = useState(true);

  const closeMenu = () => setMenuOpen(false);
  useScrollReveal(!loading);

  return (
    <div className={loading ? 'site-shell app-loading' : 'site-shell'}>
      <ScrollProgress />
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <div className="announcement"><span>/// AWS SBG GEC BUXAR ///</span><b>LEARN · BUILD · COLLABORATE · GROW</b><a href="#community">JOIN THE COMMUNITY <ArrowUpRight size={14} /></a></div>
      <header className="navbar">
        <a className="brand" href="#top" onClick={closeMenu}><img src={logo} alt="AWS SBG GEC Buxar logo" /><span>AWS SBG <i>·</i> GEC BUXAR</span></a>
        <button className="menu-toggle" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          {['ABOUT', 'EVENTS', 'TEAM', 'PROJECTS', 'RESOURCES', 'COMMUNITY'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>)}
          <a className="nav-cta" href="https://chat.whatsapp.com/Ku8BAWKIpWuHsR4bcQ4uXY" target="_blank" rel="noreferrer" onClick={closeMenu}>JOIN US <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> STUDENT-LED TECHNOLOGY COMMUNITY <span className="eyebrow-line" /></div>
            <h1>ENTER THE<br /><em>CLOUD<span>_</span></em></h1>
            <p className="hero-subtitle">AWS STUDENT BUILDER GROUP<br /><strong>GOVERNMENT ENGINEERING COLLEGE, BUXAR</strong></p>
            <p className="hero-description">A place to learn AWS, explore cloud technologies, build real-world projects and grow through workshops, events and hackathons.</p>
            <div className="hero-actions"><a className="button button-primary" href="https://chat.whatsapp.com/Ku8BAWKIpWuHsR4bcQ4uXY" target="_blank" rel="noreferrer">JOIN THE COMMUNITY <ArrowUpRight size={17} /></a><a className="button button-ghost" href="#events">EXPLORE EVENTS <ChevronRight size={17} /></a></div>
            <div className="hero-footnote"><span>ESTABLISHED · 21 AUGUST 2026</span><span>CHAPTER 2026–2027</span><span>FREE TO JOIN</span><span>BUXAR, BIHAR</span></div>
          </div>
          <div className="hero-visual" aria-label="Cloud technology network illustration">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
            <div className="node node-main"><Cloud size={58} strokeWidth={1.3} /><span>AWS<br /><b>BUILDER</b></span></div>
            <div className="node node-top"><Code2 /><small>CODE</small></div><div className="node node-right"><Cpu /><small>AI</small></div><div className="node node-bottom"><Server /><small>BUILD</small></div><div className="node node-left"><Terminal /><small>SHIP</small></div>
            <div className="connection connection-one" /><div className="connection connection-two" /><div className="connection connection-three" /><div className="connection connection-four" />
            <div className="visual-caption"><span>01</span><div><b>BUILDING THE FUTURE</b><br />ONE CURIOUS MIND AT A TIME</div></div>
          </div>
        </section>

        <section id="about" className="about section-pad section-dark">
          <div className="section-intro"><SectionLabel>01 / ABOUT THE COMMUNITY</SectionLabel><h2>EVERY BUILDER<br />IS <em>WELCOME<span>_</span></em></h2></div>
          <div className="about-content"><div className="about-lead"><p>AWS Student Builder Group at Government Engineering College, Buxar is a student-led technology community focused on practical learning, collaboration and real-world technology building.</p><p>The community gives students a place to explore AWS and cloud technologies, learn from mentors, build projects and connect with fellow student developers.</p></div><div className="principles">{[['LEARN', 'Explore AWS, cloud and modern technologies.'], ['BUILD', 'Turn ideas into practical projects.'], ['COLLABORATE', 'Work with students, mentors and communities.'], ['GROW', 'Develop technical and professional skills.']].map(([title, text], index) => <div className="principle" key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div>
          <div className="about-facts"><div className="about-established"><SectionLabel>ESTABLISHED</SectionLabel><p className="established-date">21 AUGUST<br />2026<span>_</span></p></div><div className="about-faculty"><SectionLabel>FACULTY COORDINATORS</SectionLabel><ul className="faculty-list"><li><div><h3>Prof. Santosh Prasad</h3><span>FACULTY, CSE</span></div></li><li><div><h3>Dr. Rina Kumari</h3><span>ASSISTANT PROFESSOR &amp; HEAD, CSE</span></div></li></ul></div></div>
        </section>

        <section className="focus section-pad"><div className="section-intro split-intro"><div><SectionLabel>02 / THE SKILL STACK</SectionLabel><h2>WHAT WE BUILD<br />& <em>LEARN<span>_</span></em></h2></div><p>From your first cloud console login to production-ready systems, there is always a next thing to discover.</p></div><div className="focus-grid">{focusAreas.map(([number, title, text, Icon]) => <div className="focus-card" key={title}><span className="card-number">{number}</span><Icon className="card-icon" size={25} /><h3>{title}</h3><p>{text}</p><ArrowUpRight className="card-arrow" size={18} /></div>)}</div></section>

        <section className="showcase-scroll bg-[#05070a] overflow-hidden">
          <ContainerScroll
            titleComponent={
              <>
                <div className="mb-6 inline-flex items-center gap-3 text-[#ffd43b] font-mono text-[10px] tracking-[.14em] uppercase"><span className="w-1.5 h-1.5 rounded-full bg-[#ffd43b] shadow-[0_0_14px_#ffd43b]" /> THE BUILDER JOURNEY</div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight" style={{ letterSpacing: '-.04em' }}>
                  FROM FIRST LOGIN TO<br />
                  <span className="block mt-2 text-5xl md:text-[5.5rem] leading-none font-black bg-clip-text text-transparent bg-gradient-to-r from-[#FFD43B] via-white to-[#7DA9E8]">
                    REAL CLOUD BUILDS<span className="text-[#FFD43B]">_</span>
                  </span>
                </h1>
                <p className="mt-7 font-mono text-[10px] md:text-xs tracking-[.18em] text-[#aab4c3] uppercase">Workshops · Hands-on Labs · Hackathons — Keep Scrolling</p>
              </>
            }
          >
            <div className="relative h-full w-full">
              <picture>
                <source media="(min-width: 768px)" srcSet={awsCloudImageHorizontal} />
                <img
                  src={awsCloudImageVertical}
                  alt="AWS cloud builder visualization"
                  className="absolute inset-0 block h-full w-full rounded-xl object-cover object-center"
                  draggable={false}
                  loading="lazy"
                />
              </picture>
            </div>
          </ContainerScroll>
        </section>

        <section className="why section-pad section-navy"><div className="section-intro split-intro"><div><SectionLabel>03 / THE ADVANTAGE</SectionLabel><h2>WHY JOIN<br /><em>AWS SBG?<span>_</span></em></h2></div><div className="stat-callout"><strong>01</strong><span>COMMUNITY<br />OVER COMPETITION</span></div></div><div className="why-grid">{['HANDS-ON LEARNING', 'AWS & CLOUD', 'PROJECTS', 'HACKATHONS', 'COMMUNITY', 'CAREER GROWTH'].map((title, i) => <div className="why-item" key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{['Learn by doing, not just watching.', 'Build practical cloud skills that travel.', 'Create solutions with a real purpose.', 'Build, compete and collaborate.', 'Meet motivated student builders.', 'Grow technical and professional confidence.'][i]}</p></div>)}</div></section>

        <section id="events" className="events section-pad"><div className="section-intro split-intro"><div><SectionLabel>04 / EVENT LOG</SectionLabel><h2>BUILD. LEARN.<br /><em>REPEAT<span>_</span></em></h2></div><div className="tabs"><button className={eventTab === 'UPCOMING' ? 'active' : ''} onClick={() => setEventTab('UPCOMING')}>UPCOMING</button><button className={eventTab === 'PAST' ? 'active' : ''} onClick={() => setEventTab('PAST')}>PAST</button></div></div><div className="event-empty"><div className="empty-mark"><Sparkles size={25} /></div><h3>{eventTab === 'UPCOMING' ? 'NO UPCOMING EVENTS ANNOUNCED YET.' : 'THE ARCHIVE IS JUST GETTING STARTED.'}</h3><p>Stay connected for upcoming workshops, technical sessions and community activities.</p><a href="https://www.meetup.com/aws-sbg-at-government-engineering-college-buxar/" target="_blank" rel="noreferrer" className="text-link">VIEW MEETUP <ArrowUpRight size={16} /></a><div className="free-badge">₹0 · FREE REGISTRATION</div></div></section>

        <section id="team" className="team section-pad"><div className="section-intro split-intro"><div><SectionLabel>05 / CORE BUILDERS</SectionLabel><h2>MEET THE<br /><em>BUILDERS<span>_</span></em></h2></div><p>One leader. Five core leads. One mission.<br />Every role is an invitation to take ownership.</p></div><div className="team-grid">{team.map((member) => <article className="team-card" key={member.name}><div className="portrait" style={{ '--portrait-accent': member.accent } as CSSProperties}><img src={member.photo} alt={`${member.name}, ${member.role}`} /><div className="portrait-tag">CORE<br />BUILDER</div></div><div className="team-card-content"><div className="team-role">{member.shortRole}</div><h3>{member.name}</h3><button className="responsibilities-toggle" onClick={() => setExpandedMember(expandedMember === member.name ? null : member.name)}>{expandedMember === member.name ? 'HIDE ROLE' : 'VIEW ROLE'} <ChevronDown size={15} className={expandedMember === member.name ? 'rotated' : ''} /></button>{expandedMember === member.name && <ul>{member.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>}<div className="team-social"><a href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`${member.name} LinkedIn profile`}><Linkedin size={16} /> LINKEDIN PROFILE</a></div></div></article>)}</div><div className="team-principle"><span className="principle-symbol">+</span><div><SectionLabel>TEAM PRINCIPLE</SectionLabel><h3>ONE TEAM. ONE COMMUNITY.</h3><p>These roles represent areas of ownership, not strict boundaries. Anyone can propose a session, prepare a PPT, contribute to documentation or suggest an event. Collaboration over hierarchy.</p></div></div></section>

        <section id="projects" className="build-lab section-pad section-navy"><div className="section-intro split-intro"><div><SectionLabel>06 / BUILD LAB</SectionLabel><h2>IDEAS INTO<br /><em>REALITY<span>_</span></em></h2></div><p>Collaborative builds are on the way. Bring a problem, a teammate or simply your curiosity.</p></div><div className="project-coming"><div className="project-icon"><Terminal size={30} /></div><div><div className="project-kicker">PROJECTS COMING SOON</div><h3>THE NEXT BUILD STARTS WITH YOU.</h3><p>The AWS SBG GEC Buxar community is preparing projects and collaborative builds.</p></div><a href="https://chat.whatsapp.com/Ku8BAWKIpWuHsR4bcQ4uXY" target="_blank" rel="noreferrer" className="button button-primary">START A CONVERSATION <ArrowUpRight size={17} /></a></div><div className="project-tags">{['CLOUD PROJECTS', 'AI PROJECTS', 'WEB APPS', 'SERVERLESS', 'DEVOPS', 'OPEN SOURCE'].map((tag) => <span key={tag}>{tag}</span>)}</div></section>

        <section id="resources" className="resources section-pad section-dark"><div className="section-intro split-intro"><div><SectionLabel>07 / LEARNING RESOURCES</SectionLabel><h2>YOUR CLOUD<br /><em>SKILL TREE<span>_</span></em></h2></div><p>Start with the foundations. Follow the questions. Use official AWS learning resources as the collection grows.</p></div><div className="resource-grid">{Object.entries(resources).map(([level, items], index) => <div className="resource-column" key={level}><div className="resource-level"><span>0{index + 1}</span><h3>{level}</h3></div>{items.map((item, i) => <a href="https://aws.amazon.com/training/" target="_blank" rel="noreferrer" key={item}><span>{String(i + 1).padStart(2, '0')}</span>{item}<ExternalLink size={14} /></a>)}</div>)}</div></section>

        <section className="stats section-navy"><div className="stats-inner">{[['0+', 'STUDENTS REACHED'], ['0+', 'EVENTS'], ['0+', 'PROJECTS'], ['6', 'COMMUNITY MEMBERS']].map(([value, label]) => <div className="stat" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></section>

        <section id="community" className="connect section-pad"><div className="section-intro split-intro"><div><SectionLabel>08 / STAY CONNECTED</SectionLabel><h2>CONNECT WITH<br /><em>THE COMMUNITY<span>_</span></em></h2></div><p>Stay connected. Stay updated. Keep building.</p></div><div className="social-grid">{socialLinks.map(({ name, label, description, href, icon: Icon }) => <a href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel={href.startsWith('mailto:') ? undefined : 'noreferrer'} className="social-card" key={name}><Icon size={24} /><div><div className="social-label">{label}</div><h3>{name}</h3><p>{description}</p></div><ArrowUpRight className="social-arrow" size={19} /></a>)}</div></section>

        <section className="enquiry section-pad section-dark"><div><SectionLabel>09 / HAVE AN IDEA?</SectionLabel><h2>LET'S BUILD<br /><em>TOGETHER<span>_</span></em></h2><p>Reach out for chapter questions, speaking opportunities, partnerships, workshops or a project you want to start.</p></div><div className="enquiry-action"><div className="enquiry-kicker">COMMUNITY DESK</div><a className="enquiry-email" href="mailto:aws.sbg.gec.buxar@gmail.com"><Mail size={19} />aws.sbg.gec.buxar@gmail.com</a><p>Prefer a structured request? Share your details through our enquiry form and the core team will get back to you.</p><a className="button button-primary" href="https://forms.gle/cD5aHAwxmERtGnyd8" target="_blank" rel="noreferrer">OPEN ENQUIRY FORM <ArrowUpRight size={17} /></a></div></section>

        <section className="join-cta section-pad"><div className="cta-mark"><Cloud size={34} /></div><SectionLabel>THE NEXT CHAPTER IS OPEN</SectionLabel><h2>READY TO ENTER<br />THE <em>CLOUD?<span>_</span></em></h2><p>Whether you’re writing your first line of code or already building projects, there’s a place for you at AWS SBG GEC Buxar.</p><div className="hero-actions"><a className="button button-primary" href="https://chat.whatsapp.com/Ku8BAWKIpWuHsR4bcQ4uXY" target="_blank" rel="noreferrer">JOIN WHATSAPP <ArrowUpRight size={17} /></a><a className="button button-ghost" href="#events">EXPLORE EVENTS <ChevronRight size={17} /></a></div><div className="cta-foot">FREE TO JOIN <span>·</span> FREE TO LEARN <span>·</span> FREE TO BUILD</div></section>
      </main>

      <footer className="footer"><div className="footer-main"><div className="footer-brand"><a className="brand" href="#top"><img src={logo} alt="AWS SBG GEC Buxar logo" /><span>AWS SBG <i>·</i> GEC BUXAR</span></a><p>Government Engineering College, Buxar</p><a className="footer-email" href="mailto:aws.sbg.gec.buxar@gmail.com">aws.sbg.gec.buxar@gmail.com</a><strong>LEARN. BUILD. GROW.</strong></div><div className="footer-column"><h4>NAVIGATION</h4><a href="#about">About</a><a href="#events">Events</a><a href="#team">Team</a><a href="#projects">Projects</a><a href="#resources">Resources</a><a href="#community">Community</a></div><div className="footer-column"><h4>CONNECT</h4><a href={socialLinks[0].href} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={13} /></a><a href={socialLinks[1].href} target="_blank" rel="noreferrer">Meetup <ArrowUpRight size={13} /></a><a href={socialLinks[2].href} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a><a href={socialLinks[3].href} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a><a href="mailto:aws.sbg.gec.buxar@gmail.com">Email <ArrowUpRight size={13} /></a></div><div className="footer-column"><h4>EXPLORE</h4><a href="https://google.com" target="_blank" rel="noreferrer">Blog <ArrowUpRight size={13} /></a><a href="https://forms.gle/cD5aHAwxmERtGnyd8" target="_blank" rel="noreferrer">Enquiry Form <ArrowUpRight size={13} /></a><button onClick={() => setLegalDocument('disclaimer')}>Disclaimer</button><button onClick={() => setLegalDocument('privacy')}>Privacy Policy</button><button onClick={() => setLegalDocument('terms')}>Terms & Conditions</button></div></div><div className="footer-bottom"><span>© 2026 AWS SBG GEC BUXAR</span><span>GOVERNMENT ENGINEERING COLLEGE, BUXAR</span><span>CHAPTER 2026–2027</span></div></footer>
      {legalDocument && <div className="legal-backdrop" role="presentation" onMouseDown={() => setLegalDocument(null)}><section className="legal-modal" role="dialog" aria-modal="true" aria-labelledby="legal-title" onMouseDown={(event) => event.stopPropagation()}><button className="legal-close" aria-label="Close" onClick={() => setLegalDocument(null)}><X size={20} /></button><div className="legal-kicker">AWS SBG GEC BUXAR</div><h2 id="legal-title">{legalContent[legalDocument].title}</h2><p>{legalContent[legalDocument].text}</p><a href="mailto:aws.sbg.gec.buxar@gmail.com">Questions? Email aws.sbg.gec.buxar@gmail.com <ArrowUpRight size={15} /></a></section></div>}
    </div>
  );
}

export default App;
