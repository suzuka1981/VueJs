<template>
    <div class="body">
        <div class="topMenu">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">
                    Users
                </el-menu-item>
<!--                <el-menu-item index="2">-->
<!--                    Groups-->
<!--                </el-menu-item>-->
            </el-menu>
        </div>
        <div>
            <ProviderUsers v-show="activeIndex==='1'"/>

        </div>
    </div>
</template>

<script>
    const ProviderUsers = () => import('@/components/provider/Setting/Member/Users/ProviderUsers.vue')

    export default {
        name: "ProviderMember",
        components:{
            ProviderUsers,

        },
        data() {
            return {
                activeIndex: '1',
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                this.activeIndex = key
            },
        }
    }
</script>

<style scoped lang="less">
    .topMenu{
        margin-bottom: 10px;
    }
</style>