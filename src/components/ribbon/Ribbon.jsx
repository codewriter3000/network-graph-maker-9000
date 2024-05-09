const Ribbon = ({ name, children }) => {
    return (
        <div>
            <div>
                {name}
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Ribbon