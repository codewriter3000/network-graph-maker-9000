const InsertRibbon = ({ onDragStart, nodes, setNodes, getId, reactFlowInstance }) => {
    return (
        <aside className='tab'>
            <div className='action-button'
                 onClick={() => {
                     const nodeId = getId()
                     setNodes(nds => nds.concat({
                         id: nodeId,
                         type: 'default',
                         position: reactFlowInstance.screenToFlowPosition({
                             x: 300,
                             y: 300
                         }),
                         data: { label: 'Node' },
                         style: { backgroundColor: '#eee' }
                     }))
                 }}
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