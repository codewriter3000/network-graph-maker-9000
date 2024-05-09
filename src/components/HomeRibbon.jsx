import { downloadFile } from '../util/download.js'
import { uploadFile } from '../util/upload.js'
import { useState } from 'react'

const HomeRibbon = ({ nodes, edges, setNodes, setEdges }) => {
    const [fileName, setFileName] = useState('')

    return (
        <aside className='tab'>
            <input className='action-button w-1/2' type='textbox' placeholder='File name'
                   defaultValue={fileName}
                   onChange={(e) => setFileName(e.target.value)}
            />
            <div className='action-button' onClick={() => {
                downloadFile(`${fileName}`, `{"nodes": ${JSON.stringify(nodes)},
                 "edges": ${JSON.stringify(edges)}}`)
            }}>
                Download
            </div>
            <input type='file' className='action-button'
                   onChange={async(event) => {
                       const [uploadedFile, fileName] = await uploadFile(event)
                       const saveFileText = JSON.parse(uploadedFile)
                       setNodes(saveFileText.nodes)
                       setEdges(saveFileText.edges)
                       setFileName(fileName)
                   }}
            />
        </aside>
    )
}

export default HomeRibbon