<template>
    <div>
        <div class="top">
            <el-row>
                <el-col :span="6" class="toptitle">
                    <span>Closed cases will be removed after one year</span>
                </el-col>
                <el-col :span="4" :offset="14">
                    <span class="demonstration">end date</span>
                    <el-date-picker
                            v-model="endDate"
                            type="date"
                            placeholder="Select date"
                    >
                    </el-date-picker>
                </el-col>
            </el-row>
        </div>

        <div class="tablebody">
            <Table :tableData="tabledata"
                   @func="getRowhandleOpen"
            />
        </div>

        <div class="dialog">
            <!--            detail page info-->
            <el-dialog
                    :close-on-press-escape="false"
                    :close-on-click-modal="false"
                    title="Package info" :visible.sync="dialogFormVisible" width="90%">
                <el-form :model="dialogForm">
                    <el-card class="heightofcard">
                        <el-card class="cardofbottom">
                            <div>
                                <span class="bolderofall">Note: </span>
                                <span>UPC: </span>
                                <span>{{dialogForm.upc}}</span>
                                <span>total Qty: </span>
                                <span>{{dialogForm.quantity}}</span>
                                <span>normal Qty: </span>
                                <span>{{dialogForm.quantity}}</span>
                                <span>abnormal Qty: </span>
                                <span>{{dialogForm.quantity}}</span>
                            </div>
                            <div>
                                <el-button
                                        class="topofall"
                                        v-show="imageButtonShow(dialogForm)"
                                        @click="handleImageView(dialogForm)">Image view
                                </el-button>
                            </div>
                        </el-card>

                        <el-card v-for="(item,index) in dialogForm.messagelist" :key="index" class="cardofbottom">
                            <div>
                                <span class="bolderofall tobluecolor">unitedelectronicsdeals &nbsp;</span>
                                <span>{{item.date}}</span>
                            </div>
                            <div class="topofall">
                                {{item.msg}}
                            </div>
                            <div class="topofall">
                                <el-button
                                        v-show="imageButtonShow(item)"
                                        @click="handleImageView(dialogForm)">Image view
                                </el-button>
                            </div>
                        </el-card>
                    </el-card>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">Close</el-button>
                    <el-button disabled type="primary" @click="dialogFormVisible = false">Send</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    const Table = () => import('@/components/provider/Warehouse/Support/comp/ProviderClosedTable.vue')

    export default {
        name: "ProviderPackageBytracking",
        components: {
            Table,
        },
        data() {
            return {
                endDate:'',

                tabledata: [
                    {
                        casenumber: '1626154808248253',
                        vendor: 'Easygo warehouse',
                        status: 'In progress',
                        category: 'Inbound',
                        createtime: '07/13/2021 13:40',

                        title: ' Package not found',
                        tracking: ['1ZV4X7540204559529', '1ZV4X7540204559547'],
                        username: 'DavidHe',
                        userspeaktime: '09/09 00:09',
                        usermessage: '1ZV4X7540204559529对方还未送来，还需要等一等…',

                        urls: ['http://localhost:8080/Upload/picsample.png', 'http://localhost:8080/Upload/picsample.png', 'http://localhost:8080/Upload/picsample.png'],
                        messagelist: [
                            {
                                date: '09/06/2021 23:59',
                                msg: '你好，请用这个label return掉，谢谢',
                                urls: [],
                            },
                            {
                                date: '09/06/2021 23:59',
                                msg: '你好，请用这个label return掉，谢谢',
                                urls: ['http://localhost:8080/Upload/picsample.png', 'http://localhost:8080/Upload/picsample.png', 'http://localhost:8080/Upload/picsample.png'],
                            },
                        ],
                        fileList: [],
                    },
                    {
                        casenumber: '1626154808248253',
                        vendor: 'Easygo warehouse',
                        status: 'In progress',
                        category: 'Inbound',
                        createtime: '07/13/2021 13:40',

                        title: ' Package not found',
                        tracking: ['1ZV4X7540204559529', '1ZV4X7540204559547'],
                        username: 'DavidHe',
                        userspeaktime: '09/09 00:09',
                        usermessage: '1ZV4X7540204559529对方还未送来，还需要等一等…',

                        messagelist: [
                            {
                                date: '09/06/2021 23:59',
                                msg: '你好，请用这个label return掉，谢谢',
                                urls: [],
                            }
                        ],
                        urls: [],
                    }
                ],

                dialogFormVisible: false,
                dialogForm: {
                    urls: [],
                },
            }
        },
        methods: {
            selectChangeOfProduct(val) {
                if (val === '1') {
                    this.dialogForm = {
                        upc: '195908335825',
                        note: 'HP 15.6" Touchscreen Laptop - 11th Gen Intel Core i5-1135G7, 12GB, 512GB SSD',
                    }
                }
            },
            handleImageView(row) {
                //跳转新页面router写法
                const routeData = this.$router.resolve({
                    name: 'ViewImages',
                    query: {urls: row.urls, rowlength: row.urls.length},
                    // params: {urls: row}
                })

                window.open(routeData.href, '_blank');
            },
            imageButtonShow(row) {
                // console.log(this.dialogForm.urls.length)
                return row.urls.length > 0
            },
            getRowhandleOpen(row) {
                this.dialogFormVisible = true
                this.dialogForm = row
            },
        },
    }
</script>

<style scoped lang="less">
    .leftof {
        margin-left: 5px;
    }

    .selectwidth {
        width: 100%;
    }

    .spanofcenter {
        font-size: 12px;
    }

    .el-form-item {
        margin-bottom: 5px;
    }

    .noteoftop {
        margin-top: 10px;
    }

    .heightofcard {
        height: 300px;
        overflow-y: auto;
    }

    .cardofbottom {
        margin-bottom: 5px;
    }

    .bolderofall {
        font-weight: bolder;
    }

    .topofall {
        margin-top: 15px;
    }

    .tobluecolor {
        color: #42b983;
    }

    .demonstration {
        display: block;
        color: #8492a6;
        font-size: 12px;
        /*margin-bottom: 5px;*/
    }

    /deep/ .toptitle{
        font-size: 13px;
        margin-top: 20px;
    }
</style>