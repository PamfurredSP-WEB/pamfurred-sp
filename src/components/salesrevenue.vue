<template>
    <div class="p-5 pt-2 pb-10 bg-white rounded-lg shadow-md w-full mx-auto">
      <div class="relative h-72 bg-white p-4 w-full">
        <div class="flex justify-between items-center mb-5">
          <h2 class="text-2xl font-semibold">Sales Revenue</h2>
          <select v-model="selectedYear" @change="fetchSalesData" class="rounded-md p-3 outline-none">
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>
        <canvas ref="revenueChartRef" class="w-full h-full"></canvas>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
  import Chart from 'chart.js/auto';
  import { supabase } from '@/supabase/supabase';
  
  export default {
    name: 'SalesRevenue',
    setup() {
      const chartInstance = ref(null);
      const revenueChartRef = ref(null);
      const selectedYear = ref('2024');
      const salesData = ref([]);
      
      const fetchSalesData = async () => {
        try {
          const { data, error } = await supabase
            .from('appointment')
            .select('appointment_date, total_amount')
            .filter('appointment_date', 'gte', `${selectedYear.value}-01-01`)
            .filter('appointment_date', 'lt', `${parseInt(selectedYear.value) + 1}-01-01`)
            .filter('appointment_status', 'eq', 'Done');
          if (error) {
            console.error('Error fetching data from Supabase:', error);
            return;
          }
  
          const monthlySales = Array(12).fill(0); 
          data.forEach(item => {
            const month = new Date(item.appointment_date).getMonth(); 
            monthlySales[month] += item.total_amount;
          });
  
          salesData.value = monthlySales; 
          renderChart();
        } catch (err) {
          console.error('Error fetching sales data:', err);
        }
      };
  
      const renderChart = () => {
        const ctx = revenueChartRef.value?.getContext('2d');
  
        if (!ctx) {
          console.error("Canvas context not found");
          return;
        }
        chartInstance.value?.destroy();
        chartInstance.value = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                label: 'Done Appointments',
                data: salesData.value,
                borderColor: '#D14C01',
                borderWidth: 2,
                backgroundColor: 'rgba(209, 76, 1, 0.2)', 
                fill: true,
                pointBackgroundColor: '#D14C01',
                pointBorderColor: '#D14C01',
                tension: 0.4,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Month',
                  font: { size: 16, weight: 'bold' },
                  color: 'black',
                  padding: { top: 20, bottom: 20 },
                },
              },
              y: {
                title: {
                  display: true,
                  font: { size: 16, weight: 'bold' },
                  color: 'black',
                  padding: { top: 10, bottom: 20 },
                },
                beginAtZero: true,
              },
            },
          },
        });
      };
  
      onMounted(async () => {
        await nextTick();
        await fetchSalesData();
      });
  
      onBeforeUnmount(() => {
        if (chartInstance.value) {
          chartInstance.value.destroy();
          chartInstance.value = null;
        }
      });
  
      return { revenueChartRef, selectedYear, fetchSalesData };
    },
  };
  </script>
  
  <style></style>
  