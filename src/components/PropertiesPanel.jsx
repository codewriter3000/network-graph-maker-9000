import { useEffect } from 'react'
import { contrast } from '../util/contrastRatio.js'

export const PropertiesPanel = ({ nodeLabel, setNodeLabel, setNodes, selectedNode, setSelectedNode, nodeBg, setNodeBg }) => {

    useEffect(() => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === selectedNode.id) {
                    node.data = {
                        ...node.data,
                        label: nodeLabel,
                    }
                }

                return node
            })
        )
    }, [nodeLabel, setNodes])

    useEffect(() => {
        const rgbRegex = /rgb\((\d+), (\d+), (\d+)\)/
        const formattedRGB = nodeBg.match(rgbRegex)
        const contrastRatio = contrast([Number(formattedRGB?.[1]),
            Number(formattedRGB?.[2]),
            Number(formattedRGB?.[3])], [0, 0, 0])

        if (contrastRatio < 4.5) {
            setNodes((nds) =>
                nds.map(node => {
                    if (node.id === selectedNode.id) {
                        node.style = { ...node.style, backgroundColor: nodeBg,
                            color: 'rgb(255, 255, 255)' }
                    }

                    return node
                })
            )
        } else {
            setNodes((nds) =>
                nds.map(node => {
                    if (node.id === selectedNode.id) {
                        node.style = { ...node.style, backgroundColor: nodeBg }
                    }

                    return node
                })
            )
        }
    }, [nodeBg, setNodes])

    const onNodeDelete = () => {
        setNodes(nds => nds.filter(node => node.id !== selectedNode.id))
        setSelectedNode( { id: '', label: '', backgroundColor: '' })
    }

    return (
        <aside className='absolute right-2.5 top-2.5 z-10 text-sm space-y-3'>
            <div>
                <label className='block'>ID:</label>
                <input disabled={true} value={selectedNode.id}/>
            </div>

            <div>
                <label className='block'>Label:</label>
                <input disabled={nodeLabel === '' && nodeBg === ''} value={nodeLabel}
                       onChange={(evt) => {
                           if (evt.target.value.match('[A-Za-z0-9: ]+')) {
                               setNodeLabel(evt.target.value)
                           } else {
                               setNodeLabel(nodeLabel)
                           }
                       }}
                />
            </div>

            <div>
                <label className='block'>Background Color:</label>
                <input disabled={nodeBg === ''} value={nodeBg}
                       onChange={(evt) => {
                           if (evt.target.value.match(/^rgb\((\d+), (\d+), (\d+)\)$/)) {
                               setNodeBg(evt.target.value)
                           } else {
                               setNodeBg('rgb(238, 238, 238)')
                           }
                       }}
                />
            </div>

            <div className='action-button delete' onClick={onNodeDelete}>
                Delete Node
            </div>
        </aside>
    )
}