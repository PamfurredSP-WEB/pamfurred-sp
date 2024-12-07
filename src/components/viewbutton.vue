<template>
    <div>
    <button
      class="bg-blue-700 text-white font-medium py-2 px-2 rounded-md hover:bg-blue-900 focus:outline-none"
      @click="toggleView"
    >View</button>
  
    <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div class="bg-white p-8 rounded-md shadow-lg w-1/3">
        <h2 class="text-xl font-semibold mb-4">Provider Details</h2>
        <div v-if="provider" class="space-y-4 text-left">
          <p><strong>Establishment Name:</strong> {{ provider.name || 'N/A' }}</p>
          <p><strong>Business Email:</strong> {{ provider.email || 'N/A' }}</p>
          <p><strong>Phone Number:</strong> {{ provider.phone_number || 'N/A' }}</p>
          <p><strong>Approval Status:</strong> {{ provider.approval_status || 'N/A' }}</p>
          <div>
            <strong>Business Permit:</strong>
            <div class="flex items-center">
              <button @click="downloadBusinessPermit" class="text-blue-600 hover:text-blue-800">
                View Permit
              </button>
            </div>
          </div>
        </div>
        <div v-else class="text-center text-red-500">
          <p>Loading provider details...</p>
        </div>
        <div class="mt-4">
          <button @click="toggleView" class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
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
      provider: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        isVisible: false, // Initially the modal is hidden
      };
    },
    methods: {
      toggleView() {
        this.isVisible = !this.isVisible; // Toggle modal visibility
      },
      downloadBusinessPermit() {
        const fileUrl = this.provider.sp_business_permit;
  
        if (fileUrl) {
          // Programmatically trigger the download
          const link = document.createElement('a');
          link.href = fileUrl;
          link.download = ''; // Optional: Use original filename
          link.target = '_blank'; // Opens in a new tab
          link.click();
        } else {
          console.error('No valid file URL found.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  