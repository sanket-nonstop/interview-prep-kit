import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Roadmap from "./pages/Roadmap";
import NotFound from "./pages/NotFound";
import TopicNotFound from "./pages/TopicNotFound";

// Topic Pages
import Closures from "./pages/topics/javascript/Closures";
import Promises from "./pages/topics/javascript/Promises";
import UseState from "./pages/topics/react/UseState";
import UseEffect from "./pages/topics/react/UseEffect";
import Flexbox from "./pages/topics/css/Flexbox";
import Semantic from "./pages/topics/html/Semantic";
import AppRouter from "./pages/topics/nextjs/AppRouter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/roadmap" element={<Roadmap />} />
            
            {/* HTML Topics */}
            <Route path="/html/semantic" element={<Semantic />} />
            <Route path="/html/*" element={<TopicNotFound />} />
            
            {/* CSS Topics */}
            <Route path="/css/flexbox" element={<Flexbox />} />
            <Route path="/css/*" element={<TopicNotFound />} />
            
            {/* JavaScript Topics */}
            <Route path="/javascript/closures" element={<Closures />} />
            <Route path="/javascript/promises" element={<Promises />} />
            <Route path="/javascript/*" element={<TopicNotFound />} />
            
            {/* React Topics */}
            <Route path="/react/hooks/useState" element={<UseState />} />
            <Route path="/react/hooks/useEffect" element={<UseEffect />} />
            <Route path="/react/*" element={<TopicNotFound />} />
            
            {/* Next.js Topics */}
            <Route path="/nextjs/app-router" element={<AppRouter />} />
            <Route path="/nextjs/*" element={<TopicNotFound />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
