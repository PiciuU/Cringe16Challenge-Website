<template>
    <main>
        <div class="panel">
            <header>
                <a href="/" class="button">Wróć na stronę głowną</a>
                <span>Panel Administracyjny</span>
                <div class="button" @click="logout">Wyloguj</div>
            </header>

            <div class="mobile_buttons">
                <a href="/" class="button">Wróć na stronę głowną</a>
                <div class="button" @click="logout">Wyloguj</div>
            </div>

            <div id="notification">
                <div @click="close()" id="modal" v-html="message"></div>
            </div>

            <table v-if="application_queue!=0" id="application_list">
                <caption>Oczekujące zgłoszenia</caption>
                <thead>
                    <tr>
                    <th>Nazwa</th>
                    <th>Nominacja od</th>
                    <th>Link do nagrania</th>
                    <th>Link do zdjęcia</th>
                    <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(application, index) in application_queue" :key="application.id">
                        <td data-label="Nazwa">{{ application.name }}</td>
                        <td data-label="Nominacja od">{{ application.nomination_from }}</td>
                        <td class="text" data-label="Link do nagrania"><a :href="application.video" target="_blank">{{ application.video }}</a></td>
                        <td class="text" data-label="Link do zdjęcia">
                            <span v-if="application.avatar != null"><a :href="application.avatar" target="_blank"> {{ application.avatar }} </a></span>
                            <span v-else>Brak zdjęcia</span>
                        </td>
                        <td class="text" data-label="Status">
                            <div class="button" @click="closeApplication(application.id,index)">Zakończ</div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <section class="options">
                <div class="global_options">
                    <div class="title">Ustawienia globalne</div>
                    <div class="option">
                        <span class="option_name">Przybliżenie diagramu</span>
                        <input v-model="diagramZoom" type="number">
                        <div class="button" @click="updateDiagramZoom">Zaktualizuj</div>
                    </div>
                    <div class="option">
                        <span class="option_name">Wartość przybliżenia</span>
                        <input v-model="zoomValue" type="number">
                        <div class="button" @click="updateZoomValue">Zaktualizuj</div>
                    </div><br><br>
                    <div class="option">
                        <span class="option_name">Przybliżenie mobilne</span>
                        <input v-model="mobileZoom" type="number">
                        <div class="button" @click="updateMobileZoom">Zaktualizuj</div>
                    </div>
                    <div class="option">
                        <span class="option_name">Wartość przybliżenia mobilnego</span>
                        <input v-model="mobileZoomValue" type="number">
                        <div class="button" @click="updateMobileZoomValue">Zaktualizuj</div>
                    </div><br><br>
                    <div class="option">
                        <span class="option_name">Dzielnik pozycjonowania</span>
                        <input v-model="divider" type="number">
                        <div class="button" @click="updateDivider">Zaktualizuj</div>
                    </div>
                </div>
                <div class="feature_options">
                    <div class="title">Ustawienia odpowiedzi</div>
                    <a :href="latestAnswerVideo" target="_blank" class="video" :style="{ backgroundImage: 'url(' + latestAnswerThumbnail + ')' }">
                        <div class="dimness"></div>
                        <span class="author">{{ latestAnswerTitle }}</span>
                        <div class="play-btn"><span class="arrowhead"></span></div>
                    </a>
                    <div class="option">
                        <span class="option_name">Link do filmu</span>
                        <input v-model="latestAnswerVideo" type="text">
                    </div>
                    <div class="option">
                        <span class="option_name">Link do miniaturki</span>
                        <input v-model="latestAnswerThumbnail" type="text">
                    </div>
                    <div class="option">
                        <span class="option_name">Tytuł filmu</span>
                        <input v-model="latestAnswerTitle" type="text">
                    </div>
                    <div class="button" @click="updateAnswer">Zaktualizuj</div>
                </div>
            </section>

            <section class="answers">
                <div class="title">Lista odpowiedzi</div>
                <textarea v-model="answered"></textarea>
                <div class="hint">Ostatni element w tablicy należy pozostawić bez przecinka po zamknięciu klamry.</div>
                <div class="button" @click="updateAnswers">Zaktualizuj</div>
            </section>

            <section class="nominations">
                <div class="title">Lista nominacji</div>
                <textarea v-model="nominations"></textarea>
                <div class="hint"><span class="important">BARDZO WRAŻLIWE DANE!</span> Upewnij się o poprawności danych i miejsc przecinków przed dodaniem.</div>
                <div class="button" @click="updateNominations">Zaktualizuj</div>
            </section>

            <section class="options last">
                <div class="upload">
                    <Upload></Upload>
                </div>
                <div class="backup">
                    <div class="title">Opcje przywracania danych</div>
                    <div class="information">Poniższe przyciski umożliwiają przywrócenie ostatniej poprawnej bazy danych w przypadku popełnienia błędu w powyższych opcjach, lub nadpisania ostatniej kopii bezpieczeństwa.</div>
                    <div class="button" @click="restoreBackup">Przywróć bazę danych</div>
                    <div class="button" @click="overwriteBackup">Nadpisz bazę danych</div>
                </div>
            </section>

            <div id="restore_agreement">
                <div class="modal">
                    <div class="danger">Zaraz uruchomisz procedurę przywracania bazy danych.<br> Czy jesteś pewny swojej decyzji?</div>
                    <div class="buttons">
                        <div @click="restoreBackup('yes')" class="button">TAK</div>
                        <div @click="restoreBackup('no')" class="button">NIE</div>
                    </div>
                </div>
            </div>

             <div id="overwrite_agreement">
                <div class="modal">
                    <div class="danger">Zaraz uruchomisz procedurę nadpisywania bazy danych.<br> Czy jesteś pewny swojej decyzji?</div>
                    <div class="buttons">
                        <div @click="overwriteBackup('yes')" class="button">TAK</div>
                        <div @click="overwriteBackup('no')" class="button">NIE</div>
                    </div>
                </div>
            </div>

        </div>
    </main>
</template>

<script>
import axios from 'axios'
import Upload from '@/components/Upload'
export default {
    name: 'Admin',
    components: {
        Upload,
    },
    data() {
        return {
            diagramZoom: null,
            mobileZoom: null,
            zoomValue: null,
            mobileZoomValue: null,
            divider: null,

            latestAnswerVideo: null,
            latestAnswerThumbnail: null,
            latestAnswerTitle: null,

            nominations: null,
            answered: null,

            application_queue: null,

            message: '',
        };
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
        },
        fetchData() {
            axios.get('/api/data')
            .then((res) => {
                let data = res.data[0];

                this.diagramZoom = data.diagram_zoom;
                this.mobileZoom = data.mobile_zoom;
                this.zoomValue = data.zoom_value;
                this.mobileZoomValue = data.mobile_zoom_value;
                this.divider = data.divider;
                this.latestAnswerVideo = data.last_answer_video;
                this.latestAnswerThumbnail = data.last_answer_thumbnail;
                this.latestAnswerTitle = data.last_answer_title;

                this.nominations = data.nominations;
                this.answered = data.answered;
            })
            .catch((error) => {
                console.log(error);
            })
        },
        getApplications() {
            axios.get('/api/data/applications')
            .then((response) =>{
                this.application_queue = response.data;
            })
            .catch((error) => {
                console.log(error);
            })
        },
        closeApplication(id,index) {
            axios.put('/api/data/applications/close', { id: id })
            .then(() => {
                this.application_queue.splice(index,1);
                this.showModal(true,"Zamknięto oczekujące zgłoszenie.");
            })
            .catch(() => {
                this.showModal(false,"Zamknięcie oczekującego zgłoszenia zakończone niepowodzeniem. Spróbuj ponownie później lub sprawdź poprawność danych.");
            })
        },
        updateDiagramZoom() {
            axios.put('/api/data/update/settings', { diagram_zoom: this.diagramZoom })
            .then(() => {
                this.showModal(true,"Pomyślnie zaktualizowano opcję \"Przybliżenie diagramu\".");
            })
            .catch(() => {
                this.showModal(false,"Aktualizacja opcji \"Przybliżenie diagramu\" zakończona niepowodzeniem. Spróbuj ponownie później lub sprawdź poprawność danych.");
            })
        },
        updateZoomValue() {
            axios.put('/api/data/update/settings', { zoom_value: this.zoomValue })
            .then(() => {
                this.showModal(true,"Pomyślnie zaktualizowano opcję \"Wartość przybliżenia\".");
            })
            .catch(() => {
                this.showModal(false,"Aktualizacja opcji \"Wartość przybliżenia\" zakończona niepowodzeniem. Spróbuj ponownie później lub sprawdź poprawność danych.");
            })
        },
        updateMobileZoom() {
            axios.put('/api/data/update/settings', { mobile_zoom: this.mobileZoom })
            .then(() => {
                this.showModal(true,"Pomyślnie zaktualizowano opcję \"Przybliżenie mobilne\".");
            })
            .catch(() => {
                this.showModal(false,"Aktualizacja opcji \"Przybliżenie mobilne\" zakończona niepowodzeniem. Spróbuj ponownie później lub sprawdź poprawność danych.");
            })
        },
        updateMobileZoomValue() {
            axios.put('/api/data/update/settings', { mobile_zoom_value: this.mobileZoomValue })
            .then(() => {
                this.showModal(true,"Pomyślnie zaktualizowano opcję \"Wartość przybliżenia mobilnego\".");
            })
            .catch(() => {
                this.showModal(false,"Aktualizacja opcji \"Wartość przybliżenia mobilnego\" zakończona niepowodzeniem. Spróbuj ponownie później lub sprawdź poprawność danych.");
            })
        },
        updateDivider() {
            axios.put('/api/data/update/settings', { divider: this.divider })
            .then(() => {
                this.showModal(true,"Pomyślnie zaktualizowano opcję \"Dzielnik pozycjonowania\".");
            })
            .catch(() => {
                this.showModal(false,"Aktualizacja opcji \"Dzielnik pozycjonowania\" zakończona niepowodzeniem. Spróbuj ponownie później lub sprawdź poprawność danych.");
            })
        },
        updateAnswer() {
            axios.put('/api/data/update/answer', { last_answer_video: this.latestAnswerVideo, last_answer_thumbnail: this.latestAnswerThumbnail, last_answer_title: this.latestAnswerTitle })
            .then(() => {
                this.showModal(true,"Pomyślnie zaktualizowano ustawienia najnowszej odpowiedzi.");
            })
            .catch(() => {
                this.showModal(false,"Aktualizacja ustawień najnowszej odpowiedzi zakończona niepowodzeniem. Spróbuj ponownie później lub sprawdź poprawność danych.");
            })
        },
        updateAnswers() {
            axios.put('/api/data/update/answers', { answered: this.answered })
            .then((response) => {
                console.log(response.data.status);
                this.showModal(true,"Pomyślnie zaktualizowano listę odpowiedzi.");
            })
            .catch(() => {
                this.showModal(false,"Aktualizacja listy odpowiedzi zakończona niepowodzeniem. Spróbuj ponownie później lub sprawdź poprawność danych.");
            })
        },
        updateNominations() {
            axios.put('/api/data/update/nominations', { nominations: this.nominations })
            .then((response) => {
                console.log(response.data.status);
                this.showModal(true,"Pomyślnie zaktualizowano listę nominacji.");
            })
            .catch(() => {
                this.showModal(false,"Aktualizacja listy nominacji zakończona niepowodzeniem. Spróbuj ponownie później lub sprawdź poprawność danych.");
            })
        },
        restoreBackup(mode) {
            if(mode == "yes") {
                axios.get('/api/data/backup/restore')
                .then(() => {
                    this.showModal(true,"Pomyślnie przywrócono ostatnią poprawną bazę danych! Odśwież stronę aby odczytać nowe wartości.");
                    document.querySelector("#restore_agreement").removeEventListener('wheel', function(e){e.preventDefault()});
                    document.querySelector("#restore_agreement").style.display = "none";
                })
                .catch(() => {
                    this.showModal(false,"(Krytyczny błąd) Przywracanie bazy danych zakończone niepowodzeniem. Skontaktuj się z administratorem.");
                    document.querySelector("#restore_agreement").removeEventListener('wheel', function(e){e.preventDefault()});
                    document.querySelector("#restore_agreement").style.display = "none";
                })
            } else if (mode == "no") {
                document.querySelector("#restore_agreement").removeEventListener('wheel', function(e){e.preventDefault()});
                document.querySelector("#restore_agreement").style.display = "none";
            }
            else {
                document.querySelector("#restore_agreement").addEventListener('wheel', function(e){e.preventDefault()});
                document.querySelector("#restore_agreement").style.display = "block";
            }
        },
        overwriteBackup(mode) {
            if(mode == "yes") {
                axios.get('/api/data/backup/overwrite')
                .then(() => {
                    this.showModal(true,"Pomyślnie nadpisano kopię bezpieczeństwa! Odśwież stronę aby odczytać nowe wartości.");
                    document.querySelector("#overwrite_agreement").removeEventListener('wheel', function(e){e.preventDefault()});
                    document.querySelector("#overwrite_agreement").style.display = "none";
                })
                .catch(() => {
                    this.showModal(false,"(Krytyczny błąd) Nadpisywanie kopii bezpieczeństwa zakończone niepowodzeniem. Skontaktuj się z administratorem.");
                    document.querySelector("#overwrite_agreement").removeEventListener('wheel', function(e){e.preventDefault()});
                    document.querySelector("#overwrite_agreement").style.display = "none";
                })
            } else if (mode == "no") {
                document.querySelector("#overwrite_agreement").removeEventListener('wheel', function(e){e.preventDefault()});
                document.querySelector("#overwrite_agreement").style.display = "none";
            }
            else {
                document.querySelector("#overwrite_agreement").addEventListener('wheel', function(e){e.preventDefault()});
                document.querySelector("#overwrite_agreement").style.display = "block";
            }
        },
        showModal(success,message) {
            let modal = document.getElementById("modal");
            if(success) {
                this.message = "<span style='color:#08A045'>Sukces: " + message + "</span>";
            } else {
                this.message = "<span style='color:#E9190F'>Błąd: " + message + "</span>";
            }

            modal.style.top="0px";
            setTimeout(() => { modal.style.top="-90px"; },4000);
        }
    },
    created() {
        this.fetchData();
        this.getApplications();
    }
};
</script>

<style lang="scss" scoped>
    main {
        width:100%;
        height:100%;
        font-family:Montserrat;

        .panel {
            display:flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
        }

        header {
            width:100%;
            height:49px;
            display:flex;
            justify-content: space-around;
            align-items:center;
            padding:20px 0px;
            border-bottom: 1px solid #ccc;
            background-color: #f8f8f8;
            font-weight:bold;

            .button{
                border-radius:3px;
                margin-bottom:5px;
                padding:10px 20px;
                text-align:center;
                text-decoration:none;
                font-family:Glenn-Sans;
                font-size:14px;
                color: #ecf0f1;
                box-shadow: 0px 6px #d35400;
                background: #e67e22;
                cursor:pointer;
                transition: text-shadow .2s ease-in-out;

                &:active  {
                    position:relative;
                    top:6px;
                    box-shadow: 0px 0px #d35400;
                    background: #d35400;
                }
                &:hover {
                    text-shadow: 2px 2px 0px rgba(0,0,0,.3)
                }
            }

            span {
                font-size:42px;
            }
        }

        .mobile_buttons {
            display:none;
            width:100%;
            margin-top:30px;
            justify-content:space-around;

            .button{
                border-radius:3px;
                margin-bottom:5px;
                padding:10px 20px;
                text-align:center;
                text-decoration:none;
                font-family:Glenn-Sans;
                font-size:14px;
                color: #ecf0f1;
                box-shadow: 0px 6px #d35400;
                background: #e67e22;
                cursor:pointer;
                transition: text-shadow .2s ease-in-out;

                &:active  {
                    position:relative;
                    top:6px;
                    box-shadow: 0px 0px #d35400;
                    background: #d35400;
                }
                &:hover {
                    text-shadow: 2px 2px 0px rgba(0,0,0,.3)
                }
            }
        }

        #notification {
            width:100%;
            text-align:center;

            #modal {
                width:100%;
                height:90px;
                overflow:hidden;
                border-bottom: 1px solid #ccc;
                background-color: #f8f8f8;
                position:fixed;
                top:-90px;
                box-sizing: border-box;
                display:flex;
                justify-content: center;
                align-items:center;
                transition: .5s ease-in-out;
                z-index:997;
                color:black;
                font-weight:bold;
                font-size:18px;
            }
        }

        #restore_agreement, #overwrite_agreement {
            display:none;
            position:fixed;
            width:100%;
            height:100%;
            background:rgba(0, 0, 0, 0.6);

            .modal {
                position:fixed;
                width: 500px;
                height: 200px;
                top: 50%;
                left: 50%;
                margin-top: -100px;
                margin-left: -250px;
                background:white;
                box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
                z-index:999;
                transition: .5s ease-in-out;

                .danger {
                    font-size:24px;
                    text-align: center;
                    font-weight:bold;
                    padding:20px 20px;
                }

                .buttons {
                    display:flex;
                    flex-direction: row;
                    justify-content: space-around;
                    align-items:center;

                    .button{
                        width: 100px;
                        display: block;
                        border-radius:3px;
                        margin: 0px 10px 0px 10px;
                        padding:10px 15px;
                        text-align:center;
                        text-decoration:none;
                        font-family:Glenn-Sans;
                        font-size:14px;
                        color: #ecf0f1;
                        box-shadow: 0px 6px #c0392b;
                        background: #e74c3c;
                        cursor:pointer;
                        transition: text-shadow .2s ease-in-out;

                        &:active  {
                            position:relative;
                            top:6px;
                            box-shadow: 0px 0px #c0392b;
                            background: #c0392b;
                        }
                        &:hover {
                            text-shadow: 2px 2px 0px rgba(0,0,0,.3)
                        }
                    }
                }

            }
        }
    }

    #application_list {
        border: 1px solid #ccc;
        border-collapse: collapse;
        margin: 0;
        padding: 0;
        width: 95% !important;
        table-layout: fixed;
        font-family:Montserrat;

        a {
            text-decoration: none;
            color: black;
        }

        caption {
            font-size: 32px;
            margin: 1em 0 .15em;
            }

        tr {
            background-color: #f8f8f8;
            border: 1px solid #ddd;
            padding: .35em;
        }

        th, td {
            padding: .625em;
            text-align: center;
        }

        th {
            font-size: .85em;
            letter-spacing: .1em;
            text-transform: uppercase;
            color:#E9190F;
            font-family:Montserrat-Bold;
        }

        .text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            .green {
                color:#08A045;
            }

            .red {
                color:#E9190F;
            }

            .button{
                width: 100px;
                margin: 0 auto;
                display: block;
                border-radius:3px;
                margin-bottom:5px;
                padding:5px 10px;
                text-align:center;
                text-decoration:none;
                font-family:Glenn-Sans;
                font-size:14px;
                color: #ecf0f1;
                box-shadow: 0px 6px #d35400;
                background: #e67e22;
                cursor:pointer;
                transition: text-shadow .2s ease-in-out;

                &:active  {
                    position:relative;
                    top:6px;
                    box-shadow: 0px 0px #d35400;
                    background: #d35400;
                }
                &:hover {
                    text-shadow: 2px 2px 0px rgba(0,0,0,.3)
                }
            }
        }
    }

    @media screen and (max-width: 1000px) {
        #application_list {
            width:100% !important;
            border: 0;

            a {
                padding-left:5px;
            }

            caption {
                font-size: 30px;
            }

            thead {
                border: none;
                clip: rect(0 0 0 0);
                height: 1px;
                margin: -1px;
                overflow: hidden;
                padding: 0;
                position: absolute;
                width: 1px;
            }

            tr {
                border-bottom: 3px solid #ddd;
                display: block;
                margin-bottom: .625em;
            }

            td {
                border-bottom: 1px solid #ddd;
                display: block;
                font-size: .8em;
                text-align: right;
            }

            td::before {
                content: attr(data-label);
                float: left;
                font-weight: bold;
                text-transform: uppercase;
                color:#E9190F;
            }

            td:last-child {
                border-bottom: 0;
            }
        }
    }

    .options {
        width:100%;
        height:500px;
        display:flex;
        flex-direction: row;
        justify-content: space-around;
        margin-top:50px;

        .global_options, .feature_options {
            width:45%;
            height:100%;
            border: 1px solid #ccc;
            background-color: #f8f8f8;
            position:relative;
            box-sizing: border-box;
        }

        .global_options {
            .title {
                text-align:center;
                font-size:32px;
                padding:20px;
                font-weight:bold;
            }
            .option {
                width:100%;
                display:flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
                margin-bottom:30px;

                .option_name {
                    font-weight:bold;
                    width:35%;
                }

                input[type="number"] {
                    width:50px;
                    display: block;
                    border-radius:3px;
                    margin: 0px 10px 0px 10px;
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

                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }

                .button{
                    width: 100px;
                    display: block;
                    border-radius:3px;
                    margin: 0px 10px 0px 10px;
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

                &:last-child {
                    margin-bottom:0px;
                }
            }
        }

        .feature_options {
            .title {
                text-align:center;
                font-size:32px;
                padding:20px 20px 10px 20px;
                font-weight:bold;
            }
            .video {
                margin: 0 auto;
                position:relative;
                display:block;
                width:100%;
                max-width:500px;
                height:230px;
                background-position:center;
                background-repeat: no-repeat;
                background-size: cover;
                color:white;
                text-decoration: none;
                font-family:Montserrat;
                text-align:left;
                border-radius:10px;
                margin-bottom:15px;

                .dimness {
                    width:100%;
                    height:100%;
                    position:absolute;
                    background: rgba(0,0,0,0.5);
                    border-radius:10px;
                    transition: .5s ease-in-out;
                }

                &:hover > .play-btn:before {
                    animation: pulse-border 1500ms ease-out;
                }

                &:hover > .dimness {
                    background: rgba(0,0,0,0.1);
                }

                .author {
                    font-size:16px;
                    margin:10px;
                    position:absolute;
                }

                .play-btn {
                    position: absolute;
                    z-index: 10;
                    top: 50%;
                    left: 50%;
                    transform: translateX(-50%) translateY(-50%);
                    box-sizing: content-box;
                    display: block;
                    width: 32px;
                    height: 44px;
                    border-radius: 50%;
                    padding: 18px 20px 18px 28px;

                    &:before {
                        content: "";
                        position: absolute;
                        z-index: 0;
                        left: 50%;
                        top: 50%;
                        transform: translateX(-50%) translateY(-50%);
                        display: block;
                        width: 80px;
                        height: 80px;
                        background: #ba1f24;
                        border-radius: 50%;
                    }

                    &:after {
                        content: "";
                        position: absolute;
                        z-index: 1;
                        left: 50%;
                        top: 50%;
                        transform: translateX(-50%) translateY(-50%);
                        display: block;
                        width: 80px;
                        height: 80px;
                        background: #fa183d;
                        border-radius: 50%;
                        transition: all 200ms;
                    }

                    .arrowhead {
                        display: block;
                        position: relative;
                        z-index: 3;
                        width: 0;
                        height: 0;
                        border-left: 32px solid #fff;
                        border-top: 22px solid transparent;
                        border-bottom: 22px solid transparent;
                    }
                }

                @keyframes pulse-border {
                    0% {
                        transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);
                        opacity: 0;
                    }
                }
            }

            .option {
                width:100%;
                display:flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
                margin-bottom:10px;
                padding: 0px 20px;
                box-sizing: border-box;

                .option_name {
                    width:35%;
                    font-weight: bold;
                }

                input[type="text"] {
                    width:65%;
                    display: block;
                    border-radius:3px;
                    margin: 0px 10px 0px 10px;
                    padding: 7px 15px;
                    border: none;
                    outline:none;
                    box-shadow: 0 0 20px 0 rgba(#7f8c8d,0.2), 0 5px 5px 0 rgba(#7f8c8d,0.2);
                    -moz-appearance: textfield;
                    transition: .5s ease-in-out;

                    &:focus {
                        background: #F7FFF7;
                    }
                }
            }

            .button{
                width: calc(100% - 80px);
                display: block;
                margin: 0 auto;
                border-radius:3px;
                padding:10px 20px;
                text-align:center;
                text-decoration:none;
                font-family:Glenn-Sans;
                font-size:18px;
                letter-spacing: 1px;
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

    .answers {
        width: 95%;
        height:550px;
        border: 1px solid #ccc;
        background-color: #f8f8f8;
        margin-top: 50px;
        box-sizing: border-box;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .title {
            font-size:36px;
            text-align:center;
            padding: 10px 0px 20px 0px;
            font-weight:bold;
        }

        textarea {
            width:90%;
            height:300px;
            resize:none;
        }

        .hint {
            width:90%;
            font-size:14px;
            text-align:left;
            margin-top:5px;
        }

        .button{
            width: 70%;
            display: block;
            margin: 0 auto;
            border-radius:3px;
            margin-top: 20px;
            padding:10px 20px;
            text-align:center;
            text-decoration:none;
            font-family:Glenn-Sans;
            font-size:18px;
            letter-spacing: 1px;
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

    .nominations {
        width: 95%;
        height:800px;
        border: 1px solid #ccc;
        background-color: #f8f8f8;
        margin-top: 50px;
        box-sizing: border-box;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .title {
            font-size:36px;
            text-align:center;
            padding: 10px 0px 20px 0px;
            font-weight:bold;
        }

        textarea {
            width:90%;
            height:550px;
            resize:none;
        }

        .hint {
            width:90%;
            font-size:14px;
            text-align:left;
            margin-top:5px;

            .important {
                color: #E9190F;
                font-weight:bold;
            }
        }

        .button{
            width: 70%;
            display: block;
            margin: 0 auto;
            border-radius:3px;
            margin-top: 20px;
            padding:10px 20px;
            text-align:center;
            text-decoration:none;
            font-family:Glenn-Sans;
            font-size:18px;
            letter-spacing: 1px;
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


    .last { margin-bottom: 50px; }
    .upload, .backup {
        width:45%;
        height:100%;
        border: 1px solid #ccc;
        background-color: #f8f8f8;
        position:relative;
        box-sizing: border-box;
    }

    .backup {
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items:center;
        .title {
            text-align:center;
            font-size:48px;
            padding:20px 20px 10px 20px;
            color: #E9190F;
            font-weight:bold;
        }
        .information {
            padding:0px 20px;
            text-align:center;
            font-size:14px;
            color: #E9190F;
            font-weight: bold;
        }
        .button{
            width: 70%;
            display: block;
            margin: 0 auto;
            border-radius:3px;
            margin-top: 20px;
            padding:10px 20px;
            text-align:center;
            text-decoration:none;
            font-family:Glenn-Sans;
            font-size:18px;
            letter-spacing: 1px;
            color: #ecf0f1;
            box-shadow: 0px 6px #c0392b;
            background: #e74c3c;
            cursor:pointer;
            transition: text-shadow .2s ease-in-out;

            &:active  {
                position:relative;
                top:6px;
                box-shadow: 0px 0px #c0392b;
                background: #c0392b;
            }
            &:hover {
                text-shadow: 2px 2px 0px rgba(0,0,0,.3)
            }
        }
    }

    @media (max-width:999px) {
        .panel {
            width:100%;
            min-height:100%;

            header {
                .button {
                    display:none;
                }
                span {
                    font-size:30px;
                }
            }

            .options {
                height:100%;
                flex-direction: column;

                .global_options {
                    width:100%;
                    margin-bottom:50px;

                    .option > input[type="number"] {
                        width: 40px;
                    }

                    .option > .option_name {
                        padding-left: 10px;
                    }

                    .option:last-child {
                        margin-bottom:30px;
                    }
                }

                .feature_options {
                    width:100%;

                    a {
                        width:90%;
                    }

                    .button {
                        margin-bottom:30px;
                    }
                }
            }

            .answers, .nominations {
                width:100%;
            }

            .last {
                .upload {
                    width:100%;
                    margin-bottom:50px;
                }
                .backup {
                    width:100%;

                    .title {
                        font-size:42px;
                    }

                    .button:last-child {
                        margin-bottom:30px;
                    }
                }
            }

            #restore_agreement > .modal, #overwrite_agreement > .modal {
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                margin: 0;
                display:flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            .mobile_buttons {
                display:flex;
            }
        }
    }

    @media (max-width:360px) {
        .panel > header > span {
            font-size:26px !important;
        }
    }
</style>