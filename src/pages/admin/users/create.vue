<template>
  <a-card title="Users">
    <span>
      <el-button type="primary" class="mb-3 p-3">
        <h1>CREATE ACCOUNT</h1>
      </el-button>
    </span>
    <div class="row">
      <div class="col-md-6">
        <el-form class="demo-ruleForm" :model="formInput" :rules="rules" ref="formInput" label-width="120px">
          <el-form-item label="Name" prop="name">
            <el-input placeholder="Name" v-model="formInput.name"></el-input>
          </el-form-item>
          <el-form-item label="Username" prop="username">
            <el-input placeholder="Username" v-model="formInput.username" clearable />
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input id="password" clearable placeholder="Password" type="password" v-model="formInput.password" />
          </el-form-item>
          <el-form-item label="Date of Birth" prop="dob">
            <el-col>
              <el-date-picker 
                v-model="formInput.dob" 
                type="date" 
                placeholder="Pick a date" style="width: 100%;"
                clearable format="DD/MM/YYYY" 
                value-format="YYYY-MM-DD" />
            </el-col>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input placeholder="Email" type="email" v-model="formInput.email" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-text="isEdit ? 'Accept change':'Create'" @click="addUser('formInput')"></el-button>
            <el-button>Cancel</el-button>
            <el-button type="danger" @click="clearForm">Clear</el-button>
            <el-button type="success" @click="getUsers">Get Data</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="col-md-12 text-center">
        <el-table border stripe :data="tableData" style="width: 100%">
          <!-- <el-table-column prop="id" label="ID"/> -->
          <el-table-column header-align="center" prop="name" label="Name" />
          <el-table-column header-align="center" prop="email" label="Email" />
          <el-table-column header-align="center" prop="dob" sortable class="date" label="D.O.B" />
          <el-table-column header-align="center" prop="created_at" sortable label="created_at" />
          <el-table-column align="center" style="text-align: center;" label="Function" class="text-center">
              <template #default="scope">
                <el-button @click="bindData(scope.row)" type="warning" title="Edit">
                  <font-awesome-icon style="cursor: pointer;" :icon="['fas', 'edit']" />
                </el-button>
              <el-button @click="deleteUser(scope.row)" type="danger" title="Delete">
                <font-awesome-icon style="cursor: pointer;" :icon="['fas', 'trash']" />
              </el-button>
            </template>
            </el-table-column>
        </el-table>
      </div>
    </div>
  </a-card>
</template>
<script>
import axios from 'axios'
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
      formInput: {
          name: '',
          username: '',
          password: '',
          email: '',
          dob: ''
        },
      tableData: [],
      isEdit: false,
      isInRow: false,
      rules: {
          name: [
            { required: true, message: 'Please input your name', trigger: 'blur' },
            { min: 6, max: 50, message: 'Length should be 6 to 50', trigger: 'blur' }
          ],
          username: [
            { required: true, message: 'Please input your username', trigger: 'blur' },
            { min: 6, max: 50, message: 'Length should be 6 to 50', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please set your password', trigger: 'blur' },
            { min: 6, max: 50, message: 'Length should be 6 to 50', trigger: 'blur' }
          ],
          dob: [
            { required: true, message: 'Please pick a date', trigger: 'blur' }
          ],
          email: [
            { type:'email', required: true, message: 'Please write down your email', trigger: 'blur' }
          ]
      }
    };
  },
  methods: {
    getUsers() {
      axios.get("http://127.0.0.1:8000/api/user")
        .then((res) => {
          this.tableData = res.data
          console.log(res.data);
        })
        .catch((err) => console.log(err))
        .then(() => {
          // this.showAlert()
          this.isEdit = false
        })
    },
    addUser(formName) {
      let dataAdd = {
        name: this.formInput.name,
        username: this.formInput.username,
        password: this.formInput.password,
        email: this.formInput.email,
        dob: this.formInput.dob
      }

      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post("http://127.0.0.1:8000/api/user/create", dataAdd)
            .then(() => {
              this.getUsers()
              this.showAlert("success", "Added Succesfully", "DONE")
            })
            .catch((err) => {
              const arr = err.response.data.errors
              console.log(arr);
              this.showAlert("error", "Check your information again !!!", 'ERROR')
            })
          } else {
            console.log('error submit!!');
            return false;
          }
      })
      
     
    },
    bindData(_item){
      this.isEdit = true
      this.formInput = _item
      this.formInput.dateofbirth = _item.dob
      const passwordEle = document.getElementById('password')
      passwordEle.setAttribute("disabled","")
    },
    editUser(_item){
      // this.bindData(_item)
    },
    deleteUser(_item) {
      this.$swal({
        title: `Do you want to delete ${_item.name}?`,
        showDenyButton: true,
        icon: "question",
        showCancelButton: false,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        customClass: {
          actions: 'my-actions',
          confirmButton: 'order-2',
          denyButton: 'order-3',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(`http://127.0.0.1:8000/api/user/delete/${_item.id}`)
          .then(() => {
            this.showAlert("success","Deleted","Done")
            this.getUsers()
          })
        } else if (result.isDenied) {
          this.$swal('Changes are not saved', '', 'info')
        }
      })
    },
    onSubmit() {
      let dataTbl = {
        name: this.formInput.name,
        username: this.formInput.username,
        password: this.formInput.password,
        email: this.formInput.email,
        dob: this.formInput.dateofbirth.toDateString(),
      }
      this.tableData.push(dataTbl)
    },
    clearForm() {
      // this.rules.password.resetField()
      this.formInput = []
      this.isEdit = false
      const passwordEle = document.getElementById('password')
      passwordEle.removeAttribute("disabled")
    },
    showAlert(type = "success", text = 'All done !!!', title = 'DONE') {
      this.$swal({
        icon: type,
        title: `${title}!`,
        text: text,
        confirmButtonText: 'OK'
      });
    },
  }
})
</script>
  