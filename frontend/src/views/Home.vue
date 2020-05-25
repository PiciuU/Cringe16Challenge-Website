<template>
    <main>
        <v-touch class="mobile-touch" @pinchin="mobileZoom('out')" @pinchout="mobileZoom('in')">
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

        <transition name="fade">
            <div v-if="showAdminModal" id="modal">
                <div class="header">Powiadomienie</div>
                <div class="content">Masz oczekujące zgłoszenia w panelu admina.</div>
            </div>
        </transition>

    </main>
</template>

<script>
import axios from 'axios';
import DataStore from '@/store/dataStore';
import Diagram from "@/components/Diagram.vue";
import Features from "@/components/Features.vue";
import Footer from "@/components/Footer.vue";

export default {
    name: 'Home',
    data() {
        return {
            showAdminModal: false,
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
        mobileZoom(mode) {
            this.$refs.diagram.mobileZoomFunc(mode);
        },
        async storeData() {
            await DataStore.fetchData()
            this.$refs.diagram.fetchData();
            this.$refs.features.fetchData();
        },
        showModal() {
            if(localStorage.getItem('usertoken')) {
                axios.get('/api/data/applications')
                .then((response) =>{
                    if(response.data.length > 0)
                    {
                       this.showAdminModal = true;
                       setTimeout(() => { this.showAdminModal = false; },3000);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
            }
        }
    },
    created() {
        this.storeData();
    },
    mounted() {
        this.showModal();
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

    #modal {
        width:250px;
        min-height:20px;
        position:fixed;
        top:10px;
        right:10px;
        z-index:2;
        font-family:Montserrat;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
        transition: all .5s ease-in-out;

        .header{
            background-color:#34495e;
            color:white;
            font-weight: bold;
            text-align:center;
            padding:5px;
        }

        .content{
            border-bottom: 3px solid #EFEFEF;
            background:#EFEFEF;
            font-size:14px;
            padding:5px;
            text-align: center;
        }
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

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
