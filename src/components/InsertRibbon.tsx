const InsertRibbon = ({ onDragStart, insertNode }: { onDragStart: any, insertNode: any }) => {
    return (
        <aside className='tab'>
            <div className='action-button'
                 onClick={() => insertNode()}
                 onDragStart={(event) => onDragStart(event, 'default')} draggable>
                Drag or Click to Insert Node
            </div>
        </aside>
    )
}

export default InsertRibbon