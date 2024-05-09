const InsertRibbon = ({ onDragStart, nodes, insertNode }) => {
    return (
        <aside className='tab'>
            <div className='action-button'
                 onClick={() => insertNode()}
                 onDragStart={(event) => onDragStart(event, 'default')} draggable>
                Insert Node
            </div>
            <div className='action-button debug' onClick={() => console.log(nodes)}>
                Debug Nodes
            </div>
        </aside>
    )
}

export default InsertRibbon