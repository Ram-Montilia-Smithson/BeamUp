import React from 'react'
import Repository from '../components/repository'

function Favorites({ favorites, changeFavorites }) {
    return (
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", height: "90vh" }}>
            {favorites.length ? favorites.map(repo => {
                return (
                    <Repository
                        key={repo.id}
                        repo={repo}
                        changeFavorites={changeFavorites}
                        page={"favorites"}
                        favorites={favorites}
                    />
                )
            })
                : <h1 style={{ margin: "auto"}}>No repositories added</h1>}
        </div>
    )
}

export default Favorites
