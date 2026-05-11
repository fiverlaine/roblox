# Graph Report - src, supabase, documentation  (2026-05-07)

## Corpus Check
- 82 files · ~83,916 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 263 nodes · 309 edges · 47 communities (43 shown, 4 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Affiliate Withdrawals|Affiliate Withdrawals]]
- [[_COMMUNITY_Meta CAPI Tracking|Meta CAPI Tracking]]
- [[_COMMUNITY_Payment Processing|Payment Processing]]
- [[_COMMUNITY_Card Bot Webhook|Card Bot Webhook]]
- [[_COMMUNITY_Telegram Bot Funnel|Telegram Bot Funnel]]
- [[_COMMUNITY_Analytics & Admin Tools|Analytics & Admin Tools]]
- [[_COMMUNITY_Sales Bot Tracking|Sales Bot Tracking]]
- [[_COMMUNITY_BSPay & ZucroPay APIs|BSPay & ZucroPay APIs]]
- [[_COMMUNITY_Payment Gateways Config|Payment Gateways Config]]
- [[_COMMUNITY_Antifraud System|Antifraud System]]
- [[_COMMUNITY_Product Requirements|Product Requirements]]
- [[_COMMUNITY_Supabase Project Config|Supabase Project Config]]
- [[_COMMUNITY_Card Bot Edge Function|Card Bot Edge Function]]

## God Nodes (most connected - your core abstractions)
1. `formatCurrency()` - 11 edges
2. `formatRobux()` - 9 edges
3. `handleStart()` - 8 edges
4. `sendFunnelStep()` - 8 edges
5. `Edge Function: utmify-event` - 8 edges
6. `Meta Pixel vs Conversions API Guide (2024-2026)` - 7 edges
7. `Edge Function: group-webhook` - 6 edges
8. `editMessage()` - 5 edges
9. `handleReply()` - 5 edges
10. `ZucroPay API Documentation` - 5 edges

## Surprising Connections (you probably didn't know these)
- `BSPay Webhook Payment Notification` --semantically_similar_to--> `ZucroPay Webhook Events`  [INFERRED] [semantically similar]
  documentation/Doc bspay.md → documentation/docs_zucropay.md
- `BSPay PIX QR Code Generation` --semantically_similar_to--> `ZucroPay PIX Payment Method`  [INFERRED] [semantically similar]
  documentation/Doc bspay.md → documentation/docs_zucropay.md
- `Edge Function: utmify-event` --calls--> `UTMify Orders API Endpoint`  [EXTRACTED]
  documentation/PRD.md → documentation/Documentação API - UTMify.md
- `handleApprove()` --calls--> `formatCurrency()`  [INFERRED]
  src/pages/admin/AffiliateWithdrawals.tsx → src/lib/utils.ts
- `PRD — Roblox Vault v3.0` --references--> `Meta Pixel vs Conversions API Guide (2024-2026)`  [EXTRACTED]
  documentation/PRD.md → documentation/Meta vs API de Conversões (CAPI) – Guia Técnico (2024–2026).md

## Hyperedges (group relationships)
- **PIX Payment → Webhook → UTMify Reporting Flow** — prd_edge_create_payment, prd_edge_zucropay_webhook, prd_edge_utmify_event, prd_table_payments, prd_table_capi_logs [EXTRACTED 1.00]
- **Telegram Funnel → Group Join → CAPI Lead Event Flow** — prd_edge_telegram_bot_webhook, prd_edge_group_webhook, concept_capi_server_side, prd_table_telegram_leads, prd_table_capi_logs [EXTRACTED 1.00]
- **Affiliate-Specific Pixel + UTMify Routing** — prd_affiliate_system, prd_table_affiliate_tracking_configs, prd_edge_utmify_event, prd_edge_group_webhook, concept_hybrid_tracking [EXTRACTED 0.95]

## Communities (47 total, 4 thin omitted)

### Community 0 - "Affiliate Withdrawals"
Cohesion: 0.06
Nodes (13): fetchWithdrawals(), handleApprove(), handleExpand(), handleReject(), loadCommissionForUser(), fetchAll(), handleSubmit(), cn() (+5 more)

### Community 1 - "Meta CAPI Tracking"
Cohesion: 0.11
Nodes (28): CAPI Event Deduplication via event_id, Meta Conversions API Server-Side Tracking, Event Match Quality (EMQ) Score, Hybrid Pixel + CAPI Tracking Strategy, LGPD Privacy Compliance for CAPI, Meta Pixel Client-Side Tracking, Telegram chat_member Update Event, Telegram createChatInviteLink (+20 more)

### Community 2 - "Payment Processing"
Cohesion: 0.12
Nodes (4): fireInitiateCheckout(), hashSHA256(), hashSHA256(), sendCAPIEvent()

### Community 3 - "Card Bot Webhook"
Cohesion: 0.15
Nodes (11): deleteMessage(), editMessage(), generateCardNumber(), generateCPF(), generateCVV(), randomDigits(), sendMessage(), sendPhoto() (+3 more)

### Community 4 - "Telegram Bot Funnel"
Cohesion: 0.2
Nodes (15): delay(), generateUniqueInviteLink(), getFunnelSteps(), handleAdmin(), handleChatMember(), handleStart(), hashSHA256(), sendCAPIEvent() (+7 more)

### Community 5 - "Analytics & Admin Tools"
Cohesion: 0.12
Nodes (3): handleKeyDown(), handleSearch(), formatDate()

### Community 6 - "Sales Bot Tracking"
Cohesion: 0.26
Nodes (13): delay(), fireBackgroundTracking(), getVideoFileId(), handleAdmin(), handleReply(), handleStart(), hashSHA256(), sendCAPIEvent() (+5 more)

### Community 7 - "BSPay & ZucroPay APIs"
Cohesion: 0.14
Nodes (16): BSPay OAuth2 Basic Authentication, BSPay PIX QR Code Generation, BSPay Webhook Payment Notification, UTMify Commission Data Structure, UTMify Orders API Endpoint, UTMify Tracking Parameters (UTM + src/sck), ZucroPay API Key Authentication, ZucroPay Charges API (+8 more)

### Community 10 - "Payment Gateways Config"
Cohesion: 0.6
Nodes (3): getConfig(), handleSave(), openConfig()

## Knowledge Gaps
- **15 isolated node(s):** `BSPay OAuth2 Basic Authentication`, `ZucroPay API Key Authentication`, `UTMify Tracking Parameters (UTM + src/sck)`, `UTMify Commission Data Structure`, `Meta Pixel Client-Side Tracking` (+10 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `formatCurrency()` connect `Affiliate Withdrawals` to `Analytics & Admin Tools`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `formatDate()` connect `Analytics & Admin Tools` to `Affiliate Withdrawals`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **What connects `BSPay OAuth2 Basic Authentication`, `ZucroPay API Key Authentication`, `UTMify Tracking Parameters (UTM + src/sck)` to the rest of the system?**
  _15 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Affiliate Withdrawals` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `Meta CAPI Tracking` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._
- **Should `Payment Processing` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._
- **Should `Analytics & Admin Tools` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._