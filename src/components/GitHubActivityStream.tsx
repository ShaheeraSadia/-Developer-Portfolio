import React, { useState, useEffect, useMemo } from 'react';
import {
  Github,
  GitCommit,
  GitBranch,
  FolderGit2,
  Star,
  GitFork,
  ExternalLink,
  RefreshCw,
  Clock,
  Search,
  Check,
  Copy,
  Terminal,
  ShieldAlert,
  ArrowUpRight,
  Code2,
  Sparkles,
  Layers,
  Activity,
  AlertCircle,
  Calendar
} from 'lucide-react';
import {
  fetchGitHubActivity,
  GitHubActivityData,
  GitHubCommitItem,
  GitHubRepoItem,
  FALLBACK_GITHUB_DATA,
  getLanguageColor
} from '../utils/githubService';
import { useToast } from './Toast';
import { CommitHeatmap } from './CommitHeatmap';

interface GitHubActivityStreamProps {
  onNavigate?: (section: string) => void;
  className?: string;
}

type StreamTab = 'all' | 'heatmap' | 'commits' | 'repos';

export const GitHubActivityStream: React.FC<GitHubActivityStreamProps> = ({
  onNavigate,
  className = '',
}) => {
  const { showToast } = useToast();
  const [data, setData] = useState<GitHubActivityData>(FALLBACK_GITHUB_DATA);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<StreamTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedSha, setCopiedSha] = useState<string | null>(null);

  // Initial fetch on mount
  useEffect(() => {
    let isMounted = true;
    async function loadInitial() {
      setLoading(true);
      try {
        const result = await fetchGitHubActivity(false);
        if (isMounted) {
          setData(result);
        }
      } catch {
        if (isMounted) {
          setData(FALLBACK_GITHUB_DATA);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadInitial();
    return () => {
      isMounted = false;
    };
  }, []);

  // Force refresh action
  const handleRefresh = async () => {
    if (refreshing || loading) return;
    setRefreshing(true);
    showToast('Checking api.github.com for latest activity...', 'info');
    
    // Smooth delay ensuring clear visual feedback of the active loading state
    const minDelay = new Promise((resolve) => setTimeout(resolve, 600));

    try {
      const [result] = await Promise.all([
        fetchGitHubActivity(true),
        minDelay,
      ]);
      setData(result);
      if (result.isLive) {
        showToast('GitHub activity stream synchronized with live API!', 'success');
      } else {
        showToast('Using verified telemetry cache (Rate-Limit Safe)', 'info');
      }
    } catch {
      showToast('Error syncing with GitHub. Using local telemetry cache.', 'error');
    } finally {
      setRefreshing(false);
    }
  };

  // Copy Commit SHA
  const handleCopySha = (sha: string, shortSha: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(sha);
    setCopiedSha(shortSha);
    showToast(`Copied commit SHA ${shortSha} to clipboard!`);
    setTimeout(() => {
      setCopiedSha(null);
    }, 2000);
  };

  // Filtered Commits
  const filteredCommits = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return data.commits;
    return data.commits.filter(
      (c) =>
        c.message.toLowerCase().includes(q) ||
        c.repoName.toLowerCase().includes(q) ||
        c.shortSha.toLowerCase().includes(q) ||
        c.type.toLowerCase().includes(q)
    );
  }, [data.commits, searchQuery]);

  // Filtered Repositories
  const filteredRepos = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return data.repos;
    return data.repos.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        (r.language && r.language.toLowerCase().includes(q))
    );
  }, [data.repos, searchQuery]);

  // Commit badge visualizer
  const renderCommitTypeBadge = (type: GitHubCommitItem['type']) => {
    switch (type) {
      case 'security':
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-red-500/15 text-red-300 border border-red-500/30">
            security
          </span>
        );
      case 'feat':
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30">
            feat
          </span>
        );
      case 'perf':
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
            perf
          </span>
        );
      case 'fix':
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            fix
          </span>
        );
      case 'chore':
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-slate-500/15 text-slate-300 border border-slate-500/30">
            chore
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            {type}
          </span>
        );
    }
  };

  // Skeleton Loaders for Loading State
  const renderCommitSkeletons = (count = 4) => (
    <div className="space-y-3" id="github-commit-skeletons">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={`commit-skel-${i}`}
          className="p-4 rounded-xl bg-[#0f172a] border border-[#1e293b] space-y-2.5 animate-pulse"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-12 h-4 rounded bg-[#1e293b]" />
              <div className="w-28 h-4 rounded bg-[#1e293b]" />
            </div>
            <div className="w-20 h-4 rounded bg-[#1e293b]" />
          </div>
          <div className="w-3/4 h-5 rounded bg-[#1e293b]" />
          <div className="w-full h-3.5 rounded bg-[#1e293b]/70" />
          <div className="pt-2 border-t border-[#1e293b]/60 flex items-center justify-between">
            <div className="w-32 h-3 rounded bg-[#1e293b]" />
            <div className="w-20 h-3 rounded bg-[#1e293b]" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderRepoSkeletons = (count = 3) => (
    <div className="space-y-3" id="github-repo-skeletons">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={`repo-skel-${i}`}
          className="p-4 rounded-xl bg-[#0f172a] border border-[#1e293b] space-y-2.5 animate-pulse"
        >
          <div className="flex items-center justify-between">
            <div className="w-32 h-4 rounded bg-[#1e293b]" />
            <div className="w-12 h-3 rounded bg-[#1e293b]" />
          </div>
          <div className="w-full h-3.5 rounded bg-[#1e293b]/80" />
          <div className="w-3/4 h-3 rounded bg-[#1e293b]/60" />
          <div className="pt-2 border-t border-[#1e293b]/60 flex items-center justify-between">
            <div className="w-16 h-3 rounded bg-[#1e293b]" />
            <div className="w-12 h-3 rounded bg-[#1e293b]" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section
      id="github-activity-stream"
      className={`bg-[#0a0d12] text-[#f8fafc] py-12 sm:py-16 relative border-t border-[#1e293b] overflow-hidden ${className}`}
    >
      {/* Animated Top Progress Bar when re-fetching or initial loading */}
      {(refreshing || loading) && (
        <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden z-20">
          <div className="w-full h-full bg-gradient-to-r from-blue-600 via-indigo-400 to-emerald-400 animate-pulse" />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#1e293b]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0f172a] border border-[#1e293b] text-blue-400 flex items-center justify-center">
                <Github className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono text-blue-400 uppercase tracking-wider font-semibold">
                Telemetry &amp; Engineering Activity
              </span>
            </div>
            
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5 sm:gap-3">
                <span>GitHub Activity Stream</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono font-normal text-slate-400 px-2 py-0.5 rounded-md bg-[#0f172a] border border-[#1e293b]">
                  <GitBranch className="w-3 h-3 text-blue-400" />
                  <span>main</span>
                </span>
              </h2>

              {/* Small Refresh Icon Button in the Header */}
              <button
                type="button"
                id="github-stream-header-refresh-btn"
                onClick={handleRefresh}
                disabled={refreshing || loading}
                aria-label="Refresh GitHub activity stream"
                title={refreshing || loading ? 'Re-fetching data from GitHub API...' : 'Re-fetch latest data from GitHub API'}
                className={`p-1.5 rounded-lg border text-xs transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center ${
                  refreshing || loading
                    ? 'bg-blue-950/70 text-blue-400 border-blue-500/50 shadow-sm'
                    : 'bg-[#0f172a] hover:bg-[#1e293b] text-slate-400 hover:text-white border-[#1e293b] hover:border-slate-600'
                }`}
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                    refreshing || loading
                      ? 'animate-spin text-blue-400'
                      : 'group-hover:rotate-180 transition-transform duration-500'
                  }`}
                />
              </button>
            </div>

            <p className="text-sm text-white max-w-2xl font-sans">
              Live commit ledger, repository metrics, and continuous deployment signals fetched directly via the GitHub REST API.
            </p>
          </div>

          {/* Right Action Bar & Live Status */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Live API Status Pill */}
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                refreshing || loading
                  ? 'bg-blue-950/60 text-blue-300 border-blue-500/40'
                  : data.isLive
                  ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                  : 'bg-blue-950/40 text-blue-300 border-blue-500/30'
              }`}
              title={
                refreshing || loading
                  ? 'Querying GitHub REST API endpoints...'
                  : data.isLive
                  ? 'Connected directly to api.github.com'
                  : 'Displaying rate-limit safe telemetry cache'
              }
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  refreshing || loading
                    ? 'bg-blue-400 animate-ping'
                    : data.isLive
                    ? 'bg-emerald-400 animate-pulse'
                    : 'bg-blue-400'
                }`}
              />
              <span>
                {refreshing || loading
                  ? 'Re-fetching API...'
                  : data.isLive
                  ? 'Live API Feed'
                  : 'Cached Telemetry'}
              </span>
            </div>

            {/* Sync Refresh Button */}
            <button
              type="button"
              id="github-stream-refresh-btn"
              onClick={handleRefresh}
              disabled={refreshing || loading}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                refreshing || loading
                  ? 'bg-blue-950/60 text-blue-300 border-blue-500/50'
                  : 'bg-[#0f172a] hover:bg-[#1e293b] text-slate-300 hover:text-white border-[#1e293b] hover:border-slate-600'
              }`}
              title={refreshing || loading ? 'Re-fetching data from GitHub API...' : 'Query GitHub API for latest commits & repository events'}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing || loading ? 'animate-spin text-blue-400' : ''}`} />
              <span>{refreshing || loading ? 'Re-fetching...' : 'Sync'}</span>
            </button>

            {/* Direct GitHub Profile Link */}
            <a
              href="https://github.com/ShaheeraSadia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Github className="w-3.5 h-3.5" />
              <span>@ShaheeraSadia</span>
              <ArrowUpRight className="w-3 h-3 opacity-80" />
            </a>
          </div>
        </div>

        {/* Re-fetching Live API Loading State Banner */}
        {refreshing && (
          <div
            id="github-stream-loading-banner"
            className="mt-4 p-3 bg-blue-950/40 border border-blue-500/35 rounded-xl flex items-center justify-between gap-3 text-xs font-mono text-blue-200"
          >
            <div className="flex items-center gap-2.5">
              <RefreshCw className="w-4 h-4 text-blue-400 animate-spin shrink-0" />
              <span>Re-fetching latest commits, pushes, and repositories from api.github.com...</span>
            </div>
            <span className="text-[10px] text-blue-300/80 font-mono hidden sm:inline">Sending REST requests</span>
          </div>
        )}

        {/* Rate-Limit or Error Notice Banner (if applicable) */}
        {!refreshing && data.errorNotice && (
          <div className="mt-4 p-3 bg-blue-950/30 border border-blue-500/25 rounded-xl flex items-center justify-between gap-3 text-xs text-blue-200 font-mono">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{data.errorNotice}</span>
            </div>
            <span className="text-[10px] text-slate-400">REST API v3</span>
          </div>
        )}

        {/* Highlight Telemetry Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <div className="p-4 rounded-xl bg-[#0f172a] border border-[#1e293b] flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-mono text-slate-400">Public Repos</span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">
                {loading ? (
                  <span className="inline-block w-12 h-6 bg-[#1e293b] rounded animate-pulse" />
                ) : (
                  `${data.repos.length}`
                )}
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-[#0a0d12] border border-[#1e293b] text-blue-400 flex items-center justify-center shrink-0">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0f172a] border border-[#1e293b] flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-mono text-slate-400">Recent Commits</span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-blue-400">
                {loading ? (
                  <span className="inline-block w-16 h-6 bg-[#1e293b] rounded animate-pulse" />
                ) : (
                  `${data.commits.length} Logged`
                )}
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-[#0a0d12] border border-[#1e293b] text-blue-400 flex items-center justify-center shrink-0">
              <GitCommit className="w-4 h-4" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0f172a] border border-[#1e293b] flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-mono text-slate-400">Primary Stack</span>
              <div className="text-base sm:text-lg font-bold font-mono text-white truncate">
                {loading ? (
                  <span className="inline-block w-28 h-5 bg-[#1e293b] rounded animate-pulse" />
                ) : (
                  'React / JavaScript'
                )}
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-[#0a0d12] border border-[#1e293b] text-emerald-400 flex items-center justify-center shrink-0">
              <Code2 className="w-4 h-4" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0f172a] border border-[#1e293b] flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-mono text-slate-400">Deployment Status</span>
              <div className="text-base sm:text-lg font-bold font-mono text-emerald-400 flex items-center gap-1.5">
                {loading ? (
                  <span className="inline-block w-20 h-5 bg-[#1e293b] rounded animate-pulse" />
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Shipping</span>
                  </>
                )}
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-[#0a0d12] border border-[#1e293b] text-emerald-400 flex items-center justify-center shrink-0">
              <Activity className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Controls Toolbar: Tabs & Real-Time Filter Search */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-4">
          
          {/* Stream Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#0f172a] border border-[#1e293b] rounded-xl self-start flex-wrap">
            <button
              type="button"
              id="github-tab-all"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-[#1e293b]'
              }`}
            >
              All Activity
            </button>
            <button
              type="button"
              id="github-tab-heatmap"
              onClick={() => setActiveTab('heatmap')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'heatmap'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-[#1e293b]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Contribution Heatmap</span>
            </button>
            <button
              type="button"
              id="github-tab-commits"
              onClick={() => setActiveTab('commits')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'commits'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-[#1e293b]'
              }`}
            >
              <GitCommit className="w-3.5 h-3.5" />
              <span>Commits ({data.commits.length})</span>
            </button>
            <button
              type="button"
              id="github-tab-repos"
              onClick={() => setActiveTab('repos')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'repos'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-[#1e293b]'
              }`}
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Repositories ({data.repos.length})</span>
            </button>
          </div>

          {/* Search / Filter Bar */}
          <div className="relative sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="github-stream-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter commits or repos..."
              className="w-full pl-9 pr-8 py-1.5 text-xs font-mono bg-[#0f172a] border border-[#1e293b] focus:border-blue-500 rounded-xl text-white placeholder-slate-500 outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs cursor-pointer"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Content Views */}
        <div className="relative mt-4">
          {/* Re-fetching Floating Status Indicator */}
          {refreshing && (
            <div className="absolute inset-0 z-10 flex items-start justify-center pt-12 pointer-events-none">
              <div className="px-4 py-2.5 rounded-xl bg-[#0f172a]/95 backdrop-blur-md border border-blue-500/40 text-blue-300 text-xs font-mono flex items-center gap-2.5 shadow-2xl">
                <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
                <span>Re-fetching telemetry from GitHub API...</span>
              </div>
            </div>
          )}

          <div className={`transition-opacity duration-300 ${refreshing ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
            {/* 1. All Activity Combined Stream */}
            {activeTab === 'all' && (
              <div className="space-y-6">
                {/* Visual Contribution Heatmap Graph */}
                <CommitHeatmap
                  commits={data.commits}
                  isLoading={loading || refreshing}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Recent Commits Feed (7 Cols) */}
                  <div className="lg:col-span-7 space-y-3">
                    <div className="flex items-center justify-between pb-2">
                      <div className="flex items-center gap-2">
                        <GitCommit className="w-4 h-4 text-blue-400" />
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                          Recent Commits
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        {loading ? 'Fetching...' : `${filteredCommits.length} items`}
                      </span>
                    </div>

                  {loading ? (
                    renderCommitSkeletons(5)
                  ) : filteredCommits.length === 0 ? (
                    <div className="p-8 text-center bg-[#0f172a] border border-[#1e293b] rounded-2xl space-y-2">
                      <p className="text-xs font-mono text-slate-400">No commits match "{searchQuery}"</p>
                      <button
                        onClick={() => setSearchQuery('')}
                        className="text-xs text-blue-400 hover:underline cursor-pointer"
                      >
                        Reset filter
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredCommits.slice(0, 5).map((commit) => (
                        <div
                          key={commit.id}
                          className="p-4 rounded-xl bg-[#0f172a] border border-[#1e293b] hover:border-slate-600 transition-all group space-y-2.5"
                        >
                          {/* Top row: Semantic Tag + Repo Name + Short SHA + Time */}
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              {renderCommitTypeBadge(commit.type)}
                              <a
                                href={commit.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-mono text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1"
                              >
                                <span>{commit.repoName}</span>
                                <span className="text-slate-500">:</span>
                                <span className="text-slate-400">{commit.branch}</span>
                              </a>
                            </div>

                            <div className="flex items-center gap-2">
                              {/* Copy SHA Button */}
                              <button
                                type="button"
                                onClick={(e) => handleCopySha(commit.sha, commit.shortSha, e)}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#0a0d12] border border-[#1e293b] hover:border-blue-500/40 text-[10px] font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                                title="Copy commit hash"
                              >
                                {copiedSha === commit.shortSha ? (
                                  <Check className="w-2.5 h-2.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-2.5 h-2.5" />
                                )}
                                <span>{commit.shortSha}</span>
                              </button>

                              <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-slate-500" />
                                <span>{commit.relativeTime}</span>
                              </span>
                            </div>
                          </div>

                          {/* Commit Title & Message */}
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors leading-snug">
                              {commit.title}
                            </h4>
                            {commit.body && (
                              <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-2">
                                {commit.body}
                              </p>
                            )}
                          </div>

                          {/* Commit Footer Link */}
                          <div className="pt-2 border-t border-[#1e293b]/60 flex items-center justify-between text-[11px] font-mono">
                            <span className="text-slate-500">Committed by {commit.authorName}</span>
                            <a
                              href={commit.commitUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 flex items-center gap-1 hover:underline cursor-pointer"
                            >
                              <span>Inspect Diff</span>
                              <ExternalLink className="w-3 h-3 opacity-70" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Column: Active Repositories Spotlight (5 Cols) */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="flex items-center justify-between pb-2">
                    <div className="flex items-center gap-2">
                      <FolderGit2 className="w-4 h-4 text-blue-400" />
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                        Active Repositories
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('repos')}
                      className="text-xs font-mono text-blue-400 hover:underline cursor-pointer"
                    >
                      View All ({data.repos.length}) →
                    </button>
                  </div>

                  {loading ? (
                    renderRepoSkeletons(4)
                  ) : (
                    <div className="space-y-3">
                      {filteredRepos.slice(0, 4).map((repo) => (
                        <div
                          key={repo.id}
                          className="p-4 rounded-xl bg-[#0f172a] border border-[#1e293b] hover:border-slate-600 transition-all group space-y-2"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <a
                              href={repo.htmlUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-bold text-white group-hover:text-blue-400 flex items-center gap-1.5 transition-colors"
                            >
                              <FolderGit2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                              <span className="truncate">{repo.name}</span>
                              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>

                            <div className="flex items-center gap-2 shrink-0">
                              {repo.stars > 0 && (
                                <span className="flex items-center gap-1 text-[11px] font-mono text-amber-400">
                                  <Star className="w-3 h-3 fill-amber-400/20" />
                                  <span>{repo.stars}</span>
                                </span>
                              )}
                              <span className="text-[11px] font-mono text-slate-500">
                                {repo.relativeTime}
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-2">
                            {repo.description}
                          </p>

                          <div className="flex items-center justify-between pt-2 border-t border-[#1e293b]/60 text-[11px] font-mono">
                            <div className="flex items-center gap-1.5">
                              <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: repo.languageColor }}
                              />
                              <span className="text-slate-300">{repo.language}</span>
                            </div>

                            <div className="flex items-center gap-3">
                              {repo.homepage && (
                                <a
                                  href={repo.homepage}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 hover:underline"
                                >
                                  <span>Live App</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              )}
                              <a
                                href={repo.htmlUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 flex items-center gap-1 hover:underline"
                              >
                                <span>Code</span>
                                <ArrowUpRight className="w-2.5 h-2.5" />
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

            {/* 2. Contribution Heatmap Dedicated Tab */}
            {activeTab === 'heatmap' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <CommitHeatmap
                  commits={data.commits}
                  isLoading={loading || refreshing}
                />

                {/* Additional Heatmap Insight Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-[#0f172a] border border-[#1e293b] space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Cadence &amp; SLA Commitment</span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      Continuous delivery rhythm with automated validation checks and regression guards on every branch push.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0f172a] border border-[#1e293b] space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>Multi-Repository Sync</span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      Aggregates public releases across <code className="text-blue-300">developer-portfolio</code>, <code className="text-blue-300">toolkit-pro</code>, and open-source utilities.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0f172a] border border-[#1e293b] space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
                      <Activity className="w-3.5 h-3.5" />
                      <span>Granular Day Inspector</span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      Select any day grid square to view logged events, semantic commit categories, and direct diff URLs.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Commits Only Tab */}
            {activeTab === 'commits' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs font-mono text-slate-400">
                    Displaying {loading ? '...' : filteredCommits.length} commits matching criteria
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    Sorted by most recent push
                  </span>
                </div>

                {loading ? (
                  renderCommitSkeletons(6)
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {filteredCommits.map((commit) => (
                      <div
                        key={commit.id}
                        className="p-4 sm:p-5 rounded-xl bg-[#0f172a] border border-[#1e293b] hover:border-slate-600 transition-all group space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            {renderCommitTypeBadge(commit.type)}
                            <a
                              href={commit.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-mono text-blue-400 hover:underline flex items-center gap-1"
                            >
                              <FolderGit2 className="w-3 h-3" />
                              <span>{commit.repoName}</span>
                            </a>
                            <span className="text-slate-600">/</span>
                            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                              <GitBranch className="w-3 h-3 text-slate-500" />
                              <span>{commit.branch}</span>
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={(e) => handleCopySha(commit.sha, commit.shortSha, e)}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#0a0d12] border border-[#1e293b] hover:border-blue-500/40 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                              title="Copy full commit SHA"
                            >
                              {copiedSha === commit.shortSha ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                              <span>{commit.shortSha}</span>
                            </button>

                            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-500" />
                              <span>{commit.relativeTime}</span>
                            </span>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                            {commit.title}
                          </h4>
                          {commit.body && (
                            <p className="text-xs text-slate-300 mt-1 font-sans leading-relaxed">
                              {commit.body}
                            </p>
                          )}
                        </div>

                        <div className="pt-2.5 border-t border-[#1e293b]/60 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                          <span className="text-slate-400">
                            Author: <strong className="text-slate-200">{commit.authorName}</strong> ({commit.authorLogin})
                          </span>
                          <a
                            href={commit.commitUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 flex items-center gap-1.5 hover:underline cursor-pointer"
                          >
                            <span>View commit on GitHub</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. Repositories Only Tab */}
            {activeTab === 'repos' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs font-mono text-slate-400">
                    Displaying {loading ? '...' : filteredRepos.length} public repositories for @ShaheeraSadia
                  </span>
                  <a
                    href="https://github.com/ShaheeraSadia?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <span>View all {data.profile.publicRepos} on GitHub</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={`repo-grid-skel-${i}`}
                        className="p-5 rounded-xl bg-[#0f172a] border border-[#1e293b] space-y-3 animate-pulse"
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-32 h-4 rounded bg-[#1e293b]" />
                          <div className="w-12 h-3 rounded bg-[#1e293b]" />
                        </div>
                        <div className="w-full h-12 rounded bg-[#1e293b]/70" />
                        <div className="pt-3 border-t border-[#1e293b]/60 flex items-center justify-between">
                          <div className="w-16 h-3 rounded bg-[#1e293b]" />
                          <div className="w-12 h-3 rounded bg-[#1e293b]" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredRepos.map((repo) => (
                      <div
                        key={repo.id}
                        className="p-5 rounded-xl bg-[#0f172a] border border-[#1e293b] hover:border-slate-600 transition-all group flex flex-col justify-between space-y-3"
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <a
                              href={repo.htmlUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-base font-bold text-white group-hover:text-blue-400 flex items-center gap-1.5 transition-colors"
                            >
                              <FolderGit2 className="w-4 h-4 text-blue-400 shrink-0" />
                              <span className="truncate">{repo.name}</span>
                            </a>

                            <span className="text-[11px] font-mono text-slate-500 shrink-0">
                              {repo.relativeTime}
                            </span>
                          </div>

                          <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-3">
                            {repo.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#1e293b]/60 flex items-center justify-between text-xs font-mono">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: repo.languageColor }}
                            />
                            <span className="text-slate-300 font-medium">{repo.language}</span>
                            {repo.stars > 0 && (
                              <span className="flex items-center gap-1 text-amber-400 ml-1">
                                <Star className="w-3 h-3 fill-amber-400/20" />
                                <span>{repo.stars}</span>
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3">
                            {repo.homepage && (
                              <a
                                href={repo.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 hover:underline"
                              >
                                <span>Demo</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            <a
                              href={repo.htmlUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 flex items-center gap-1 hover:underline"
                            >
                              <span>GitHub</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
