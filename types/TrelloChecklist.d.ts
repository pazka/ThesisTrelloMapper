export interface TrelloChecklist {
    id: string, // ex. 6389274b04492801f337b891,
    name: string, // ex. Checklist,
    idBoard: string, // ex. 6241fcc7a56cbd7b5fee8b14,
    idCard: string, // ex. 63892643668a13012d19c39b,
    pos: number // ex. 16384,
    checkItems: TrelloChecklistItem[],
}

export interface TrelloChecklistItem     {
    id: string // ex. 63892757ce58b103b0c06a2d,
    name: string // ex. Pochette posters,
    nameData: {
        emoji: {}
    },
    pos: 16384,
    due: string, // ex. 2021-01-01T00:00:00.000Z,
    dueReminder: string, // ex. 2021-01-01T00:00:00.000Z,
    idMember: string, // ex. 5f9f9f9f9f9f9f9f9f9f9f9f,
    idChecklist: string // ex. 6389274b04492801f337b891,
    state: string // ex. complete / incomplete,
}

