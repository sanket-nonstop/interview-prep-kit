# Project Architecture & Page Hierarchy

## Overview
This document outlines the page hierarchy and routing structure for the Interview Ready platform.

## Design Principles

1. **Progressive Learning**: Topics organized from fundamentals to advanced
2. **Clear Categorization**: Related topics grouped under parent pages
3. **Consistent Routing**: Predictable URL patterns
4. **Scalability**: Easy to add new topics and categories

## URL Structure Pattern

```
/{category}/{subcategory}/{topic}
```

Examples:
- `/javascript/fundamentals/closures`
- `/react/hooks/useState`
- `/nextjs/patterns/auth-layout`

## Main Categories

### 1. Core Technologies (Technical Skills)
- **HTML**: Structure and semantics
- **CSS**: Styling and layout
- **JavaScript**: Programming fundamentals
- **React**: Component-based UI
- **TypeScript**: Type safety
- **Next.js**: Full-stack framework

### 2. Cross-Cutting Concerns (Professional Skills)
- **SEO**: Search optimization
- **Performance**: Speed and optimization
- **Security**: Web security practices
- **Testing**: Quality assurance

### 3. Utility Pages
- **Home**: Landing and overview
- **Roadmap**: Complete learning path
- **Study Guide**: How to use the platform
- **Interview Tips**: Common questions and strategies

## Folder Structure

```
src/
├── pages/
│   ├── Index.tsx (Home)
│   ├── Roadmap.tsx
│   ├── StudyGuide.tsx (NEW)
│   ├── InterviewTips.tsx (NEW)
│   └── topics/
│       ├── html/
│       │   ├── Index.tsx (Category overview)
│       │   ├── fundamentals/
│       │   ├── advanced/
│       │   └── best-practices/
│       ├── css/
│       │   ├── Index.tsx
│       │   ├── layout/
│       │   ├── styling/
│       │   └── advanced/
│       ├── javascript/
│       │   ├── Index.tsx
│       │   ├── fundamentals/
│       │   ├── advanced/
│       │   ├── async/
│       │   ├── browser/
│       │   └── patterns/
│       ├── react/
│       │   ├── Index.tsx
│       │   ├── fundamentals/
│       │   ├── hooks/
│       │   ├── advanced/
│       │   └── best-practices/
│       ├── typescript/
│       │   ├── Index.tsx
│       │   ├── basics/
│       │   └── advanced/
│       ├── nextjs/
│       │   ├── Index.tsx
│       │   ├── fundamentals/
│       │   ├── data/
│       │   └── patterns/
│       ├── seo/
│       │   ├── Index.tsx
│       │   ├── basics/
│       │   ├── on-page/
│       │   ├── technical/
│       │   └── nextjs/
│       ├── performance/
│       │   ├── Index.tsx
│       │   └── [topics]/
│       ├── security/
│       │   ├── Index.tsx
│       │   └── [topics]/
│       └── testing/
│           ├── Index.tsx
│           └── [topics]/
```

## Benefits of This Structure

1. **Better Navigation**: Users can browse by category
2. **SEO Friendly**: Hierarchical URLs improve search rankings
3. **Maintainable**: Easy to locate and update content
4. **Scalable**: Simple to add new subcategories
5. **User Experience**: Clear learning progression

## Migration Strategy

1. Create category overview pages (Index.tsx for each category)
2. Organize existing topic pages into subcategories
3. Update routing in App.tsx
4. Update topics.ts data structure
5. Update sidebar navigation
6. Add breadcrumb navigation
7. Test all routes

## Next Steps

1. Implement category overview pages
2. Restructure topics.ts with subcategories
3. Update routing configuration
4. Add breadcrumb component
5. Update sidebar to show hierarchy
