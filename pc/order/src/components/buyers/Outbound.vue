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
            </el-menu>
        </div>
        <div>
            <Active ref="active" msg="" v-show="activeIndex==='1'"/>
            <History ref="history" msg="" v-show="activeIndex==='2'"/>
        </div>
    </div>
</template>

<script>
    const Active = () => import('@/components/buyers/Outbound/Active.vue')
    const History = () => import('@/components/buyers/Outbound/History.vue')

    export default {
        name: "Offer",
        components:{
            Active,
            History,
        },
        data() {
            return {
                activeIndex: '1',
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                switch (key) {
                    case '1':
                        this.$refs.active.getStatusList();
                        break;
                    case '2':
                        this.$refs.history.getStatusList();
                        break;

                    default:

                }

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