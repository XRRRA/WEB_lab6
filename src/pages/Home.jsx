import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Home({
                  teams,
                  drivers,
                  favoriteTeams,
                  favoriteDrivers,
                  toggleFavoriteTeam,
                  toggleFavoriteDriver
              }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterFavorite, setFilterFavorite] = useState('all');
    const navigate = useNavigate();
    const filteredTeams = teams.filter((team) => {
        const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase());
        const isFav = favoriteTeams.includes(team.id);
        if (filterFavorite === 'favorite') {
            return matchesSearch && isFav;
        }
        return matchesSearch;
    });

    const teamlessDrivers = drivers.filter((driver) => driver.teamId === null);

    const handleDriverClick = (driverId) => {
        navigate(`/drivers/${driverId}`);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Formula 1 Teams & Drivers
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                    Explore F1 teams, mark your favorites, and discover drivers without a team
                </p>
            </div>

            {/* Search & Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                {/* Search */}
                <div className="flex-1 w-full sm:max-w-md">
                    <label htmlFor="search" className="sr-only">Search teams</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            id="search"
                            type="text"
                            placeholder="Search teams..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-field pl-10"
                        />
                    </div>
                </div>

                {/* Favorite Filter */}
                <div className="flex items-center space-x-4">
                    <label htmlFor="filter" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Filter:
                    </label>
                    <select
                        id="filter"
                        value={filterFavorite}
                        onChange={(e) => setFilterFavorite(e.target.value)}
                        className="input-field w-auto min-w-[120px]"
                    >
                        <option value="all">All Teams</option>
                        <option value="favorite">Favorites Only</option>
                    </select>
                </div>
            </div>

            {/* Results Summary */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredTeams.length} of {teams.length} teams
                {searchTerm && ` matching "${searchTerm}"`}
                {filterFavorite === 'favorite' && ' (favorites only)'}
            </div>

            {/* Teams Grid */}
            {filteredTeams.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                        <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.004-5.824-2.709M15 9a6 6 0 11-12 0 6 6 0 0112 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No teams found</h3>
                    <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter settings.</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredTeams.map((team) => (
                        <div key={team.id} className="card">
                            {/* Team Header */}
                            <div className="flex justify-between items-center mb-3">
                                <Link to={`/teams/${team.id}`} className="text-2xl font-semibold text-gray-900 dark:text-white hover:underline">
                                    {team.name}
                                </Link>
                                <button
                                    onClick={() => toggleFavoriteTeam(team.id)}
                                    className="focus:outline-none"
                                    aria-label={favoriteTeams.includes(team.id) ? 'Unfavorite team' : 'Favorite team'}
                                >
                                    {favoriteTeams.includes(team.id) ? (
                                        <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.373 2.455a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118L10 13.348l-3.373 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.637 9.393c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6 text-gray-300 hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.373 2.455a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118L12 13.348l-3.373 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L3.637 9.393c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L11.049 2.927z" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            {/* Drivers List */}
                            <div className="space-y-2">
                                {team.drivers.map((driverId) => {
                                    const driver = drivers.find((d) => d.id === driverId);
                                    if (!driver) return null;

                                    const isDriverFav = favoriteDrivers.includes(driver.id);
                                    return (
                                        <div
                                            key={driver.id}
                                            className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-2 rounded"
                                        >
                      <span
                          className="cursor-pointer text-blue-600 dark:text-blue-300 hover:underline"
                          onClick={() => handleDriverClick(driver.id)}
                      >
                        {driver.name}
                      </span>
                                            <button
                                                onClick={() => toggleFavoriteDriver(driver.id)}
                                                className="focus:outline-none"
                                                aria-label={isDriverFav ? 'Unfavorite driver' : 'Favorite driver'}
                                            >
                                                {isDriverFav ? (
                                                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.373 2.455a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118L10 13.348l-3.373 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.637 9.393c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-5 h-5 text-gray-300 hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.373 2.455a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118L12 13.348l-3.373 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L3.637 9.393c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L11.049 2.927z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 3) Drivers Without a Team */}
            {teamlessDrivers.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                        Drivers without a Team
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {teamlessDrivers.map((driver) => {
                            const isFav = favoriteDrivers.includes(driver.id);
                            return (
                                <div key={driver.id} className="card flex justify-between items-center p-4">
                  <span
                      className="cursor-pointer text-blue-600 dark:text-blue-300 hover:underline"
                      onClick={() => handleDriverClick(driver.id)}
                  >
                    {driver.name} ({driver.nationality})
                  </span>
                                    <button
                                        onClick={() => toggleFavoriteDriver(driver.id)}
                                        className="focus:outline-none"
                                        aria-label={isFav ? 'Unfavorite driver' : 'Favorite driver'}
                                    >
                                        {isFav ? (
                                            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.373 2.455a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118L10 13.348l-3.373 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.637 9.393c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5 text-gray-300 hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.373 2.455a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118L12 13.348l-3.373 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L3.637 9.393c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L11.049 2.927z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
