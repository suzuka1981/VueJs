<template>
    <div class="demo-image__lazy">
        <div v-if="!pdftype">
            <el-image v-for="(url,index) in urls" :key="index" :src="url" lazy></el-image>
        </div>
        <div v-if="pdftype" style="width: 50%;height: 50%;">
            <pdf v-for="(url,index) in urls" :key="index" :src="url"></pdf>
        </div>
    </div>
</template>

<script>
    import pdf from "vue-pdf"

    export default {
        name: "ViewImages",
        props: {
            // urls: [],
        },
        components: {
            pdf,
        },
        created() {
            // console.log(this.$route.query.rowlength === '1')
            if (this.$route.query.type) {
                if (this.$route.query.type === 'pdf') {
                    // this.utilOfOpenPdf(this.$route.query.urls)
                    this.pdftype = true
                } else {
                    this.pdftype = false
                }
            }
            if (this.$route.query.rowlength === '1') {
                this.urls.push(this.$route.query.urls)
            } else {
                this.urls = this.$route.query.urls
            }
        },
        data() {
            return {
                urls: [],
                pdftype: false,
            }
        },
        methods: {
            utilOfOpenPdf(urls) {
                var a = document.createElement('a')
                a.setAttribute('href', urls)
                a.setAttribute('target', '_top')
                a.setAttribute('id', 'openwin')
                document.body.appendChild(a)
                a.click()
            }
        },
    }
</script>

<style scoped>

</style>