interface TrelloBoard {
    "id": string,
    "name": string,
    "desc": string,
    "descData": null,
    "closed": boolean,
    "idOrganization": string,
    "idEnterprise": string,
    "pinned": boolean,
    "url": string,
    "shortUrl": string,
    "prefs": any,
    "labelNames": TrelloLabels,
}

interface TrelloBoardCompiled extends TrelloBoard {
    _compiled: {
        realLabels : TrelloLabels
    }
}

interface TrelloLabels { [key: string]: string }