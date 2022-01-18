<template>
    <div class="body">
        <div class="topMenu">
            <el-row class="block-col-2" style="display: flex;justify-content: flex-end">
                <el-col :span="5" style="display:flex;justify-content: flex-end;">
                    <div style="width:250px;margin-top: 20px;margin-right: 20px;">
                        <el-input
                                placeholder="Search"
                                suffix-icon="el-icon-search"
                                v-model="searchinput"
                                @input="getListOfferActive"
                                clearable
                        >
                        </el-input>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="body">
            <Table
                    :pageInfo="pageInfo"
                    :tableData="tableData"
                    @funcApprove="getRowApprove"
                    @funDeny="getRowDeny"
                    @funcSizeChange="getDataSizeChange"
                    @funcCurrentChange="getDataCurrentChange"
                    propsMsg="proposed"/>
        </div>
    </div>
</template>

<script>
    const Table = () => import('@/components/provider/Offer/comp/ProviderProposedTable.vue')

    import '../../../assets/icon/iconfont.css'

    export default {
        name: "Active",
        components: {
            Table
        },
        created() {
            this.getListOfferActive()
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
                tableData: null,

            };
        },
        methods: {
            getDataSizeChange(val) {
                this.pageInfo.pageSize = val
                this.getListOfferActive()
            },
            getDataCurrentChange(val) {
                this.pageInfo.current = val
                this.getListOfferActive()
            },
            async getListOfferActive() {
                this.pageInfo.username = window.sessionStorage.getItem("username")
                this.pageInfo.type = window.sessionStorage.getItem("type")
                this.pageInfo.id = window.sessionStorage.getItem("userid")
                this.pageInfo.searchinput = this.searchinput
                const {data: res} = await this.$http.post('buyersoffer/queryBuyersListPageProposed', this.pageInfo)

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    this.tabledataTmp = []
                    if (res.querylistOfferList) {
                        res.querylistOfferList.forEach(function (item) {
                            if (item.warehousesitesvalue) {
                                let dataStrArr = item.warehousesitesvalue.split(',')
                                let dataIntArr = [];
                                dataIntArr = dataStrArr.map(item => {
                                    return +item;
                                });
                                item.warehousesitesvalue = dataIntArr
                            }
                        })
                    }

                    this.tableData = res.querylistOfferList

                    // console.log(this.tableData)

                    if (res.info) {
                        this.pageInfo.current = res.info.pageNum
                        this.pageInfo.pageSize = res.info.pageSize
                        this.pageInfo.total = res.info.total
                    }
                }
            },
            async getRowApprove(row) {
                let tmp = row

                // tmp.orgid = window.sessionStorage.getItem("userid")
                // tmp.productid = tmp.offer.split('---')[0]
                if (tmp.warehousesitesvalue && tmp.warehousesitesvalue != '') {
                    tmp.warehousesitesvalue = tmp.warehousesitesvalue.toString()
                } else {
                    // return this.$message.error('Select is required.');
                }

                // delete tmp.offer
                delete tmp.warehousesites

                const {data: res} = await this.$http.post('taskoffer/proposedtotaskapprove', tmp)

                if (res.meta.status != 200) {
                    return this.$message.error('Approve Error.');
                } else {
                    this.getListOfferActive()
                }
            },
            getRowDeny(row) {
                this.$confirm('Are you sure to reject the propose?', 'Tips', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(async () => {
                    let tmp = row

                    // tmp.orgid = window.sessionStorage.getItem("userid")
                    // tmp.productid = tmp.offer.split('---')[0]
                    if (tmp.warehousesitesvalue && tmp.warehousesitesvalue != '') {
                        tmp.warehousesitesvalue = tmp.warehousesitesvalue.toString()
                    } else {
                        // return this.$message.error('Select is required.');
                    }

                    // delete tmp.offer
                    delete tmp.warehousesites

                    const {data: res} = await this.$http.post('taskoffer/proposedtotaskdeny', tmp)

                    if (res.meta.status != 200) {
                        return this.$message.error('Approve Error.');
                    } else {
                        this.getListOfferActive()

                        this.$message({
                            type: 'success',
                            message: 'Ok!'
                        });
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Cancel'
                    });
                });
            },
        },
    }
</script>

<style scoped lang="less">
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