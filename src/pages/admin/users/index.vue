<template>
    <a-card title="Users">
        <!-- <h1>asd</h1> -->
        <!-- <span>
            <el-button type="primary" class="mb-3 p-3">
                <h1>CREATE ACCOUNT</h1>
            </el-button>
        </span>
        <div class="row">
            <el-form :model="form" label-width="120px">
                <el-form-item label="Activity name">
                    <el-input />
                  </el-form-item>

            </el-form>
        </div> -->
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
  