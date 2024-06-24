import { useState, useEffect } from "react";
import { contrast } from "../util";
import { useReactFlow } from "reactflow";
import ColorPickerControl from "./ColorPickerControl";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const NodePropertiesPanel = ({ selectedItem }) => {
  const { setNodes } = useReactFlow();

  const [isSelected, setIsSelected] = useState(false);

  const [nodeId, setNodeId] = useState("");
  const [nodeLabel, setNodeLabel] = useState("");
  const [nodeBg, setNodeBg] = useState("");
  const [nodeFg, setNodeFg] = useState("");

  const [showLowContrastWarning, setShowLowContrastWarning] = useState(false);

  useEffect(() => {
    if (selectedItem === undefined) {
      setIsSelected(false);
      setNodeId("");
      setNodeLabel("");
      setNodeBg("");
      setNodeFg("");
    } else {
      setIsSelected(true);
      setNodeId(selectedItem.id);
      setNodeLabel(selectedItem.data["label"]);
      setNodeBg(selectedItem.style["backgroundColor"]);
      setNodeFg(selectedItem.style["color"]);
    }
  }, [selectedItem]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedItem?.id) {
          node.data = {
            ...node.data,
            label: nodeLabel,
          };
        }

        return node;
      })
    );
  }, [nodeLabel, setNodes, selectedItem]);

  useEffect(() => {
    const rgbRegex = /rgb\((\d+), (\d+), (\d+)\)/;
    const formattedBgRGB = nodeBg?.match(rgbRegex);
    const formattedFgRGB = nodeFg?.match(rgbRegex);
    const contrastRatio = contrast(
      [
        Number(formattedBgRGB?.[1]),
        Number(formattedBgRGB?.[2]),
        Number(formattedBgRGB?.[3]),
      ],
      [
        Number(formattedFgRGB?.[1]),
        Number(formattedFgRGB?.[2]),
        Number(formattedFgRGB?.[3]),
      ]
    );

    if (contrastRatio < 4.5) {
      setShowLowContrastWarning(true);
    } else {
      setShowLowContrastWarning(false);
    }

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedItem?.id) {
          node.style = {
            ...node.style,
            backgroundColor: nodeBg,
            color: nodeFg,
          };
        }
        return node;
      })
    );
  }, [nodeBg, setNodes, nodeFg, selectedItem]);

  const onNodeDelete = () => {
    setNodes((nds) => nds.filter((node) => node.id !== selectedItem?.id));
  };

  return (
    <aside className="absolute right-2.5 top-2.5 z-10 text-sm space-y-3">
      <div className="h-36 w-40 text-wrap text-left text-yellow-600">
        {showLowContrastWarning && (
          <div className="border border-yellow-600 p-2">
            Warning: You have a low contrast ratio which may make it harder for
            some people to interpret your graph
          </div>
        )}
      </div>
      <div>
        <label className="block">ID:</label>
        <input disabled={true} value={nodeId} />
      </div>

      <div>
        <label className="block">Label:</label>
        <input
          disabled={!isSelected}
          value={nodeLabel}
          onChange={(evt) => {
            setNodeLabel(evt.target.value);
          }}
        />
      </div>

      <div>
        <label className="block">Background Color:</label>
        <ColorPickerControl
          disabled={!isSelected}
          value={nodeBg}
          setValue={setNodeBg}
        />
      </div>

      <div>
        <label className="block">Foreground Color:</label>
        <ColorPickerControl
          disabled={!isSelected}
          value={nodeFg}
          setValue={setNodeFg}
        />
      </div>

      <div className="action-button delete text-center" onClick={onNodeDelete}>
        Hit Backspace or <br />
        Click to Delete Node
      </div>
    </aside>
  );
};
