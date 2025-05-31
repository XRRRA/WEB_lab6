import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

function Navbar({ theme, setTheme }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/favorites', label: 'Favorites' },
        { path: '/create-team', label: 'Create Team' }
    ];

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-f1-red rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">F1</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
              Formula 1 Hub
            </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                    isActive(link.path)
                                        ? 'bg-f1-red text-white'
                                        : 'text-gray-700 dark:text-gray-300 hover:text-f1-red dark:hover:text-f1-red'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <ThemeToggle theme={theme} setTheme={setTheme} />
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <ThemeToggle theme={theme} setTheme={setTheme} />
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-700 dark:text-gray-300 hover:text-f1-red focus:outline-none focus:text-f1-red"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                                        isActive(link.path)
                                            ? 'bg-f1-red text-white'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-f1-red dark:hover:text-f1-red'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;