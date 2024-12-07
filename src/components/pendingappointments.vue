<template>
    <div class="bg-white shadow rounded-md p-6 mb-6">
      <h2 class="text-2xl font-semibold mb-4 text-center">Pending Appointments</h2>
      <div v-if="displayedAppointments.length" class="text-xl text-left text-gray-900">
        <div v-for="(appointment, index) in displayedAppointments" :key="index" class="mb-4">
          <p class="pl-5 pb-2"><strong>Appointment ID:</strong> {{ appointment.appointment_id }}</p>
          <p class="pl-5 pb-2"><strong>Pet Owner Name:</strong> {{ appointment.name }}</p>
          <p class="pl-5 pb-2"><strong>Appointment Schedule:</strong> {{ appointment.email }}</p>
          <p class="pl-5 pb-2"><strong>Category of Service:</strong> {{ appointment.phone_number }}</p>
        </div>
      </div>
  
      <div v-else class="text-xl text-left text-gray-900">
        <p>No pending appointments.</p>
      </div>
  <div v-if="hasMore" class="text-center mt-4">
    <button @click="loadMore" class="inline-block bg-custom-viewmore text-black font-medium rounded-md py-1.5 px-4 text-sm hover:bg-custom-pencil">
      View More
    </button>
  </div>
  
    </div>
  </template>
  
  <script>
  import { supabase } from '@/supabase/supabase'
  
  export default {
    name: 'PendingAppointment',
    data() {
      return {
        pendingAppointments: [],
        displayedCount: 1,
        displayedAppointments: [],
      };
    },
    computed: {
      hasMore() {
        return this.pendingAppointments.length > this.displayedCount;
      },
    },
    async created() {
      await this.fetchPendingAppointments();
      this.updateDisplayedAppointments();
    },
    methods: {
        async fetchPendingAppointments() {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.error('Error fetching user:', userError.message);
      return;
    }

    const serviceProviderId = user.id; 

    const { data, error } = await supabase.rpc('get_appointment_details_by_sp_id', {
      sp_id_param: serviceProviderId
    });

    if (error) {
      console.error('Error fetching pending Appointments:', error.message);
    } else {
      this.pendingAppointments = data;
    }
  } catch (error) {
    console.error('Error calling Supabase function:', error);
  }
},
      updateDisplayedAppointments() {
        this.displayedAppointments = this.pendingAppointments.slice(0, this.displayedCount);
      },
      loadMore() {
        this.displayedCount += 1;
        this.updateDisplayedAppointments();
      },
    },
  };
  </script>
  
  <style scoped>
  
  </style>
  