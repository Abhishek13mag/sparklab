import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Input from './Input';
import { ICONS } from '../constants';
import { reverseGeocode } from '../services/geminiService';
import Spinner from './Spinner';

interface ReportDisasterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (report: { type: string; description: string; location: string; coordinates?: { lat: number; lon: number } }) => void;
    location: string;
    t: any;
}

const ReportDisasterModal: React.FC<ReportDisasterModalProps> = ({ isOpen, onClose, onSubmit, location, t }) => {
    const [disasterType, setDisasterType] = useState(t.reportModal.disasterTypes.flood);
    const [description, setDescription] = useState('');
    const [reportLocation, setReportLocation] = useState(location);
    const [reportCoordinates, setReportCoordinates] = useState<{ lat: number; lon: number } | null>(null);
    const [isLocating, setIsLocating] = useState(false);
    const [locationError, setLocationError] = useState<string | null>(null);
    
    useEffect(() => {
        if (isOpen) {
            setReportLocation(location);
            setLocationError(null);
            setReportCoordinates(null);
            setDisasterType(t.reportModal.disasterTypes.flood)
            setDescription('');
        }
    }, [location, isOpen, t]);

    if (!isOpen) {
        return null;
    }

    const handleSubmit = () => {
        if (description && reportLocation) {
            onSubmit({ type: disasterType, description, location: reportLocation, coordinates: reportCoordinates || undefined });
            onClose();
        }
    };
    
    const handleLocateMe = () => {
        if (!navigator.geolocation) {
            setLocationError(t.errors.geolocationNotSupported);
            return;
        }
        setIsLocating(true);
        setLocationError(null);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setReportCoordinates({ lat: latitude, lon: longitude });
                try {
                    const address = await reverseGeocode(latitude, longitude);
                    setReportLocation(address);
                } catch (e: any) {
                    setLocationError(e.message || t.errors.locationUnavailable);
                } finally {
                    setIsLocating(false);
                }
            },
            () => {
                setLocationError(t.errors.locationPermissionDenied);
                setIsLocating(false);
            }
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" aria-modal="true" role="dialog" onClick={onClose}>
            <Card className="w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">{t.reportModal.title}</h3>
                    <button onClick={onClose} className="text-2xl font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200" aria-label="Close modal">&times;</button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="disasterType" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t.reportModal.disasterTypeLabel}</label>
                        <select
                            id="disasterType"
                            value={disasterType}
                            onChange={(e) => setDisasterType(e.target.value)}
                            className="block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                        >
                            {Object.entries(t.reportModal.disasterTypes).map(([key, value]) => (
                                <option key={key} value={value as string}>{value as string}</option>
                            ))}
                        </select>
                    </div>
                    <div className="relative">
                        <Input
                            id="reportLocation"
                            label={t.reportModal.locationLabel}
                            type="text"
                            value={reportLocation}
                            onChange={e => {
                                setReportLocation(e.target.value);
                                setReportCoordinates(null);
                                if (locationError) setLocationError(null);
                            }}
                            placeholder={t.communityHub.locationPlaceholder}
                        />
                         <button
                           onClick={handleLocateMe}
                           disabled={isLocating}
                           title={t.reportModal.locateButtonTooltip}
                           className="absolute right-2 bottom-2 p-1.5 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:cursor-not-allowed"
                       >
                           {isLocating ? <Spinner /> : ICONS.locate}
                       </button>
                    </div>
                     {locationError && <p className="text-sm text-red-500 -mt-2">{locationError}</p>}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t.reportModal.descriptionLabel}</label>
                        <textarea
                            id="description"
                            rows={4}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            placeholder={t.reportModal.descriptionPlaceholder}
                        ></textarea>
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <Button onClick={onClose} className="bg-slate-200 text-slate-800 hover:bg-slate-300 focus:ring-slate-400 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500">
                        {t.reportModal.cancelButton}
                    </Button>
                    <Button onClick={handleSubmit} disabled={!description || !reportLocation}>
                        {t.reportModal.submitButton}
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default ReportDisasterModal;
