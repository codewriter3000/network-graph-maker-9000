import { useState } from 'react'

const RibbonWrapper = ({ home, children }) => {
    const [selectedTab, setSelectedTab] = useState(home)

    return (
        <div className='flex flex-col mb-2 ml-4 mt-2 absolute z-10'>
            <div className='space-x-3'>
                {children.map(child => {
                    return (
                        <button className={selectedTab === child.props.name ? 'border-b-2 border-debug' :
                            'border-b border-debug'} key={child.props.name}
                                onClick={() => setSelectedTab(child.props.name)}>
                            {child.props.name}
                        </button>
                    )
                })}
            </div>
            <div className='flex flex-col'>
                {children.filter(child => child.props.name === selectedTab).map(child => {
                    return (
                        <div className='mt-4' key={child.props.name}>
                            {child.props.children}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RibbonWrapper