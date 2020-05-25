<template>
    <main>
        <div class="login-page"  data-aos="fade" data-aos-once="true" data-aos-duration="500" data-aos-easing="ease-in-out">
            <div v-on:submit.prevent="login" class="form">
                <div class="title">Logowanie do panelu admina</div>
                <form>
                    <input type="text" v-model="credentials.name" placeholder="Nazwa użytkownika..." required/>
                    <input type="password" v-model="credentials.password" placeholder="Hasło..." required/>
                    <button>Zaloguj</button>
                </form>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            credentials: {
                name: '',
                password: '',
            },
        };
    },
    methods: {
        login() {
            this.$store.dispatch('login',this.credentials);
        }
    }
};
</script>

<style lang="scss" scoped>

    main {
        font-family:Montserrat;
        width:100%;
        height:100%;
        display:flex;
        justify-content: center;
        align-items: center;
    }

    .login-page {
        width: 500px;
        padding: 8% 0 0;
        margin: auto;

        .title {
            font-size:24px;
            margin-bottom:20px;
        }

        .form {
            position: relative;
            z-index: 1;
            background: #FFFFFF;
            max-width: 360px;
            margin: 0 auto 100px;
            padding: 45px;
            text-align: center;
            box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);

            input {
                font-family: "Roboto", sans-serif;
                outline: 0;
                background: #f2f2f2;
                width: 100%;
                border: 0;
                margin: 0 0 15px;
                padding: 15px;
                box-sizing: border-box;
                font-size: 14px;
                transition: all .3s ease-in-out;

                &:focus {
                    background: rgba(76, 175, 80, 0.2);
                }
            }

            button {
                font-family: "Roboto", sans-serif;
                text-transform: uppercase;
                outline: 0;
                background: #4CAF50;
                width: 100%;
                border: 0;
                padding: 15px;
                color: #FFFFFF;
                font-size: 14px;
                transition: all .3s ease-in-out;
                cursor: pointer;

                &:hover, &:active, &:focus {
                    background: #43A047;
                }
            }
        }
    }

    @media (max-width:767px) {
        .login-page {
            width:100%;
            height:100%;
            padding:0;

            .form {
                max-width:100%;
                width:100%;
                height:100%;
                display:flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin:0;
                padding:0px 20px;
                box-sizing: border-box;
            }
        }
    }
</style>