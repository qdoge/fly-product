<template>
    <div class='pay-box'>
        <p class='re-title'>等待支付</p>
        <p class='re-date'>{{timer}}</p>
        <div>
            <el-table
                ref="multipleTable"
                :data="tableData"
                border
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="120">
                </el-table-column>
                <el-table-column
                prop="expense"
                label="项目"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                label="日期"
                width="120">
                    <template slot-scope="scope">{{scope.row.date}}</template>
                </el-table-column>
                <el-table-column
                prop="number"
                label="未付"
                width="120">
                </el-table-column>
            </el-table>
        </div>
        <div class='table-buttons'>
            <el-button>导出</el-button>
            <el-button type="primary" @click='handlePay'>支付</el-button>
        </div>
    </div>
</template>

<script>
import { getTime, getTimeSimple } from '../../utils/index';
export default {
    name: 'pay',
    data (){
        return{
            tableData : JSON.parse(window.sessionStorage.getItem('arrayData')),
            handleArray: [],
            timer: getTime(),
        }
    },
    methods: {
        getTime,
        getTimeSimple,
        handleSelectionChange (val){
            this.handleArray = val;
        },
        handlePay (){
            if(this.handleArray.length == 0){
                this.$message({
                    type: 'warning',
                    message: '请勾选需要支付的项目'
                });
                return;
            }
            this.$confirm('你确定支付吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.tableData = this.tableData.filter(items => {
                    if(!this.handleArray.includes(items)) return items;
                })
                this.$message({
                    type: 'success',
                    message: '支付成功!'
                });
                window.sessionStorage.setItem('arrayData',JSON.stringify(this.tableData));
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消支付'
                });          
            });
        }
    },
    mounted (){
        let that = this;
        this.theTime = setInterval(() => {
            that.timer = this.getTime();
        },1000);
    },
    beforeDestroy (){
        if (this.theTime) {
            clearInterval(this.theTime); // 在Vue实例销毁前，清除我们的定时器
        }
    }
}
</script>

<style scoped>
    .pay-box{
        width: 100%;
    }
    .re-title{
        color: #333;
        font-size: 20px;
        text-align: center;
        margin-top: 0;
    }
    .re-date{
        text-align: right;
        font-size: 14px;
        color: #999;
    }
    .table-buttons{
        text-align: center;
        margin-top: 20px;
    }
</style>