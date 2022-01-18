<template>
    <div>
        <div class="top">
            <el-row>
                <el-col :span="4" :offset="20">
                    <el-input
                            clearable
                            @input="getListPendingTransactions"
                            placeholder="Search"
                            suffix-icon="el-icon-search"
                            v-model="searchinput"></el-input>
                </el-col>
            </el-row>
        </div>

        <div class="tablebody">
            <!--            @func="getRowhandleSelectionChange"-->
            <!--            @funcEditnote="handleAddProduct"-->
            <!--            @funcDetail="handleDetail"-->
            <Table
                    :pageInfo="pageInfo"
                    @funcSizeChange="getDataSizeChange"
                    @funcCurrentChange="getDataCurrentChange"
                    :tableData="tabledata"
            />
        </div>
    </div>
</template>

<script>
    const Table = () => import('@/components/provider/Payment/Pendingtransaction/comp/PendingtransactionTable.vue')

    export default {
        name: "ProviderPackageBytracking",
        components: {
            Table,
        },
        data() {
            return {
                //表单分页
                pageInfo: {
                    pageSize: 50,
                    total: 10,
                    current: 1,
                },

                searchinput: '',

                tabledata: [
                    // {
                    //     id: '1',
                    //     releasedate: '09/14/2021',
                    //     user: 'Xiaolong Lang',
                    //     product: 'NEW - Acer Nitro 5 Gaming Laptop, 9th Gen Intel Core i5-9300H, NVIDIA GeForce GTX 1650, 15.6" Full HD IPS Display, 8GB DDR4, 256GB NVMe SSD, Wi-Fi 6, Backlit Keyboard, Alexa Built-in, AN515-54-5812',
                    //     price: '650',
                    //     qty: '2',
                    //     warehouse: 'warehouse',
                    // }
                ],
            }
        },
        created() {
            this.getListPendingTransactions()
        },
        methods: {
            getDataSizeChange(val) {
                this.pageInfo.pageSize = val
                this.getListPendingTransactions()
            },
            getDataCurrentChange(val) {
                this.pageInfo.current = val
                this.getListPendingTransactions()
            },
            async getListPendingTransactions() {
                this.pageInfo.username = window.sessionStorage.getItem("username")
                this.pageInfo.userid = window.sessionStorage.getItem("userid")
                this.pageInfo.searchinput = this.searchinput
                this.pageInfo.type = 'transactions'
                this.pageInfo.usertype = 'seller'

                const {data: res} = await this.$http.post('taskoffer/querypendingtransactions', this.pageInfo)

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    this.tabledata = []
                    if (res.pendingTransactionsMap) {
                        this.tabledata = res.pendingTransactionsMap
                    }

                    if (res.info) {
                        this.pageInfo.current = res.info.pageNum
                        this.pageInfo.pageSize = res.info.pageSize
                        this.pageInfo.total = res.info.total

                    }
                }
            },
        },
    }
</script>

<style scoped lang="less">
    .leftof {
        margin-left: 5px;
    }
</style>