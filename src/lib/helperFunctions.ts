import { type Item, type CommonKeys } from '@/lib/types'

export function getRandomItems<T extends Item>(totalItems: T[], arraySize: number, idChosen: number[] = []): T[] {
    const randomData: T[] = [];
    const randomIndexes: number[] = [];
    const idChosenSet = new Set(idChosen);

    while (randomIndexes.length < arraySize && randomIndexes.length < totalItems.length) {
        const randomIndex = Math.floor(Math.random() * totalItems.length);
        if (!randomIndexes.includes(randomIndex) && !idChosenSet.has(totalItems[randomIndex].id)) {
            randomIndexes.push(randomIndex);
        }
    }
    randomIndexes.forEach((index) => {
        randomData.push(totalItems[index]);
    });
    return randomData;
}

export function getItem<T extends Item>(totalItems: T[], itemKey: CommonKeys<T>, valueItem: string,): T | undefined {
    const itemData = totalItems.find(data => data[itemKey] === valueItem);
    return itemData;
}
