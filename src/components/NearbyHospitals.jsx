import React from 'react';
import { MapPin, Star, Activity, Shield } from 'lucide-react';

function Rating({ value }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center">
      {stars.map((s) => (
        <Star
          key={s}
          className={`h-4 w-4 ${s <= Math.round(value) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">{value.toFixed(1)}</span>
    </div>
  );
}

export default function NearbyHospitals({ location, hospitals, onBookBed }) {
  return (
    <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 backdrop-blur p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Nearby Hospitals</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {location ? (
              <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4 text-indigo-600" /> Using your current location</span>
            ) : (
              'Location not enabled yet'
            )}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {hospitals.map((h) => (
          <div key={h.id} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-indigo-600" />
                  <h3 className="text-lg font-semibold">{h.name}</h3>
                </div>
                <div className="mt-1 text-sm text-gray-600 flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {h.distance.toFixed(1)} km away
                </div>
              </div>
              <Rating value={h.rating} />
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {h.facilities.map((f) => (
                <span key={f} className="inline-flex items-center gap-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-1 text-xs">
                  <Shield className="h-3 w-3" /> {f}
                </span>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                <div className="text-sm text-gray-600">Beds Available</div>
                <div className="text-xl font-semibold">{h.bedsAvailable}</div>
              </div>
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:col-span-2">
                <div className="text-sm text-gray-600">Doctors</div>
                <div className="mt-1 text-sm text-gray-800 dark:text-gray-200 line-clamp-2">
                  {h.doctors.map((d) => `${d.name} (${d.specialization})`).join(', ')}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => onBookBed(h.id)}
                disabled={h.bedsAvailable <= 0}
                className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition ${
                  h.bedsAvailable > 0
                    ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                {h.bedsAvailable > 0 ? 'Book Bed' : 'No Beds'}
              </button>
              <button
                className="inline-flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => alert(h.management)}
              >
                View Management Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
