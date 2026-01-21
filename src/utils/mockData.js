// Mock itinerary data for demo mode (when API key is not available)
export const generateMockItinerary = (destination, days) => {
    const activities = {
        morning: [
            `Explore the historic old town of ${destination}`,
            `Visit a famous local museum in ${destination}`,
            `Take a guided walking tour`,
            `Enjoy breakfast at a popular local café`,
            `Visit the main cathedral or temple`,
            `Explore the central market`,
            `Take a sunrise photography walk`,
        ],
        afternoon: [
            `Lunch at a traditional restaurant`,
            `Visit the most famous landmark`,
            `Take a scenic boat or bus tour`,
            `Explore local art galleries`,
            `Shop for souvenirs in the main district`,
            `Visit beautiful parks and gardens`,
            `Try local street food specialties`,
        ],
        evening: [
            `Dinner at a rooftop restaurant with views`,
            `Watch the sunset at a scenic viewpoint`,
            `Enjoy local nightlife and entertainment`,
            `Take an evening stroll along the promenade`,
            `Attend a cultural show or performance`,
            `Explore the night market`,
            `Relax at a local bar or lounge`,
        ],
    };

    const itinerary = [];

    for (let i = 0; i < days; i++) {
        itinerary.push({
            day: i + 1,
            title: `Day ${i + 1} in ${destination}`,
            activities: {
                morning: activities.morning[i % activities.morning.length],
                afternoon: activities.afternoon[i % activities.afternoon.length],
                evening: activities.evening[i % activities.evening.length],
            },
        });
    }

    return itinerary;
};
