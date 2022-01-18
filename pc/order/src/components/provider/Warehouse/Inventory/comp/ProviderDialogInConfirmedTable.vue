<template>
    <div>
        <el-card class="box-card" style="margin-top: 10px">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%">
                <el-table-column
                        label="ID"
                        width="50">
                    <template slot-scope="scope">
                        {{ scope.row.id }}
                    </template>
                </el-table-column>
                <el-table-column
                        label="User"
                        prop="username"
                        width="200">
                    <template slot-scope="scope">
                        <div v-show="scope.row.type=='self'">
                            {{getMember(scope.row)}}
                            <!--                            {{scope.row.type}}-->
                        </div>
                        <div v-show="scope.row.type!='self'">
                            <span>Bizblock warehouse</span>
                        </div>
                        <!--                        {{getMember(scope.row)}}-->
                    </template>
                </el-table-column>
                <el-table-column
                        label="Site"
                        prop="type"
                        width="350">
                    <template slot-scope="scope">
                        <span v-show="scope.row.sendto == 'self'">
                            {{scope.row.selfsitename}}
                            -
                            {{scope.row.selfaddress1}}
                        </span>
                        <span v-show="scope.row.sendto == 'warehouse'">
                            {{scope.row.sitename}}
                            -
                            {{scope.row.address1}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="Price"
                        prop="price"
                        width="150">
                    <template slot-scope="scope">
                        {{handelToMaoney(scope.row.price)}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="Quantity"
                        prop="quantity"
                        width="200">
                </el-table-column>
                <el-table-column
                        label="Last Update"
                        prop="lastupdate"
                        width="200">
                    <template slot-scope="scope">
                        {{getReleaseDate(scope.row.lastupdate)}}
                    </template>
                </el-table-column>
            </el-table>

            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="detailPageInfo.pageSize"
                        layout=" sizes, prev, pager, next"
                        :total="detailPageInfo.total">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {formatDate} from "../../../../utils/dateFormat";
    import {toMoney} from "../../../../utils/toMoney";

    export default {
        name: "Table",
        props: {
            tableData: [],
            propsMsg: '',
            detailPageInfo: {},
        },
        data() {
            return {}
        },
        methods: {
            handelToMaoney(val) {
                return toMoney(val + '')
            },
            handleSizeChange(val) {
                this.$emit('funcDetailSizeChange', val)
            },
            handleCurrentChange(val) {
                this.$emit('funcDetailCurrentChange', val)
            },
            getReleaseDate(data) {
                let tmpDate = formatDate(new Date(data), "MM-dd-yyyy hh:mm")
                if ((tmpDate.slice(11, 13) - 12) > 0) {

                    return tmpDate.slice(0, 11) + '0' + (tmpDate.slice(11, 13) - 12) + tmpDate.slice(13, tmpDate.length) + ' PM'
                } else {
                    return tmpDate + ' AM'
                }
                return tmpDate
            },
            getMember(row) {
                if (typeof (row.name) != 'undefined' && row.name && row.name != 0 && row.name != 'null') {
                    return row.name
                } else if (typeof (row.username) != 'undefined') {
                    return row.username.split('@')[0]
                }
            },
        }
    }
</script>

<style scoped>
    .block {
        margin-top: 10px;
        margin-right: 5px;
        display: flex;
        justify-content: flex-end;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>