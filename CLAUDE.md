# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Traditional Chinese Medicine (TCM) tongue diagnosis intelligent analysis system built with Next.js 14 (App Router) and AI technology. The system supports image upload, AI analysis, and result display to provide users with TCM tongue diagnosis reference analysis.

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Zhipu GLM-4.5V Vision Model
- **Image Processing**: HTML5 Canvas, FileReader API

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on available port, typically 3000-3002)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### Core Components Structure

**Main Page (app/page.tsx)**
- Central state management using React hooks
- Orchestrates the complete workflow: upload → analyze → display
- Handles API communication and file operations
- Manages image selection, analysis results, and loading states

**Image Upload Component (ImageUpload.tsx)**
- Multi-method upload: file selection, drag-and-drop, camera capture
- Real-time image preview functionality
- File validation and error handling
- Mobile-responsive design with touch support

**Result Display Component (ResultDisplay.tsx)**
- Structured display categorized by tongue coating, tongue body, and overall analysis
- Color-coded visual hierarchy for different analysis types
- Export functionality for analysis results

**API Route (app/api/analyze/route.ts)**
- Handles image file uploads and processing
- Converts images to base64 format for AI analysis
- Integrates with Zhipu AI API for TCM analysis
- Comprehensive error handling and user feedback

### Data Flow

```
User Upload → ImageUpload Component → Page State → API Route → Zhipu AI Analysis → Result Display
```

### Key Design Patterns

1. **Component Composition**: Modular design with clear separation of concerns
2. **State Management**: Centralized state in main page component
3. **Error Boundaries**: Graceful error handling throughout the application
4. **Responsive Design**: Mobile-first approach with desktop adaptations

## AI Integration

### Zhipu AI Configuration
- **Model**: GLM-4.5V (vision model)
- **API Endpoint**: `https://open.bigmodel.cn/api/paas/v4/chat/completions`
- **Authentication**: Bearer Token
- **Image Format**: Base64 encoded

### Analysis Dimensions
The system analyzes five key TCM dimensions:
1. **苔质** (Coating Quality): Thickness, moisture, texture
2. **苔色** (Coating Color): White, yellow, gray, black variations
3. **舌色** (Tongue Color): Pale, light red, red, crimson, purple states
4. **舌形** (Tongue Shape): Swollen, thin, tooth marks, cracks
5. **舌神** (Tongue Spirit): Vitality, energy levels

## Styling System

### Design Theme
- **Primary**: Green color scheme reflecting TCM health concepts
- **Color Coding**:
  - Green (#16a34a): Tongue analysis
  - Blue (#3b82f6): Coating analysis
  - Purple (#a855f7): Overall analysis
  - Orange (#f97316): Important notices

### Custom Classes
- `.btn-primary`: Primary button styling
- `.btn-secondary`: Secondary button styling
- `.card`: Container card styling

### Responsive Breakpoints
- Mobile: Default styles
- Desktop: `md:` breakpoint uses grid layouts

## Important Development Notes

### API Integration
- Currently uses mock data in development
- Production requires Zhipu AI API key configuration
- Error handling for API failures is implemented

### Security Considerations
- Image processing is client-side for privacy
- API keys should be stored in environment variables for production
- File type validation for security

### Medical Compliance
- System includes comprehensive disclaimer that analysis is for reference only
- Provides professional photography and usage guidance
- Results include detailed TCM theoretical explanations

## Development Workflow

### Component Development
- All interactive components must use `'use client'` directive
- TypeScript interfaces for all component props
- Follow React hooks best practices

### Styling Approach
- Use Tailwind utility classes
- Custom component styles defined in `globals.css`
- Maintain consistent design system

### API Development
- Use Next.js App Router API routes
- Consistent error handling and response format
- TypeScript interfaces for request/response types

## Deployment Considerations

### Environment Variables
- `API_KEY`: Zhipu AI API key
- `API_URL`: Custom API endpoint (if needed)

### Performance Notes
- Consider image size limitations for optimization
- Implement caching for analysis results in production
- Use Next.js build optimizations for production deployment