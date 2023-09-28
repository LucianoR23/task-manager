interface SeedData {
    entries: SeedEntry[]
}

interface SeedEntry {
    description: string;
    createdAt: number;
    status: string;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Pending',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: 'In progress',
            status: 'in-progress',
            createdAt: Date.now() - 100000
        },
        {
            description: 'Finished',
            status: 'finished',
            createdAt: Date.now() - 10000
        }
    ]
}