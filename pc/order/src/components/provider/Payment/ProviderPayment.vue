<template>
    <div class="body">
        <div>
            <el-row>
                <el-col :span="8">
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                             @select="handleSelect">
                        <el-menu-item index="1">
                            To pay
                        </el-menu-item>
                        <el-menu-item index="2">
                            Pending transaction
                        </el-menu-item>
                        <el-menu-item index="3">
                            Transaction history
                        </el-menu-item>
                    </el-menu>
                </el-col>

                <el-col :span="8" class="toTopFlex" :offset="2">
                    <div>
                        <span class="titleOfSpan">Total: </span>
                        <span class="spanOfFontSize">${{handelToMaoney(releasedBalance + pendingBalance)}}</span>
                    </div>

                    <div>
                        <span class="titleOfSpan">Pending: </span>
                        <span class="spanOfFontSize">${{handelToMaoney(releasedBalance)}}</span>
                    </div>

                    <div>
                        <span class="titleOfSpan">Released: </span>
                        <span class="spanOfFontSize">${{handelToMaoney(pendingBalance)}}</span>
                    </div>

                    <div>
                        <span class="titleOfSpan">Request: </span>
                        <span class="spanOfFontSize">${{handelToMaoney(sellerTmpAmountTotal)}}</span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div>
            <ProviderToPay
                    @funcGetData="getDataOfSon"
                    v-show="activeIndex==='1'"/>
            <ProviderPendingtransaction v-show="activeIndex==='2'"/>
            <ProviderTransactionhistory v-show="activeIndex==='3'"/>

        </div>
    </div>
</template>

<script>
    import {toMoney} from "../../utils/toMoney";

    const ProviderToPay = () => import('@/components/provider/Payment/ToPay/ProviderToPay.vue')
    const ProviderPendingtransaction = () => import('@/components/provider/Payment/Pendingtransaction/ProviderPendingtransaction.vue')
    const ProviderTransactionhistory = () => import('@/components/provider/Payment/Transactionhistory/ProviderTransactionhistory.vue')


    export default {
        name: "ProviderPayment",
        components: {
            ProviderToPay,
            ProviderPendingtransaction,
            ProviderTransactionhistory,

        },
        created() {
            // this.getListPaymentRequests()
        },
        data() {
            return {
                activeIndex: '1',

                releasedBalance: 0,
                pendingBalance: 0,
                sellerTmpAmountTotal: 0,
                pageInfo: {},
            };
        },
        methods: {
            handelToMaoney(val) {
                return toMoney(val + '')
            },
            getDataOfSon(data) {
                if (data.releasedBalance) {
                    this.releasedBalance = data.releasedBalance
                } else {
                    this.releasedBalance = 0
                }

                if (data.pendingBalance) {
                    this.pendingBalance = data.pendingBalance
                } else {
                    this.pendingBalance = 0
                }

                if (data.sellerTmpAmountTotal) {
                    this.sellerTmpAmountTotal = data.sellerTmpAmountTotal
                } else {
                    this.sellerTmpAmountTotal = 0
                }


            },
            handleSelect(key, keyPath) {
                this.activeIndex = key
            },
            // async getListPaymentRequests() {
            //     this.pageInfo.username = window.sessionStorage.getItem("username")
            //     this.pageInfo.usertype = "seller"
            //     this.pageInfo.userid = window.sessionStorage.getItem("userid")
            //
            //     const {data: res} = await this.$http.post('taskoffer/querygetpaymentrequests', this.pageInfo)
            //
            //     if (res.meta.status != 200) {
            //         return this.$message.error('Select Error.');
            //     } else {
            //         // if(res.pendingTransactionsMap){
            //         //     this.tableData = res.pendingTransactionsMap
            //         // }
            //
            //         this.optionsOfOrganization = []
            //         let tmpOrgList = []
            //         let tmpOrg = {
            //             value: 'all',
            //             label: '-- All --'
            //         }
            //         tmpOrgList.push(tmpOrg)
            //         if (res.selleruserlist) {
            //             res.selleruserlist.forEach(function (item) {
            //                 tmpOrg = {
            //                     value: item.id,
            //                     label: item.username
            //                 }
            //                 tmpOrgList.push(tmpOrg)
            //             })
            //         }
            //         this.optionsOfOrganization = tmpOrgList
            //
            //         this.releasedBalance = res.releasedBalance
            //         this.pendingBalance = res.pendingBalance
            //
            //         if (res.info) {
            //             this.pageInfo.current = res.info.pageNum
            //             this.pageInfo.pageSize = res.info.pageSize
            //             this.pageInfo.total = res.info.total
            //
            //         }
            //     }
            // },
        }
    }
</script>

<style scoped lang="less">
    .topMenu {
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
    }

    .toTopFlex {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
    }

    .titleOfSpan {
        font-weight: bolder;
    }

    .spanOfFontSize {
        font-size: 14px;
    }
</style>