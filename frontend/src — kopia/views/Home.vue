<template>
    <main>
        <v-touch class="mobile-touch" @pinchin="zoom('out')" @pinchout="zoom('in')">
            <div id="preventScrolling" class="diagram_container">
                <div class="infoBox">
                    <div class="holder">
                        <div class="circle green"></div> <span>Zakończone</span>
                    </div>
                    <div class="holder">
                        <div class="circle red"></div> <span>Nominowany</span>
                    </div>
                </div>
                <Diagram ref="diagram"/>
            </div>
        </v-touch>

        <Features ref="features"/>
        <Footer/>

    </main>
</template>

<script>
import DataStore from '@/store/dataStore';
import Diagram from "@/components/Diagram.vue";
import Features from "@/components/Features.vue";
import Footer from "@/components/Footer.vue";

export default {
    name: 'Home',
    data() {
        return {
        };
    },
    components: {
        Diagram,
        Features,
        Footer,
    },
    methods: {
        driagramPreventScroll(e) {
            e.preventDefault();
        },
        zoom(mode) {
            this.$refs.diagram.mobileZoomFunc(mode);
        },
        async storeData() {
            console.log('1.')
            await DataStore.fetchData()
            this.$refs.diagram.fetchData();
            this.$refs.features.fetchData();
            console.log('3.')
        },
    },
    created() {
        this.storeData();
    },
    mounted() {
        document.querySelector('#preventScrolling').addEventListener('wheel', this.driagramPreventScroll);
    },
    destroyed () {
        document.querySelector('#preventScrolling').removeEventListener('wheel', this.driagramPreventScroll);
    },
};
</script>

<style lang="scss" scoped>

    .mobile-touch {
        position:relative;
        width:100%;
        height:80%;
        overflow:hidden;
    }

    .diagram_container {
        position:relative;
        width:100%;
        height:100%;
        overflow:hidden;

        .infoBox {
            font-family: Glenn-Sans;
            position:absolute;
            top:10px;
            left:10px;
            font-size:14px;
            display:flex;
            flex-direction: column;
            z-index:20;

            .holder {
                display:flex;
                flex-direction: row;
                align-items: center;
                margin-bottom:10px;

                .circle {
                    width:25px;
                    height:25px;
                    border-radius:50%;
                    margin-right:5px;
                }
                .green { background:#08A045; }

                .red { background: #E9190F; }
            }
        }
    }
</style>
