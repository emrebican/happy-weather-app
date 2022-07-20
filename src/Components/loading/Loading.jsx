import React from 'react'
function Loading() {
    return (
        <section className='section'>
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            <h2>Loading</h2>
        </section>
    )
}

export default React.memo(Loading);