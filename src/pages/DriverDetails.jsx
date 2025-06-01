import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function DriverDetails({
                           teams,
                           drivers,
                           favoriteDrivers,
                           toggleFavoriteDriver,
                           updateDriverTeam
                       }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const driver = drivers.find((d) => d.id === id);

    if (!driver) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">Driver not found.</p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-4 btn-primary"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    const currentTeam = teams.find((t) => t.id === driver.teamId);

    const [selectedTeam, setSelectedTeam] = useState(driver.teamId || '');
    const [isUpdating, setIsUpdating] = useState(false);

    const handleTeamChange = async (e) => {
        const newTeamId = e.target.value;
        setSelectedTeam(newTeamId);
        setIsUpdating(true);

        await new Promise((res) => setTimeout(res, 300));

        updateDriverTeam(driver.id, newTeamId);
        setIsUpdating(false);
    };

    return (
        <div className="max-w-2xl mx-auto card space-y-6">
            {/* Driver Heading */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {driver.name}
                </h1>
                {/* Favorite toggle */}
                <button
                    onClick={() => toggleFavoriteDriver(driver.id)}
                    className="focus:outline-none"
                    aria-label={
                        favoriteDrivers.includes(driver.id)
                            ? 'Unfavorite driver'
                            : 'Favorite driver'
                    }
                >
                    {favoriteDrivers.includes(driver.id) ? (
                        <svg
                            className="w-6 h-6 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902
                       0l1.286 3.966a1 1 0 00.95.69h4.162c.969
                       0 1.371 1.24.588 1.81l-3.373 2.455a1 1 0
                       00-.364 1.118l1.286 3.966c.3.921-.755
                       1.688-1.54 1.118L10 13.348l-3.373
                       2.455c-.784.57-1.838-.197-1.539-1.118l1.286
                       -3.966a1 1 0 00-.364-1.118L2.637
                       9.393c-.783-.57-.38-1.81.588-1.81h4.162a1
                       1 0 00.95-.69L9.049 2.927z" />
                        </svg>
                    ) : (
                        <svg
                            className="w-6 h-6 text-gray-300 hover:text-yellow-400 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11.049 2.927c.3-.921 1.603-.921
                   1.902 0l1.286 3.966a1 1 0 00.95.69h4.162c.969
                   0 1.371 1.24.588 1.81l-3.373 2.455a1 1 0
                   00-.364 1.118l1.286 3.966c.3.921-.755
                   1.688-1.54 1.118L12 13.348l-3.373
                   2.455c-.784.57-1.838-.197-1.539-1.118l1.286
                   -3.966a1 1 0 00-.364-1.118L3.637
                   9.393c-.783-.57-.38-1.81.588-1.81h4.162a1
                   1 0 00.95-.69L11.049 2.927z"
                            />
                        </svg>
                    )}
                </button>
            </div>

            {/* Nationality */}
            <p className="text-lg text-gray-600 dark:text-gray-400">
                Nationality: {driver.nationality}
            </p>

            {/* Current Team */}
            <div className="flex items-center space-x-2">
        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
          Team:
        </span>
                {currentTeam ? (
                    <Link
                        to="/"
                        className="text-blue-600 dark:text-blue-300 hover:underline"
                    >
                        {currentTeam.name}
                    </Link>
                ) : (
                    <span className="text-gray-500 dark:text-gray-400">
            Unassigned
          </span>
                )}
            </div>

            {/* Reassign Team */}
            <div>
                <label
                    htmlFor="reassignTeam"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    Reassign Team
                </label>
                <div className="relative">
                    <select
                        id="reassignTeam"
                        value={selectedTeam}
                        onChange={handleTeamChange}
                        disabled={isUpdating}
                        className="input-field"
                    >
                        <option value="">Unassigned</option>
                        {teams.map((t) => (
                            <option key={t.id} value={t.id}>
                                {t.name}
                            </option>
                        ))}
                    </select>
                    {isUpdating && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            {/* Simple spinner */}
                            <svg
                                className="animate-spin h-5 w-5 text-gray-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8h8a8 8 0
                     11-16 0z"
                                />
                            </svg>
                        </div>
                    )}
                </div>
            </div>

            {/* Back Button */}
            <div className="flex justify-end">
                <button
                    onClick={() => navigate('/')}
                    className="btn-secondary"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}

export default DriverDetails;
