<!--
/**
 * @author dondevi
 * @create 2018-02-02
 *
 * @update 2018-02-06 dondevi
 * @update 2018-02-08 dondevi
 *   1.Add: Back to top
 * @update 2018-02-06 dondevi
 *   1.Remove: Sidebar
 */
-->

<template>
  <q-layout ref="layout" view="hHr LpR lFf">

    <!-- Header -->
    <q-layout-header>
      <q-toolbar>
        <!-- <q-btn flat @click="$refs.layout.toggleLeft()">
          <q-icon name="menu" />
        </q-btn> -->
        <q-icon name="graphic_eq" color="cyan-4" />
        <q-toolbar-title>
          Server Monitor
          <span slot="subtitle">幸福网络运维监控</span>
        </q-toolbar-title>
        <!-- <q-btn flat>
          <q-icon name="notifications_none" />
          <q-chip floating color="red">3</q-chip>
        </q-btn> -->
      </q-toolbar>
    </q-layout-header>

    <!-- Left Side Panel -->
    <!-- <q-layout-drawer side="left">
      <q-list no-border link inset-separator>
        <q-side-link item to="/host">
          <q-item-side icon="memory" color="blue" />
          <q-item-main label="Host" sublabel="主机监控" />
        </q-side-link>
        <q-side-link item to="/alarm">
          <q-item-side icon="error_outline" color="red" />
          <q-item-main label="Alarm" sublabel="异常监控" />
        </q-side-link>
        <q-side-link item to="/service">
          <q-item-side icon="multiline_chart" color="amber" />
          <q-item-main label="Service" sublabel="服务监控" />
        </q-side-link>
      </q-list>
    </q-layout-drawer> -->

    <q-page-container>
      <router-view/>
    </q-page-container>

    <q-btn v-back-to-top round color="cyan-5"
           class="fixed-bottom-right q-mr-md q-mb-md">
      <q-icon name="keyboard_arrow_up" />
    </q-btn>

  </q-layout>
</template>

<style scoped>
  .q-layout {
    background: linear-gradient(#656671, #464653);
  }
  .q-toolbar {
    background-color: #3e3d44;
  }
</style>
