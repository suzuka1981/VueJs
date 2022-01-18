<template>
    <div class="body">
        <div class="topMenu">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">
                    Basic info
                </el-menu-item>
                <el-menu-item index="2">
                    Self storage
                </el-menu-item>
                <el-menu-item index="3">
                    Payment methods
                </el-menu-item>
            </el-menu>
        </div>
        <div>
            <BasicInfo msg="" v-show="activeIndex==='1'"/>
            <SelfStorage msg="" v-show="activeIndex==='2'"/>
            <PaymentMethods msg="" v-show="activeIndex==='3'"/>
        </div>
    </div>
</template>

<script>
    const BasicInfo = () => import('@/components/buyers/Profile/BasicInfo/BasicInfo.vue')
    const SelfStorage = () => import('@/components/buyers/Profile/SelfStorage/SelfStorage.vue')
    const PaymentMethods = () => import('@/components/buyers/Profile/PaymentMethods/PaymentMethods.vue')


    export default {
        name: "Offer",
        components:{
            BasicInfo,
            SelfStorage,
            PaymentMethods,
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