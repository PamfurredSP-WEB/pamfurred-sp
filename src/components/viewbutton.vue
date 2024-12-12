<template>
  <div>
    <button
      class="bg-blue-700 text-white font-medium py-2 px-2 rounded-md hover:bg-blue-900 focus:outline-none"
      @click="toggleView"
    >View</button>

    <div
      v-if="isVisible"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
    >
      <div class="bg-white p-6 rounded-md shadow-lg max-h-[80vh] overflow-y-auto w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <h2 class="text-xl font-semibold mb-3">Appointment Details</h2>
        
        
        <div v-if="appointment" class="space-y-4">
          <div class="border-b">
          <div class="mb-4">
            <p class="text-custom-orange font-bold text-left">Status: {{ details['Status'] }}</p>
          </div> </div>
          
          <div class="border-b mb-2">
          <div class="mb-4">
            <p><span class="font-bold">Appointment ID:</span></p>
            <p>{{ details['Appointment ID'] }}</p>
          </div>
        </div>

          <div class="border-b">
            <h3 class="font-bold mb-2">Pet Owner Details</h3>
            <div class="flex justify-between">
              <span>Name:</span>
              <span>{{ details['Name'] }}</span>
            </div>
            <div class="flex justify-between">
              <span>Contact Number:</span>
              <span>{{ details['Contact Number'] }}</span>
            </div>
          </div>

          <div class="border-b">
            <h3 class="font-semibold text-lg mb-2">Pet Details:</h3>
            <div class="flex justify-between">
              <span>Pet Name:</span>
              <span>{{ details['Pet Name'] }}</span>
            </div>
            <div class="flex justify-between">
              <span>Pet Sex:</span>
              <span>{{ details['Pet Sex'] }}</span>
            </div>
            <div class="flex justify-between">
              <span>Pet Type:</span>
              <span>{{ details['Pet Type'] }}</span>
            </div>
            <div class="flex justify-between">
              <span>Pet Breed:</span>
              <span>{{ details['Pet Breed'] }}</span>
            </div>
            <div class="flex justify-between">
              <span>Pet Age:</span>
              <span>{{ details['Pet Age'] }}</span>
            </div>
            <div class="flex justify-between">
              <span>Pet Weight:</span>
              <span>{{ details['Pet Weight'] }}</span>
            </div>
            <div class="flex justify-between">
              <span>Pet Description:</span>
              <span>{{ details['Pet Description'] }}</span>
            </div>
          </div>

          <div class="border-b">
            <h3 class="font-bold mb-2">Appointment Schedule</h3>
            <div class="flex justify-between">
              <span>Date:</span>
              <span>{{ details['Date'] }}</span>
            </div>
            <div class="flex justify-between">
              <span>Time:</span>
              <span>{{ details['Time'] }}</span>
            </div>
            <div class="flex justify-between">
              <span>Service Type:</span>
              <span>{{ details['Service Type'] }}</span>
            </div>            
          </div>

          <div class="border-b">
            <div class="flex justify-between">
              <h3 class="font-bold">Services/Packages Availed</h3>
              <span class="font-semibold">Price</span>
            </div>
            <div v-for="(service, index) in details['Services']" :key="index" class="flex justify-between">
              <span>{{ service.name }}</span>
              <span>{{ service.price }}</span>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-custom-orange">
              <span>Total:</span>
              <span>{{ details['Total'] }}</span>
            </div>
          </div>
        </div>

        <div v-else class="text-center text-red-500">
          <p>Loading appointment details...</p>
        </div>

        <div class="mt-3 text-center">
          <button
            @click="toggleView"
            class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ViewButton',
  props: {
    appointment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isVisible: false,
    };
  },
  computed: {
    details() {
      return {
        "Status": this.appointment.appointment_status || "N/A",
        "Appointment ID": this.appointment.appointment_id || "N/A",
        "Name": `${this.appointment.pet_owner_first_name} ${this.appointment.pet_owner_last_name}` || "N/A",
        "Contact Number": this.appointment.pet_owner_phone_number || "N/A",
        "Pet Name": this.appointment.pet_name || "N/A",
        "Pet Sex": this.appointment.pet_sex || "N/A",
        "Pet Type": this.appointment.pet_type || "N/A",
        "Pet Breed": this.appointment.pet_breed || "N/A",
        "Pet Age": this.appointment.pet_age || "N/A",
        "Pet Weight": this.appointment.pet_weight || "N/A",
        "Pet Description": this.appointment.pet_description || "N/A",
        "Date": this.appointment.appointment_date || "N/A",
        "Time": this.appointment.appointment_time || "N/A",
        "Service Type": this.appointment.service_type || "N/A",
        "Services": this.appointment.services || [],
        "Total": this.formatCurrency(this.appointment.total_amount),
      };
    },
  },
  methods: {
    toggleView() {
      this.isVisible = !this.isVisible;
    },
    formatCurrency(value) {
      if (!value) return "₱0.00";
      return `₱${parseFloat(value).toFixed(2)}`;
    },
  },
};
</script>

<style></style>
