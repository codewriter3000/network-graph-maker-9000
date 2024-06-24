const Ribbon = ({ name, children }: { name: string, children: any }) => {
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