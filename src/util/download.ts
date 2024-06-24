const downloadFile = (title: string, data: any) => { // eslint-disable-line
    const element = document.createElement('a')
    element.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' + encodeURIComponent(data)
    )
    element.setAttribute('download', `${title}.txt`)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
}

export default downloadFile