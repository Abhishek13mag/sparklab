import React, { useState, useEffect } from 'react';
import { MapPinIcon, HospitalIcon, ShelterIcon, SupplyIcon } from './Icons';

interface ResourceMapProps {
    userLocation: { lat: number; lng: number } | null;
}

interface Resource {
    name: string;
    x: string;
    y: string;
    icon: React.ReactElement;
    color: string;
}

const ResourceMap: React.FC<ResourceMapProps> = ({ userLocation }) => {
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState(false);
    const [startPan, setStartPan] = useState({ x: 0, y: 0 });
    const [status, setStatus] = useState('Set your location from the header to see nearby resources.');
    const [resources, setResources] = useState<Resource[]>([]);

    useEffect(() => {
        // Reset the view and generate new resources when the user's location changes
        setPan({ x: 0, y: 0 });
        setZoom(1);

        if (userLocation) {
            setStatus('Displaying resources near your location.');
            const baseResources = [
                { name: 'General Hospital', icon: <HospitalIcon className="w-5 h-5 text-white" />, color: 'bg-red-600' },
                { name: 'Community Shelter', icon: <ShelterIcon className="w-5 h-5 text-white" />, color: 'bg-purple-600' },
                { name: 'Supply Center', icon: <SupplyIcon className="w-5 h-5 text-white" />, color: 'bg-green-600' },
                { name: 'Urgent Care', icon: <HospitalIcon className="w-5 h-5 text-white" />, color: 'bg-red-600' },
                { name: 'Evacuation Point', icon: <ShelterIcon className="w-5 h-5 text-white" />, color: 'bg-purple-600' },
            ];
    
            const newResources = baseResources.map(res => {
                const angle = Math.random() * 2 * Math.PI;
                // Place resources between 80 and 250 pixels from the center
                const radius = 80 + Math.random() * 170; 
                return {
                    ...res,
                    x: `${Math.cos(angle) * radius}px`,
                    y: `${Math.sin(angle) * radius}px`,
                };
            });
            setResources(newResources);
    
        } else {
            setStatus('Set your location from the header to see nearby resources.');
            setResources([]); // Clear resources if location is cleared
        }
    }, [userLocation]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!userLocation) return;
        e.preventDefault();
        setIsPanning(true);
        setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isPanning) return;
        e.preventDefault();
        setPan({
            x: e.clientX - startPan.x,
            y: e.clientY - startPan.y,
        });
    };
    
    const handleMouseUpOrLeave = () => {
        setIsPanning(false);
    };

    const handleZoomIn = () => setZoom(z => Math.min(z * 1.4, 5));
    const handleZoomOut = () => setZoom(z => Math.max(z / 1.4, 0.5));

  return (
    <section id="map" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Find Nearby Resources</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">{status}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg relative">
          <div 
            className={`w-full h-96 md:h-[500px] bg-sky-50 dark:bg-sky-900/20 rounded-lg overflow-hidden ${userLocation ? 'cursor-grab' : ''} ${isPanning ? 'cursor-grabbing' : ''}`}
            aria-label="Map of local resources"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
          >
            {userLocation ? (
              <div 
                className="w-full h-full relative"
                style={{ 
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                    backgroundImage: 'radial-gradient(var(--tw-colors-slate-300) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
              >
                {/* User Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="relative flex flex-col items-center">
                        <span className="bg-sky-600 text-white text-xs font-bold px-2 py-1 rounded-md mb-2 relative bottom-full shadow-md">You</span>
                        <div className="w-4 h-4 bg-sky-600 rounded-full animate-pulse"></div>
                        <div className="w-8 h-8 border-2 border-sky-600 rounded-full absolute -top-2 -left-2 opacity-50"></div>
                    </div>
                </div>
                
                {/* Resource Markers */}
                {resources.map((res, index) => (
                     <div 
                         key={`${res.name}-${index}`}
                         className="absolute top-1/2 left-1/2 group"
                         style={{ transform: `translate(${res.x}, ${res.y})` }}
                         title={res.name}
                     >
                         <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {res.name}
                         </div>
                         <div className={`w-10 h-10 ${res.color} rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform cursor-pointer`}>
                            {res.icon}
                         </div>
                     </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-center text-slate-500 dark:text-slate-400 p-4">
                <div>
                  <MapPinIcon className="w-12 h-12 mx-auto text-slate-400 mb-2" />
                  <p>Click "Set Location" in the header to find resources near you.</p>
                </div>
              </div>
            )}
          </div>
          <div className="absolute top-6 right-6 flex flex-col space-y-2 z-20">
            <button onClick={handleZoomIn} className="w-10 h-10 bg-white dark:bg-slate-700 rounded-md shadow-md flex items-center justify-center text-xl font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors disabled:opacity-50" disabled={!userLocation}>+</button>
            <button onClick={handleZoomOut} className="w-10 h-10 bg-white dark:bg-slate-700 rounded-md shadow-md flex items-center justify-center text-xl font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors disabled:opacity-50" disabled={!userLocation}>-</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourceMap;