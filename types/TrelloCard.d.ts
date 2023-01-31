import {TrelloChecklist} from "./TrelloChecklist";

export interface TrelloCard {
    id: string // ex. 633beddfebbdd60030b35c5a
    address: null,
    badges: {
        attachmentsByType: {
            trello: {
                board: number // ex. 0,
                card: number // ex. 0
            }
        },
        location: boolean,
        votes: number // ex. 0,
        viewingMemberVoted: boolean,
        subscribed: boolean,
        fogbugz: string // ex. 
        checkItems: number // ex. 0,
        checkItemsChecked: number // ex. 0,
        checkItemsEarliestDue: null,
        comments: number // ex. 0,
        attachments: number // ex. 0,
        description: boolean,
        due: null,
        dueComplete: boolean,
        start: null
    },
    checkItemStates: null,
    closed: boolean,
    coordinates: null,
    creationMethod: null,
    dueComplete: boolean,
    dateLastActivity: string // ex. 2022-10-23T19:43:34.594Z
    desc: string // ex. 
    descData: {
        emoji: {}
    },
    due: string,
    dueReminder: null,
    email: string // ex. alexandreweis+2pe4hjcmntj2x1agz8d+2z6vfyxo4atx9yrqdzu+0rag0n4cjx@boards.trello.com
    idBoard: string // ex. 6241fcc7a56cbd7b5fee8b14
    idChecklists: [],
    idLabels: [],
    idShort : string,
    idList: string // ex. 633bedaa4a8c5102268c82a8
    idMembers: [],
    idMembersVoted: [],
    idShort: number // ex. 19,
    idAttachmentCover: null,
    labels: TrelloLabels[],
    limits: {
        attachments: {
            perCard: {
                status: string // ex. ok
                disableAt: number // ex. 1000,
                warnAt: number // ex. 800
            }
        },
        checklists: {
            perCard: {
                status: string // ex. ok
                disableAt: number // ex. 500,
                warnAt: number // ex. 400
            }
        },
        stickers: {
            perCard: {
                status: string // ex. ok
                disableAt: number // ex. 70,
                warnAt: number // ex. 56
            }
        }
    },
    locationName: null,
    manualCoverAttachment: boolean,
    name: string // ex. dossier presse
    pos: number // ex. 393215,
    shortLink: string // ex. yDgxR9jp
    shortUrl: string // ex. https://trello.com/c/yDgxR9jp
    staticMapUrl: null,
    start: null,
    subscribed: boolean,
    url: string // ex. https://trello.com/c/yDgxR9jp/19-dossier-presse
    cover: {
        idAttachment: null,
        color: null,
        idUploadedBackground: null,
        size: string // ex. normal
        brightness: string // ex. dark
        idPlugin: null
    },
    isTemplate: boolean,
    cardRole: null,
    attachments: TrelloAttachements[],
    pluginData: [],
    customFieldItems: []
}

export interface TrelloAttachements {
    "bytes": number, // ex. 18880,
    "date": string, // ex. 2022-12-30T11:30:54.519Z",
    "edgeColor": null,
    "idMember": string, // ex. 5caa35ce7e0a02184991410e",
    "isUpload": boolean, // ex. true,
    "mimeType": string, // ex. application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "name": string, // ex. CR0911 ebay.docx",
    "previews": [],
    "url": string, // ex. https://trello.com/1/cards/636bddd6a977bf01a9b9714c/attachments/63aecbee9df17104877ac74b/download/CR0911_ebay.docx",
    "pos": number, // ex. 16384,
    "fileName": string, // ex. CR0911_ebay.docx",
    "id": string, // ex. 63aecbee9df17104877ac74b"
}

export interface TrelloCardCompiled extends TrelloCard {
    _compiled: {
        listName: string
        listData?: TrelloList
        dateInListName?: Date | null
        checklists?: TrelloChecklist[],
        posTag?: { lat: number, lng: number } | null
    }
}

export interface TrelloList {
    "id": string, // ex. 633bedaa4a8c5102268c82a8",
    "name": string, // ex. BACKLOG CREA",
    "closed": boolean, // ex. false,
    "idBoard": string, // ex. 6241fcc7a56cbd7b5fee8b14",
    "pos": number, // ex. 32767.5,
    "subscribed": boolean, // ex. false,
    "softLimit": null,
    "limits": {
        "cards": {
            "openPerList": {
                "status": string, // ex. ok",
                "disableAt": number, // ex. 5000,
                "warnAt": number, // ex. 4000
            },
            "totalPerList": {
                "status": string, // ex. ok",
                "disableAt": number, // ex. 1000000,
                "warnAt": number, // ex. 800000
            }
        }
    },
    "creationMethod": null
}
