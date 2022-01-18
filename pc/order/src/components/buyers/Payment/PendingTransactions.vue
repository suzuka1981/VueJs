<template>
    <div class="body">
        <div class="topMenu">
            <el-row class="block-col-2" style="display: flex;justify-content: flex-end;margin-right: 20px">
                <el-col :span="5">
                    <el-input
                            placeholder="Search"
                            suffix-icon="el-icon-search"
                            v-model="searchinput"
                            @input="getListPendingTransactions"
                            clearable
                    >
                    </el-input>
                </el-col>
            </el-row>
        </div>

        <div class="body">
            <Table
                    :pageInfo="pageInfo"
                    @funcSizeChange="getDataSizeChange"
                    @funcCurrentChange="getDataCurrentChange"
                    :tableData="tableData"
                    propsMsg="active"/>
        </div>

    </div>
</template>

<script>
    const Table = () => import('@/components/buyers/Payment/PendingTransactions/PendingTransactionsTable.vue')

    import '@/assets/icon/iconfont.css'

    export default {
        name: "Active",
        components: {
            Table
        },
        created() {
            this.getListPendingTransactions()
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
                tableData: [
                    // {
                    //     id: '1',
                    //     releasedate: '07/14/2021 00:55',
                    //     organization: 'unitedelectronicsdeals',
                    //     product: 'Iphone',
                    //     unitpriceqty: '$600 * 3',
                    //     total: '$1800',
                    //     warehouse: 'self',
                    // },
                ],

            };
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
                this.pageInfo.searchinput = this.searchinput
                this.pageInfo.type = 'transactions'

                const {data: res} = await this.$http.post('taskoffer/querypendingtransactions', this.pageInfo)

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    if(res.pendingTransactionsMap){
                        this.tableData = res.pendingTransactionsMap
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
    .el-dropdown-link {
        cursor: pointer;
        color: #666666;
        text-decoration: underline;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .demonstration {
        display: block;
        color: #8492a6;
        font-size: 12px;
        margin-bottom: 5px;
    }

    .el-col {
        margin-left: 20px;
        text-align: left;
    }

    .selectprefix {
        /deep/ .el-input__inner {
            background: url('../../../assets/img/car.png') no-repeat;
            background-size: 16px 14px;
            background-position: 4px 10px;
            padding: 0px 0 0 26px;
            box-sizing: border-box;
            font-size: 14px;
        }
    }

</style>