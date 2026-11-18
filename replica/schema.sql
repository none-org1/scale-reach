# Supabase Database Schema Migration
# Run this SQL in your Supabase SQL Editor (https://app.supabase.com -> SQL Editor -> New Query)

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Workspaces table
create table workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  logo_url text,
  brand_colors jsonb not null default '{"primary": "#6366f1", "secondary": "#a855f7"}',
  brand_fonts jsonb not null default '{"heading": "Inter", "body": "Inter"}',
  minutes_balance integer not null default 5000,
  plan_tier text not null default 'pro' check (plan_tier in ('free', 'pro', 'agency', 'enterprise')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index on workspaces (slug);

-- Team Members table (Users to Workspaces)
create table team_members (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'owner' check (role in ('owner', 'admin', 'member')),
  status text not null default 'active' check (status in ('pending', 'active')),
  joined_at timestamptz not null default now(),
  unique(workspace_id, user_id)
);

create index on team_members (user_id);
create index on team_members (workspace_id);

-- Source Videos table
create table source_videos (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  source_type text not null check (source_type in ('youtube', 'file', 'twitch', 'kick', 'drive', 'dropbox', 'loom')),
  source_url text not null,
  file_size bigint,
  duration_seconds integer not null default 0,
  status text not null default 'fetching' check (status in ('fetching', 'transcribing', 'analyzing', 'rendering', 'complete', 'failed')),
  transcript jsonb not null default '[]',
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index on source_videos (workspace_id, created_at desc);
create index on source_videos (status);

-- Clips table
create table clips (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  source_video_id uuid not null references source_videos(id) on delete cascade,
  title text not null,
  start_seconds integer not null,
  end_seconds integer not null,
  duration_seconds integer not null,
  aspect_ratio text not null default '9:16' check (aspect_ratio in ('9:16', '16:9', '1:1')),
  viral_score integer not null default 85 check (viral_score between 0 and 100),
  hook_strength integer not null default 80 check (hook_strength between 0 and 100),
  pacing_score integer not null default 80 check (pacing_score between 0 and 100),
  engagement_score integer not null default 80 check (engagement_score between 0 and 100),
  emotions jsonb not null default '[]',
  captions jsonb not null default '[]',
  storage_url text not null,
  is_favorited boolean not null default false,
  created_at timestamptz not null default now()
);

create index on clips (workspace_id, viral_score desc);
create index on clips (source_video_id);

-- API Keys table (for MCP and external script integration)
create table api_keys (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  key_prefix text not null,
  full_hash text not null unique,
  last_used_at timestamptz,
  created_at timestamptz not null default now()
);

create index on api_keys (workspace_id);

-- Social Accounts table
create table social_accounts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  platform text not null check (platform in ('tiktok', 'instagram', 'youtube', 'x', 'linkedin')),
  account_name text not null,
  access_token text,
  refresh_token text,
  token_expires_at timestamptz,
  status text not null default 'active' check (status in ('active', 'expired')),
  created_at timestamptz not null default now()
);

create index on social_accounts (workspace_id);

-- Scheduled Posts table
create table scheduled_posts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  clip_id uuid not null references clips(id) on delete cascade,
  social_account_ids jsonb not null default '[]',
  caption text not null,
  hashtags text not null default '',
  scheduled_for timestamptz not null,
  status text not null default 'scheduled' check (status in ('scheduled', 'publishing', 'published', 'failed')),
  platform_post_ids jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index on scheduled_posts (workspace_id, scheduled_for);

-- Row Level Security (RLS) Policies
alter table workspaces enable row level security;
alter table team_members enable row level security;
alter table source_videos enable row level security;
alter table clips enable row level security;
alter table api_keys enable row level security;
alter table social_accounts enable row level security;
alter table scheduled_posts enable row level security;

-- RLS helper: user belongs to workspace
create or replace function user_in_workspace(ws_id uuid)
returns boolean as $$
begin
  return exists (
    select 1 from team_members
    where workspace_id = ws_id
    and user_id = auth.uid()
  );
end;
$$ language plpgsql security definer;

-- Policies
create policy "Team members can view workspace" on workspaces for select using (user_in_workspace(id));
create policy "Team members can view members" on team_members for select using (user_in_workspace(workspace_id));
create policy "Team members can view source videos" on source_videos for select using (user_in_workspace(workspace_id));
create policy "Team members can insert source videos" on source_videos for insert with check (user_in_workspace(workspace_id));
create policy "Team members can view clips" on clips for select using (user_in_workspace(workspace_id));
create policy "Team members can manage clips" on clips for all using (user_in_workspace(workspace_id));
create policy "Team members can view api keys" on api_keys for select using (user_in_workspace(workspace_id));
create policy "Team members can view social accounts" on social_accounts for select using (user_in_workspace(workspace_id));
create policy "Team members can manage posts" on scheduled_posts for all using (user_in_workspace(workspace_id));
