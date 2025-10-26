import React, { useState, useRef, useEffect } from 'react';
import { User, Shield } from 'lucide-react';

export default function HealthAssistant({ onAsk }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I can share general wellness tips and medicine info. How can I help you today?' }
  ]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg = { role: 'user', content: text };
    setMessages((m) => [...m, userMsg]);
    const reply = onAsk(text);
    setMessages((m) => [...m, { role: 'assistant', content: reply }]);
    setInput('');
  };

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 backdrop-blur p-6 shadow-sm h-full flex flex-col">
      <h2 className="text-xl font-semibold tracking-tight">Health Assistant</h2>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">General tips only — not a substitute for professional care.</p>

      <div className="mt-4 flex-1 overflow-auto rounded-lg border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-950/40 p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex items-start gap-2 ${m.role === 'assistant' ? '' : 'justify-end'}`}>
            {m.role === 'assistant' && <Shield className="h-5 w-5 text-indigo-600" />}
            <div className={`${m.role === 'assistant' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'} rounded-lg px-3 py-2 max-w-[75%] whitespace-pre-wrap`}>
              {m.content}
            </div>
            {m.role === 'user' && <User className="h-5 w-5 text-gray-500" />}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="mt-3 flex items-center gap-2">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder="e.g., I have a fever"
          className="flex-1 resize-none rounded-lg border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSend}
          className="rounded-lg bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-500 transition"
        >
          Send
        </button>
      </div>
    </section>
  );
}
