import { Layout } from "@/components/Layout";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Roadmap from "./pages/Roadmap";
import TopicNotFound from "./pages/TopicNotFound";

// Topic Pages
import Animations from "./pages/topics/css/Animations";
import Flexbox from "./pages/topics/css/Flexbox";
import FlexboxWithPreview from "./pages/topics/css/FlexboxWithPreview";
import Grid from "./pages/topics/css/Grid";
import Positioning from "./pages/topics/css/Positioning";
import Responsive from "./pages/topics/css/Responsive";
import Specificity from "./pages/topics/css/Specificity";
import Forms from "./pages/topics/html/Forms";
import FormsWithPreview from "./pages/topics/html/FormsWithPreview";
import MetaTags from "./pages/topics/html/MetaTags";
import Semantic from "./pages/topics/html/Semantic";
import SemanticWithPreview from "./pages/topics/html/SemanticWithPreview";
import WebApis from "./pages/topics/html/WebApis";
import ArrayMethods from "./pages/topics/javascript/ArrayMethods";
import BrowserApis from "./pages/topics/javascript/BrowserApis";
import Closures from "./pages/topics/javascript/Closures";
import Debounce from "./pages/topics/javascript/Debounce";
import DeepClone from "./pages/topics/javascript/DeepClone";
import Destructuring from "./pages/topics/javascript/Destructuring";
import DOM from "./pages/topics/javascript/DOM";
import EventLoop from "./pages/topics/javascript/EventLoop";
import ExecutionContext from "./pages/topics/javascript/ExecutionContext";
import FlattenArray from "./pages/topics/javascript/FlattenArray";
import Functions from "./pages/topics/javascript/Functions";
import Hoisting from "./pages/topics/javascript/Hoisting";
import Memoization from "./pages/topics/javascript/Memoization";
import Memory from "./pages/topics/javascript/Memory";
import Modules from "./pages/topics/javascript/Modules";
import ObjectsArrays from "./pages/topics/javascript/ObjectsArrays";
import Promises from "./pages/topics/javascript/Promises";
import Prototypes from "./pages/topics/javascript/Prototypes";
import PWA from "./pages/topics/javascript/PWA";
import ThisKeyword from "./pages/topics/javascript/ThisKeyword";
import Throttle from "./pages/topics/javascript/Throttle";
import Variables from "./pages/topics/javascript/Variables";
import ApiRoutes from "./pages/topics/nextjs/ApiRoutes";
import AppRouter from "./pages/topics/nextjs/AppRouter";
import AuthLayout from "./pages/topics/nextjs/AuthLayout";
import Caching from "./pages/topics/nextjs/Caching";
import DataFetching from "./pages/topics/nextjs/DataFetching";
import Metadata from "./pages/topics/nextjs/Metadata";
import ProtectedRoutes from "./pages/topics/nextjs/ProtectedRoutes";
import Routing from "./pages/topics/nextjs/Routing";
import ServerComponents from "./pages/topics/nextjs/ServerComponents";
import ServerVsClient from "./pages/topics/nextjs/ServerVsClient";
import WebPerformance from "./pages/topics/performance/Optimization";
import Accessibility from "./pages/topics/react/Accessibility";
import Components from "./pages/topics/react/Components";
import CompoundComponents from "./pages/topics/react/CompoundComponents";
import ConditionalRendering from "./pages/topics/react/ConditionalRendering";
import Context from "./pages/topics/react/Context";
import ControlledUncontrolled from "./pages/topics/react/ControlledUncontrolled";
import CustomHooks from "./pages/topics/react/CustomHooks";
import ErrorHandling from "./pages/topics/react/ErrorHandling";
import EventHandling from "./pages/topics/react/EventHandling";
import FormsHandling from "./pages/topics/react/FormsHandling";
import CodeSplitting from "./pages/topics/react/CodeSplitting";
import JSXVirtualDOM from "./pages/topics/react/JSXVirtualDOM";
import Lifecycle from "./pages/topics/react/Lifecycle";
import ListsKeys from "./pages/topics/react/ListsKeys";
import Patterns from "./pages/topics/react/Patterns";
import Performance from "./pages/topics/react/Performance";
import PropsState from "./pages/topics/react/PropsState";
import ReactMemoComponent from "./pages/topics/react/ReactMemo";
import Reconciliation from "./pages/topics/react/Reconciliation";
import StateColocation from "./pages/topics/react/StateColocation";
import StateManagement from "./pages/topics/react/StateManagement";
import UseEffect from "./pages/topics/react/UseEffect";
import UseMemo from "./pages/topics/react/UseMemo";
import UseReducer from "./pages/topics/react/UseReducer";
import UseRef from "./pages/topics/react/UseRef";
import UseState from "./pages/topics/react/UseState";
import Security from "./pages/topics/security/Fundamentals";
import CoreWebVitals from "./pages/topics/seo/CoreWebVitals";
import Headings from "./pages/topics/seo/Headings";
import ImageSeo from "./pages/topics/seo/ImageSeo";
import NextjsMetadata from "./pages/topics/seo/NextjsMetadata";
import SearchEngines from "./pages/topics/seo/SearchEngines";
import ServerClientSeo from "./pages/topics/seo/ServerClientSeo";
import TitleMeta from "./pages/topics/seo/TitleMeta";
import WhatIsSeo from "./pages/topics/seo/WhatIsSeo";
import Testing from "./pages/topics/testing/Fundamentals";
import TypeScript from "./pages/topics/typescript/Fundamentals";

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
            <Route path="/html/semantic-preview" element={<SemanticWithPreview />} />
            <Route path="/html/forms" element={<Forms />} />
            <Route path="/html/forms-preview" element={<FormsWithPreview />} />
            <Route path="/html/accessibility" element={<Accessibility />} />
            <Route path="/html/meta-tags" element={<MetaTags />} />
            <Route path="/html/web-apis" element={<WebApis />} />
            <Route path="/html/*" element={<TopicNotFound />} />
            
            {/* CSS Topics */}
            <Route path="/css/flexbox" element={<Flexbox />} />
            <Route path="/css/flexbox-preview" element={<FlexboxWithPreview />} />
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
            <Route path="/react/controlled-uncontrolled" element={<ControlledUncontrolled />} />
            <Route path="/react/lists-keys" element={<ListsKeys />} />
            <Route path="/react/events" element={<EventHandling />} />
            <Route path="/react/lifecycle" element={<Lifecycle />} />
            <Route path="/react/hooks/useState" element={<UseState />} />
            <Route path="/react/hooks/useEffect" element={<UseEffect />} />
            <Route path="/react/hooks/useRef" element={<UseRef />} />
            <Route path="/react/hooks/useMemo" element={<UseMemo />} />
            <Route path="/react/hooks/useReducer" element={<UseReducer />} />
            <Route path="/react/context" element={<Context />} />
            <Route path="/react/custom-hooks" element={<CustomHooks />} />
            <Route path="/react/reconciliation" element={<Reconciliation />} />
            <Route path="/react/react-memo" element={<ReactMemoComponent />} />
            <Route path="/react/performance" element={<Performance />} />
            <Route path="/react/state-colocation" element={<StateColocation />} />
            <Route path="/react/patterns" element={<Patterns />} />
            <Route path="/react/compound-components" element={<CompoundComponents />} />
            <Route path="/react/state-management" element={<StateManagement />} />
            <Route path="/react/forms-handling" element={<FormsHandling />} />
            <Route path="/react/code-splitting" element={<CodeSplitting />} />
            <Route path="/react/accessibility" element={<Accessibility />} />
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