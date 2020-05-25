<template>
    <div class="uploader">
        <div class="title">Przesyłanie zdjęcia</div>

        <div class="container">
            <img v-if="image" :src="image">
            <div class="upload_options">
                <div class="upload_btn" @click="$refs.file.click()">Wybierz zdjęcie</div>
                <input style="display:none;" type="file" ref="file" v-on:change="onImageChange">
                <transition name="fade">
                    <input v-if="image" type="text" v-model="fileName" placeholder="Podaj nazwę pliku...">
                </transition>
                <div v-if="image" class="button" @click="uploadImage">Upload Image</div>
            </div>
        </div>

        <div class="gallery">
            <div class="gallery_title">Spis dostępnych zdjęć: </div>
            <ul class="file" v-for="photo in gallery" :key="photo">
                <li>{{ photo }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data(){
            return {
                gallery: null,
                image: '',
                fileName: '',
            };
        },
        methods: {
            fetchData() {
                axios.get('/api/data/gallery')
                .then((response) => {
                    this.gallery = response.data;
                })
                .catch(() => {
                    this.$parent.showModal(false,"Wystąpił nieoczekiwany problem przy pobieraniu spisu zdjęć.");
                })
            },
            onImageChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                let reader = new FileReader();
                let vm = this;
                reader.onload = (e) => {
                    vm.image = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            uploadImage(){
                if(this.fileName.length < 2) { return this.$parent.showModal(false,"Zbyt krótka nazwa zdjęcia (min. 2 znaki)"); }
                axios.post('/api/data/upload',{image: this.image, fileName: this.fileName})
                .then(() => {
                    this.image = "";
                    this.fileName = "";
                    this.$parent.showModal(true,"Pomyślnie przesłano zdjęcie");
                    this.fetchData();
                })
                .catch(() => {
                    this.$parent.showModal(false,"Przesyłanie zdjęcia zakończone niepowodzeniem. Spróbuj ponownie później lub sprawdź format pliku.");
                })

            }
        },
        mounted() {
            this.fetchData();
        }
    }
</script>

<style lang="scss" scoped>
    .uploader {
        width:100%;
        height:100%;
        display:flex;
        flex-direction: column;

        .title {
            text-align:center;
            font-size:36px;
            padding:20px;
            font-weight:bold;
        }

        .container {
            width:100%;
            height:250px;
            display:flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin-bottom:20px;

            img {
                width:250px !important;
                height:250px !important;
                border-radius:50%;
                border: 3px solid black;
                box-sizing: border-box;
            }

            .upload_options {
                width:calc(100% - 300px);
                max-width:300px;
                height:200px;
                display:flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                .upload_btn {
                    width:126px;
                    background: transparent;
                    border: solid 1px #27a9e0;
                    border-radius: 3px;
                    color: #27a9e0;
                    font-size: 16px;
                    margin-bottom:10px;
                    padding: 10px 20px;
                    transition: .3s ease-in-out;
                    font-weight: bold;

                    &:hover {
                        background: #27a9e0;
                        color: white;
                    }
                }

                input[type="text"] {
                    width: 70%;
                    display: block;
                    border-radius:3px;
                    padding:10px 15px;
                    border: none;
                    outline:none;
                    box-shadow: 0 0 20px 0 rgba(#7f8c8d,0.2), 0 5px 5px 0 rgba(#7f8c8d,0.2);
                    text-align:center;
                    -moz-appearance: textfield;
                    transition: .5s ease-in-out;

                    &:focus {
                        background: #F7FFF7;
                    }
                }

                .button {
                    margin-top:10px;
                    width: 100px;
                    display: block;
                    border-radius:3px;
                    padding:10px 15px;
                    text-align:center;
                    text-decoration:none;
                    font-family:Glenn-Sans;
                    font-size:14px;
                    color: #ecf0f1;
                    box-shadow: 0px 6px #7f8c8d;
                    background: #95a5a6;
                    cursor:pointer;
                    transition: text-shadow .2s ease-in-out;

                    &:active  {
                        position:relative;
                        top:6px;
                        box-shadow: 0px 0px #7f8c8d;
                        background: #7f8c8d;
                    }
                    &:hover {
                        text-shadow: 2px 2px 0px rgba(0,0,0,.3)
                    }
                }
            }
        }

        .gallery {
            height:200px;
            width:100%;
            overflow:auto;
            border-top: 2px solid black;
            box-sizing: border-box;

            .gallery_title {
                font-size:20px;
                font-weight: bold;
                padding: 10px 0px 0px 10px;
            }
        }
    }

    @media (max-width:1000px) {
        .uploader {
            .container {
                height:100%;
                flex-direction: column;

                .upload_options {
                    width:100%;
                    max-width:unset;
                }
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