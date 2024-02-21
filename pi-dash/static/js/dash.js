// generic guage component to be imported by main app -cr
const genericGuage = {
    props: ['flask_values'],
    emits: ['updatePost'],
    template: `
    <div class="generic-guage">
        <h3 class="sensor-value">[[ flask_values[1] ]]</h3>
        <h3 class="sensor-name">[[ flask_values[0] ]]</h3>
    </div>
    `,
    mounted() {
        console.log(`Successfully mounted ${this.flask_values[0]} component`)
    },

    created() {

    }
}


// main app
var app = Vue.createApp({

    created() {
        // init actions here
        this.fetchData('rpms')
        this.fetchData('speed')
        this.fetchData('oil_temp')
        this.fetchData('coolant_temp')
        this.fetchData('boost')
        this.fetchData('fuel')

    },

    data() {
        // think of this as 'global' variables but for inter-app
        return {
        test_msg: "Hello world",
        flaskData: {
            }
        }
    },

    methods: {
        // Think of this as a place to keep your functions you'll use in app
        async fetchData(endpointName) {
            this.flaskData[endpointName] = await (await fetch(`/${endpointName}`)).json()
        },
    },

    components: {
        genericGuage
    }


    })

    // Delimiters changed to ES6 template string style
    // see https://vuejs.org/api/application.html#app-config-compileroptions-delimiters
    app.config.compilerOptions.delimiters = ['[[', ']]']

    app.mount("#app")