<template>
    <h1>asdad</h1>
  </template>
  <script>
//   import { Input, Table } from 'ant-design-vue';
  import { defineComponent, ref, reactive, toRefs } from 'vue'
  // import { useMenu } from '../../../stores/use-menu.js'
  
  export default defineComponent({
    setup(){
      const formData = reactive({
        username:"",
        password:"",
        type:0,
      })
  
      return {
        ...toRefs(formData)
      }
    },
      data() {
          return {
              selectedFruits: '',
              username: '',
              formState: {
                  username: '',
                  password: ''
              },
              fruits: [
                  { label: 'VIP', value: 1 },
                  { label: 'Normal', value: 2 },
              ],
              columns: [
                {
                  title: 'Username',
                  dataIndex: 'username',
                  key: 'username',
                },
                {
                  title: 'Password',
                  dataIndex: 'password',
                  key: 'password',
                },
                {
                  title: 'Type',
                  dataIndex: 'type',
                  key: 'type',
                },
              ],
              dataSource:[]
          };
      },
      methods: {
          // submitForm: function () {
          //   axios
          //     .post('http://127.0.0.1:8000/api/user/create', this.formInfo)
          //     .then((response) => {
          //       console.log(response)
          //     })
          //     .catch((error) => {
          //       console.log(error)
          //     })
          // },
          handleClick() {
              let objData = {
                username: this.username,
                password: this.password,
                type: this.type
              }
              this.dataSource.push(objData)
          }
      },
      components: { Input }
  })
  </script>
  