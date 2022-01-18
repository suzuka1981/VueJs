<template>
    <div class="body">
        <div class="topMenu">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">
                    Active
                </el-menu-item>
                <el-menu-item index="2">
                    History
                </el-menu-item>
                <el-menu-item index="3">
                    Canceled
                </el-menu-item>
            </el-menu>
        </div>
        <div>
            <Active msg="" v-show="activeIndex==='1'" ref="childActive"/>
            <History msg="" v-show="activeIndex==='2'" ref="childHistory"/>
            <Canceled msg="" v-show="activeIndex==='3'" ref="childCancel"/>
        </div>
    </div>
</template>

<script>
    const Active = () => import('@/components/buyers/Task/Active.vue')
    const History = () => import('@/components/buyers/Task/History.vue')
    const Canceled = () => import('@/components/buyers/Task/Canceled.vue')

    export default {
        name: "Offer",
        components:{
            Active,
            History,
            Canceled,
        },
        data() {
            return {
                activeIndex: '1',
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                this.activeIndex = key

                switch (key) {
                    case '1':
                        this.$refs.childActive.getListOfferActive();
                        break;
                    case '2':
                        this.$refs.childHistory.getListTaskHistory();
                        break;
                    case '3':
                        this.$refs.childCancel.getListTaskHistory();
                        break;
                    default:

                }
            }
        }
    }
</script>

<style scoped lang="less">
    .topMenu{
        margin-bottom: 10px;
    }
</style>