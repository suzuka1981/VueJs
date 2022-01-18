<template>
    <div class="body">
        <div class="topMenu">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">
                    Active
                </el-menu-item>
                <el-menu-item index="2">
                    Proposed
                </el-menu-item>
                <el-menu-item index="3">
                    Expired
                </el-menu-item>
<!--                <el-menu-item index="4">-->
<!--                    Report-->
<!--                </el-menu-item>-->
            </el-menu>
        </div>
        <div>
            <Active msg="" v-show="activeIndex==='1'"/>
            <Proposed msg="" v-show="activeIndex==='2'"/>
            <Expired msg="" v-show="activeIndex==='3'"/>
<!--            <Report msg="" v-show="activeIndex==='4'"/>-->
        </div>
    </div>
</template>

<script>
    const Active = () => import('@/components/buyers/Offer/Active.vue')
    const Proposed = () => import('@/components/buyers/Offer/Proposed.vue')
    const Expired = () => import('@/components/buyers/Offer/Expired.vue')
    // const Report = () => import('@/components/buyers/Offer/Report.vue')

    export default {
        name: "Offer",
        components:{
            Active,
            Proposed,
            Expired,
            // Report,
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