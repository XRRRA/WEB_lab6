import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Flag, Users, Car, Star, Search, X } from 'lucide-react';

const teamColors = {
    mercedes: 'from-cyan-400 to-teal-600',
    redBull: 'from-blue-600 to-navy-800',
    ferrari: 'from-red-500 to-red-700',
    mclaren: 'from-orange-400 to-orange-600',
    alpine: 'from-blue-400 to-blue-600',
    astonMartin: 'from-green-400 to-green-600',
    williams: 'from-blue-400 to-blue-600',
    alphaTauri: 'from-gray-600 to-blue-800',
    alfaRomeo: 'from-red-800 to-red-900',
    haas: 'from-gray-400 to-gray-600'
};

function Home({ teams = [], drivers = [], favoriteTeams = [], favoriteDrivers = [], toggleFavoriteTeam = () => {}, toggleFavoriteDriver = () => {} }) {
    const navigate = useNavigate();
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
        if (featuredTeams.length > 0) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % featuredTeams.length);
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [featuredTeams.length]);

    // Enhanced search with memoization for better performance
    const filteredTeams = useMemo(() => {
        if (!searchTerm.trim()) return teams;

        const searchLower = searchTerm.toLowerCase().trim();
        return teams.filter(team => {
            const nameMatch = team.name?.toLowerCase().includes(searchLower);
            const countryMatch = team.country?.toLowerCase().includes(searchLower);
            const keyMatch = team.key?.toLowerCase().includes(searchLower);

            // Also search through team drivers
            const teamDrivers = drivers.filter(driver => driver.teamId === team.id);
            const driverMatch = teamDrivers.some(driver =>
                driver.name?.toLowerCase().includes(searchLower) ||
                driver.nationality?.toLowerCase().includes(searchLower)
            );

            return nameMatch || countryMatch || keyMatch || driverMatch;
        });
    }, [teams, drivers, searchTerm]);

    const filteredDrivers = useMemo(() => {
        if (!searchTerm.trim()) return drivers;

        const searchLower = searchTerm.toLowerCase().trim();
        return drivers.filter(driver => {
            const nameMatch = driver.name?.toLowerCase().includes(searchLower);
            const nationalityMatch = driver.nationality?.toLowerCase().includes(searchLower);
            const numberMatch = driver.number?.toString().includes(searchTerm.trim());

            // Also search by team name
            const team = teams.find(t => t.id === driver.teamId);
            const teamMatch = team?.name?.toLowerCase().includes(searchLower) ||
                team?.country?.toLowerCase().includes(searchLower);

            return nameMatch || nationalityMatch || numberMatch || teamMatch;
        });
    }, [drivers, teams, searchTerm]);

    // Get search suggestions
    const searchSuggestions = useMemo(() => {
        if (!searchTerm.trim() || searchTerm.length < 2) return [];

        const suggestions = new Set();
        const searchLower = searchTerm.toLowerCase();

        // Add team suggestions
        teams.forEach(team => {
            if (team.name?.toLowerCase().includes(searchLower)) {
                suggestions.add(team.name);
            }
            if (team.country?.toLowerCase().includes(searchLower)) {
                suggestions.add(team.country);
            }
        });

        // Add driver suggestions
        drivers.forEach(driver => {
            if (driver.name?.toLowerCase().includes(searchLower)) {
                suggestions.add(driver.name);
            }
            if (driver.nationality?.toLowerCase().includes(searchLower)) {
                suggestions.add(driver.nationality);
            }
        });

        return Array.from(suggestions).slice(0, 5);
    }, [teams, drivers, searchTerm]);

    const scrollToTeams = () => {
        const teamsSection = document.getElementById('teams-section');
        if (teamsSection) {
            teamsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navigateToFavorites = () => {
        navigate('/favorites');
    };

    const navigateToCreateTeam = () => {
        navigate('/create-team');
    };

    const navigateToTeamDetails = (teamId) => {
        navigate(`/teams/${teamId}`);
    };

    const navigateToDriverDetails = (driverId) => {
        navigate(`/drivers/${driverId}`);
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion);
    };

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
                                <button
                                    onClick={scrollToTeams}
                                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    Explore Teams
                                </button>
                                <button
                                    onClick={navigateToFavorites}
                                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                                >
                                    My Favorites
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Carousel Navigation */}
                {featuredTeams.length > 0 && (
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
                )}

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
            <section id="teams-section" className="py-16 w-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                <div className="px-8">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="w-full"
                    >
                        {/* Enhanced Search Bar */}
                        <div className="mb-8 relative max-w-4xl mx-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search teams, drivers, countries, or driver numbers..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full p-4 pl-12 pr-12 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-red-500 focus:outline-none shadow-lg text-lg transition-all duration-300"
                                />
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                                {searchTerm && (
                                    <button
                                        onClick={clearSearch}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                )}
                            </div>

                            {/* Search Suggestions */}
                            {searchSuggestions.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-700 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 z-10"
                                >
                                    {searchSuggestions.map((suggestion, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                                        >
                                            <span className="text-gray-700 dark:text-gray-300">{suggestion}</span>
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        {/* Search Results Info */}
                        {searchTerm && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center mb-6"
                            >
                                <p className="text-gray-600 dark:text-gray-400">
                                    {activeTab === 'teams'
                                        ? `Found ${filteredTeams.length} team${filteredTeams.length !== 1 ? 's' : ''} matching "${searchTerm}"`
                                        : `Found ${filteredDrivers.length} driver${filteredDrivers.length !== 1 ? 's' : ''} matching "${searchTerm}"`
                                    }
                                </p>
                            </motion.div>
                        )}

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
                                        {tab} ({tab === 'teams' ? filteredTeams.length : filteredDrivers.length})
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
                                    {filteredTeams.length > 0 ? filteredTeams.map((team, index) => (
                                        <motion.div
                                            key={team.id}
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                                        >
                                            <div className={`h-48 bg-gradient-to-br ${teamColors[team.key] || 'from-gray-400 to-gray-600'} relative`}>
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
                                                        {team.drivers ? team.drivers.length : 0} Drivers
                                                    </span>
                                                    <button
                                                        onClick={() => navigateToTeamDetails(team.id)}
                                                        className="text-red-500 hover:text-red-600 font-semibold text-sm transition-colors duration-300"
                                                    >
                                                        View Details →
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )) : (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="col-span-full text-center py-12"
                                        >
                                            <Search className="mx-auto w-16 h-16 text-gray-400 mb-4" />
                                            <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">No teams found</p>
                                            <p className="text-gray-400 dark:text-gray-500 text-sm">
                                                Try searching for a different team name or country
                                            </p>
                                            {searchTerm && (
                                                <button
                                                    onClick={clearSearch}
                                                    className="mt-4 text-red-500 hover:text-red-600 font-medium"
                                                >
                                                    Clear search
                                                </button>
                                            )}
                                        </motion.div>
                                    )}
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
                                    {filteredDrivers.length > 0 ? filteredDrivers.map((driver, index) => {
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
                                                        {driver.number || '?'}
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
                                                            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${teamColors[team.key] || 'from-gray-400 to-gray-600'}`}>
                                                                {team.name}
                                                            </div>
                                                        )}
                                                        <div className="mt-4">
                                                            <button
                                                                onClick={() => navigateToDriverDetails(driver.id)}
                                                                className="text-red-500 hover:text-red-600 font-semibold text-sm transition-colors duration-300"
                                                            >
                                                                View Profile →
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    }) : (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="col-span-full text-center py-12"
                                        >
                                            <Search className="mx-auto w-16 h-16 text-gray-400 mb-4" />
                                            <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">No drivers found</p>
                                            <p className="text-gray-400 dark:text-gray-500 text-sm">
                                                Try searching for a different driver name, nationality, or team
                                            </p>
                                            {searchTerm && (
                                                <button
                                                    onClick={clearSearch}
                                                    className="mt-4 text-red-500 hover:text-red-600 font-medium"
                                                >
                                                    Clear search
                                                </button>
                                            )}
                                        </motion.div>
                                    )}
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
                        <button
                            onClick={navigateToCreateTeam}
                            className="inline-block bg-white text-red-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
                        >
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