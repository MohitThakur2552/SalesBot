import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import VideoPanel from "../components/VideoPanel";
import AIAvatar from "../components/AIAvatar";
import Transcript from "../components/Transcript";
import ControlPanel from "../components/ControlPanel";
import Loader from "../components/Loader";

import useConversation from "../hooks/useConversation";
import api from "../services/api";

export default function Meeting() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!state) {
    navigate("/");
    return null;
  }

  const {
    conversation,
    meetingStatus,
    startListening,
    endMeeting,
  } = useConversation(state);

  const handleEndMeeting = async () => {
    try {
      setLoading(true);
      endMeeting();

      const response = await api.post("/score", {
        config: state,
        conversation,
      });

      navigate("/result", {
        state: response.data,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to generate sales report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}

      {/* Main Container: Darker slate background for contrast */}
      <div className="flex h-screen w-full bg-slate-200 overflow-hidden font-sans selection:bg-blue-200 selection:text-blue-900">
        
        {/* Left Side: Dynamic Video & Controls Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-8 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] h-full overflow-y-auto relative z-10">
          
          <div className="w-full max-w-7xl flex flex-col items-center gap-8 h-full justify-center">
            
            {/* Videos Grid */}
            <div className="w-full grid lg:grid-cols-2 gap-6 md:gap-8">
              
              {/* Left Card: User Video */}
              <div className="group relative w-full aspect-[4/3] max-h-[65vh] bg-white rounded-3xl shadow-xl hover:shadow-2xl border border-slate-300 p-5 transition-all duration-300 flex flex-col">
                <div className="absolute top-8 left-8 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-300 shadow-sm">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                   <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">You</span>
                </div>
                <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-900 ring-1 ring-inset ring-slate-900/20 shadow-inner">
                  <VideoPanel />
                </div>
              </div>
              
              {/* Right Card: AI Avatar & Transcript Toggle */}
              <div className="relative w-full aspect-[4/3] max-h-[65vh] bg-white rounded-3xl shadow-xl hover:shadow-2xl border border-slate-300 p-5 transition-all duration-300 flex flex-col">
                
                {/* Advanced Pill Toggle Button */}
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="absolute top-8 right-8 z-20 bg-white/95 backdrop-blur-md border border-slate-300 shadow-sm text-slate-900 hover:bg-slate-100 hover:border-slate-400 px-5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 font-bold text-xs tracking-wide uppercase active:scale-95 group"
                >
                  {isSidebarOpen ? 'Close Transcript' : 'Open Transcript'}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 transition-transform duration-500 ease-in-out ${isSidebarOpen ? 'rotate-180 translate-x-0.5' : '-translate-x-0.5 group-hover:translate-x-0'}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                </button>

                {/* AI Avatar Wrapper: Added classes to force img/video children to fully cover the div */}
                <div className="w-full h-full flex items-center justify-center rounded-2xl overflow-hidden ring-1 ring-inset ring-slate-900/10 bg-slate-100 [&_img]:w-full [&_img]:h-full [&_img]:object-cover [&_video]:w-full [&_video]:h-full [&_video]:object-cover [&>*]:w-full [&>*]:h-full [&>*]:object-cover">
                  <AIAvatar status={meetingStatus} />
                </div>
              </div>

            </div>

            {/* Premium Control Panel Dock */}
            <div className="relative mt-2">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-slate-300 via-white to-slate-300 rounded-full blur-md opacity-40"></div>
              <div className="relative bg-white px-10 py-4 rounded-full shadow-xl border border-slate-300 flex items-center justify-center w-max max-w-full">
                <ControlPanel
                  meetingStatus={meetingStatus}
                  onStartListening={startListening}
                  onEndMeeting={handleEndMeeting}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Floating Glassmorphism Transcript Sidebar */}
        <div 
          className={`transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col z-30 ${
            isSidebarOpen ? "w-[420px] opacity-100 translate-x-0 mr-6" : "w-0 opacity-0 translate-x-8 mr-0"
          }`}
        >
          {/* Floating container rather than edge-to-edge */}
          <div className="w-[400px] h-[calc(100vh-3rem)] my-6 bg-white/95 backdrop-blur-3xl border border-slate-300 shadow-2xl rounded-3xl flex flex-col overflow-hidden">
            
            <div className="px-6 py-5 border-b border-slate-300 flex justify-between items-center bg-white/80 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-base font-bold text-slate-900 tracking-tight">Live Transcript</h2>
              </div>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-all p-2 rounded-full active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Scrollable Transcript Area */}
            <div className="flex-1 overflow-y-auto p-6 scroll-smooth custom-scrollbar">
              <Transcript transcript={conversation} />
            </div>
            
          </div>
        </div>

      </div>
    </>
  );
}