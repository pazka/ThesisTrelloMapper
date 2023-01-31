const ignoredListNames = [
    "BACKLOG CREA",
    "BACKLOG THESE",
    "BACKLOG HOPSCOTCH",
    "EN COURS",
    "A FAIRE"
]

export function getDisplayableListNames(names: string[]): string[] {
    //remove the 
    return names.filter(n=>!ignoredListNames.includes(n.trim())).sort((a, b) => {
        const dateA = getDateOfCardFromListTitle(a)
        const dateB = getDateOfCardFromListTitle(b)
        
        if (dateA && dateB) {
            return dateA.getTime() - dateB.getTime()
        } else if (dateA) {
            return -1
        } else if (dateB) {
            return 1
        } else {
            return 0
        }
    })
}

export function getDateOfCardFromListTitle(listName?: string): Date {
    if (!listName)
        return new Date()

    //Date format is : DD/MM/YY
    const date = listName.match(/.*(\d{2})\/(\d{2})\/(\d{2}).*/)
    console.debug(listName,date)
    
    if (!date) {
        return new Date()
    }

    return new Date(
        parseInt("20" + date[3]), // so that the year isn't 1923
        parseInt(date[2]) - 1, // minus one so that january is 0
        parseInt(date[1]) + 1 // wtf why +1 I don't know
    )
}