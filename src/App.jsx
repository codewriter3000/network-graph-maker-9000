import { useEffect, useCallback, useRef, useState } from 'react'
import ReactFlow, {
    useNodesState,
    useEdgesState,
    Controls,
    addEdge,
    ReactFlowProvider,
    Background,
    MarkerType, MiniMap
} from 'reactflow'
import { v4 as uuidv4 } from 'uuid'

import 'reactflow/dist/style.css'
import './index.css'

import { PropertiesPanel } from './components/PropertiesPanel.jsx'
import InsertRibbon from './components/InsertRibbon.jsx'
import HomeRibbon from './components/HomeRibbon.jsx'
import { Ribbon, RibbonWrapper } from './components/ribbon/index.js'

const initialNodes = [
  // { id: '1', data: { label: '-' }, position: { x: 100, y: 100 } },
  // { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
]

const initialEdges = [
    // { id: 'e1-2', source: '1', target: '2' }
]
const defaultViewport = { x: 0, y: 0, zoom: 1.5 }

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const [selectedNodeLabel, setSelectedNodeLabel] = useState('')
  const [selectedNodeBg, setSelectedNodeBg] = useState('')
  const [selectedNode, setSelectedNode] = useState({ id: '', label: '', backgroundColor: '' })

  const reactFlowWrapper = useRef(null)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)

  useEffect(() => {
      setSelectedNodeLabel(selectedNode.label)
      setSelectedNodeBg(selectedNode.backgroundColor)
  }, [selectedNode])

  const onNodeClick = (event) => {
      event.preventDefault()

      const regex = '</div>([A-Za-z0-9: ]+)<div'
      const label = event.target.innerHTML.match(regex)?.[1] || ''

      setSelectedNode({
          id: event.target.getAttribute('data-id'),
          label: label,
          backgroundColor: event.target.style.backgroundColor
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
        setSelectedNode({ id: '', label: '', backgroundColor: '' })
    }

    const getId = () => uuidv4() //`node_${incrementAndGetId()}`

    const onDrop = useCallback(
        (event) => {
            const nodeId = getId()

            event.preventDefault()

            const type = event.dataTransfer.getData('application/reactflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
            // and you don't need to subtract the reactFlowBounds.left/top anymore
            // details: https://reactflow.dev/whats-new/2023-11-10
            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            })
            const newNode = {
                id: nodeId,
                // type,
                type: 'default',
                position,
                data: { label: 'Node' },
                style: { backgroundColor: '#eee' },
            }

            setNodes((nds) => nds.concat(newNode))
        },
        [reactFlowInstance],
    )

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
                                  getId={getId}
                                  reactFlowInstance={reactFlowInstance}
                              />
                          </Ribbon>
                      </RibbonWrapper>
                      <PropertiesPanel
                          nodeLabel={selectedNodeLabel}
                          setNodeLabel={setSelectedNodeLabel}
                          setNodes={setNodes}
                          selectedNode={selectedNode}
                          setSelectedNode={setSelectedNode}
                          nodeBg={selectedNodeBg}
                          setNodeBg={setSelectedNodeBg}
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
                          <MiniMap className='bg-zinc-800' />
                          <Background />
                          <Controls />
                      </ReactFlow>
                  </div>
              </div>
          </ReactFlowProvider>
      </div>
  )
}

export default App;