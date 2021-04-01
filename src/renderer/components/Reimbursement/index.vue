<template>
    <div class='reimbursement-box'>
        <p class='re-title'>新建费用报销单</p>
        <p class='re-date'>{{timer}}</p>
        <div class='re-form'>
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="姓名" prop='name'>
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="日期" prop='date'>
                    <el-input v-model="form.date" @blur="focusOut" placeholder="您必须输入2021年1月1日后的日期"></el-input>
                    <!-- <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style='width: 320px;'></el-date-picker> -->
                </el-form-item>
                <el-form-item label="费用项目" prop='expense'>
                    <el-input v-model="form.expense"></el-input>
                </el-form-item>
                <el-form-item label="备注内容">
                    <el-input type="textarea" v-model="form.content"></el-input>
                </el-form-item>
                <el-form-item label="报销金额" prop='number'>
                    <el-input v-model="form.number" @blur="numberOut"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="resetForm('form')">重置</el-button>
                    <el-button type="primary" @click="submitForm('form')">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { getTime } from '../../utils/index';
import { setInterval } from 'timers';
export default {
    name: 'reimbursement',
    data (){
        var checkDate = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('输入的时间不能为空'));
            }
            setTimeout(() => {
                if (parseInt(value.substr(0,4)) < 2021) {
                    callback(new Error('您必须输入2021年1月1日后的日期'));
                }else{
                    callback();
                }
            }, 1000);
        };
        var checkExpense = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('费用项目不能为空'));
            }
            setTimeout(() => {
                let arr = ['办公费','住宿费','餐费','交通费','通讯费','业务招待费'];
                if(!arr.includes(value)){
                    callback(new Error('请输入正确的费用项目'));
                }else{
                    callback();
                }
            }, 1000);
        }
        return {
            form: {
                name: '',
                date: '',
                expense: '',
                content: '',
                number: ''
            },
            rules : {
                name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                date: [{ required: true, validator: checkDate, trigger: 'blur' }],
                expense: [{ required: true, validator: checkExpense, trigger: 'blur' }],
                number: [{ required: true, message: '请输入报销金额', trigger: 'blur' }]
            },
            timer: getTime(),
        }
    },
    methods: {
        getTime,
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let arr = JSON.parse(window.sessionStorage.getItem('tableData')) || [];
                    this.form['id'] = arr.lendth + 1;
                    arr.push(this.form);
                    window.sessionStorage.setItem('tableData',JSON.stringify(arr));
                    this.$message({
                        type: 'success',
                        message: '保存成功!'
                    });
                    this.$refs[formName].resetFields();
                    // this.$router.push({name : 'Review'});
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        focusOut (){
            let str = this.form.date;
            if(str){
                if(str.indexOf("-") == -1){
                    let year = str.substr(0,4);
                    let month = str.substr(4,2);
                    let day = str.substr(6,2);
                    this.form.date = year + '-' + month + '-' + day;
                }
            }
        },
        numberOut (){
            let num = this.form.number;
            console.log(num)
            if(num){
                let y = String(num).indexOf(".") + 1;//获取小数点的位置
                let count = String(num).length - y;//获取小数点后的个数
                if(y > 0) {
                    this.form.number = num.substr(0,y+2);
                } else {
                    this.form.number = num+'.00';
                }
            }
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
    .reimbursement-box{
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
    .re-form{
        width: 400px;
    }
</style>

