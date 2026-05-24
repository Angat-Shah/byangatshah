import React, { useState } from 'react';
import { AppId, WindowState } from './types/os';

export const App: React.FC = () => {
  const [windows, setWindows] = useState<Record<AppId, WindowState>>({});

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0A0D12] select-none text-white font-sans">
      <main className="relative w-full h-full flex flex-col justify-between">
        <div className="flex-1 relative overflow-hidden" id="desktop-canvas">
          {/* Windows mount here */}
        </div>
      </main>
    </div>
  );
};

export default App;
