import React from 'react'
import Repository from '../../components/repository/repository'

function Favorites({ favorites, addingToOrRemovingFromFavorites}) {
    return (
        <div>
            Favorites
            {favorites.length && favorites.map(repo => {
                return (
                    <Repository key={repo.id} repo={repo} page="favorites" addingToOrRemovingFromFavorites={addingToOrRemovingFromFavorites} />
                )
            })}
        </div>
    )
}

export default Favorites
