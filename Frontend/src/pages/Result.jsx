import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    navigate("/");
    return null;
  }

  // Helper component for the score progress bars
  const MetricBar = ({ label, value }) => (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        <span className="text-sm font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
          {value} / 10
        </span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden shadow-inner">
        <div 
          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all duration-1000 ease-out" 
          style={{ width: `${value * 10}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100/70 py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-blue-100 selection:text-blue-900 flex items-center justify-center">
      
      <div className="max-w-5xl w-full mx-auto bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-slate-200/80 overflow-hidden relative">
        
        {/* Subtle top gradient accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

        <div className="p-8 md:p-12">
          
          {/* Header Section */}
          <div className="flex flex-col items-center text-center mb-12">
            <span className="mb-4 px-4 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full border border-blue-100 shadow-sm">
              Testora AI Analysis
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Sales Performance Report
            </h1>
          </div>

          {/* Top Grid: Score Overview & Summary */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-12">
            
            {/* Grade Card */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-slate-50 to-slate-100/50 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">
                Overall Score
              </h2>
              <div className="relative flex items-center justify-center w-40 h-40 bg-white rounded-full shadow-[0_0_30px_rgb(0,0,0,0.05)] border-8 border-slate-50">
                <div className="text-center">
                  <div className="text-5xl font-black text-slate-800 tracking-tighter">
                    {state.score}
                  </div>
                </div>
              </div>
              <div className="mt-6 px-6 py-2 bg-slate-800 text-white rounded-full font-bold text-lg shadow-md">
                Grade: {state.grade}
              </div>
            </div>

            {/* Summary & Metrics */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <div className="mb-8">
                <h2 className="font-bold text-xl text-slate-900 mb-3 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Executive Summary
                </h2>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {state.summary}
                </p>
              </div>

              <div>
                <h2 className="font-bold text-xl text-slate-900 mb-5">Skill Breakdown</h2>
                <div className="grid sm:grid-cols-2 gap-x-8">
                  <MetricBar label="Confidence" value={state.confidence} />
                  <MetricBar label="Communication" value={state.communication} />
                  <MetricBar label="Objection Handling" value={state.objectionHandling} />
                  <MetricBar label="Product Knowledge" value={state.productKnowledge} />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Grid: Strengths & Improvements */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            
            {/* Strengths Card */}
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="font-bold text-emerald-800 text-xl">Strengths</h2>
              </div>
              <ul className="space-y-3">
                {state.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-emerald-900">
                    <svg className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="leading-relaxed text-sm md:text-base">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvements Card */}
            <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2 className="font-bold text-rose-800 text-xl">Needs Improvement</h2>
              </div>
              <ul className="space-y-3">
                {state.improvements.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-rose-900">
                    <svg className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="leading-relaxed text-sm md:text-base">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center border-t border-slate-100 pt-8">
            <button
              onClick={() => navigate("/")}
              className="group inline-flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-blue-600 px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide uppercase transition-all duration-300 shadow-lg hover:shadow-blue-500/30 active:scale-95"
            >
              Start New Meeting
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}