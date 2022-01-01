import React from 'react'
import Repository from '../../components/repository/repository'

function Favorites({ favorites, changeFavorites}) {
    return (
        <div>
            Favorites
            {favorites.length && favorites.map(repo => {
                return (
                    <Repository
                        key={repo.id}
                        repo={repo}
                        changeFavorites={changeFavorites}
                        page={"favorites"}
                    />
                )
            })}
        </div>
    )
}

export default Favorites
