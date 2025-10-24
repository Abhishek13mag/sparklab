import React, { useState } from 'react';
import type { Language, CommunityHubData, ReportedIncident } from '../types';
import { getCommunityHubInfo, reverseGeocode, geocode, formatReportForAuthorities } from '../services/geminiService';
import Button from './Button';
import Card from './Card';
import Input from './Input';
import { ICONS } from '../constants';
import ReportDisasterModal from './ReportDisasterModal';
import Spinner from './Spinner';

interface DashboardProps {
    t: any;
    language: Language;
}

const Dashboard: React.FC<DashboardProps> = ({ t, language }) => {
    const [location, setLocation] = useState('');
    const [data, setData] = useState<CommunityHubData | null>(null);
    const [reportedIncidents, setReportedIncidents] = useState<ReportedIncident[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLocating, setIsLocating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mapQuery, setMapQuery] = useState('India');
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    const handleSearch = async (searchParam?: string | { lat: number; lon: number }) => {
        const loc = searchParam || location;
        if (!loc) return;
        setIsLoading(true);
        setError(null);
        setData(null);
        try {
            const result = await getCommunityHubInfo(loc, language);
            setData(result);
            if (typeof loc === 'string') {
                setMapQuery(loc);
            } else {
                setMapQuery(`${loc.lat},${loc.lon}`);
            }
        } catch (e: any) {
            setError(e.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleReportSubmit = async (report: { type: string; description: string; location: string; coordinates?: { lat: number; lon: number } }) => {
        setIsLoading(true);
        setError(null);
        try {
            let lat, lon;

            if (report.coordinates) {
                lat = report.coordinates.lat;
                lon = report.coordinates.lon;
            } else {
                const coords = await geocode(report.location);
                lat = coords.lat;
                lon = coords.lon;
            }
            
            const newIncident: ReportedIncident = {
                id: Date.now().toString(),
                type: report.type,
                description: report.description,
                location: report.location,
                lat,
                lon
            };
            
            setReportedIncidents(prev => [newIncident, ...prev]);
            setMapQuery(`${lat},${lon}`);

            const formattedReport = await formatReportForAuthorities(report, language);
            alert(t.dashboard.reportSentConfirmation + '\n\n' + formattedReport);

        } catch (e: any) {
            setError(e.message || 'An unknown error occurred while submitting the report.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLocateMe = () => {
        if (!navigator.geolocation) {
            setError(t.errors.geolocationNotSupported);
            return;
        }
        setIsLocating(true);
        setError(null);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const reverseGeocodePromise = reverseGeocode(latitude, longitude);
                const searchPromise = handleSearch({ lat: latitude, lon: longitude });

                try {
                    const address = await reverseGeocodePromise;
                    setLocation(address);
                    await searchPromise;
                } catch (e: any) {
                    setError(e.message || t.errors.locationUnavailable);
                } finally {
                    setIsLocating(false);
                }
            },
            () => {
                setError(t.errors.locationPermissionDenied);
                setIsLocating(false);
            }
        );
    };

    const getIncidentIcon = (type: string) => {
        const disasterTypes = t.reportModal.disasterTypes;
        const key = Object.keys(disasterTypes).find(k => disasterTypes[k] === type)?.toLowerCase() || 'other';
        return ICONS[key] || ICONS.other;
    }

    return (
        <div>
             <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
                    {t.dashboard.title}
                </h2>
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    {t.dashboard.subtitle}
                </p>
            </div>

            <Card className="max-w-3xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="w-full relative">
                       <Input id="location" label={t.communityHub.locationLabel} type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder={t.communityHub.locationPlaceholder} />
                       <button
                           onClick={handleLocateMe}
                           disabled={isLocating}
                           title={t.dashboard.locateButtonTooltip}
                           className="absolute right-2 bottom-2 p-1.5 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:cursor-not-allowed"
                       >
                           {isLocating ? <Spinner /> : ICONS.locate}
                       </button>
                    </div>
                     <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <Button onClick={() => handleSearch()} isLoading={isLoading && !isLocating} className="w-full sm:w-auto flex-shrink-0">{t.communityHub.searchButton}</Button>
                        <Button onClick={() => setIsReportModalOpen(true)} className="w-full sm:w-auto flex-shrink-0 bg-amber-600 hover:bg-amber-700 focus:ring-amber-500">
                           {ICONS.report} {t.dashboard.reportButton}
                        </Button>
                    </div>
                </div>
            </Card>

            {error && <p className="text-center text-red-500 mt-4">{error}</p>}

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 h-[60vh] lg:h-auto overflow-y-auto pr-2 space-y-6">
                    {(isLoading || isLocating) && (
                         <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-lg shadow">
                            <p className="text-slate-500 dark:text-slate-400">{t.dashboard.loading}</p>
                        </div>
                    )}
                    {!data && !isLoading && !isLocating && reportedIncidents.length === 0 && (
                        <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-lg shadow">
                            <p className="text-slate-500 dark:text-slate-400">{t.dashboard.searchPrompt}</p>
                        </div>
                    )}
                    
                    {reportedIncidents.length > 0 && (
                        <div>
                             <h4 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">{t.dashboard.reportedIncidentsTitle}</h4>
                             <div className="space-y-3">
                                {reportedIncidents.map((incident) => (
                                     <Card key={incident.id} className="!p-4" onClick={() => setMapQuery(`${incident.lat},${incident.lon}`)}>
                                         <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 text-amber-600 dark:text-amber-400 mt-1">{getIncidentIcon(incident.type)}</div>
                                            <div>
                                                 <p className="font-bold">{incident.type}</p>
                                                 <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{incident.description}</p>
                                                 <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{incident.location}</p>
                                            </div>
                                         </div>
                                     </Card>
                                ))}
                             </div>
                        </div>
                    )}

                    {data?.alerts?.length > 0 && (
                        <div>
                            <h4 className="text-xl font-semibold text-sky-700 dark:text-sky-400 mb-3">{t.communityHub.alertsTitle}</h4>
                            <div className="space-y-3">
                                {data.alerts.map((alert, index) => (
                                    <Card key={`alert-${index}`} className="!p-4">
                                        <p className="font-bold">{alert.title} <span className="font-normal text-sm text-slate-500 dark:text-slate-400">- {alert.source}</span></p>
                                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{alert.summary}</p>
                                        {alert.link && <a href={alert.link} target="_blank" rel="noopener noreferrer" className="text-sm text-sky-600 dark:text-sky-400 hover:underline mt-2 inline-block">Read more</a>}
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                     {data?.updates?.length > 0 && (
                        <div>
                            <h4 className="text-xl font-semibold text-sky-700 dark:text-sky-400 mb-3">{t.communityHub.updatesTitle}</h4>
                            <div className="space-y-3">
                                {data.updates.map((update, index) => (
                                    <Card key={`update-${index}`} className="!p-4">
                                        <p className="text-sm text-slate-600 dark:text-slate-300">{update.update}</p>
                                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{update.location} - <span className="italic">{update.timestamp}</span></p>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                     {data?.resources?.length > 0 && (
                        <div>
                            <h4 className="text-xl font-semibold text-sky-700 dark:text-sky-400 mb-3">{t.communityHub.resourcesTitle}</h4>
                            <div className="space-y-3">
                                {data.resources.map((resource, index) => (
                                    <Card key={`resource-${index}`} className="!p-4" onClick={() => setMapQuery(resource.address)}>
                                        <p className="font-bold">{resource.name} <span className="font-normal text-xs bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200 px-2 py-0.5 rounded-full ml-2">{resource.type}</span></p>
                                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{resource.address}</p>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="lg:col-span-2 rounded-xl shadow-lg overflow-hidden h-[60vh] lg:h-[75vh] lg:sticky lg:top-20">
                     <iframe
                        key={mapQuery}
                        title="Community Resource Map"
                        className="w-full h-full border-0"
                        loading="lazy"
                        allowFullScreen
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}>
                    </iframe>
                </div>
            </div>
            <ReportDisasterModal
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                onSubmit={handleReportSubmit}
                location={location}
                t={t}
            />
        </div>
    );
};

export default Dashboard;