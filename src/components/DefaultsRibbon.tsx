import ColorPickerControl from './ColorPickerControl'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const DefaultsRibbon = (
    {
        defaultNodeBackgroundColor,
        defaultNodeForegroundColor ,
        defaultEdgeType,
        defaultPointDirection
    }) => {
        const edgeTypes = [
            'bezier',
            'smoothstep',
            'step',
            'straight',
        ]
        const pointDirections = [
            'upward',
            'downward',
            'bidirectional',
            'none',
        ]
    return (
        <aside className='tab'>
            <div>
                <label className='block'>Node Background Color:</label>
                <ColorPickerControl
                    disabled={false}
                    value={defaultNodeBackgroundColor[0]}
                    setValue={defaultNodeBackgroundColor[1]}
                />
            </div>
            <div>
                <label className='block'>Node Foreground Color:</label>
                <ColorPickerControl
                    disabled={false}
                    value={defaultNodeForegroundColor[0]}
                    setValue={defaultNodeForegroundColor[1]}
                />
            </div>
            <div>
                <label className='block'>Edge Type:</label>
                <select value={defaultEdgeType[0]} onInput={evt => defaultEdgeType[1](evt.target.value)}>
                    {edgeTypes.map(edgeType => (<option key={edgeType} value={edgeType}>
                        {edgeType}
                    </option>))}
                </select>
            </div>
            <div>
                <label className='block'>Point Direction:</label>
                <select onInput={evt => {
                    defaultPointDirection[1](evt.target.value)
                }}>
                    {pointDirections.map(pointDirection => (<option key={pointDirection} value={pointDirection}>
                        {pointDirection}
                    </option>))}
                </select>
            </div>
        </aside>
    )
}

export default DefaultsRibbon