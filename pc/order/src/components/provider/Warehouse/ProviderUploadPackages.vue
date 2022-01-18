<template>
    <div>
        <div class="top">
            <a :href="downloadUrl">
                <i class="el-icon-upload"></i>
                Download template
            </a>
        </div>

        <el-divider></el-divider>

        <div class="divofflex top">
            <i class="el-icon-upload"></i>

            <el-upload
                    :on-success="handleSuccess"
                    :on-change="handleChange"
                    class="uploadself"
                    ref="upload"
                    :action="uploadUrl"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="dialogFormPaymentconfirm.fileList"
                    :limit="1"
                    :data="uploadData"
                    :auto-upload="false">
                <el-button slot="trigger" size="small">Upload file (max 1 files)</el-button>
            </el-upload>

            <el-button @click="submitUpload" :disabled="disabledStart">Start</el-button>
        </div>

        <div>
            <!--            <el-progress :percentage="100" :format="format"></el-progress>-->
        </div>
        <el-divider></el-divider>

        <div class="divofstatus">
            Status:
        </div>

        <div class="divofnote">
            *Note:
            <br>
            1. Don't change or remove the first line in the template
            <br>
            2. Please ensure the correctness and completeness of the content in the upload file.
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "ProviderUploadPackages",
        data() {
            return {
                dialogFormPaymentconfirm: {},
                uploadUrl: axios.defaults.baseURL + "taskoffer/uploadexcel",
                downloadUrl: axios.defaults.baseURL + "taskoffer/download/packages-template.xlsx",
                disabledStart: true,
                uploadData: {
                    exceltype: 'excel',
                    orgid: window.sessionStorage.getItem("userid"),
                },
            }
        },
        methods: {
            handleChange(file, fileList) {
                if (fileList.length > 0) {
                    this.disabledStart = false
                }
            },
            // upload
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                this.$refs.upload.clearFiles()
                this.disabledStart = true
            },
            handlePreview(file) {
                console.log(file);
            },
            format(percentage) {
                return percentage === 100 ? 'Ok' : `${percentage}%`;
            },
            handleSuccess(res, file, fileList) {
                // console.log(res)
                if (res.meta.status === '200') {
                    // this.$message.success(file.name + 'Upload success');
                    this.$message.success(res.meta.successSize + ' upload successed, ' + res.meta.errorSize + ' upload failed (not found)');

                    this.$refs.upload.clearFiles()
                    this.disabledStart = true
                }
            },
        },
    }
</script>

<style scoped lang="less">
    /deep/ .el-icon-upload {
        font-size: 40px;
    }

    /deep/ .top {
        margin-top: 50px;
        margin-left: 50px;
    }

    .divofflex {
        display: flex;
        justify-content: left;
        margin-bottom: 50px;
    }

    .uploadself {
        width: 500px;
    }

    .divofstatus {
        margin-top: 20px;
    }

    .divofnote {
        height: 100px;
        width: 100%;
        position: fixed;
        bottom: 0;
    }

    a {
        text-decoration-line: none;
        color: black;
    }
</style>