import React, { useState } from "react";
import { IRepo } from "../models/models";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";

export function RepoCard({ repo }: { repo: IRepo }) {
    const { addFavorite, removeFavourite } = useActions();
    const { favourites } = useAppSelector(state => state.github);

    const [isFav, setIsFav] = useState(favourites.includes(repo.html_url));

    const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        addFavorite(repo.html_url)
        setIsFav(true)
    };

    const removeFromFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        removeFavourite(repo.html_url)
        setIsFav(false)
    };

    return (
        <div className="border rounded-lg py-3 px-5 rounder mb-2 hover:shawdow-md hover:bg-gray-100 transition-all">
            <a href={repo.html_url} target="_blank" rel="noreferrer">
                <div className='flex gap-5' >
                    <img width='46px' height='36px' className='rounded-full hover:opacity-60' alt='avatar' src={repo.owner.avatar_url} />
                    <h2 className="text-lg font-bold mt-5">{repo.full_name}</h2>
                </div>
                <p className="text-sm mt-2">
                    Forks: <span className="font-bold  mr-2">{repo.forks}</span>
                    Watchers: <span className="font-bold">{repo.watchers}</span>
                </p>
                <p className="text-sm font-thin mt-2">{repo?.description}</p>

                {!isFav && <button
                    className="py-2 px-4 bg-yellow-400 mt-2 mr-2 rounded hover:shadow-md transition-all"
                    onClick={addToFavorite}>
                    Add
                </button>}

                {isFav && <button
                    className="py-2 px-4 mt-2 bg-red-400 rounded hover:shadow-md transition-all"
                    onClick={removeFromFavorite}>
                    Remove
                </button>}
            </a>
        </div>
    )
}