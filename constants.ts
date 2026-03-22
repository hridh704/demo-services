import { 
  Building2, 
  Construction, 
  Zap, 
  Map, 
  Palette, 
  Leaf, 
  ClipboardCheck, 
  ShieldCheck 
} from 'lucide-react';

export const SERVICES = [
  {
    id: 'arch',
    title: 'Architectural Design',
    description: 'Innovative building designs that blend form and function',
    icon: Building2,
    benefits: ['Sustainable Design', 'Functional Layouts', 'Aesthetic Excellence'],
    stats: { projects: 150, satisfaction: '98%', experience: '20+ yrs' },
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070'
  },
  {
    id: 'struct',
    title: 'Structural Engineering',
    description: 'Robust structural solutions for complex projects',
    icon: Construction,
    benefits: ['Seismic Resilience', 'Material Optimization', 'Safety First'],
    stats: { projects: 200, satisfaction: '100%', experience: '15+ yrs' },
    image: 'https://picsum.photos/seed/structural-engineering/2070/1380'
  },
  {
    id: 'mepf',
    title: 'MEPF Engineering',
    description: 'Complete mechanical, electrical, plumbing, fire systems',
    icon: Zap,
    benefits: ['Energy Efficiency', 'Smart Integration', 'Safety Systems'],
    stats: { projects: 120, satisfaction: '96%', experience: '12+ yrs' },
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=2070'
  },
  {
    id: 'master',
    title: 'Master Planning',
    description: 'Strategic planning for large-scale developments',
    icon: Map,
    benefits: ['Urban Integration', 'Future-Proofing', 'Zoning Expertise'],
    stats: { projects: 45, satisfaction: '99%', experience: '18+ yrs' },
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=2070'
  },
  {
    id: 'interior',
    title: 'Interior Design',
    description: 'Functional and aesthetic interior environments',
    icon: Palette,
    benefits: ['Ergonomic Spaces', 'Custom Furniture', 'Lighting Design'],
    stats: { projects: 300, satisfaction: '97%', experience: '10+ yrs' },
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2070'
  },
  {
    id: 'green',
    title: 'Green Building',
    description: 'Sustainable design and certification expertise',
    icon: Leaf,
    benefits: ['LEED Certification', 'Zero Carbon', 'Renewable Energy'],
    stats: { projects: 80, satisfaction: '100%', experience: '15+ yrs' },
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=2070'
  },
  {
    id: 'pm',
    title: 'Project Management',
    description: 'End-to-end project delivery on time and budget',
    icon: ClipboardCheck,
    benefits: ['Cost Control', 'Timeline Management', 'Quality Assurance'],
    stats: { projects: 250, satisfaction: '95%', experience: '25+ yrs' },
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2070'
  },
  {
    id: 'tpv',
    title: 'Third Party Verification',
    description: 'Independent quality and compliance certification',
    icon: ShieldCheck,
    benefits: ['Code Compliance', 'Quality Audits', 'Risk Mitigation'],
    stats: { projects: 500, satisfaction: '100%', experience: '30+ yrs' },
    image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80&w=2070'
  }
];
