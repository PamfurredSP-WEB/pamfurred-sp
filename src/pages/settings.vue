<template>
    <div class="w-screen h-screen flex" >
      <div>
        <Sidebar />
      </div>
      <div class="w-full h-full bg-gray-100 overflow-y-auto">
        <HeadeR />
      </div>
    </div>
    </template>

    <script>
import Sidebar from '@/components/sidebar.vue';
import HeadeR from '@/components/header.vue';

    export default{
        name: 'SettingsPage',
        components: {
            Sidebar,
            HeadeR,
    }
    };
    </script>
    
    <style>
    
    </style>