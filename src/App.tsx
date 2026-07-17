import {
  Authenticated,
  GitHubBanner,
  Refine,
  WelcomePage,
} from "@refinedev/core";

import {
  DevtoolsPanel,
  DevtoolsProvider,
} from "@refinedev/devtools";

import {
  RefineKbar,
  RefineKbarProvider,
} from "@refinedev/kbar";

import {
  ErrorComponent,
  ThemedLayout,
  ThemedSider,
  useNotificationProvider,
} from "@refinedev/antd";

import "@refinedev/antd/dist/reset.css";

import {
  authProvider,
  dataProvider,
  liveProvider,
} from "./providers";

import {
  Home,
  ForgotPassword,
  Login,
  Register,
} from "./pages";

import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";

import { App as AntdApp } from "antd";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from "react-router";

import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "./pages/blog-posts";

import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";
import Layout from "./components/layout";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />

      <RefineKbarProvider>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              liveProvider={liveProvider}
              notificationProvider={useNotificationProvider}
              routerProvider={routerProvider}
              authProvider={authProvider}
              resources={[
                {
                  name: "blog_posts",
                  list: "/blog-posts",
                  create: "/blog-posts/create",
                  edit: "/blog-posts/edit/:id",
                  show: "/blog-posts/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
                {
                  name: "categories",
                  list: "/categories",
                  create: "/categories/create",
                  edit: "/categories/edit/:id",
                  show: "/categories/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "gq0OXp-2hOnxQ-SnPWsB",
                liveMode: "auto",
              }}
            >
              <Routes>
     
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/register" element={<Register />}
                />
                <Route path="/login" element={<Login />} />
                <Route
                    element={
                    <Authenticated
                      key="authenticated-layout"
                      fallback={< CatchAllNavigate to="/login"/>}
                >
                   <Layout>
                    <Outlet/>
                  </Layout> 
               </Authenticated>
               }>
                 <Route path="/Home"  element={<Home />} />
                <Route/>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>

            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;