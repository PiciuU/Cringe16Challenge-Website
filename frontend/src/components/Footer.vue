<template>
    <footer>
        <div class="ownership">
            <div class="owner">Strona stworzona przez piciuhombre</div>
            <div class="property">Własność DreamSpeak & ALPHACK</div>
        </div>
        <div class="copyright">
            <span>Wszelkie prawa zastrzeżone &copy; 2020</span>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Author',
};
</script>

<style lang="scss" scoped>
    footer {
        width:100%;
        height:100px;

        background:whitesmoke;
        display:flex;
        flex-direction: row;
        justify-content: space-around;
        align-items:center;
        font-family: Montserrat;

        .ownership {
            .owner {
                font-size:24px;
                font-weight:bold;
            }
            .property {
                text-align:center;
            }
        }

        .copyright {
            span {
                font-weight: bold;
            }
        }
    }

    @media (max-width:1024px) {
        footer {
            height:20%;
            min-height:150px;
            flex-direction: column;
            text-align:center;

            .f_author {
                .property {
                    margin-top:5px;
                }
            }
        }
    }
</style>