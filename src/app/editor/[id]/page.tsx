'use client';

import { useParams, useRouter } from 'next/navigation';
import { useResumeStore } from '@/store/useResumeStore';
import Link from 'next/link';

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const resumeId = params.id;
  
  // Connect to Zustand store
  const { data, setPersonalInfo } = useResumeStore();

  return (
    <div className="flex w-full h-full">
      {/* Sidebar / Form Area */}
      <div className="w-[45%] lg:w-[40%] h-full bg-white dark:bg-gray-800 border-r dark:border-gray-700 flex flex-col shadow-lg z-10 relative">
        <div className="p-4 border-b flex items-center justify-between bg-white dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              ← Back
            </Link>
            <h1 className="font-semibold text-lg">Editing Resume</h1>
          </div>
          <button className="bg-green-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-green-700 transition">
            Save
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8">
            {/* Personal Info Section */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex justify-between items-center">
                Personal Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full border rounded-md px-3 py-2 text-sm dark:bg-gray-900 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" 
                    value={data.personalInfo.fullName}
                    onChange={(e) => setPersonalInfo({ fullName: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Professional Title</label>
                  <input 
                    type="text" 
                    className="w-full border rounded-md px-3 py-2 text-sm dark:bg-gray-900 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" 
                    value={data.personalInfo.jobTitle}
                    onChange={(e) => setPersonalInfo({ jobTitle: e.target.value })}
                    placeholder="Senior Software Engineer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full border rounded-md px-3 py-2 text-sm dark:bg-gray-900 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" 
                    value={data.personalInfo.email}
                    onChange={(e) => setPersonalInfo({ email: e.target.value })}
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                  <input 
                    type="text" 
                    className="w-full border rounded-md px-3 py-2 text-sm dark:bg-gray-900 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" 
                    value={data.personalInfo.phone}
                    onChange={(e) => setPersonalInfo({ phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="col-span-2 relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Professional Summary</label>
                  <textarea 
                    className="w-full border rounded-md px-3 py-2 text-sm min-h-[120px] dark:bg-gray-900 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none resize-y" 
                    value={data.personalInfo.summary}
                    onChange={(e) => setPersonalInfo({ summary: e.target.value })}
                    placeholder="Briefly describe your background and key strengths..."
                  />
                  <button className="absolute bottom-3 right-3 text-xs bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full font-medium hover:bg-purple-200 flex items-center gap-1 shadow-sm">
                    ✨ Generate with AI
                  </button>
                </div>
              </div>
            </section>

            {/* AI Call to Action Banner */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 flex items-center gap-2">
                <span>🤖</span> AI Resume Analysis
              </h3>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1 mb-3">
                Let our AI review your resume, suggest high-impact keywords, and check your ATS score.
              </p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition-colors">
                Analyze Resume
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview Area */}
      <div className="flex-1 bg-gray-200 dark:bg-gray-900 h-full overflow-y-auto p-8 flex justify-center">
        <div className="bg-white w-full max-w-[800px] min-h-[1056px] shadow-2xl p-12 text-black transition-all">
          {/* Simple Default Template Preview */}
          <header className="border-b-2 border-gray-300 pb-6 mb-6">
            <h1 className="text-4xl font-serif text-gray-900 mb-1">
              {data.personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-xl text-blue-600 mb-3 font-medium">
              {data.personalInfo.jobTitle || 'Professional Title'}
            </p>
            <div className="flex flex-wrap gap-x-4 text-sm text-gray-600">
              {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
              {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
            </div>
          </header>

          {data.personalInfo.summary && (
            <section className="mb-6">
              <h2 className="text-lg font-bold uppercase tracking-wider text-gray-800 mb-2 border-b pb-1">
                Professional Summary
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                {data.personalInfo.summary}
              </p>
            </section>
          )}

          {/* Placeholders for Experience & Education preview */}
          <section className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wider text-gray-800 mb-2 border-b pb-1">
              Experience
            </h2>
            <div className="text-gray-500 text-sm italic">
              Experience entries will appear here...
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
