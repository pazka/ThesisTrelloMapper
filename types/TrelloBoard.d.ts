interface TrelloBoard {
    id: string,
    name: string,
    desc: string,
    descData: null,
    closed: boolean,
    idOrganization: string,
    idEnterprise: string,
    pinned: boolean,
    url: string,
    shortUrl: string,
    prefs: any,
    labelNames: TrelloLabelList,
}

interface TrelloBoardCompiled extends TrelloBoard {
    _compiled: {
        labelToColor: TrelloLabelList
    }
}

interface TrelloLabel {
    id: string, // ex. 63aeb1d9bd0b46356de3a090,
    idBoard: string, // ex. 6241fcc7a56cbd7b5fee8b14,
    name: string, // ex. AUTRE - COLLOQUE / SDD,
    color: string, // ex. orange
} 

interface TrelloLabelList {[key: string]: string}