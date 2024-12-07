<template>
    <div>
      <button @click="openDenyModal" class="bg-red-700 text-white font-medium py-2 px-2 rounded-md hover:bg-red-900 focus:outline-none">
        Deny
      </button>
      <div v-if="showDenyModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
        <div class="bg-white rounded-lg shadow-lg p-6 max-w-md text-center z-20">
          <p class="text-lg font-semibold">Are you sure you want to deny this provider?</p>
          <div class="flex justify-center mt-6">
            <button @click="closeDenyModal" class="px-4 py-2 bg-gray-300 rounded-md mr-4">Cancel</button>
            <button @click="confirmDeny" class="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-900">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DenyButton',
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        showDenyModal: false
      };
    },
    methods: {
      openDenyModal() {
        this.showDenyModal = true;
      },
      closeDenyModal() {
        this.showDenyModal = false;
      },
      confirmDeny() {
        // Emit the deny event with user data
        this.$emit('deny', this.user);
        this.closeDenyModal();
      }
    }
  };
  </script>
  