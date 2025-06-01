// src/pages/TeamDetails.jsx
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function TeamDetails({
  teams,
  drivers,
  deleteTeam,
  updateDriverTeam,
  favoriteDrivers,
  toggleFavoriteDriver
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const team = teams.find((t) => t.id === id);
  if (!team) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Team not found
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          <Link
            to="/"
            className="text-f1-red hover:underline"
          >
            Go back home
          </Link>
        </p>
      </div>
    );
  }

  const teamDrivers = drivers.filter((d) => d.teamId === team.id);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${team.name}"?`)) {
      deleteTeam(team.id);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="text-f1-red hover:underline text-sm"
      >
        ← Back
      </button>

      <div className="bg-white dark:bg-gray-800 card space-y-4 p-6">
        {/* --- Team Header (Logo + Name + Country) --- */}
        <div className="flex items-center space-x-4">
          {team.logoUrl && (
            <img
              src={team.logoUrl}
              alt={`${team.name} logo`}
              className="w-16 h-16 object-contain rounded-md border border-gray-200 dark:border-gray-700"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {team.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Country: {team.country}
            </p>
          </div>
        </div>

        {/* --- Drivers List --- */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Drivers
          </h2>
          {teamDrivers.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No drivers assigned to this team.
            </p>
          ) : (
            <ul className="space-y-2">
              {teamDrivers.map((driver) => {
                const isFav = favoriteDrivers.includes(driver.id);
                return (
                  <li
                    key={driver.id}
                    className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-2 rounded"
                  >
                    {/* Link to driver details */}
                    <Link
                      to={`/drivers/${driver.id}`}
                      className="text-blue-600 dark:text-blue-300 hover:underline"
                    >
                      {driver.name} ({driver.nationality})
                    </Link>
                    {/* Favorite toggle */}
                    <button
                      onClick={() => toggleFavoriteDriver(driver.id)}
                      className="focus:outline-none"
                      aria-label={isFav ? 'Unfavorite driver' : 'Favorite driver'}
                    >
                      {isFav ? (
                        <svg
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.373 2.455a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118L10 13.348l-3.373 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.637 9.393c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 text-gray-300 hover:text-yellow-400 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.373 2.455a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118L12 13.348l-3.373 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L3.637 9.393c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L11.049 2.927z"
                          />
                        </svg>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* --- Delete Team Button --- */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleDelete}
            className="btn-primary bg-red-600 hover:bg-red-700"
          >
            Delete Team
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeamDetails;
