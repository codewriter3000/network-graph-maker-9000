import { useEffect, useCallback, useRef, useState, SyntheticEvent } from 'react'
import ReactFlow, {
    useNodesState,
    useEdgesState,
    Controls,
    addEdge,
    ReactFlowProvider,
    Background,
    MarkerType,
    MiniMap
} from 'reactflow'
import { v4 as uuidv4 } from 'uuid'

import useSelectedItems from './components/useSelectedItems.tsx'
import Item from './util/item.ts'

import 'reactflow/dist/style.css'
import './index.css'

import { PropertiesPanel } from './components/PropertiesPanel.tsx'
import InsertRibbon from './components/InsertRibbon.tsx'
import HomeRibbon from './components/HomeRibbon.tsx'
import { Ribbon, RibbonWrapper } from './components/ribbon'
import DefaultsRibbon from './components/DefaultsRibbon.tsx'

const initialNodes: any[] = [
    // { id: '1', data: { label: '-' }, position: { x: 100, y: 100 } },
    // { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
]

const initialEdges: any[] = [
    // { id: 'e1-2', source: '1', target: '2' }
]

const defaultViewport = {
    x: 0,
    y: 0,
    zoom: 1.5
}

const App = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

    const { addItem, removeItem, containsItem, removeAllItems } = useSelectedItems()

    // const [selectedNodeLabel, setSelectedNodeLabel] = useState('')
    // const [selectedNodeBg, setSelectedNodeBg] = useState('')
    // const [selectedNodeFg, setSelectedNodeFg] = useState('')
    // const [selectedItem, setSelectedItem] = useState({id: '', label: '', backgroundColor: '', foregroundColor: ''})

    const reactFlowWrapper = useRef(null)
    const [reactFlowInstance, setReactFlowInstance] = useState(null)

    const defaultNodeBackgroundColor = useState('rgb(238, 238, 238)')
    const defaultNodeForegroundColor = useState('rgb(0, 0, 0)')

    // useEffect(() => {
    //     setSelectedNodeLabel(selectedItem.label)
    //     setSelectedNodeBg(selectedItem.backgroundColor)
    //     setSelectedNodeFg(selectedItem.foregroundColor)
    // }, [selectedItem])

    const onNodeClick = (event: any) => {
        event.preventDefault()

        const regex = '</div>([A-Za-z0-9: ]+)<div'
        const label = event.target.innerHTML.match(regex)?.[1] || ''

        const clickedNode: Item = {
            id: event.target.getAttribute('data-id'),
            label: label,
            backgroundColor: event.target.style.backgroundColor,
            foregroundColor: event.target.style.color,
        }

        console.log(`clickedNode: ${JSON.stringify(clickedNode)}`)

        // setSelectedItem({
        //     id: event.target.getAttribute('data-id'),
        //     label: label,
        //     backgroundColor: event.target.style.backgroundColor,
        //     foregroundColor: event.target.style.color,
        // })

        // eslint-disable-next-line react-hooks/rules-of-hooks
        // useSelectedItems(state => {
        //     if (state.containsItem(clickedNode)) {
        //         state.removeItem(clickedNode)
        //     } else {
        //         state.addItem(clickedNode)
        //     }
        // })

        if (containsItem(clickedNode)) {
            removeItem(clickedNode)
            console.log('removed item')
        } else {
            addItem(clickedNode)
            console.log('added item')
        }

        // setSelectedItem({
        //     id: event.target.getAttribute('data-id'),
        //     label: label,
        //     backgroundColor: event.target.style.backgroundColor,
        //     foregroundColor: event.target.style.color,
        // })
    }

    const onEdgeClick = (event: SyntheticEvent) => {
        event.preventDefault()

        console.log(event.target)
    }

    const onDragStart = (event: any, nodeType: any) => {
        event.dataTransfer.setData('application/reactflow', nodeType)
        event.dataTransfer.effectAllowed = 'move'
    }

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [],
    )

    const onDragOver = useCallback((event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, [])

    const onPaneClick = () => {
        removeAllItems()
        // setSelectedItem({id: '', label: '', backgroundColor: '', foregroundColor: ''})
    }

    const getId = () => uuidv4()

    const insertNode = (position = {x: 300, y: 300}) => {
        const nodeId = getId()

        setNodes(nds => nds.concat({
            id: nodeId,
            type: 'default',
            position: reactFlowInstance.screenToFlowPosition({
                x: position.x,
                y: position.y,
            }),
            data: {label: 'Node'},
            style: {
                backgroundColor: defaultNodeBackgroundColor[0],
                color: defaultNodeForegroundColor[0],
            },
        }))

        addItem({
            id: nodeId,
            label: 'Node',
            backgroundColor: defaultNodeBackgroundColor[0],
            foregroundColor: defaultNodeForegroundColor[0],
        })

        console.log('added item from insertNode')
    }

    const onDrop = (evt: any) => insertNode({x: evt.clientX, y: evt.clientY})

    const defaultEdgeOptions = {
        markerStart: {
            type: MarkerType.ArrowClosed
        }
    }

    return (
        <div>
            <ReactFlowProvider>
                <div className='reactflow-wrapper'
                     ref={reactFlowWrapper}>
                    <div style={{height: '100vh', width: '100vw'}}>
                        <RibbonWrapper home='Home'>
                            <Ribbon name='Home'>
                                <HomeRibbon />
                            </Ribbon>
                            <Ribbon name='Insert'>
                                <InsertRibbon
                                    onDragStart={onDragStart}
                                    insertNode={insertNode}
                                />
                            </Ribbon>
                            <Ribbon name='Defaults'>
                                <DefaultsRibbon
                                    defaultNodeBackgroundColor={defaultNodeBackgroundColor}
                                    defaultNodeForegroundColor={defaultNodeForegroundColor}
                                />
                            </Ribbon>
                        </RibbonWrapper>
                        <PropertiesPanel
                            defaultNodeBg={defaultNodeBackgroundColor[0]}
                            defaultNodeFg={defaultNodeForegroundColor[0]}
                        />
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            defaultEdgeOptions={defaultEdgeOptions}
                            onInit={setReactFlowInstance}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onNodeClick={onNodeClick}
                            onEdgeClick={onEdgeClick}
                            onDragStart={onDragStart}
                            onDragOver={onDragOver}
                            onDrop={onDrop}
                            onConnect={onConnect}
                            onPaneClick={onPaneClick}
                            defaultViewport={defaultViewport}
                            minZoom={0.2}
                            maxZoom={4}
                            attributionPosition='bottom-left'
                        >
                            <MiniMap className='bg-zinc-800'/>
                            <Background/>
                            <Controls/>
                        </ReactFlow>
                    </div>
                </div>
            </ReactFlowProvider>
        </div>
    )
}

export default App;