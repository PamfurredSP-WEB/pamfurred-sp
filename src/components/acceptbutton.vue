<template>
    <div>
      <button @click="openAcceptModal" class="bg-green-700 text-white font-medium py-2 px-2 rounded-md hover:bg-green-900 focus:outline-none">
        Accept
      </button>
      <div v-if="showAcceptModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
        <div class="bg-white rounded-lg shadow-lg p-6 max-w-md text-center z-20">
          <p class="text-lg font-semibold">Are you sure you want to accept this provider?</p>
          <div class="flex justify-center mt-6">
            <button @click="closeAcceptModal" class="px-4 py-2 bg-gray-300 rounded-md mr-4">Cancel</button>
            <button @click="confirmAccept" class="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-900">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AcceptButton',
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        showAcceptModal: false
      };
    },
    methods: {
      openAcceptModal() {
        this.showAcceptModal = true;
      },
      closeAcceptModal() {
        this.showAcceptModal = false;
      },
      confirmAccept() {
        // Emit the accept event with user data
        this.$emit('accept', this.user);
        this.closeAcceptModal();
      }
    }
  };
  </script>
  