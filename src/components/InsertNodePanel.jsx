import { downloadFile } from '../util/download.js'
import { uploadFile } from '../util/upload.js'

export const InsertNodePanel = ({ onDragStart, nodes, edges, setNodes, setEdges }) => {

    return (
        <aside className='absolute left-2.5 top-2.5 z-10 text-sm space-y-3'>
            <div className='description'>Controls</div>
            <div className='action_button' onDragStart={(event) => onDragStart(event, 'default')} draggable>
                Insert Node
            </div>
            <div className='action_button' onClick={() => {
                downloadFile('network-graph-save', `{"nodes": ${JSON.stringify(nodes)}, "edges": ${JSON.stringify(edges)}}`)
            }}>
                Download
            </div>
            <input type='file' className='action_button'
                   onChange={async(event) => {
                       const uploadedFile = await uploadFile(event)
                       const saveFileText = JSON.parse(uploadedFile)
                       setNodes(saveFileText.nodes)
                       setEdges(saveFileText.edges)
                   }}
            />
            <div className='action_button debug' onClick={() => console.log(nodes)}>
                Debug Nodes
            </div>
        </aside>
    )
}