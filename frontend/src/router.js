import {
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import App from "./App";

// Import our page components
import HomePage from "./pages/HomePage";
import ComplaintsPage from "./pages/ComplaintsPage";
import NewComplaintPage from "./pages/NewComplaintPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

// 🏠 STEP 1: Create the root route (this is like the main layout)
const rootRoute = createRootRoute({
  component: App, // This is our main layout component
});

// 🏠 STEP 2: Create individual page routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute, // This tells it "I belong to the root"
  path: "/", // This is the URL path
  component: HomePage, // This is the component to show
});

const complaintsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/complaints",
  component: ComplaintsPage,
});

const newComplaintRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/complaints/new",
  component: NewComplaintPage,
});

// Auth routes
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});

const resetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reset-password",
  component: ResetPasswordPage,
});

// 🏠 STEP 3: Connect all routes together (like a family tree)
const routeTree = rootRoute.addChildren([
  indexRoute,
  complaintsRoute,
  newComplaintRoute,
  loginRoute,
  registerRoute,
  resetPasswordRoute,
]);

// 🏠 STEP 4: Create the router (this is like creating the map)
export const router = createRouter({ routeTree });
