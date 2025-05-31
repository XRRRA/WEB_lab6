import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { loadAppData, saveAppData, getInitialTheme } from './utils/storage';
import { defaultDrivers, defaultTeams } from './data/defaultData';

// Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
// import Favorites from './pages/Favorites';
// import CreateTeam from './pages/CreateTeam';
// import DriverDetails from './pages/DriverDetails';

function App() {
    // Initialize state from localStorage or defaults
    const savedData = loadAppData();

    const [teams, setTeams] = useState(savedData?.teams || defaultTeams);
    const [drivers, setDrivers] = useState(savedData?.drivers || defaultDrivers);
    const [favoriteTeams, setFavoriteTeams] = useState(savedData?.favoriteTeams || []);
    const [favoriteDrivers, setFavoriteDrivers] = useState(savedData?.favoriteDrivers || []);
    const [theme, setTheme] = useState(savedData?.theme || getInitialTheme());

    // Save to localStorage whenever state changes
    useEffect(() => {
        const dataToSave = {
            teams,
            drivers,
            favoriteTeams,
            favoriteDrivers,
            theme
        };
        saveAppData(dataToSave);
    }, [teams, drivers, favoriteTeams, favoriteDrivers, theme]);

    // Apply theme to document
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    // Toggle functions
    const toggleFavoriteTeam = (teamId) => {
        setFavoriteTeams(prev =>
            prev.includes(teamId)
                ? prev.filter(id => id !== teamId)
                : [...prev, teamId]
        );
    };

    const toggleFavoriteDriver = (driverId) => {
        setFavoriteDrivers(prev =>
            prev.includes(driverId)
                ? prev.filter(id => id !== driverId)
                : [...prev, driverId]
        );
    };

    const updateDriverTeam = (driverId, newTeamId) => {
        setDrivers(prev => prev.map(driver =>
            driver.id === driverId
                ? { ...driver, teamId: newTeamId }
                : driver
        ));

        // Update team driver lists
        setTeams(prev => prev.map(team => {
            // Remove driver from old team
            const updatedDrivers = team.drivers.filter(id => id !== driverId);

            // Add driver to new team if this is the new team
            if (team.id === newTeamId && !team.drivers.includes(driverId)) {
                updatedDrivers.push(driverId);
            }

            return { ...team, drivers: updatedDrivers };
        }));
    };

    const addNewTeam = (teamData) => {
        setTeams(prev => [...prev, teamData]);
    };

    const addNewDriver = (driverData) => {
        setDrivers(prev => [...prev, driverData]);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
            <Navbar theme={theme} setTheme={setTheme} />

            <main className="container mx-auto px-4 py-8">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                teams={teams}
                                drivers={drivers}
                                favoriteTeams={favoriteTeams}
                                favoriteDrivers={favoriteDrivers}
                                toggleFavoriteTeam={toggleFavoriteTeam}
                                toggleFavoriteDriver={toggleFavoriteDriver}
                            />
                        }
                    />
                    {/*<Route*/}
                    {/*    path="/favorites"*/}
                    {/*    element={*/}
                    {/*        <Favorites*/}
                    {/*            teams={teams}*/}
                    {/*            drivers={drivers}*/}
                    {/*            favoriteTeams={favoriteTeams}*/}
                    {/*            favoriteDrivers={favoriteDrivers}*/}
                    {/*            toggleFavoriteTeam={toggleFavoriteTeam}*/}
                    {/*            toggleFavoriteDriver={toggleFavoriteDriver}*/}
                    {/*        />*/}
                    {/*    }*/}
                    {/*/>*/}
                    {/*<Route*/}
                    {/*    path="/create-team"*/}
                    {/*    element={*/}
                    {/*        <CreateTeam*/}
                    {/*            teams={teams}*/}
                    {/*            drivers={drivers}*/}
                    {/*            addNewTeam={addNewTeam}*/}
                    {/*            addNewDriver={addNewDriver}*/}
                    {/*            updateDriverTeam={updateDriverTeam}*/}
                    {/*        />*/}
                    {/*    }*/}
                    {/*/>*/}
                    {/*<Route*/}
                    {/*    path="/drivers/:id"*/}
                    {/*    element={*/}
                    {/*        <DriverDetails*/}
                    {/*            teams={teams}*/}
                    {/*            drivers={drivers}*/}
                    {/*            favoriteDrivers={favoriteDrivers}*/}
                    {/*            toggleFavoriteDriver={toggleFavoriteDriver}*/}
                    {/*            updateDriverTeam={updateDriverTeam}*/}
                    {/*        />*/}
                    {/*    }*/}
                    {/*/>*/}
                </Routes>
            </main>
        </div>
    );
}

export default App;