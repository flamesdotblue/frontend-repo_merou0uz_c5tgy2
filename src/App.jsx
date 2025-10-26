import React, { useMemo, useState } from 'react';
import UserOnboarding from './components/UserOnboarding';
import NearbyHospitals from './components/NearbyHospitals';
import EmergencyPanel from './components/EmergencyPanel';
import HealthAssistant from './components/HealthAssistant';

function seedHospitals() {
  // Mock data to demonstrate UI without backend yet
  return [
    {
      id: 'h1',
      name: 'CityCare General Hospital',
      distance: 1.2,
      rating: 4.3,
      facilities: ['ICU', '24x7 Pharmacy', 'Diagnostics'],
      bedsAvailable: 5,
      management: 'ISO-certified management with digital record systems and triage protocols.',
      doctors: [
        { name: 'Dr. Meera Shah', specialization: 'Cardiology' },
        { name: 'Dr. Arjun Iyer', specialization: 'Orthopedics' },
      ],
    },
    {
      id: 'h2',
      name: 'Green Valley Medical Center',
      distance: 2.7,
      rating: 4.7,
      facilities: ['Emergency', 'Radiology', 'NICU'],
      bedsAvailable: 0,
      management: 'NABH-accredited with robust patient safety standards.',
      doctors: [
        { name: 'Dr. Riya Das', specialization: 'Pediatrics' },
        { name: 'Dr. Kabir Menon', specialization: 'Neurology' },
      ],
    },
    {
      id: 'h3',
      name: 'Lotus Specialty Hospital',
      distance: 4.1,
      rating: 4.1,
      facilities: ['Dialysis', 'Burn Unit', 'Physiotherapy'],
      bedsAvailable: 2,
      management: 'Centralized bed management and transparent billing practices.',
      doctors: [
        { name: 'Dr. Sana Khan', specialization: 'Dermatology' },
        { name: 'Dr. Raghav Rao', specialization: 'General Medicine' },
      ],
    },
  ];
}

export default function App() {
  const [user, setUser] = useState({ name: '', phone: '', age: '' });
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState(seedHospitals());
  const [toast, setToast] = useState(null);

  const requestLocation = () => {
    if (!('geolocation' in navigator)) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ lat: latitude, lng: longitude });
        // Optionally adjust distances to feel personalized
        setHospitals((prev) => prev.map((h, i) => ({ ...h, distance: Math.max(0.3, h.distance + (i - 1) * 0.2) })));
        setToast({ type: 'success', message: 'Location enabled successfully.' });
      },
      (err) => {
        console.error(err);
        setToast({ type: 'error', message: 'Unable to access location. Please allow permission.' });
      }
    );
  };

  const onBookBed = (id) => {
    setHospitals((prev) =>
      prev.map((h) => (h.id === id && h.bedsAvailable > 0 ? { ...h, bedsAvailable: h.bedsAvailable - 1 } : h))
    );
    const h = hospitals.find((x) => x.id === id);
    setToast({ type: 'success', message: `Bed booked at ${h ? h.name : 'hospital'}. You will receive confirmation shortly.` });
  };

  const onBookAmbulance = () => {
    if (!location) {
      setToast({ type: 'error', message: 'Please enable location first to book an ambulance.' });
      return;
    }
    setToast({ type: 'success', message: 'Ambulance booked. ETA 8-12 minutes.' });
  };

  const onEmergency = () => {
    if (!location) {
      setToast({ type: 'error', message: 'Please enable location first to use Emergency SOS.' });
      return;
    }
    setToast({ type: 'success', message: 'SOS activated. Nearest ambulance dispatched and hospital notified.' });
  };

  const askAssistant = (text) => {
    const t = text.toLowerCase();
    const advice = [];
    if (t.includes('fever') || t.includes('viral')) {
      advice.push('For fever: stay hydrated, rest, and consider acetaminophen as directed on label.');
    }
    if (t.includes('cold') || t.includes('cough')) {
      advice.push('For cold/cough: warm fluids, honey-lemon in warm water, steam inhalation, and avoid irritants.');
    }
    if (t.includes('headache')) {
      advice.push('For headache: hydrate, rest in a dark room, consider OTC pain relief if suitable for you.');
    }
    if (t.includes('stomach') || t.includes('vomit') || t.includes('diarrhea')) {
      advice.push('For stomach issues: ORS fluids, light meals (bananas, rice, applesauce, toast), avoid spicy foods.');
    }
    if (t.includes('chest pain') || t.includes('shortness of breath')) {
      advice.push('Chest pain or breathing difficulty can be serious. Use Emergency SOS immediately.');
    }
    if (advice.length === 0) {
      advice.push('General tip: hydrate, get adequate sleep, and seek professional care if symptoms persist or worsen.');
    }
    advice.push('Note: This is general information, not medical advice. Consult a healthcare professional as needed.');
    return advice.join('\n\n');
  };

  const closeToast = () => setToast(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">HealthLink</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">Find hospitals, book beds, call ambulances, and get quick health tips.</p>
          </div>
          {user?.name && (
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-300">Hi,</div>
              <div className="font-semibold">{user.name}</div>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <UserOnboarding
              user={user}
              setUser={setUser}
              location={location}
              onRequestLocation={requestLocation}
            />

            <NearbyHospitals
              location={location}
              hospitals={hospitals}
              onBookBed={onBookBed}
            />
          </div>

          <div className="lg:col-span-1 space-y-6">
            <EmergencyPanel
              location={location}
              onBookAmbulance={onBookAmbulance}
              onEmergency={onEmergency}
            />

            <HealthAssistant onAsk={askAssistant} />
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-4 inset-x-0 flex justify-center px-4">
          <div
            className={`max-w-xl w-full rounded-lg px-4 py-3 shadow-lg border backdrop-blur ${
              toast.type === 'success'
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                : 'bg-rose-50/80 border-rose-200 text-rose-900'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="whitespace-pre-wrap">{toast.message}</div>
              <button onClick={closeToast} className="text-sm opacity-70 hover:opacity-100">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
