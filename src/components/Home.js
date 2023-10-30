import React from 'react'
import Notes from './Notes'
export function Home(props) {
    const {showAlert}=props
    return (
        <div>
            
            <Notes showAlert={showAlert}/>
        </div>
    )
}
