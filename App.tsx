import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { 
  ArrowRight, 
  Plus,
  ArrowUpRight
} from 'lucide-react';
import { SERVICES } from './constants';

type TabType = 'minimal' | 'bold' | 'corporate';

// Cursor Context for global control
const CursorContext = createContext<{
  setCursorText: (text: string | null) => void;
}>({ setCursorText: () => {} });

export const useCursor = () => useContext(CursorContext);

function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [cursorText, setCursorText] = useState<string | null>(null);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleCursorChange = (e: any) => {
      if (e.detail && typeof e.detail.text !== 'undefined') {
        setCursorText(e.detail.text);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('cursorChange', handleCursorChange);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('cursorChange', handleCursorChange);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center border border-black/5 backdrop-blur-[2px]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: cursorText ? 64 : 12,
        height: cursorText ? 64 : 12,
        backgroundColor: cursorText ? 'rgba(0, 0, 0, 0.4)' : 'rgba(163, 163, 163, 0.25)',
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
    >
      <AnimatePresence>
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-[10px] font-bold text-white uppercase tracking-widest"
          >
            {cursorText}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('minimal');

  const setCursorText = (text: string | null) => {
    window.dispatchEvent(new CustomEvent('cursorChange', { detail: { text } }));
  };

  return (
    <CursorContext.Provider value={{ setCursorText }}>
      <div className="min-h-screen bg-white selection:bg-black selection:text-white cursor-none">
        <CustomCursor />
        <main className="pt-12 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto">
        {/* Minimal Header / Tab Switcher */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-24 gap-8">
          <div className="space-y-1">
            <h1 className="text-xl font-extrabold tracking-tighter uppercase">Mamta Shah & Associates</h1>
            <p className="text-[10px] tracking-[0.3em] text-secondary uppercase font-medium">Architecture + Engineering</p>
          </div>

          <div className="flex gap-8 border-b border-black/10 pb-2 w-full md:w-auto overflow-x-auto no-scrollbar">
            {(['minimal', 'bold', 'corporate'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                onMouseEnter={() => setCursorText('SWITCH')}
                onMouseLeave={() => setCursorText(null)}
                className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap relative pb-2 ${
                  activeTab === tab ? 'text-black' : 'text-secondary hover:text-black'
                }`}
              >
                {tab.replace('-', ' ')}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                    transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeTab === 'minimal' && <MinimalGridView />}
            {activeTab === 'bold' && <BoldHeroView />}
            {activeTab === 'corporate' && <CorporateListView />}
          </motion.div>
        </AnimatePresence>
        </main>
      </div>
    </CursorContext.Provider>
  );
}

function MinimalGridView() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { setCursorText } = useCursor();

  return (
    <div className="relative">
      {/* Background Image Reveal - Architectural Depth */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] transition-opacity duration-1000">
        <AnimatePresence>
          {hoveredId && (
            <motion.div
              key={hoveredId}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-cover bg-center grayscale"
              style={{ backgroundImage: `url(${SERVICES.find(s => s.id === hoveredId)?.image})` }}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 space-y-32">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[1px] bg-black" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Capabilities</span>
          </motion.div>
          
          <motion.h2 
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-7xl md:text-[10rem] font-bold tracking-tighter leading-[0.8] mb-16"
          >
            OUR <br />SERVICES.
          </motion.h2>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-2xl md:text-3xl text-secondary max-w-3xl font-light leading-tight tracking-tight"
          >
            We provide integrated design and engineering solutions that define the future of the built environment.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-black/10">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              onMouseEnter={() => {
                setHoveredId(service.id);
                setCursorText('EXPLORE');
              }}
              onMouseLeave={() => {
                setHoveredId(null);
                setCursorText(null);
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="group border-b border-black/10 sm:border-r sm:even:border-r-0 lg:border-r lg:last:border-r-0 p-8 md:p-12 flex flex-col min-h-[350px] md:min-h-[450px] transition-all duration-700 cursor-pointer relative overflow-hidden bg-white"
            >
              {/* Intersection Detail */}
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-black/20 translate-x-1 -translate-y-1 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-black/20 -translate-x-1 translate-y-1 opacity-0 group-hover:opacity-100 transition-opacity z-20" />

              {/* Subtle Hover Reveal */}
              <div className="absolute inset-0 bg-neutral-50 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.22, 1, 0.36, 1] z-0" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div>
                  <div className="flex justify-between items-start mb-12">
                    <span className="text-[10px] font-bold tracking-[0.4em] text-secondary opacity-50">0{idx + 1}</span>
                    <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  
                  <h4 className="text-3xl font-bold tracking-tighter mb-6 leading-[1.1] uppercase text-black">{service.title}</h4>
                  <p className="text-sm text-secondary font-light leading-relaxed max-w-[240px] mb-12">
                    {service.description}.
                  </p>
                </div>
                
                <div className="flex items-center gap-4 text-black">
                  <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                    <Plus className="w-4 h-4 transform group-hover:rotate-90 transition-transform duration-700" />
                  </div>
                  <span className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-700">Explore Service</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BoldHeroView() {
  const { setCursorText } = useCursor();
  return (
    <div className="space-y-[10vh] pb-[20vh] px-4 md:px-0">
      {SERVICES.map((service, idx) => (
        <motion.section
          key={service.id}
          onMouseEnter={() => setCursorText('VIEW')}
          onMouseLeave={() => setCursorText(null)}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ top: `${100 + idx * 40}px` }}
          className="sticky h-[60vh] md:h-[70vh] w-full group cursor-pointer"
        >
          <div className="h-full w-full bg-white shadow-2xl border border-black/5 flex flex-col md:flex-row overflow-hidden">
            {/* Image Section */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full p-4 md:p-8">
              <div className="w-full h-full overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700" />
              </div>
            </div>

            {/* Text Section */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-16 flex flex-col relative bg-white">
              <div className="my-auto">
                <span className="text-[11px] font-bold tracking-[0.1em] text-black/40 mb-4 block uppercase">
                  Mamta Shah & Associates
                </span>
                <h3 className="text-4xl md:text-[65px] font-bold text-black tracking-tighter leading-[0.9] mb-8 uppercase max-w-md">
                  {service.title}
                </h3>
              </div>

              {/* Bottom Navigation & Details */}
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-16 right-8 md:right-16 flex flex-col gap-6">
                <p className="text-xs text-secondary font-medium leading-relaxed max-w-xs uppercase tracking-wider">
                  {service.description}.
                </p>
                
                <div className="flex justify-between items-end">
                  <div className="text-[11px] font-bold tracking-widest text-black/40">
                    0{idx + 1} / 0{SERVICES.length}
                  </div>
                  <div className="group/link flex flex-col items-end">
                    <span className="text-[11px] font-bold tracking-widest text-black uppercase">
                      Explore Service
                    </span>
                    <div className="h-[1px] w-full bg-black mt-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      ))}
    </div>
  );
}

function CorporateListView() {
  const [selectedId, setSelectedId] = useState(SERVICES[0].id);
  const { setCursorText } = useCursor();
  const selectedService = SERVICES.find(s => s.id === selectedId) || SERVICES[0];

  return (
    <div className="flex flex-col lg:flex-row gap-24 min-h-[80vh]">
      {/* Sidebar - Typographic List */}
      <div className="w-full lg:w-1/3 space-y-4">
        {SERVICES.map((service, idx) => (
          <button
            key={service.id}
            onMouseEnter={() => {
              setSelectedId(service.id);
              setCursorText('SELECT');
            }}
            onMouseLeave={() => setCursorText(null)}
            className={`w-full text-left py-6 border-b border-black/10 flex items-start gap-8 group transition-all duration-300 ${
              selectedId === service.id ? 'opacity-100' : 'opacity-30 hover:opacity-60'
            }`}
          >
            <span className="text-[10px] font-bold tracking-widest mt-2">0{idx + 1}</span>
            <span className="text-3xl md:text-4xl font-bold tracking-tighter uppercase">{service.title}</span>
          </button>
        ))}
      </div>

      {/* Main Content - Minimal Detail */}
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-full flex flex-col"
          >
            <div className="aspect-[16/9] w-full overflow-hidden mb-12 grayscale hover:grayscale-0 transition-all duration-700">
              <img 
                src={selectedService.image} 
                alt={selectedService.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-8 text-secondary">Overview</h4>
                <p className="text-2xl font-light leading-relaxed text-black">
                  {selectedService.description}. We provide comprehensive solutions tailored to the unique requirements of each project.
                </p>
              </div>
              
              <div className="space-y-12">
                <div>
                  <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-8 text-secondary">Capabilities</h4>
                  <ul className="space-y-4">
                    {selectedService.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-4 text-lg font-medium border-b border-black/5 pb-4">
                        <Plus className="w-4 h-4" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-12">
                  {Object.entries(selectedService.stats).map(([key, value]) => (
                    <div key={key}>
                      <div className="text-2xl font-bold">{value}</div>
                      <div className="text-[9px] font-bold tracking-widest uppercase text-secondary">{key}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
