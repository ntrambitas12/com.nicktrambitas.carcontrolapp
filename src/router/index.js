import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import MainView from '../views/MainView.vue';
import Login from '../views/LogIn.vue';
import CreateAccount from '../views/CreateAccount.vue';
import LostPassword from '../views/LostPassword.vue';
import SettingsView from '../views/SettingsView.vue';
import ControlsView from '../views/ControlsView.vue';
import MapsView from '../views/MapsView.vue';

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/createAccount',
    name: 'createAccount',
    component: CreateAccount,
  },
  {
    path: '/resetPassword',
    name: 'resetPassword',
    component: LostPassword,
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/controls',
    name: 'controls',
    component: ControlsView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/location',
    name: 'location',
    component: MapsView,
    meta: {
      requiresAuth: true,
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/* Gets if the user is logger in */
const getCurrentUser = () => new Promise((resolve) => {
  const auth = getAuth();
  const removeListener = onAuthStateChanged(auth, (user) => {
    removeListener(); // Remove the listener once the user state changes
    if (user) {
      resolve(user); // Resolve if signed in
    } else {
      resolve(null); // Resolve null if not signed in
    }
  });
});

router.beforeEach(async (to, from, next) => {
  // Check if the route is protected to logged in users only
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // if a valid user is logged in, process request
    const user = await getCurrentUser();
    if (user) {
      next();
    } else {
      // no auth == no access. Send user to the login page
      next('/login');
    }
  } else {
    // If route is not protected, let the route continue
    next();
  }
});

// Add a delay before navigating using a navigation guard
// This is to allow the animation for button clicks to play on main page only
router.beforeEach((to, from, next) => {
  if (from.path === '/' || from.path === '/settings') {
  const delay = 200; // Adjust the delay time (in milliseconds) as needed

  // Wait for the specified delay before proceeding with the navigation
  setTimeout(() => {
    next();
  }, delay);
} else {
  next();
}
});

export default router;
