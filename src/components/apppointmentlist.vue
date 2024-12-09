<template>
  <div class="ps-20 pt-8 pe-20">
    <div class="flex items-center mb-4">
      <div class="relative w-full md:w-full">
        <font-awesome-icon icon="magnifying-glass" class="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500"/>
        <input
          type="text"
          placeholder="Search by pet owner name"
          v-model="searchQuery"
          class="border p-2 pl-12 rounded-full focus:outline-none focus:ring-1 focus:ring-custom-orange w-full"
        />
      </div>
      <button
        class="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md focus:outline-none"
        @click="search">Search
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full table-fixed">
        <thead class="bg-gray-100">
          <tr>
            <th class="w-4/12 p-2 text-center">Appointment ID</th>
            <th class="w-3/12 p-2 text-center">Pet Owner Name</th>
            <th class="w-3/12 p-2 text-center">Approval Status</th>
            <th class="w-2/12 p-2 text-center">Appointment Schedule</th>
            <th class="w-2/12 p-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="appointment in paginatedAppointments"
            :key="appointment.appointment_id"
            :class="{ 'bg-gray-50': appointment.appointment_id % 2 === 0 }"
          >
            <td class="w-4/12 p-2">{{ appointment.appointment_id }}</td>
            <td class="w-3/12 p-2">{{ appointment.pet_owner_first_name }} {{ appointment.pet_owner_last_name }}</td>
            <td class="w-3/12 p-2">{{ appointment.appointment_status }}</td>
            <td class="w-2/12 p-2">{{ appointment.appointment_date }} {{ appointment.appointment_time }}</td>
            <td class="w-2/12 p-4 flex space-x-4">
              <viewbutton :appointment="appointment" />
              <acceptbutton 
                :appointment="appointment" 
                @accept="approveAppointment" 
              />
              <denybutton 
                :appointment="appointment" 
                @deny="declineAppointment" 
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-between items-center mt-4 pt-5 pb-20">
      <p>
        Showing {{ currentStart }} to {{ currentEnd }} out of {{ totalEntries }} entries
      </p>
      <div class="flex space-x-2">
        <button
          :disabled="currentPage === 1"
          class="px-3 py-1 bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-md focus:outline-none"
          @click="prevPage"
        >
          Previous
        </button>
        <span class="px-3 py-1 border bg-white">{{ currentPage }}</span>
        <button
          :disabled="currentPage === totalPages"
          class="px-3 py-1 bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-md focus:outline-none"
          @click="nextPage"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/supabase/supabase';
import emailjs from '@emailjs/browser';
import acceptbutton from './acceptbutton.vue';
import denybutton from './denybutton.vue';
import viewbutton from './viewbutton.vue';

export default {
  name: 'AppointmentList',
  components: {
    acceptbutton,
    denybutton,
    viewbutton
  },
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      pageSize: 10,
      appointments: [],
    };
  },
  computed: {
    filteredAppointments() {
      if (this.searchQuery) {
        return this.appointments.filter(appointment =>
          `${appointment.pet_owner_first_name} ${appointment.pet_owner_last_name}`
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
        );
      } else {
        return this.appointments;
      }
    },
    totalEntries() {
      return this.filteredAppointments.length;
    },
    totalPages() {
      return Math.ceil(this.totalEntries / this.pageSize);
    },
    currentStart() {
      return (this.currentPage - 1) * this.pageSize + 1;
    },
    currentEnd() {
      return Math.min(this.currentPage * this.pageSize, this.totalEntries);
    },
    paginatedAppointments() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredAppointments.slice(start, end);
    },
  },
  methods: {
    async sendNotification(email, status, petOwnerName) {
      const templateParams = {
        to_email: email,
        pet_owner: petOwnerName,
        status_message: status === "approved" ? "approved" : "declined",
      };

      try {
        const templateId =
          status === "approved" ? "template_1pfvhdj" : "template_2997wcq";
        const response = await emailjs.send(
          "service_8kzyvmh", 
          templateId,
          templateParams,
          "eHHF7ZkW5XNnGTlM0"
        );

        console.log("Email sent successfully", response);
      } catch (error) {
        console.error("Error sending email", error);
      }
    },
    async fetchAppointments() {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.error('Error fetching user:', userError.message);
      return;
    }

    const { data: provider, error: providerError } = await supabase
      .from('service_provider')
      .select('sp_id')
      .eq('sp_id', user.id)
      .single();

    if (providerError) {
      console.error('Error fetching service provider:', providerError.message);
      return;
    }

    const { data, error } = await supabase
      .rpc('get_appointment_details_by_sp_id', {
        sp_id_param: provider.sp_id
      });

    if (error) {
      console.error('Error fetching appointments:', error);
      return;
    }

    this.appointments = data;
  } catch (err) {
    console.error('Error fetching data:', err);
  }
},
    search() {
      this.currentPage = 1;
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    async approveAppointment(appointment) {
      try {
        const { data, error } = await supabase
          .from('appointment')
          .update({ appointment_status: 'approved' })
          .eq('appointment_id', appointment.appointment_id)
          .single();

        if (error) {
          console.error('Error approving appointment:', error);
          return;
        }

        console.log("Approved appointment:", data);
        await this.sendNotification(appointment.pet_owner_email, 'approved', `${appointment.pet_owner_first_name} ${appointment.pet_owner_last_name}`);

        this.fetchAppointments();
      } catch (err) {
        console.error('Error approving appointment:', err);
      }
    },

    async declineAppointment(appointment) {
      try {
        const { data, error } = await supabase
          .from('appointment')
          .update({ appointment_status: 'declined' })
          .eq('appointment_id', appointment.appointment_id)
          .single();

        if (error) {
          console.error('Error declining appointment:', error);
          return;
        }

        console.log('Declined appointment:', data);
        await this.sendNotification(appointment.pet_owner_email, 'declined', `${appointment.pet_owner_first_name} ${appointment.pet_owner_last_name}`);

        this.fetchAppointments();
      } catch (err) {
        console.error('Error declining appointment:', err);
      }
    },
  },
  mounted() {
    this.fetchAppointments();
  },
};
</script>

<style scoped></style>
