export default {
    methods: {
        sortDown(prop) {
            prop.sort((a, b) => a.name < b.name ? -1 : 1)
        },
        sortUp(prop) {
            prop.sort((a, b) => a.name < b.name ? 1 : -1)
        },
        sortDetails(prop) {
            prop.sort((a, b) => a < b ? -1 : 1)
        }
    }
}