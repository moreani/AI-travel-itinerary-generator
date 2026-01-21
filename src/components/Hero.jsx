import { MapPin, Calendar, Loader2 } from 'lucide-react';

const Hero = ({
    destination,
    setDestination,
    days,
    setDays,
    onGenerate,
    isLoading,
    error,
    isMockMode
}) => {
    const isValid = destination.trim() !== '' && days >= 1 && days <= 14;

    const handleDaysChange = (e) => {
        let value = parseInt(e.target.value) || 1;
        if (value > 14) value = 14;
        if (value < 1) value = 1;
        setDays(value);
    };

    return (
        <section className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h1 className="text-5xl md:text-7xl font-bold text-black leading-tight mb-6">
                    Plan your perfect
                    <br />
                    <span className="text-gray-800">trip.</span>
                </h1>
                <p className="text-gray-600 text-lg md:text-xl max-w-xl mx-auto">
                    Generate a personalized day-by-day travel itinerary with AI —
                    morning, afternoon, and evening activities crafted just for you.
                </p>
            </div>

            {/* Mock Mode Badge */}
            {isMockMode && (
                <div className="mb-6 px-4 py-2 bg-amber-100 border border-amber-300 rounded-full text-amber-800 text-sm font-medium">
                    ⚡ Demo Mode — Using sample data (no API key configured)
                </div>
            )}

            {/* Input Form */}
            <div className="w-full max-w-2xl mx-auto">
                <div className="bg-content-gray rounded-soft p-6 md:p-8 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Destination Input */}
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Destination
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    placeholder="Paris, Tokyo, New York..."
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-lime-accent focus:border-transparent text-gray-900 placeholder-gray-400 transition-all"
                                />
                            </div>
                        </div>

                        {/* Days Input */}
                        <div className="w-full md:w-32">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Days
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="number"
                                    value={days}
                                    onChange={handleDaysChange}
                                    min="1"
                                    max="14"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-lime-accent focus:border-transparent text-gray-900 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Generate Button */}
                    <button
                        onClick={onGenerate}
                        disabled={!isValid || isLoading}
                        className={`w-full mt-6 py-4 px-8 rounded-pill font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3
              ${isValid && !isLoading
                                ? 'bg-lime-accent text-black hover:bg-opacity-80 hover:shadow-lg hover:scale-[1.02] cursor-pointer'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Generating your itinerary...
                            </>
                        ) : (
                            'Generate Itinerary'
                        )}
                    </button>

                    {/* Error Message */}
                    {error && (
                        <p className="mt-4 text-center text-red-600 font-medium">
                            {error}
                        </p>
                    )}
                </div>

                {/* Helper Text */}
                <p className="text-center text-gray-400 text-sm mt-4">
                    Enter any destination and number of days (1-14) to get started
                </p>
            </div>
        </section>
    );
};

export default Hero;
