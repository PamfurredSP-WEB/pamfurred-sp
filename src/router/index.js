import { createRouter, createWebHistory } from "vue-router";
import dashboard from "@/pages/master/dashboard.vue";
import login from "@/pages/login.vue";
import settings from "@/pages/settings.vue";
import petboarding from "@/pages/petboarding.vue";
import petgrooming from "@/pages/petgrooming.vue";
import veterinary from "@/pages/veterinary.vue";
import appointmentpage from "@/pages/appointmentpage.vue";
import generatereport from "@/pages/generatereport.vue";
import { supabase } from "@/supabase/supabase";

const routes = [
  {
    name: "Dashboard",
    path: "/dashboard",
    component: dashboard,
  },
  {
    name: "LogIn",
    path: "/",
    component: login,
  },
  {
    name: "Pet-Grooming",
    path: "/petgrooming",
    component: petgrooming,
  },
  {
    name: "Pet-Boarding",
    path: "/petboarding",
    component: petboarding,
  },
  {
    name: "Settings",
    path: "/settings",
    component: settings,
  },
  {
    name: "Veterinary-Service",
    path: "/veterinary",
    component: veterinary,
  },
  {
    name: "Pending-Appointment",
    path: "/pendingappointment",
    component: appointmentpage,
  },
  {
    name: "Generate-Report",
    path: "/salespage",
    component: generatereport,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.name === "LogIn") {
    return next();
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    next();
  } else {
    next("/"); 
  }
});

export default router;
