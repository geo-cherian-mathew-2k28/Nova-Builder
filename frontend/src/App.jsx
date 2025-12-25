import React, { useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import { dracula as sandpackTheme } from "@codesandbox/sandpack-themes";
import axios from "axios";
import { 
  Send, 
  Code2, 
  Play, 
  Sparkles, 
  Cpu, 
  Zap, 
  Monitor,
  Terminal
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Styled Components ---

const TabButton = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`relative flex items-center gap-2 px-5 py-2 rounded-lg font-medium text-sm transition-all duration-300 border ${
      active 
        ? "text-white border-blue-500/30 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.2)]" 
        : "text-gray-400 border-transparent hover:text-gray-200 hover:bg-white/5"
    }`}
  >
    <Icon size={16} className={active ? "text-blue-400" : "text-gray-500"} />
    {label}
  </button>
);

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [activeTab, setActiveTab] = useState("preview"); 
  const [loading, setLoading] = useState(false);
  
  // Default Initial Code
  const [code, setCode] = useState(`import React from 'react';
import { Sparkles } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8 p-10 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-500/30 mb-4">
          <Sparkles size={32} className="text-white" />
        </div>
        
        <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white/50">
          AI App Builder
        </h1>
        
        <p className="text-lg text-slate-400 leading-relaxed max-w-lg mx-auto">
          Your canvas is empty. Describe your dream application in the sidebar to watch it come to life instantly.
        </p>
      </div>
    </div>
  );
}`);

  const generateApp = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setActiveTab("preview");
    
    try {
      // CHANGED: Added timeout of 5 minutes (300000ms) to prevent early disconnects
      const res = await axios.post("http://127.0.0.1:8000/generate", 
        { prompt }, 
        { timeout: 300000 }
      );

      let cleanCode = res.data.code;
      // Clean up markdown code blocks if the AI adds them
      cleanCode = cleanCode.replace(/```jsx/g, "").replace(/```javascript/g, "").replace(/```/g, "");
      setCode(cleanCode);

    } catch (error) {
      console.error("Error generating code:", error);
      if (error.code === 'ECONNABORTED') {
         alert("Timeout! The AI took too long. Try using the faster 'qwen2.5-coder:1.5b' model in backend.py");
      } else {
         alert("Backend error! Ensure 'uvicorn backend:app --reload' is running in a separate terminal.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen w-full text-white font-sans overflow-hidden">
      
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      {/* --- LEFT SIDEBAR: GLASS CONTROL PANEL --- */}
      <div className="w-[400px] flex flex-col z-10 border-r border-white/10 bg-[#0a0a0a]/60 backdrop-blur-xl shadow-2xl">
        
        {/* Header */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-lg opacity-40"></div>
              <div className="relative p-2 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-lg shadow-inner border border-white/10">
                <Cpu size={20} className="text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">Nova Builder</h1>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">System Online</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Form Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          <div className="space-y-3">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Terminal size={12} />
              Prompt Input
            </label>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your dream app...&#10;e.g., 'A cyberpunk dashboard with live crypto prices'"
                className="relative w-full h-40 bg-[#0f0f0f] text-gray-200 p-4 rounded-xl border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none outline-none leading-relaxed placeholder:text-gray-600 text-sm"
              />
            </div>
          </div>

          <button
            onClick={generateApp}
            disabled={loading || !prompt}
            className={`
              group relative w-full py-4 rounded-xl font-bold text-sm tracking-wide shadow-lg overflow-hidden transition-all
              ${loading || !prompt 
                ? "bg-gray-800/50 text-gray-600 cursor-not-allowed border border-white/5" 
                : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/25 border border-white/10 hover:scale-[1.02] active:scale-[0.98]"}
            `}
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>PROCESSING...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} className="group-hover:text-yellow-300 transition-colors" />
                  <span>GENERATE UI</span>
                </>
              )}
            </div>
            {/* Shiny effect overlay */}
            {!loading && prompt && (
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
            )}
          </button>

          {/* Tips Section */}
          <div className="bg-blue-500/5 rounded-xl p-4 border border-blue-500/10 space-y-2">
             <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase">
                <Zap size={12} /> Pro Tip
             </div>
             <p className="text-xs text-gray-400 leading-relaxed">
                Be specific about style! Try adding keywords like <span className="text-gray-300">"Modern Dark Mode"</span>, <span className="text-gray-300">"Glassmorphism"</span>, or <span className="text-gray-300">"Dashboard"</span>.
             </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/5 text-[10px] text-center text-gray-600">
          POWERED BY OLLAMA & REACT
        </div>
      </div>

      {/* --- RIGHT PANEL: PREVIEW AREA --- */}
      <div className="flex-1 flex flex-col relative z-10 bg-transparent">
        
        {/* Toolbar */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-[#0a0a0a]/30 backdrop-blur-sm">
          <div className="flex items-center gap-1 bg-black/20 p-1 rounded-lg border border-white/5">
            <TabButton active={activeTab === 'preview'} onClick={() => setActiveTab('preview')} icon={Play} label="Preview" />
            <TabButton active={activeTab === 'code'} onClick={() => setActiveTab('code')} icon={Code2} label="Code" />
          </div>
          
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
                <Monitor size={12} />
                <span>1280 x 800</span>
             </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 relative bg-black/50 p-6 overflow-hidden">
          
          {/* This container gives the preview a 'device' look */}
          <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0f0f0f] relative">
            
            <SandpackProvider
              template="react"
              theme={sandpackTheme}
              files={{ 
                "/App.js": code,
                "/public/index.html": `<!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <script src="[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)"></script>
                    <style>
                      /* SCROLLBAR HIDING FOR CLEANER PREVIEW */
                      ::-webkit-scrollbar { width: 0px; background: transparent; }
                    </style>
                  </head>
                  <body>
                    <div id="root"></div>
                  </body>
                </html>`
              }}
              options={{
                externalResources: ["[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)"],
              }}
              customSetup={{
                dependencies: {
                  "lucide-react": "latest",
                  "framer-motion": "latest",
                  "clsx": "latest",
                  "tailwind-merge": "latest"
                }
              }}
            >
              <SandpackLayout className="!h-full !w-full !rounded-none !border-none">
                <AnimatePresence mode="wait">
                  {activeTab === 'preview' ? (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="h-full w-full bg-white" 
                    >
                       <SandpackPreview 
                          className="!h-full !w-full" 
                          showNavigator={true} 
                          showOpenInCodeSandbox={false} 
                          showRefreshButton={true}
                       />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="code"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="h-full w-full"
                    >
                      <SandpackCodeEditor 
                          className="!h-full !w-full" 
                          showTabs={false} 
                          showLineNumbers={true} 
                          showInlineErrors={true} 
                          wrapContent={true} 
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </SandpackLayout>
            </SandpackProvider>
          </div>
        </div>
      </div>
    </div>
  );
}