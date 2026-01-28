import { Layout } from "@/components/Layout";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { TrailingSlashRedirect } from "@/components/TrailingSlashRedirect";
import { lazy, Suspense } from "react";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Roadmap = lazy(() => import("./pages/Roadmap"));
const TopicNotFound = lazy(() => import("./pages/TopicNotFound"));
const ApiTestingMain = lazy(() => import("./pages/ApiTestingMain"));
const GetRequest = lazy(() => import("./pages/api-testing/GetRequest"));
const PostRequest = lazy(() => import("./pages/api-testing/PostRequest"));
const PutRequest = lazy(() => import("./pages/api-testing/PutRequest"));
const PatchRequest = lazy(() => import("./pages/api-testing/PatchRequest"));
const DeleteRequest = lazy(() => import("./pages/api-testing/DeleteRequest"));

const queryClient = new QueryClient();

const Loading = () => <div className="flex items-center justify-center min-h-screen">Loading...</div>;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <TrailingSlashRedirect />
        <Layout>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/roadmap/" element={<Roadmap />} />
              <Route path="/api-testing/" element={<ApiTestingMain />} />
              <Route path="/api-testing/get/" element={<GetRequest />} />
              <Route path="/api-testing/post/" element={<PostRequest />} />
              <Route path="/api-testing/put/" element={<PutRequest />} />
              <Route path="/api-testing/patch/" element={<PatchRequest />} />
              <Route path="/api-testing/delete/" element={<DeleteRequest />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
