export const uploadFile = (e) => {
    const file = e.target.files[0]
    const fileReader = new FileReader()

    fileReader.readAsText(file)

    return new Promise((resolve) => {
        fileReader.onload = async (fileReaderEvent) => {
            resolve([fileReaderEvent.target.result, e.target.files[0].name])
        }
    })
}