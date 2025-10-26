import React from 'react';
import { Ambulance, MapPin, Phone } from 'lucide-react';

export default function EmergencyPanel({ location, onBookAmbulance, onEmergency }) {
  return (
    <section className="rounded-2xl border border-red-200 dark:border-red-900 bg-red-50/70 dark:bg-red-900/20 backdrop-blur p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-red-700 dark:text-red-300">Emergency</h2>
          <p className="mt-1 text-sm text-red-700/80 dark:text-red-200/80">Quick actions for urgent help</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border border-red-200/70 dark:border-red-900/50 bg-white/80 dark:bg-red-950/20 p-4">
          <div className="text-sm text-gray-700 dark:text-gray-200">Current Location</div>
          <div className="mt-1 flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <MapPin className="h-4 w-4 text-red-600" />
            {location ? (
              <span>{location.lat.toFixed(4)}, {location.lng.toFixed(4)}</span>
            ) : (
              <span>Not set</span>
            )}
          </div>
        </div>
        <button
          onClick={onBookAmbulance}
          className="rounded-lg bg-white/80 dark:bg-red-950/20 border border-red-200/70 dark:border-red-900/50 p-4 text-left hover:bg-white/90 dark:hover:bg-red-900/30 transition"
        >
          <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <Ambulance className="h-5 w-5 text-red-600" />
            <div>
              <div className="font-medium">Book Ambulance</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Send ambulance to your location</div>
            </div>
          </div>
        </button>
        <button
          onClick={onEmergency}
          className="rounded-lg bg-red-600 text-white p-4 text-left hover:bg-red-500 transition"
        >
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            <div>
              <div className="font-semibold">Emergency SOS</div>
              <div className="text-sm text-red-50/90">Auto-book ambulance + notify nearest hospital</div>
            </div>
          </div>
        </button>
      </div>
    </section>
  );
}
