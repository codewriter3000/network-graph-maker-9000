import { useEffect, useCallback, useRef, useState, useContext, createContext } from 'react'
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

import 'reactflow/dist/style.css'
import './index.css'

import { NodePropertiesPanel } from './components/NodePropertiesPanel.tsx'
import InsertRibbon from './components/InsertRibbon.tsx'
import HomeRibbon from './components/HomeRibbon.tsx'
import { Ribbon, RibbonWrapper } from './components/ribbon'
import DefaultsRibbon from './components/DefaultsRibbon.tsx'
import { PropertiesPanel } from './components/PropertiesPanel.tsx'

const defaultViewport = {
    x: 0,
    y: 0,
    zoom: 1.5
}

export const DefaultContext = createContext({})

const App = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])

    const [selectedNodes, setSelectedNodes] = useState([])
    const [selectedEdges, setSelectedEdges] = useState([])

    const reactFlowWrapper = useRef(null)
    const [reactFlowInstance, setReactFlowInstance] = useState(null)

    const defaultNodeBackgroundColor = useState('#eeeeee')
    const defaultNodeForegroundColor = useState('#000000')
    const defaultEdgeType = useState('bezier')
    const defaultPointDirection = useState('upward')

    const onSelectionChange = useCallback(({ nodes, edges }) => {
        setSelectedNodes(nodes)
        setSelectedEdges(edges)
    }, [])

    // useEffect(() => {
    //     nodes.forEach(node => {
    //         for (const selectedNode of selectedNodes) {
    //             if (node['id'] === selectedNode['id']) {
    //                 console.log('found node')
    //             }
    //         }
    //     })

    //     edges.forEach(edge => {
    //         for (const selectedEdge of selectedEdges) {
    //             if (edge['id'] === selectedEdge['id']) {
    //                 console.log('found edge')
    //             }
    //         }
    //     })
    // }, [nodes, edges, selectedNodes, selectedEdges])

    // const onNodeClick = (event: any) => {
    //     event.preventDefault()

        // const regex = '</div>([A-Za-z0-9: ]+)<div'
        // const label = event.target.innerHTML.match(regex)?.[1] || ''

        // const clickedNode: Item = {
        //     id: event.target.getAttribute('data-id'),
        //     label: label,
        //     backgroundColor: event.target.style.backgroundColor,
        //     foregroundColor: event.target.style.color,
        // }

        // setSelectedItem({
        //     id: event.target.getAttribute('data-id'),
        //     label: label,
        //     backgroundColor: event.target.style.backgroundColor,
        //     foregroundColor: event.target.style.color,
        // })

        // if (containsItem(clickedNode)) {
        //     removeItem(clickedNode)
        //     console.log('removed item')
        // } else {
        //     addItem(clickedNode)
        //     console.log('added item')
        // }

        // setSelectedItem({
        //     id: event.target.getAttribute('data-id'),
        //     label: label,
        //     backgroundColor: event.target.style.backgroundColor,
        //     foregroundColor: event.target.style.color,
        // })
    // }

    // const onEdgeClick = (event: SyntheticEvent) => {
    //     event.preventDefault()
    // }

    const onDragStart = (event: any, nodeType: any) => {
        event.dataTransfer.setData('application/reactflow', nodeType)
        event.dataTransfer.effectAllowed = 'move'
    }

    const onConnect = (paramsWithoutDefaults: any) => {
        const params = paramsWithoutDefaults
        if (defaultPointDirection[0] === 'upward' ||
            defaultPointDirection[0] === 'bidirectional') {
                params['markerStart'] = {
                    'type': 'arrowclosed'
                }
        }
        if (defaultPointDirection[0] === 'downward' ||
            defaultPointDirection[0] === 'bidirectional') {
                params['markerEnd'] = {
                    'type': 'arrowclosed'
                }
        }

        params['type'] = defaultEdgeType[0]
        setEdges(eds => addEdge(params, eds))
    }

    const onDragOver = useCallback((event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, [])

    const onPaneClick = () => {
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

        // setSelectedNodes(prevState => {
        //     return [...prevState, {
        //     id: nodeId,
        //     label: 'Node',
        //     backgroundColor: defaultNodeBackgroundColor[0],
        //     foregroundColor: defaultNodeForegroundColor[0],
        // }]})

        // console.log('added item from insertNode')
    }
    const onDrop = (evt: any) => insertNode({x: evt.clientX, y: evt.clientY})

    const defaultEdgeOptions = {
        // markerStart: {
        //     type: MarkerType.ArrowClosed
        // }
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
                                    defaultEdgeType={defaultEdgeType}
                                    defaultPointDirection={defaultPointDirection}
                                />
                            </Ribbon>
                        </RibbonWrapper>
                        <DefaultContext.Provider value={{
                            node: {
                                backgroundColor: defaultNodeBackgroundColor[0],
                                foregroundColor: defaultNodeForegroundColor[0]
                            },
                            // edge: {
                            //     color: ,
                            //     pointType: ,
                            //     edgeType: ,
                            // }
                        }}>
                            {/* <PropertiesPanel
                                selectedNodes={selectedNodes}
                                selectedEdges={selectedEdges}
                            /> */}
                        </DefaultContext.Provider>
                        <NodePropertiesPanel
                            selectedItem={selectedNodes[selectedNodes.length - 1]}
                        />
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            defaultEdgeOptions={defaultEdgeOptions}
                            onInit={setReactFlowInstance}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            // onNodeClick={onNodeClick}
                            // onEdgeClick={onEdgeClick}
                            onDragStart={onDragStart}
                            onDragOver={onDragOver}
                            onDrop={onDrop}
                            onConnect={onConnect}
                            onPaneClick={onPaneClick}
                            defaultViewport={defaultViewport}
                            onSelectionChange={onSelectionChange}
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