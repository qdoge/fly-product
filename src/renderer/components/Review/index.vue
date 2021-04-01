<template>
    <div class='review-box'>
        <p class='re-title'>等待审核</p>
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
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                prop="number"
                label="未付"
                width="120">
                </el-table-column>
            </el-table>
        </div>
        <div class='table-buttons'>
            <el-button @click='handleDelete'>删除</el-button>
            <el-button type="primary" @click='handleReview'>审核</el-button>
        </div>
    </div>
</template>

<script>
import { getTime , getTimeSimple } from '../../utils/index';
export default {
    name: 'review',
    data (){
        return {
            tableData:JSON.parse(window.sessionStorage.getItem('tableData')),
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
        handleDelete (){
            if(this.handleArray.length == 0){
                this.$message({
                    type: 'warning',
                    message: '请勾选需要删除的项目'
                });
                return;
            }
            this.$confirm('此操作将删除选中的费用报销单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.tableData = this.tableData.filter(items => {
                    if(!this.handleArray.includes(items)) return items;
                })
                window.sessionStorage.setItem('tableData',JSON.stringify(this.tableData));
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        handleReview (){
            if(this.handleArray.length == 0){
                this.$message({
                    type: 'warning',
                    message: '请勾选需要审核的项目'
                });
                return;
            }
            this.$confirm('确定审核选中的费用报销单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.tableData = this.tableData.filter(items => {
                    if(!this.handleArray.includes(items)) return items;
                })
                window.sessionStorage.setItem('tableData',JSON.stringify(this.tableData));
                // this.$router.push({name: 'Pay'});
                window.sessionStorage.setItem('arrayData',JSON.stringify(this.handleArray));
                this.$message({
                    type: 'success',
                    message: '费用报销单审核成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消审核'
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
