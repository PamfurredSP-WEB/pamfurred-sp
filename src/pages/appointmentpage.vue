<template>
    <div class="w-screen h-screen flex" >
      <div>
        <Sidebar />
      </div>
      <div class="w-full h-full bg-gray-100 overflow-y-auto">
        <HeadeR />
        <div>
            <apppointmentlist />
        </div>
      </div>
    </div>
    </template>

    <script>
import Sidebar from '@/components/sidebar.vue';
import HeadeR from '@/components/header.vue';
import apppointmentlist from '@/components/apppointmentlist.vue';

    export default{
        name: 'AppointmentPage',
        components: {
            Sidebar,
            HeadeR,
            apppointmentlist
    }
    };
    </script>
    
    <style>
    
    </style>