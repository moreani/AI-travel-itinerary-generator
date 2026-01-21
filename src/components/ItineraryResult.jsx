import { Sun, CloudSun, Moon, MapPin } from 'lucide-react';

const ItineraryResult = ({ itinerary, destination }) => {
    if (!itinerary || itinerary.length === 0) return null;

    const timeIcons = {
        morning: <Sun className="w-5 h-5 text-amber-500" />,
        afternoon: <CloudSun className="w-5 h-5 text-orange-500" />,
        evening: <Moon className="w-5 h-5 text-indigo-500" />,
    };

    const timeLabels = {
        morning: 'Morning',
        afternoon: 'Afternoon',
        evening: 'Evening',
    };

    return (
        <section className="px-4 py-16 max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-accent rounded-pill mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">{destination}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-black">
                    Your {itinerary.length}-Day Itinerary
                </h2>
                <p className="text-gray-600 mt-2">
                    Here's your personalized travel plan
                </p>
            </div>

            {/* Itinerary Cards */}
            <div className="space-y-6">
                {itinerary.map((day, index) => (
                    <div
                        key={day.day}
                        className={`bg-content-gray rounded-soft p-6 md:p-8 opacity-0 animate-fade-in-up stagger-${Math.min(index + 1, 5)}`}
                    >
                        {/* Day Header */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
                                {day.day}
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-black">
                                {day.title}
                            </h3>
                        </div>

                        {/* Activities Grid */}
                        <div className="grid md:grid-cols-3 gap-4">
                            {['morning', 'afternoon', 'evening'].map((time) => (
                                <div
                                    key={time}
                                    className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        {timeIcons[time]}
                                        <span className="font-semibold text-gray-800 capitalize">
                                            {timeLabels[time]}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">
                                        {day.activities[time]}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Note */}
            <div className="text-center mt-12">
                <p className="text-gray-400 text-sm">
                    ✨ This itinerary was generated with AI. Adjust activities based on your preferences and local conditions.
                </p>
            </div>
        </section>
    );
};

export default ItineraryResult;
