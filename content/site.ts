import type { SiteContent } from './types';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH
 * ─────────────────────────────────────────────────────────────────────────────
 * Update this file to update the website. No presentation code needs to change.
 *
 * FACTUAL RULE: only add entries supported by the résumé or by information
 * Santosh has explicitly supplied. Leave arrays empty rather than guessing —
 * every section has a designed empty state.
 *
 * DELIBERATELY OMITTED from this public site (see README):
 *   personal phone number, referees' names / emails / phone numbers,
 *   any employer-internal architecture or proprietary detail.
 */

export const content: SiteContent = {
  profile: {
    brand: 'SPKATAGERI',
    name: 'Santosh Katageri',
    positioning: 'AI · DevOps · Software · Systems',
    philosophy: 'Build it. Understand it. Experiment with it. Share it.',
    headline: 'I build, understand, and experiment with technology.',
    intro:
      'Cloud and DevOps engineer with 8+ years across infrastructure automation, cloud platforms and operations. Currently a Senior Member of Technical Staff at Oracle, working on the OCI metadata management service — provisioning, multi-region delivery and the tooling that keeps it reliable.',
    currentRole: 'Senior Member of Technical Staff — Cloud & DevOps, Oracle',
    facts: [
      '8+ years in DevOps, cloud engineering & operations',
      'Oracle · Zynga · Mindtree',
      'OCI · AWS · GCP',
    ],
    about: [
      'I work on the infrastructure side of software: provisioning it, automating it, and keeping services healthy once they are live. Today that means Oracle, where I am a Senior Member of Technical Staff on the OCI metadata management service — a service that helps data professionals discover data and support data governance.',
      'Across eight-plus years I have moved between DevOps consulting, cloud engineering for game teams, and running a cloud service at scale. The through-line is automation: replacing manual, repeated work with something reproducible. Owning our region bootstrap is the clearest example — it went from a three-day exercise to six hours, and then to 120 minutes using an in-house touchless bootstrap tool.',
      'I have worked across OCI, AWS and GCP, contribute to Terraform provider development, and spend a fair amount of time on the unglamorous parts of running a service: patching, on-call, health reviews and answering customer questions in office hours.',
      'SPKATAGERI is where the rest of it goes — the experiments, the tools I am testing, and the notes from figuring out how systems actually behave.',
    ],
    siteUrl: 'https://spkatageri.com',
  },

  experience: [
    {
      id: 'oracle-smts',
      company: 'Oracle Corporation',
      title: 'Senior Member of Technical Staff — Cloud & DevOps',
      start: 'Jan 2020',
      end: 'Present',
      summary:
        'Part of the OCI metadata management service, which helps data professionals discover data and support data governance. Focused on automated provisioning, safe multi-region delivery and day-to-day service health.',
      highlights: [
        'Work on automated infrastructure provisioning, service health-check validation and canary deployments across multiple regions and realms.',
        'Took ownership of service region bootstrap and made it seamless using an in-house touchless bootstrap tool — reducing it from three days to six hours, and then to 120 minutes.',
        'Contribute to Terraform provider development and support customer queries.',
        'Take part in office-hours sessions, regular patching upgrades, on-call rotation and service health reviews.',
      ],
      technologies: ['Oracle Cloud Infrastructure', 'Terraform'],
    },
    {
      id: 'zynga-cloud-engineer',
      company: 'Zynga Inc',
      title: 'Cloud Engineer',
      start: 'Nov 2018',
      end: 'Jan 2020',
      summary:
        'Supported game teams at a social game developer whose mission is connecting the world through games — covering AWS services, DevOps tooling and cloud cost efficiency.',
      highlights: [
        'Handled requests and provided support for game teams across AWS services, DevOps tools and related technology.',
        'Automated clean-up of underutilised resources and optimised cloud infrastructure, reducing total expenses by 36 percent.',
        'Designed and implemented an IAM automation system using AWS Lambda, Terraform and Jenkins.',
      ],
      technologies: ['AWS', 'AWS Lambda', 'Terraform', 'Jenkins'],
    },
    {
      id: 'mindtree-devops',
      company: 'Mindtree Ltd',
      title: 'DevOps Engineer',
      start: 'Oct 2016',
      end: 'Nov 2018',
      summary:
        'Part of the DevOps Center of Excellence and consulting team at a global IT services enterprise, building automation for customer cloud environments.',
      highlights: [
        'Worked as part of the DevOps CoE and consulting team.',
        "Automated EC2 start/stop scheduling, reducing a customer's cloud infrastructure costs by 50 percent.",
        'Delivered automation ideas and projects using Shell, Jenkins, Ansible, Python and other DevOps tools.',
      ],
      technologies: ['AWS EC2', 'Jenkins', 'Ansible', 'Python', 'Shell'],
    },
  ],

  /**
   * Projects are drawn strictly from work described in the résumé.
   * No screenshots, no invented metrics, no internal architecture detail.
   */
  projects: [
    {
      id: 'touchless-region-bootstrap',
      name: 'Touchless region bootstrap',
      description:
        'Ownership of the service region bootstrap process at Oracle, moving it from a multi-day manual exercise to a repeatable run measured in minutes.',
      category: 'DevOps',
      period: 'Oracle · 2020 — present',
      context:
        'Bringing the service up in a new region took around three days of coordinated effort, which limited how quickly it could expand across regions and realms.',
      built: [
        'Took ownership of region bootstrap for the service and made it seamless using an in-house touch-less bootstrap tool.',
        'Paired it with automated infrastructure provisioning, service health-check validation and canary deployments across regions and realms.',
      ],
      outcomes: [
        'Bootstrap time reduced from three days to six hours, and subsequently to 120 minutes.',
      ],
      technologies: ['Oracle Cloud Infrastructure', 'Terraform'],
      visual: 'pipeline',
      featured: true,
    },
    {
      id: 'iam-automation-system',
      name: 'IAM automation system',
      description:
        'An automation system for AWS identity and access management, designed and implemented for game teams at Zynga.',
      category: 'Cloud automation',
      period: 'Zynga · 2018 — 2020',
      context:
        'Access management requests across many game teams were handled individually, making them repetitive and slow to serve.',
      built: [
        'Designed and implemented an IAM automation system using AWS Lambda, Terraform and Jenkins.',
      ],
      technologies: ['AWS Lambda', 'Terraform', 'Jenkins', 'AWS IAM'],
      visual: 'graph',
    },
    {
      id: 'cloud-cost-optimisation',
      name: 'Cloud resource clean-up & optimisation',
      description:
        'Automated detection and clean-up of underutilised cloud resources, cutting a large share of ongoing spend.',
      category: 'Cost engineering',
      period: 'Zynga · 2018 — 2020',
      context:
        'Underutilised resources accumulated across accounts and quietly carried cost month after month.',
      built: [
        'Automated the clean-up of underutilised resources and optimised the cloud infrastructure.',
      ],
      outcomes: ['Reduced total expenses by 36 percent.'],
      technologies: ['AWS', 'Terraform', 'Python'],
      visual: 'grid',
    },
    {
      id: 'ec2-scheduling-automation',
      name: 'EC2 start/stop scheduling',
      description:
        'Scheduling automation for customer EC2 fleets so non-production capacity stopped running around the clock.',
      category: 'Automation',
      period: 'Mindtree · 2016 — 2018',
      context:
        'Customer environments ran continuously regardless of whether the capacity was in use.',
      built: [
        'Automated EC2 resource start/stop scheduling as part of the DevOps CoE and consulting work.',
      ],
      outcomes: [
        "Reduced the customer's cloud infrastructure costs by 50 percent.",
      ],
      technologies: ['AWS EC2', 'Jenkins', 'Python', 'Shell'],
      visual: 'stack',
    },
  ],

  /**
   * Proficiency wording below mirrors the résumé's own
   * proficient / experienced / familiar grouping — no invented ratings.
   */
  skills: [
    {
      id: 'devops-infrastructure',
      title: 'DevOps & Infrastructure',
      note: 'Proficient with Terraform, Docker, Kubernetes and Jenkins; experienced with Ansible.',
      items: [
        'Terraform',
        'Docker',
        'Kubernetes',
        'Jenkins',
        'Ansible',
        'Packer',
        'Vagrant',
      ],
    },
    {
      id: 'cloud-platform',
      title: 'Cloud & Platform',
      note: 'Proficient in OCI and AWS; experienced with GCP.',
      items: ['Oracle Cloud Infrastructure', 'AWS', 'GCP'],
    },
    {
      id: 'programming',
      title: 'Programming',
      note: 'Languages used for automation, tooling and service work.',
      items: ['Golang', 'Python', 'Shell'],
    },
    {
      id: 'systems-tools',
      title: 'Systems & Developer Tools',
      note: 'Experienced with Linux; day-to-day tooling across version control and delivery.',
      items: ['Linux', 'Git', 'Jira', 'LaTeX'],
    },
  ],

  education: [
    {
      id: 'sit-be',
      institution: 'Siddaganga Institute of Technology, Tumkur',
      qualification: 'B.E. Telecommunication Engineering',
      period: '2012 — 2016',
    },
  ],

  certifications: [],

  recognitions: [
    { id: 'mindtree-performer', name: 'Outstanding Performer of the Year', issuer: 'Mindtree' },
    {
      id: 'zynga-spot-on',
      name: 'Spot-on Award — resolving a major security incident',
      issuer: 'Zynga',
    },
    { id: 'devops-hackathon', name: 'DevOps Hackathon Winner' },
  ],

  links: [
    {
      id: 'linkedin',
      kind: 'linkedin',
      label: 'LinkedIn',
      value: 'in/santoshkatageri',
      href: 'https://www.linkedin.com/in/santoshkatageri',
      primary: true,
    },
    {
      id: 'github',
      kind: 'github',
      label: 'GitHub',
      value: 'github.com/santoshkatageri',
      href: 'https://github.com/santoshkatageri',
    },
  ],

  /** ── SPKATAGERI Lab: real experiments, once they exist ──────────────────── */
  experiments: [],

  /**
   * Themes the Lab is being built around. Descriptions of intent, not claims
   * that work already exists.
   */
  labTracks: [
    {
      id: 'ai-experiments',
      title: 'AI experiments',
      description:
        'Hands-on tests of models, prompts and agent workflows — what holds up outside a demo, and what does not.',
    },
    {
      id: 'ai-assisted-development',
      title: 'AI-assisted development',
      description:
        'Using AI inside the real development loop: scaffolding, review, refactoring, and the guardrails it needs.',
    },
    {
      id: 'automation-workflows',
      title: 'Automation workflows',
      description:
        'Removing repeated manual steps from delivery, operations and everyday engineering work.',
    },
    {
      id: 'devops-experiments',
      title: 'DevOps experiments',
      description:
        'Pipelines, environments, observability and release mechanics — tried in the open, then written up.',
    },
    {
      id: 'system-design',
      title: 'System design explorations',
      description:
        'Reading, modelling and rebuilding architectures to understand the trade-offs behind them.',
    },
    {
      id: 'tools-and-prototypes',
      title: 'Developer tools & prototypes',
      description:
        'Small products and internal tools built to solve a specific problem, then sharpened in public.',
    },
  ],

  /** ── Notes & insights: only real, published writing ─────────────────────── */
  articles: [],
};

export default content;
