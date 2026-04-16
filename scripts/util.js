const DIRECTORY = "../../assets/images/"
function getRarity(name) {
    switch (name.toLowerCase()) {
        case 'mythic':
            return '#8c1fd1'
        case 'fabled':
            return '#eb093b'
        case 'legendary':
            return '#00F6FF'
        default:
            return 'white'
    }
}
