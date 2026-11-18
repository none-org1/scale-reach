# Design System: ScaleReach.ai Clone

## 1. Color Roles
- **Background (`bg`)**: `#090a0f` (Deep dark slate/black)
- **Surface (`surface`)**: `#12141c` (Card & panel background)
- **Surface Hover (`surface-hover`)**: `#1a1d28` (Interactive card hover state)
- **Border (`border`)**: `#222634` (Subtle dividers and containers)
- **Border Input (`border-input`)**: `#2e3448` (Form input borders)
- **Text (`text`)**: `#f3f4f6` (Primary headings and body)
- **Text Muted (`text-muted`)**: `#9ca3af` (Secondary descriptions and labels)
- **Accent (`accent`)**: `#6366f1` (Indigo primary action & branding)
- **Accent Hover (`accent-hover`)**: `#4f46e5`
- **On-Accent (`on-accent`)**: `#ffffff`
- **Danger (`danger`)**: `#ef4444` (Delete, errors, failed states)
- **Success (`success`)**: `#22c55e` (Complete, active status)
- **Warning (`warning`)**: `#f59e0b` (Pending, notice)

## 2. Typography
- **Primary Font**: Inter (System sans-serif fallback)
- **Scale**:
  - `xs`: 12px / line-height 16px
  - `sm`: 14px / line-height 20px
  - `base`: 16px / line-height 24px
  - `lg`: 18px / line-height 28px
  - `xl`: 20px / line-height 28px
  - `2xl`: 24px / line-height 32px

## 3. Component Specs

### Button
- **Variants**: primary, secondary, ghost, danger
- **Sizes**: sm (32px height), md (40px height), lg (48px height)
- **States**: default, hover, active, focus-visible (2px ring, accent), disabled, loading
- **Tokens**: bg accent, text on-accent, radius md, font sm/600

### Input / URL Field
- **Variants**: default, error
- **States**: default, focus (border accent, ring accent/20), disabled, readonly
- **Tokens**: bg surface, border border-input, text text, radius md

### Clip Tile Card
- **States**: default, hover (border-accent/50), selected, processing
- **Tokens**: bg surface, border border, radius lg, padding 4

### Viral Score Badge
- **Variants**: high (>85), medium (70-84), low (<70)
- **Tokens**: bg surface-hover, text success/warning/muted, radius full, font xs/700
