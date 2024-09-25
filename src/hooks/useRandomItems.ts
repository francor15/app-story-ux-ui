import { useState } from "react";
import { getRandomItems, getItem } from '@/lib/helperFunctions';
import useStoryStore from "@/store/useStoryStore";
import { type TitleItem, Item } from '@/lib/types'

type UseRandomItemsParams = {
    totalItems: Item[];
    ITEMS_PER_PAGE: number;
    chosen: string[];
    key: TitleItem | string;
    keyPreviusData?: string | null;
};

const useRandomItems = ({ totalItems, ITEMS_PER_PAGE, chosen, key, keyPreviusData = null }: UseRandomItemsParams) => {

    const { previusData } = useStoryStore();

    let keyItemCurrent = key;

    if (keyPreviusData) {
        keyItemCurrent = keyPreviusData;
    }
    const initialItems = previusData[keyItemCurrent] ? previusData[keyItemCurrent] : totalItems.slice(0, ITEMS_PER_PAGE);

    const [items, setItems] = useState(initialItems);

    const refreshItems = () => {
        const chosenItems = chosen.map(item => (getItem(totalItems, key, item)));

        const idChosen = chosenItems?.map((item) => item?.id) as number[];

        const valuesPreviousItems = items.map(item => item[key]);
        const filteredtotalItems = totalItems.filter(item => !valuesPreviousItems.includes(item[key]));

        const randomItems = getRandomItems(filteredtotalItems, ITEMS_PER_PAGE, idChosen);

        const chosenIndex = chosen.map(e => items.findIndex(item => item[key] === e))

        const newItems = randomItems.map((item, index) => {
            if (!chosenIndex.includes(index)) {
                return item;
            } else {
                return chosenItems[chosenIndex.indexOf(index)] as Item;
            }
        })
        setItems(newItems);
    }
    return {
        items,
        refreshItems
    }
}

export default useRandomItems;
