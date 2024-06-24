import { HexColorPicker } from 'react-colorful'
import { useState, useEffect } from 'react'

const ColorPickerControl = ({
  setValue,
  value,
  disabled,
}) => {

  const [colorPickerIsVisible, showColorPicker] = useState(false)

  useEffect(() => {
    showColorPicker(false)
  }, [disabled])

  return (
    <>
    <div
     className={disabled ? 'bg-zinc-800/70 h-5 w-full' : ''}
     onClick={() => {
        if (!disabled) {
            showColorPicker(!colorPickerIsVisible)
        }
    }}>
        {value}
    </div>
    {colorPickerIsVisible &&
        <HexColorPicker color={value} onChange={val => setValue(val)} />
    }
    </>
  );
};

export default ColorPickerControl;

// fcba03