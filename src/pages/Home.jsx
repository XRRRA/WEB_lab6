import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Flag, Users, Car, Star } from 'lucide-react';

// Mock data for demonstration
const defaultTeams = [
    { id: '1', name: 'Mercedes', country: 'Germany', key: 'mercedes', drivers: ['ham', 'rus'] },
    { id: '2', name: 'Red Bull Racing', country: 'Austria', key: 'redBull', drivers: ['ver', 'per'] },
    { id: '3', name: 'Ferrari', country: 'Italy', key: 'ferrari', drivers: ['lec', 'sai'] },
    { id: '4', name: 'McLaren', country: 'UK', key: 'mclaren', drivers: ['nor', 'pia'] },
    { id: '5', name: 'Alpine', country: 'France', key: 'alpine', drivers: ['oco', 'gas'] },
    { id: '6', name: 'Aston Martin', country: 'UK', key: 'astonMartin', drivers: ['alo', 'str'] }
];

const defaultDrivers = [
    { id: 'ham', name: 'Lewis Hamilton', nationality: 'British', teamId: '1', number: 44 },
    { id: 'rus', name: 'George Russell', nationality: 'British', teamId: '1', number: 63 },
    { id: 'ver', name: 'Max Verstappen', nationality: 'Dutch', teamId: '2', number: 1 },
    { id: 'per', name: 'Sergio Pérez', nationality: 'Mexican', teamId: '2', number: 11 },
    { id: 'lec', name: 'Charles Leclerc', nationality: 'Monégasque', teamId: '3', number: 16 },
    { id: 'sai', name: 'Carlos Sainz', nationality: 'Spanish', teamId: '3', number: 55 }
];

const teamColors = {
    mercedes: 'from-cyan-400 to-teal-600',
    redBull: 'from-blue-600 to-navy-800',
    ferrari: 'from-red-500 to-red-700',
    mclaren: 'from-orange-400 to-orange-600',
    alpine: 'from-blue-400 to-blue-600',
    astonMartin: 'from-green-400 to-green-600'
};

function Home({ teams = defaultTeams, drivers = defaultDrivers, favoriteTeams = [], favoriteDrivers = [], toggleFavoriteTeam = () => {}, toggleFavoriteDriver = () => {} }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [activeTab, setActiveTab] = useState('teams');
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const featuredTeams = teams.slice(0, 3);
    const stats = {
        totalTeams: teams.length,
        totalDrivers: drivers.length,
        favoriteTeams: favoriteTeams.length,
        favoriteDrivers: favoriteDrivers.length
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % featuredTeams.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [featuredTeams.length]);

    const filteredTeams = teams.filter(team =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredDrivers = drivers.filter(driver =>
        driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.nationality.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-red-900 to-black">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 border-4 border-red-500 border-t-transparent rounded-full"
                />
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="ml-4 text-2xl font-bold text-white"
                >
                    Loading F1 Data...
                </motion.h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
            {/* Hero Section with Carousel - Full Width */}
            <section className="relative h-96 w-full overflow-hidden bg-gradient-to-r from-red-600 via-red-500 to-orange-500">
                <div className="absolute inset-0 bg-black bg-opacity-40" />
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="text-center text-white z-10">
                            <motion.h1
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-6xl font-bold mb-4 tracking-wider"
                            >
                                FORMULA 1
                            </motion.h1>
                            <motion.p
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-2xl mb-8 font-light"
                            >
                                Experience the Speed, Feel the Passion
                            </motion.p>
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="flex gap-4 justify-center"
                            >
                                <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                                    Explore Teams
                                </button>
                                <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                                    My Favorites
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Carousel Navigation */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {featuredTeams.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                            }`}
                        />
                    ))}
                </div>

                {/* Geometric Background Elements */}
                <div className="absolute top-10 right-10 w-32 h-32 border-4 border-white border-opacity-20 rotate-45 animate-pulse" />
                <div className="absolute bottom-10 left-10 w-24 h-24 bg-white bg-opacity-10 rounded-full animate-bounce" />
            </section>

            {/* Stats Section - Full Width */}
            <section className="py-16 w-full bg-white dark:bg-gray-800">
                <div className="px-8">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto"
                    >
                        {[
                            { icon: Users, label: 'Teams', value: stats.totalTeams, color: 'text-blue-500' },
                            { icon: Car, label: 'Drivers', value: stats.totalDrivers, color: 'text-green-500' },
                            { icon: Heart, label: 'Favorite Teams', value: stats.favoriteTeams, color: 'text-red-500' },
                            { icon: Star, label: 'Favorite Drivers', value: stats.favoriteDrivers, color: 'text-yellow-500' }
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                                <stat.icon className={`text-4xl mx-auto mb-3 ${stat.color}`} />
                                <div className="text-3xl font-bold text-gray-800 dark:text-white">{stat.value}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Search and Tabs Section - Full Width */}
            <section className="py-16 w-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                <div className="px-8">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="w-full"
                    >
                        {/* Search Bar */}
                        <div className="mb-8 relative max-w-4xl mx-auto">
                            <input
                                type="text"
                                placeholder="Search teams, drivers, or countries..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-4 pl-12 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-red-500 focus:outline-none shadow-lg text-lg"
                            />
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex justify-center mb-8">
                            <div className="bg-white dark:bg-gray-700 p-1 rounded-full shadow-lg">
                                {['teams', 'drivers'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 capitalize ${
                                            activeTab === tab
                                                ? 'bg-red-500 text-white shadow-lg'
                                                : 'text-gray-600 dark:text-gray-300 hover:text-red-500'
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Teams Grid - Full Width */}
                        <AnimatePresence mode="wait">
                            {activeTab === 'teams' && (
                                <motion.div
                                    key="teams"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
                                >
                                    {filteredTeams.map((team, index) => (
                                        <motion.div
                                            key={team.id}
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                                        >
                                            <div className={`h-48 bg-gradient-to-br ${teamColors[team.key]} relative`}>
                                                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300" />

                                                {/* Favorite Button */}
                                                <button
                                                    onClick={() => toggleFavoriteTeam(team.id)}
                                                    className="absolute top-4 right-4 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300"
                                                >
                                                    {favoriteTeams.includes(team.id) ? (
                                                        <Heart className="text-red-500 text-xl fill-current" />
                                                    ) : (
                                                        <Heart className="text-white text-xl" />
                                                    )}
                                                </button>

                                                {/* Team Info */}
                                                <div className="absolute bottom-4 left-4 text-white">
                                                    <h3 className="text-2xl font-bold mb-1">{team.name}</h3>
                                                    <p className="text-sm opacity-90 flex items-center">
                                                        <Flag className="mr-2 w-4 h-4" />
                                                        {team.country}
                                                    </p>
                                                </div>

                                                {/* Decorative Elements */}
                                                <div className="absolute top-4 left-4 w-12 h-12 border-2 border-white border-opacity-50 rounded-full animate-pulse" />
                                                <div className="absolute bottom-4 right-4 w-8 h-8 bg-white bg-opacity-20 rotate-45" />
                                            </div>

                                            {/* Team Details */}
                                            <div className="p-6 bg-white dark:bg-gray-800">
                                                <div className="flex justify-between items-center mb-3">
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        {team.drivers.length} Drivers
                                                    </span>
                                                    <button className="text-red-500 hover:text-red-600 font-semibold text-sm">
                                                        View Details →
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}

                            {/* Drivers Grid - Full Width */}
                            {activeTab === 'drivers' && (
                                <motion.div
                                    key="drivers"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
                                >
                                    {filteredDrivers.map((driver, index) => {
                                        const team = teams.find(t => t.id === driver.teamId);
                                        return (
                                            <motion.div
                                                key={driver.id}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden"
                                            >
                                                <div className="relative p-6">
                                                    {/* Driver Number */}
                                                    <div className="absolute top-4 right-4 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                        {driver.number}
                                                    </div>

                                                    {/* Favorite Button */}
                                                    <button
                                                        onClick={() => toggleFavoriteDriver(driver.id)}
                                                        className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                                                    >
                                                        {favoriteDrivers.includes(driver.id) ? (
                                                            <Heart className="text-red-500 text-xl fill-current" />
                                                        ) : (
                                                            <Heart className="text-gray-400 text-xl" />
                                                        )}
                                                    </button>

                                                    <div className="mt-8">
                                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                                            {driver.name}
                                                        </h3>
                                                        <p className="text-gray-600 dark:text-gray-400 mb-3 flex items-center">
                                                            <Flag className="mr-2 w-4 h-4" />
                                                            {driver.nationality}
                                                        </p>
                                                        {team && (
                                                            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${teamColors[team.key]}`}>
                                                                {team.name}
                                                            </div>
                                                        )}
                                                        <div className="mt-4">
                                                            <button className="text-red-500 hover:text-red-600 font-semibold text-sm">
                                                                View Profile →
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Call to Action - Full Width */}
            <section className="py-20 w-full bg-gradient-to-r from-red-600 via-red-500 to-orange-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20" />
                <div className="px-8 text-center relative z-10">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-white"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Ready to Create Your Own Team?
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Build your dream F1 team with custom drivers and compete in the championship of your imagination.
                        </p>
                        <button className="inline-block bg-white text-red-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl">
                            Create Your Team
                        </button>
                    </motion.div>
                </div>

                {/* Animated Background Elements */}
                <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white border-opacity-30 rounded-full animate-ping" />
                <div className="absolute bottom-10 right-10 w-16 h-16 bg-white bg-opacity-10 rotate-45 animate-bounce" />
                <div className="absolute top-1/2 left-1/4 w-24 h-24 border-4 border-white border-opacity-20 rotate-45 animate-pulse" />
            </section>
        </div>
    );
}

export default Home;