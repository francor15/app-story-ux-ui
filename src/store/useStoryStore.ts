import React from 'react';
import { create } from 'zustand';
import { TITLE_PAGES } from '@/lib/constants';
import { type Item } from '@/lib/types'

type DataKey = 'genre' | 'theme' | 'characters' | 'story' | 'title';

interface Story {
  [key: string]: string | string[] | Character[];
  genre: string;
  theme: string;
  characters: Character[];
  story: string;
  title: string;
}
interface PreviusData {
  [key: string]: Item[];
}
interface Character {
  type: string;
  name?: string;
  rol?: string;
  specialFeatures?: string[];
  [key: string]: string | string[] | undefined;
}

interface StoryStore {
  data: Story;
  page: number;
  previusData: PreviusData;
  totalPages: number;
  computed: { currectPage: number };
}
interface Actions {
  setPage: (newPage: number) => void;
  setPreviusData: (key: string, value: Item[]) => void;
  addCharacter: (character: Character) => void;
  editCharacter: (type: string, newInfo: Record<string, string | string[]>) => void;
  removeCharacter: (type: string) => void;
  goToNextPage: (key: DataKey) => boolean;
  isFirstPage: () => boolean;
  isFinalPage: () => boolean;
  disabledBtnNext: () => boolean;
  handleChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeCharacterOption: (type: string, feature: string) => void;
}

const useStoryStore = create<StoryStore & Actions>()((set, get) => ({
  data: {
    genre: "",
    theme: "",
    characters: [],
    story: "",
    title: ""
  },
  previusData: {},
  setPreviusData: (key: string, value: Item[]) => set(state => ({
    previusData: { ...state.previusData, [key]: value }
  })),
  addCharacter: (character: Character) => set(state => ({
    data: {
      ...state.data,
      characters: [...state.data.characters, character]
    }
  })),
  editCharacter: (type: string, newInfo: Record<string, string | string[]>) => set(state => ({
    data: {
      ...state.data,
      characters: state.data.characters.map(character => character.type === type ? { ...character, ...newInfo } : character)
    }
  })),
  removeCharacter: (type: string) => set(state => {
    const newCharacterList = state.data.characters.filter(character => character.type !== type);
    const newPreviuesData = Object.fromEntries(Object.entries(state.previusData).filter(([key]) => key !== `feature_${type}`));
    return { data: { ...state.data, characters: newCharacterList }, previusData: newPreviuesData };
  }),
  removeCharacterOption: (type: string, feature: string) => set(state => ({
    data: {
      ...state.data,
      characters: state.data.characters.map((character) => {
        if (character.type === type) {
          delete character[feature];
          return character;
        }
        return character
      })
    }
  })),
  handleChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const { value, name } = target;

    set((state) => ({
      data: {
        ...state.data,
        [name]: value
      }
    }));
  },
  page: 1,
  totalPages: 5,
  computed: {
    get currectPage() {
      return get().page;
    }
  },
  setPage: (newPage: number) => set({ page: newPage }),
  goToNextPage: (key: DataKey) => {
    const { data } = get()
    return data[key].length > 0
  },
  // isFirstPage: () => { return get().page === 1 },
  isFirstPage: () =>  {
    const { page, totalPages } = get();
    return page === 1
  },
  isFinalPage: () => {
    const { page, totalPages } = get();
    return page === totalPages
  },
  disabledBtnNext: () => {
    const { page: currentPage, goToNextPage } = get();
    return Object.entries(TITLE_PAGES).some(([page, value]) => currentPage === Number(page) && !goToNextPage(value.title as DataKey));
  },

}));

export default useStoryStore
