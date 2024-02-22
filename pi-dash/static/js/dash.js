// generic guage component to be imported by main app -cr
const genericGuage = {
    props: ['flask_values'],
    emits: ['updatePost'],
    template: `
    <div :class="[guageTitle]">
        <h3 class="sensor-value">[[ mutableList[1] ]]</h3>
        <h3 class="sensor-name">[[ mutableList[0].replace('_', ' ') ]]</h3>
    </div>
    `,
    mounted() {
        console.log(`Successfully mounted ${this.flask_values[0]} component`)
        setInterval(() => {
            this.fetchData(this.flask_values[0])
        }, 500);
    },

    methods: {
        // Think of this as a place to keep your functions you'll use in app
        async fetchData(endpointName) {
            this.mutableList[1] = await (await fetch(`/${endpointName}`)).json()
        },
    },

    data() {
        // think of this as 'global' variables but for inter-app
        return {
            mutableList: this.flask_values,
            guageTitle: this.flask_values[0] + ' generic-guage '
        }
    },
    created() {

    }
}

// speed guage component to be imported for speedometer styling specific skins
const speedGuage = {
    props: ['flask_values'],
    emits: ['updatePost'],
    template: `
    <div class="speed-guage orbitron-font" >
        <p class="speed-value">[[ mutableList[1] ]]</p>
        <p class="speed-name">MPH</p>
    </div>
    `,
    mounted() {
        console.log(`Successfully mounted speed guage styled component`)
        setInterval(() => {
            this.fetchData(this.mutableList[0])
        }, 500);
    },

    methods: {
        // Think of this as a place to keep your functions you'll use in app
        async fetchData(endpointName) {
            this.mutableList[1] = await (await fetch(`/${endpointName}`)).json()
        },
    },

    data() {
        // think of this as 'global' variables but for inter-app
        return {
            mutableList: [ 'speed', this.flask_values]
        }
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
        genericGuage,
        speedGuage
    }


    })

    // Delimiters changed to ES6 template string style
    // see https://vuejs.org/api/application.html#app-config-compileroptions-delimiters
    app.config.compilerOptions.delimiters = ['[[', ']]']

    app.mount("#app")