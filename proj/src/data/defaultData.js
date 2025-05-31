import { v4 as uuidv4 } from 'uuid';

// Generate unique IDs for teams
const teamIds = {
    mercedes: uuidv4(),
    redBull: uuidv4(),
    ferrari: uuidv4(),
    mclaren: uuidv4(),
    alpine: uuidv4(),
    astonMartin: uuidv4(),
    williams: uuidv4(),
    alphaTauri: uuidv4(),
    alfa: uuidv4(),
    haas: uuidv4()
};

// Generate unique IDs for drivers
const defaultDrivers = [
    // Mercedes
    { id: uuidv4(), name: "Lewis Hamilton", nationality: "British", teamId: teamIds.mercedes },
    { id: uuidv4(), name: "George Russell", nationality: "British", teamId: teamIds.mercedes },

    // Red Bull
    { id: uuidv4(), name: "Max Verstappen", nationality: "Dutch", teamId: teamIds.redBull },
    { id: uuidv4(), name: "Sergio Pérez", nationality: "Mexican", teamId: teamIds.redBull },

    // Ferrari
    { id: uuidv4(), name: "Charles Leclerc", nationality: "Monégasque", teamId: teamIds.ferrari },
    { id: uuidv4(), name: "Carlos Sainz", nationality: "Spanish", teamId: teamIds.ferrari },

    // McLaren
    { id: uuidv4(), name: "Lando Norris", nationality: "British", teamId: teamIds.mclaren },
    { id: uuidv4(), name: "Oscar Piastri", nationality: "Australian", teamId: teamIds.mclaren },

    // Alpine
    { id: uuidv4(), name: "Esteban Ocon", nationality: "French", teamId: teamIds.alpine },
    { id: uuidv4(), name: "Pierre Gasly", nationality: "French", teamId: teamIds.alpine },

    // Aston Martin
    { id: uuidv4(), name: "Fernando Alonso", nationality: "Spanish", teamId: teamIds.astonMartin },
    { id: uuidv4(), name: "Lance Stroll", nationality: "Canadian", teamId: teamIds.astonMartin },

    // Williams
    { id: uuidv4(), name: "Alexander Albon", nationality: "Thai", teamId: teamIds.williams },
    { id: uuidv4(), name: "Logan Sargeant", nationality: "American", teamId: teamIds.williams },

    // AlphaTauri
    { id: uuidv4(), name: "Yuki Tsunoda", nationality: "Japanese", teamId: teamIds.alphaTauri },
    { id: uuidv4(), name: "Daniel Ricciardo", nationality: "Australian", teamId: teamIds.alphaTauri },

    // Alfa Romeo
    { id: uuidv4(), name: "Valtteri Bottas", nationality: "Finnish", teamId: teamIds.alfa },
    { id: uuidv4(), name: "Zhou Guanyu", nationality: "Chinese", teamId: teamIds.alfa },

    // Haas
    { id: uuidv4(), name: "Kevin Magnussen", nationality: "Danish", teamId: teamIds.haas },
    { id: uuidv4(), name: "Nico Hülkenberg", nationality: "German", teamId: teamIds.haas }
];

const defaultTeams = [
    {
        id: teamIds.mercedes,
        name: "Mercedes",
        carColor: "#00D2BE",
        drivers: defaultDrivers.filter(d => d.teamId === teamIds.mercedes).map(d => d.id)
    },
    {
        id: teamIds.redBull,
        name: "Red Bull Racing",
        carColor: "#0600EF",
        drivers: defaultDrivers.filter(d => d.teamId === teamIds.redBull).map(d => d.id)
    },
    {
        id: teamIds.ferrari,
        name: "Ferrari",
        carColor: "#DC143C",
        drivers: defaultDrivers.filter(d => d.teamId === teamIds.ferrari).map(d => d.id)
    },
    {
        id: teamIds.mclaren,
        name: "McLaren",
        carColor: "#FF8700",
        drivers: defaultDrivers.filter(d => d.teamId === teamIds.mclaren).map(d => d.id)
    },
    {
        id: teamIds.alpine,
        name: "Alpine",
        carColor: "#0090FF",
        drivers: defaultDrivers.filter(d => d.teamId === teamIds.alpine).map(d => d.id)
    },
    {
        id: teamIds.astonMartin,
        name: "Aston Martin",
        carColor: "#006F62",
        drivers: defaultDrivers.filter(d => d.teamId === teamIds.astonMartin).map(d => d.id)
    },
    {
        id: teamIds.williams,
        name: "Williams",
        carColor: "#005AFF",
        drivers: defaultDrivers.filter(d => d.teamId === teamIds.williams).map(d => d.id)
    },
    {
        id: teamIds.alphaTauri,
        name: "AlphaTauri",
        carColor: "#2B4562",
        drivers: defaultDrivers.filter(d => d.teamId === teamIds.alphaTauri).map(d => d.id)
    },
    {
        id: teamIds.alfa,
        name: "Alfa Romeo",
        carColor: "#900000",
        drivers: defaultDrivers.filter(d => d.teamId === teamIds.alfa).map(d => d.id)
    },
    {
        id: teamIds.haas,
        name: "Haas",
        carColor: "#FFFFFF",
        drivers: defaultDrivers.filter(d => d.teamId === teamIds.haas).map(d => d.id)
    }
];

export { defaultDrivers, defaultTeams };