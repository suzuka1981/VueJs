<template>
    <div class="body">
        <div>
            <el-row class="martoptobut">
                <el-col :span="4" class="leftofcol">
                    <div class="spanofcenter">
                        Warehouse
                    </div>
                    <el-select
                            class="selectwidth"
                            v-model="warehouse"
                            placeholder="Warehouse">
                        <el-option
                                v-for="item in structForm.optionsOfWarehouse"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="2" class="leftofcol">
                    <el-button
                            class="martoptobut"
                            size="small"
                            @click="handleCaseOfBut">
                        <span class="sizeofadd">+</span>
                        <span class="martop">Case</span>
                    </el-button>
                </el-col>
            </el-row>
        </div>
        <div class="topMenu">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">
                    Active
                </el-menu-item>
                <el-menu-item index="2">
                    Closed
                </el-menu-item>
            </el-menu>

        </div>
        <div>
            <ProviderActive msg="" v-show="activeIndex==='1'"/>
            <ProviderClosed msg="" v-show="activeIndex==='2'"/>
        </div>

        <div class="dialog">
            <!--      Add support case      -->
            <el-dialog
                    :close-on-press-escape="false"
                    :close-on-click-modal="false"
                    title="Add support case" :visible.sync="dialogFormVisible">
                <el-form :model="formData">
                    <el-row class=topRowBetw>
                        <el-col :span="11">
                            <el-form-item>
                                <div class="spanofcenter">
                                    Warehouse
                                </div>
                                <el-select
                                        class="selectwidth"
                                        v-model="formData.warehouse"
                                        placeholder="Warehouse">
                                    <el-option
                                            v-for="item in structForm.optionsOfWarehouse"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item>
                                <div class="spanofcenter">
                                    Category
                                </div>
                                <el-select
                                        class="selectwidth"
                                        v-model="formData.category"
                                        placeholder="Category">
                                    <el-option
                                            v-for="item in structForm.optionsOfCategory"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>


                    <el-row class="topRowBetw">
                        <el-col :span="23">
                            <el-form-item>
                                <el-input v-model="formData.title" placeholder="Title" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row class="topRowBetw">
                        <el-col :span="23">
                            <el-form-item>
                                <el-input
                                        type="textarea"
                                        :rows="5"
                                        placeholder="Question"
                                        v-model="formData.question">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <div class="iconofupload">
                        <i class="el-icon-upload"></i>
                        <el-upload
                                ref="upload"
                                action="#"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :file-list="formData.fileList"
                                :limit="3"
                                :auto-upload="false">
                            <el-button slot="trigger" size="small">Upload file (max 3 files)</el-button>
                        </el-upload>
                    </div>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">Close</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">Submit</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    const ProviderActive = () => import('@/components/provider/Warehouse/Support/ProviderActive.vue')
    const ProviderClosed = () => import('@/components/provider/Warehouse/Support/ProviderClosed.vue')


    export default {
        name: "ProviderSupport",
        components: {
            ProviderActive,
            ProviderClosed,

        },
        data() {
            return {
                activeIndex: '1',

                warehouse: '1',
                structForm: {
                    optionsOfWarehouse: [
                        {
                            value: '1',
                            label: 'Easygo warehouse'
                        },
                        {
                            value: '2',
                            label: 'Vite USA'
                        },
                    ],
                    optionsOfCategory: [
                        {
                            value: '1',
                            label: 'Billing'
                        },
                        {
                            value: '2',
                            label: 'Inbound'
                        },
                        {
                            value: '3',
                            label: 'Outbound'
                        },
                        {
                            value: '4',
                            label: 'Others'
                        },
                    ],
                },

                dialogFormVisible: false,
                formData: {
                    warehouse: '1',
                    category: '',
                    question: '',
                    fileList: [],
                },
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                this.activeIndex = key
            },

            handleCaseOfBut() {
                this.dialogFormVisible = true
            },

            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
        }
    }
</script>

<style scoped lang="less">
    .topMenu {
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
    }

    .topRowBetw {
        display: flex;
        justify-content: flex-start;
    }

    .spanofcenter {
        font-size: 12px;
    }

    .selectwidth {
        width: 100%;
    }

    .sizeofadd {
        font-size: 25px;
        margin-right: 5px;
    }

    .martop {
        font-size: 17px;
    }

    .martoptobut {
        margin-top: 15px;
    }

    .leftofcol {
        margin-left: 10px;
    }

    .iconofupload {
        display: flex;
        font-size: 25px;

        i {
            margin-top: 7px;
            margin-right: 5px;
        }
    }
</style>