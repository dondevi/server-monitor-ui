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
  <q-layout class="bg-light" ref="layout" view="hHr LpR lFf" :right-breakpoint="1100">
    <!-- Header -->
    <q-toolbar slot="header">
      <!-- <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu" />
      </q-btn> -->
      <q-icon name="graphic_eq" />
      <q-toolbar-title>
        Server Monitor
        <span slot="subtitle">幸福网络运维监控</span>
      </q-toolbar-title>
      <!-- <q-btn flat>
        <q-icon name="notifications_none" />
        <q-chip floating color="red">3</q-chip>
      </q-btn> -->
    </q-toolbar>
    <!-- Left Side Panel -->
    <!-- <div slot="left">
      <q-list no-border link inset-separator>
        <q-side-link item to="/resource">
          <q-item-side icon="memory" color="blue" />
          <q-item-main label="Resource" sublabel="资源检测" />
        </q-side-link>
        <q-side-link item to="/alert">
          <q-item-side icon="error_outline" color="red" />
          <q-item-main label="Alert" sublabel="异常告警" />
        </q-side-link>
        <q-side-link item to="/business">
          <q-item-side icon="multiline_chart" color="amber" />
          <q-item-main label="Business" sublabel="业务统计" />
        </q-side-link>
      </q-list>
    </div> -->
    <router-view></router-view>
    <q-btn v-back-to-top round color="teal-5"
           class="fixed-bottom-right"
           style="margin: 0 15px 15px 0">
      <q-icon name="keyboard_arrow_up" />
    </q-btn>
  </q-layout>
</template>

<style>
  body {
    padding-right: 0 !important;
  }
</style>
