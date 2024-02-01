<template>
  <a-card title="Users">
    <span>
      <el-button type="primary" class="mb-3 p-3">
        <h1>CREATE ACCOUNT</h1>
      </el-button>
    </span>
    <div class="row">
      <div class="col-md-6">
        <el-form :model="form" label-width="120px">
          <el-form-item label="Name">
            <el-input placeholder="Name" v-model="formInput.name"></el-input>
          </el-form-item>
          <el-form-item label="Username">
            <el-input placeholder="Username" v-model="formInput.username" />
          </el-form-item>
          <el-form-item label="Password">
            <!-- <span class="text-danger">*</span> -->
            <el-input placeholder="Password" type="password" v-model="formInput.password" />
          </el-form-item>
          <el-form-item label="Date of Birth">
            <el-col>
              <el-date-picker 
              v-model="formInput.dateofbirth" 
              type="date" 
              placeholder="Pick a date" 
              style="width: 100%;" 
              clearable
              />
            </el-col>
          </el-form-item>
          <el-form-item label="Account's type">
            <el-select v-model="formInput.permission" placeholder="Select type">
              <el-option label="Super user" value="1" />
              <el-option label="User" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button>Cancel</el-button>
            <el-button type="danger" @click="clearForm">Clear</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="col-md-6">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="Name"/>
          <el-table-column prop="username" label="Username"/>
          <el-table-column prop="password" label="Password" />
          <el-table-column prop="dateofbirth" label="D.O.B" />
          <el-table-column prop="permission" label="Permission" />
        </el-table>
      </div>
    </div>
  </a-card>
</template>
<script>
import { defineComponent, ref, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const formData = reactive({
      username: "",
      password: "",
      type: 0,
    })

    return {
      ...toRefs(formData)
    }
  },
  data() {
    return {
      dataSource: [],
      formInput: [],
      tableData: []
    };
  },
  methods: {
    onSubmit() {
      let dataTbl = {
        name: this.formInput.name,
        username: this.formInput.username,
        password: this.formInput.password,
        permission: this.formInput.permission,
        dateofbirth: this.formInput.dateofbirth.toDateString(),
      }
      this.tableData.push(dataTbl)
    },
    clearForm(){
      this.formInput = []
    }
  }
})
</script>
  