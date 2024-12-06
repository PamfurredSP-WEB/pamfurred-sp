<template>
  <div class="w-screen h-screen flex">
    <Sidebar />
    <div class="w-full h-full bg-gray-100 overflow-y-auto">
      <HeadeR />
      <div class="p-6">
        <div class="flex flex-wrap md:flex-nowrap items-start gap-4">
          <welcomewithtotal />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar.vue';
import HeadeR from '@/components/header.vue';
import welcomewithtotal from '@/components/welcomewithtotal.vue';

export default {
  name: 'DashboardPage',
  components: {
    Sidebar,
    HeadeR,
    welcomewithtotal
  },
};
</script>

<style></style>
