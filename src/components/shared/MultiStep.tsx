'use client'

import { useShallow } from 'zustand/react/shallow';
import useStoryStore from "@/store/useStoryStore"
import GenreList from "./GenreList"
import ThemeList from "./ThemeList"
import CharacterList from "./CharacterList"
import StoryGenerator from "./StoryGenerator"

export default function MultiStepStory () {

    const page = useStoryStore(useShallow(state => state.page))

    const display: Record<number, JSX.Element> = {
        1: <GenreList />,
        2: <ThemeList />,
        3: <CharacterList />,
        4: <StoryGenerator />,
    }
    return display[page]
}
