<template>
  <div class="w-screen h-screen flex">
    <Sidebar />
    <div class="w-full h-full bg-gray-100 overflow-y-auto">
      <HeadeR />
      <div class="p-6">
        <div class="flex flex-wrap md:flex-nowrap items-start gap-4">
          <welcomewithtotal />
        </div>
        <div class="p-4 pt-1">
        <router-link to="/pendingappointment" class="block border-gray-200 rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-104">
          <pendingappointments />
        </router-link>
        <router-link to="/salespage" class="block border-gray-200 rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-104">
            <salesrevenue />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar.vue';
import HeadeR from '@/components/header.vue';
import welcomewithtotal from '@/components/welcomewithtotal.vue';
import pendingappointments from '@/components/pendingappointments.vue';
import salesrevenue from '@/components/salesrevenue.vue';

export default {
  name: 'DashboardPage',
  components: {
    Sidebar,
    HeadeR,
    welcomewithtotal,
    pendingappointments,
    salesrevenue
  },
};
</script>

<style></style>
