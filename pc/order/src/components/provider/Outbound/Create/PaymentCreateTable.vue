<template>
    <div>
        <el-card class="box-card" style="margin-top: 10px">
            <el-table
                    :row-class-name="rowClassName"
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <!--                <el-table-column-->
                <!--                        label="ID#"-->
                <!--                        width="90">-->
                <!--                    <template slot-scope="scope">{{ scope.row.id }}</template>-->
                <!--                </el-table-column>-->
                <el-table-column
                        label="Product"
                        width="200">
                    <template slot-scope="scope">
                        <div v-if="scope.row.productdata.conditionvalue"
                             :class="{'newFontBolder':scope.row.productdata.conditionvalue==='new'}">
                            {{scope.row.productdata.conditionvalue.charAt(0).toUpperCase()+scope.row.productdata.conditionvalue.slice(1)}}
<!--                            <span v-html="scope.row.productdata.whpname" style="white-space: pre-wrap"></span>-->
                            <span v-if="scope.row.productdata.whpname">{{scope.row.productdata.whpname}}</span>
                            <span v-else-if="scope.row.productdata.name">{{scope.row.productdata.name}}</span>
                        </div>
                        <div class="divofflex">
                            $
                            <span v-html="scope.row.productdata.price" style="white-space: pre-wrap"></span>
                        </div>
                        <div v-for="item in getArr(scope.row.productdata.note)">
                            <a :href="getHref(item)" target="_blank">
                                {{item}}
                            </a>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="User"
                        width="120">
                    <template slot-scope="scope">
                        <div v-show="scope.row.instockdata.type=='self'">
                            {{getMember(scope.row.instockdata)}}
                        </div>
                        <div v-show="!scope.row.instockdata.type">
                            <span>Bizblock warehouse</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="Site"
                        width="220">
                    <template slot-scope="scope">
                        <span v-show="scope.row.instockdata.sendto == 'self'">
                            {{scope.row.instockdata.selfsitename}}
                            -
                            {{scope.row.instockdata.selfaddress1}}
                        </span>
                        <span v-show="!scope.row.instockdata.sendto">
                            {{scope.row.instockdata.sitename}}
                            -
                            {{scope.row.instockdata.address1}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="Ship qty"
                        width="150">
                    <template slot-scope="scope">
                        <el-input
                                @input="inputChange(scope.row.index)"
                                v-if="scope.row.instockdata.status"
                                v-model="scope.row.instockdata.toship">
                            <template slot="prepend" style="width: 50%;">
                                <span class="requiredofspan">
                            *
                                </span>
                            </template>
                        </el-input>
                        <span v-else>{{scope.row.instockdata.toship}}</span>

                        <div v-if="scope.row.instockdata.errormsgshowToship">&nbsp;
                            <span class="errormsg">
                                To-ship error.
                            </span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="Unit price"
                        width="180">
                    <template slot-scope="scope">
                        <el-input v-if="scope.row.instockdata.status"
                                  @input="inputChange(scope.row.index)"
                                  v-model="scope.row.instockdata.unitprice"></el-input>
                        <span v-else>{{scope.row.instockdata.unitprice}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="Unit cost"
                        width="180">
                    <template slot-scope="scope">
                        <el-input v-if="scope.row.instockdata.status"
                                  @input="inputChange(scope.row.index)"
                                  v-model="scope.row.instockdata.unitcost"></el-input>
                        <span v-else>{{scope.row.instockdata.unitcost}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="Available"
                        width="120">
                    <template slot-scope="scope">
                        <div v-show="scope.row.instockdata.type=='self'">

<!--                            <el-input v-if="scope.row.instockdata.status"-->
<!--                                      @input="inputChangeOfQuantity(scope.row.index,1)"-->
<!--                                      v-model="scope.row.instockdata.available"></el-input>-->
                            <span>{{scope.row.instockdata.quantity}}</span>
                        </div>
                        <div v-show="!scope.row.instockdata.type">
<!--                            <el-input v-if="scope.row.instockdata.status"-->
<!--                                      @input="inputChangeOfQuantity(scope.row.index,2)"-->
<!--                                      v-model="scope.row.instockdata.available"></el-input>-->
                            <span>{{scope.row.instockdata.epquantity}}</span>
                        </div>
                        <div v-show="scope.row.instockdata.errormsgshow">&nbsp;
                            <span class="errormsg">
                                Quantity error.
                            </span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="action"
                        label="Action"
                >
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                @click="handleRemove(scope.row)">

                            <i class="el-icon-delete" style="font-size: 22px;margin-left: 3px"></i>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Table",
        props: {
            tableData: [],
            propsMsg: '',
        },
        data() {
            return {
                multipleSelection: [],
            }
        },
        created() {

        },
        methods: {
            inputChangeOfQuantity(index, type) {
                let moment = this.tableData[index]

                if (type == 1) {
                    if (moment.instockdata.quantity < moment.instockdata.available) {
                        moment.instockdata.errormsgshow = true
                    } else {
                        moment.instockdata.errormsgshow = false
                    }
                } else if (type == 2) {
                    if (moment.instockdata.epquantity < moment.instockdata.available) {
                        moment.instockdata.errormsgshow = true
                    } else {
                        moment.instockdata.errormsgshow = false
                    }
                }

                this.$set(this.tableData, index, moment)
                // console.log(index)
                // this.$forceUpdate()
            },

            inputChange(index) {
                let moment = this.tableData[index]

                let quantitytmp = 0

                if (moment.instockdata.sendto) {
                    quantitytmp = moment.instockdata.quantity
                } else {
                    quantitytmp = moment.instockdata.epquantity
                }

                if (!moment.instockdata.toship || moment.instockdata.toship <= 0 || moment.instockdata.toship > quantitytmp) {
                    moment.instockdata.errormsgshowToship = true
                } else {
                    moment.instockdata.errormsgshowToship = false
                }

                this.$set(this.tableData, index, moment)

                // console.log(moment.instockdata.toship)
                // console.log(index)
                // this.$forceUpdate()
            },
            //获取当前的行数
            rowClassName({row, rowIndex}) {
                undefined
                //把每一行的索引放进row
                row.index = rowIndex;
                // console.log(row)
            },
            getMember(row) {
                if (typeof (row.name) != 'undefined' && row.name && row.name != 0 && row.name != 'null') {
                    return row.name
                } else if (typeof (row.username) != 'undefined') {
                    return row.username.split('@')[0]
                }
            },
            getArr(note) {
                if (note) {
                    let tmp = note.split(/[(\r\n)\r\n]+/)
                    return tmp
                } else {
                    return note
                }
            },
            getHref(item) {
                if (item !== null) {
                    if (item.indexOf('http') >= 0) {
                        return item
                    }
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleRemove(row) {
                //传父数据
                this.$emit('func', row)
            },
        }
    }
</script>

<style scoped lang="less">
    .block {
        margin-top: 10px;
        margin-right: 5px;
        display: flex;
        justify-content: flex-end;
    }

    .errormsg {
        color: red;
        font-size: 12px;
    }

    .errormsgbig {
        color: red;
        font-size: 14px;
        cursor: pointer;
    }

    .requiredofspan{
        color: red;
        margin-top: 10px;
    }
</style>