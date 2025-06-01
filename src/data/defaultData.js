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
    alfaRomeo: uuidv4(),
    haas: uuidv4()
};

// Default drivers (two per team)
const defaultDrivers = [
    // Mercedes
    {
        id: uuidv4(),
        name: 'Lewis Hamilton',
        nationality: 'British',
        teamId: teamIds.mercedes
    },
    {
        id: uuidv4(),
        name: 'George Russell',
        nationality: 'British',
        teamId: teamIds.mercedes
    },

    // Red Bull Racing
    {
        id: uuidv4(),
        name: 'Max Verstappen',
        nationality: 'Dutch',
        teamId: teamIds.redBull
    },
    {
        id: uuidv4(),
        name: 'Sergio Pérez',
        nationality: 'Mexican',
        teamId: teamIds.redBull
    },

    // Ferrari
    {
        id: uuidv4(),
        name: 'Charles Leclerc',
        nationality: 'Monégasque',
        teamId: teamIds.ferrari
    },
    {
        id: uuidv4(),
        name: 'Carlos Sainz',
        nationality: 'Spanish',
        teamId: teamIds.ferrari
    },

    // McLaren
    {
        id: uuidv4(),
        name: 'Lando Norris',
        nationality: 'British',
        teamId: teamIds.mclaren
    },
    {
        id: uuidv4(),
        name: 'Oscar Piastri',
        nationality: 'Australian',
        teamId: teamIds.mclaren
    },

    // Alpine
    {
        id: uuidv4(),
        name: 'Esteban Ocon',
        nationality: 'French',
        teamId: teamIds.alpine
    },
    {
        id: uuidv4(),
        name: 'Pierre Gasly',
        nationality: 'French',
        teamId: teamIds.alpine
    },

    // Aston Martin
    {
        id: uuidv4(),
        name: 'Fernando Alonso',
        nationality: 'Spanish',
        teamId: teamIds.astonMartin
    },
    {
        id: uuidv4(),
        name: 'Lance Stroll',
        nationality: 'Canadian',
        teamId: teamIds.astonMartin
    },

    // Williams
    {
        id: uuidv4(),
        name: 'Alexander Albon',
        nationality: 'Thai',
        teamId: teamIds.williams
    },
    {
        id: uuidv4(),
        name: 'Logan Sargeant',
        nationality: 'American',
        teamId: teamIds.williams
    },

    // AlphaTauri
    {
        id: uuidv4(),
        name: 'Yuki Tsunoda',
        nationality: 'Japanese',
        teamId: teamIds.alphaTauri
    },
    {
        id: uuidv4(),
        name: 'Daniel Ricciardo',
        nationality: 'Australian',
        teamId: teamIds.alphaTauri
    },

    // Alfa Romeo
    {
        id: uuidv4(),
        name: 'Valtteri Bottas',
        nationality: 'Finnish',
        teamId: teamIds.alfaRomeo
    },
    {
        id: uuidv4(),
        name: 'Zhou Guanyu',
        nationality: 'Chinese',
        teamId: teamIds.alfaRomeo
    },

    // Haas
    {
        id: uuidv4(),
        name: 'Kevin Magnussen',
        nationality: 'Danish',
        teamId: teamIds.haas
    },
    {
        id: uuidv4(),
        name: 'Nico Hülkenberg',
        nationality: 'German',
        teamId: teamIds.haas
    }
];

const defaultTeams = [
    {
        id: teamIds.mercedes,
        name: 'Mercedes',
        country: 'United Kingdom',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Mercedes-Benz_Logo_2010.jpg/320px-Mercedes-Benz_Logo_2010.jpg',
        drivers: defaultDrivers.filter((d) => d.teamId === teamIds.mercedes).map((d) => d.id)
    },
    {
        id: teamIds.redBull,
        name: 'Red Bull Racing',
        country: 'Austria',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Red_Bull_Racing_Logo_2019.png/320px-Red_Bull_Racing_Logo_2019.png',
        drivers: defaultDrivers.filter((d) => d.teamId === teamIds.redBull).map((d) => d.id)
    },
    {
        id: teamIds.ferrari,
        name: 'Ferrari',
        country: 'Italy',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Scuderia_Ferrari_Logo.svg/320px-Scuderia_Ferrari_Logo.svg.png',
        drivers: defaultDrivers.filter((d) => d.teamId === teamIds.ferrari).map((d) => d.id)
    },
    {
        id: teamIds.mclaren,
        name: 'McLaren',
        country: 'United Kingdom',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/McLaren_logo.svg/320px-McLaren_logo.svg.png',
        drivers: defaultDrivers.filter((d) => d.teamId === teamIds.mclaren).map((d) => d.id)
    },
    {
        id: teamIds.alpine,
        name: 'Alpine',
        country: 'France',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/20/Alpine_F1_Team_Logo_2021.png/320px-Alpine_F1_Team_Logo_2021.png',
        drivers: defaultDrivers.filter((d) => d.teamId === teamIds.alpine).map((d) => d.id)
    },
    {
        id: teamIds.astonMartin,
        name: 'Aston Martin',
        country: 'United Kingdom',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/Aston_Martin_Cognizant_F1_Team_logo.svg/320px-Aston_Martin_Cognizant_F1_Team_logo.svg.png',
        drivers: defaultDrivers.filter((d) => d.teamId === teamIds.astonMartin).map((d) => d.id)
    },
    {
        id: teamIds.williams,
        name: 'Williams',
        country: 'United Kingdom',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Williams_Racing_Logo.svg/320px-Williams_Racing_Logo.svg.png',
        drivers: defaultDrivers.filter((d) => d.teamId === teamIds.williams).map((d) => d.id)
    },
    {
        id: teamIds.alphaTauri,
        name: 'AlphaTauri',
        country: 'Italy',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/23/Scuderia_AlphaTauri_Logo.svg/320px-Scuderia_AlphaTauri_Logo.svg.png',
        drivers: defaultDrivers.filter((d) => d.teamId === teamIds.alphaTauri).map((d) => d.id)
    },
    {
        id: teamIds.alfaRomeo,
        name: 'Alfa Romeo',
        country: 'Switzerland',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Alfa_Romeo_Castroneves_Careers.png/320px-Alfa_Romeo_Castroneves_Careers.png',
        drivers: defaultDrivers.filter((d) => d.teamId === teamIds.alfaRomeo).map((d) => d.id)
    },
    {
        id: teamIds.haas,
        name: 'Haas',
        country: 'United States',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/Haas_F1_Team_Logo.svg/320px-Haas_F1_Team_Logo.svg.png',
        drivers: defaultDrivers.filter((d) => d.teamId === teamIds.haas).map((d) => d.id)
    }
];

export { defaultDrivers, defaultTeams };
