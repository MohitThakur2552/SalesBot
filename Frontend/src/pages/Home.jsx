import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [config, setConfig] = useState({
    industry: "SaaS",
    personality: "Skeptical",
    difficulty: "Medium",
    objection: "Pricing",
    goal: "Product Demo",
  });

  const handleChange = (e) => {
    setConfig({
      ...config,
      [e.target.name]: e.target.value,
    });
  };

  const startMeeting = () => {
    navigate("/meeting", {
      state: config,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-center py-12 px-4 sm:px-6">
      
      <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 rounded-2xl w-full max-w-3xl p-8 sm:p-12 transition-all">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            SalesPilot <span className="text-blue-600">AI</span>
          </h1>
          <p className="text-slate-500 mt-3 text-sm sm:text-base">
            Configure your prospect and practice realistic, real-time sales scenarios.
          </p>
        </div>

        {/* Form Grid */}
        <div className="grid md:grid-cols-2 gap-x-6 gap-y-8">
          
          {/* Industry */}
          <div className="group">
            <label className="block font-semibold text-slate-700 mb-2 uppercase tracking-wider text-xs">
              Industry
            </label>
            <select
              name="industry"
              value={config.industry}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none shadow-sm cursor-pointer hover:border-slate-300"
            >
              <option>SaaS</option>
              <option>Healthcare</option>
              <option>Finance</option>
              <option>E-commerce</option>
              <option>Education</option>
            </select>
          </div>

          {/* Personality */}
          <div className="group">
            <label className="block font-semibold text-slate-700 mb-2 uppercase tracking-wider text-xs">
              Customer Personality
            </label>
            <select
              name="personality"
              value={config.personality}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none shadow-sm cursor-pointer hover:border-slate-300"
            >
              <option>Easy-going</option>
              <option>Friendly</option>
              <option>Curious</option>
              <option>Skeptical</option>
              <option>Aggressive</option>
            </select>
          </div>

          {/* Difficulty */}
          <div className="group">
            <label className="block font-semibold text-slate-700 mb-2 uppercase tracking-wider text-xs">
              Difficulty
            </label>
            <select
              name="difficulty"
              value={config.difficulty}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none shadow-sm cursor-pointer hover:border-slate-300"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          {/* Objection Style */}
          <div className="group">
            <label className="block font-semibold text-slate-700 mb-2 uppercase tracking-wider text-xs">
              Objection Style
            </label>
            <select
              name="objection"
              value={config.objection}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none shadow-sm cursor-pointer hover:border-slate-300"
            >
              <option>Pricing</option>
              <option>Trust</option>
              <option>Competition</option>
              <option>Timing</option>
              <option>Need</option>
            </select>
          </div>

          {/* Meeting Goal */}
          <div className="md:col-span-2 group">
            <label className="block font-semibold text-slate-700 mb-2 uppercase tracking-wider text-xs">
              Meeting Goal
            </label>
            <select
              name="goal"
              value={config.goal}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none shadow-sm cursor-pointer hover:border-slate-300"
            >
              <option>Product Demo</option>
              <option>Initial Discovery</option>
              <option>Price Negotiation</option>
              <option>Contract Discussion</option>
            </select>
          </div>

        </div>

        {/* Action Button */}
        <button
          onClick={startMeeting}
          className="mt-10 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
        >
          Start AI Meeting
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

      </div>
    </div>
  );
}