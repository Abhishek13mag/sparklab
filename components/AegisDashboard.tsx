

import React from 'react';
import {
    AegisEarthquakeIcon,
    AegisForestFireIcon,
    AegisFloodIcon,
    AegisLandslideIcon,
    AegisHeatwaveIcon,
    AegisUrbanFireIcon,
    AegisDroughtRiskIcon,
    AegisFindReliefIcon,
    AegisRequestAidIcon,
    AegisBecomeVolunteerIcon,
    AegisLocationIcon,
    AegisPeopleIcon
} from './Icons';

const disasterData = [
    {
        title: 'Earthquake',
        status: 'Safe',
        value: '3.3',
        unit: 'Richter Scale',
        icon: AegisEarthquakeIcon,
        location: 'Bengaluru',
        affected: '74,164',
        bgColor: 'bg-sky-900/60',
        borderColor: 'border-sky-700',
        statusColor: 'bg-sky-500 text-white'
    },
    {
        title: 'Forest Fire',
        status: 'Safe',
        value: '31°C',
        unit: 'Temperature',
        icon: AegisForestFireIcon,
        location: 'Gir Forest',
        affected: '494',
        bgColor: 'bg-sky-900/60',
        borderColor: 'border-sky-700',
        statusColor: 'bg-sky-500 text-white'
    },
    {
        title: 'Flood',
        status: 'Near Danger',
        value: '90mm',
        unit: 'Rainfall (24h)',
        icon: AegisFloodIcon,
        location: 'Bengaluru',
        affected: '37,373',
        bgColor: 'bg-emerald-900/60',
        borderColor: 'border-emerald-700',
        statusColor: 'bg-emerald-500 text-white'
    },
    {
        title: 'Landslide',
        status: 'Severe',
        value: '78%',
        unit: 'Soil Moisture',
        icon: AegisLandslideIcon,
        location: 'Nainital',
        affected: '1,777',
        bgColor: 'bg-red-900/60',
        borderColor: 'border-red-700',
        statusColor: 'bg-red-500 text-white'
    },
    {
        title: 'Cyclone',
        status: 'Severe',
        value: '... 132km/h',
        unit: 'Wind Speed',
        icon: null,
        location: 'Puri',
        affected: '23,835',
        bgColor: 'bg-red-900/60',
        borderColor: 'border-red-700',
        statusColor: 'bg-red-500 text-white'
    },
    {
        title: 'Heatwave',
        status: 'Mild Danger',
        value: '47°C',
        unit: 'Forecast Temp',
        icon: AegisHeatwaveIcon,
        location: 'Bengaluru',
        affected: '209,405',
        bgColor: 'bg-amber-800/60',
        borderColor: 'border-amber-700',
        statusColor: 'bg-amber-500 text-white'
    },
    {
        title: 'Urban Fire',
        status: 'Mild Danger',
        value: '1',
        unit: 'Alerts',
        icon: AegisUrbanFireIcon,
        location: 'Bengaluru',
        affected: '28,605',
        bgColor: 'bg-amber-800/60',
        borderColor: 'border-amber-700',
        statusColor: 'bg-amber-500 text-white'
    },
    {
        title: 'Drought Risk',
        status: 'Safe',
        value: '-16%',
        unit: 'Rain Deficit',
        icon: AegisDroughtRiskIcon,
        location: 'Marathwada',
        affected: '926,753',
        bgColor: 'bg-sky-900/60',
        borderColor: 'border-sky-700',
        statusColor: 'bg-sky-500 text-white'
    }
];

const responseData = [
    {
        title: 'Find Relief Centers',
        description: 'Locate nearby shelters and aid distribution points.',
        buttonText: 'Locate Now',
        icon: AegisFindReliefIcon,
        bgColor: 'bg-sky-900/60',
        buttonColor: 'bg-sky-600 hover:bg-sky-700'
    },
    {
        title: 'Request Aid & Supplies',
        description: 'Request food, water, medical supplies, or report a person in need.',
        buttonText: 'Request Aid',
        icon: AegisRequestAidIcon,
        bgColor: 'bg-emerald-900/60',
        buttonColor: 'bg-emerald-600 hover:bg-emerald-700'
    },
    {
        title: 'Become a Volunteer',
        description: 'Join the effort. Your help can make a difference in recovery.',
        buttonText: 'Register',
        icon: AegisBecomeVolunteerIcon,
        bgColor: 'bg-amber-800/60',
        buttonColor: 'bg-amber-600 hover:bg-amber-700'
    }
];

const AegisDashboard: React.FC = () => {
    return (
        <section className="bg-grey-50 text-grey-900 py-20 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-12">
                    <h2 className="text-4xl font-bold">Disaster Resilience Hub</h2>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {disasterData.map((item, index) => (
                        <div key={index} className={`p-4 rounded-lg border ${item.borderColor} ${item.bgColor} flex flex-col`}>
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-bold">{item.title}</h3>
                                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${item.statusColor}`}>{item.status}</span>
                            </div>
                            <div className="flex items-center my-auto space-x-4">
                                {item.icon && <item.icon className="w-16 h-16 flex-shrink-0 text-grey-600" />}
                                <div className="text-left">
                                    <p className="text-4xl font-bold leading-tight">{item.value}</p>
                                    <p className="text-grey-600 text-sm">{item.unit}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-grey-200 text-xs text-grey-600">
                                <div className="flex items-center">
                                    <AegisLocationIcon className="w-4 h-4 mr-1" />
                                    <span>{item.location}</span>
                                </div>
                                <div className="flex items-center">
                                    <AegisPeopleIcon className="w-4 h-4 mr-1" />
                                    <span>{item.affected}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    <h3 className="text-2xl font-bold mb-6 text-center">Post-Disaster Response & Aid</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {responseData.map((item, index) => (
                            <div key={index} className={`p-6 rounded-lg ${item.bgColor} flex flex-col items-center text-center border border-white/10`}>
                                <item.icon className="w-12 h-12 mb-4 text-slate-300" />
                                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                                <p className="text-sm text-grey-600 mb-6 flex-grow">{item.description}</p>
                                <button className={`w-full py-3 rounded-lg font-bold text-white ${item.buttonColor} transition-colors`}>{item.buttonText}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AegisDashboard;