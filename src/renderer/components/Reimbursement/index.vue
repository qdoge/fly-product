<template>
    <div class='reimbursement-box'>
        <p class='re-title'>新建费用报销单</p>
        <p class='re-date'>{{getTime()}}</p>
        <div class='re-form'>
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="姓名" prop='name'>
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="日期" prop='date'>
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style='width: 320px;'></el-date-picker>
                </el-form-item>
                <el-form-item label="费用项目" prop='expense'>
                    <el-select v-model="form.expense" placeholder="请选择费用项目" style='width:320px;'>
                        <el-option label="办公费" value="办公费"></el-option>
                        <el-option label="住宿费" value="住宿费"></el-option>
                        <el-option label="餐费" value="餐费"></el-option>
                        <el-option label="交通费" value="交通费"></el-option>
                        <el-option label="通讯费" value="通讯费"></el-option>
                        <el-option label="业务招待费" value="业务招待费"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注内容">
                    <el-input type="textarea" v-model="form.content"></el-input>
                </el-form-item>
                <el-form-item label="报销金额" prop='number'>
                    <el-input v-model="form.number"></el-input>
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
export default {
    name: 'reimbursement',
    data (){
        var checkNumber = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('报销金额不能为空'));
            }
            setTimeout(() => {
                if (!Number.isInteger(parseInt(value))) {
                    callback(new Error('请输入数字值'));
                }
            }, 1000);
        };
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
                date: [{ required: true, message: '请选择时间', trigger: 'change' }],
                expense: [{ required: true, message: '请选择费用项目', trigger: 'change' }],
                number: [{ required: true, message: '请输入报销金额', trigger: 'blur' }]
            },
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
                    this.$router.push({name : 'Review'});
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
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

