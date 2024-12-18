import Vue from 'vue'
import VueRouter from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import NavBarOnly from '@/components/NavBarOnly.vue'

// import StudioNavBar from '@/components/StudioNavBar.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    components: {
      // NavBar,
      default: () => import(/* webpackChunkName: "about" */ '../views/Welcome.vue')
    }
  },  
  {
    path: '/home',
    name: 'Home',
    components: {
      NavBar,
      default: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
    }
  },
  {
    path: '/subscriptions',
    name: 'Subscription',
    components: {
      NavBar,
      default: () =>
        import(/* webpackChunkName: "about" */ '../views/Subscription.vue')
    },
    // meta: { requiresAuth: true }
  },
  {
    path: '/likedposts',
    name: 'LikedPosts',
    components: {
      NavBar,
      default: () =>
        import(/* webpackChunkName: "about" */ '../views/LikedPosts.vue')
    },
    // meta: { requiresAuth: true }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () =>
      import(/* webpackChunkName: "signin" */ '../views/Auth/SignIn.vue'),
    // meta: { requiresVisitor: true }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () =>
      import(/* webpackChunkName: "signup" */ '../views/Auth/SignUp.vue'),
    // meta: { requiresVisitor: true }
  },
  {
    path: '/explore',
    name: 'Explore',
    components: {
      NavBar,
      default: () =>
        import(/* webpackChunkName: "explore" */ '../views/Explore.vue')
    }
  },
  // {
  //   path: '/studio',
  //   components: {
  //     NavBar,
  //     default: () =>
  //       import(/* webpackChunkName: "dashboard" */ '../views/Studio/Index.vue')
  //   },
  //   children: [
  //     {
  //       path: '/',
  //       name: 'Dashboard',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "dashboard" */ '../views/Studio/Dashboard.vue'
  //         )
  //     },
  //     {
  //       path: 'videos',
  //       name: 'Video',
  //       component: () =>
  //         import(/* webpackChunkName: "video" */ '../views/Studio/Video.vue')
  //     },
  //     {
  //       path: 'details/:id',
  //       name: 'Detail',
  //       component: () =>
  //         import(/* webpackChunkName: "video" */ '../views/Studio/Details.vue')
  //     }
  //   ],
  //   // meta: { requiresAuth: true }
  // },
  {
    path: '/channels',
    components: {
      NavBar,
      default: () =>
        import(/* webpackChunkName: "dashboard" */ '../views/Channel/Home.vue')
    },
    children: [
      {
        path: '/',
        name: 'ChannelHome',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '../views/Channel/Home.vue'
          )
      }
    ]
  },
  {
    path: '/studio',
    components: {
      NavBarOnly,
      default: () =>
        import(/* webpackChunkName: "dashboard" */ '../views/Studio/Dashboard.vue')
    },
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '../views/Studio/Dashboard.vue'
          )
      }
    ]
  },
  {
    path: '/profile',
    components: {
      NavBarOnly,
      default: () =>
        import(/* webpackChunkName: "dashboard" */ '../views/Auth/Profile.vue')
    },
    children: [
      {
        path: '/',
        name: 'ProfilePage',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '../views/Auth/Profile.vue'
          )
      }
    ]
  },
  {
    path: '/payment',
    name: 'Payment',
    components: {
      NavBarOnly,
      default: () =>
        import(/* webpackChunkName: "video" */ '../views/Payment.vue')
    },
    // meta: { requiresAuth: true }
  },
  {
    path: '/watch/:id',
    name: 'Watch',
    components: {
      NavBar,
      default: () =>
        import(/* webpackChunkName: "video" */ '../views/Watch.vue')
    }
  },
  {
    path: '/history',
    name: 'History',
    components: {
      NavBar,
      default: () =>
        import(/* webpackChunkName: "video" */ '../views/History.vue')
    },
    // meta: { requiresAuth: true }
  },
  {
    path: '/search',
    name: 'Search',
    components: {
      NavBar,
      default: () =>
        import(/* webpackChunkName: "video" */ '../views/Search.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')

  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next('/')
  } else if (
    to.matched.some((record) => record.meta.requiresVisitor) &&
    loggedIn
  ) {
    next('/')
  } else {
    next()
  }
})

export default router
