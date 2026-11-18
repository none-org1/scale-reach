# Recon map: ScaleReach.ai (Web)

Scope: The core loop of AI video repurposing — video ingest (URL/file), AI moment detection & viral scoring, AI transcription & captions, clip editing & AI reframe, public sharing, and social media scheduling.
For: Personal business and education purposes.
Date: 2026-11-18

## Sources

| # | source | URL | notes |
| --- | --- | --- | --- |
| 1 | marketing site & overview | https://www.scalereach.ai/ | Tagline, core 3-step flow, pricing tiers |
| 2 | help center | https://www.scalereach.ai/help/ | 12 exhaustive guides covering workspaces, ingestion, processing, review, library, editing, scheduling, minutes, billing, settings, API keys, security |
| 3 | tool inventory (30 tools) | https://www.scalereach.ai/tools/ | Full list of dedicated tool pages (clip generator, resizer, compressor, transcription, summarizer, hook generator, gameplay background generators, etc.) |
| 4 | use cases (16 categories) | https://www.scalereach.ai/ (footer/nav) | YouTube, podcast, education, fitness, gaming, coaching, etc. |
| 5 | MCP server docs | https://www.scalereach.ai/mcp/ | 15 MCP tools for chatting with Claude/Cursor to clip and schedule |
| 6 | pricing page | https://www.scalereach.ai/pricing/ | Free, Pro ($18/mo or $99/yr), Agency ($59/mo or $348/yr), Enterprise |
| 7 | changelog & blog | https://www.scalereach.ai/changelog/ | Version history (v0.3.0 to v0.5.0) showing features added through March 2026 |

## Core loop

Users paste a long-form video URL or upload a file; the AI transcribes and scores every moment for viral potential; users review, edit, reframe, and add captions to clips; and publish/schedule them directly to TikTok, Instagram Reels, and YouTube Shorts.

## Screens

| ID | screen | route or how to reach | purpose | key components | states seen |
| --- | --- | --- | --- | --- | --- |
| S01 | Landing & Marketing Page | `/` | Conversion & pitch | Hero with video demo, feature grid, pricing table, social proof, FAQ | public, mobile, desktop |
| S02 | Sign up / Login | `/sign-up`, `/login` | Authentication | Email/password, Google auth, magic link | unauthenticated, error, loading |
| S03 | Workspace Dashboard | `/` (app root) | Central hub for uploaded videos & clips | Workspace picker, minutes counter, video list, "New Project" upload button, active jobs indicator | empty, loading, filled, error |
| S04 | Video Upload & Configure Modal | Click "New Project" / paste link | Ingest source video | URL input field, file dropzone, aspect ratio selector (9:16, 16:9, 1:1), caption style picker, auto-hook toggle, AI thumbnail toggle | default, validating URL, uploading, error |
| S05 | Processing / Progress View | Video item in dashboard | Real-time status tracking | Progress bar, 4-stage indicator (Fetch -> Transcribe -> Find Moments -> Render), estimated time | fetching, transcribing, rendering, failed, complete |
| S06 | Clip Review & Triage View | Click finished video in dashboard | Review AI-detected clips | Grid/list of clips, viral score badge, emotional tags, favorite toggle, discard button, duration badge | empty, filtered, loaded |
| S07 | Video Editor & Reframer | Click a clip from review | Fine-tune clip presentation | Video preview player, timeline trimmer, AI Reframe (speaker tracking) toggle, caption text editor & font/color picker, overlay panels (text, image, split-screen gameplay background) | previewing, editing, re-rendering, saved |
| S08 | Clip Library | `/library` (workspace view) | Workspace-wide asset management | Multi-clip selection, batch export button, filters (score, aspect ratio, emotion, favorited), delete/share actions | empty, filled, selected |
| S09 | Public Share Page | `/clip/[id]` | External viewing & approval | Single player, download button, embed code, branding | public view, download ready |
| S10 | Post Scheduler & Calendar | `/tools/social-media-post-scheduler` | Calendar-based multi-platform queue | Calendar view (week/month), connected account list, post composer, platform selector (TikTok, Reels, Shorts, X, LinkedIn), scheduling time picker | empty calendar, scheduled posts, posting, failed |
| S11 | MCP Integration Setup | `/mcp` | Connect LLMs (Claude, Cursor) | API key generator, copy-to-clipboard command (`npx scalereach-mcp setup`), manual JSON config | unconfigured, key active, revoked |
| S12 | Workspace Settings & Billing | `/settings` | Account & tier management | Workspace name/slug editor, brand kit (logo, colors, fonts), member invitations list, plan upgrade/cancellation, source minutes balance & usage history | owner view, member view, billing active, card declined |

## Flows

```
F01 Ingest and Process Video
    S03 Dashboard -> S04 Upload Modal (paste YouTube URL) -> S05 Processing View -> S06 Review Clips
    happy path clicks: 4
    edge: YouTube bot-detection failure, silent gameplay / no speech, video > 3 hours, running out of source minutes

F02 Review, Edit, and Reframe a Clip
    S06 Review Clips -> S07 Editor (trim start/end) -> S07 Editor (enable AI Reframe) -> S07 Editor (tweak captions & add split-screen background) -> S07 Editor (save/re-render)
    happy path clicks: 6
    edge: transcript typo in key jargon, non-human subject in frame (AI reframe loss of tracking), multi-speaker crosstalk

F03 Batch Export Clips
    S03 Dashboard -> S08 Clip Library -> S08 Filter/Select multiple clips -> Click Batch Export -> Download MP4 archive
    happy path clicks: 4
    edge: browser download limits on large files, storage expiration (6 months on Pro)

F04 Schedule to Socials
    S03 Dashboard -> S10 Post Scheduler -> Connect platform account -> Select clip -> Pick platforms -> Write captions & hashtags -> Set publish time -> Confirm
    happy path clicks: 7
    edge: expired platform auth token, TikTok auto-posting audit restriction (private-only fallback), unsupported video format/length for target platform

F05 MCP Integration Setup & Chat Clipping
    S11 MCP Setup page -> Generate API key -> Run setup command / paste config -> Open Claude Desktop / Cursor -> Prompt Claude to clip a video -> Receive clip download link
    happy path clicks: 3
    edge: leaked API key requiring revocation, insufficient minutes balance for API job submission
```

## Components

| component | variants | states | used on |
| --- | --- | --- | --- |
| Button | primary, secondary, ghost, danger | default, hover, focus, disabled, loading | all screens |
| Input / URL Field | text, search, paste URL with validation | default, typing, valid, error/invalid | S04, S10, S11 |
| Video Card / Clip Tile | standard clip, favorited clip, processing tile | default, hover, selected, processing, failed | S03, S06, S08 |
| Viral Score Badge | high (>85), medium (70-84), low (<70) | default | S06, S07 |
| Timeline Trimmer | dual-handle scrubber | default, dragging, error | S07 |
| Caption Editor | word-level transcript rows, style panel | editing text, styling fonts/colors, active highlight | S07 |
| Aspect Ratio Selector | 9:16 vertical, 16:9 horizontal, 1:1 square | unselected, selected | S04, S07 |
| Calendar Grid | month view, week view, day view | empty cell, scheduled item, published item, failed item | S10 |
| Modal Dialog | upload modal, invite member modal, confirm delete | open, closing, closed | S04, S12 |
| Toast Notification | success, error, info | appearing, visible, dismissing | all screens |

## Inferred data model

```
Workspace  id, name, slug, logo_url, brand_colors (json), brand_fonts (json), minutes_balance, plan_tier, created_at
           evidence: S12 settings, help doc 4.1 & 4.10
           confidence: high

User       id, email, name, avatar_url, auth_provider, two_fa_enabled, created_at
           evidence: help doc 4.12
           confidence: high

SourceVideo id, workspace_id, source_type (youtube | file | twitch | ...), source_url, file_size, duration_seconds, status (fetching | transcribing | analyzing | rendering | complete | failed), transcript (json), error_message, created_at
           evidence: help docs 4.2, 4.3, 4.8
           confidence: high

Clip       id, workspace_id, source_video_id, title, start_seconds, end_seconds, duration_seconds, aspect_ratio (9:16 | 16:9 | 1:1), viral_score, hook_strength, pacing_score, engagement_score, emotions (json), captions (json), storage_url, is_favorited, created_at
           evidence: help docs 4.4, 4.5, 4.6
           confidence: high

ApiKey     id, workspace_id, key_prefix, full_hash, last_used_at, created_at
           evidence: help doc 4.11
           confidence: high

SocialAccount id, workspace_id, platform (tiktok | instagram | youtube | x | linkedin), account_name, access_token, refresh_token, token_expires_at, status (active | expired), created_at
           evidence: help doc 4.7
           confidence: high

ScheduledPost id, workspace_id, clip_id, social_account_ids (json), caption, hashtags, scheduled_for, status (scheduled | publishing | published | failed), platform_post_ids (json), created_at
           evidence: help doc 4.7
           confidence: high

TeamMember id, workspace_id, user_email, role (owner | admin | member), status (pending | active), joined_at
           evidence: help doc 4.10
           confidence: high
```

Relationships:
- Workspace `1-n` User (via TeamMember)
- Workspace `1-n` SourceVideo
- SourceVideo `1-n` Clip
- Workspace `1-n` ApiKey
- Workspace `1-n` SocialAccount
- SocialAccount `1-n` ScheduledPost
- Clip `1-n` ScheduledPost

## Feature matrix

See `replica/features.csv`. Must: 25, should: 10, could: 5, skip: 2.

## Out of scope (cannot or should not be cloned)
- Direct automated publishing to TikTok API (until TikTok finishes external developer audit; fallback is private-only scheduling/manual download).
- Proprietary speech-to-text and AI LLM models (we will use standard Whisper / Web APIs / LLM APIs for transcription and moment scoring).
- Official third-party OAuth integrations with live social platforms (we will build a fully functional mock scheduler and calendar interface).

## Size
Screens: 12, Flows: 5, Entities: 8. 
Hard parts: AI speaker-tracking reframe, word-level synchronized transcript editing, real-time job processing simulation, and multi-platform scheduler calendar. 
Size: **L** (Large — multi-week project).
