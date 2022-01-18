<template>
    <div>
        <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <!--        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">-->
            <el-menu-item index="1">
                <i class="el-icon-message-solid"></i>
            </el-menu-item>
            <el-menu-item index="2">
                Offer
            </el-menu-item>
            <el-menu-item index="3">
                Task
            </el-menu-item>
            <el-menu-item index="4">
                Outbound
            </el-menu-item>

            <el-submenu index="5">
                <template slot="title">Warehouse</template>
                <el-menu-item index="5-1">Inventory</el-menu-item>
                <!--                <el-menu-item index="5-2">Package</el-menu-item>-->
            </el-submenu>
            <el-menu-item index="6">Payment</el-menu-item>
            <el-menu-item index="7">Profile</el-menu-item>

<!--            <el-menu-item index="9">-->
<!--                Buy Tracking-->
<!--            </el-menu-item>-->

            <el-menu-item index="8" icon="el-icon-right" @click="logout">
                <span><i class="el-icon-right"></i>Logout</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    import router from "../../router";

    export default {
        name: "Menu",
        created() {
            if (window.sessionStorage.getItem("tmpPath")) {
                this.activeIndex = window.sessionStorage.getItem("tmpPath")
            }

            this.handleSelect(this.activeIndex, '')
        },
        data() {
            return {
                activeIndex: '2',
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                if(key != '8') {
                    window.sessionStorage.setItem("tmpPath", key)

                    this.$cookies.set("tmpPath", key)
                }

                this.$emit('func', key)
                // console.log(key);
                // console.log(keyPath);
            },
            logout() {
                window.sessionStorage.removeItem('token')
                router.replace({
                    path: '/login'
                })
            },
        }
    }
</script>

<style scoped>

</style>