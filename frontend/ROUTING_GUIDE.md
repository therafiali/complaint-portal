# 🗺️ TanStack Router - Simple Guide

## How Routing Works (Think of it like a Map!)

### 📍 **Routes = Pages**

Each route is like a page in your app:

- `/` = Home page
- `/complaints` = Complaints list page
- `/complaints/new` = New complaint form page

### 🏗️ **Router Structure (Like Building Blocks)**

```
Root Route (App.js - Main Layout)
├── Home Route (/)
├── Complaints Route (/complaints)
└── New Complaint Route (/complaints/new)
```

### 🔧 **How to Add a New Route**

1. **Create a new page component** in `src/pages/`
2. **Add the route** in `src/router.js`
3. **Add navigation link** in `src/App.js`

#### Example: Adding a "Profile" page

**Step 1: Create `src/pages/ProfilePage.js`**

```javascript
import React from "react";

const ProfilePage = () => {
  return (
    <div>
      <h1>👤 My Profile</h1>
      <p>This is your profile page</p>
    </div>
  );
};

export default ProfilePage;
```

**Step 2: Add route in `src/router.js`**

```javascript
import ProfilePage from "./pages/ProfilePage";

// Add this with other routes
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

// Add to routeTree
const routeTree = rootRoute.addChildren([
  indexRoute,
  complaintsRoute,
  newComplaintRoute,
  profileRoute, // ← Add this
]);
```

**Step 3: Add navigation in `src/App.js`**

```javascript
<Link to="/profile" className="nav-link">
  Profile
</Link>
```

### 🧭 **Navigation**

**Using Links (for navigation):**

```javascript
import { Link } from "@tanstack/react-router";

<Link to="/complaints">Go to Complaints</Link>;
```

**Using Programmatic Navigation:**

```javascript
import { useNavigate } from "@tanstack/react-router";

const navigate = useNavigate();
navigate({ to: "/complaints" });
```

### 📁 **File Structure**

```
src/
├── pages/           # All your page components
│   ├── HomePage.js
│   ├── ComplaintsPage.js
│   └── NewComplaintPage.js
├── hooks/           # React Query hooks
│   └── useComplaints.js
├── App.js           # Main layout
├── router.js        # Route definitions
└── index.js         # App entry point
```

### 🎯 **Key Concepts**

1. **Root Route**: The main layout (App.js) that wraps all pages
2. **Child Routes**: Individual pages that go inside the layout
3. **Outlet**: Where child routes get rendered (in App.js)
4. **Path**: The URL that triggers each route
5. **Component**: The React component to show for that route

### 🚀 **Quick Tips**

- **Keep routes simple**: One route = one page component
- **Use descriptive paths**: `/complaints/new` is better than `/new`
- **Organize by feature**: Put related routes together
- **Use the file structure**: Keep pages in `src/pages/` folder

That's it! Routing is just connecting URLs to components. 🎉
