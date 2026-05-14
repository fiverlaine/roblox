# Graph Report - src+supabase  (2026-05-14)

## Corpus Check
- 75 files · ~58,420 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 214 nodes · 246 edges · 42 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_UI Header & Format Utils|UI Header & Format Utils]]
- [[_COMMUNITY_Checkout & Meta CAPI Tracking|Checkout & Meta CAPI Tracking]]
- [[_COMMUNITY_Telegram Bot - Fake CardCPF Gen|Telegram Bot - Fake Card/CPF Gen]]
- [[_COMMUNITY_Telegram Bot Webhook Orchestration|Telegram Bot Webhook Orchestration]]
- [[_COMMUNITY_Admin Tables & Filters|Admin Tables & Filters]]
- [[_COMMUNITY_Telegram Bot Funnel State|Telegram Bot Funnel State]]
- [[_COMMUNITY_Affiliate Withdrawal Approval|Affiliate Withdrawal Approval]]
- [[_COMMUNITY_Gateway Configuration|Gateway Configuration]]

## God Nodes (most connected - your core abstractions)
1. `formatCurrency()` - 11 edges
2. `formatRobux()` - 9 edges
3. `handleStart()` - 8 edges
4. `sendFunnelStep()` - 8 edges
5. `editMessage()` - 5 edges
6. `handleReply()` - 5 edges
7. `formatDate()` - 4 edges
8. `randomDigits()` - 4 edges
9. `showMainMenu()` - 4 edges
10. `sendMessage()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `handleApprove()` --calls--> `formatCurrency()`  [INFERRED]
  src/pages/admin/AffiliateWithdrawals.tsx → src/lib/utils.ts

## Communities (42 total, 0 thin omitted)

### Community 0 - "UI Header & Format Utils"
Cohesion: 0.08
Nodes (4): cn(), formatCPF(), formatPhone(), formatRobux()

### Community 1 - "Checkout & Meta CAPI Tracking"
Cohesion: 0.12
Nodes (4): fireInitiateCheckout(), hashSHA256(), hashSHA256(), sendCAPIEvent()

### Community 2 - "Telegram Bot - Fake Card/CPF Gen"
Cohesion: 0.15
Nodes (11): deleteMessage(), editMessage(), generateCardNumber(), generateCPF(), generateCVV(), randomDigits(), sendMessage(), sendPhoto() (+3 more)

### Community 3 - "Telegram Bot Webhook Orchestration"
Cohesion: 0.2
Nodes (15): delay(), generateUniqueInviteLink(), getFunnelSteps(), handleAdmin(), handleChatMember(), handleStart(), hashSHA256(), sendCAPIEvent() (+7 more)

### Community 4 - "Admin Tables & Filters"
Cohesion: 0.12
Nodes (3): handleKeyDown(), handleSearch(), formatDate()

### Community 5 - "Telegram Bot Funnel State"
Cohesion: 0.26
Nodes (13): delay(), fireBackgroundTracking(), getVideoFileId(), handleAdmin(), handleReply(), handleStart(), hashSHA256(), sendCAPIEvent() (+5 more)

### Community 6 - "Affiliate Withdrawal Approval"
Cohesion: 0.23
Nodes (9): fetchWithdrawals(), handleApprove(), handleExpand(), handleReject(), loadCommissionForUser(), fetchAll(), handleSubmit(), formatCurrency() (+1 more)

### Community 9 - "Gateway Configuration"
Cohesion: 0.6
Nodes (3): getConfig(), handleSave(), openConfig()

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `formatCurrency()` connect `Affiliate Withdrawal Approval` to `UI Header & Format Utils`, `Admin Tables & Filters`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Why does `formatDate()` connect `Admin Tables & Filters` to `UI Header & Format Utils`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Should `UI Header & Format Utils` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `Checkout & Meta CAPI Tracking` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._
- **Should `Admin Tables & Filters` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._