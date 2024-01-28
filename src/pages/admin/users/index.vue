<template>
    <a-card title="Users" style="width: 100%">
        <div class="row">
            <div key="admin-users-create" class="mb-4" wrap>
                <router-link :to="{ name: 'admin-users-create' }">
                    <a-button type="primary">Add user</a-button>
                </router-link>
            </div>
            <div class="col-12 d-flex w-100 align-items-center">
                <!-- chung ta cua hien tai test -->
                <!-- <a-table :dataSource="users" :columns="columns">
            <template #bodyCell="{ column, index, record }"> </template>
          </a-table> -->
                <el-card style="object-fit:cover" v-for="item in cats" class="col-md-2 image-container">
                    <img style="height: 150px;" class="w-100 image-item" :src="item.url" alt="">
                    <!-- </div> -->
                </el-card>
                
            </div>
            <div class="col-12">
                <el-card style="object-fit:cover" v-for="item in catsFact" class="col-md-12 text-center image-container">
                    <h1>{{item}}</h1>
                    <!-- </div> -->
                </el-card>
            </div>
        </div>
    </a-card>
</template>
<style>
.image-container {
    display: inline-block;
    margin: 5px;
}

.image-item {
    max-width: 100%;
    height: auto;
    display: block;
}
</style>
<script>
import { defineComponent, ref } from 'vue'
import { useMenu } from '../../../stores/use-menu'
export default defineComponent({
    setup() {
        useMenu().onSelectedKeys(['admin-users'])

        const cats = ref([])
        const catsFact = ref([])

        const columns = [
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email'
            }
        ]

        const getImage = () => {

            // Make a request
            axios
                .get('https://api.thecatapi.com/v1/images/search?limit=10')
                .then((response) => {
                    let arrData = response.data
                    for (let i = 0; i < 5; i++) {
                        // const element = array[i];
                        console.log(arrData[i]);
                        cats.value.push(arrData[i])

                    }
                    // cats.push()
                    // console.log(cats.value)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        getImage()

        const getFactOfCat = () => {
            // Make a request
            axios
                .get('https://meowfacts.herokuapp.com/?count=1')
                .then((response) => {
                    catsFact.value = response.data
                    // const r1 = catsFact.value.data[0].replace("[","")
                    // const r2 = r1.replace("]","")
                    // const r3 = r2.split(",")
                    // console.log(r3);
                    // console.log(catsFact.value.data);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        
        getFactOfCat()

        return {
            cats,
            columns,
            catsFact
        }
    }
})
</script>
  