<template>
    <div class="body">
        <div class="topMenu">
            <el-row class="block-col-2">
                <el-col :span="8" style="margin-top: 15px;display: flex;justify-content: flex-start;">
                    <div style="width:60%;margin-top: 20px">
                        <el-input
                                placeholder="keyword"
                                v-model="searchinput"
                                @input="getListOfferActive"
                                clearable
                        >
                        </el-input>
                    </div>
                </el-col>

                <el-col :span="14" style="display: flex;justify-content: flex-end;">
                    <div>
                        <span class="demonstration">End date</span>
                        <el-date-picker
                                v-model="endDate"
                                type="date"
                                placeholder="Select date"
                        >
                        </el-date-picker>
                    </div>

                    <div>
                        <el-button @click="" style="margin-top: 21px">Search</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="body">
            <Table
                    @funcDataReLoad="getListOfferActive"
                    @funcSizeChange="getDataSizeChange"
                    @funcCurrentChange="getDataCurrentChange"
                    :pageInfo="pageInfo"
                    :tableData="tableData"
                    propsMsg="active"/>
        </div>
    </div>
</template>

<script>
    const Table = () => import('@/components/provider/Offer/comp/ProviderArchivedTable.vue')

    import '../../../assets/icon/iconfont.css'

    export default {
        name: "Archived",
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
                tabledataTmp: [],
                tableData: [],

                endDate: '',
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
                this.pageInfo.orgid = window.sessionStorage.getItem("userid")
                this.pageInfo.pagetype = "archived"
                this.pageInfo.searchinput = this.searchinput
                const {data: res} = await this.$http.post('offer/queryListPageActive', this.pageInfo)

                if (res.meta.status != 200) {
                    return this.$message.error('Select Error.');
                } else {
                    this.sitedata = res.sitedata
                    this.productdata = res.productdata
                    this.sittingdata = res.sittingdata

                    let tmpSites = []
                    if (res.sitedata) {
                        res.sitedata.forEach(function (item) {
                            let tmp = {}
                            tmp.value = item.id
                            tmp.label = item.sitename + '-' + item.address1
                            tmpSites.push(tmp)
                        })
                    }

                    this.warehousesitesTmp = tmpSites

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

                    this.tabledataTmp = res.querylistOfferList

                    // console.log(this.tabledataTmp)

                    this.pageInfo.current = res.info.pageNum
                    this.pageInfo.pageSize = res.info.pageSize
                    this.pageInfo.total = res.info.total
                }
            },
        },
        computed: {
            getTypeTitle() {
                if (this.type === 'edit') {
                    return 'Edit offer'
                } else if (this.type === 'add') {
                    return 'Add offer'
                }
            },
            getDataPThree() {
                let datetime = new Date()
                datetime = datetime.setDate(datetime.getDate() + 3)
                return new Date(datetime)
            },
        },
        watch: {
            tabledataTmp() {
                this.tableData = this.tabledataTmp
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

    .spanlabel {
        font-size: 20px;
        font-family: "Times New Roman", Times, serif;
    }

</style>