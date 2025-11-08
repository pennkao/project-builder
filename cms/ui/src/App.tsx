import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router";

import { ScrollToTop } from "@/components/common/ScrollToTop";
const Avatars = lazy(() => import("@/pages/UiElements/Avatars"));
const Badges = lazy(() => import("@/pages/UiElements/Badges"));
const Buttons = lazy(() => import("@/pages/UiElements/Buttons"));
const Videos = lazy(() => import("@/pages/UiElements/Videos"));
const AppLayout = lazy(() => import("@/layout/AppLayout"));
const Blank = lazy(() => import("@/pages/Blank"));
const Products = lazy(() => import("@/pages/Products/Products"));
const AddProduct = lazy(() => import("@/pages/Products/AddProduct"));
const Calendar = lazy(() => import("@/pages/Calendar"));
const BarChart = lazy(() => import("@/pages/Charts/BarChart"));
const LineChart = lazy(() => import("@/pages/Charts/LineChart"));
const Home = lazy(() => import("@/pages/Dashboard/Home"));
const FormElements = lazy(() => import("@/pages/Forms/FormElements"));
const NotFound = lazy(() => import("@/pages/OtherPage/NotFound"));
const BasicTables = lazy(() => import("@/pages/Tables/BasicTables"));
const Alerts = lazy(() => import("@/pages/UiElements/Alerts"));
const Images = lazy(() => import("@/pages/UiElements/Images"));
const UserProfiles = lazy(() => import("@/pages/UserProfiles"));
const SignIn = lazy(() => import("@/pages/AuthPages/SignIn"));

export default function App() {
  return (
    <>
      <Router basename="/admin">
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            {/* Others Page */}
            <Route
              path="/profile"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <UserProfiles />
                </Suspense>
              }
            />
            <Route
              path="/calendar"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Calendar />
                </Suspense>
              }
            />
            <Route
              path="/products-list"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Products />
                </Suspense>
              }
            />
            <Route
              path="/products-list"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Products />
                </Suspense>
              }
            />
            <Route
              path="/add-product"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <AddProduct />
                </Suspense>
              }
            />

            {/* Forms */}
            <Route
              path="/form-elements"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <FormElements />
                </Suspense>
              }
            />

            {/* Tables */}
            <Route
              path="/basic-tables"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <BasicTables />
                </Suspense>
              }
            />

            {/* Ui Elements */}
            <Route
              path="/alerts"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Alerts />
                </Suspense>
              }
            />
            <Route
              path="/avatars"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Avatars />
                </Suspense>
              }
            />
            <Route
              path="/badge"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Badges />
                </Suspense>
              }
            />
            <Route
              path="/buttons"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Buttons />
                </Suspense>
              }
            />
            <Route
              path="/images"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Images />
                </Suspense>
              }
            />
            <Route
              path="/videos"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Videos />
                </Suspense>
              }
            />

            {/* Charts */}
            <Route
              path="/line-chart"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <LineChart />
                </Suspense>
              }
            />
            <Route
              path="/bar-chart"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <BarChart />
                </Suspense>
              }
            />
          </Route>

          {/* Fallback Route */}
          <Route
            path="*"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
