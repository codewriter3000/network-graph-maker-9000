import { useState, useEffect } from 'react'
import { contrast } from '../util/contrastRatio.js'

export const PropertiesPanel = ({ nodeLabel, setNodeLabel, setNodes, selectedItem, setSelectedItem,
                                    nodeBg, setNodeBg, nodeFg, setNodeFg,
                                    defaultNodeBg, defaultNodeFg}) => {

    const [showLowContrastWarning, setShowLowContrastWarning] = useState(false)

    useEffect(() => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === selectedItem.id) {
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
        const formattedBgRGB = nodeBg.match(rgbRegex)
        const formattedFgRGB = nodeFg.match(rgbRegex)
        const contrastRatio = contrast([Number(formattedBgRGB?.[1]),
            Number(formattedBgRGB?.[2]),
            Number(formattedBgRGB?.[3])],
            [Number(formattedFgRGB?.[1]),
            Number(formattedFgRGB?.[2]),
            Number(formattedFgRGB?.[3])])

        if (contrastRatio < 4.5) {
            setShowLowContrastWarning(true)
        } else {
            setShowLowContrastWarning(false)
        }

        setNodes((nds) =>
            nds.map(node => {
                if (node.id === selectedItem.id) {
                    node.style = { ...node.style, backgroundColor: nodeBg, color: nodeFg }
                }
                return node
            })
        )
    }, [nodeBg, setNodes, nodeFg])

    const onNodeDelete = () => {
        setNodes(nds => nds.filter(node => node.id !== selectedItem.id))
        setSelectedItem( { id: '', label: '', backgroundColor: '' })
    }

    return (
        <aside className='absolute right-2.5 top-2.5 z-10 text-sm space-y-3'>
            <div className='h-36 w-40 text-wrap text-left text-yellow-600'>
                {showLowContrastWarning &&
                <div className='border border-yellow-600 p-2'>
                    Warning: You have a low
                    contrast ratio which may
                    make it harder for some
                    people to interpret your
                    graph
                </div>}
            </div>
            <div>
                <label className='block'>ID:</label>
                <input disabled={true} value={selectedItem.id}/>
            </div>

            <div>
                <label className='block'>Label:</label>
                <input disabled={nodeLabel === ''} value={nodeLabel}
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
                               setNodeBg(defaultNodeBg)
                           }
                       }}
                />
            </div>

            <div>
                <label className='block'>Foreground Color:</label>
                <input disabled={nodeFg === ''} value={nodeFg}
                       onChange={(evt) => {
                           if (evt.target.value.match(/^rgb\((\d+), (\d+), (\d+)\)$/)) {
                               setNodeFg(evt.target.value)
                           } else {
                               setNodeFg(defaultNodeFg)
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