export const translations = {
  en: {
    header: {
      title: 'Resilience Hub',
      navDashboard: 'Community Hub',
      navRisks: 'Risks',
      navKit: 'Kit',
      navAlerts: 'Alerts',
      navAIHelper: 'AI Helper',
    },
    dashboard: {
      title: 'Community Hub Dashboard',
      subtitle: 'Get real-time local alerts, find resources, and report incidents in your area.',
      locateButtonTooltip: 'Use my current location',
      searchPrompt: 'Search for a location to see local alerts and resources.',
      loading: 'Loading data for your area...',
      reportButton: 'Report Incident',
      reportedIncidentsTitle: 'User-Reported Incidents',
      reportSentConfirmation: 'Report sent to mock authorities for review:',
    },
    communityHub: {
      locationLabel: 'Enter your location (city, zip code)',
      locationPlaceholder: 'e.g., Mumbai, 400001',
      searchButton: 'Search',
      resultsTitle: 'Showing results for {location}',
      alertsTitle: 'Current Alerts',
      updatesTitle: 'Local Updates',
      resourcesTitle: 'Nearby Resources',
    },
    reportModal: {
      title: 'Report a New Incident',
      disasterTypeLabel: 'Type of Incident',
      disasterTypes: {
        flood: 'Flood',
        fire: 'Fire',
        cyclone: 'Cyclone',
        landslide: 'Landslide',
        earthquake: 'Earthquake',
        other: 'Other',
      },
      locationLabel: 'Incident Location',
      locateButtonTooltip: 'Use my current location',
      descriptionLabel: 'Description',
      descriptionPlaceholder: 'Provide details like the severity, specific street, and number of people affected.',
      cancelButton: 'Cancel',
      submitButton: 'Submit Report',
    },
    errors: {
      geolocationNotSupported: 'Geolocation is not supported by your browser.',
      locationUnavailable: 'Could not determine your location. Please enter it manually.',
      locationPermissionDenied: 'Location access was denied. Please enable it in your browser settings or enter a location manually.',
    }
  },
  // Other language translations can be added here.
  // For now, they are empty and will default to English text keys.
  hi: {},
  ta: {},
  te: {},
  kn: {},
  ml: {},
  bn: {},
};
