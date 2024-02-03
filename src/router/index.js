import { createRouter, createWebHistory } from "vue-router";
// import ProfileView from "@/views/ProfileView.vue";
// import HowTo from "@/views/HowTo.vue";
// import MyFeedView from "@/views/MyFeedView.vue";
// import BookMarks from "@/views/BookMarks.vue";
// import NotFound from "@/views/NotFound.vue";
// import CreatePost from "@/views/CreatePost.vue";
// import BlogPost from "@/views/BlogPost.vue";
// import RegisterUser from "@/views/RegisterUser.vue";
// import LogingUser from "@/views/LogingUser.vue";
// import LayoutWrapper from "@/layouts/LayoutWrapper.vue";
// import RootView from "@/views/RootView.vue";
// import Layout from "@/layouts/Layout.vue";
// import MainContent from "@/layouts/MainContent.vue";
import { useModalStore } from "@/stores/useModalStore.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  routes: [
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/views/NotFound.vue"),
    },
    {
      path: "/",
      name: "root",
      component: () => import("@/views/RootView.vue"),
    },
    {
      path: "/main",
      name: "main",
      component: () => import("@/layouts/Layout.vue"),
      children: [
        {
          path: "my-feed",
          alias: "/main",
          components: {
            default: () => import("@/views/MyFeedView.vue"),
            MainContent: () => import("@/layouts/MainContent.vue"),
          },
        },
        {
          path: "blogpost/:id",
          components: {
            BlogPost: () => import("@/views/BlogPost.vue"),
          },
        },
        {
          path: "how-to",
          components: {
            MainContent: () => import("@/views/HowTo.vue"),
          },
        },
        {
          path: "bookmarks",
          components: {
            BookMarks: () => import("@/views/BookMarks.vue"),
          },
          beforeEnter: (to, from, next) => {
            if (localStorage.getItem("accessToken")) next();
            else next({ name: "loging" });
          },
        },
        {
          path: "profile",
          components: {
            ProfileView: () => import("@/views/ProfileView.vue"),
          },
          children: [
            {
              path: "create",
              components: {
                CreatePost: () => import("@/views/CreatePost.vue"),
              },
              beforeEnter: (to, from, next) => {
                const { openModal } = useModalStore();
                openModal();
                if (localStorage.getItem("accessToken")) next();
                else next({ name: "loging" });
              },
            },
          ],
        },
      ],
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("@/views/SignUp.vue"),
    },
    {
      path: "/signIn",
      name: "signIn",
      component: () => import("@/views/SignIn.vue"),
    },
    {
      path: "/modal",
      name: "modal",
      component: () => import("@/components/ModalPopup.vue"),
    },
  ],
});

router.beforeEach(() => {
  window.scrollTo(0, 0);
});

// const isAuthenticated = false;

// router.beforeEach((to, from, next) => {
//   if (to.name !== "register" && !isAuthenticated) next({ name: "register" });
//   else next();
// });

export default router;
