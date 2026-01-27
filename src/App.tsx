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
import CssVariables from "./pages/topics/css/CssVariables";
import CssTransforms from "./pages/topics/css/CssTransforms";
import PseudoClasses from "./pages/topics/css/PseudoClasses";
import CssUnits from "./pages/topics/css/CssUnits";
import Flexbox from "./pages/topics/css/Flexbox";
import FlexboxWithPreview from "./pages/topics/css/FlexboxWithPreview";
import Grid from "./pages/topics/css/Grid";
import Positioning from "./pages/topics/css/Positioning";
import Responsive from "./pages/topics/css/Responsive";
import Specificity from "./pages/topics/css/Specificity";
import Forms from "./pages/topics/html/Forms";
import Html5Features from "./pages/topics/html/Html5Features";
import Tables from "./pages/topics/html/Tables";
import Iframes from "./pages/topics/html/Iframes";
import HtmlEntities from "./pages/topics/html/HtmlEntities";
import HtmlPerformance from "./pages/topics/html/HtmlPerformance";
import DataAttributes from "./pages/topics/html/DataAttributes";
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
import RenderProps from "./pages/topics/react/RenderProps";
import HOC from "./pages/topics/react/HOC";
import Portal from "./pages/topics/react/Portal";
import SuspenseLazy from "./pages/topics/react/SuspenseLazy";
import ConcurrentFeatures from "./pages/topics/react/ConcurrentFeatures";
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
import AdvancedTypeScript from "./pages/topics/typescript/AdvancedTypeScript";
import ReactTypeScript from "./pages/topics/typescript/ReactTypeScript";
import Arrays from "./pages/topics/miscellaneous/Arrays";
import ApiTestingMain from "./pages/ApiTestingMain";
import GetRequest from "./pages/api-testing/GetRequest";
import PostRequest from "./pages/api-testing/PostRequest";
import { PutRequest, PatchRequest, DeleteRequest } from "./pages/api-testing/OtherRequests";
import HttpMethods from "./pages/topics/miscellaneous/HttpMethods";
import GitFundamentals from "./pages/topics/miscellaneous/GitFundamentals";
import ConsoleDebugging from "./pages/topics/miscellaneous/ConsoleDebugging";
import { LinkedLists, StacksQueues, Trees, HashTables, Graphs } from "./pages/topics/miscellaneous/DataStructures";
import { StatusCodes, Headers, CORS, WebSockets, RESTvsGraphQL } from "./pages/topics/miscellaneous/Networking";
import { GitBranching, GitRebase, GitWorkflows } from "./pages/topics/miscellaneous/Git";
import { NetworkTab, PerformanceTab } from "./pages/topics/miscellaneous/BrowserTools";

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
            <Route path="/api-testing" element={<ApiTestingMain />} />
            <Route path="/api-testing/get" element={<GetRequest />} />
            <Route path="/api-testing/post" element={<PostRequest />} />
            <Route path="/api-testing/put" element={<PutRequest />} />
            <Route path="/api-testing/patch" element={<PatchRequest />} />
            <Route path="/api-testing/delete" element={<DeleteRequest />} />
            
            {/* HTML Topics */}
            <Route path="/html/fundamentals/semantic" element={<Semantic />} />
            <Route path="/html/semantic" element={<Semantic />} />
            <Route path="/html/semantic-preview" element={<SemanticWithPreview />} />
            <Route path="/html/fundamentals/html5-features" element={<Html5Features />} />
            <Route path="/html/html5-features" element={<Html5Features />} />
            <Route path="/html/fundamentals/forms" element={<Forms />} />
            <Route path="/html/forms" element={<Forms />} />
            <Route path="/html/forms-preview" element={<FormsWithPreview />} />
            <Route path="/html/fundamentals/tables" element={<Tables />} />
            <Route path="/html/tables" element={<Tables />} />
            <Route path="/html/advanced/data-attributes" element={<DataAttributes />} />
            <Route path="/html/data-attributes" element={<DataAttributes />} />
            <Route path="/html/advanced/iframes" element={<Iframes />} />
            <Route path="/html/iframes" element={<Iframes />} />
            <Route path="/html/advanced/entities" element={<HtmlEntities />} />
            <Route path="/html/entities" element={<HtmlEntities />} />
            <Route path="/html/advanced/web-apis" element={<WebApis />} />
            <Route path="/html/web-apis" element={<WebApis />} />
            <Route path="/html/best-practices/performance" element={<HtmlPerformance />} />
            <Route path="/html/performance" element={<HtmlPerformance />} />
            <Route path="/html/best-practices/accessibility" element={<Accessibility />} />
            <Route path="/html/accessibility" element={<Accessibility />} />
            <Route path="/html/best-practices/meta-tags" element={<MetaTags />} />
            <Route path="/html/meta-tags" element={<MetaTags />} />
            <Route path="/html/*" element={<TopicNotFound />} />
            
            {/* CSS Topics */}
            <Route path="/css/layout/flexbox" element={<Flexbox />} />
            <Route path="/css/flexbox" element={<Flexbox />} />
            <Route path="/css/flexbox-preview" element={<FlexboxWithPreview />} />
            <Route path="/css/layout/grid" element={<Grid />} />
            <Route path="/css/grid" element={<Grid />} />
            <Route path="/css/layout/positioning" element={<Positioning />} />
            <Route path="/css/positioning" element={<Positioning />} />
            <Route path="/css/styling/variables" element={<CssVariables />} />
            <Route path="/css/variables" element={<CssVariables />} />
            <Route path="/css/styling/pseudo-classes" element={<PseudoClasses />} />
            <Route path="/css/pseudo-classes" element={<PseudoClasses />} />
            <Route path="/css/styling/specificity" element={<Specificity />} />
            <Route path="/css/specificity" element={<Specificity />} />
            <Route path="/css/styling/units" element={<CssUnits />} />
            <Route path="/css/units" element={<CssUnits />} />
            <Route path="/css/advanced/transforms" element={<CssTransforms />} />
            <Route path="/css/transforms" element={<CssTransforms />} />
            <Route path="/css/advanced/animations" element={<Animations />} />
            <Route path="/css/animations" element={<Animations />} />
            <Route path="/css/advanced/responsive" element={<Responsive />} />
            <Route path="/css/responsive" element={<Responsive />} />
            <Route path="/css/*" element={<TopicNotFound />} />
            
            {/* JavaScript Topics */}
            <Route path="/javascript/fundamentals/variables" element={<Variables />} />
            <Route path="/javascript/variables" element={<Variables />} />
            <Route path="/javascript/fundamentals/functions" element={<Functions />} />
            <Route path="/javascript/functions" element={<Functions />} />
            <Route path="/javascript/fundamentals/objects-arrays" element={<ObjectsArrays />} />
            <Route path="/javascript/objects-arrays" element={<ObjectsArrays />} />
            <Route path="/javascript/fundamentals/hoisting" element={<Hoisting />} />
            <Route path="/javascript/hoisting" element={<Hoisting />} />
            <Route path="/javascript/fundamentals/destructuring" element={<Destructuring />} />
            <Route path="/javascript/destructuring" element={<Destructuring />} />
            <Route path="/javascript/fundamentals/array-methods" element={<ArrayMethods />} />
            <Route path="/javascript/array-methods" element={<ArrayMethods />} />
            <Route path="/javascript/advanced/closures" element={<Closures />} />
            <Route path="/javascript/closures" element={<Closures />} />
            <Route path="/javascript/advanced/prototypes" element={<Prototypes />} />
            <Route path="/javascript/prototypes" element={<Prototypes />} />
            <Route path="/javascript/advanced/execution-context" element={<ExecutionContext />} />
            <Route path="/javascript/execution-context" element={<ExecutionContext />} />
            <Route path="/javascript/advanced/this" element={<ThisKeyword />} />
            <Route path="/javascript/this" element={<ThisKeyword />} />
            <Route path="/javascript/advanced/memory" element={<Memory />} />
            <Route path="/javascript/memory" element={<Memory />} />
            <Route path="/javascript/advanced/modules" element={<Modules />} />
            <Route path="/javascript/modules" element={<Modules />} />
            <Route path="/javascript/async/promises" element={<Promises />} />
            <Route path="/javascript/promises" element={<Promises />} />
            <Route path="/javascript/async/event-loop" element={<EventLoop />} />
            <Route path="/javascript/event-loop" element={<EventLoop />} />
            <Route path="/javascript/browser/dom" element={<DOM />} />
            <Route path="/javascript/dom" element={<DOM />} />
            <Route path="/javascript/browser/browser-apis" element={<BrowserApis />} />
            <Route path="/javascript/browser-apis" element={<BrowserApis />} />
            <Route path="/javascript/browser/pwa" element={<PWA />} />
            <Route path="/javascript/pwa" element={<PWA />} />
            <Route path="/javascript/patterns/debounce" element={<Debounce />} />
            <Route path="/javascript/patterns/throttle" element={<Throttle />} />
            <Route path="/javascript/patterns/deep-clone" element={<DeepClone />} />
            <Route path="/javascript/patterns/flatten-array" element={<FlattenArray />} />
            <Route path="/javascript/patterns/memoization" element={<Memoization />} />
            <Route path="/javascript/*" element={<TopicNotFound />} />
            
            {/* TypeScript Topics */}
            <Route path="/typescript/basics/fundamentals" element={<TypeScript />} />
            <Route path="/typescript/fundamentals" element={<TypeScript />} />
            <Route path="/typescript/advanced/generics-mapped-types" element={<AdvancedTypeScript />} />
            <Route path="/typescript/react/patterns" element={<ReactTypeScript />} />
            <Route path="/typescript/*" element={<TopicNotFound />} />
            
            {/* React Topics */}
            <Route path="/react/fundamentals/components" element={<Components />} />
            <Route path="/react/components" element={<Components />} />
            <Route path="/react/fundamentals/jsx-virtual-dom" element={<JSXVirtualDOM />} />
            <Route path="/react/jsx-virtual-dom" element={<JSXVirtualDOM />} />
            <Route path="/react/fundamentals/props-state" element={<PropsState />} />
            <Route path="/react/props-state" element={<PropsState />} />
            <Route path="/react/fundamentals/events" element={<EventHandling />} />
            <Route path="/react/events" element={<EventHandling />} />
            <Route path="/react/fundamentals/conditional-rendering" element={<ConditionalRendering />} />
            <Route path="/react/conditional-rendering" element={<ConditionalRendering />} />
            <Route path="/react/fundamentals/lists-keys" element={<ListsKeys />} />
            <Route path="/react/lists-keys" element={<ListsKeys />} />
            <Route path="/react/fundamentals/controlled-uncontrolled" element={<ControlledUncontrolled />} />
            <Route path="/react/controlled-uncontrolled" element={<ControlledUncontrolled />} />
            <Route path="/react/fundamentals/lifecycle" element={<Lifecycle />} />
            <Route path="/react/lifecycle" element={<Lifecycle />} />
            <Route path="/react/hooks/useState" element={<UseState />} />
            <Route path="/react/hooks/useEffect" element={<UseEffect />} />
            <Route path="/react/hooks/useRef" element={<UseRef />} />
            <Route path="/react/hooks/useMemo" element={<UseMemo />} />
            <Route path="/react/hooks/useReducer" element={<UseReducer />} />
            <Route path="/react/hooks/custom-hooks" element={<CustomHooks />} />
            <Route path="/react/custom-hooks" element={<CustomHooks />} />
            <Route path="/react/advanced/context" element={<Context />} />
            <Route path="/react/context" element={<Context />} />
            <Route path="/react/advanced/reconciliation" element={<Reconciliation />} />
            <Route path="/react/reconciliation" element={<Reconciliation />} />
            <Route path="/react/advanced/react-memo" element={<ReactMemoComponent />} />
            <Route path="/react/react-memo" element={<ReactMemoComponent />} />
            <Route path="/react/advanced/compound-components" element={<CompoundComponents />} />
            <Route path="/react/compound-components" element={<CompoundComponents />} />
            <Route path="/react/advanced/error-handling" element={<ErrorHandling />} />
            <Route path="/react/error-handling" element={<ErrorHandling />} />
            <Route path="/react/advanced/render-props" element={<RenderProps />} />
            <Route path="/react/advanced/hoc" element={<HOC />} />
            <Route path="/react/advanced/portals" element={<Portal />} />
            <Route path="/react/advanced/suspense-lazy" element={<SuspenseLazy />} />
            <Route path="/react/advanced/concurrent-features" element={<ConcurrentFeatures />} />
            <Route path="/react/best-practices/performance" element={<Performance />} />
            <Route path="/react/performance" element={<Performance />} />
            <Route path="/react/best-practices/patterns" element={<Patterns />} />
            <Route path="/react/patterns" element={<Patterns />} />
            <Route path="/react/best-practices/state-management" element={<StateManagement />} />
            <Route path="/react/state-management" element={<StateManagement />} />
            <Route path="/react/best-practices/state-colocation" element={<StateColocation />} />
            <Route path="/react/state-colocation" element={<StateColocation />} />
            <Route path="/react/best-practices/forms-handling" element={<FormsHandling />} />
            <Route path="/react/forms-handling" element={<FormsHandling />} />
            <Route path="/react/best-practices/code-splitting" element={<CodeSplitting />} />
            <Route path="/react/code-splitting" element={<CodeSplitting />} />
            <Route path="/react/best-practices/accessibility" element={<Accessibility />} />
            <Route path="/react/accessibility" element={<Accessibility />} />
            <Route path="/react/*" element={<TopicNotFound />} />
            
            {/* Testing Topics */}
            <Route path="/testing/basics/fundamentals" element={<Testing />} />
            <Route path="/testing/fundamentals" element={<Testing />} />
            <Route path="/testing/*" element={<TopicNotFound />} />
            
            {/* Performance Topics */}
            <Route path="/performance/web/optimization" element={<WebPerformance />} />
            <Route path="/performance/optimization" element={<WebPerformance />} />
            <Route path="/performance/*" element={<TopicNotFound />} />
            
            {/* Security Topics */}
            <Route path="/security/basics/fundamentals" element={<Security />} />
            <Route path="/security/fundamentals" element={<Security />} />
            <Route path="/security/*" element={<TopicNotFound />} />
            
            {/* Next.js Topics */}
            <Route path="/nextjs/fundamentals/app-router" element={<AppRouter />} />
            <Route path="/nextjs/app-router" element={<AppRouter />} />
            <Route path="/nextjs/fundamentals/routing" element={<Routing />} />
            <Route path="/nextjs/routing" element={<Routing />} />
            <Route path="/nextjs/fundamentals/server-components" element={<ServerComponents />} />
            <Route path="/nextjs/server-components" element={<ServerComponents />} />
            <Route path="/nextjs/data/data-fetching" element={<DataFetching />} />
            <Route path="/nextjs/data-fetching" element={<DataFetching />} />
            <Route path="/nextjs/data/api-routes" element={<ApiRoutes />} />
            <Route path="/nextjs/api-routes" element={<ApiRoutes />} />
            <Route path="/nextjs/data/caching" element={<Caching />} />
            <Route path="/nextjs/patterns/caching" element={<Caching />} />
            <Route path="/nextjs/patterns/auth-layout" element={<AuthLayout />} />
            <Route path="/nextjs/patterns/protected-routes" element={<ProtectedRoutes />} />
            <Route path="/nextjs/patterns/server-vs-client" element={<ServerVsClient />} />
            <Route path="/nextjs/patterns/metadata" element={<Metadata />} />
            <Route path="/nextjs/metadata" element={<Metadata />} />
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
            
            {/* Miscellaneous Topics */}
            <Route path="/miscellaneous/data-structures/arrays" element={<Arrays />} />
            <Route path="/miscellaneous/data-structures/linked-lists" element={<LinkedLists />} />
            <Route path="/miscellaneous/data-structures/stacks-queues" element={<StacksQueues />} />
            <Route path="/miscellaneous/data-structures/trees" element={<Trees />} />
            <Route path="/miscellaneous/data-structures/hash-tables" element={<HashTables />} />
            <Route path="/miscellaneous/data-structures/graphs" element={<Graphs />} />
            <Route path="/miscellaneous/http-networking/http-methods" element={<HttpMethods />} />
            <Route path="/miscellaneous/http-networking/status-codes" element={<StatusCodes />} />
            <Route path="/miscellaneous/http-networking/headers" element={<Headers />} />
            <Route path="/miscellaneous/http-networking/cors" element={<CORS />} />
            <Route path="/miscellaneous/http-networking/websockets" element={<WebSockets />} />
            <Route path="/miscellaneous/http-networking/rest-graphql" element={<RESTvsGraphQL />} />
            <Route path="/miscellaneous/git/fundamentals" element={<GitFundamentals />} />
            <Route path="/miscellaneous/git/branching" element={<GitBranching />} />
            <Route path="/miscellaneous/git/rebase" element={<GitRebase />} />
            <Route path="/miscellaneous/git/workflows" element={<GitWorkflows />} />
            <Route path="/miscellaneous/browser-tools/console" element={<ConsoleDebugging />} />
            <Route path="/miscellaneous/browser-tools/network" element={<NetworkTab />} />
            <Route path="/miscellaneous/browser-tools/performance" element={<PerformanceTab />} />
            <Route path="/miscellaneous/*" element={<TopicNotFound />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;