import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function CreateTeam({ teams, drivers, addNewTeam, addNewDriver, updateDriverTeam }) {
    const navigate = useNavigate();

    const [teamName, setTeamName] = useState('');
    const [teamCountry, setTeamCountry] = useState('');
    const [logoUrl, setLogoUrl] = useState('');
    const [selectedDrivers, setSelectedDrivers] = useState([]); // array of driver IDs

    const [newDriverName, setNewDriverName] = useState('');
    const [newDriverNationality, setNewDriverNationality] = useState('');

    const [errors, setErrors] = useState({
        teamName: '',
        teamCountry: '',
        logoUrl: '',
        newDriverName: '',
        newDriverNationality: ''
    });

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch {
            return false;
        }
    };

    const handleDriverCheckbox = (driverId) => {
        setSelectedDrivers((prev) =>
            prev.includes(driverId) ? prev.filter((id) => id !== driverId) : [...prev, driverId]
        );
    };

    const handleAddDriver = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (!newDriverName.trim()) {
            newErrors.newDriverName = 'Driver name is required.';
            valid = false;
        } else {
            newErrors.newDriverName = '';
        }

        if (!newDriverNationality.trim()) {
            newErrors.newDriverNationality = 'Nationality is required.';
            valid = false;
        } else {
            newErrors.newDriverNationality = '';
        }

        setErrors(newErrors);
        if (!valid) return;

        const createdDriver = {
            id: uuidv4(),
            name: newDriverName.trim(),
            nationality: newDriverNationality.trim(),
            teamId: null
        };

        addNewDriver(createdDriver);

        setSelectedDrivers((prev) => [...prev, createdDriver.id]);

        setNewDriverName('');
        setNewDriverNationality('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let valid = true;
        const newErrors = { ...errors };

        if (!teamName.trim()) {
            newErrors.teamName = 'Team name is required.';
            valid = false;
        } else {
            newErrors.teamName = '';
        }

        if (!teamCountry.trim()) {
            newErrors.teamCountry = 'Country is required.';
            valid = false;
        } else {
            newErrors.teamCountry = '';
        }

        if (logoUrl.trim() && !isValidUrl(logoUrl.trim())) {
            newErrors.logoUrl = 'Please enter a valid URL or leave blank.';
            valid = false;
        } else {
            newErrors.logoUrl = '';
        }

        setErrors(newErrors);
        if (!valid) return;

        const newTeam = {
            id: uuidv4(),
            name: teamName.trim(),
            country: teamCountry.trim(),
            logoUrl: logoUrl.trim() || '',
            drivers: [...selectedDrivers]
        };

        addNewTeam(newTeam);
        navigate('/');
    };

    useEffect(() => {
        if (teams.length === 0) return;

        const lastTeam = teams[teams.length - 1];

        lastTeam.drivers.forEach((driverId) => {
            const thatDriver = drivers.find((d) => d.id === driverId);
            if (thatDriver && thatDriver.teamId !== lastTeam.id) {
                updateDriverTeam(driverId, lastTeam.id);
            }
        });
    }, [teams, drivers, updateDriverTeam]);

    return (
        <div className="max-w-xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
                Create New Team
            </h1>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 card space-y-6">
                {/* Team Name */}
                <div>
                    <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Team Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="teamName"
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        className={`input-field ${errors.teamName ? 'border-red-500' : ''} mt-1`}
                        placeholder="e.g., Scuderia AlphaTauri"
                    />
                    {errors.teamName && <p className="mt-1 text-red-600 text-sm">{errors.teamName}</p>}
                </div>

                {/* Country */}
                <div>
                    <label htmlFor="teamCountry" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Country <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="teamCountry"
                        value={teamCountry}
                        onChange={(e) => setTeamCountry(e.target.value)}
                        className={`input-field ${errors.teamCountry ? 'border-red-500' : ''} mt-1`}
                    >
                        <option value="">Select a country</option>
                        <option>United Kingdom</option>
                        <option>Austria</option>
                        <option>Italy</option>
                        <option>France</option>
                        <option>Spain</option>
                        <option>United States</option>
                        <option>Germany</option>
                        <option>Switzerland</option>
                        <option>Australia</option>
                        <option>Canada</option>
                        {/* …add any others you like… */}
                    </select>
                    {errors.teamCountry && <p className="mt-1 text-red-600 text-sm">{errors.teamCountry}</p>}
                </div>

                {/* Logo URL */}
                <div>
                    <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Logo URL (optional)
                    </label>
                    <input
                        id="logoUrl"
                        type="text"
                        value={logoUrl}
                        onChange={(e) => setLogoUrl(e.target.value)}
                        className={`input-field ${errors.logoUrl ? 'border-red-500' : ''} mt-1`}
                        placeholder="https://example.com/logo.png"
                    />
                    {errors.logoUrl && <p className="mt-1 text-red-600 text-sm">{errors.logoUrl}</p>}
                </div>

                {/* Select Existing Drivers */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Assign Existing Drivers
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {drivers.map((driver) => (
                            <label key={driver.id} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={selectedDrivers.includes(driver.id)}
                                    onChange={() => handleDriverCheckbox(driver.id)}
                                    className="h-4 w-4 text-f1-red border-gray-300 dark:border-gray-500 rounded focus:ring-f1-red"
                                />
                                <span className="text-gray-700 dark:text-gray-300">
                  {driver.name} ({driver.nationality})
                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Create a New Driver On‐the‐Fly */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add a New Driver</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {/* Name */}
                        <div>
                            <label htmlFor="newDriverName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Driver Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="newDriverName"
                                type="text"
                                value={newDriverName}
                                onChange={(e) => setNewDriverName(e.target.value)}
                                className={`input-field ${errors.newDriverName ? 'border-red-500' : ''} mt-1`}
                                placeholder="e.g., Nikita Mazepin"
                            />
                            {errors.newDriverName && (
                                <p className="mt-1 text-red-600 text-sm">{errors.newDriverName}</p>
                            )}
                        </div>

                        {/* Nationality */}
                        <div>
                            <label htmlFor="newDriverNationality" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Nationality <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="newDriverNationality"
                                type="text"
                                value={newDriverNationality}
                                onChange={(e) => setNewDriverNationality(e.target.value)}
                                className={`input-field ${errors.newDriverNationality ? 'border-red-500' : ''} mt-1`}
                                placeholder="e.g., Russian"
                            />
                            {errors.newDriverNationality && (
                                <p className="mt-1 text-red-600 text-sm">{errors.newDriverNationality}</p>
                            )}
                        </div>

                        {/* Add Driver Button */}
                        <div className="mt-2">
                            <button type="button" onClick={handleAddDriver} className="btn-primary">
                                Add Driver
                            </button>
                        </div>
                    </div>
                </div>

                {/* Submit / Cancel */}
                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button type="button" onClick={() => navigate('/')} className="btn-secondary">
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                        Create Team
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateTeam;
