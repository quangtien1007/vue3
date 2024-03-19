<template>
  <el-row class="">
    <el-col :span="24">
      <el-col class="text-center" style="cursor:pointer">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />
      </el-col>
      <el-menu default-active="0" class="el-menu-vertical-demo" >
        <router-link style="text-decoration: none;" :to="{ name: 'admin-dashboard' }">
        <el-menu-item index="0">
          <font-awesome-icon class="me-2" :icon="['fas', 'chart-simple']" />
          <span>Dashboard</span>
        </el-menu-item>
        </router-link>
        <el-sub-menu index="1">
          <template #title>
            <!-- <router-link ">Home -->
              <font-awesome-icon class="me-2" :icon="['fas', 'users']" />
              <span>Account</span>
            <!-- </router-link> -->
          </template>
          <router-link style="text-decoration: none;" :to="{ name: 'admin-users-create' }">
            <el-menu-item index="1-1"> 
              <font-awesome-icon class="me-2" :icon="['fas', 'user-plus']" />
              Create account
            </el-menu-item>
          </router-link>
          <el-menu-item index="1-2">
            <font-awesome-icon class="me-2" :icon="['fas', 'list']" />
            Manage account
          </el-menu-item>
          <el-menu-item index="1-3">
            <font-awesome-icon class="me-2" :icon="['fas', 'gear']" />
            Settings
          </el-menu-item>
        </el-sub-menu>
        <router-link style="text-decoration: none;" :to="{ name: 'admin-users' }">
        <el-menu-item index="2">  
          <font-awesome-icon class="me-2" :icon="['fas', 'user-gear']" />
          <span>Users</span>
        </el-menu-item>
        </router-link>
        <el-menu-item index="3">
          <font-awesome-icon class="me-2" :icon="['fas', 'layer-group']" />
          <span>Products</span>
        </el-menu-item>
        <el-menu-item index="4">
          <font-awesome-icon class="me-2" :icon="['fas', 'gears']" />
          <span>Settings</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>