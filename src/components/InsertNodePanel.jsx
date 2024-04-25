import { downloadFile } from '../util/download.js'
import { uploadFile } from '../util/upload.js'

export const InsertNodePanel = ({ onDragStart, nodes, edges, setNodes, setEdges }) => {

    return (
        <aside>
            <div className='description'>Controls</div>
            <div className='dndnode' onDragStart={(event) => onDragStart(event, 'default')} draggable>
                Insert Node
            </div>
            <div className='dndnode' onClick={() => {
                downloadFile('network-graph-save', `{"nodes": ${JSON.stringify(nodes)}, "edges": ${JSON.stringify(edges)}}`)
            }}>
                Download
            </div>
            <input type='file' className='dndnode'
                   onChange={async(event) => {
                       const uploadedFile = await uploadFile(event)
                       const saveFileText = JSON.parse(uploadedFile)
                       setNodes(saveFileText.nodes)
                       setEdges(saveFileText.edges)
                   }}
            />
            <div className='dndnode input' onClick={() => console.log(nodes)}>
                Debug Nodes
            </div>
        </aside>
    )
}