<template>
    <div>
      <button @click="openDeleteModal" class="text-custom-delete hover:text-red-700 focus:outline-none">
        <font-awesome-icon icon="trash" />
      </button>
      <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
        <div class="bg-white rounded-lg shadow-lg p-6 max-w-md text-center z-20">
          <p class="text-lg font-semibold">Are you sure you want to delete this user?</p>
          <div class="flex justify-center mt-6">
            <button @click="closeDeleteModal" class="px-4 py-2 bg-gray-300 rounded-md mr-4">Cancel</button>
            <button @click="confirmDelete" class="px-4 py-2 bg-custom-red text-white rounded-md">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DeleteButton',
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        showDeleteModal: false
      };
    },
    methods: {
      openDeleteModal() {
        this.showDeleteModal = true;
      },
      closeDeleteModal() {
        this.showDeleteModal = false;
      },
      confirmDelete() {
        this.$emit('delete', this.user);
        this.closeDeleteModal();
      }
    }
  }
  </script>
  <style>
  </style>