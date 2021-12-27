import React from 'react'
import Repository from '../../components/repository/repository'

function Favorites({ favorites, saveRepoToFavorites}) {
    return (
        <div>
            Favorites
            {favorites.length && favorites.map(repo => {
                return (
                    <Repository key={repo.id} repo={repo} page="favorites" favorites={saveRepoToFavorites} />
                )
            })}
        </div>
    )
}

export default Favorites
