import React, { useState } from 'react';
import { User, Phone, MapPin } from 'lucide-react';

const Input = ({ label, icon: Icon, type = 'text', value, onChange, placeholder }) => (
  <label className="block">
    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>
    <div className="mt-1 flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/60 px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
      {Icon && <Icon className="h-5 w-5 text-gray-400" />}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
      />
    </div>
  </label>
);

export default function UserOnboarding({ user, setUser, location, onRequestLocation }) {
  const [localUser, setLocalUser] = useState(user || { name: '', phone: '', age: '' });

  const handleSave = () => {
    setUser(localUser);
  };

  return (
    <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 backdrop-blur p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Welcome</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Enter your basic details to personalize your experience.</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Full Name"
          icon={User}
          value={localUser.name}
          onChange={(e) => setLocalUser({ ...localUser, name: e.target.value })}
          placeholder="John Doe"
        />
        <Input
          label="Phone Number"
          icon={Phone}
          type="tel"
          value={localUser.phone}
          onChange={(e) => setLocalUser({ ...localUser, phone: e.target.value })}
          placeholder="+1 555 123 4567"
        />
        <Input
          label="Age"
          type="number"
          value={localUser.age}
          onChange={(e) => setLocalUser({ ...localUser, age: e.target.value })}
          placeholder="30"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 active:bg-indigo-600 transition"
        >
          Save Details
        </button>
        <button
          onClick={onRequestLocation}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          <MapPin className="h-5 w-5 text-indigo-600" />
          {location ? (
            <span>
              Location set ({location.lat.toFixed(3)}, {location.lng.toFixed(3)})
            </span>
          ) : (
            <span>Enable Location</span>
          )}
        </button>
      </div>
    </section>
  );
}
