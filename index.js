import React, { useState, useEffect } from 'react';
import { Clock, Thermometer, Settings, X, Moon, Sun, Download, Search } from 'lucide-react';

const THEMES = [
  { name: 'Ocean Blue', bg: 'from-blue-900 via-blue-700 to-cyan-500', text: 'text-white', accent: 'bg-blue-500' },
  { name: 'Sunset', bg: 'from-orange-600 via-pink-500 to-purple-600', text: 'text-white', accent: 'bg-orange-400' },
  { name: 'Forest Green', bg: 'from-green-900 via-green-700 to-emerald-500', text: 'text-white', accent: 'bg-green-500' },
  { name: 'Royal Purple', bg: 'from-purple-900 via-purple-600 to-pink-500', text: 'text-white', accent: 'bg-purple-500' },
  { name: 'Midnight', bg: 'from-gray-900 via-blue-900 to-gray-800', text: 'text-white', accent: 'bg-blue-400' },
  { name: 'Rose Gold', bg: 'from-pink-300 via-rose-400 to-orange-300', text: 'text-gray-900', accent: 'bg-rose-400' },
  { name: 'Arctic', bg: 'from-cyan-200 via-blue-200 to-indigo-300', text: 'text-gray-900', accent: 'bg-cyan-500' },
  { name: 'Crimson', bg: 'from-red-900 via-red-700 to-orange-600', text: 'text-white', accent: 'bg-red-500' },
  { name: 'Emerald', bg: 'from-teal-600 via-emerald-500 to-green-400', text: 'text-white', accent: 'bg-emerald-400' },
  { name: 'Gold Rush', bg: 'from-yellow-600 via-yellow-500 to-amber-400', text: 'text-gray-900', accent: 'bg-yellow-500' },
  { name: 'Deep Space', bg: 'from-indigo-950 via-purple-900 to-black', text: 'text-white', accent: 'bg-indigo-500' },
  { name: 'Lavender', bg: 'from-purple-300 via-pink-300 to-purple-200', text: 'text-gray-900', accent: 'bg-purple-400' },
  { name: 'Cherry Blossom', bg: 'from-pink-400 via-pink-300 to-rose-300', text: 'text-gray-900', accent: 'bg-pink-500' },
  { name: 'Mint', bg: 'from-green-300 via-teal-200 to-cyan-300', text: 'text-gray-900', accent: 'bg-teal-500' },
  { name: 'Slate', bg: 'from-slate-700 via-slate-600 to-gray-600', text: 'text-white', accent: 'bg-slate-400' },
  { name: 'Amber', bg: 'from-amber-700 via-orange-600 to-yellow-600', text: 'text-white', accent: 'bg-amber-500' },
  { name: 'Teal', bg: 'from-teal-800 via-teal-600 to-cyan-500', text: 'text-white', accent: 'bg-teal-400' },
  { name: 'Plum', bg: 'from-purple-800 via-fuchsia-700 to-pink-700', text: 'text-white', accent: 'bg-fuchsia-500' },
  { name: 'Coral', bg: 'from-rose-500 via-orange-400 to-yellow-400', text: 'text-white', accent: 'bg-orange-400' },
  { name: 'Navy', bg: 'from-blue-950 via-indigo-900 to-slate-800', text: 'text-white', accent: 'bg-blue-500' }
];

const ALL_TIMEZONES = [
  // Africa
  { continent: 'Africa', value: 'Africa/Cairo', label: 'Cairo', country: 'Egypt' },
  { continent: 'Africa', value: 'Africa/Johannesburg', label: 'Johannesburg', country: 'South Africa' },
  { continent: 'Africa', value: 'Africa/Lagos', label: 'Lagos', country: 'Nigeria' },
  { continent: 'Africa', value: 'Africa/Nairobi', label: 'Nairobi', country: 'Kenya' },
  { continent: 'Africa', value: 'Africa/Casablanca', label: 'Casablanca', country: 'Morocco' },
  { continent: 'Africa', value: 'Africa/Algiers', label: 'Algiers', country: 'Algeria' },
  { continent: 'Africa', value: 'Africa/Addis_Ababa', label: 'Addis Ababa', country: 'Ethiopia' },
  { continent: 'Africa', value: 'Africa/Accra', label: 'Accra', country: 'Ghana' },
  
  // Asia
  { continent: 'Asia', value: 'Asia/Dubai', label: 'Dubai', country: 'UAE' },
  { continent: 'Asia', value: 'Asia/Kolkata', label: 'Mumbai/Delhi', country: 'India' },
  { continent: 'Asia', value: 'Asia/Shanghai', label: 'Beijing/Shanghai', country: 'China' },
  { continent: 'Asia', value: 'Asia/Tokyo', label: 'Tokyo', country: 'Japan' },
  { continent: 'Asia', value: 'Asia/Hong_Kong', label: 'Hong Kong', country: 'Hong Kong' },
  { continent: 'Asia', value: 'Asia/Singapore', label: 'Singapore', country: 'Singapore' },
  { continent: 'Asia', value: 'Asia/Seoul', label: 'Seoul', country: 'South Korea' },
  { continent: 'Asia', value: 'Asia/Bangkok', label: 'Bangkok', country: 'Thailand' },
  { continent: 'Asia', value: 'Asia/Jakarta', label: 'Jakarta', country: 'Indonesia' },
  { continent: 'Asia', value: 'Asia/Manila', label: 'Manila', country: 'Philippines' },
  { continent: 'Asia', value: 'Asia/Karachi', label: 'Karachi', country: 'Pakistan' },
  { continent: 'Asia', value: 'Asia/Dhaka', label: 'Dhaka', country: 'Bangladesh' },
  { continent: 'Asia', value: 'Asia/Tehran', label: 'Tehran', country: 'Iran' },
  { continent: 'Asia', value: 'Asia/Baghdad', label: 'Baghdad', country: 'Iraq' },
  { continent: 'Asia', value: 'Asia/Riyadh', label: 'Riyadh', country: 'Saudi Arabia' },
  { continent: 'Asia', value: 'Asia/Jerusalem', label: 'Jerusalem', country: 'Israel' },
  { continent: 'Asia', value: 'Asia/Kabul', label: 'Kabul', country: 'Afghanistan' },
  { continent: 'Asia', value: 'Asia/Kathmandu', label: 'Kathmandu', country: 'Nepal' },
  { continent: 'Asia', value: 'Asia/Yangon', label: 'Yangon', country: 'Myanmar' },
  { continent: 'Asia', value: 'Asia/Colombo', label: 'Colombo', country: 'Sri Lanka' },
  { continent: 'Asia', value: 'Asia/Kuala_Lumpur', label: 'Kuala Lumpur', country: 'Malaysia' },
  { continent: 'Asia', value: 'Asia/Ho_Chi_Minh', label: 'Ho Chi Minh', country: 'Vietnam' },
  { continent: 'Asia', value: 'Asia/Taipei', label: 'Taipei', country: 'Taiwan' },
  
  // Europe
  { continent: 'Europe', value: 'Europe/London', label: 'London', country: 'UK' },
  { continent: 'Europe', value: 'Europe/Paris', label: 'Paris', country: 'France' },
  { continent: 'Europe', value: 'Europe/Berlin', label: 'Berlin', country: 'Germany' },
  { continent: 'Europe', value: 'Europe/Rome', label: 'Rome', country: 'Italy' },
  { continent: 'Europe', value: 'Europe/Madrid', label: 'Madrid', country: 'Spain' },
  { continent: 'Europe', value: 'Europe/Amsterdam', label: 'Amsterdam', country: 'Netherlands' },
  { continent: 'Europe', value: 'Europe/Brussels', label: 'Brussels', country: 'Belgium' },
  { continent: 'Europe', value: 'Europe/Vienna', label: 'Vienna', country: 'Austria' },
  { continent: 'Europe', value: 'Europe/Zurich', label: 'Zurich', country: 'Switzerland' },
  { continent: 'Europe', value: 'Europe/Stockholm', label: 'Stockholm', country: 'Sweden' },
  { continent: 'Europe', value: 'Europe/Oslo', label: 'Oslo', country: 'Norway' },
  { continent: 'Europe', value: 'Europe/Copenhagen', label: 'Copenhagen', country: 'Denmark' },
  { continent: 'Europe', value: 'Europe/Helsinki', label: 'Helsinki', country: 'Finland' },
  { continent: 'Europe', value: 'Europe/Athens', label: 'Athens', country: 'Greece' },
  { continent: 'Europe', value: 'Europe/Istanbul', label: 'Istanbul', country: 'Turkey' },
  { continent: 'Europe', value: 'Europe/Moscow', label: 'Moscow', country: 'Russia' },
  { continent: 'Europe', value: 'Europe/Warsaw', label: 'Warsaw', country: 'Poland' },
  { continent: 'Europe', value: 'Europe/Prague', label: 'Prague', country: 'Czech Republic' },
  { continent: 'Europe', value: 'Europe/Budapest', label: 'Budapest', country: 'Hungary' },
  { continent: 'Europe', value: 'Europe/Bucharest', label: 'Bucharest', country: 'Romania' },
  { continent: 'Europe', value: 'Europe/Dublin', label: 'Dublin', country: 'Ireland' },
  { continent: 'Europe', value: 'Europe/Lisbon', label: 'Lisbon', country: 'Portugal' },
  
  // North America
  { continent: 'North America', value: 'America/New_York', label: 'New York', country: 'USA' },
  { continent: 'North America', value: 'America/Los_Angeles', label: 'Los Angeles', country: 'USA' },
  { continent: 'North America', value: 'America/Chicago', label: 'Chicago', country: 'USA' },
  { continent: 'North America', value: 'America/Denver', label: 'Denver', country: 'USA' },
  { continent: 'North America', value: 'America/Phoenix', label: 'Phoenix', country: 'USA' },
  { continent: 'North America', value: 'America/Toronto', label: 'Toronto', country: 'Canada' },
  { continent: 'North America', value: 'America/Vancouver', label: 'Vancouver', country: 'Canada' },
  { continent: 'North America', value: 'America/Mexico_City', label: 'Mexico City', country: 'Mexico' },
  { continent: 'North America', value: 'America/Havana', label: 'Havana', country: 'Cuba' },
  { continent: 'North America', value: 'America/Jamaica', label: 'Kingston', country: 'Jamaica' },
  { continent: 'North America', value: 'America/Anchorage', label: 'Anchorage', country: 'USA' },
  { continent: 'North America', value: 'Pacific/Honolulu', label: 'Honolulu', country: 'USA' },
  
  // South America
  { continent: 'South America', value: 'America/Sao_Paulo', label: 'São Paulo', country: 'Brazil' },
  { continent: 'South America', value: 'America/Buenos_Aires', label: 'Buenos Aires', country: 'Argentina' },
  { continent: 'South America', value: 'America/Santiago', label: 'Santiago', country: 'Chile' },
  { continent: 'South America', value: 'America/Lima', label: 'Lima', country: 'Peru' },
  { continent: 'South America', value: 'America/Bogota', label: 'Bogotá', country: 'Colombia' },
  { continent: 'South America', value: 'America/Caracas', label: 'Caracas', country: 'Venezuela' },
  { continent: 'South America', value: 'America/Montevideo', label: 'Montevideo', country: 'Uruguay' },
  
  // Oceania
  { continent: 'Oceania', value: 'Australia/Sydney', label: 'Sydney', country: 'Australia' },
  { continent: 'Oceania', value: 'Australia/Melbourne', label: 'Melbourne', country: 'Australia' },
  { continent: 'Oceania', value: 'Australia/Brisbane', label: 'Brisbane', country: 'Australia' },
  { continent: 'Oceania', value: 'Australia/Perth', label: 'Perth', country: 'Australia' },
  { continent: 'Oceania', value: 'Pacific/Auckland', label: 'Auckland', country: 'New Zealand' },
  { continent: 'Oceania', value: 'Pacific/Fiji', label: 'Fiji', country: 'Fiji' },
  { continent: 'Oceania', value: 'Pacific/Guam', label: 'Guam', country: 'Guam' },
  
  // UTC & Other
  { continent: 'Other', value: 'UTC', label: 'UTC', country: 'Universal' },
  { continent: 'Other', value: 'Atlantic/Reykjavik', label: 'Reykjavik', country: 'Iceland' },
];

export default function WorldClock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [temp, setTemp] = useState(null);
  const [theme, setTheme] = useState(THEMES[0]);
  const [showSettings, setShowSettings] = useState(false);
  const [format24h, setFormat24h] = useState(false);
  const [showSeconds, setShowSeconds] = useState(true);
  const [selectedTimezones, setSelectedTimezones] = useState([
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo'
  ]);
  const [customTheme, setCustomTheme] = useState({
    bg1: '#1e3a8a',
    bg2: '#1e40af',
    bg3: '#0ea5e9',
    text: '#ffffff'
  });
  const [useCustomTheme, setUseCustomTheme] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('All');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const updateTemp = () => {
      const simTemp = Math.floor(Math.random() * 20) + 15;
      setTemp(simTemp);
    };
    
    updateTemp();
    const tempTimer = setInterval(updateTemp, 60000);

    return () => {
      clearInterval(timer);
      clearInterval(tempTimer);
    };
  }, []);

  const formatTime = (date, timezone, show24h, showSec) => {
    const options = {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      ...(showSec && { second: '2-digit' }),
      hour12: !show24h
    };
    return date.toLocaleTimeString('en-US', options);
  };

  const formatDate = (date, timezone) => {
    const options = {
      timeZone: timezone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const getLocalTimezone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  };

  const toggleTimezone = (tz) => {
    if (selectedTimezones.includes(tz)) {
      if (selectedTimezones.length > 2) {
        setSelectedTimezones(selectedTimezones.filter(t => t !== tz));
      }
    } else {
      if (selectedTimezones.length < 3) {
        setSelectedTimezones([...selectedTimezones, tz]);
      }
    }
  };

  const downloadAsDesktopApp = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>World Clock</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { margin: 0; overflow: hidden; }
  </style>
</head>
<body>
  <div id="app">
    <div class="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 text-white p-4 flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-6xl font-bold mb-4" id="time"></h1>
        <p class="text-2xl mb-2" id="date"></p>
        <p class="text-xl opacity-80" id="timezone"></p>
      </div>
    </div>
  </div>
  <script>
    function updateClock() {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      const tzStr = Intl.DateTimeFormat().resolvedOptions().timeZone;
      document.getElementById('time').textContent = timeStr;
      document.getElementById('date').textContent = dateStr;
      document.getElementById('timezone').textContent = tzStr;
    }
    updateClock();
    setInterval(updateClock, 1000);
  </script>
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'world-clock.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const continents = ['All', ...new Set(ALL_TIMEZONES.map(tz => tz.continent))];
  
  const filteredTimezones = ALL_TIMEZONES.filter(tz => {
    const matchesContinent = selectedContinent === 'All' || tz.continent === selectedContinent;
    const matchesSearch = searchQuery === '' || 
      tz.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tz.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesContinent && matchesSearch;
  });

  const currentTheme = useCustomTheme ? {
    name: 'Custom',
    bg: `bg-gradient-to-br`,
    text: customTheme.text === '#ffffff' ? 'text-white' : 'text-gray-900',
    accent: 'bg-blue-500'
  } : theme;

  const bgStyle = useCustomTheme ? {
    background: `linear-gradient(to bottom right, ${customTheme.bg1}, ${customTheme.bg2}, ${customTheme.bg3})`
  } : {};

  const isDarkTheme = currentTheme.text === 'text-white';

  return (
    <div 
      className={`min-h-screen ${useCustomTheme ? '' : `bg-gradient-to-br ${currentTheme.bg}`} ${currentTheme.text} p-3 sm:p-6 flex items-center justify-center`}
      style={bgStyle}
    >
      <div className="max-w-6xl w-full">
        {/* Header with Settings and Download */}
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <button
            onClick={downloadAsDesktopApp}
            className={`p-2 sm:p-3 rounded-full ${isDarkTheme ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'} transition-all flex items-center gap-2 text-sm sm:text-base`}
            title="Download as standalone HTML file"
          >
            <Download size={20} className="sm:w-6 sm:h-6" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 sm:p-3 rounded-full ${isDarkTheme ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'} transition-all`}
          >
            {showSettings ? <X size={20} className="sm:w-6 sm:h-6" /> : <Settings size={20} className="sm:w-6 sm:h-6" />}
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className={`${isDarkTheme ? 'bg-white/10' : 'bg-black/10'} backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 max-h-[70vh] overflow-y-auto`}>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Settings</h3>
            
            {/* Theme Selection */}
            <div className="mb-4 sm:mb-6">
              <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Preset Themes</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {THEMES.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => {
                      setTheme(t);
                      setUseCustomTheme(false);
                    }}
                    className={`p-2 sm:p-3 rounded-lg bg-gradient-to-br ${t.bg} ${theme.name === t.name && !useCustomTheme ? 'ring-2 sm:ring-4 ring-white' : ''} transition-all text-xs sm:text-base`}
                  >
                    <span className={t.text}>{t.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Theme */}
            <div className="mb-4 sm:mb-6">
              <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Custom Theme</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                <div>
                  <label className="block text-xs sm:text-sm mb-1">Color 1</label>
                  <input
                    type="color"
                    value={customTheme.bg1}
                    onChange={(e) => setCustomTheme({...customTheme, bg1: e.target.value})}
                    className="w-full h-8 sm:h-10 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm mb-1">Color 2</label>
                  <input
                    type="color"
                    value={customTheme.bg2}
                    onChange={(e) => setCustomTheme({...customTheme, bg2: e.target.value})}
                    className="w-full h-8 sm:h-10 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm mb-1">Color 3</label>
                  <input
                    type="color"
                    value={customTheme.bg3}
                    onChange={(e) => setCustomTheme({...customTheme, bg3: e.target.value})}
                    className="w-full h-8 sm:h-10 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm mb-1">Text</label>
                  <select
                    value={customTheme.text}
                    onChange={(e) => setCustomTheme({...customTheme, text: e.target.value})}
                    className="w-full h-8 sm:h-10 rounded px-2 bg-white/20 text-xs sm:text-base"
                  >
                    <option value="#ffffff">Light</option>
                    <option value="#000000">Dark</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => setUseCustomTheme(true)}
                className={`mt-2 sm:mt-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg ${isDarkTheme ? 'bg-white/20 hover:bg-white/30' : 'bg-black/20 hover:bg-black/30'} text-xs sm:text-base`}
              >
                Apply Custom Theme
              </button>
            </div>

            {/* Display Options */}
            <div className="mb-4 sm:mb-6">
              <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Display Options</h4>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-base">
                  <input
                    type="checkbox"
                    checked={format24h}
                    onChange={(e) => setFormat24h(e.target.checked)}
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  />
                  <span>24-hour format</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-base">
                  <input
                    type="checkbox"
                    checked={showSeconds}
                    onChange={(e) => setShowSeconds(e.target.checked)}
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  />
                  <span>Show seconds</span>
                </label>
              </div>
            </div>

            {/* Timezone Selection */}
            <div>
              <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">World Times (Select 2-3)</h4>
              
              {/* Search and Filter */}
              <div className="mb-3 sm:mb-4 space-y-2 sm:space-y-3">
                <div className="relative">
                  <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 opacity-50" />
                  <input
                    type="text"
                    placeholder="Search city or country..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-8 sm:pl-10 pr-3 py-1.5 sm:py-2 rounded-lg ${isDarkTheme ? 'bg-white/10' : 'bg-black/10'} text-xs sm:text-base`}
                  />
                </div>
                <div className="flex gap-1 sm:gap-2 flex-wrap">
                  {continents.map(continent => (
                    <button
                      key={continent}
                      onClick={() => setSelectedContinent(continent)}
                      className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm ${
                        selectedContinent === continent 
                          ? currentTheme.accent + ' text-white' 
                          : isDarkTheme ? 'bg-white/10' : 'bg-black/10'
                      }`}
                    >
                      {continent}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {filteredTimezones.map((tz) => (
                  <label key={tz.value} className="flex items-center gap-2 cursor-pointer text-xs sm:text-base">
                    <input
                      type="checkbox"
                      checked={selectedTimezones.includes(tz.value)}
                      onChange={() => toggleTimezone(tz.value)}
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      disabled={!selectedTimezones.includes(tz.value) && selectedTimezones.length >= 3}
                    />
                    <span className={!selectedTimezones.includes(tz.value) && selectedTimezones.length >= 3 ? 'opacity-50' : ''}>
                      {tz.label}, {tz.country}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Clock Display */}
        <div className={`${isDarkTheme ? 'bg-white/10' : 'bg-black/10'} backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl`}>
          {/* Local Time & Date */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
              <Clock size={24} className="sm:w-8 sm:h-8" />
              <h2 className="text-xl sm:text-2xl font-semibold">Local Time</h2>
            </div>
            <div className="text-4xl sm:text-5xl md:text-7xl font-bold mb-2 tabular-nums">
              {formatTime(currentTime, getLocalTimezone(), format24h, showSeconds)}
            </div>
            <div className="text-base sm:text-xl opacity-90">
              {formatDate(currentTime, getLocalTimezone())}
            </div>
          </div>

          {/* Temperature */}
          {temp !== null && (
            <div className={`${currentTheme.accent} bg-opacity-30 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 flex items-center justify-center gap-2 sm:gap-3`}>
              <Thermometer size={24} className="sm:w-7 sm:h-7" />
              <div>
                <div className="text-2xl sm:text-3xl font-bold">{temp}°C / {Math.round(temp * 9/5 + 32)}°F</div>
                <div className="text-xs sm:text-sm opacity-80">Device Temperature</div>
              </div>
            </div>
          )}

          {/* World Times */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {selectedTimezones.map((tz) => {
              const tzInfo = ALL_TIMEZONES.find(t => t.value === tz);
              return (
                <div key={tz} className={`${isDarkTheme ? 'bg-white/5' : 'bg-black/5'} rounded-lg sm:rounded-xl p-3 sm:p-4`}>
                  <div className="font-semibold mb-1 opacity-80 text-sm sm:text-base">{tzInfo?.label}</div>
                  <div className="text-2xl sm:text-3xl font-bold tabular-nums mb-1">
                    {formatTime(currentTime, tz, format24h, showSeconds)}
                  </div>
                  <div className="text-xs sm:text-sm opacity-70">
                    {formatDate(currentTime, tz).split(',')[0]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Day/Night Indicator */}
        <div className="flex justify-center mt-4 sm:mt-6 gap-2 items-center opacity-70 text-sm sm:text-base">
          {currentTime.getHours() >= 6 && currentTime.getHours() < 18 ? (
            <>
              <Sun size={16} className="sm:w-5 sm:h-5" />
              <span>Daytime</span>
            </>
          ) : (
            <>
              <Moon size={16} className="sm:w-5 sm:h-5" />
              <span>Nighttime</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
