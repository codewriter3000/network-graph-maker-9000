import {useEffect, useCallback, useRef, useState} from 'react'
import ReactFlow, {
    useNodesState,
    useEdgesState,
    Controls,
    addEdge,
    ReactFlowProvider,
    Background,
    MarkerType, MiniMap
} from 'reactflow'
import {v4 as uuidv4} from 'uuid'

import 'reactflow/dist/style.css'
import './index.css'

import { PropertiesPanel } from './components/PropertiesPanel.jsx'
import InsertRibbon from './components/InsertRibbon.jsx'
import HomeRibbon from './components/HomeRibbon.jsx'
import { Ribbon, RibbonWrapper } from './components/ribbon/index.js'
import DefaultsRibbon from './components/DefaultsRibbon.jsx'

const initialNodes = [
    // { id: '1', data: { label: '-' }, position: { x: 100, y: 100 } },
    // { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
]

const initialEdges = [
    // { id: 'e1-2', source: '1', target: '2' }
]
const defaultViewport = {x: 0, y: 0, zoom: 1.5}

const App = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

    const [selectedNodeLabel, setSelectedNodeLabel] = useState('')
    const [selectedNodeBg, setSelectedNodeBg] = useState('')
    const [selectedNodeFg, setSelectedNodeFg] = useState('')
    const [selectedItem, setSelectedItem] = useState({id: '', label: '', backgroundColor: '', foregroundColor: ''})

    const reactFlowWrapper = useRef(null)
    const [reactFlowInstance, setReactFlowInstance] = useState(null)

    const defaultNodeBackgroundColor = useState('rgb(238, 238, 238)')
    const defaultNodeForegroundColor = useState('rgb(0, 0, 0)')

    useEffect(() => {
        setSelectedNodeLabel(selectedItem.label)
        setSelectedNodeBg(selectedItem.backgroundColor)
        setSelectedNodeFg(selectedItem.foregroundColor)
    }, [selectedItem])

    const onNodeClick = (event) => {
        event.preventDefault()

        const regex = '</div>([A-Za-z0-9: ]+)<div'
        const label = event.target.innerHTML.match(regex)?.[1] || ''

        setSelectedItem({
            id: event.target.getAttribute('data-id'),
            label: label,
            backgroundColor: event.target.style.backgroundColor,
            foregroundColor: event.target.style.color,
        })
    }

    const onEdgeClick = (event) => {
        event.preventDefault()

        console.log(event.target)
    }

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType)
        event.dataTransfer.effectAllowed = 'move'
    }

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [],
    )

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, [])

    const onPaneClick = () => {
        setSelectedItem({id: '', label: '', backgroundColor: '', foregroundColor: ''})
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
    }

    const onDrop = (evt) => insertNode({x: evt.clientX, y: evt.clientY})

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
                                <HomeRibbon
                                    nodes={nodes}
                                    setNodes={setNodes}
                                    edges={edges}
                                    setEdges={setEdges}
                                />
                            </Ribbon>
                            <Ribbon name='Insert'>
                                <InsertRibbon
                                    onDragStart={onDragStart}
                                    nodes={nodes}
                                    setNodes={setNodes}
                                    edges={edges}
                                    setEdges={setEdges}
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
                            nodeLabel={selectedNodeLabel}
                            setNodeLabel={setSelectedNodeLabel}
                            setNodes={setNodes}
                            selectedItem={selectedItem}
                            setSelectedItem={setSelectedItem}
                            nodeBg={selectedNodeBg}
                            setNodeBg={setSelectedNodeBg}
                            nodeFg={selectedNodeFg}
                            setNodeFg={setSelectedNodeFg}
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