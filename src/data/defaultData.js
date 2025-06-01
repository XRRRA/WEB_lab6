// src/data/defaultData.js
import { v4 as uuidv4 } from 'uuid'

const teamIds = {
    mercedes:    uuidv4(),
    redBull:     uuidv4(),
    ferrari:     uuidv4(),
    mclaren:     uuidv4(),
    alpine:      uuidv4(),
    astonMartin: uuidv4(),
    williams:    uuidv4(),
    alphaTauri:  uuidv4(),
    alfaRomeo:   uuidv4(),
    haas:        uuidv4()
}

const defaultDrivers = [
    { id: uuidv4(), name: 'Lewis Hamilton',  nationality: 'British',   teamId: teamIds.mercedes },
    { id: uuidv4(), name: 'George Russell',  nationality: 'British',   teamId: teamIds.mercedes },
    { id: uuidv4(), name: 'Max Verstappen',  nationality: 'Dutch',     teamId: teamIds.redBull },
    { id: uuidv4(), name: 'Sergio Pérez',    nationality: 'Mexican',   teamId: teamIds.redBull },
    { id: uuidv4(), name: 'Charles Leclerc', nationality: 'Monégasque',teamId: teamIds.ferrari },
    { id: uuidv4(), name: 'Carlos Sainz',    nationality: 'Spanish',   teamId: teamIds.ferrari },
    { id: uuidv4(), name: 'Lando Norris',    nationality: 'British',   teamId: teamIds.mclaren },
    { id: uuidv4(), name: 'Oscar Piastri',   nationality: 'Australian',teamId: teamIds.mclaren },
    { id: uuidv4(), name: 'Esteban Ocon',    nationality: 'French',    teamId: teamIds.alpine },
    { id: uuidv4(), name: 'Pierre Gasly',    nationality: 'French',    teamId: teamIds.alpine },
    { id: uuidv4(), name: 'Fernando Alonso', nationality: 'Spanish',   teamId: teamIds.astonMartin },
    { id: uuidv4(), name: 'Lance Stroll',    nationality: 'Canadian',  teamId: teamIds.astonMartin },
    { id: uuidv4(), name: 'Alexander Albon', nationality: 'Thai',      teamId: teamIds.williams },
    { id: uuidv4(), name: 'Logan Sargeant',  nationality: 'American',  teamId: teamIds.williams },
    { id: uuidv4(), name: 'Yuki Tsunoda',    nationality: 'Japanese',  teamId: teamIds.alphaTauri },
    { id: uuidv4(), name: 'Daniel Ricciardo',nationality: 'Australian',teamId: teamIds.alphaTauri },
    { id: uuidv4(), name: 'Valtteri Bottas', nationality: 'Finnish',   teamId: teamIds.alfaRomeo },
    { id: uuidv4(), name: 'Zhou Guanyu',     nationality: 'Chinese',   teamId: teamIds.alfaRomeo },
    { id: uuidv4(), name: 'Kevin Magnussen', nationality: 'Danish',    teamId: teamIds.haas },
    { id: uuidv4(), name: 'Nico Hülkenberg', nationality: 'German',    teamId: teamIds.haas }
]

const defaultTeams = [
    {
        id: teamIds.mercedes,
        key: 'mercedes',
        name: 'Mercedes',
        country: 'United Kingdom',
        logoUrl: '/logos/mercedes.png',
        drivers: defaultDrivers
            .filter((d) => d.teamId === teamIds.mercedes)
            .map((d) => d.id)
    },
    {
        id: teamIds.redBull,
        key: 'redBull',
        name: 'Red Bull Racing',
        country: 'Austria',
        logoUrl: '/logos/redbull.png',
        drivers: defaultDrivers
            .filter((d) => d.teamId === teamIds.redBull)
            .map((d) => d.id)
    },
    {
        id: teamIds.ferrari,
        key: 'ferrari',
        name: 'Ferrari',
        country: 'Italy',
        logoUrl: '/logos/ferrari.png',
        drivers: defaultDrivers
            .filter((d) => d.teamId === teamIds.ferrari)
            .map((d) => d.id)
    },
    {
        id: teamIds.mclaren,
        key: 'mclaren',
        name: 'McLaren',
        country: 'United Kingdom',
        logoUrl: '/logos/mclaren.png',
        drivers: defaultDrivers
            .filter((d) => d.teamId === teamIds.mclaren)
            .map((d) => d.id)
    },
    {
        id: teamIds.alpine,
        key: 'alpine',
        name: 'Alpine',
        country: 'France',
        logoUrl: '/logos/alpine.png',
        drivers: defaultDrivers
            .filter((d) => d.teamId === teamIds.alpine)
            .map((d) => d.id)
    },
    {
        id: teamIds.astonMartin,
        key: 'astonMartin',
        name: 'Aston Martin',
        country: 'United Kingdom',
        logoUrl: '/logos/astonmartin.png',
        drivers: defaultDrivers
            .filter((d) => d.teamId === teamIds.astonMartin)
            .map((d) => d.id)
    },
    {
        id: teamIds.williams,
        key: 'williams',
        name: 'Williams',
        country: 'United Kingdom',
        logoUrl: '/logos/williams.png',
        drivers: defaultDrivers
            .filter((d) => d.teamId === teamIds.williams)
            .map((d) => d.id)
    },
    {
        id: teamIds.alphaTauri,
        key: 'alphaTauri',
        name: 'AlphaTauri',
        country: 'Italy',
        logoUrl: '/logos/alphatauri.png',
        drivers: defaultDrivers
            .filter((d) => d.teamId === teamIds.alphaTauri)
            .map((d) => d.id)
    },
    {
        id: teamIds.alfaRomeo,
        key: 'alfaRomeo',
        name: 'Alfa Romeo',
        country: 'Switzerland',
        logoUrl: '/logos/alpharomeo.png',
        drivers: defaultDrivers
            .filter((d) => d.teamId === teamIds.alfaRomeo)
            .map((d) => d.id)
    },
    {
        id: teamIds.haas,
        key: 'haas',
        name: 'Haas',
        country: 'United States',
        logoUrl: '/logos/haas.png',
        drivers: defaultDrivers
            .filter((d) => d.teamId === teamIds.haas)
            .map((d) => d.id)
    }
]

export { defaultDrivers, defaultTeams }