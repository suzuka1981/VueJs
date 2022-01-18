<template>
    <div class="body">
        <div class="topMenu">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">
                    Payment requests
                </el-menu-item>
                <el-menu-item index="2">
                    Pending transactions
                </el-menu-item>
                <el-menu-item index="3">
                    Transaction history
                </el-menu-item>
            </el-menu>
        </div>
        <div>
            <PaymentRequests msg="" v-show="activeIndex==='1'"/>
            <PendingTransactions msg="" v-show="activeIndex==='2'"/>
            <TransactionHistory msg="" v-show="activeIndex==='3'"/>
        </div>
    </div>
</template>

<script>
    const PaymentRequests = () => import('@/components/buyers/Payment//PaymentRequests.vue')
    const PendingTransactions = () => import('@/components/buyers/Payment//PendingTransactions.vue')
    const TransactionHistory = () => import('@/components/buyers/Payment//TransactionHistory.vue')

    export default {
        name: "Offer",
        components:{
            PaymentRequests,
            PendingTransactions,
            TransactionHistory,
        },
        data() {
            return {
                activeIndex: '1',
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                this.activeIndex = key
            }
        }
    }
</script>

<style scoped lang="less">
    .topMenu{
        margin-bottom: 10px;
    }
</style>