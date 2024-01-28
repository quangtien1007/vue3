<template>
    <div class="row container-fluid">
        <div class="col-sm-3">
            <TheSidebar />
        </div>
        <div class="col-sm-9"> 
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import TheSidebar from '../components/TheSidebar.vue'

export default {
  components: {
    TheSidebar
  }
}
</script>