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
import EventLoop from "./pages/topics/javascript/EventLoop";
import ThisKeyword from "./pages/topics/javascript/ThisKeyword";
import ArrayMethods from "./pages/topics/javascript/ArrayMethods";
import Prototypes from "./pages/topics/javascript/Prototypes";
import Modules from "./pages/topics/javascript/Modules";
import Destructuring from "./pages/topics/javascript/Destructuring";
import BrowserApis from "./pages/topics/javascript/BrowserApis";
import PWA from "./pages/topics/javascript/PWA";
import Debounce from "./pages/topics/javascript/Debounce";
import Throttle from "./pages/topics/javascript/Throttle";
import DeepClone from "./pages/topics/javascript/DeepClone";
import FlattenArray from "./pages/topics/javascript/FlattenArray";
import Memoization from "./pages/topics/javascript/Memoization";
import Variables from "./pages/topics/javascript/Variables";
import Functions from "./pages/topics/javascript/Functions";
import ObjectsArrays from "./pages/topics/javascript/ObjectsArrays";
import DOM from "./pages/topics/javascript/DOM";
import Hoisting from "./pages/topics/javascript/Hoisting";
import ExecutionContext from "./pages/topics/javascript/ExecutionContext";
import Memory from "./pages/topics/javascript/Memory";
import TypeScript from "./pages/topics/typescript/Fundamentals";
import UseState from "./pages/topics/react/UseState";
import UseEffect from "./pages/topics/react/UseEffect";
import UseRef from "./pages/topics/react/UseRef";
import UseMemo from "./pages/topics/react/UseMemo";
import Context from "./pages/topics/react/Context";
import CustomHooks from "./pages/topics/react/CustomHooks";
import Performance from "./pages/topics/react/Performance";
import Patterns from "./pages/topics/react/Patterns";
import StateManagement from "./pages/topics/react/StateManagement";
import ErrorHandling from "./pages/topics/react/ErrorHandling";
import Components from "./pages/topics/react/Components";
import PropsState from "./pages/topics/react/PropsState";
import EventHandling from "./pages/topics/react/EventHandling";
import Lifecycle from "./pages/topics/react/Lifecycle";
import JSXVirtualDOM from "./pages/topics/react/JSXVirtualDOM";
import ConditionalRendering from "./pages/topics/react/ConditionalRendering";
import Testing from "./pages/topics/testing/Fundamentals";
import WebPerformance from "./pages/topics/performance/Optimization";
import Security from "./pages/topics/security/Fundamentals";
import Flexbox from "./pages/topics/css/Flexbox";
import Grid from "./pages/topics/css/Grid";
import Positioning from "./pages/topics/css/Positioning";
import Animations from "./pages/topics/css/Animations";
import Responsive from "./pages/topics/css/Responsive";
import Specificity from "./pages/topics/css/Specificity";
import Semantic from "./pages/topics/html/Semantic";
import Forms from "./pages/topics/html/Forms";
import Accessibility from "./pages/topics/html/Accessibility";
import MetaTags from "./pages/topics/html/MetaTags";
import WebApis from "./pages/topics/html/WebApis";
import AppRouter from "./pages/topics/nextjs/AppRouter";
import ServerComponents from "./pages/topics/nextjs/ServerComponents";
import DataFetching from "./pages/topics/nextjs/DataFetching";
import Metadata from "./pages/topics/nextjs/Metadata";
import Routing from "./pages/topics/nextjs/Routing";
import ApiRoutes from "./pages/topics/nextjs/ApiRoutes";
import AuthLayout from "./pages/topics/nextjs/AuthLayout";
import ProtectedRoutes from "./pages/topics/nextjs/ProtectedRoutes";
import ServerVsClient from "./pages/topics/nextjs/ServerVsClient";
import Caching from "./pages/topics/nextjs/Caching";
import WhatIsSeo from "./pages/topics/seo/WhatIsSeo";
import SearchEngines from "./pages/topics/seo/SearchEngines";
import TitleMeta from "./pages/topics/seo/TitleMeta";
import Headings from "./pages/topics/seo/Headings";
import ImageSeo from "./pages/topics/seo/ImageSeo";
import CoreWebVitals from "./pages/topics/seo/CoreWebVitals";
import NextjsMetadata from "./pages/topics/seo/NextjsMetadata";
import ServerClientSeo from "./pages/topics/seo/ServerClientSeo";

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
            <Route path="/html/forms" element={<Forms />} />
            <Route path="/html/accessibility" element={<Accessibility />} />
            <Route path="/html/meta-tags" element={<MetaTags />} />
            <Route path="/html/web-apis" element={<WebApis />} />
            <Route path="/html/*" element={<TopicNotFound />} />
            
            {/* CSS Topics */}
            <Route path="/css/flexbox" element={<Flexbox />} />
            <Route path="/css/grid" element={<Grid />} />
            <Route path="/css/positioning" element={<Positioning />} />
            <Route path="/css/animations" element={<Animations />} />
            <Route path="/css/responsive" element={<Responsive />} />
            <Route path="/css/specificity" element={<Specificity />} />
            <Route path="/css/*" element={<TopicNotFound />} />
            
            {/* JavaScript Topics */}
            <Route path="/javascript/variables" element={<Variables />} />
            <Route path="/javascript/functions" element={<Functions />} />
            <Route path="/javascript/objects-arrays" element={<ObjectsArrays />} />
            <Route path="/javascript/hoisting" element={<Hoisting />} />
            <Route path="/javascript/execution-context" element={<ExecutionContext />} />
            <Route path="/javascript/memory" element={<Memory />} />
            <Route path="/javascript/dom" element={<DOM />} />
            <Route path="/javascript/closures" element={<Closures />} />
            <Route path="/javascript/promises" element={<Promises />} />
            <Route path="/javascript/event-loop" element={<EventLoop />} />
            <Route path="/javascript/this" element={<ThisKeyword />} />
            <Route path="/javascript/array-methods" element={<ArrayMethods />} />
            <Route path="/javascript/prototypes" element={<Prototypes />} />
            <Route path="/javascript/modules" element={<Modules />} />
            <Route path="/javascript/destructuring" element={<Destructuring />} />
            <Route path="/javascript/browser-apis" element={<BrowserApis />} />
            <Route path="/javascript/pwa" element={<PWA />} />
            <Route path="/javascript/patterns/debounce" element={<Debounce />} />
            <Route path="/javascript/patterns/throttle" element={<Throttle />} />
            <Route path="/javascript/patterns/deep-clone" element={<DeepClone />} />
            <Route path="/javascript/patterns/flatten-array" element={<FlattenArray />} />
            <Route path="/javascript/patterns/memoization" element={<Memoization />} />
            <Route path="/javascript/*" element={<TopicNotFound />} />
            
            {/* TypeScript Topics */}
            <Route path="/typescript/fundamentals" element={<TypeScript />} />
            <Route path="/typescript/*" element={<TopicNotFound />} />
            
            {/* React Topics */}
            <Route path="/react/components" element={<Components />} />
            <Route path="/react/jsx-virtual-dom" element={<JSXVirtualDOM />} />
            <Route path="/react/props-state" element={<PropsState />} />
            <Route path="/react/conditional-rendering" element={<ConditionalRendering />} />
            <Route path="/react/events" element={<EventHandling />} />
            <Route path="/react/lifecycle" element={<Lifecycle />} />
            <Route path="/react/hooks/useState" element={<UseState />} />
            <Route path="/react/hooks/useEffect" element={<UseEffect />} />
            <Route path="/react/hooks/useRef" element={<UseRef />} />
            <Route path="/react/hooks/useMemo" element={<UseMemo />} />
            <Route path="/react/context" element={<Context />} />
            <Route path="/react/custom-hooks" element={<CustomHooks />} />
            <Route path="/react/performance" element={<Performance />} />
            <Route path="/react/patterns" element={<Patterns />} />
            <Route path="/react/state-management" element={<StateManagement />} />
            <Route path="/react/error-handling" element={<ErrorHandling />} />
            <Route path="/react/*" element={<TopicNotFound />} />
            
            {/* Testing Topics */}
            <Route path="/testing/fundamentals" element={<Testing />} />
            <Route path="/testing/*" element={<TopicNotFound />} />
            
            {/* Performance Topics */}
            <Route path="/performance/optimization" element={<WebPerformance />} />
            <Route path="/performance/*" element={<TopicNotFound />} />
            
            {/* Security Topics */}
            <Route path="/security/fundamentals" element={<Security />} />
            <Route path="/security/*" element={<TopicNotFound />} />
            
            {/* Next.js Topics */}
            <Route path="/nextjs/app-router" element={<AppRouter />} />
            <Route path="/nextjs/server-components" element={<ServerComponents />} />
            <Route path="/nextjs/data-fetching" element={<DataFetching />} />
            <Route path="/nextjs/metadata" element={<Metadata />} />
            <Route path="/nextjs/routing" element={<Routing />} />
            <Route path="/nextjs/api-routes" element={<ApiRoutes />} />
            <Route path="/nextjs/patterns/auth-layout" element={<AuthLayout />} />
            <Route path="/nextjs/patterns/protected-routes" element={<ProtectedRoutes />} />
            <Route path="/nextjs/patterns/server-vs-client" element={<ServerVsClient />} />
            <Route path="/nextjs/patterns/caching" element={<Caching />} />
            <Route path="/nextjs/*" element={<TopicNotFound />} />
            
            {/* SEO Topics */}
            <Route path="/seo/basics/what-is-seo" element={<WhatIsSeo />} />
            <Route path="/seo/basics/search-engines" element={<SearchEngines />} />
            <Route path="/seo/on-page/title-meta" element={<TitleMeta />} />
            <Route path="/seo/on-page/headings" element={<Headings />} />
            <Route path="/seo/on-page/image-seo" element={<ImageSeo />} />
            <Route path="/seo/technical/core-web-vitals" element={<CoreWebVitals />} />
            <Route path="/seo/nextjs/metadata" element={<NextjsMetadata />} />
            <Route path="/seo/nextjs/server-vs-client" element={<ServerClientSeo />} />
            <Route path="/seo/*" element={<TopicNotFound />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;