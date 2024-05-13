import { downloadFile, uploadFile } from '../util'
import { useState } from 'react'
import { useReactFlow } from 'reactflow'

const HomeRibbon = () => {
    const [fileName, setFileName] = useState('')
    const { setNodes, setEdges, getNodes, getEdges } = useReactFlow()

    return (
        <aside className='tab'>
            <input className='action-button w-1/2' type='textbox' placeholder='File name'
                   defaultValue={fileName}
                   onChange={(e) => setFileName(e.target.value)}
            />
            <div className='action-button' onClick={() => {
                downloadFile(`${fileName}`, `{"nodes": ${JSON.stringify(getNodes())},
                 "edges": ${JSON.stringify(getEdges())}}`)
            }}>
                Download
            </div>
            <input type='file' className='action-button'
                   onChange={async(event) => {
                       const [uploadedFile, fileName]: any = await uploadFile(event)
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