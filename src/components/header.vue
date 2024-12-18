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
      <div>
        <img 
          v-if="profileImage" 
          :src="profileImage" 
          alt="Profile Logo" 
          class="profile-logo rounded-full"
        />
        <div v-else class="profile-logo empty-profile">No Image</div>
      </div>
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
      '/pendingappointment': 'Pending Appointments',
      '/salespage': 'Sales Revenue'
    };

    const pageTitle = computed(() => pageNames[route.path] || '');

    const fetchProfileImage = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error('Error fetching user:', userError.message);
          return;
        }

        if (user) {
          const { data, error } = await supabase
            .from('service_provider')
            .select('image')
            .eq('sp_id', user.id)
            .single();

          if (error) {
            console.error('Error fetching profile image:', error.message);
          } else if (data) {
            profileImage.value = data.image;
          }
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    };

    onMounted(() => {
      fetchProfileImage();
    });

    return {
      pageTitle,
      profileImage
    };
  },
};
</script>

<style></style>
