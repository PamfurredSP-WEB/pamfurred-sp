<template>
  <div class="bg-white shadow rounded-md p-6 mb-6 flex-1 mt-4">
    <h2 class="text-2xl font-semibold mb-4 text-center">Pending Appointments</h2>

    <div v-if="displayedAppointments.length" class="text-xl text-left text-gray-900">
      <div v-for="(appointment) in displayedAppointments" :key="appointment.appointment_id" class="mb-4">
        <p class="pl-5 pb-2"><strong>Appointment ID:</strong> {{ appointment.appointment_id }}</p>
        <p class="pl-5 pb-2"><strong>Pet Owner Name:</strong> {{ appointment.pet_owner_first_name }} {{ appointment.pet_owner_last_name }}</p>
        <p class="pl-5 pb-2"><strong>Appointment Schedule:</strong> {{ appointment.appointment_date }} at {{ appointment.appointment_time }}</p>
        <p class="pl-5 pb-2"><strong>Total Amount:</strong> {{ appointment.total_amount }}</p>
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
      loading: true, 
      error: null,  
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
      this.loading = true;
      this.error = null;

      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) {
          console.error('Error fetching user:', userError.message);
          this.error = 'Error fetching user data.';
          return;
        }

        const serviceProviderId = user.id;
        const { data, error } = await supabase.rpc('get_pending_appointments', {
          z_param: serviceProviderId,
        });

        if (error) {
          console.error('Error fetching pending appointments:', error.message);
          this.error = 'Error fetching appointments.';
        } else {
          this.pendingAppointments = this.groupAppointments(data);
          this.updateDisplayedAppointments();
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        this.error = 'An unexpected error occurred.';
      } finally {
        this.loading = false;
      }
    },
    groupAppointments(data) {
      const groupedData = {};

      data.forEach(item => {
        const appointmentId = item.appointment_id;

        if (!groupedData[appointmentId]) {
          groupedData[appointmentId] = {
            ...item,
            services: [],
            packages: [],
          };
        }

        if (item.service_name) {
          groupedData[appointmentId].services.push({
            name: item.service_name,
            price: item.service_price,
          });
        }

        if (item.package_name) {
          groupedData[appointmentId].packages.push({
            name: item.package_name,
            price: item.package_price,
            inclusions: item.package_inclusions,
          });
        }
      });

      return Object.values(groupedData);
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

<style></style>
