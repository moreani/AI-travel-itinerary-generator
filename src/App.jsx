import { useState, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Plane, Sparkles, Clock, CheckCircle, User, ArrowLeft } from 'lucide-react';
import Hero from './components/Hero';
import ItineraryResult from './components/ItineraryResult';
import { generateMockItinerary } from './utils/mockData';
import './index.css';

// Check if API key is available
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const isMockMode = !API_KEY;

// How It Works Page Component
const HowItWorks = ({ onBack }) => (
  <div className="min-h-screen bg-white">
    <div className="max-w-4xl mx-auto px-4 py-16">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>

      <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
        How It Works
      </h1>
      <p className="text-xl text-gray-600 mb-12">
        Generate your perfect travel itinerary in three simple steps.
      </p>

      <div className="space-y-8">
        {/* Step 1 */}
        <div className="bg-content-gray rounded-soft p-8 flex gap-6 items-start">
          <div className="w-12 h-12 bg-lime-accent rounded-full flex items-center justify-center font-bold text-lg shrink-0">
            1
          </div>
          <div>
            <h3 className="text-xl font-bold text-black mb-2">Enter Your Destination</h3>
            <p className="text-gray-600">
              Type in any city, country, or region you want to explore. Whether it's Paris, Tokyo,
              the Swiss Alps, or a hidden gem — we've got you covered.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-content-gray rounded-soft p-8 flex gap-6 items-start">
          <div className="w-12 h-12 bg-lime-accent rounded-full flex items-center justify-center font-bold text-lg shrink-0">
            2
          </div>
          <div>
            <h3 className="text-xl font-bold text-black mb-2">Choose Your Duration</h3>
            <p className="text-gray-600">
              Select how many days you'll be traveling (1-14 days). The AI will craft activities
              for each day, perfectly paced so you experience the best without burnout.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-content-gray rounded-soft p-8 flex gap-6 items-start">
          <div className="w-12 h-12 bg-lime-accent rounded-full flex items-center justify-center font-bold text-lg shrink-0">
            3
          </div>
          <div>
            <h3 className="text-xl font-bold text-black mb-2">Get Your Itinerary</h3>
            <p className="text-gray-600">
              Click "Generate Itinerary" and let AI create a detailed day-by-day plan with morning,
              afternoon, and evening activities tailored to your destination.
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-black mb-8">What You Get</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6">
            <Clock className="w-10 h-10 mx-auto mb-4 text-lime-600" />
            <h4 className="font-semibold mb-2">Time-Optimized</h4>
            <p className="text-gray-600 text-sm">Activities organized by morning, afternoon, and evening</p>
          </div>
          <div className="text-center p-6">
            <Sparkles className="w-10 h-10 mx-auto mb-4 text-lime-600" />
            <h4 className="font-semibold mb-2">AI-Powered</h4>
            <p className="text-gray-600 text-sm">Smart recommendations based on your destination</p>
          </div>
          <div className="text-center p-6">
            <CheckCircle className="w-10 h-10 mx-auto mb-4 text-lime-600" />
            <h4 className="font-semibold mb-2">Instant Results</h4>
            <p className="text-gray-600 text-sm">Get your complete itinerary in seconds</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// About Page Component
const About = ({ onBack }) => (
  <div className="min-h-screen bg-white">
    <div className="max-w-4xl mx-auto px-4 py-16">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>

      <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
        About TripCraft
      </h1>

      <div className="prose prose-lg max-w-none">
        <div className="bg-content-gray rounded-soft p-8 mb-8">
          <p className="text-xl text-gray-700 leading-relaxed">
            TripCraft is an AI-powered travel planning tool designed to take the stress out of
            itinerary creation. Whether you're planning a weekend getaway or a two-week adventure,
            we help you make the most of every moment.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-black mt-12 mb-4">Our Mission</h2>
        <p className="text-gray-600 mb-6">
          We believe that planning a trip should be as exciting as the journey itself. Our mission
          is to democratize travel planning by providing instant, personalized itineraries that
          combine local insights with smart scheduling — all powered by cutting-edge AI technology.
        </p>

        <h2 className="text-2xl font-bold text-black mt-12 mb-4">How We're Different</h2>
        <div className="space-y-4 mb-8">
          <div className="flex gap-4 items-start">
            <div className="w-2 h-2 bg-lime-accent rounded-full mt-2 shrink-0"></div>
            <p className="text-gray-600">
              <strong className="text-black">No Sign-Up Required</strong> — Jump straight into planning without creating accounts or sharing personal data.
            </p>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-2 h-2 bg-lime-accent rounded-full mt-2 shrink-0"></div>
            <p className="text-gray-600">
              <strong className="text-black">Structured Output</strong> — Every itinerary is organized into clear morning, afternoon, and evening activities.
            </p>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-2 h-2 bg-lime-accent rounded-full mt-2 shrink-0"></div>
            <p className="text-gray-600">
              <strong className="text-black">AI That Understands Travel</strong> — Our AI considers pacing, local culture, and must-see attractions.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-black mt-12 mb-4">The Technology</h2>
        <p className="text-gray-600 mb-6">
          TripCraft is powered by Google's Gemini AI, one of the most advanced language models
          available. This enables us to generate contextually aware, creative, and practical
          travel suggestions for destinations around the world.
        </p>

        <div className="bg-lime-accent/20 border border-lime-accent rounded-soft p-6 mt-8">
          <div className="flex items-center gap-3 mb-2">
            <User className="w-5 h-5" />
            <h3 className="font-bold text-black">Created with Passion</h3>
          </div>
          <p className="text-gray-700">
            This project is a demonstration of modern web development and AI integration,
            built to inspire travelers and developers alike.
          </p>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(3);
  const [itinerary, setItinerary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState('home');
  const resultRef = useRef(null);

  const scrollToResults = () => {
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const generateWithGemini = async () => {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash' });

    const prompt = `Create a ${days} day travel itinerary for ${destination}. 
    
    Return ONLY a valid JSON array with no markdown formatting or code blocks. Each day should have this exact structure:
    [
      {
        "day": 1,
        "title": "Day 1 in ${destination}",
        "activities": {
          "morning": "Description of morning activity",
          "afternoon": "Description of afternoon activity",
          "evening": "Description of evening activity"
        }
      }
    ]
    
    Make the activities specific, interesting, and relevant to ${destination}. Include famous landmarks, local cuisine, and cultural experiences.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean up the response - remove markdown code blocks if present
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    return JSON.parse(text);
  };

  const handleGenerate = async () => {
    if (!destination.trim()) {
      setError('Please enter a destination');
      return;
    }

    setIsLoading(true);
    setError('');
    setItinerary(null);

    try {
      let result;

      if (isMockMode) {
        // Simulate API delay for demo
        await new Promise(resolve => setTimeout(resolve, 1500));
        result = generateMockItinerary(destination, days);
      } else {
        result = await generateWithGemini();
      }

      setItinerary(result);
      scrollToResults();
    } catch (err) {
      console.error('Generation error:', err);
      setError(`Could not generate plan. (${err.message || 'Unknown error'})`);
    } finally {
      setIsLoading(false);
    }
  };

  const goHome = () => {
    setCurrentPage('home');
    setItinerary(null);
  };

  // Render page based on currentPage state
  if (currentPage === 'how-it-works') {
    return (
      <>
        <HowItWorks onBack={goHome} />
        <Footer />
      </>
    );
  }

  if (currentPage === 'about') {
    return (
      <>
        <About onBack={goHome} />
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={goHome}
            className="flex items-center gap-2 text-xl font-bold text-black tracking-tight hover:opacity-70 transition-opacity"
          >
            <Plane className="w-6 h-6 text-lime-600" />
            tripcraft
          </button>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <button
              onClick={() => setCurrentPage('how-it-works')}
              className="hover:text-black cursor-pointer transition-colors"
            >
              How it works
            </button>
            <button
              onClick={() => setCurrentPage('about')}
              className="hover:text-black cursor-pointer transition-colors"
            >
              About
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Hero
          destination={destination}
          setDestination={setDestination}
          days={days}
          setDays={setDays}
          onGenerate={handleGenerate}
          isLoading={isLoading}
          error={error}
          isMockMode={isMockMode}
        />

        {/* Results Section */}
        <div ref={resultRef}>
          <ItineraryResult itinerary={itinerary} destination={destination} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Footer Component
const Footer = () => (
  <footer className="py-8 px-4 border-t border-gray-100">
    <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
      <p>
        Created by <span className="font-semibold text-gray-700">Aniket More</span>{' '}
        <span className="text-red-500">❤️</span>
      </p>
    </div>
  </footer>
);

export default App;
