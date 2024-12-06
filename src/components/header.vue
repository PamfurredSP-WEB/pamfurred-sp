<template>
    <header class="flex justify-between items-center p-4 bg-white border-b border-gray-200 shadow-bottom" style="height: 80px;">
      <div class="flex items-center">
        <h1 class="text-2xl font-bold m-0 p-0 ml-6">{{ pageTitle }}</h1>
      </div>
      <div class="flex items-center">
        <div class="searchBar">
          <font-awesome-icon icon="magnifying-glass" class="icon"/>
          <input type="search" placeholder="Search for something" class="searchInput"/>
        </div>
        <img :src="profileImage" alt="Profile Logo" class="profile-logo ml-4 rounded-full" v-if="profileImage"/>
      </div>
    </header>
  </template>
  
  <script>
  import { computed, ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { supabase } from '@/supabase/supabase'; 
  
  export default {
    name: 'HeadeR',
    setup() {
      const route = useRoute();
      const profileImage = ref(''); 
  
      const pageNames = {
        '/dashboard': 'Dashboard',
        '/petgrooming': 'Pet Grooming',
        '/petboarding': 'Pet Boarding',
        '/veterinary': 'Veterinary Service',
        '/settings': 'Settings',
      };
  
      const pageTitle = computed(() => pageNames[route.path] || '');
  
      const fetchProfileImage = async () => {
        const { data, error } = await supabase
          .from('service_provider') 
          .select('image')
          .eq('sp_id', 'your_service_provider_id')
          .single();
  
        if (error) {
          console.error('Error fetching profile image:', error);
        } else if (data) {
          profileImage.value = data.image; 
        }
      };
  
      onMounted(() => {
        fetchProfileImage();
      });
  
      return {
        pageTitle,
        profileImage,
      };
    }
  };
  </script>
  
  <style></style>
  