const uploadFile = (e: any) => { // eslint-disable-line
    const file = e.target.files[0]
    const fileReader = new FileReader()

    fileReader.readAsText(file)

    return new Promise((resolve) => {
        fileReader.onload = async (fileReaderEvent) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            resolve([fileReaderEvent.target.result, e.target.files[0].name])
        }
    })
}

export default uploadFile