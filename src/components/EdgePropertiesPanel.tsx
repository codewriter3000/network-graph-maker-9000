import { useState, useEffect } from 'react'

const EdgePropertiesPanel = ({ selectedItem, defaultEdgeStyle }) => {
    const { setEdges } = useReactFlow()

    const [isSelected, setIsSelected] = useState(false)

    const [edgeId, setEdgeId] = useState('')
    const [edgeLabel, setEdgeLabel] = useState('')
    const [edgeStyle, setEdgeStyle] = useState({})

    useEffect(() => {
        if (selectedItem === undefined) {
            setIsSelected(false)
            setEdgeId('')
            setEdgeLabel('')
            setEdgeStyle('')
        } else {
            setIsSelected(true)
            setEdgeId(selectedItem.id)
        }
    }, [selectedItem])

    return (
        <aside className='absolute right-2.5 top-2.5 z-10 text-sm space-y-3'>
            <div className='h-36 w-40'></div>
            <div>
                <label className='block'>ID:</label>
                <input disabled={true} value={edgeId}/>
            </div>
        </aside>
    )
}

export default EdgePropertiesPanel