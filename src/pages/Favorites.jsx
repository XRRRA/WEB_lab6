import React from 'react';
import { Link } from 'react-router-dom';

function Favorites({
                       teams,
                       drivers,
                       favoriteTeams,
                       favoriteDrivers,
                       toggleFavoriteTeam,
                       toggleFavoriteDriver
                   }) {
    const favTeamsData = teams.filter((team) => favoriteTeams.includes(team.id));
    const favDriversData = drivers.filter((driver) =>
        favoriteDrivers.includes(driver.id)
    );

    return (
        <div className="space-y-10">
            {/* Favorite Teams Section */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Favorite Teams
                </h1>
                {favTeamsData.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        You haven’t marked any teams as favorites yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favTeamsData.map((team) => (
                            <div key={team.id} className="card flex flex-col items-center space-y-4">
                                {/* Team Logo & Name */}
                                {team.logoUrl && (
                                    <img
                                        src={team.logoUrl}
                                        alt={`${team.name} logo`}
                                        className="w-16 h-16 object-contain rounded"
                                    />
                                )}
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {team.name}
                                </h2>

                                {/* Remove Favorite Button */}
                                <button
                                    onClick={() => toggleFavoriteTeam(team.id)}
                                    className="btn-secondary"
                                >
                                    Remove Favorite
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Favorite Drivers Section */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Favorite Drivers
                </h1>
                {favDriversData.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        You haven’t marked any drivers as favorites yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favDriversData.map((driver) => (
                            <div
                                key={driver.id}
                                className="card flex flex-col items-center space-y-4"
                            >
                                {/* Driver Name & Nationality */}
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {driver.name}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {driver.nationality}
                                </p>

                                {/* Link to Driver Details */}
                                <Link
                                    to={`/drivers/${driver.id}`}
                                    className="text-blue-600 dark:text-blue-300 hover:underline"
                                >
                                    View Details
                                </Link>

                                {/* Remove Favorite Button */}
                                <button
                                    onClick={() => toggleFavoriteDriver(driver.id)}
                                    className="btn-secondary"
                                >
                                    Remove Favorite
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Favorites;
