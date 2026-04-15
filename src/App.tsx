import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Server, 
  Cloud, 
  ShieldCheck, 
  Network, 
  FileText, 
  Users, 
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Download
} from 'lucide-react';
import { image, img } from 'motion/react-client';

// --- DATA ---
const systems = {
  server: [
    { name: 'Host Server', desc: 'Bereitstellung Proxmox', type: 'On-Premise' },
    { name: 'Active-Directory & Print-Server', desc: 'Zentrale Verteilung von Userdaten und Berechtigungen', type: 'On-Premise' },
    { name: 'Remote Desktop Server', desc: 'Zentrale Arbeitsumgebung für Administration und Dozierende', type: 'On-Premise' },
    { name: 'Nextcloud Server (SP Ersatz)', desc: 'Plattform für Dateiablage und Zusammenarbeit', type: 'On-Premise' },
    { name: 'Synology NAS', desc: 'Zentrale Datenspeicherung und Backup-System', type: 'On-Premise' },
    { name: 'Synology NAS Offsite-Backup', desc: 'Zentrales Off-Site Backup-System', type: 'On-Premise' },
  ],
  network: [
    { name: 'Fortinet FortiGate-90G', desc: 'Netzwerkabsicherung, Firewall, VPN, IDS/IPS', type: 'On-Premise' },
    { name: 'UniFi Dream Machine Pro Max', desc: 'Router, Netzwerkverwaltung', type: 'On-Premise' },
    { name: 'UniFi Cloud Key Enterprise', desc: 'Zentrale Verwaltung aller UniFi Geräte', type: 'On-Premise' },
    { name: 'UniFi Pro Max 48 PoE', desc: 'Core-Switch mit hoher Portdichte', type: 'On-Premise' },
    { name: 'UniFi Pro Max 24 PoE', desc: 'Access-Switch für Endgeräte', type: 'On-Premise' },
    { name: 'UniFi U7 Pro Max', desc: 'WLAN-Abdeckung für Clients', type: 'On-Premise' },
  ],
  cloud: [
    { name: 'Microsoft Entra ID', desc: 'Zentrale Benutzer- und Identitätsverwaltung', type: 'Cloud' },
    { name: 'Azure Cloud Plattform', desc: 'Basis für Cloud-Dienste', type: 'Cloud' },
    { name: 'SharePoint', desc: 'Dateiablage und Zusammenarbeit', type: 'Cloud' },
  ],
  security: [
    { name: 'Beszel', desc: 'Monitoring von Servern, Netzwerk und Diensten', type: 'On-Premise' },
    { name: 'Windows Defender', desc: 'Endpoint Protection für Clients und Server', type: 'On-Premise' },
    { name: 'Patchmanagement', desc: 'Verwaltung und Installation von Updates', type: 'KlixB IT' },
  ]
};

const offerItems = [
  { pos: 1, qty: 1, name: 'Ubiquiti UniFi Cloudkey Enterprise', price: 5048.00 },
  { pos: 2, qty: 1, name: 'Ubiquiti UniFi Dream Machine Pro Max', price: 644.00 },
  { pos: 3, qty: 1, name: 'Fortinet FortiGate-90G', price: 1599.00 },
  { pos: 4, qty: 1, name: 'Fortinet Enterprise Protection', price: 1999.00, unit: '/P.a' },
  { pos: 5, qty: 1, name: 'Ubiquiti UniFi Pro Max 48 PoE', price: 1434.00 },
  { pos: 6, qty: 2, name: 'Ubiquiti UniFi Pro Max 24 PoE', price: 864.00 },
  { pos: 7, qty: 15, name: 'Ubiquiti UniFi U7 Pro Max', price: 294.00 },
  { pos: 8, qty: 1, name: 'HPE ProLiant DL325 Gen11 9115', price: 7435.00 },
  { pos: 9, qty: 1, name: 'Synology DS925+', price: 579.00 },
  { pos: 10, qty: 4, name: 'Synology Plus Series HAT3300-4T', price: 185.00 },
  { pos: 11, qty: 1, name: 'Antivirus Windows Defender', price: 0.00 },
  { pos: 12, qty: 1, name: 'Wartungsvertrag', price: 150.00, unit: '/Mt.' },
  { pos: 13, qty: 1, name: 'Kleinmaterialpauschale', price: 350.00 },
  { pos: 14, qty: 60, name: 'Projektaufwand (Std)', price: 120.00 },
];

const team = [
  { name: 'Yves Steinbach', role: 'Projektleiter', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=999' },
  { name: 'Colin Eckerlin', role: 'System Engineer', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=999' },
  { name: 'Leon Artime', role: 'System Engineer', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=8' },
];

// --- COMPONENTS ---

const Logo = () => (
  <img
    src="https://cdn.jsdelivr.net/gh/yvessteinbach/uk_m109@main/logo_01.png"
    alt="KlixB IT Logo"
    className="h-10 w-auto"
  />
);

const Logo_Dark = () => (
  <img
    src="https://cdn.jsdelivr.net/gh/yvessteinbach/uk_m109@main/logo_02.png"
    alt="KlixB IT Logo"
    className="h-10 w-auto"
  />
);

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-12">
    <h2 className="text-4xl font-bold text-[#1a1a1a] mb-4">{title}</h2>
    {subtitle && <p className="text-lg text-gray-600 max-w-2xl">{subtitle}</p>}
    <div className="w-20 h-1 bg-[#bce055] mt-6 rounded-full"></div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<'server' | 'network' | 'cloud' | 'security'>('server');

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a] font-sans selection:bg-[#bce055] selection:text-[#1a1a1a]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex gap-8 font-medium text-sm uppercase tracking-wider">
            <a href="#overview" className="hover:text-[#bce055] transition-colors">Übersicht</a>
            <a href="#architecture" className="hover:text-[#bce055] transition-colors">Architektur</a>
            <a href="#offer" className="hover:text-[#bce055] transition-colors">Offerte</a>
            <a href="#team" className="hover:text-[#bce055] transition-colors">Team</a>
          </div>
          <a href="#offer" className="bg-[#1a1a1a] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#bce055] hover:text-[#1a1a1a] transition-all duration-300">
            Zum Angebot
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 min-h-[90vh] flex items-center relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#bce055]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#1a1a1a] text-[#bce055] font-medium text-sm mb-6">
              Projekt Pitch 2026
            </div>
            <h1 className="text-6xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
              Hybrid Cloud <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bce055] to-[#8eb330]">Migration</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
              Massgeschneidertes Betriebskonzept und Infrastruktur-Upgrade für die Hochschule für Zahntechnik. Sicher, skalierbar und zukunftsorientiert.
            </p>
            <div className="flex gap-4">
              <a href="#architecture" className="bg-[#bce055] text-[#1a1a1a] px-8 py-4 rounded-full font-semibold hover:bg-[#a5c94a] transition-colors flex items-center gap-2">
                Lösung entdecken <ArrowRight size={20} />
              </a>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl bg-white p-8 shadow-2xl border border-gray-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/server/800/800')] opacity-10 mix-blend-luminosity"></div>
              <div className="h-full flex flex-col justify-between relative z-10">
                <div className="flex justify-between items-start">
                  <Logo />
                  <div className="text-right">
                    <p className="text-sm text-gray-500 font-medium">Kunde</p>
                    <p className="font-bold text-lg">Hochschule für Zahntechnik</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                    <div className="w-12 h-12 rounded-full bg-[#bce055]/20 flex items-center justify-center text-[#8eb330]">
                      <Server size={24} />
                    </div>
                    <div>
                      <p className="font-semibold">On-Premise Core</p>
                      <p className="text-sm text-gray-500">HPE ProLiant & Synology NAS</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                    <div className="w-12 h-12 rounded-full bg-[#bce055]/20 flex items-center justify-center text-[#8eb330]">
                      <Cloud size={24} />
                    </div>
                    <div>
                      <p className="font-semibold">Cloud Integration</p>
                      <p className="text-sm text-gray-500">Azure & Entra ID</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                    <div className="w-12 h-12 rounded-full bg-[#bce055]/20 flex items-center justify-center text-[#8eb330]">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <p className="font-semibold">Security First</p>
                      <p className="text-sm text-gray-500">Fortinet & UniFi Network</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ausgangslage & Rahmenbedingungen */}
      <section id="overview" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            title="Ausgangslage & Rahmenbedingungen" 
            subtitle="Die bestehende Situation der Hochschule, die verbindlichen Datenschutzvorgaben und die daraus entwickelte Zielarchitektur."
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-[#bce055] transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-[#1a1a1a] text-[#bce055] flex items-center justify-center mb-6">
                <Server size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">Ausgangslage</h3>
              <p className="text-gray-600 leading-relaxed">
                Die Hochschule für Zahntechnik plante die Modernisierung ihrer bestehenden IT-Infrastruktur im Rahmen
                einer digitalen Transformation. Ziel war es, die Administration zu optimieren und Schulungsunterlagen
                zentral, strukturiert und ortsunabhängig für Lehrpersonen, Studierende und freiberufliche Dozierende
                bereitzustellen.
              </p>
            </div>
            
            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-[#bce055] transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-[#1a1a1a] text-[#bce055] flex items-center justify-center mb-6">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">Verbindliche Vorgaben</h3>
              <p className="text-gray-600 leading-relaxed">
                Eine zentrale Projektvorgabe war die Einhaltung des Schweizer Datenschutzgesetzes. Sensible Daten,
                insbesondere Schüler- und Prüfungsdaten, dürfen ausschliesslich innerhalb der Schweiz gespeichert
                und verarbeitet werden. Zusätzlich mussten Zugriffe rollenbasiert, sicher und nachvollziehbar
                organisiert werden.
              </p>
            </div>
      
            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-[#bce055] transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-[#1a1a1a] text-[#bce055] flex items-center justify-center mb-6">
                <Network size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">Umgesetzte Lösung</h3>
              <p className="text-gray-600 leading-relaxed">
                Realisiert wurde eine hybride Infrastruktur mit lokal betriebenen Kernsystemen wie Host-Server,
                Active Directory, Remote Desktop Server, Nextcloud und NAS sowie ergänzenden Cloud-Diensten
                wie Microsoft Entra ID und Azure. Dadurch werden Datenschutz, zentrale Benutzerverwaltung,
                Zusammenarbeit und ein sicherer externer Zugriff optimal kombiniert.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Implementation Steps Section */}
      <section className="py-24 px-6 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            title="Projektablauf" 
            subtitle="Unsere strukturierten Schritte für eine erfolgreiche Migration in die Hybrid Cloud."
          />
          
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2"></div>
            <div className="space-y-12">
            {[
              { title: 'Projektplanung', desc: 'Detaillierte Analyse der Anforderungen und Erstellung des Projektplans.' },
              { title: 'Konzepte', desc: 'Ausarbeitung von Betriebs-, Zugriffs-, Backup- und Namenskonzepten.' },
              { title: 'Einrichtung Cloud Umgebung', desc: 'Setup von Microsoft Entra ID, Azure Cloud Plattform und SharePoint.' },
              { title: 'Einrichtung On-Premise Umgebung', desc: 'Installation von Proxmox, Fortinet, UniFi Netzwerk und Synology NAS.' },
              { title: 'Dokumentation', desc: 'Übergabe der vollständigen Systemdokumentation und Betriebshandbücher.' },
            ].map((step, idx) => (
              <div key={idx} className={`relative flex items-center justify-between md:justify-normal ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex items-center justify-center w-16 h-16 rounded-full border-4 border-[#f5f5f5] bg-[#bce055] text-[#1a1a1a] font-bold text-xl shadow-sm shrink-0 md:order-1 md:absolute md:left-1/2 md:-translate-x-1/2 z-10">
                  {idx + 1}
                </div>
                <div className={`w-[calc(100%-5rem)] md:w-[calc(50%-3rem)] p-8 rounded-3xl bg-white shadow-sm border border-gray-100 ${idx % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                  <h4 className="font-bold text-xl mb-3">{step.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="py-24 px-6 bg-[#1a1a1a] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">Systemarchitektur</h2>
            <p className="text-lg text-gray-400 max-w-2xl">Übersicht der eingesetzten Systeme in der Hybrid Cloud Umgebung.</p>
            <div className="w-20 h-1 bg-[#bce055] mt-6 rounded-full"></div>
          </div>

          <div className="flex flex-wrap gap-4 mb-12">
            {(['server', 'network', 'cloud', 'security'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full font-medium capitalize transition-all ${
                  activeTab === tab 
                    ? 'bg-[#bce055] text-[#1a1a1a]' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systems[activeTab].map((sys, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-lg">{sys.name}</h4>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-gray-300">
                    {sys.type}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{sys.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section id="offer" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            title="Offerte & Investition" 
            subtitle="Transparente Kostenaufstellung für Hardware, Lizenzen und Dienstleistungen."
          />

          <div className="bg-gray-50 rounded-3xl border border-gray-200 overflow-hidden">
            <div className="p-8 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Projekt Migration HfZ</h3>
                <p className="text-gray-500">Referenz: Hochschule für Zahntechnik | Nr. 001</p>
              </div>
              <div className="flex flex-col md:flex-row items-end md:items-end gap-6">
                <div className="text-left md:text-right">
                  <p className="text-sm text-gray-500 mb-1">Gesamttotal inkl. MWST</p>
                  <p className="text-4xl font-bold text-[#bce055] bg-[#1a1a1a] inline-block px-6 py-2 rounded-xl">
                    CHF 36'014.60
                  </p>
                </div>
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = 'https://cdn.jsdelivr.net/gh/yvessteinbach/uk_m109@main/Offerte.pdf';
                    link.download = 'Offerte-HfZ.pdf';
                    link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="flex items-center gap-2 bg-white border border-gray-200 text-[#1a1a1a] px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <Download size={18} />
                  <span>Offerte als PDF</span>
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100/50 text-sm uppercase tracking-wider text-gray-500">
                    <th className="p-4 font-medium">Pos.</th>
                    <th className="p-4 font-medium">Menge</th>
                    <th className="p-4 font-medium">Bezeichnung</th>
                    <th className="p-4 font-medium text-right">Einzelpreis</th>
                    <th className="p-4 font-medium text-right">Gesamtpreis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {offerItems.map((item) => (
                    <tr key={item.pos} className="hover:bg-white transition-colors">
                      <td className="p-4 text-gray-500">{item.pos}</td>
                      <td className="p-4 font-medium">{item.qty}</td>
                      <td className="p-4 font-medium">{item.name}</td>
                      <td className="p-4 text-right text-gray-600">
                        {item.price.toLocaleString('de-CH', { minimumFractionDigits: 2 })} {item.unit || ''}
                      </td>
                      <td className="p-4 text-right font-medium">
                        {(item.price * item.qty).toLocaleString('de-CH', { minimumFractionDigits: 2 })} {item.unit || ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-8 bg-gray-100/50 border-t border-gray-200 flex justify-end">
              <div className="w-full max-w-sm space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Nettobetrag</span>
                  <span>CHF 33'316.00</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>+ 8.10 % MwSt</span>
                  <span>CHF 2'698.60</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4 border-t border-gray-300">
                  <span>Gesamttotal</span>
                  <span>CHF 36'014.60</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* Monitoring Section */}
      <section id="monitoring" className="py-24 px-6 bg-[#1a1a1a] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">Monitoring & Logging</h2>
            <p className="text-lg text-gray-400 max-w-2xl">
              Zentrale Überwachung der Infrastruktur sowie strukturierte Bearbeitung von Meldungen und Incidents.
            </p>
            <div className="w-20 h-1 bg-[#bce055] mt-6 rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Left: General Info */}
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#bce055]/15 flex items-center justify-center">
                  <ShieldCheck className="text-[#bce055]" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Allgemeine Informationen</h3>
                  <p className="text-sm text-gray-400">Detaillierte Informationen zur Erkennung, Verarbeitung und Behebung von Meldungen.</p>
                </div>
              </div>

              <div className="space-y-5 text-gray-300 leading-relaxed">
                <p>
                  Das Monitoring dient der laufenden Überwachung von Servern, Netzwerkkomponenten und zentralen Diensten.
                  Dadurch können Ausfälle, Engpässe und Unregelmässigkeiten frühzeitig erkannt werden.
                </p>
                <p>
                  Überwacht werden unter anderem die Erreichbarkeit der Systeme, Ressourcenauslastungen, kritische Dienste
                  sowie definierte Status- und Warnmeldungen.
                </p>
                <p>
                  Die erfassten Informationen bilden die Grundlage für einen stabilen, sicheren und nachvollziehbaren Betrieb
                  der gesamten Hybrid-Cloud-Umgebung.
                </p>
              </div>

              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-black/20 border border-white/10 p-4">
                  <p className="text-sm text-gray-400 mb-1">Überwachung</p>
                  <p className="font-semibold">Server & Netzwerk</p>
                </div>
                <div className="rounded-2xl bg-black/20 border border-white/10 p-4">
                  <p className="text-sm text-gray-400 mb-1">Benachrichtigung</p>
                  <p className="font-semibold">Per E-Mail</p>
                </div>
                <div className="rounded-2xl bg-black/20 border border-white/10 p-4">
                  <p className="text-sm text-gray-400 mb-1">Weiterverarbeitung</p>
                  <p className="font-semibold">Taiga Tickets</p>
                </div>
              </div>
            </div>

            {/* Right: Beszel + Process */}
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Monitoring mit Beszel</h3>
                  </div>
                  <div className="shrink-0 w-20 h-20 rounded-2xl bg-white p-3 flex items-center justify-center">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQaZ4JinuIdRLFOjlwd8DTnilx1reTU8_YaQ&s"
                      alt="Beszel Logo"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-black/20 border border-white/10 p-5">
                    <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">Schritt 1</p>
                    <h4 className="font-semibold text-lg mb-2">Erkennung einer Meldung</h4>
                    <p className="text-gray-300">
                      Beszel erkennt definierte Warnungen oder kritische Zustände innerhalb der Infrastruktur.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-black/20 border border-white/10 p-5">
                    <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">Schritt 2</p>
                    <h4 className="font-semibold text-lg mb-2">Benachrichtigung per E-Mail</h4>
                    <p className="text-gray-300">
                      Nach Auslösung einer Meldung erfolgt die Benachrichtigung automatisiert per E-Mail an das zuständige Team.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-black/20 border border-white/10 p-5">
                    <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">Schritt 3</p>
                    <h4 className="font-semibold text-lg mb-2">Logging & Ticketbearbeitung</h4>
                    <p className="text-gray-300">
                      Die weitere Bearbeitung und Nachverfolgung erfolgt anschliessend in unseren Taiga-Tickets, damit Incidents
                      sauber dokumentiert und strukturiert abgearbeitet werden können.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 px-6 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            title="Ihr Projektteam" 
            subtitle="Die Experten von KlixB IT, die Ihre Migration zum Erfolg führen."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 text-center hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-xl">
                <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full mb-6 overflow-hidden border-4 border-[#bce055]/20">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-[#8eb330] font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <Logo_Dark />
          <div className="text-gray-400 text-sm text-center md:text-left">
            <p>KlixB-IT | Tramstrasse 66 | 4142 Münchenstein</p>
            <p className="mt-2">© 2026 KlixB-IT. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
