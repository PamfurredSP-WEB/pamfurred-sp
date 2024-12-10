<template>
  <div class="flex flex-wrap md:flex-nowrap items-stretch gap-2 w-full"> 
    <div class="flex-1 bg-white rounded-md shadow-md p-6 flex flex-col md:w-1/6 ml-4"> 
      <h1 class="text-xl font-bold text-gray-800 text-left">Welcome!</h1>
      <p class="text-gray-600 text-left mt-auto">{{ serviceProviderName }}</p>
    </div>
    <div class="flex-shrink-0 bg-white rounded-md shadow-md p-6 w-full md:w-1/4 flex items-center mr-4"> 
      <div>
        <h2 class="text-4xl font-medium text-custom-orange">{{ totalAppointments }}</h2>
        <p class="mt-1">Total Appointments</p>
      </div>
      <div class="ml-auto">
        <font-awesome-icon icon="calendar-day" size="3x" class="text-custom-yellow" />
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
  <style></style>
  