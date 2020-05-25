<template>
    <div class="container">
        <form v-if="!sent" id="contact" v-on:submit.prevent="sendAnswer">
            <div class="title">#cringe16challenge</div>
            <label>Zgłoszenie odpowiedzi na nominacje</label>
            <input placeholder="Twoja nazwa" type="text" name="name" v-model="credentials.name" required>
            <input placeholder="Kto cię nominował" type="text" name="nomination_from" v-model="credentials.nomination_from" required>
            <input placeholder="Link do nagrania" type="text" name="video" v-model="credentials.video" required>
            <input placeholder="Link do zdjęcia* (zdjęcie na drzewku)" name="avatar" v-model="credentials.avatar" type="text">
            <span class="information">* Jeżeli nie posiadasz jeszcze swojego zdjęcia na drzewku możesz podać link, zostaw puste jeżeli nie chcesz zmieniać aktualnego zdjęcia.</span>

            <button type="submit">Wyślij</button>
            <span class="error" v-if="criticalError">Wystąpił błąd przy wysyłaniu! Spróbuj ponownie później lub skontaktuj się z administratorem strony.</span>
        </form>
        <transition name="fade">
            <div v-if="sent" id="contact">
                <div class="success">
                    <span>Twoja odpowiedź została przekazana do weryfikacji!</span>
                    <button @click="closeModal">Zamknij formularz</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Answer',
    data() {
        return {
            sent: false,
            criticalError: false,
            credentials: {
                name: '',
                nomination_from: '',
                video: '',
                avatar: '',
            }
        };
    },
    methods: {
        sendAnswer() {
            axios.post('/api/answer', this.credentials)
            .then(() => {
                this.sent = true;
                if(this.criticalError) this.criticalError = false;
            })
            .catch((error) => {
                console.log(error);
                this.criticalError = true;
            })
        },
        closeModal() {
            window.close();
        }
    }
};
</script>

<style lang="scss" scoped>

    .container {
        width:100%;
        height:100%;
        display:flex;
        justify-content: center;
        align-items: center;
        font-family:Montserrat;
    }

    #contact {
        width:500px;
        height:420px;
        background: #F9F9F9;
        padding: 25px 25px;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items:center;
        text-align:left;

        .title {
            font-size:36px;
            font-weight:bold;
        }

        label {
            margin: 10px 0px 20px 0px;
            font-weight:bold;
        }

        input[type="text"], textarea {
            width: 100%;
            border: 1px solid #ccc;
            background: #FFF;
            margin: 0 0 5px;
            padding: 10px;
            box-sizing: border-box;
            margin-bottom:10px;
            transition: .5s ease-in-out;
        }

        input[type="text"]:focus {
            background: rgba(#4CAF50,0.2);
        }

        button[type="submit"] {
            width: 100%;
            border: 1px solid #ccc;
            background: #FFF;
            padding: 10px;
            margin: 20px 0px 10px 0px;
            box-sizing: border-box;
            cursor: pointer;
            border: none;
            background: #4CAF50;
            color: #FFF;
            font-size:20px;
        }

        .information {
            font-size:12px;
        }

        .error {
            font-size:14px;
            color:red;
            text-align:center;
            padding: 0px 20px;
        }

        .success {
            display:flex;
            flex-direction: column;
            justify-content: center;
            align-items:center;
            height:100%;
            width:100%;
            text-align:center;

            span {
                font-size:32px;
                color:#08A045;
            }

            button {
                border: 1px solid #ccc;
                border-radius:5px;
                padding: 10px 30px;
                margin-top:70px;
                box-sizing: border-box;
                cursor: pointer;
                border: none;
                background: #4CAF50;
                color: #FFF;
                font-size:20px;
                transition: .5s ease-in-out;
            }

            button:hover {
                transform:scale(1.2);
            }

        }
    }

    @media (max-width:767px) {
        #contact {
            height:100%;
            min-height:420px;
            box-shadow: none;
            padding:0;

            input[type="text"],button[type="submit"] {
                width:90%;
            }
            .information {
                padding:0px 20px;
            }
        }
    }

    @media (max-width:360px) {
        #contact > .title {
            font-size:30px;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>