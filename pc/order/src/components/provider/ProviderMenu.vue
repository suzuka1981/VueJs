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

            <el-submenu index="4">
                <template slot="title">Outbound</template>
                <el-menu-item index="4-1">Outbound Create</el-menu-item>
                <el-menu-item index="4-2">Outbound Status List</el-menu-item>
                <el-menu-item index="4-3">Shipping Label</el-menu-item>
            </el-submenu>

            <!--            <el-menu-item index="10">-->
            <!--                Billing（待做）-->
            <!--            </el-menu-item>-->

            <el-submenu index="5">
                <template slot="title">Warehouse</template>
                <el-menu-item index="5-1">Inventory</el-menu-item>
                <el-menu-item index="5-2">Package</el-menu-item>
                <el-menu-item index="5-3">Site</el-menu-item>
                <!--                <el-menu-item index="5-4">Support</el-menu-item>-->
                <el-menu-item index="5-5">Upload packages</el-menu-item>
            </el-submenu>

            <el-menu-item index="6">Payment</el-menu-item>

            <el-submenu index="7">
                <template slot="title">Setting</template>
                <!--                <el-menu-item index="7-1">Staff</el-menu-item>-->
                <el-menu-item index="7-2">Member</el-menu-item>
                <el-menu-item index="7-3">General</el-menu-item>
                <!--                <el-menu-item index="7-4">Announcement</el-menu-item>-->
            </el-submenu>

            <el-menu-item index="8">Profile</el-menu-item>
            <el-menu-item index="9" icon="el-icon-right" @click="logout">
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
                if (key != '9') {
                    window.sessionStorage.setItem("tmpPath", key)

                    this.$cookies.set("tmpPath", key)
                }
                this.activeIndex = key
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