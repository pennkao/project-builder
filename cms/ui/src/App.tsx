import { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router';

import { ScrollToTop } from '@/components/common/ScrollToTop';
import LoadingPage from '@/components/Loading/LoadingPage';
const Orders = lazy(() => import('./pages/Orders/Orders'));
const Avatars = lazy(() => import('@/pages/UiElements/Avatars'));
const Badges = lazy(() => import('@/pages/UiElements/Badges'));
const Buttons = lazy(() => import('@/pages/UiElements/Buttons'));
const Videos = lazy(() => import('@/pages/UiElements/Videos'));
const AppLayout = lazy(() => import('@/layout/AppLayout'));
const Products = lazy(() => import('@/pages/Products/Products'));
const AddProduct = lazy(() => import('@/pages/Products/AddProduct'));
const Reviews = lazy(() => import('@/pages/Products/Reviews'));
const Calendar = lazy(() => import('@/pages/Calendar'));
const BarChart = lazy(() => import('@/pages/Charts/BarChart'));
const LineChart = lazy(() => import('@/pages/Charts/LineChart'));
const Home = lazy(() => import('@/pages/Dashboard/Home'));
const Logs = lazy(() => import('@/pages/Logs/SiteLogs'));
const BasicTables = lazy(() => import('@/pages/Tables/BasicTables'));
const Alerts = lazy(() => import('@/pages/UiElements/Alerts'));
const Images = lazy(() => import('@/pages/Images/Images'));
const UserProfiles = lazy(() => import('@/pages/UserProfiles'));
const Sites = lazy(() => import('./pages/Sites/Sites'));
const AddSite = lazy(() => import('./pages/Sites/AddSite'));

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
                                <Suspense fallback={<LoadingPage />}>
                                    <UserProfiles />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/reviews"
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <Reviews />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/orders"
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <Orders />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/calendar"
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <Calendar />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/images"
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <Images />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/products-list"
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <Products />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/add-product"
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <AddProduct />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/edit-product/:id"
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <AddProduct />
                                </Suspense>
                            }
                        />

                        {/* Logs */}
                        <Route
                            path="/logs"
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <Logs />
                                </Suspense>
                            }
                        />
                        {/* site */}
                        <Route
                            path="/sites"
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <Sites />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/add-site"
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <AddSite />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/edit-site/:id"
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <AddSite />
                                </Suspense>
                            }
                        />

                        {/* Tables */}
                        <Route
                            path="/basic-tables"
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <BasicTables />
                                </Suspense>
                            }
                        />

                        {/* Ui Elements */}
                        <Route
                            path="/alerts"
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <Alerts />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/avatars"
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <Avatars />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/badge"
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <Badges />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/buttons"
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <Buttons />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/images"
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <Images />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/videos"
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <Videos />
                                </Suspense>
                            }
                        />

                        {/* Charts */}
                        <Route
                            path="/line-chart"
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <LineChart />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/bar-chart"
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <BarChart />
                                </Suspense>
                            }
                        />
                        <Route
                            path="*"
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <Home />
                                </Suspense>
                            }
                        />
                    </Route>
                </Routes>
            </Router>
        </>
    );
}
