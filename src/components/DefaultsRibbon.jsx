const DefaultsRibbon = ({ defaultNodeBackgroundColor, defaultNodeForegroundColor }) => {
    return (
        <aside className='tab'>
            <div>
                <label className='block'>Node Background Color:</label>
                <input onChange={(evt) => {
                    if (evt.target.value.match(/^rgb\((\d+), (\d+), (\d+)\)$/)) {
                        defaultNodeBackgroundColor[1](evt.target.value)
                    } else {
                        defaultNodeBackgroundColor[1]('rgb(238, 238, 238)')
                    }
                }} value={defaultNodeBackgroundColor[0]}/>
            </div>
            <div>
                <label className='block'>Node Foreground Color:</label>
                <input onChange={(evt) => {
                    if (evt.target.value.match(/^rgb\((\d+), (\d+), (\d+)\)$/)) {
                        defaultNodeForegroundColor[1](evt.target.value)
                    } else {
                        defaultNodeForegroundColor[1]('rgb(0, 0, 0)')
                    }
                }} value={defaultNodeForegroundColor[0]}/>
            </div>
        </aside>
    )
}

export default DefaultsRibbon