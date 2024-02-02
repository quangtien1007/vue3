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
            <el-input placeholder="Password" type="password" v-model="formInput.password" />
          </el-form-item>
          <el-form-item label="Date of Birth">
            <el-col>
              <el-date-picker v-model="formInput.dateofbirth" type="date" placeholder="Pick a date" style="width: 100%;"
                clearable format="DD/MM/YYYY" value-format="YYYY-MM-DD" />
            </el-col>
          </el-form-item>
          <el-form-item label="Email">
            <el-input placeholder="Email" type="email" v-model="formInput.email" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addUser">Create</el-button>
            <el-button>Cancel</el-button>
            <el-button type="danger" @click="clearForm">Clear</el-button>
            <el-button type="success" @click="getUsers">Get Data</el-button>
            <!-- <el-button type="warning" @click="addUser">Add Data</el-button> -->
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
      formInput: [],
      tableData: []
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
        })
    },
    addUser() {
      let dataAdd = {
        name: this.formInput.name,
        username: this.formInput.username,
        password: this.formInput.password,
        email: this.formInput.email,
        dob: this.formInput.dateofbirth
      }
      // console.log(dataAdd);
      // return
      axios.post("http://127.0.0.1:8000/api/user/create", dataAdd)
        // .then((res) => {
        //   alert("them thanh cong")
        //   console.log(res);
        // })
        .catch((err) => console.log(err))
        .then(() => {
          this.getUsers()
          this.showAlert("success", "Added Succesfully", "DONE")
        })
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
      this.formInput = []
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
  