export default {
    name: 'PlanetDetails',
    data() {
        return {
            notificationError: 'Something went wrong...',
            isError: false
        }
    },
    methods: {
        errorNotification() {
            this.isError = true;
            setTimeout(() => { this.isError = false }, 3000);
        }
    }
}