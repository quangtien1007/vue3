<template>
    <div class="row container-fluid">
        <div class="col-sm-2">
            <TheSidebar />
        </div>
        <div class="col-sm-10"> 
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