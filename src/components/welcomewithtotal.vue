<template>
    <div class="flex flex-wrap md:flex-nowrap items-start gap-4 w-full">
    <div class="flex-1 bg-white rounded-md shadow-md p-6">
    <h1 class="text-xl font-bold text-gray-800 text-left">Welcome!</h1>
    <p class="text-gray-600 text-left">{{ serviceProviderName }}</p>
</div>
      <div class="flex-shrink-0 bg-white rounded-md shadow-md p-6 w-full md:w-1/3 flex items-center">
        <div>
          <h2 class="text-4xl font-bold text-orange-600">{{ totalAppointments }}</h2>
          <p class="text-gray-700 font-semibold">Total Appointments</p>
        </div>
        <div class="ml-auto text-orange-600">
          <FontAwesomeIcon icon="calendar-day" class="text-3xl" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { supabase } from '@/supabase/supabase';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  
  export default {
    name: 'WelcomeWithTotal',
    components: { FontAwesomeIcon },
    setup() {
      const serviceProviderName = ref('');
      const totalAppointments = ref(0);
  
      const fetchServiceProviderName = async () => {
        try {
          const { data: { user }, error: userError } = await supabase.auth.getUser();
  
          if (userError) {
            console.error('Error fetching user details:', userError.message);
            return;
          }
  
          if (user) {
            const { data, error } = await supabase
              .from('service_provider')
              .select('name')
              .eq('sp_id', user.id)
              .single();
  
            if (error) {
              console.error('Error fetching service provider name:', error.message);
            } else if (data) {
              serviceProviderName.value = data.name || 'Unknown Service Provider';
            }
          }
        } catch (error) {
          console.error('Unexpected error:', error.message);
        }
      };
  
      const fetchTotalAppointments = async () => {
        try {
          const { data, error } = await supabase.rpc('get_total_appointments');
          if (error) {
            console.error('Error fetching total appointments:', error.message);
          } else {
            totalAppointments.value = data;
          }
        } catch (error) {
          console.error('Unexpected error:', error.message);
        }
      };
  
      onMounted(() => {
        fetchServiceProviderName();
        fetchTotalAppointments();
      });
  
      return {
        serviceProviderName,
        totalAppointments,
      };
    },
  };
  </script>
  
  <style>
  /* Add component-specific styles if needed */
  </style>
  