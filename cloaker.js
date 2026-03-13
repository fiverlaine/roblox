(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  54006,
  (e) => {
    "use strict";
    var s = e.i(43476),
      t = e.i(71645),
      a = e.i(83599),
      l = e.i(66587),
      r = e.i(93479),
      i = e.i(73635),
      n = e.i(67489),
      o = e.i(76639),
      d = e.i(58524),
      c = e.i(74886),
      x = e.i(78917),
      m = e.i(88699),
      h = e.i(27612),
      p = e.i(40524),
      b = e.i(31278),
      u = e.i(37727),
      g = e.i(43531),
      j = e.i(96421),
      f = e.i(16715),
      N = e.i(7233),
      v = e.i(7899),
      w = e.i(78894),
      k = e.i(39312),
      y = e.i(98919),
      C = e.i(51737),
      S = e.i(17923);
    let F = (0, e.i(75254).default)("flask-conical", [
      [
        "path",
        {
          d: "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",
          key: "18mbvz",
        },
      ],
      [
        "path",
        {
          d: "M6.453 15h11.094",
          key: "3shlmq",
        },
      ],
      [
        "path",
        {
          d: "M8.5 2h7",
          key: "csnxdl",
        },
      ],
    ]);
    var D = e.i(51975),
      _ = e.i(64659),
      z = e.i(55900),
      T = e.i(12426),
      I = e.i(61911),
      A = e.i(1928),
      E = e.i(48256),
      L = e.i(69638),
      U = e.i(3116),
      R = e.i(63209),
      M = e.i(15057),
      V = e.i(78583),
      P = e.i(51445),
      B = e.i(86536),
      $ = e.i(93022),
      G = e.i(88081),
      O = e.i(75157),
      q = e.i(99375),
      W = e.i(41018),
      H = e.i(19323);
    let K = {
        enabled: !1,
        source: "FB",
        medium: "{{adset.name}}|{{adset.id}}",
        campaign: "{{campaign.name}}|{{campaign.id}}",
        content: "{{ad.name}}|{{ad.id}}",
        term: "{{placement}}",
        id: "{{campaign.id}}",
      },
      X = () => {
        let e = "abcdefghijklmnopqrstuvwxyz0123456789",
          s = "";
        for (let t = 0; t < 8; t++)
          s += e.charAt(Math.floor(Math.random() * e.length));
        return s;
      };
    function Z() {
      let e,
        Z,
        J,
        Q,
        Y,
        ee,
        es,
        et,
        ea,
        el,
        er,
        ei,
        en,
        eo,
        ed,
        ec,
        ex,
        em,
        eh,
        ep,
        { addToast: eb, confirm: eu } = (0, i.useToast)(),
        [eg, ej] = (0, t.useState)("redirecionadores"),
        { data: ef, isLoading: eN, mutate: ev } = (0, a.default)("/api/links"),
        { data: ew } = (0, a.default)("/api/flows", {
          revalidateOnFocus: !1,
        }),
        { data: ek, mutate: ey } = (0, a.default)("/api/custom-domains", {
          revalidateOnFocus: !1,
        }),
        { data: eC } = (0, a.default)("/api/bots", {
          revalidateOnFocus: !1,
        }),
        eS = (0, t.useMemo)(() => ef?.data?.links || [], [ef]),
        eF = (0, t.useMemo)(() => ew?.data?.flows || [], [ew]),
        eD = (0, t.useMemo)(() => ek?.domains || [], [ek]),
        e_ = ek?.fallbackOrigin || "links.sharkbot.com.br",
        ez = ek?.isConfigured || !1,
        eT = (0, t.useMemo)(() => eC?.data?.bots || [], [eC]),
        eI = (0, t.useMemo)(
          () =>
            "redirecionadores" === eg
              ? eS.filter((e) => "link" === e.type)
              : "codigos-venda" === eg
                ? eS.filter((e) => "sales_code" === e.type)
                : eS,
          [eS, eg],
        ),
        [eA, eE] = (0, t.useState)(!1),
        [eL, eU] = (0, t.useState)("random"),
        [eR, eM] = (0, t.useState)(""),
        [eV, eP] = (0, t.useState)("random"),
        [eB, e$] = (0, t.useState)(!0),
        [eG, eO] = (0, t.useState)([]),
        [eq, eW] = (0, t.useState)(""),
        [eH, eK] = (0, t.useState)(!1),
        [eX, eZ] = (0, t.useState)(null),
        [eJ, eQ] = (0, t.useState)("telegram"),
        [eY, e0] = (0, t.useState)(""),
        [e1, e2] = (0, t.useState)(""),
        [e5, e4] = (0, t.useState)(null),
        { data: e3, isLoading: e9 } = (0, a.default)(
          e5 ? `/api/bots/${e5}/chats` : null,
        ),
        e6 = (0, t.useMemo)(
          () =>
            (e3?.data?.chats || []).filter(
              (e) =>
                e.botIsAdmin &&
                ("channel" === e.type || "supergroup" === e.type),
            ),
          [e3],
        ),
        [e8, e7] = (0, t.useState)(""),
        [se, ss] = (0, t.useState)(""),
        [st, sa] = (0, t.useState)(50),
        [sl, sr] = (0, t.useState)(null),
        { data: si } = (0, a.default)(
          sl ? `/api/links/${sl}/pool-status` : null,
        );
      si?.success && si.data;
      let [sn, so] = (0, t.useState)({
          ...K,
        }),
        [sd, sc] = (0, t.useState)(!1),
        [sx, sm] = (0, t.useState)(null),
        [sh, sp] = (0, t.useState)(!1),
        [sb, su] = (0, t.useState)(!1),
        [sg, sj] = (0, t.useState)("safepage"),
        [sf, sN] = (0, t.useState)(!0),
        [sv, sw] = (0, t.useState)(!1),
        [sk, sy] = (0, t.useState)(""),
        [sC, sS] = (0, t.useState)(!1),
        [sF, sD] = (0, t.useState)(!1),
        [s_, sz] = (0, t.useState)(null),
        sT = sF && s_ ? s_._id : null,
        { data: sI, isLoading: sA } = (0, a.default)(
          sT ? `/api/clicks?linkId=${sT}&limit=20` : null,
        ),
        sE = (sI?.success && sI.data?.clicks) || [],
        [sL, sU] = (0, t.useState)(!1),
        [sR, sM] = (0, t.useState)(null),
        [sV, sP] = (0, t.useState)("default"),
        [sB, s$] = (0, t.useState)(1),
        [sG, sO] = (0, t.useState)(new Set()),
        [sq, sW] = (0, t.useState)(""),
        [sH, sK] = (0, t.useState)("custom"),
        [sX, sZ] = (0, t.useState)(""),
        [sJ, sQ] = (0, t.useState)(""),
        [sY, s0] = (0, t.useState)(""),
        [s1, s2] = (0, t.useState)(""),
        [s5, s4] = (0, t.useState)(""),
        [s3, s9] = (0, t.useState)(""),
        [s6, s8] = (0, t.useState)(""),
        [s7, te] = (0, t.useState)(""),
        [ts, tt] = (0, t.useState)(""),
        ta = (0, t.useRef)(null),
        tl = (0, t.useRef)(!1),
        [tr, ti] = (0, t.useState)(""),
        [tn, to] = (0, t.useState)(!1),
        [td, tc] = (0, t.useState)(null),
        [tx, tm] = (0, t.useState)(null),
        [th, tp] = (0, t.useState)("default");
      ((0, t.useEffect)(() => {
        (tg(), eE(!1));
      }, [eg]),
        (0, t.useEffect)(() => {
          "random" !== eL || eX || eM(X());
        }, [eL, eX]),
        (0, t.useEffect)(() => {
          if (sq) {
            let e = eS.find((e) => e._id === sq);
            if (e?.shk || e?.ph) {
              let s = e.shk ? "shk" : "ph",
                t = e.shk || e.ph || "";
              te(t ? `${s}=${t}` : "");
            } else te("");
          }
        }, [sq, eS]));
      let tb = (e) => {
          e && /^[a-f0-9]{24}$/i.test(e) ? e4(e) : e4(null);
        },
        tu = (e) => {
          eO((s) => (s.includes(e) ? s.filter((s) => s !== e) : [...s, e]));
        },
        tg = () => {
          (eU("random"),
            eM(X()),
            eP("random"),
            e$(!0),
            su(!1),
            sj("safepage"),
            sN(!0),
            sw(!1),
            sy(""),
            sS(!1),
            eO([]),
            eW(""),
            eZ(null),
            eQ("telegram"),
            e0(""),
            e2(""),
            e4(null),
            e7(""),
            ss(""),
            sa(50),
            sr(null),
            sP("default"),
            s$(1),
            so({
              ...K,
            }));
        },
        tj = async () => {
          if (!tr.trim())
            return void eb({
              type: "error",
              title: "Digite um domínio",
            });
          to(!0);
          try {
            let e = await fetch("/api/custom-domains", {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  domain: tr.trim(),
                }),
              }),
              s = await e.json();
            if (!e.ok) throw Error(s.error || "Erro ao adicionar domínio");
            (ti(""),
              ey(),
              (0, l.invalidateGroup)("domains"),
              eb({
                type: "success",
                title: "Domínio adicionado! Configure o CNAME no seu DNS.",
              }));
          } catch (e) {
            eb({
              type: "error",
              title:
                e instanceof Error ? e.message : "Erro ao adicionar domínio",
            });
          } finally {
            to(!1);
          }
        },
        tf = async (e) => {
          tc(e);
          try {
            let s = await fetch(`/api/custom-domains/${e}/verify`, {
                method: "POST",
                credentials: "include",
              }),
              t = await s.json();
            if (!s.ok) throw Error(t.error || "Erro ao verificar domínio");
            (ey(),
              (0, l.invalidateGroup)("domains"),
              "active" === t.domain.status
                ? eb({
                    type: "success",
                    title: "Domínio verificado e ativo!",
                  })
                : eb({
                    type: "warning",
                    title:
                      "DNS ainda não propagado. Tente novamente em alguns minutos.",
                  }));
          } catch (e) {
            eb({
              type: "error",
              title: e instanceof Error ? e.message : "Erro ao verificar",
            });
          } finally {
            tc(null);
          }
        },
        tN = (e) => {
          (eZ(e._id),
            s$(2),
            eE(!0),
            eU(e.slugType || "custom"),
            eM("codigos-venda" === eg ? e.name : e.slug),
            eP(e.mode || "random"),
            e$(e.isActive),
            su(e.cloakerV2?.enabled || !1),
            sj(e.cloakerV2?.blockMethod || "safepage"),
            sN(e.cloakerV2?.blockAdBots !== !1),
            sw(e.cloakerV2?.antiSharing || !1),
            sy(e.cloakerV2?.safeUrl || ""),
            eQ(e.destinationType || "telegram"),
            e0(e.destinationUrl || ""),
            "channel" === e.destinationType && e.channelConfig
              ? (e2(e.channelConfig.botId || ""),
                e7(e.channelConfig.chatId || ""),
                ss(e.channelConfig.chatType || ""),
                sa(e.channelConfig.poolSize || 50),
                e.channelConfig.botId && tb(e.channelConfig.botId),
                sr(e._id))
              : (e2(""), e4(null), e7(""), ss(""), sa(50), sr(null)),
            e.customDomainId
              ? sP(e.customDomainId)
              : e.fullUrl?.includes("phantoms.group")
                ? sP("phantoms")
                : sP("default"));
          let s =
            e.flows
              ?.map((e) =>
                "object" == typeof e.flowId && e.flowId?._id
                  ? e.flowId._id
                  : e.flowId,
              )
              .filter(Boolean) || [];
          if (
            (eO(s),
            e.utmTemplate
              ? so({
                  enabled: e.utmTemplate.enabled ?? !1,
                  source: e.utmTemplate.source || K.source,
                  medium: e.utmTemplate.medium || K.medium,
                  campaign: e.utmTemplate.campaign || K.campaign,
                  content: e.utmTemplate.content || K.content,
                  term: e.utmTemplate.term || K.term,
                  id: e.utmTemplate.id || K.id,
                })
              : so({
                  ...K,
                }),
            "codigos-venda" === eg && s.length > 0)
          ) {
            let e = s[0],
              t = eS.find(
                (s) =>
                  "link" === s.type &&
                  s.flows?.some(
                    (s) =>
                      ("object" == typeof s.flowId && s.flowId?._id
                        ? s.flowId._id
                        : s.flowId) === e,
                  ),
              );
            t && eW(t._id);
          } else eW("");
        },
        tv = async () => {
          if (!eR.trim())
            return void eb({
              type: "error",
              title:
                "codigos-venda" === eg
                  ? "Digite o nome do código"
                  : "Digite ou gere um slug",
            });
          if ("redirecionadores" === eg && "url" === eJ && !eY.trim())
            return void eb({
              type: "error",
              title: "Digite a URL da landing page",
            });
          if ("redirecionadores" === eg && "channel" === eJ) {
            if (!e1)
              return void eb({
                type: "error",
                title: "Selecione um bot",
              });
            if (!e8)
              return void eb({
                type: "error",
                title: "Selecione um canal ou grupo",
              });
          }
          eK(!0);
          try {
            let e = eX ? "PUT" : "POST",
              s = eX ? `/api/links/${eX}` : "/api/links",
              t = "codigos-venda" === eg,
              a = "";
            if (t) {
              if (eX) {
                let e = eI.find((e) => e._id === eX);
                a = e?.slug || "";
              }
            } else a = eR.toLowerCase().replace(/[^a-z0-9-]/g, "");
            let r = {
              name: eR,
              slug: a,
              slugType: t ? "random" : eL,
              type: t ? "sales_code" : "link",
              mode: eV,
              isActive: eB,
              flows:
                "url" === eJ
                  ? []
                  : eG.map((e) => ({
                      flowId: e,
                      weight: 1,
                    })),
            };
            t ||
              ((r.destinationType = eJ),
              (r.destinationUrl = "url" === eJ ? eY : ""),
              "channel" === eJ &&
                (r.channelConfig = {
                  botId: e1,
                  chatId: e8,
                  chatType: se || "channel",
                }),
              (r.cloakerV2 = {
                enabled: sb,
                blockMethod: sg,
                blockAdBots: sf,
                antiSharing: sv,
                safeUrl: "redirect" === sg || "mirror" === sg ? sk.trim() : "",
              }),
              (r.utmTemplate = {
                enabled: sn.enabled,
                source: sn.source.trim(),
                medium: sn.medium.trim(),
                campaign: sn.campaign.trim(),
                content: sn.content.trim(),
                term: sn.term.trim(),
                id: sn.id.trim(),
              }),
              (r.customDomainId = sV));
            let i = await fetch(s, {
                method: e,
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(r),
              }),
              n = await i.json();
            i.ok && n.success
              ? (eb({
                  type: "success",
                  title: eX ? "Atualizado!" : "Criado!",
                }),
                eE(!1),
                tg(),
                ev(),
                (0, l.invalidateGroup)("links"))
              : eb({
                  type: "error",
                  title: n.error || "Erro ao salvar",
                });
          } catch {
            eb({
              type: "error",
              title: "Erro ao salvar",
            });
          } finally {
            eK(!1);
          }
        },
        tw = async () => {
          if (sx) {
            sp(!0);
            try {
              (
                await fetch(`/api/links/${sx.id}`, {
                  method: "DELETE",
                  credentials: "include",
                })
              ).ok
                ? (ev(),
                  (0, l.invalidateGroup)("links"),
                  eb({
                    type: "success",
                    title: "Excluído!",
                  }))
                : eb({
                    type: "error",
                    title: "Erro ao excluir",
                  });
            } catch {
              eb({
                type: "error",
                title: "Erro ao excluir",
              });
            } finally {
              (sp(!1), sc(!1), sm(null));
            }
          }
        },
        tk = async (e) => {
          try {
            (await navigator.clipboard.writeText(e),
              eb({
                type: "success",
                title: "Copiado!",
              }));
          } catch {
            eb({
              type: "error",
              title: "Erro ao copiar",
            });
          }
        },
        ty = () => {
          if (!sq) return "";
          let e = eS.find((e) => e._id === sq);
          if (!e) return "";
          let s = [];
          if (
            (sX && s.push(`utm_source=${sX}`),
            sJ && s.push(`utm_campaign=${sJ}`),
            sY && s.push(`utm_medium=${sY}`),
            s1 && s.push(`utm_content=${s1}`),
            s5 && s.push(`utm_term=${s5}`),
            s3 && s.push(`utm_id=${s3}`),
            s6 && s.push(`cv=${s6}`),
            e.cloakerV2?.enabled)
          )
            if (s7)
              if (s7.includes("=")) s.push(s7);
              else {
                let t = e.shk ? "shk" : "ph";
                s.push(`${t}=${s7}`);
              }
            else e.shk ? s.push(`shk=${e.shk}`) : e.ph && s.push(`ph=${e.ph}`);
          return s.join("&");
        };
      (0, t.useEffect)(() => {
        tl.current && sq && tt(ty());
      }, [sX, sJ, sY, s1, s5, s3, s6, s7, sq, eS]);
      let tC = (e) =>
        e.flows?.map((e) => {
          if ("object" == typeof e.flowId && e.flowId?.name)
            return e.flowId.name;
          let s = eF.find((s) => s._id === e.flowId);
          return s?.name || "Fluxo removido";
        }) || [];
      if (eN) return null;
      let tS = eI.reduce((e, s) => e + (s.stats?.totalClicks || 0), 0);
      eI.filter((e) => e.isActive).length;
      let tF = eI.filter(
        (e) => e.cloaking?.enabled || e.cloakerV2?.enabled,
      ).length;
      return (0, s.jsxs)("div", {
        className: "pb-10",
        children: [
          (0, s.jsxs)("div", {
            className:
              "flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4",
            children: [
              (0, s.jsxs)("div", {
                children: [
                  (0, s.jsx)("h1", {
                    className:
                      "text-3xl lg:text-4xl font-bold text-white font-display tracking-tight",
                    children: "Redirecionadores",
                  }),
                  (0, s.jsx)("p", {
                    className:
                      "text-slate-400 text-sm mt-1 font-light tracking-wide border-l-2 border-[#00D9FF] pl-3",
                    children: "Configure seus links de redirecionamento",
                  }),
                ],
              }),
              ("redirecionadores" === eg || "codigos-venda" === eg) &&
                (0, s.jsxs)("button", {
                  onClick: () => {
                    (tg(), eE(!0));
                  },
                  className:
                    "relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all cursor-pointer",
                  style: H.enterBtnStyle,
                  children: [
                    (0, s.jsx)("span", {
                      className:
                        "absolute inset-0 rounded-xl border border-[rgba(28,28,28,0.2)]",
                    }),
                    (0, s.jsxs)("span", {
                      className: "relative z-10 flex items-center gap-2",
                      children: [
                        (0, s.jsx)(N.Plus, {
                          size: 16,
                        }),
                        "codigos-venda" === eg ? "Criar Codigo" : "Criar Link",
                      ],
                    }),
                  ],
                }),
            ],
          }),
          "redirecionadores" === eg &&
            (0, s.jsxs)("div", {
              className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6",
              children: [
                (0, s.jsx)(W.GlowCard, {
                  className: "!p-0",
                  noPadding: !0,
                  children: (0, s.jsxs)("div", {
                    className: "flex items-center gap-3 p-4",
                    children: [
                      (0, s.jsx)("div", {
                        className:
                          "w-10 h-10 rounded-lg bg-white/[0.02] flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform",
                        children: (0, s.jsx)(d.Link2, {
                          size: 18,
                          className: "text-[#00D9FF]",
                        }),
                      }),
                      (0, s.jsxs)("div", {
                        children: [
                          (0, s.jsx)("p", {
                            className:
                              "text-[9px] font-bold text-slate-500 uppercase tracking-widest",
                            children: "Total Links",
                          }),
                          (0, s.jsx)("h3", {
                            className:
                              "text-xl font-bold text-white group-hover:text-[#00D9FF] transition-colors",
                            children: eI.length,
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                (0, s.jsx)(W.GlowCard, {
                  className: "!p-0",
                  noPadding: !0,
                  children: (0, s.jsxs)("div", {
                    className: "flex items-center gap-3 p-4",
                    children: [
                      (0, s.jsx)("div", {
                        className:
                          "w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform",
                        children: (0, s.jsx)(v.MousePointerClick, {
                          size: 18,
                          className: "text-emerald-400",
                        }),
                      }),
                      (0, s.jsxs)("div", {
                        children: [
                          (0, s.jsx)("p", {
                            className:
                              "text-[9px] font-bold text-slate-500 uppercase tracking-widest",
                            children: "Total Cliques",
                          }),
                          (0, s.jsx)("h3", {
                            className:
                              "text-xl font-bold text-white group-hover:text-[#00D9FF] transition-colors",
                            children: tS.toLocaleString("pt-BR"),
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                (0, s.jsx)(W.GlowCard, {
                  className: "!p-0",
                  noPadding: !0,
                  children: (0, s.jsxs)("div", {
                    className: "flex items-center gap-3 p-4",
                    children: [
                      (0, s.jsx)("div", {
                        className:
                          "w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform",
                        children: (0, s.jsx)(k.Zap, {
                          size: 18,
                          className: "text-amber-400",
                        }),
                      }),
                      (0, s.jsxs)("div", {
                        children: [
                          (0, s.jsx)("p", {
                            className:
                              "text-[9px] font-bold text-slate-500 uppercase tracking-widest",
                            children: "Com Cloaker",
                          }),
                          (0, s.jsx)("h3", {
                            className:
                              "text-xl font-bold text-white group-hover:text-[#00D9FF] transition-colors",
                            children: tF,
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
          (0, s.jsxs)("div", {
            className: "flex gap-1 mb-6",
            children: [
              (0, s.jsxs)("button", {
                onClick: () => ej("redirecionadores"),
                className: (0, O.cn)(
                  "relative px-4 py-2 rounded-[8px] text-xs font-bold transition-all cursor-pointer",
                  "redirecionadores" === eg
                    ? "text-white"
                    : "bg-black/30 border border-white/10 backdrop-blur-sm text-slate-400 hover:text-white hover:bg-white/[0.04]",
                ),
                style: "redirecionadores" === eg ? H.enterBtnStyle : void 0,
                children: [
                  "redirecionadores" === eg &&
                    (0, s.jsx)("span", {
                      className:
                        "absolute inset-0 rounded-[8px] border border-[rgba(28,28,28,0.2)]",
                    }),
                  (0, s.jsx)("span", {
                    className: "relative z-10",
                    children: "Links",
                  }),
                ],
              }),
              (0, s.jsxs)("button", {
                onClick: () => ej("codigos-venda"),
                className: (0, O.cn)(
                  "relative px-4 py-2 rounded-[8px] text-xs font-bold transition-all cursor-pointer",
                  "codigos-venda" === eg
                    ? "text-white"
                    : "bg-black/30 border border-white/10 backdrop-blur-sm text-slate-400 hover:text-white hover:bg-white/[0.04]",
                ),
                style: "codigos-venda" === eg ? H.enterBtnStyle : void 0,
                children: [
                  "codigos-venda" === eg &&
                    (0, s.jsx)("span", {
                      className:
                        "absolute inset-0 rounded-[8px] border border-[rgba(28,28,28,0.2)]",
                    }),
                  (0, s.jsx)("span", {
                    className: "relative z-10",
                    children: "Códigos de Vendas",
                  }),
                ],
              }),
              (0, s.jsxs)("button", {
                onClick: () => ej("utm"),
                className: (0, O.cn)(
                  "relative px-4 py-2 rounded-[8px] text-xs font-bold transition-all cursor-pointer",
                  "utm" === eg
                    ? "text-white"
                    : "bg-black/30 border border-white/10 backdrop-blur-sm text-slate-400 hover:text-white hover:bg-white/[0.04]",
                ),
                style: "utm" === eg ? H.enterBtnStyle : void 0,
                children: [
                  "utm" === eg &&
                    (0, s.jsx)("span", {
                      className:
                        "absolute inset-0 rounded-[8px] border border-[rgba(28,28,28,0.2)]",
                    }),
                  (0, s.jsx)("span", {
                    className: "relative z-10",
                    children: "Gerador UTM",
                  }),
                ],
              }),
              (0, s.jsxs)("button", {
                onClick: () => ej("dominio-proprio"),
                className: (0, O.cn)(
                  "relative px-4 py-2 rounded-[8px] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5",
                  "dominio-proprio" === eg
                    ? "text-white"
                    : "bg-black/30 border border-white/10 backdrop-blur-sm text-slate-400 hover:text-white hover:bg-white/[0.04]",
                ),
                style: "dominio-proprio" === eg ? H.enterBtnStyle : void 0,
                children: [
                  "dominio-proprio" === eg &&
                    (0, s.jsx)("span", {
                      className:
                        "absolute inset-0 rounded-[8px] border border-[rgba(28,28,28,0.2)]",
                    }),
                  (0, s.jsxs)("span", {
                    className: "relative z-10 flex items-center gap-1.5",
                    children: [
                      (0, s.jsx)(E.Globe, {
                        size: 14,
                      }),
                      "Domínio Próprio",
                    ],
                  }),
                ],
              }),
            ],
          }),
          "redirecionadores" === eg &&
            (0, s.jsx)(s.Fragment, {
              children: (0, s.jsxs)(W.GlowCard, {
                className: "overflow-hidden",
                noPadding: !0,
                children: [
                  (0, s.jsxs)("div", {
                    className:
                      "px-5 py-4 border-b border-white/5 flex items-center justify-between",
                    children: [
                      (0, s.jsxs)("div", {
                        className: "flex items-center gap-3",
                        children: [
                          (0, s.jsx)("div", {
                            className:
                              "w-8 h-8 rounded-lg bg-white/[0.02] flex items-center justify-center border border-white/10",
                            children: (0, s.jsx)(d.Link2, {
                              size: 16,
                              className: "text-[#00D9FF]",
                            }),
                          }),
                          (0, s.jsx)("h2", {
                            className: "text-base font-bold text-white",
                            children: "Meus Redirecionadores",
                          }),
                        ],
                      }),
                      (0, s.jsxs)("span", {
                        className: "text-xs text-slate-500",
                        children: ["(", eI.length, ")"],
                      }),
                    ],
                  }),
                  (0, s.jsx)("div", {
                    className: "p-5",
                    children:
                      0 === eI.length
                        ? (0, s.jsxs)("div", {
                            className: "text-center py-16",
                            children: [
                              (0, s.jsx)("div", {
                                className:
                                  "w-16 h-16 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-center mx-auto mb-4",
                                children: (0, s.jsx)(d.Link2, {
                                  size: 28,
                                  className: "text-slate-600",
                                }),
                              }),
                              (0, s.jsx)("p", {
                                className: "text-sm text-slate-400 font-medium",
                                children: "Nenhum redirecionador criado",
                              }),
                              (0, s.jsx)("p", {
                                className: "text-xs text-slate-600 mt-1 mb-4",
                                children:
                                  "Crie seu primeiro link para comecar a rastrear cliques",
                              }),
                              (0, s.jsxs)("button", {
                                onClick: () => {
                                  (tg(), eE(!0));
                                },
                                className:
                                  "relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all cursor-pointer",
                                style: H.enterBtnStyle,
                                children: [
                                  (0, s.jsx)("span", {
                                    className:
                                      "absolute inset-0 rounded-xl border border-[rgba(28,28,28,0.2)]",
                                  }),
                                  (0, s.jsxs)("span", {
                                    className:
                                      "relative z-10 flex items-center gap-2",
                                    children: [
                                      (0, s.jsx)(N.Plus, {
                                        size: 16,
                                      }),
                                      "Criar Primeiro Link",
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          })
                        : (0, s.jsx)("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                            children: eI.map((e) => {
                              let t = tC(e);
                              return (0, s.jsxs)(
                                "div",
                                {
                                  className:
                                    "p-4 rounded-xl bg-black/30 border border-white/10 backdrop-blur-sm hover:border-[#00D9FF]/20 transition-all group",
                                  children: [
                                    (0, s.jsxs)("div", {
                                      className: "flex items-center gap-3 mb-3",
                                      children: [
                                        (0, s.jsx)("div", {
                                          className:
                                            "w-10 h-10 rounded-xl bg-white/[0.02] flex items-center justify-center border border-white/10 flex-shrink-0",
                                          children: (0, s.jsx)(d.Link2, {
                                            size: 18,
                                            className: "text-[#00D9FF]",
                                          }),
                                        }),
                                        (0, s.jsxs)("div", {
                                          className: "flex-1 min-w-0",
                                          children: [
                                            (0, s.jsxs)("div", {
                                              className:
                                                "flex items-center gap-2 flex-wrap",
                                              children: [
                                                (0, s.jsx)("span", {
                                                  className:
                                                    "text-sm font-bold text-white truncate",
                                                  children: e.fullUrl,
                                                }),
                                                "url" === e.destinationType &&
                                                  (0, s.jsxs)("span", {
                                                    className:
                                                      "px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center gap-1",
                                                    children: [
                                                      (0, s.jsx)(E.Globe, {
                                                        size: 10,
                                                      }),
                                                      "Landing Page",
                                                    ],
                                                  }),
                                                "channel" ===
                                                  e.destinationType &&
                                                  (0, s.jsxs)("span", {
                                                    className:
                                                      "px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center gap-1",
                                                    children: [
                                                      (0, s.jsx)(G.Hash, {
                                                        size: 10,
                                                      }),
                                                      "Canal",
                                                    ],
                                                  }),
                                                e.cloakerV2?.enabled &&
                                                  (0, s.jsxs)("span", {
                                                    className:
                                                      "px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1",
                                                    children: [
                                                      (0, s.jsx)(y.Shield, {
                                                        size: 10,
                                                      }),
                                                      "V2",
                                                    ],
                                                  }),
                                              ],
                                            }),
                                            (e.shk || e.ph) &&
                                              (0, s.jsxs)("div", {
                                                className:
                                                  "flex items-center gap-1 mt-0.5",
                                                children: [
                                                  (0, s.jsx)("span", {
                                                    className:
                                                      "text-[10px] text-amber-400 font-mono",
                                                    children: e.shk
                                                      ? `shk=${e.shk}`
                                                      : `ph=${e.ph}`,
                                                  }),
                                                  (0, s.jsx)("button", {
                                                    onClick: async (s) => {
                                                      s.stopPropagation();
                                                      let t = e.shk
                                                          ? "shk"
                                                          : "ph",
                                                        a = e.shk || e.ph || "",
                                                        l = e.fullUrl.includes(
                                                          "?",
                                                        )
                                                          ? "&"
                                                          : "?",
                                                        r = `${e.fullUrl}${l}${t}=${a}`;
                                                      (await navigator.clipboard.writeText(
                                                        r,
                                                      ),
                                                        eb({
                                                          type: "success",
                                                          title: "URL copiada!",
                                                        }));
                                                    },
                                                    className:
                                                      "p-0.5 rounded text-slate-400/60 hover:text-slate-300 hover:bg-slate-400/10 transition-all cursor-pointer",
                                                    title:
                                                      "Copiar URL completa com SHK",
                                                    children: (0, s.jsx)(
                                                      c.Copy,
                                                      {
                                                        size: 10,
                                                      },
                                                    ),
                                                  }),
                                                ],
                                              }),
                                          ],
                                        }),
                                        (0, s.jsxs)("div", {
                                          className:
                                            "flex gap-1.5 flex-shrink-0",
                                          children: [
                                            (0, s.jsx)("button", {
                                              onClick: () => tk(e.fullUrl),
                                              className:
                                                "p-2 rounded-lg bg-slate-800/60 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all cursor-pointer",
                                              title: "Copiar link",
                                              children: (0, s.jsx)(c.Copy, {
                                                size: 14,
                                              }),
                                            }),
                                            (0, s.jsx)("button", {
                                              onClick: () =>
                                                window.open(
                                                  e.fullUrl,
                                                  "_blank",
                                                ),
                                              className:
                                                "p-2 rounded-lg bg-slate-800/60 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all cursor-pointer",
                                              title: "Abrir link",
                                              children: (0, s.jsx)(
                                                x.ExternalLink,
                                                {
                                                  size: 14,
                                                },
                                              ),
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, s.jsxs)("div", {
                                      className:
                                        "flex items-center gap-2 flex-wrap mb-3",
                                      children: [
                                        (0, s.jsx)("span", {
                                          className: (0, O.cn)(
                                            "px-2 py-0.5 rounded text-[10px] font-bold",
                                            "random" === e.mode
                                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                              : "bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/20",
                                          ),
                                          children:
                                            "random" === e.mode
                                              ? "Aleatorio"
                                              : "Sequencial",
                                        }),
                                        (0, s.jsx)("span", {
                                          className: (0, O.cn)(
                                            "px-2 py-0.5 rounded text-[10px] font-bold",
                                            e.isActive
                                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                              : "bg-red-500/10 text-red-400 border border-red-500/20",
                                          ),
                                          children: e.isActive
                                            ? "Ativo"
                                            : "Inativo",
                                        }),
                                        (0, s.jsxs)("span", {
                                          className:
                                            "text-[10px] text-slate-500 ml-auto",
                                          children: [
                                            (0, s.jsx)(v.MousePointerClick, {
                                              size: 12,
                                              className: "inline mr-1",
                                            }),
                                            e.stats?.totalClicks || 0,
                                            " cliques",
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, s.jsx)("div", {
                                      className: "flex flex-wrap gap-1.5 mb-3",
                                      children: t.map((e, t) =>
                                        (0, s.jsxs)(
                                          "span",
                                          {
                                            className:
                                              "inline-flex items-center gap-1 px-2 py-0.5 bg-slate-800/60 text-slate-400 text-[10px] rounded border border-white/5",
                                            children: [
                                              (0, s.jsx)(p.Workflow, {
                                                size: 10,
                                              }),
                                              e,
                                            ],
                                          },
                                          t,
                                        ),
                                      ),
                                    }),
                                    e.cloakerV2?.enabled &&
                                      e.cloakerV2?.stats &&
                                      (0, s.jsxs)("div", {
                                        className:
                                          "flex items-center gap-2 mb-3 px-2 py-1.5 bg-white/[0.02] rounded-lg border border-white/5",
                                        children: [
                                          (0, s.jsx)(C.ShieldAlert, {
                                            size: 11,
                                            className:
                                              "text-red-400 flex-shrink-0",
                                          }),
                                          (0, s.jsx)("span", {
                                            className:
                                              "text-[10px] text-red-400 font-bold",
                                            children:
                                              e.cloakerV2.stats.totalBlocked ||
                                              0,
                                          }),
                                          (0, s.jsx)("div", {
                                            className: "w-px h-3 bg-white/10",
                                          }),
                                          (0, s.jsx)(g.Check, {
                                            size: 11,
                                            className:
                                              "text-emerald-400 flex-shrink-0",
                                          }),
                                          (0, s.jsx)("span", {
                                            className:
                                              "text-[10px] text-emerald-400 font-bold",
                                            children:
                                              e.cloakerV2.stats.totalAllowed ||
                                              0,
                                          }),
                                        ],
                                      }),
                                    (0, s.jsxs)("div", {
                                      className:
                                        "flex items-center gap-1.5 pt-2 border-t border-white/5",
                                      children: [
                                        (0, s.jsxs)("button", {
                                          onClick: () => tN(e),
                                          className:
                                            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-white/10 text-[11px] font-bold text-slate-400 hover:text-white hover:border-white/20 transition-all cursor-pointer",
                                          children: [
                                            (0, s.jsx)(m.Pencil, {
                                              size: 12,
                                            }),
                                            "Editar",
                                          ],
                                        }),
                                        (0, s.jsx)("button", {
                                          onClick: () => {
                                            (sm({
                                              id: e._id,
                                              name: e.name,
                                            }),
                                              sc(!0));
                                          },
                                          className:
                                            "p-1.5 rounded-lg bg-slate-800/60 border border-white/10 text-slate-500 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 transition-all cursor-pointer",
                                          title: "Excluir",
                                          children: (0, s.jsx)(h.Trash2, {
                                            size: 14,
                                          }),
                                        }),
                                        e.cloakerV2?.enabled &&
                                          (0, s.jsxs)(s.Fragment, {
                                            children: [
                                              (0, s.jsx)("button", {
                                                onClick: () => {
                                                  (sM(e), sU(!0));
                                                },
                                                className:
                                                  "p-1.5 rounded-lg bg-slate-800/60 border border-white/10 text-slate-500 hover:text-purple-400 hover:border-purple-500/30 hover:bg-purple-500/10 transition-all cursor-pointer",
                                                title: "Camuflagem",
                                                children: (0, s.jsx)(B.Eye, {
                                                  size: 14,
                                                }),
                                              }),
                                              (0, s.jsx)("button", {
                                                onClick: () => {
                                                  (sz(e), sD(!0));
                                                },
                                                className:
                                                  "p-1.5 rounded-lg bg-slate-800/60 border border-white/10 text-slate-500 hover:text-[#00D9FF] hover:border-[#00D9FF]/30 hover:bg-[#00D9FF]/10 transition-all cursor-pointer",
                                                title: "Estatísticas",
                                                children: (0, s.jsx)(
                                                  S.BarChart3,
                                                  {
                                                    size: 14,
                                                  },
                                                ),
                                              }),
                                            ],
                                          }),
                                      ],
                                    }),
                                  ],
                                },
                                e._id,
                              );
                            }),
                          }),
                  }),
                ],
              }),
            }),
          (0, s.jsx)(o.Dialog, {
            open: eA,
            onOpenChange: (e) => {
              (eE(e), e || tg());
            },
            children: (0, s.jsxs)(o.DialogContent, {
              className: "max-w-2xl max-h-[90vh] flex flex-col p-0 gap-0",
              children: [
                (0, s.jsx)(o.DialogHeader, {
                  className:
                    "px-6 pt-6 pb-4 border-b border-white/5 flex-shrink-0",
                  children: (0, s.jsxs)("div", {
                    className: "flex items-center gap-3",
                    children: [
                      (0, s.jsx)("div", {
                        className:
                          "w-8 h-8 rounded-lg bg-[#00D9FF]/10 flex items-center justify-center border border-[#00D9FF]/20",
                        children:
                          "codigos-venda" === eg
                            ? (0, s.jsx)(D.Tag, {
                                size: 16,
                                className: "text-[#00D9FF]",
                              })
                            : 1 !== sB || eX
                              ? (0, s.jsx)(N.Plus, {
                                  size: 16,
                                  className: "text-[#00D9FF]",
                                })
                              : (0, s.jsx)(E.Globe, {
                                  size: 16,
                                  className: "text-[#00D9FF]",
                                }),
                      }),
                      (0, s.jsxs)("div", {
                        children: [
                          (0, s.jsx)(o.DialogTitle, {
                            children:
                              "codigos-venda" === eg
                                ? eX
                                  ? "Editar Codigo de Vendas"
                                  : "Criar Codigo de Vendas"
                                : 1 !== sB || eX
                                  ? eX
                                    ? "Editar Redirecionador"
                                    : "Criar Redirecionador"
                                  : "Escolha o Dominio",
                          }),
                          (0, s.jsx)(o.DialogDescription, {
                            children:
                              "codigos-venda" === eg
                                ? "Codigos para rastrear vendas por afiliado"
                                : 1 !== sB || eX
                                  ? "Configure seu link de redirecionamento"
                                  : "Selecione o dominio que aparecera na URL do link",
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                (0, s.jsxs)("div", {
                  className: "flex-1 overflow-y-auto px-6 py-5",
                  children: [
                    "redirecionadores" === eg &&
                      1 === sB &&
                      !eX &&
                      (0, s.jsx)("div", {
                        className: "space-y-4",
                        children: (0, s.jsxs)("div", {
                          className: "grid grid-cols-1 gap-3",
                          children: [
                            (0, s.jsxs)("button", {
                              type: "button",
                              onClick: () => {
                                (sP("default"), s$(2));
                              },
                              className: (0, O.cn)(
                                "relative p-4 rounded-xl border transition-all cursor-pointer text-left flex items-center gap-4",
                                "default" === sV
                                  ? "bg-[#00D9FF]/10 border-[#00D9FF]/50"
                                  : "bg-black/20 border-white/10 hover:border-white/20",
                              ),
                              children: [
                                (0, s.jsx)("div", {
                                  className:
                                    "w-10 h-10 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center flex-shrink-0",
                                  children: (0, s.jsx)(E.Globe, {
                                    size: 18,
                                    className: "text-slate-400",
                                  }),
                                }),
                                (0, s.jsxs)("div", {
                                  className: "flex-1 min-w-0",
                                  children: [
                                    (0, s.jsx)("p", {
                                      className: "text-sm font-bold text-white",
                                      children: "sharkbot.com.br",
                                    }),
                                    (0, s.jsx)("p", {
                                      className: "text-[11px] text-slate-500",
                                      children: "Dominio padrao da plataforma",
                                    }),
                                  ],
                                }),
                                (0, s.jsx)(M.ArrowUpRight, {
                                  size: 16,
                                  className: "text-slate-600 flex-shrink-0",
                                }),
                              ],
                            }),
                            (0, s.jsxs)("button", {
                              type: "button",
                              onClick: () => {
                                (sP("phantoms"), s$(2));
                              },
                              className: (0, O.cn)(
                                "relative p-4 rounded-xl border transition-all cursor-pointer text-left flex items-center gap-4",
                                "phantoms" === sV
                                  ? "bg-[#00D9FF]/10 border-[#00D9FF]/50"
                                  : "bg-black/20 border-white/10 hover:border-white/20",
                              ),
                              children: [
                                (0, s.jsx)("div", {
                                  className:
                                    "w-10 h-10 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center flex-shrink-0",
                                  children: (0, s.jsx)(E.Globe, {
                                    size: 18,
                                    className: "text-slate-400",
                                  }),
                                }),
                                (0, s.jsxs)("div", {
                                  className: "flex-1 min-w-0",
                                  children: [
                                    (0, s.jsx)("p", {
                                      className: "text-sm font-bold text-white",
                                      children: "phantoms.group",
                                    }),
                                    (0, s.jsx)("p", {
                                      className: "text-[11px] text-slate-500",
                                      children: "Dominio alternativo",
                                    }),
                                  ],
                                }),
                                (0, s.jsx)(M.ArrowUpRight, {
                                  size: 16,
                                  className: "text-slate-600 flex-shrink-0",
                                }),
                              ],
                            }),
                            eD
                              .filter((e) => "active" === e.status)
                              .map((e) =>
                                (0, s.jsxs)(
                                  "button",
                                  {
                                    type: "button",
                                    onClick: () => {
                                      (sP(e._id), s$(2));
                                    },
                                    className: (0, O.cn)(
                                      "relative p-4 rounded-xl border transition-all cursor-pointer text-left flex items-center gap-4",
                                      sV === e._id
                                        ? "bg-[#00D9FF]/10 border-[#00D9FF]/50"
                                        : "bg-black/20 border-white/10 hover:border-white/20",
                                    ),
                                    children: [
                                      (0, s.jsx)("div", {
                                        className:
                                          "w-10 h-10 rounded-lg bg-[#00D9FF]/10 border border-[#00D9FF]/20 flex items-center justify-center flex-shrink-0",
                                        children: (0, s.jsx)(E.Globe, {
                                          size: 18,
                                          className: "text-[#00D9FF]",
                                        }),
                                      }),
                                      (0, s.jsxs)("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                          (0, s.jsx)("p", {
                                            className:
                                              "text-sm font-bold text-white",
                                            children: e.domain,
                                          }),
                                          (0, s.jsxs)("p", {
                                            className:
                                              "text-[11px] text-emerald-400 flex items-center gap-1",
                                            children: [
                                              (0, s.jsx)(L.CheckCircle, {
                                                size: 10,
                                              }),
                                              " ",
                                              e.isGlobal
                                                ? "Dominio compartilhado"
                                                : "Dominio personalizado",
                                            ],
                                          }),
                                        ],
                                      }),
                                      (0, s.jsx)(M.ArrowUpRight, {
                                        size: 16,
                                        className:
                                          "text-slate-600 flex-shrink-0",
                                      }),
                                    ],
                                  },
                                  e._id,
                                ),
                              ),
                          ],
                        }),
                      }),
                    "redirecionadores" === eg &&
                      (2 === sB || eX) &&
                      (0, s.jsxs)("div", {
                        className: "space-y-5",
                        children: [
                          (0, s.jsxs)("div", {
                            children: [
                              (0, s.jsx)("label", {
                                className:
                                  "text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 block",
                                children: "Tipo de Slug",
                              }),
                              (0, s.jsxs)("div", {
                                className: "flex gap-2",
                                children: [
                                  (0, s.jsxs)("button", {
                                    onClick: () => eU("random"),
                                    className: (0, O.cn)(
                                      "relative flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border text-xs font-bold transition-all cursor-pointer",
                                      "random" === eL
                                        ? "border-transparent text-white"
                                        : "border-white/10 bg-black/30 backdrop-blur-sm text-slate-400 hover:text-white hover:bg-white/[0.04] hover:border-white/20",
                                    ),
                                    style:
                                      "random" === eL
                                        ? H.enterBtnStyle
                                        : void 0,
                                    children: [
                                      "random" === eL &&
                                        (0, s.jsx)("span", {
                                          className:
                                            "absolute inset-0 rounded-lg border border-[rgba(28,28,28,0.2)]",
                                        }),
                                      (0, s.jsxs)("span", {
                                        className:
                                          "relative z-10 flex items-center gap-2",
                                        children: [
                                          (0, s.jsx)(j.Shuffle, {
                                            size: 14,
                                          }),
                                          "Aleatório",
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, s.jsxs)("button", {
                                    onClick: () => eU("custom"),
                                    className: (0, O.cn)(
                                      "relative flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border text-xs font-bold transition-all cursor-pointer",
                                      "custom" === eL
                                        ? "border-transparent text-white"
                                        : "border-white/10 bg-black/30 backdrop-blur-sm text-slate-400 hover:text-white hover:bg-white/[0.04] hover:border-white/20",
                                    ),
                                    style:
                                      "custom" === eL
                                        ? H.enterBtnStyle
                                        : void 0,
                                    children: [
                                      "custom" === eL &&
                                        (0, s.jsx)("span", {
                                          className:
                                            "absolute inset-0 rounded-lg border border-[rgba(28,28,28,0.2)]",
                                        }),
                                      (0, s.jsxs)("span", {
                                        className:
                                          "relative z-10 flex items-center gap-2",
                                        children: [
                                          (0, s.jsx)(m.Pencil, {
                                            size: 14,
                                          }),
                                          "Personalizado",
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, s.jsxs)("div", {
                            className: "grid grid-cols-2 gap-4",
                            children: [
                              (0, s.jsxs)("div", {
                                children: [
                                  (0, s.jsx)("label", {
                                    className:
                                      "text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block",
                                    children: "Slug",
                                  }),
                                  (0, s.jsxs)("div", {
                                    className: "flex gap-2",
                                    children: [
                                      (0, s.jsx)(r.Input, {
                                        value: eR,
                                        onChange: (e) => eM(e.target.value),
                                        placeholder:
                                          "random" === eL
                                            ? "Gerado"
                                            : "Digite...",
                                        disabled: "random" === eL,
                                        className:
                                          "bg-black/30 border-white/10 text-white text-sm h-10 disabled:opacity-70",
                                      }),
                                      "random" === eL &&
                                        (0, s.jsx)("button", {
                                          onClick: () => eM(X()),
                                          className:
                                            "p-2.5 rounded-lg bg-black/30 border border-white/10 backdrop-blur-sm text-slate-400 hover:text-[#00D9FF] hover:border-[#00D9FF]/30 transition-all cursor-pointer",
                                          children: (0, s.jsx)(f.RefreshCw, {
                                            size: 16,
                                          }),
                                        }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, s.jsxs)("div", {
                                children: [
                                  (0, s.jsx)("label", {
                                    className:
                                      "text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block",
                                    children: "Modo",
                                  }),
                                  (0, s.jsxs)(n.Select, {
                                    value: eV,
                                    onValueChange: eP,
                                    children: [
                                      (0, s.jsx)(n.SelectTrigger, {
                                        className:
                                          "bg-black/30 border-white/10 backdrop-blur-sm text-sm h-10",
                                        children: (0, s.jsx)(n.SelectValue, {}),
                                      }),
                                      (0, s.jsxs)(n.SelectContent, {
                                        className:
                                          "bg-black/30 backdrop-blur-xl border-white/10",
                                        children: [
                                          (0, s.jsx)(n.SelectItem, {
                                            value: "random",
                                            children: "Aleatório",
                                          }),
                                          (0, s.jsx)(n.SelectItem, {
                                            value: "sequential",
                                            children: "Sequencial",
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, s.jsxs)("div", {
                            className: "flex flex-wrap items-center gap-4",
                            children: [
                              (0, s.jsxs)("div", {
                                className: "flex items-center gap-2",
                                children: [
                                  (0, s.jsx)(q.Switch, {
                                    checked: eB,
                                    onCheckedChange: e$,
                                    size: "md",
                                  }),
                                  (0, s.jsx)("span", {
                                    className: "text-xs text-white font-medium",
                                    children: "Ativo",
                                  }),
                                ],
                              }),
                              (0, s.jsxs)("div", {
                                className: "flex items-center gap-2",
                                children: [
                                  (0, s.jsx)(q.Switch, {
                                    checked: sb,
                                    onCheckedChange: (e) => {
                                      e ? sS(!0) : (su(!1), sS(!1));
                                    },
                                    size: "md",
                                  }),
                                  (0, s.jsx)("span", {
                                    className: "text-xs text-white font-medium",
                                    children: "Cloaker",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          sC &&
                            !sb &&
                            (0, s.jsxs)("div", {
                              className:
                                "space-y-3 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl",
                              children: [
                                (0, s.jsxs)("div", {
                                  className: "flex items-center gap-2",
                                  children: [
                                    (0, s.jsx)(w.AlertTriangle, {
                                      size: 16,
                                      className: "text-amber-400",
                                    }),
                                    (0, s.jsx)("p", {
                                      className: "text-sm font-bold text-white",
                                      children: "Ativar Cloaker V2 + AntiClone",
                                    }),
                                  ],
                                }),
                                (0, s.jsxs)("div", {
                                  className: "space-y-2",
                                  children: [
                                    (0, s.jsx)("p", {
                                      className: "text-xs text-slate-400",
                                      children:
                                        "O cloaker requer configuracao adicional. Leia antes de ativar:",
                                    }),
                                    (0, s.jsxs)("ul", {
                                      className:
                                        "text-[11px] text-amber-300/80 space-y-1 ml-4 list-disc",
                                      children: [
                                        (0, s.jsxs)("li", {
                                          children: [
                                            "O parametro ",
                                            (0, s.jsx)("strong", {
                                              className: "text-amber-300",
                                              children: "shk",
                                            }),
                                            " deve estar em todos os links de trafego pago",
                                          ],
                                        }),
                                        (0, s.jsxs)("li", {
                                          children: [
                                            "Sem o parametro, o cloaker vai ",
                                            (0, s.jsx)("strong", {
                                              className: "text-amber-300",
                                              children: "bloquear o acesso",
                                            }),
                                            " dos visitantes",
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, s.jsx)("p", {
                                      className:
                                        "text-[11px] text-[#00D9FF]/80",
                                      children:
                                        'Use a aba "Gerador UTM" para criar links com o parametro correto.',
                                    }),
                                  ],
                                }),
                                (0, s.jsxs)("div", {
                                  className: "flex gap-2",
                                  children: [
                                    (0, s.jsxs)("button", {
                                      type: "button",
                                      onClick: () => {
                                        (su(!0), sS(!1));
                                      },
                                      className:
                                        "flex-1 px-3 py-2 rounded-lg text-xs font-bold text-white bg-amber-500/20 border border-amber-500/30 hover:bg-amber-500/30 transition-all cursor-pointer flex items-center justify-center gap-1.5",
                                      children: [
                                        (0, s.jsx)(k.Zap, {
                                          size: 12,
                                        }),
                                        "Sim, ativar",
                                      ],
                                    }),
                                    (0, s.jsx)("button", {
                                      type: "button",
                                      onClick: () => sS(!1),
                                      className:
                                        "px-3 py-2 rounded-lg text-xs font-bold text-slate-400 border border-slate-700/50 hover:text-white hover:border-white/30 transition-all cursor-pointer",
                                      children: "Cancelar",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          sb &&
                            (0, s.jsxs)("div", {
                              className: "space-y-3",
                              children: [
                                (0, s.jsx)("div", {
                                  className:
                                    "p-3 bg-[#00D9FF]/10 border border-[#00D9FF]/20 rounded-lg",
                                  children: (0, s.jsxs)("p", {
                                    className: "text-[11px] text-[#00D9FF]",
                                    children: [
                                      (0, s.jsx)(F, {
                                        size: 12,
                                        className: "inline mr-1",
                                      }),
                                      (0, s.jsx)("strong", {
                                        children: "Cloaker ativo:",
                                      }),
                                      " Sistema avancado de deteccao com scoring de bots e crawlers.",
                                    ],
                                  }),
                                }),
                                (0, s.jsxs)("div", {
                                  children: [
                                    (0, s.jsx)("label", {
                                      className:
                                        "text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 block",
                                      children: "Metodo de Bloqueio",
                                    }),
                                    (0, s.jsxs)("div", {
                                      className: "grid grid-cols-3 gap-2",
                                      children: [
                                        (0, s.jsxs)("button", {
                                          type: "button",
                                          onClick: () => sj("safepage"),
                                          className: (0, O.cn)(
                                            "relative p-3 rounded-xl border transition-all cursor-pointer text-left",
                                            "safepage" === sg
                                              ? "bg-[#00D9FF]/10 border-[#00D9FF]/50 shadow-[0_0_15px_rgba(0,217,255,0.1)]"
                                              : "bg-black/20 border-white/10 hover:border-white/20",
                                          ),
                                          children: [
                                            (0, s.jsx)("div", {
                                              className: (0, O.cn)(
                                                "w-3 h-3 rounded-full border-2 mb-2 flex items-center justify-center",
                                                "safepage" === sg
                                                  ? "border-[#00D9FF]"
                                                  : "border-slate-600",
                                              ),
                                              children:
                                                "safepage" === sg &&
                                                (0, s.jsx)("div", {
                                                  className:
                                                    "w-1.5 h-1.5 rounded-full bg-[#00D9FF]",
                                                }),
                                            }),
                                            (0, s.jsx)(V.FileText, {
                                              size: 14,
                                              className: (0, O.cn)(
                                                "mb-1",
                                                "safepage" === sg
                                                  ? "text-[#00D9FF]"
                                                  : "text-slate-500",
                                              ),
                                            }),
                                            (0, s.jsx)("p", {
                                              className: (0, O.cn)(
                                                "text-xs font-bold",
                                                "safepage" === sg
                                                  ? "text-white"
                                                  : "text-slate-400",
                                              ),
                                              children: "Pagina Segura",
                                            }),
                                            (0, s.jsx)("p", {
                                              className:
                                                "text-[9px] text-slate-500 mt-0.5",
                                              children: "Exibe pagina inline",
                                            }),
                                          ],
                                        }),
                                        (0, s.jsxs)("button", {
                                          type: "button",
                                          onClick: () => sj("redirect"),
                                          className: (0, O.cn)(
                                            "relative p-3 rounded-xl border transition-all cursor-pointer text-left",
                                            "redirect" === sg
                                              ? "bg-[#00D9FF]/10 border-[#00D9FF]/50 shadow-[0_0_15px_rgba(0,217,255,0.1)]"
                                              : "bg-black/20 border-white/10 hover:border-white/20",
                                          ),
                                          children: [
                                            (0, s.jsx)("div", {
                                              className: (0, O.cn)(
                                                "w-3 h-3 rounded-full border-2 mb-2 flex items-center justify-center",
                                                "redirect" === sg
                                                  ? "border-[#00D9FF]"
                                                  : "border-slate-600",
                                              ),
                                              children:
                                                "redirect" === sg &&
                                                (0, s.jsx)("div", {
                                                  className:
                                                    "w-1.5 h-1.5 rounded-full bg-[#00D9FF]",
                                                }),
                                            }),
                                            (0, s.jsx)(M.ArrowUpRight, {
                                              size: 14,
                                              className: (0, O.cn)(
                                                "mb-1",
                                                "redirect" === sg
                                                  ? "text-[#00D9FF]"
                                                  : "text-slate-500",
                                              ),
                                            }),
                                            (0, s.jsx)("p", {
                                              className: (0, O.cn)(
                                                "text-xs font-bold",
                                                "redirect" === sg
                                                  ? "text-white"
                                                  : "text-slate-400",
                                              ),
                                              children: "Redirect",
                                            }),
                                            (0, s.jsx)("p", {
                                              className:
                                                "text-[9px] text-slate-500 mt-0.5",
                                              children: "Redireciona para URL",
                                            }),
                                          ],
                                        }),
                                        (0, s.jsxs)("button", {
                                          type: "button",
                                          onClick: () => sj("mirror"),
                                          className: (0, O.cn)(
                                            "relative p-3 rounded-xl border transition-all cursor-pointer text-left",
                                            "mirror" === sg
                                              ? "bg-[#00D9FF]/10 border-[#00D9FF]/50 shadow-[0_0_15px_rgba(0,217,255,0.1)]"
                                              : "bg-black/20 border-white/10 hover:border-white/20",
                                          ),
                                          children: [
                                            (0, s.jsx)("div", {
                                              className: (0, O.cn)(
                                                "w-3 h-3 rounded-full border-2 mb-2 flex items-center justify-center",
                                                "mirror" === sg
                                                  ? "border-[#00D9FF]"
                                                  : "border-slate-600",
                                              ),
                                              children:
                                                "mirror" === sg &&
                                                (0, s.jsx)("div", {
                                                  className:
                                                    "w-1.5 h-1.5 rounded-full bg-[#00D9FF]",
                                                }),
                                            }),
                                            (0, s.jsx)(P.Monitor, {
                                              size: 14,
                                              className: (0, O.cn)(
                                                "mb-1",
                                                "mirror" === sg
                                                  ? "text-[#00D9FF]"
                                                  : "text-slate-500",
                                              ),
                                            }),
                                            (0, s.jsx)("p", {
                                              className: (0, O.cn)(
                                                "text-xs font-bold",
                                                "mirror" === sg
                                                  ? "text-white"
                                                  : "text-slate-400",
                                              ),
                                              children: "Espelho",
                                            }),
                                            (0, s.jsx)("p", {
                                              className:
                                                "text-[9px] text-slate-500 mt-0.5",
                                              children: "Clona site na URL",
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                ("redirect" === sg || "mirror" === sg) &&
                                  (0, s.jsxs)("div", {
                                    children: [
                                      (0, s.jsx)("label", {
                                        className:
                                          "text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block",
                                        children:
                                          "redirect" === sg
                                            ? "URL de Redirecionamento"
                                            : "URL para Espelhar",
                                      }),
                                      (0, s.jsx)(r.Input, {
                                        value: sk,
                                        onChange: (e) => sy(e.target.value),
                                        placeholder:
                                          "https://g1.globo.com/noticias",
                                        className:
                                          "bg-black/30 border-white/10 backdrop-blur-sm text-sm h-10",
                                      }),
                                      (0, s.jsx)("p", {
                                        className:
                                          "text-[10px] text-slate-500 mt-1",
                                        children:
                                          "redirect" === sg
                                            ? "Visitantes bloqueados serao redirecionados para esta URL"
                                            : "O conteudo desta URL sera exibido na mesma URL do link",
                                      }),
                                    ],
                                  }),
                                "safepage" === sg &&
                                  (0, s.jsx)("div", {
                                    className:
                                      "p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg",
                                    children: (0, s.jsxs)("p", {
                                      className: "text-[10px] text-emerald-400",
                                      children: [
                                        (0, s.jsx)(y.Shield, {
                                          size: 11,
                                          className: "inline mr-1",
                                        }),
                                        "Visitantes bloqueados verao uma pagina de seguranca do Shark Bot. Nenhuma URL externa necessaria.",
                                      ],
                                    }),
                                  }),
                                "mirror" === sg &&
                                  (0, s.jsx)("div", {
                                    className:
                                      "p-2.5 bg-purple-500/10 border border-purple-500/20 rounded-lg",
                                    children: (0, s.jsxs)("p", {
                                      className: "text-[10px] text-purple-400",
                                      children: [
                                        (0, s.jsx)(P.Monitor, {
                                          size: 11,
                                          className: "inline mr-1",
                                        }),
                                        "O conteudo da URL sera carregado e exibido diretamente no seu link. A URL do navegador nao muda.",
                                      ],
                                    }),
                                  }),
                                (0, s.jsxs)("div", {
                                  className:
                                    "flex items-center justify-between p-3 bg-black/20 border border-white/10 rounded-xl",
                                  children: [
                                    (0, s.jsxs)("div", {
                                      className: "flex items-center gap-2.5",
                                      children: [
                                        (0, s.jsx)("div", {
                                          className: (0, O.cn)(
                                            "w-8 h-8 rounded-lg flex items-center justify-center",
                                            sf
                                              ? "bg-red-500/15"
                                              : "bg-emerald-500/15",
                                          ),
                                          children: (0, s.jsx)(C.ShieldAlert, {
                                            size: 15,
                                            className: sf
                                              ? "text-red-400"
                                              : "text-emerald-400",
                                          }),
                                        }),
                                        (0, s.jsxs)("div", {
                                          children: [
                                            (0, s.jsx)("p", {
                                              className:
                                                "text-xs font-bold text-white",
                                              children: "Bloquear Bots de Ads",
                                            }),
                                            (0, s.jsx)("p", {
                                              className:
                                                "text-[10px] text-slate-500",
                                              children: sf
                                                ? "Crawlers do Facebook, Google e TikTok serao bloqueados"
                                                : "Crawlers de ads podem acessar o link (trafego pago)",
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, s.jsx)(q.Switch, {
                                      checked: sf,
                                      onCheckedChange: sN,
                                      size: "md",
                                    }),
                                  ],
                                }),
                                (0, s.jsxs)("div", {
                                  className:
                                    "flex items-center justify-between p-3 bg-black/20 border border-white/10 rounded-xl",
                                  children: [
                                    (0, s.jsxs)("div", {
                                      className: "flex items-center gap-2.5",
                                      children: [
                                        (0, s.jsx)("div", {
                                          className: (0, O.cn)(
                                            "w-8 h-8 rounded-lg flex items-center justify-center",
                                            sv
                                              ? "bg-cyan-500/15"
                                              : "bg-white/5",
                                          ),
                                          children: (0, s.jsx)($.ShieldBan, {
                                            size: 15,
                                            className: sv
                                              ? "text-cyan-400"
                                              : "text-slate-500",
                                          }),
                                        }),
                                        (0, s.jsxs)("div", {
                                          children: [
                                            (0, s.jsx)("p", {
                                              className:
                                                "text-xs font-bold text-white",
                                              children: "Anti-Compartilhamento",
                                            }),
                                            (0, s.jsx)("p", {
                                              className:
                                                "text-[10px] text-slate-500",
                                              children: sv
                                                ? "Links compartilhados no Instagram serao bloqueados"
                                                : "Qualquer pessoa com o link pode acessar",
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, s.jsx)(q.Switch, {
                                      checked: sv,
                                      onCheckedChange: sw,
                                      size: "md",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          !eX &&
                            (0, s.jsxs)("div", {
                              className:
                                "flex items-center gap-2 px-3 py-2 rounded-lg bg-[#00D9FF]/5 border border-[#00D9FF]/10",
                              children: [
                                (0, s.jsx)(E.Globe, {
                                  size: 14,
                                  className: "text-[#00D9FF]",
                                }),
                                (0, s.jsx)("span", {
                                  className:
                                    "text-xs text-[#00D9FF] font-medium",
                                  children:
                                    "default" === sV
                                      ? "sharkbot.com.br"
                                      : "phantoms" === sV
                                        ? "phantoms.group"
                                        : eD.find((e) => e._id === sV)
                                            ?.domain || "sharkbot.com.br",
                                }),
                                (0, s.jsx)("button", {
                                  type: "button",
                                  onClick: () => s$(1),
                                  className:
                                    "ml-auto text-[10px] text-slate-500 hover:text-white transition-colors cursor-pointer",
                                  children: "Alterar",
                                }),
                              ],
                            }),
                          (0, s.jsxs)("div", {
                            children: [
                              (0, s.jsx)("label", {
                                className:
                                  "text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block",
                                children: "Destino",
                              }),
                              (0, s.jsxs)(n.Select, {
                                value: eJ,
                                onValueChange: (e) => {
                                  (eQ(e),
                                    "channel" !== e &&
                                      (e2(""), e4(null), e7(""), sr(null)));
                                },
                                children: [
                                  (0, s.jsx)(n.SelectTrigger, {
                                    className:
                                      "bg-black/30 border-white/10 backdrop-blur-sm text-sm h-10",
                                    children: (0, s.jsx)(n.SelectValue, {}),
                                  }),
                                  (0, s.jsxs)(n.SelectContent, {
                                    className:
                                      "bg-black/30 backdrop-blur-xl border-white/10",
                                    children: [
                                      (0, s.jsx)(n.SelectItem, {
                                        value: "telegram",
                                        children: (0, s.jsxs)("div", {
                                          className: "flex items-center gap-2",
                                          children: [
                                            (0, s.jsx)(p.Workflow, {
                                              size: 14,
                                            }),
                                            "Telegram (Bot)",
                                          ],
                                        }),
                                      }),
                                      (0, s.jsx)(n.SelectItem, {
                                        value: "url",
                                        children: (0, s.jsxs)("div", {
                                          className: "flex items-center gap-2",
                                          children: [
                                            (0, s.jsx)(E.Globe, {
                                              size: 14,
                                            }),
                                            "Landing Page (URL)",
                                          ],
                                        }),
                                      }),
                                      (0, s.jsx)(n.SelectItem, {
                                        value: "channel",
                                        children: (0, s.jsxs)("div", {
                                          className: "flex items-center gap-2",
                                          children: [
                                            (0, s.jsx)(G.Hash, {
                                              size: 14,
                                            }),
                                            "Canal / Grupo",
                                          ],
                                        }),
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, s.jsx)("p", {
                                className: "text-[10px] text-slate-600 mt-1",
                                children:
                                  "telegram" === eJ
                                    ? "Redireciona para o bot do Telegram"
                                    : "url" === eJ
                                      ? "Redireciona para uma URL externa (landing page, checkout, etc)"
                                      : "Redireciona para um canal ou grupo do Telegram com tracking completo",
                              }),
                            ],
                          }),
                          "url" === eJ &&
                            (0, s.jsxs)("div", {
                              children: [
                                (0, s.jsx)("label", {
                                  className:
                                    "text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block",
                                  children: "URL da Landing Page",
                                }),
                                (0, s.jsx)(r.Input, {
                                  value: eY,
                                  onChange: (e) => e0(e.target.value),
                                  placeholder: "https://sua-landing-page.com",
                                  className:
                                    "bg-black/30 border-white/10 backdrop-blur-sm text-sm h-10",
                                }),
                                (0, s.jsx)("p", {
                                  className: "text-[10px] text-slate-600 mt-1",
                                  children:
                                    "O visitante sera redirecionado para esta URL com tracking completo",
                                }),
                              ],
                            }),
                          "channel" === eJ &&
                            (0, s.jsxs)("div", {
                              className: "space-y-4",
                              children: [
                                (0, s.jsxs)("div", {
                                  children: [
                                    (0, s.jsx)("label", {
                                      className:
                                        "text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block",
                                      children: "Bot",
                                    }),
                                    (0, s.jsxs)(n.Select, {
                                      value: e1,
                                      onValueChange: (e) => {
                                        (e2(e), e7(""), ss(""), tb(e));
                                      },
                                      children: [
                                        (0, s.jsx)(n.SelectTrigger, {
                                          className:
                                            "bg-black/30 border-white/10 backdrop-blur-sm text-sm h-10",
                                          children: (0, s.jsx)(n.SelectValue, {
                                            placeholder: "Selecionar bot...",
                                          }),
                                        }),
                                        (0, s.jsx)(n.SelectContent, {
                                          className:
                                            "bg-black/30 backdrop-blur-xl border-white/10",
                                          children: eT
                                            .filter((e) => "ativo" === e.status)
                                            .map((e) =>
                                              (0, s.jsxs)(
                                                n.SelectItem,
                                                {
                                                  value: e._id,
                                                  children: ["@", e.username],
                                                },
                                                e._id,
                                              ),
                                            ),
                                        }),
                                      ],
                                    }),
                                    (0, s.jsx)("p", {
                                      className:
                                        "text-[10px] text-slate-600 mt-1",
                                      children:
                                        "O bot precisa ser admin no canal/grupo com permissao de criar links de convite",
                                    }),
                                  ],
                                }),
                                e1 &&
                                  (0, s.jsxs)("div", {
                                    children: [
                                      (0, s.jsx)("label", {
                                        className:
                                          "text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block",
                                        children: "Canal / Grupo",
                                      }),
                                      e9
                                        ? (0, s.jsxs)("div", {
                                            className:
                                              "flex items-center gap-2 p-3 bg-black/30 rounded-xl border border-white/10",
                                            children: [
                                              (0, s.jsx)(b.Loader2, {
                                                size: 14,
                                                className:
                                                  "animate-spin text-slate-400",
                                              }),
                                              (0, s.jsx)("span", {
                                                className:
                                                  "text-xs text-slate-400",
                                                children:
                                                  "Carregando canais...",
                                              }),
                                            ],
                                          })
                                        : 0 === e6.length
                                          ? (0, s.jsx)("div", {
                                              className:
                                                "p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg",
                                              children: (0, s.jsx)("p", {
                                                className:
                                                  "text-[11px] text-amber-400",
                                                children:
                                                  "Nenhum canal/grupo encontrado. O bot precisa ser admin com permissao de criar links de convite.",
                                              }),
                                            })
                                          : (0, s.jsxs)(n.Select, {
                                              value: e8,
                                              onValueChange: (e) => {
                                                e7(e);
                                                let s = e6.find(
                                                  (s) => s.chatId === e,
                                                );
                                                s &&
                                                  ss(
                                                    "channel" === s.type
                                                      ? "channel"
                                                      : "supergroup",
                                                  );
                                              },
                                              children: [
                                                (0, s.jsx)(n.SelectTrigger, {
                                                  className:
                                                    "bg-black/30 border-white/10 backdrop-blur-sm text-sm h-10",
                                                  children: (0, s.jsx)(
                                                    n.SelectValue,
                                                    {
                                                      placeholder:
                                                        "Selecionar canal/grupo...",
                                                    },
                                                  ),
                                                }),
                                                (0, s.jsx)(n.SelectContent, {
                                                  className:
                                                    "bg-black/30 backdrop-blur-xl border-white/10",
                                                  children: e6.map((e) =>
                                                    (0, s.jsx)(
                                                      n.SelectItem,
                                                      {
                                                        value: e.chatId,
                                                        children: (0, s.jsxs)(
                                                          "div",
                                                          {
                                                            className:
                                                              "flex items-center gap-2",
                                                            children: [
                                                              (0, s.jsx)(
                                                                G.Hash,
                                                                {
                                                                  size: 14,
                                                                },
                                                              ),
                                                              e.title,
                                                              (0, s.jsx)(
                                                                "span",
                                                                {
                                                                  className:
                                                                    "text-[10px] text-slate-500",
                                                                  children:
                                                                    "channel" ===
                                                                    e.type
                                                                      ? "Canal"
                                                                      : "Grupo",
                                                                },
                                                              ),
                                                            ],
                                                          },
                                                        ),
                                                      },
                                                      e.chatId,
                                                    ),
                                                  ),
                                                }),
                                              ],
                                            }),
                                    ],
                                  }),
                              ],
                            }),
                          "url" !== eJ &&
                            (0, s.jsxs)("div", {
                              children: [
                                (0, s.jsxs)("label", {
                                  className:
                                    "text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block",
                                  children: [
                                    "Fluxos ",
                                    "channel" === eJ &&
                                      (0, s.jsx)("span", {
                                        className:
                                          "text-slate-600 normal-case font-normal",
                                        children:
                                          "(opcional - necessario para tracking/pixels)",
                                      }),
                                  ],
                                }),
                                (0, s.jsx)("div", {
                                  className:
                                    "p-3 bg-black/30 rounded-xl border border-white/10 backdrop-blur-sm min-h-[70px]",
                                  children:
                                    0 === eG.length
                                      ? (0, s.jsx)("p", {
                                          className:
                                            "text-xs text-slate-600 text-center py-3",
                                          children: "Nenhum fluxo selecionado",
                                        })
                                      : (0, s.jsx)("div", {
                                          className: "flex flex-wrap gap-2",
                                          children: eG.map((e) => {
                                            let t = eF.find((s) => s._id === e);
                                            return t
                                              ? (0, s.jsxs)(
                                                  "span",
                                                  {
                                                    className:
                                                      "inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#00D9FF]/10 text-[#00D9FF] text-[11px] font-bold rounded-lg border border-[#00D9FF]/20",
                                                    children: [
                                                      (0, s.jsx)(p.Workflow, {
                                                        size: 12,
                                                      }),
                                                      t.name,
                                                      (0, s.jsx)("button", {
                                                        onClick: () => tu(e),
                                                        className:
                                                          "hover:text-red-400 ml-1 cursor-pointer",
                                                        children: (0, s.jsx)(
                                                          u.X,
                                                          {
                                                            size: 12,
                                                          },
                                                        ),
                                                      }),
                                                    ],
                                                  },
                                                  e,
                                                )
                                              : null;
                                          }),
                                        }),
                                }),
                                0 === eF.length
                                  ? (0, s.jsx)("div", {
                                      className:
                                        "mt-2 p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg",
                                      children: (0, s.jsx)("p", {
                                        className: "text-[11px] text-amber-400",
                                        children:
                                          "Nenhum fluxo disponível. Crie um fluxo primeiro.",
                                      }),
                                    })
                                  : (0, s.jsxs)(n.Select, {
                                      value: "",
                                      onValueChange: tu,
                                      children: [
                                        (0, s.jsx)(n.SelectTrigger, {
                                          className:
                                            "mt-2.5 bg-black/30 border-white/10 backdrop-blur-sm text-sm h-10",
                                          children: (0, s.jsx)(n.SelectValue, {
                                            placeholder: "Adicionar fluxo...",
                                          }),
                                        }),
                                        (0, s.jsx)(n.SelectContent, {
                                          className:
                                            "bg-black/30 backdrop-blur-xl border-white/10",
                                          children: eF
                                            .filter((e) => !eG.includes(e._id))
                                            .map((e) =>
                                              (0, s.jsx)(
                                                n.SelectItem,
                                                {
                                                  value: e._id,
                                                  children: (0, s.jsxs)("div", {
                                                    className:
                                                      "flex items-center gap-2",
                                                    children: [
                                                      (0, s.jsx)(p.Workflow, {
                                                        size: 14,
                                                      }),
                                                      e.name,
                                                    ],
                                                  }),
                                                },
                                                e._id,
                                              ),
                                            ),
                                        }),
                                      ],
                                    }),
                              ],
                            }),
                        ],
                      }),
                    "codigos-venda" === eg &&
                      (0, s.jsxs)("div", {
                        className: "space-y-5",
                        children: [
                          (0, s.jsx)("div", {
                            className:
                              "p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg",
                            children: (0, s.jsxs)("p", {
                              className: "text-[11px] text-blue-400",
                              children: [
                                (0, s.jsx)(D.Tag, {
                                  size: 12,
                                  className: "inline mr-1",
                                }),
                                "Codigos de venda (cv=) permitem rastrear vendas de afiliados ou campanhas especificas.",
                              ],
                            }),
                          }),
                          (0, s.jsxs)("div", {
                            children: [
                              (0, s.jsx)("label", {
                                className:
                                  "text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block",
                                children: "Nome do Codigo",
                              }),
                              (0, s.jsx)(r.Input, {
                                value: eR,
                                onChange: (e) => eM(e.target.value),
                                placeholder: "Ex: afiliado-joao",
                                className:
                                  "bg-black/30 border-white/10 text-white text-sm h-10",
                              }),
                            ],
                          }),
                          (0, s.jsxs)("div", {
                            children: [
                              (0, s.jsx)("label", {
                                className:
                                  "text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block",
                                children: "Link Vinculado",
                              }),
                              (0, s.jsxs)(n.Select, {
                                value: eq,
                                onValueChange: (e) => {
                                  eW(e);
                                  let s = eS.find((s) => s._id === e);
                                  s &&
                                    eO(
                                      s.flows
                                        ?.map((e) =>
                                          "object" == typeof e.flowId &&
                                          e.flowId?._id
                                            ? e.flowId._id
                                            : e.flowId,
                                        )
                                        .filter(Boolean) || [],
                                    );
                                },
                                children: [
                                  (0, s.jsx)(n.SelectTrigger, {
                                    className:
                                      "bg-black/30 border-white/10 backdrop-blur-sm text-sm h-10",
                                    children: (0, s.jsx)(n.SelectValue, {
                                      placeholder: "Selecione um link...",
                                    }),
                                  }),
                                  (0, s.jsx)(n.SelectContent, {
                                    className:
                                      "bg-black/30 backdrop-blur-xl border-white/10",
                                    children: eS
                                      .filter((e) => "link" === e.type)
                                      .map((e) =>
                                        (0, s.jsx)(
                                          n.SelectItem,
                                          {
                                            value: e._id,
                                            children: (0, s.jsxs)("div", {
                                              className:
                                                "flex items-center gap-2",
                                              children: [
                                                (0, s.jsx)(d.Link2, {
                                                  size: 14,
                                                }),
                                                e.fullUrl || e.slug,
                                              ],
                                            }),
                                          },
                                          e._id,
                                        ),
                                      ),
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                  ],
                }),
                (0, s.jsx)(o.DialogFooter, {
                  className: "px-6 py-4 border-t border-white/5 flex-shrink-0",
                  children:
                    "redirecionadores" !== eg || 1 !== sB || eX
                      ? (0, s.jsxs)("div", {
                          className: "flex gap-3 w-full",
                          children: [
                            (0, s.jsxs)("button", {
                              onClick: tv,
                              disabled: eH,
                              className:
                                "relative flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50 cursor-pointer",
                              style: H.enterBtnStyle,
                              children: [
                                (0, s.jsx)("span", {
                                  className:
                                    "absolute inset-0 rounded-xl border border-[rgba(28,28,28,0.2)]",
                                }),
                                (0, s.jsxs)("span", {
                                  className:
                                    "relative z-10 flex items-center justify-center gap-2",
                                  children: [
                                    eH
                                      ? (0, s.jsx)(b.Loader2, {
                                          size: 16,
                                          className: "animate-spin",
                                        })
                                      : (0, s.jsx)(g.Check, {
                                          size: 16,
                                        }),
                                    eX ? "Salvar" : "Criar",
                                  ],
                                }),
                              ],
                            }),
                            (0, s.jsx)("button", {
                              onClick: () => {
                                (eE(!1), tg());
                              },
                              className:
                                "px-6 py-3 bg-slate-800/60 border border-white/10 rounded-xl text-sm font-bold text-slate-300 hover:text-white hover:border-white/20 transition-all cursor-pointer",
                              children: "Cancelar",
                            }),
                          ],
                        })
                      : (0, s.jsx)("div", {
                          className: "flex gap-3 w-full",
                          children: (0, s.jsx)("button", {
                            onClick: () => {
                              (eE(!1), tg());
                            },
                            className:
                              "flex-1 px-6 py-3 bg-slate-800/60 border border-white/10 rounded-xl text-sm font-bold text-slate-300 hover:text-white hover:border-white/20 transition-all cursor-pointer",
                            children: "Cancelar",
                          }),
                        }),
                }),
              ],
            }),
          }),
          "codigos-venda" === eg &&
            (0, s.jsxs)(W.GlowCard, {
              className: "overflow-hidden",
              noPadding: !0,
              children: [
                (0, s.jsxs)("div", {
                  className:
                    "px-5 py-4 border-b border-white/5 flex items-center justify-between",
                  children: [
                    (0, s.jsxs)("div", {
                      className: "flex items-center gap-3",
                      children: [
                        (0, s.jsx)("div", {
                          className:
                            "w-8 h-8 rounded-lg bg-white/[0.02] flex items-center justify-center border border-white/10",
                          children: (0, s.jsx)(D.Tag, {
                            size: 16,
                            className: "text-[#00D9FF]",
                          }),
                        }),
                        (0, s.jsx)("h2", {
                          className: "text-base font-bold text-white",
                          children: "Meus Codigos de Vendas",
                        }),
                      ],
                    }),
                    (0, s.jsxs)("span", {
                      className: "text-xs text-slate-500",
                      children: ["(", eI.length, ")"],
                    }),
                  ],
                }),
                (0, s.jsx)("div", {
                  className: "p-5",
                  children:
                    0 === eI.length
                      ? (0, s.jsxs)("div", {
                          className: "text-center py-16",
                          children: [
                            (0, s.jsx)("div", {
                              className:
                                "w-16 h-16 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-center mx-auto mb-4",
                              children: (0, s.jsx)(D.Tag, {
                                size: 28,
                                className: "text-slate-600",
                              }),
                            }),
                            (0, s.jsx)("p", {
                              className: "text-sm text-slate-400 font-medium",
                              children: "Nenhum codigo de vendas criado",
                            }),
                            (0, s.jsx)("p", {
                              className: "text-xs text-slate-600 mt-1 mb-4",
                              children:
                                "Codigos de venda (cv=) rastreiam trafego organico e afiliados",
                            }),
                            (0, s.jsxs)("button", {
                              onClick: () => {
                                (tg(), eE(!0));
                              },
                              className:
                                "relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all cursor-pointer",
                              style: H.enterBtnStyle,
                              children: [
                                (0, s.jsx)("span", {
                                  className:
                                    "absolute inset-0 rounded-xl border border-[rgba(28,28,28,0.2)]",
                                }),
                                (0, s.jsxs)("span", {
                                  className:
                                    "relative z-10 flex items-center gap-2",
                                  children: [
                                    (0, s.jsx)(N.Plus, {
                                      size: 16,
                                    }),
                                    "Criar Primeiro Codigo",
                                  ],
                                }),
                              ],
                            }),
                          ],
                        })
                      : (0, s.jsx)("div", {
                          className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                          children: eI.map((e) => {
                            let t = tC(e),
                              a = sG.has(e._id);
                            return (0, s.jsxs)(
                              "div",
                              {
                                className:
                                  "p-4 rounded-xl bg-black/30 border border-white/10 backdrop-blur-sm hover:border-[#00D9FF]/20 transition-all group",
                                children: [
                                  (0, s.jsxs)("div", {
                                    className: "flex items-center gap-3 mb-3",
                                    children: [
                                      (0, s.jsx)("div", {
                                        className:
                                          "w-10 h-10 rounded-xl bg-white/[0.02] flex items-center justify-center border border-white/10 flex-shrink-0",
                                        children: (0, s.jsx)(D.Tag, {
                                          size: 18,
                                          className: "text-[#00D9FF]",
                                        }),
                                      }),
                                      (0, s.jsxs)("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                          (0, s.jsx)("h3", {
                                            className:
                                              "text-sm font-bold text-white truncate",
                                            children: e.name,
                                          }),
                                          (0, s.jsxs)("div", {
                                            className:
                                              "flex items-center gap-1.5 mt-0.5",
                                            children: [
                                              (0, s.jsxs)("code", {
                                                className:
                                                  "text-[10px] font-mono text-[#00D9FF]",
                                                children: ["cv=", e.slug],
                                              }),
                                              (0, s.jsx)("button", {
                                                onClick: async () => {
                                                  (await navigator.clipboard.writeText(
                                                    `cv=${e.slug}`,
                                                  ),
                                                    eb({
                                                      type: "success",
                                                      title: "Código copiado!",
                                                    }));
                                                },
                                                className:
                                                  "p-0.5 rounded text-slate-400/60 hover:text-[#00D9FF] hover:bg-[#00D9FF]/10 transition-all cursor-pointer",
                                                title: "Copiar código cv=...",
                                                children: (0, s.jsx)(c.Copy, {
                                                  size: 10,
                                                }),
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      (0, s.jsxs)("div", {
                                        className: "flex gap-1.5 flex-shrink-0",
                                        children: [
                                          (0, s.jsx)("button", {
                                            onClick: async () => {
                                              let s = e.flows?.[0];
                                              if (!s)
                                                return void eb({
                                                  type: "error",
                                                  title:
                                                    "Nenhum fluxo vinculado a este código",
                                                });
                                              let t =
                                                  "object" == typeof s.flowId &&
                                                  null !== s.flowId
                                                    ? s.flowId._id
                                                    : s.flowId,
                                                a = eS
                                                  .filter(
                                                    (e) => "link" === e.type,
                                                  )
                                                  .find((e) =>
                                                    e.flows?.some(
                                                      (e) =>
                                                        ("object" ==
                                                          typeof e.flowId &&
                                                        null !== e.flowId
                                                          ? e.flowId._id
                                                          : e.flowId) === t,
                                                    ),
                                                  );
                                              if (!a)
                                                return void eb({
                                                  type: "error",
                                                  title: "Link não encontrado",
                                                  description:
                                                    "Crie um link de redirecionamento para este fluxo primeiro",
                                                });
                                              let l = `${a.fullUrl}?cv=${e.slug}`;
                                              (a.cloakerV2?.enabled &&
                                                a.shk &&
                                                (l += `&shk=${a.shk}`),
                                                await navigator.clipboard.writeText(
                                                  l,
                                                ),
                                                eb({
                                                  type: "success",
                                                  title:
                                                    "Link do fluxo copiado!",
                                                }));
                                            },
                                            className:
                                              "p-2 rounded-lg bg-slate-800/60 border border-white/10 text-slate-400 hover:text-[#00D9FF] hover:border-[#00D9FF]/30 transition-all cursor-pointer",
                                            title: "Copiar link do fluxo",
                                            children: (0, s.jsx)(c.Copy, {
                                              size: 14,
                                            }),
                                          }),
                                          (0, s.jsx)("button", {
                                            onClick: () => {
                                              let s = new Set(sG);
                                              (a
                                                ? s.delete(e._id)
                                                : s.add(e._id),
                                                sO(s));
                                            },
                                            className:
                                              "p-2 rounded-lg bg-slate-800/60 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all cursor-pointer",
                                            children: a
                                              ? (0, s.jsx)(z.ChevronUp, {
                                                  size: 14,
                                                })
                                              : (0, s.jsx)(_.ChevronDown, {
                                                  size: 14,
                                                }),
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, s.jsx)("div", {
                                    className: "flex flex-wrap gap-1.5 mb-3",
                                    children: t.map((e, t) =>
                                      (0, s.jsxs)(
                                        "span",
                                        {
                                          className:
                                            "inline-flex items-center gap-1 px-2 py-0.5 bg-slate-800/60 text-slate-400 text-[10px] rounded border border-white/5",
                                          children: [
                                            (0, s.jsx)(p.Workflow, {
                                              size: 10,
                                            }),
                                            e,
                                          ],
                                        },
                                        t,
                                      ),
                                    ),
                                  }),
                                  (0, s.jsxs)("div", {
                                    className: "grid grid-cols-4 gap-2 mb-3",
                                    children: [
                                      (0, s.jsxs)("div", {
                                        className:
                                          "p-2 bg-white/[0.02] rounded-lg border border-white/5",
                                        children: [
                                          (0, s.jsxs)("div", {
                                            className:
                                              "flex items-center gap-1 mb-0.5",
                                            children: [
                                              (0, s.jsx)(v.MousePointerClick, {
                                                size: 9,
                                                className: "text-[#00D9FF]",
                                              }),
                                              (0, s.jsx)("span", {
                                                className:
                                                  "text-[8px] text-slate-500 font-bold uppercase",
                                                children: "Cliques",
                                              }),
                                            ],
                                          }),
                                          (0, s.jsx)("p", {
                                            className:
                                              "text-sm font-bold text-white",
                                            children: e.stats?.totalClicks || 0,
                                          }),
                                        ],
                                      }),
                                      (0, s.jsxs)("div", {
                                        className:
                                          "p-2 bg-white/[0.02] rounded-lg border border-white/5",
                                        children: [
                                          (0, s.jsxs)("div", {
                                            className:
                                              "flex items-center gap-1 mb-0.5",
                                            children: [
                                              (0, s.jsx)(I.Users, {
                                                size: 9,
                                                className: "text-blue-400",
                                              }),
                                              (0, s.jsx)("span", {
                                                className:
                                                  "text-[8px] text-slate-500 font-bold uppercase",
                                                children: "Leads",
                                              }),
                                            ],
                                          }),
                                          (0, s.jsx)("p", {
                                            className:
                                              "text-sm font-bold text-white",
                                            children:
                                              e.calculatedStats?.leads || 0,
                                          }),
                                        ],
                                      }),
                                      (0, s.jsxs)("div", {
                                        className:
                                          "p-2 bg-white/[0.02] rounded-lg border border-white/5",
                                        children: [
                                          (0, s.jsxs)("div", {
                                            className:
                                              "flex items-center gap-1 mb-0.5",
                                            children: [
                                              (0, s.jsx)(A.ShoppingCart, {
                                                size: 9,
                                                className: "text-emerald-400",
                                              }),
                                              (0, s.jsx)("span", {
                                                className:
                                                  "text-[8px] text-slate-500 font-bold uppercase",
                                                children: "Vendas",
                                              }),
                                            ],
                                          }),
                                          (0, s.jsx)("p", {
                                            className:
                                              "text-sm font-bold text-white",
                                            children:
                                              e.calculatedStats?.sales || 0,
                                          }),
                                        ],
                                      }),
                                      (0, s.jsxs)("div", {
                                        className:
                                          "p-2 bg-white/[0.02] rounded-lg border border-white/5",
                                        children: [
                                          (0, s.jsxs)("div", {
                                            className:
                                              "flex items-center gap-1 mb-0.5",
                                            children: [
                                              (0, s.jsx)(T.DollarSign, {
                                                size: 9,
                                                className: "text-green-400",
                                              }),
                                              (0, s.jsx)("span", {
                                                className:
                                                  "text-[8px] text-slate-500 font-bold uppercase",
                                                children: "Receita",
                                              }),
                                            ],
                                          }),
                                          (0, s.jsx)("p", {
                                            className:
                                              "text-sm font-bold text-white",
                                            children: (
                                              e.calculatedStats?.revenue || 0
                                            ).toLocaleString("pt-BR", {
                                              style: "currency",
                                              currency: "BRL",
                                            }),
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  a &&
                                    (0, s.jsx)("div", {
                                      className:
                                        "pt-3 border-t border-white/5 space-y-3",
                                      children: (0, s.jsxs)("div", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                          (0, s.jsxs)("button", {
                                            onClick: () => tN(e),
                                            className:
                                              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-white/10 text-[11px] font-bold text-slate-400 hover:text-white hover:border-white/20 transition-all cursor-pointer",
                                            children: [
                                              (0, s.jsx)(m.Pencil, {
                                                size: 12,
                                              }),
                                              "Editar",
                                            ],
                                          }),
                                          (0, s.jsx)("button", {
                                            onClick: () => {
                                              (sm({
                                                id: e._id,
                                                name: e.name,
                                              }),
                                                sc(!0));
                                            },
                                            className:
                                              "p-1.5 rounded-lg bg-slate-800/60 border border-white/10 text-slate-500 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 transition-all cursor-pointer",
                                            title: "Excluir",
                                            children: (0, s.jsx)(h.Trash2, {
                                              size: 14,
                                            }),
                                          }),
                                        ],
                                      }),
                                    }),
                                ],
                              },
                              e._id,
                            );
                          }),
                        }),
                }),
              ],
            }),
          "utm" === eg &&
            (0, s.jsxs)(W.GlowCard, {
              className: "overflow-hidden max-w-3xl",
              noPadding: !0,
              children: [
                (0, s.jsx)("div", {
                  className: "px-4 py-3 border-b border-white/5",
                  children: (0, s.jsxs)("div", {
                    className: "flex items-center gap-2",
                    children: [
                      (0, s.jsx)("div", {
                        className:
                          "w-8 h-8 rounded-lg bg-white/[0.02] flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform",
                        children: (0, s.jsx)(d.Link2, {
                          size: 14,
                          className: "text-[#00D9FF]",
                        }),
                      }),
                      (0, s.jsx)("h2", {
                        className:
                          "text-[11px] font-bold text-[#00D9FF] uppercase tracking-widest",
                        children: "Gerador de Links UTM",
                      }),
                    ],
                  }),
                }),
                (0, s.jsxs)("div", {
                  className: "p-4 space-y-4",
                  children: [
                    (0, s.jsxs)("div", {
                      className: "grid grid-cols-3 gap-4",
                      children: [
                        (0, s.jsxs)("div", {
                          className: "flex flex-col",
                          children: [
                            (0, s.jsx)("label", {
                              className:
                                "text-[10px] font-bold text-slate-500 uppercase tracking-wider h-4 flex items-center",
                              children: "Link Base",
                            }),
                            (0, s.jsxs)(n.Select, {
                              value: sq,
                              onValueChange: sW,
                              children: [
                                (0, s.jsx)(n.SelectTrigger, {
                                  className:
                                    "mt-1.5 bg-black/30 border-white/10 backdrop-blur-sm text-sm h-9",
                                  children: (0, s.jsx)(n.SelectValue, {
                                    placeholder: "Selecione um link...",
                                  }),
                                }),
                                (0, s.jsx)(n.SelectContent, {
                                  className:
                                    "bg-black/30 backdrop-blur-xl border-white/10",
                                  children:
                                    eS.filter((e) => "link" === e.type).length >
                                    0
                                      ? eS
                                          .filter((e) => "link" === e.type)
                                          .map((e) => {
                                            let t = e.flows?.[0],
                                              a =
                                                t?.flowId &&
                                                "object" == typeof t.flowId
                                                  ? t.flowId.name
                                                  : eF.find(
                                                      (e) =>
                                                        e._id === t?.flowId,
                                                    )?.name,
                                              l = e.flows?.length || 0;
                                            return (0, s.jsx)(
                                              n.SelectItem,
                                              {
                                                value: e._id,
                                                children: (0, s.jsxs)("div", {
                                                  className:
                                                    "flex items-center justify-between gap-3 w-full",
                                                  children: [
                                                    (0, s.jsxs)("span", {
                                                      className:
                                                        "text-xs text-white truncate max-w-[180px]",
                                                      children: [
                                                        a || "Sem fluxo",
                                                        l > 1 &&
                                                          (0, s.jsxs)("span", {
                                                            className:
                                                              "text-slate-500 ml-1",
                                                            children: [
                                                              "(+",
                                                              l - 1,
                                                              ")",
                                                            ],
                                                          }),
                                                      ],
                                                    }),
                                                    (0, s.jsx)("span", {
                                                      className:
                                                        "text-[9px] font-bold bg-[#00D9FF]/20 text-[#00D9FF] px-1.5 py-0.5 rounded border border-[#00D9FF]/30",
                                                      children: e.slug,
                                                    }),
                                                  ],
                                                }),
                                              },
                                              e._id,
                                            );
                                          })
                                      : (0, s.jsx)("div", {
                                          className:
                                            "px-3 py-2 text-xs text-slate-500",
                                          children:
                                            "Nenhum link criado. Crie um na aba Links primeiro.",
                                        }),
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, s.jsxs)("div", {
                          className: "flex flex-col",
                          children: [
                            (0, s.jsxs)("label", {
                              className:
                                "text-[10px] font-bold text-slate-500 uppercase tracking-wider h-4 flex items-center gap-1.5",
                              children: [
                                (0, s.jsx)(E.Globe, {
                                  size: 10,
                                }),
                                "Domínio",
                              ],
                            }),
                            (0, s.jsxs)(n.Select, {
                              value: th,
                              onValueChange: tp,
                              children: [
                                (0, s.jsx)(n.SelectTrigger, {
                                  className:
                                    "mt-1.5 bg-black/30 border-white/10 backdrop-blur-sm text-sm h-9",
                                  children: (0, s.jsx)(n.SelectValue, {
                                    placeholder: "Selecione...",
                                  }),
                                }),
                                (0, s.jsxs)(n.SelectContent, {
                                  className:
                                    "bg-black/30 backdrop-blur-xl border-white/10",
                                  children: [
                                    (0, s.jsx)(n.SelectItem, {
                                      value: "default",
                                      children: (0, s.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                          (0, s.jsx)("span", {
                                            className: "text-xs text-white",
                                            children: "sharkbot.com.br/l/",
                                          }),
                                          (0, s.jsx)("span", {
                                            className:
                                              "text-[9px] text-slate-500",
                                            children: "(Padrão)",
                                          }),
                                        ],
                                      }),
                                    }),
                                    (0, s.jsx)(n.SelectItem, {
                                      value: "phantoms",
                                      children: (0, s.jsx)("div", {
                                        className: "flex items-center gap-2",
                                        children: (0, s.jsx)("span", {
                                          className: "text-xs text-white",
                                          children: "phantoms.group/l/",
                                        }),
                                      }),
                                    }),
                                    eD
                                      .filter((e) => "active" === e.status)
                                      .map((e) =>
                                        (0, s.jsx)(
                                          n.SelectItem,
                                          {
                                            value: e._id,
                                            children: (0, s.jsxs)("div", {
                                              className:
                                                "flex items-center gap-2",
                                              children: [
                                                (0, s.jsxs)("span", {
                                                  className:
                                                    "text-xs text-[#00D9FF]",
                                                  children: [e.domain, "/l/"],
                                                }),
                                                (0, s.jsx)(L.CheckCircle, {
                                                  size: 10,
                                                  className: "text-emerald-400",
                                                }),
                                              ],
                                            }),
                                          },
                                          e._id,
                                        ),
                                      ),
                                    0 ===
                                      eD.filter((e) => "active" === e.status)
                                        .length &&
                                      (0, s.jsx)("div", {
                                        className:
                                          "px-3 py-2 text-[10px] text-slate-500 border-t border-white/5 mt-1",
                                        children:
                                          'Adicione domínios na aba "Domínio Próprio"',
                                      }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, s.jsxs)("div", {
                          className: "flex flex-col",
                          children: [
                            (0, s.jsx)("label", {
                              className:
                                "text-[10px] font-bold text-slate-500 uppercase tracking-wider h-4 flex items-center",
                              children: "Modelo UTM",
                            }),
                            (0, s.jsxs)(n.Select, {
                              value: sH,
                              onValueChange: (e) => {
                                (sK(e),
                                  "utmify_meta" === e
                                    ? (sZ("FB"),
                                      sQ("{{campaign.name}}|{{campaign.id}}"),
                                      s0("{{adset.name}}|{{adset.id}}"),
                                      s2("{{ad.name}}|{{ad.id}}"),
                                      s4("{{placement}}"),
                                      s9("{{campaign.id}}"))
                                    : "utmify_tiktok" === e
                                      ? (sZ("tiktok"),
                                        sQ("__CAMPAIGN_NAME__|__CAMPAIGN_ID__"),
                                        s0("__AID_NAME__|__AID__"),
                                        s2("__CID_NAME__|__CID__"),
                                        s4("__PLACEMENT__"),
                                        s9("__CAMPAIGN_ID__"))
                                      : "utmify_google" === e
                                        ? (sZ("google"),
                                          sQ("{campaignid}"),
                                          s0("cpc"),
                                          s2("{creative}"),
                                          s4("{keyword}"),
                                          s9("{gclid}"))
                                        : ("organic_instagram_bio" === e
                                            ? (sZ("instagram"),
                                              sQ("bio"),
                                              s0("organic"),
                                              s2("profile"))
                                            : "organic_tiktok_bio" === e
                                              ? (sZ("tiktok"),
                                                sQ("bio"),
                                                s0("organic"),
                                                s2("profile"))
                                              : "organic_twitter_bio" === e
                                                ? (sZ("twitter"),
                                                  sQ("bio"),
                                                  s0("organic"),
                                                  s2("profile"))
                                                : "organic_youtube_desc" === e
                                                  ? (sZ("youtube"),
                                                    sQ("description"),
                                                    s0("organic"),
                                                    s2("video"))
                                                  : "organic_whatsapp" === e
                                                    ? (sZ("whatsapp"),
                                                      sQ("status"),
                                                      s0("organic"),
                                                      s2("story"))
                                                    : "organic_telegram" === e
                                                      ? (sZ("telegram"),
                                                        sQ("bio"),
                                                        s0("organic"),
                                                        s2("profile"))
                                                      : (sZ(""),
                                                        sQ(""),
                                                        s0(""),
                                                        s2("")),
                                          s4(""),
                                          s9("")));
                              },
                              children: [
                                (0, s.jsx)(n.SelectTrigger, {
                                  className:
                                    "mt-1.5 bg-slate-900/60 border-slate-700/50 text-sm h-9",
                                  children: (0, s.jsx)(n.SelectValue, {}),
                                }),
                                (0, s.jsxs)(n.SelectContent, {
                                  className: "bg-[#0B1121] border-white/10",
                                  children: [
                                    (0, s.jsx)(n.SelectItem, {
                                      value: "custom",
                                      children: "Personalizado",
                                    }),
                                    (0, s.jsx)(n.SelectSeparator, {
                                      className: "bg-white/10 my-2",
                                    }),
                                    (0, s.jsxs)(n.SelectGroup, {
                                      children: [
                                        (0, s.jsxs)(n.SelectLabel, {
                                          className:
                                            "text-red-400 text-[10px] font-bold flex items-center gap-1.5 px-2 py-1.5",
                                          children: [
                                            (0, s.jsxs)("svg", {
                                              xmlns:
                                                "http://www.w3.org/2000/svg",
                                              width: "12",
                                              height: "12",
                                              viewBox: "0 0 24 24",
                                              fill: "none",
                                              stroke: "currentColor",
                                              strokeWidth: "2",
                                              strokeLinecap: "round",
                                              strokeLinejoin: "round",
                                              children: [
                                                (0, s.jsx)("rect", {
                                                  x: "3",
                                                  y: "11",
                                                  width: "18",
                                                  height: "11",
                                                  rx: "2",
                                                  ry: "2",
                                                }),
                                                (0, s.jsx)("path", {
                                                  d: "M7 11V7a5 5 0 0 1 10 0v4",
                                                }),
                                              ],
                                            }),
                                            "TRÁFEGO PAGO (ADS)",
                                          ],
                                        }),
                                        (0, s.jsx)(n.SelectItem, {
                                          value: "utmify_meta",
                                          children: "UTMify Meta Ads",
                                        }),
                                        (0, s.jsx)(n.SelectItem, {
                                          value: "utmify_tiktok",
                                          children: "UTMify TikTok Ads",
                                        }),
                                        (0, s.jsx)(n.SelectItem, {
                                          value: "utmify_google",
                                          children: "UTMify Google Ads",
                                        }),
                                      ],
                                    }),
                                    (0, s.jsx)(n.SelectSeparator, {
                                      className: "bg-white/10 my-2",
                                    }),
                                    (0, s.jsxs)(n.SelectGroup, {
                                      children: [
                                        (0, s.jsxs)(n.SelectLabel, {
                                          className:
                                            "text-green-400 text-[10px] font-bold flex items-center gap-1.5 px-2 py-1.5",
                                          children: [
                                            (0, s.jsxs)("svg", {
                                              xmlns:
                                                "http://www.w3.org/2000/svg",
                                              width: "12",
                                              height: "12",
                                              viewBox: "0 0 24 24",
                                              fill: "none",
                                              stroke: "currentColor",
                                              strokeWidth: "2",
                                              strokeLinecap: "round",
                                              strokeLinejoin: "round",
                                              children: [
                                                (0, s.jsx)("path", {
                                                  d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
                                                }),
                                                (0, s.jsx)("circle", {
                                                  cx: "9",
                                                  cy: "7",
                                                  r: "4",
                                                }),
                                                (0, s.jsx)("path", {
                                                  d: "M22 21v-2a4 4 0 0 0-3-3.87",
                                                }),
                                                (0, s.jsx)("path", {
                                                  d: "M16 3.13a4 4 0 0 1 0 7.75",
                                                }),
                                              ],
                                            }),
                                            "TRÁFEGO ORGÂNICO",
                                          ],
                                        }),
                                        (0, s.jsx)(n.SelectItem, {
                                          value: "organic_instagram_bio",
                                          children: "Instagram Bio",
                                        }),
                                        (0, s.jsx)(n.SelectItem, {
                                          value: "organic_tiktok_bio",
                                          children: "TikTok Bio",
                                        }),
                                        (0, s.jsx)(n.SelectItem, {
                                          value: "organic_twitter_bio",
                                          children: "Twitter Bio",
                                        }),
                                        (0, s.jsx)(n.SelectItem, {
                                          value: "organic_youtube_desc",
                                          children: "YouTube Descrição",
                                        }),
                                        (0, s.jsx)(n.SelectItem, {
                                          value: "organic_whatsapp",
                                          children: "WhatsApp Status",
                                        }),
                                        (0, s.jsx)(n.SelectItem, {
                                          value: "organic_telegram",
                                          children: "Telegram Bio",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    sq &&
                      (() => {
                        let e = eS.find((e) => e._id === sq);
                        if (!e) return null;
                        let t =
                            e.flows?.map((e) =>
                              "object" == typeof e.flowId && null !== e.flowId
                                ? e.flowId._id
                                : e.flowId,
                            ) || [],
                          a = eS.filter(
                            (e) =>
                              "sales_code" === e.type &&
                              e.flows?.some((e) => {
                                let s =
                                  "object" == typeof e.flowId &&
                                  null !== e.flowId
                                    ? e.flowId._id
                                    : e.flowId;
                                return t.includes(s);
                              }),
                          );
                        return 0 === a.length
                          ? (0, s.jsx)("div", {
                              className:
                                "p-3 bg-slate-900/60 border border-white/10 rounded-lg",
                              children: (0, s.jsxs)("p", {
                                className: "text-[11px] text-slate-500",
                                children: [
                                  (0, s.jsx)(D.Tag, {
                                    size: 12,
                                    className: "inline mr-1",
                                  }),
                                  "Nenhum código de vendas vinculado a este link",
                                ],
                              }),
                            })
                          : (0, s.jsxs)("div", {
                              className:
                                "p-3 bg-[#00D9FF]/10 border border-[#00D9FF]/20 rounded-lg space-y-2",
                              children: [
                                (0, s.jsxs)("p", {
                                  className:
                                    "text-[11px] text-[#00D9FF] font-bold",
                                  children: [
                                    (0, s.jsx)(D.Tag, {
                                      size: 12,
                                      className: "inline mr-1",
                                    }),
                                    "Códigos de vendas vinculados a este link:",
                                  ],
                                }),
                                (0, s.jsx)("div", {
                                  className: "flex flex-wrap gap-2",
                                  children: a.map((e) =>
                                    (0, s.jsxs)(
                                      "button",
                                      {
                                        onClick: () => s8(e.slug),
                                        className:
                                          "inline-flex items-center gap-1 px-2 py-1 bg-[#00D9FF]/20 text-[#00D9FF] text-[10px] font-mono rounded border border-[#00D9FF]/30 hover:bg-[#00D9FF]/30 transition-all cursor-pointer",
                                        title: `Clique para usar: cv=${e.slug}`,
                                        children: [
                                          (0, s.jsxs)("code", {
                                            children: ["cv=", e.slug],
                                          }),
                                          (0, s.jsxs)("span", {
                                            className:
                                              "text-[9px] text-[#00D9FF]/70",
                                            children: ["(", e.name, ")"],
                                          }),
                                        ],
                                      },
                                      e._id,
                                    ),
                                  ),
                                }),
                                (0, s.jsx)("p", {
                                  className:
                                    "text-[9px] text-[#00D9FF]/70 mt-1",
                                  children:
                                    "💡 Clique em um código para adicionar automaticamente no campo abaixo",
                                }),
                              ],
                            });
                      })(),
                    (0, s.jsxs)("div", {
                      className: "grid grid-cols-2 gap-3",
                      children: [
                        (0, s.jsxs)("div", {
                          children: [
                            (0, s.jsx)("label", {
                              className:
                                "text-[10px] font-bold text-slate-500 uppercase tracking-wider",
                              children: "UTM Source",
                            }),
                            (0, s.jsx)(r.Input, {
                              value: sX,
                              onChange: (e) => sZ(e.target.value),
                              placeholder: "Ex: fonte",
                              className:
                                "mt-1.5 bg-slate-900/60 border-slate-700/50 text-sm h-9",
                            }),
                          ],
                        }),
                        (0, s.jsxs)("div", {
                          children: [
                            (0, s.jsx)("label", {
                              className:
                                "text-[10px] font-bold text-slate-500 uppercase tracking-wider",
                              children: "UTM Campaign",
                            }),
                            (0, s.jsx)(r.Input, {
                              value: sJ,
                              onChange: (e) => sQ(e.target.value),
                              placeholder: "Ex: campanha",
                              className:
                                "mt-1.5 bg-slate-900/60 border-slate-700/50 text-sm h-9",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, s.jsxs)("div", {
                      className: "grid grid-cols-2 gap-3",
                      children: [
                        (0, s.jsxs)("div", {
                          children: [
                            (0, s.jsx)("label", {
                              className:
                                "text-[10px] font-bold text-slate-500 uppercase tracking-wider",
                              children: "UTM Medium",
                            }),
                            (0, s.jsx)(r.Input, {
                              value: sY,
                              onChange: (e) => s0(e.target.value),
                              placeholder: "Ex: meio",
                              className:
                                "mt-1.5 bg-slate-900/60 border-slate-700/50 text-sm h-9",
                            }),
                          ],
                        }),
                        (0, s.jsxs)("div", {
                          children: [
                            (0, s.jsx)("label", {
                              className:
                                "text-[10px] font-bold text-slate-500 uppercase tracking-wider",
                              children: "UTM Content",
                            }),
                            (0, s.jsx)(r.Input, {
                              value: s1,
                              onChange: (e) => s2(e.target.value),
                              placeholder: "Ex: conteudo",
                              className:
                                "mt-1.5 bg-slate-900/60 border-slate-700/50 text-sm h-9",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, s.jsxs)("div", {
                      className: "grid grid-cols-2 gap-3",
                      children: [
                        (0, s.jsxs)("div", {
                          children: [
                            (0, s.jsx)("label", {
                              className:
                                "text-[10px] font-bold text-slate-500 uppercase tracking-wider",
                              children: "UTM Term",
                            }),
                            (0, s.jsx)(r.Input, {
                              value: s5,
                              onChange: (e) => s4(e.target.value),
                              placeholder: "Ex: termo",
                              className:
                                "mt-1.5 bg-black/30 border-white/10 text-sm h-9",
                            }),
                          ],
                        }),
                        (0, s.jsxs)("div", {
                          children: [
                            (0, s.jsx)("label", {
                              className:
                                "text-[10px] font-bold text-slate-500 uppercase tracking-wider",
                              children: "UTM ID",
                            }),
                            (0, s.jsx)(r.Input, {
                              value: s3,
                              onChange: (e) => s9(e.target.value),
                              placeholder: "Ex: id",
                              className:
                                "mt-1.5 bg-black/30 border-white/10 text-sm h-9",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, s.jsxs)("div", {
                      className: "grid grid-cols-2 gap-3",
                      children: [
                        (0, s.jsxs)("div", {
                          children: [
                            (0, s.jsx)("label", {
                              className:
                                "text-[10px] font-bold text-slate-500 uppercase tracking-wider",
                              children: "Código de Venda (Opcional)",
                            }),
                            (0, s.jsx)(r.Input, {
                              value: s6,
                              onChange: (e) => s8(e.target.value),
                              placeholder: "Ex: 123",
                              className:
                                "mt-1.5 bg-black/30 border-white/10 text-sm h-9",
                            }),
                          ],
                        }),
                        (0, s.jsxs)("div", {
                          children: [
                            (0, s.jsx)("label", {
                              className:
                                "text-[10px] font-bold text-slate-500 uppercase tracking-wider",
                              children: "Shark ID (Cloaker)",
                            }),
                            (0, s.jsx)(r.Input, {
                              value: s7,
                              onChange: (e) => te(e.target.value),
                              placeholder: "Ex: shk=sk_123",
                              className:
                                "mt-1.5 bg-black/30 border-white/10 text-sm h-9",
                            }),
                          ],
                        }),
                      ],
                    }),
                    sq &&
                      (() => {
                        let e = eS.find((e) => e._id === sq);
                        if (!e?.cloakerV2?.enabled || !(e.shk || e.ph))
                          return null;
                        let t = e.shk ? "shk" : "ph",
                          a = e.shk || e.ph;
                        return (0, s.jsxs)("div", {
                          className:
                            "flex items-start gap-2 p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg",
                          children: [
                            (0, s.jsx)(g.Check, {
                              size: 12,
                              className:
                                "text-emerald-400 mt-0.5 flex-shrink-0",
                            }),
                            (0, s.jsxs)("p", {
                              className: "text-[10px] text-emerald-400",
                              children: [
                                "O parâmetro ",
                                (0, s.jsxs)("strong", {
                                  children: [t, "=", a],
                                }),
                                " será adicionado automaticamente (Cloaker ativo).",
                              ],
                            }),
                          ],
                        });
                      })(),
                    (0, s.jsxs)("button", {
                      onClick: () => {
                        sq
                          ? ((tl.current = !0),
                            tt(ty()),
                            setTimeout(() => {
                              ta.current?.scrollIntoView({
                                behavior: "smooth",
                                block: "center",
                              });
                            }, 100))
                          : eb({
                              type: "error",
                              title: "Selecione um redirecionador",
                            });
                      },
                      className:
                        "relative w-full py-2.5 rounded-xl text-xs font-bold text-white transition-all cursor-pointer",
                      style: H.enterBtnStyle,
                      children: [
                        (0, s.jsx)("span", {
                          className:
                            "absolute inset-0 rounded-xl border border-[rgba(28,28,28,0.2)]",
                        }),
                        (0, s.jsx)("span", {
                          className: "relative z-10",
                          children: "Gerar Link",
                        }),
                      ],
                    }),
                    ts &&
                      (() => {
                        let e = eS.find((e) => e._id === sq);
                        if (!e) return null;
                        let t = e.fullUrl;
                        if ("phantoms" === th)
                          t = `https://phantoms.group/l/${e.slug}`;
                        else if ("default" !== th) {
                          let s = eD.find((e) => e._id === th);
                          s &&
                            "active" === s.status &&
                            (t = `https://${s.domain}/l/${e.slug}`);
                        }
                        let a = `${t}?${ts}`,
                          l = "utmify_meta" === sH || "FB" === sX,
                          i = "utmify_tiktok" === sH || "tiktok" === sX,
                          n = l || i ? ts : a,
                          o = "USAR ESTE LINK NO GERENCIADOR DE ANÚNCIOS";
                        return (
                          l
                            ? (o =
                                "USAR ESTE NOS PARÂMETROS DA URL NO FACEBOOK")
                            : i &&
                              (o = "USAR ESTE NOS PARÂMETROS DA URL NO TIKTOK"),
                          (0, s.jsxs)("div", {
                            ref: ta,
                            className: "space-y-3",
                            children: [
                              (0, s.jsxs)("div", {
                                className:
                                  "p-3 bg-[#00D9FF]/10 border border-[#00D9FF]/20 rounded-xl",
                                children: [
                                  (0, s.jsxs)("div", {
                                    className: "flex items-center gap-2 mb-2",
                                    children: [
                                      (0, s.jsx)(E.Globe, {
                                        size: 12,
                                        className: "text-[#00D9FF]",
                                      }),
                                      (0, s.jsx)("label", {
                                        className:
                                          "text-[10px] font-bold text-[#00D9FF] uppercase tracking-wider",
                                        children:
                                          "Usar este na URL do site no gerenciador de anúncios",
                                      }),
                                    ],
                                  }),
                                  (0, s.jsxs)("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                      (0, s.jsx)(r.Input, {
                                        value: t,
                                        readOnly: !0,
                                        className:
                                          "bg-black/30 border-[#00D9FF]/30 text-white text-[10px] font-mono h-8",
                                      }),
                                      (0, s.jsxs)("button", {
                                        onClick: () => tk(t),
                                        className:
                                          "relative p-2 rounded-lg text-white transition-all cursor-pointer",
                                        style: H.enterBtnStyle,
                                        children: [
                                          (0, s.jsx)("span", {
                                            className:
                                              "absolute inset-0 rounded-lg border border-[rgba(28,28,28,0.2)]",
                                          }),
                                          (0, s.jsx)("span", {
                                            className: "relative z-10",
                                            children: (0, s.jsx)(c.Copy, {
                                              size: 14,
                                            }),
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, s.jsxs)("div", {
                                className:
                                  "p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl",
                                children: [
                                  (0, s.jsxs)("div", {
                                    className: "flex items-center gap-2 mb-2",
                                    children: [
                                      (0, s.jsx)(g.Check, {
                                        size: 12,
                                        className: "text-emerald-400",
                                      }),
                                      (0, s.jsx)("label", {
                                        className:
                                          "text-[10px] font-bold text-emerald-400 uppercase tracking-wider",
                                        children: o,
                                      }),
                                    ],
                                  }),
                                  (0, s.jsxs)("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                      (0, s.jsx)(r.Input, {
                                        value: n,
                                        readOnly: !0,
                                        className:
                                          "bg-slate-900/60 border-emerald-500/30 text-white text-[10px] font-mono h-8",
                                      }),
                                      (0, s.jsx)("button", {
                                        onClick: () => tk(n),
                                        className:
                                          "p-2 bg-emerald-500 rounded-lg text-white hover:bg-emerald-600 transition-all cursor-pointer",
                                        children: (0, s.jsx)(c.Copy, {
                                          size: 14,
                                        }),
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, s.jsxs)("div", {
                                className:
                                  "p-3 bg-slate-900/60 rounded-xl border border-white/5",
                                children: [
                                  (0, s.jsxs)("div", {
                                    className: "flex items-center gap-2 mb-2",
                                    children: [
                                      (0, s.jsx)(w.AlertTriangle, {
                                        size: 12,
                                        className: "text-amber-400",
                                      }),
                                      (0, s.jsx)("label", {
                                        className:
                                          "text-[10px] font-bold text-amber-400 uppercase tracking-wider",
                                        children:
                                          "Link Completo - Apenas para Debug",
                                      }),
                                    ],
                                  }),
                                  (0, s.jsx)("p", {
                                    className: "text-[9px] text-slate-500 mb-2",
                                    children:
                                      "Não usar no gerenciador de anúncios! Use os links acima.",
                                  }),
                                  (0, s.jsxs)("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                      (0, s.jsx)(r.Input, {
                                        value: a,
                                        readOnly: !0,
                                        className:
                                          "bg-slate-800/60 border-slate-700/50 text-slate-400 text-[10px] font-mono h-8",
                                      }),
                                      (0, s.jsx)("button", {
                                        onClick: () => tk(a),
                                        className:
                                          "p-2 bg-slate-700 rounded-lg text-slate-400 hover:bg-slate-600 transition-all cursor-pointer",
                                        children: (0, s.jsx)(c.Copy, {
                                          size: 14,
                                        }),
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          })
                        );
                      })(),
                  ],
                }),
              ],
            }),
          "dominio-proprio" === eg &&
            (0, s.jsxs)("div", {
              className: "max-w-3xl space-y-6",
              children: [
                (0, s.jsxs)(W.GlowCard, {
                  className: "overflow-hidden",
                  noPadding: !0,
                  children: [
                    (0, s.jsx)("div", {
                      className: "px-5 py-4 border-b border-white/5",
                      children: (0, s.jsxs)("div", {
                        className: "flex items-center gap-3",
                        children: [
                          (0, s.jsx)("div", {
                            className:
                              "w-10 h-10 rounded-lg bg-white/[0.02] flex items-center justify-center border border-white/10",
                            children: (0, s.jsx)(E.Globe, {
                              size: 18,
                              className: "text-[#00D9FF]",
                            }),
                          }),
                          (0, s.jsxs)("div", {
                            children: [
                              (0, s.jsx)("h2", {
                                className: "text-base font-bold text-white",
                                children: "Adicionar Domínio Próprio",
                              }),
                              (0, s.jsx)("p", {
                                className: "text-xs text-slate-500",
                                children:
                                  "Use seu próprio domínio para links de redirecionamento",
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                    (0, s.jsxs)("div", {
                      className: "p-5 space-y-4",
                      children: [
                        !ez &&
                          (0, s.jsxs)("div", {
                            className:
                              "p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-2",
                            children: [
                              (0, s.jsx)(R.AlertCircle, {
                                size: 16,
                                className:
                                  "text-amber-400 mt-0.5 flex-shrink-0",
                              }),
                              (0, s.jsx)("p", {
                                className: "text-xs text-amber-400",
                                children:
                                  "O serviço de domínios customizados não está configurado. Entre em contato com o suporte.",
                              }),
                            ],
                          }),
                        (0, s.jsxs)("div", {
                          className: "flex items-center gap-3",
                          children: [
                            (0, s.jsx)(r.Input, {
                              value: tr,
                              onChange: (e) => ti(e.target.value),
                              placeholder:
                                "Ex: seusite.com ou links.seusite.com",
                              className:
                                "bg-black/30 border-white/10 backdrop-blur-sm text-white text-sm h-10 flex-1",
                              disabled: !ez,
                            }),
                            (0, s.jsxs)("button", {
                              onClick: tj,
                              disabled: tn || !ez,
                              className:
                                "relative px-4 py-2.5 rounded-lg text-sm font-bold text-white transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2",
                              style: H.enterBtnStyle,
                              children: [
                                (0, s.jsx)("span", {
                                  className:
                                    "absolute inset-0 rounded-lg border border-[rgba(28,28,28,0.2)]",
                                }),
                                (0, s.jsxs)("span", {
                                  className:
                                    "relative z-10 flex items-center gap-2",
                                  children: [
                                    tn
                                      ? (0, s.jsx)(b.Loader2, {
                                          size: 16,
                                          className: "animate-spin",
                                        })
                                      : (0, s.jsx)(N.Plus, {
                                          size: 16,
                                        }),
                                    "Adicionar",
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, s.jsxs)("div", {
                          className:
                            "p-3 bg-slate-900/60 rounded-lg border border-white/5 space-y-2",
                          children: [
                            (0, s.jsxs)("p", {
                              className: "text-xs text-slate-400",
                              children: [
                                (0, s.jsx)("strong", {
                                  className: "text-white",
                                  children: "Como funciona:",
                                }),
                                " Após adicionar o domínio, configure um registro CNAME no DNS apontando para ",
                                (0, s.jsx)("code", {
                                  className:
                                    "bg-slate-800 px-1.5 py-0.5 rounded text-[#00D9FF]",
                                  children: e_,
                                }),
                              ],
                            }),
                            (0, s.jsxs)("p", {
                              className: "text-xs text-slate-500",
                              children: [
                                (0, s.jsx)("strong", {
                                  className: "text-slate-400",
                                  children: "Domínios raiz (ex: seusite.com):",
                                }),
                                ' Use CNAME com nome "@" se seu DNS suportar CNAME Flattening (Cloudflare, Route53) ou ALIAS/ANAME',
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, s.jsxs)(W.GlowCard, {
                  className: "overflow-hidden",
                  noPadding: !0,
                  children: [
                    (0, s.jsx)("div", {
                      className: "px-5 py-4 border-b border-white/5",
                      children: (0, s.jsx)("div", {
                        className: "flex items-center justify-between",
                        children: (0, s.jsxs)("h2", {
                          className: "text-sm font-bold text-white",
                          children: ["Domínios (", eD.length, ")"],
                        }),
                      }),
                    }),
                    (0, s.jsx)("div", {
                      className: "divide-y divide-white/5",
                      children: eN
                        ? (0, s.jsxs)("div", {
                            className: "p-8 text-center",
                            children: [
                              (0, s.jsx)(b.Loader2, {
                                size: 24,
                                className:
                                  "animate-spin text-[#00D9FF] mx-auto mb-2",
                              }),
                              (0, s.jsx)("p", {
                                className: "text-xs text-slate-500",
                                children: "Carregando domínios...",
                              }),
                            ],
                          })
                        : 0 === eD.length
                          ? (0, s.jsxs)("div", {
                              className: "p-8 text-center",
                              children: [
                                (0, s.jsx)(E.Globe, {
                                  size: 32,
                                  className: "text-slate-600 mx-auto mb-2",
                                }),
                                (0, s.jsx)("p", {
                                  className: "text-sm text-slate-500",
                                  children: "Nenhum domínio cadastrado",
                                }),
                                (0, s.jsx)("p", {
                                  className: "text-xs text-slate-600",
                                  children:
                                    "Adicione seu primeiro domínio acima",
                                }),
                              ],
                            })
                          : eD.map((e) => {
                              let t, a, r;
                              return (0, s.jsxs)(
                                "div",
                                {
                                  className:
                                    "p-4 hover:bg-slate-900/30 transition-colors",
                                  children: [
                                    (0, s.jsxs)("div", {
                                      className:
                                        "flex items-center justify-between",
                                      children: [
                                        (0, s.jsxs)("div", {
                                          className: "flex items-center gap-3",
                                          children: [
                                            (0, s.jsx)("div", {
                                              className: (0, O.cn)(
                                                "w-8 h-8 rounded-lg flex items-center justify-center border",
                                                "active" === e.status
                                                  ? "bg-emerald-500/10 border-emerald-500/20"
                                                  : "pending" === e.status
                                                    ? "bg-amber-500/10 border-amber-500/20"
                                                    : "bg-red-500/10 border-red-500/20",
                                              ),
                                              children:
                                                "active" === e.status
                                                  ? (0, s.jsx)(L.CheckCircle, {
                                                      size: 16,
                                                      className:
                                                        "text-emerald-400",
                                                    })
                                                  : "pending" === e.status
                                                    ? (0, s.jsx)(U.Clock, {
                                                        size: 16,
                                                        className:
                                                          "text-amber-400",
                                                      })
                                                    : (0, s.jsx)(
                                                        R.AlertCircle,
                                                        {
                                                          size: 16,
                                                          className:
                                                            "text-red-400",
                                                        },
                                                      ),
                                            }),
                                            (0, s.jsxs)("div", {
                                              children: [
                                                (0, s.jsx)("p", {
                                                  className:
                                                    "text-sm font-medium text-white",
                                                  children: e.domain,
                                                }),
                                                (0, s.jsxs)("div", {
                                                  className:
                                                    "flex items-center gap-2 mt-0.5",
                                                  children: [
                                                    (0, s.jsx)("span", {
                                                      className: (0, O.cn)(
                                                        "text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded",
                                                        "active" === e.status
                                                          ? "text-emerald-400 bg-emerald-500/10"
                                                          : "pending" ===
                                                              e.status
                                                            ? "text-amber-400 bg-amber-500/10"
                                                            : "text-red-400 bg-red-500/10",
                                                      ),
                                                      children:
                                                        "active" === e.status
                                                          ? "Ativo"
                                                          : "pending" ===
                                                              e.status
                                                            ? "Pendente"
                                                            : "Erro",
                                                    }),
                                                    e.isGlobal &&
                                                      (0, s.jsx)("span", {
                                                        className:
                                                          "text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded text-cyan-400 bg-cyan-500/10",
                                                        children: "Global",
                                                      }),
                                                    "pending" === e.status &&
                                                      (0, s.jsxs)("span", {
                                                        className:
                                                          "text-[10px] text-slate-500",
                                                        children: [
                                                          "CNAME → ",
                                                          e_,
                                                        ],
                                                      }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        (0, s.jsxs)("div", {
                                          className: "flex items-center gap-2",
                                          children: [
                                            "active" !== e.status &&
                                              !e.isGlobal &&
                                              (0, s.jsxs)("button", {
                                                onClick: () => tf(e._id),
                                                disabled: td === e._id,
                                                className:
                                                  "px-3 py-1.5 bg-slate-800 rounded-lg text-xs font-medium text-white hover:bg-slate-700 transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5",
                                                children: [
                                                  td === e._id
                                                    ? (0, s.jsx)(b.Loader2, {
                                                        size: 12,
                                                        className:
                                                          "animate-spin",
                                                      })
                                                    : (0, s.jsx)(f.RefreshCw, {
                                                        size: 12,
                                                      }),
                                                  "Verificar",
                                                ],
                                              }),
                                            !e.isGlobal &&
                                              (0, s.jsx)("button", {
                                                onClick: () => {
                                                  var s;
                                                  let t;
                                                  return (
                                                    (s = e._id),
                                                    (t = eD.find(
                                                      (e) => e._id === s,
                                                    )),
                                                    void eu({
                                                      title: "Remover domínio",
                                                      description: `Tem certeza que deseja remover o dom\xednio "${t?.domain || ""}"? Esta a\xe7\xe3o n\xe3o pode ser desfeita.`,
                                                      confirmLabel: "Remover",
                                                      cancelLabel: "Cancelar",
                                                      onConfirm: async () => {
                                                        tm(s);
                                                        try {
                                                          let e = await fetch(
                                                            `/api/custom-domains/${s}`,
                                                            {
                                                              method: "DELETE",
                                                              credentials:
                                                                "include",
                                                            },
                                                          );
                                                          if (!e.ok) {
                                                            let s =
                                                              await e.json();
                                                            throw Error(
                                                              s.error ||
                                                                "Erro ao remover domínio",
                                                            );
                                                          }
                                                          (ey(),
                                                            (0,
                                                            l.invalidateGroup)(
                                                              "domains",
                                                            ),
                                                            eb({
                                                              type: "success",
                                                              title:
                                                                "Domínio removido",
                                                            }));
                                                        } catch (e) {
                                                          eb({
                                                            type: "error",
                                                            title:
                                                              e instanceof Error
                                                                ? e.message
                                                                : "Erro ao remover",
                                                          });
                                                        } finally {
                                                          tm(null);
                                                        }
                                                      },
                                                    })
                                                  );
                                                },
                                                disabled: tx === e._id,
                                                className:
                                                  "p-1.5 bg-slate-800 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer disabled:opacity-50",
                                                children:
                                                  tx === e._id
                                                    ? (0, s.jsx)(b.Loader2, {
                                                        size: 14,
                                                        className:
                                                          "animate-spin",
                                                      })
                                                    : (0, s.jsx)(h.Trash2, {
                                                        size: 14,
                                                      }),
                                              }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    "active" !== e.status &&
                                      !e.isGlobal &&
                                      ((a = (t =
                                        1 ===
                                        (e.domain.match(/\./g) || []).length)
                                        ? "@"
                                        : e.domain.split(".")[0]),
                                      (r = (e, s) => {
                                        (navigator.clipboard.writeText(e),
                                          eb({
                                            type: "success",
                                            title: `${s} copiado!`,
                                          }));
                                      }),
                                      (0, s.jsxs)("div", {
                                        className: "mt-3 space-y-2",
                                        children: [
                                          (0, s.jsxs)("div", {
                                            className:
                                              "p-3 bg-slate-900/60 rounded-lg border border-white/5",
                                            children: [
                                              (0, s.jsx)("p", {
                                                className:
                                                  "text-xs text-slate-400 mb-2",
                                                children: (0, s.jsx)("strong", {
                                                  className: "text-white",
                                                  children:
                                                    "1. Configure o CNAME no DNS do seu domínio:",
                                                }),
                                              }),
                                              (0, s.jsxs)("div", {
                                                className:
                                                  "grid grid-cols-3 gap-2 text-[10px] font-mono",
                                                children: [
                                                  (0, s.jsxs)("div", {
                                                    children: [
                                                      (0, s.jsx)("span", {
                                                        className:
                                                          "text-slate-500 block mb-1",
                                                        children: "Tipo",
                                                      }),
                                                      (0, s.jsx)("span", {
                                                        className:
                                                          "text-white bg-slate-800 px-2 py-1 rounded block",
                                                        children: "CNAME",
                                                      }),
                                                    ],
                                                  }),
                                                  (0, s.jsxs)("div", {
                                                    children: [
                                                      (0, s.jsx)("span", {
                                                        className:
                                                          "text-slate-500 block mb-1",
                                                        children: "Nome",
                                                      }),
                                                      (0, s.jsx)("span", {
                                                        className:
                                                          "text-white bg-slate-800 px-2 py-1 rounded block truncate",
                                                        children: a,
                                                      }),
                                                    ],
                                                  }),
                                                  (0, s.jsxs)("div", {
                                                    children: [
                                                      (0, s.jsx)("span", {
                                                        className:
                                                          "text-slate-500 block mb-1",
                                                        children: "Destino",
                                                      }),
                                                      (0, s.jsxs)("button", {
                                                        onClick: () =>
                                                          r(
                                                            e_,
                                                            "Destino CNAME",
                                                          ),
                                                        className:
                                                          "text-[#00D9FF] bg-slate-800 px-2 py-1 rounded flex items-center gap-1 hover:bg-slate-700 transition-colors cursor-pointer w-full",
                                                        children: [
                                                          (0, s.jsx)("span", {
                                                            className:
                                                              "truncate",
                                                            children: e_,
                                                          }),
                                                          (0, s.jsx)(c.Copy, {
                                                            size: 10,
                                                            className:
                                                              "shrink-0 opacity-60",
                                                          }),
                                                        ],
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                              t &&
                                                (0, s.jsx)("p", {
                                                  className:
                                                    "text-[10px] text-amber-400/80 mt-2",
                                                  children:
                                                    "Domínio raiz: Use CNAME Flattening (Cloudflare) ou ALIAS/ANAME se seu provedor suportar",
                                                }),
                                            ],
                                          }),
                                          e.ownershipVerification &&
                                            (0, s.jsxs)("div", {
                                              className:
                                                "p-3 bg-amber-500/5 rounded-lg border border-amber-500/15",
                                              children: [
                                                (0, s.jsxs)("p", {
                                                  className:
                                                    "text-xs text-slate-400 mb-2",
                                                  children: [
                                                    (0, s.jsx)("strong", {
                                                      className:
                                                        "text-amber-400",
                                                      children:
                                                        "2. Registro TXT de verificação de propriedade",
                                                    }),
                                                    (0, s.jsx)("span", {
                                                      className:
                                                        "text-slate-500 ml-1",
                                                      children:
                                                        "(obrigatório se o domínio usa Cloudflare)",
                                                    }),
                                                  ],
                                                }),
                                                (0, s.jsxs)("div", {
                                                  className:
                                                    "grid grid-cols-3 gap-2 text-[10px] font-mono",
                                                  children: [
                                                    (0, s.jsxs)("div", {
                                                      children: [
                                                        (0, s.jsx)("span", {
                                                          className:
                                                            "text-slate-500 block mb-1",
                                                          children: "Tipo",
                                                        }),
                                                        (0, s.jsx)("span", {
                                                          className:
                                                            "text-white bg-slate-800 px-2 py-1 rounded block",
                                                          children: "TXT",
                                                        }),
                                                      ],
                                                    }),
                                                    (0, s.jsxs)("div", {
                                                      children: [
                                                        (0, s.jsx)("span", {
                                                          className:
                                                            "text-slate-500 block mb-1",
                                                          children: "Nome",
                                                        }),
                                                        (0, s.jsxs)("button", {
                                                          onClick: () =>
                                                            r(
                                                              e
                                                                .ownershipVerification
                                                                .name,
                                                              "Nome TXT",
                                                            ),
                                                          className:
                                                            "text-white bg-slate-800 px-2 py-1 rounded flex items-center gap-1 hover:bg-slate-700 transition-colors cursor-pointer w-full",
                                                          children: [
                                                            (0, s.jsx)("span", {
                                                              className:
                                                                "truncate",
                                                              children:
                                                                e
                                                                  .ownershipVerification
                                                                  .name,
                                                            }),
                                                            (0, s.jsx)(c.Copy, {
                                                              size: 10,
                                                              className:
                                                                "shrink-0 opacity-60",
                                                            }),
                                                          ],
                                                        }),
                                                      ],
                                                    }),
                                                    (0, s.jsxs)("div", {
                                                      children: [
                                                        (0, s.jsx)("span", {
                                                          className:
                                                            "text-slate-500 block mb-1",
                                                          children: "Valor",
                                                        }),
                                                        (0, s.jsxs)("button", {
                                                          onClick: () =>
                                                            r(
                                                              e
                                                                .ownershipVerification
                                                                .value,
                                                              "Valor TXT",
                                                            ),
                                                          className:
                                                            "text-amber-400 bg-slate-800 px-2 py-1 rounded flex items-center gap-1 hover:bg-slate-700 transition-colors cursor-pointer w-full",
                                                          children: [
                                                            (0, s.jsx)("span", {
                                                              className:
                                                                "truncate",
                                                              children:
                                                                e
                                                                  .ownershipVerification
                                                                  .value,
                                                            }),
                                                            (0, s.jsx)(c.Copy, {
                                                              size: 10,
                                                              className:
                                                                "shrink-0 opacity-60",
                                                            }),
                                                          ],
                                                        }),
                                                      ],
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                        ],
                                      })),
                                    "active" === e.status &&
                                      (0, s.jsx)("div", {
                                        className:
                                          "mt-3 p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/10",
                                        children: (0, s.jsxs)("p", {
                                          className:
                                            "text-xs text-emerald-400 flex items-center gap-2",
                                          children: [
                                            (0, s.jsx)("span", {
                                              children: "Domínio ativo! Use",
                                            }),
                                            (0, s.jsxs)("button", {
                                              onClick: () => {
                                                (navigator.clipboard.writeText(
                                                  `https://${e.domain}`,
                                                ),
                                                  eb({
                                                    type: "success",
                                                    title: "URL copiada!",
                                                  }));
                                              },
                                              className:
                                                "bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center gap-1 hover:bg-emerald-500/20 transition-colors cursor-pointer",
                                              children: [
                                                (0, s.jsxs)("code", {
                                                  children: [
                                                    "https://",
                                                    e.domain,
                                                    "/seu-slug",
                                                  ],
                                                }),
                                                (0, s.jsx)(c.Copy, {
                                                  size: 10,
                                                  className: "opacity-60",
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      }),
                                    e.validationErrors &&
                                      e.validationErrors.length > 0 &&
                                      (0, s.jsxs)("div", {
                                        className:
                                          "mt-3 p-3 bg-red-500/5 rounded-lg border border-red-500/10",
                                        children: [
                                          (0, s.jsx)("p", {
                                            className:
                                              "text-xs text-red-400 font-medium mb-1",
                                            children: "Erros de validação:",
                                          }),
                                          (0, s.jsx)("ul", {
                                            className:
                                              "text-xs text-red-400/80 list-disc list-inside",
                                            children: e.validationErrors.map(
                                              (e, t) =>
                                                (0, s.jsx)(
                                                  "li",
                                                  {
                                                    children: e,
                                                  },
                                                  t,
                                                ),
                                            ),
                                          }),
                                        ],
                                      }),
                                  ],
                                },
                                e._id,
                              );
                            }),
                    }),
                  ],
                }),
              ],
            }),
          (0, s.jsx)(o.Dialog, {
            open: sd,
            onOpenChange: sc,
            children: (0, s.jsxs)(o.DialogContent, {
              className: "max-w-md bg-[#0B1121] border-white/10",
              children: [
                (0, s.jsxs)(o.DialogHeader, {
                  children: [
                    (0, s.jsxs)("div", {
                      className: "flex items-center gap-3 mb-2",
                      children: [
                        (0, s.jsx)("div", {
                          className:
                            "p-2 rounded-lg bg-red-500/10 border border-red-500/20",
                          children: (0, s.jsx)(w.AlertTriangle, {
                            size: 20,
                            className: "text-red-400",
                          }),
                        }),
                        (0, s.jsx)(o.DialogTitle, {
                          className: "text-white",
                          children: "Excluir Redirecionador",
                        }),
                      ],
                    }),
                    (0, s.jsxs)(o.DialogDescription, {
                      className: "text-slate-400",
                      children: [
                        "Tem certeza que deseja excluir ",
                        (0, s.jsxs)("strong", {
                          className: "text-white",
                          children: ['"', sx?.name, '"'],
                        }),
                        "?",
                      ],
                    }),
                  ],
                }),
                (0, s.jsxs)(o.DialogFooter, {
                  className: "gap-2 sm:gap-0",
                  children: [
                    (0, s.jsx)("button", {
                      onClick: () => sc(!1),
                      disabled: sh,
                      className:
                        "px-4 py-2.5 bg-transparent border border-slate-700/50 rounded-xl text-sm font-bold text-slate-300 hover:text-white hover:border-white/30 transition-all disabled:opacity-50 cursor-pointer",
                      children: "Cancelar",
                    }),
                    (0, s.jsxs)("button", {
                      onClick: tw,
                      disabled: sh,
                      className:
                        "px-4 py-2.5 bg-red-500 rounded-xl text-sm font-bold text-white hover:bg-red-600 transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer",
                      children: [
                        sh
                          ? (0, s.jsx)(b.Loader2, {
                              size: 14,
                              className: "animate-spin",
                            })
                          : (0, s.jsx)(h.Trash2, {
                              size: 14,
                            }),
                        "Excluir",
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
          (0, s.jsx)(o.Dialog, {
            open: sF,
            onOpenChange: sD,
            children: (0, s.jsxs)(o.DialogContent, {
              className:
                "max-w-3xl bg-[#0a0a0a]/95 backdrop-blur-xl border-white/10",
              children: [
                (0, s.jsx)(o.DialogHeader, {
                  children: (0, s.jsxs)("div", {
                    className: "flex items-center gap-3",
                    children: [
                      (0, s.jsx)("div", {
                        className:
                          "p-2 rounded-lg bg-[#06b6d4]/10 border border-[#06b6d4]/20",
                        children: (0, s.jsx)(S.BarChart3, {
                          size: 20,
                          className: "text-[#06b6d4]",
                        }),
                      }),
                      (0, s.jsx)(o.DialogTitle, {
                        className: "text-white text-base",
                        children: "Relatório de Performance",
                      }),
                    ],
                  }),
                }),
                s_ &&
                  ((e = s_.cloakerV2?.stats?.totalBlocked || 0),
                  (Q =
                    (J = e + (Z = s_.cloakerV2?.stats?.totalAllowed || 0)) > 0
                      ? ((Z / J) * 100).toFixed(1)
                      : "0.0"),
                  (Y = J > 0 ? ((e / J) * 100).toFixed(1) : "0.0"),
                  (ee = s_.cloakerV2?.recentBlocks || []),
                  (es = s_.cloakerV2?.stats?.antiSharingBlocked || 0),
                  (et = s_.cloakerV2?.stats?.antiCloneBlocked || 0),
                  (el = (ea = es > 0 || et > 0)
                    ? es
                    : ee.filter((e) =>
                        e.reason?.includes("Anti-Compartilhamento"),
                      ).length),
                  (er = ea
                    ? et
                    : ee.filter((e) => e.reason?.includes("Anti-clone"))
                        .length),
                  (ei = ea ? e - es - et : e - el - er),
                  (en = J > 0 ? (Z / J) * 360 : 0),
                  (eo = J > 0 ? (e / J) * 360 : 0),
                  (ec = (en / 360) * (ed = 2 * Math.PI * 60)),
                  (0, s.jsxs)("div", {
                    className: "space-y-4",
                    children: [
                      (0, s.jsxs)("div", {
                        className: "grid grid-cols-4 gap-3",
                        children: [
                          (0, s.jsxs)("div", {
                            className:
                              "p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center",
                            children: [
                              (0, s.jsx)("p", {
                                className:
                                  "text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2",
                                children: "Aprovação",
                              }),
                              (0, s.jsxs)("p", {
                                className: "text-2xl font-bold text-[#22c55e]",
                                children: [Q, "%"],
                              }),
                            ],
                          }),
                          (0, s.jsxs)("div", {
                            className:
                              "p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center",
                            children: [
                              (0, s.jsx)("p", {
                                className:
                                  "text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2",
                                children: "Bloqueios",
                              }),
                              (0, s.jsxs)("p", {
                                className: "text-2xl font-bold text-red-400",
                                children: [Y, "%"],
                              }),
                            ],
                          }),
                          (0, s.jsxs)("div", {
                            className:
                              "p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl flex flex-col items-center justify-center",
                            children: [
                              (0, s.jsx)("p", {
                                className:
                                  "text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2",
                                children: "Distribuição",
                              }),
                              (0, s.jsxs)("div", {
                                className: "relative w-20 h-20",
                                children: [
                                  (0, s.jsxs)("svg", {
                                    viewBox: "0 0 140 140",
                                    className: "w-full h-full -rotate-90",
                                    children: [
                                      (0, s.jsx)("circle", {
                                        cx: "70",
                                        cy: "70",
                                        r: 60,
                                        fill: "none",
                                        stroke: "rgba(255,255,255,0.05)",
                                        strokeWidth: "14",
                                      }),
                                      J > 0 &&
                                        (0, s.jsx)("circle", {
                                          cx: "70",
                                          cy: "70",
                                          r: 60,
                                          fill: "none",
                                          stroke: "#06b6d4",
                                          strokeWidth: "14",
                                          strokeDasharray: `${ec} ${ed}`,
                                          strokeDashoffset: "0",
                                          strokeLinecap: "round",
                                        }),
                                      J > 0 &&
                                        (0, s.jsx)("circle", {
                                          cx: "70",
                                          cy: "70",
                                          r: 60,
                                          fill: "none",
                                          stroke: "#ef4444",
                                          strokeWidth: "14",
                                          strokeDasharray: `${(eo / 360) * ed} ${ed}`,
                                          strokeDashoffset: `${-ec}`,
                                          strokeLinecap: "round",
                                        }),
                                    ],
                                  }),
                                  (0, s.jsxs)("div", {
                                    className:
                                      "absolute inset-0 flex flex-col items-center justify-center",
                                    children: [
                                      (0, s.jsx)("span", {
                                        className:
                                          "text-sm font-bold text-white",
                                        children: J,
                                      }),
                                      (0, s.jsx)("span", {
                                        className:
                                          "text-[8px] text-slate-500 uppercase",
                                        children: "Total",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, s.jsxs)("div", {
                            className:
                              "p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl",
                            children: [
                              (0, s.jsxs)("div", {
                                className: "flex items-center gap-1.5 mb-3",
                                children: [
                                  (0, s.jsx)(C.ShieldAlert, {
                                    size: 12,
                                    className: "text-red-400",
                                  }),
                                  (0, s.jsx)("p", {
                                    className:
                                      "text-[10px] text-slate-500 font-bold uppercase tracking-wider",
                                    children: "Filtro de Proteção",
                                  }),
                                ],
                              }),
                              (0, s.jsxs)("div", {
                                className: "space-y-2",
                                children: [
                                  ei > 0 &&
                                    (0, s.jsxs)("div", {
                                      className:
                                        "flex items-center justify-between",
                                      children: [
                                        (0, s.jsxs)("div", {
                                          className:
                                            "flex items-center gap-1.5",
                                          children: [
                                            (0, s.jsx)("div", {
                                              className:
                                                "w-1.5 h-1.5 rounded-full bg-red-400",
                                            }),
                                            (0, s.jsx)("span", {
                                              className:
                                                "text-[11px] text-slate-400",
                                              children: "Bots/Crawlers",
                                            }),
                                          ],
                                        }),
                                        (0, s.jsx)("span", {
                                          className:
                                            "text-xs font-bold text-white",
                                          children: ei,
                                        }),
                                      ],
                                    }),
                                  el > 0 &&
                                    (0, s.jsxs)("div", {
                                      className:
                                        "flex items-center justify-between",
                                      children: [
                                        (0, s.jsxs)("div", {
                                          className:
                                            "flex items-center gap-1.5",
                                          children: [
                                            (0, s.jsx)("div", {
                                              className:
                                                "w-1.5 h-1.5 rounded-full bg-[#8b5cf6]",
                                            }),
                                            (0, s.jsx)("span", {
                                              className:
                                                "text-[11px] text-slate-400",
                                              children: "Instagram/Social",
                                            }),
                                          ],
                                        }),
                                        (0, s.jsx)("span", {
                                          className:
                                            "text-xs font-bold text-white",
                                          children: el,
                                        }),
                                      ],
                                    }),
                                  er > 0 &&
                                    (0, s.jsxs)("div", {
                                      className:
                                        "flex items-center justify-between",
                                      children: [
                                        (0, s.jsxs)("div", {
                                          className:
                                            "flex items-center gap-1.5",
                                          children: [
                                            (0, s.jsx)("div", {
                                              className:
                                                "w-1.5 h-1.5 rounded-full bg-amber-400",
                                            }),
                                            (0, s.jsx)("span", {
                                              className:
                                                "text-[11px] text-slate-400",
                                              children: "Anti-Clone",
                                            }),
                                          ],
                                        }),
                                        (0, s.jsx)("span", {
                                          className:
                                            "text-xs font-bold text-white",
                                          children: er,
                                        }),
                                      ],
                                    }),
                                  0 === ee.length &&
                                    (0, s.jsx)("p", {
                                      className: "text-[10px] text-slate-600",
                                      children: "Nenhum bloqueio ainda",
                                    }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, s.jsxs)("div", {
                        className: "grid grid-cols-2 gap-3",
                        children: [
                          (0, s.jsxs)("div", {
                            className:
                              "bg-white/[0.03] border border-white/[0.06] rounded-xl p-4",
                            children: [
                              (0, s.jsx)("h4", {
                                className:
                                  "text-xs font-bold text-red-400 mb-3 uppercase tracking-wider",
                                children: "Últimos Bloqueios",
                              }),
                              ee.length > 0
                                ? (0, s.jsx)("div", {
                                    className:
                                      "max-h-52 overflow-y-auto space-y-1.5",
                                    children: ee
                                      .slice()
                                      .reverse()
                                      .map((e, t) =>
                                        (0, s.jsxs)(
                                          "div",
                                          {
                                            className:
                                              "flex items-center gap-3 p-2 bg-black/30 rounded-lg border border-white/5",
                                            children: [
                                              (0, s.jsx)("div", {
                                                className: (0, O.cn)(
                                                  "w-1.5 h-8 rounded-full flex-shrink-0",
                                                  e.reason?.includes(
                                                    "Anti-Compartilhamento",
                                                  )
                                                    ? "bg-[#8b5cf6]"
                                                    : e.reason?.includes(
                                                          "Anti-clone",
                                                        )
                                                      ? "bg-amber-400"
                                                      : "bg-red-400",
                                                ),
                                              }),
                                              (0, s.jsxs)("div", {
                                                className: "flex-1 min-w-0",
                                                children: [
                                                  (0, s.jsxs)("div", {
                                                    className:
                                                      "flex items-center justify-between",
                                                    children: [
                                                      (0, s.jsx)("p", {
                                                        className:
                                                          "text-[11px] text-white font-medium truncate",
                                                        children: e.reason,
                                                      }),
                                                      (0, s.jsx)("span", {
                                                        className:
                                                          "text-[10px] text-slate-600 flex-shrink-0 ml-2",
                                                        children: new Date(
                                                          e.blockedAt,
                                                        ).toLocaleString(
                                                          "pt-BR",
                                                          {
                                                            day: "2-digit",
                                                            month: "2-digit",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                          },
                                                        ),
                                                      }),
                                                    ],
                                                  }),
                                                  (0, s.jsxs)("div", {
                                                    className:
                                                      "flex items-center gap-3",
                                                    children: [
                                                      (0, s.jsxs)("span", {
                                                        className:
                                                          "text-[10px] text-slate-500 font-mono",
                                                        children: [
                                                          "IP: ",
                                                          e.ip,
                                                        ],
                                                      }),
                                                      (0, s.jsxs)("span", {
                                                        className:
                                                          "text-[10px] text-amber-400/70 font-bold",
                                                        children: [
                                                          "Score: ",
                                                          e.score,
                                                        ],
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                            ],
                                          },
                                          t,
                                        ),
                                      ),
                                  })
                                : (0, s.jsx)("div", {
                                    className: "p-4 text-center",
                                    children: (0, s.jsx)("p", {
                                      className: "text-xs text-slate-600",
                                      children:
                                        "Nenhum bloqueio registrado ainda",
                                    }),
                                  }),
                            ],
                          }),
                          (0, s.jsxs)("div", {
                            className:
                              "bg-white/[0.03] border border-white/[0.06] rounded-xl p-4",
                            children: [
                              (0, s.jsx)("h4", {
                                className:
                                  "text-xs font-bold text-[#22c55e] mb-3 uppercase tracking-wider",
                                children: "Últimos Aprovados",
                              }),
                              sA
                                ? (0, s.jsx)("div", {
                                    className: "p-4 text-center",
                                    children: (0, s.jsx)("p", {
                                      className: "text-xs text-slate-600",
                                      children: "Carregando...",
                                    }),
                                  })
                                : sE.length > 0
                                  ? (0, s.jsx)("div", {
                                      className:
                                        "max-h-52 overflow-y-auto space-y-1.5",
                                      children: sE.map((e, t) =>
                                        (0, s.jsxs)(
                                          "div",
                                          {
                                            className:
                                              "flex items-center gap-3 p-2 bg-black/30 rounded-lg border border-white/5",
                                            children: [
                                              (0, s.jsx)("div", {
                                                className: (0, O.cn)(
                                                  "w-1.5 h-8 rounded-full flex-shrink-0",
                                                  e.used
                                                    ? "bg-[#22c55e]"
                                                    : "bg-[#06b6d4]",
                                                ),
                                              }),
                                              (0, s.jsxs)("div", {
                                                className: "flex-1 min-w-0",
                                                children: [
                                                  (0, s.jsxs)("div", {
                                                    className:
                                                      "flex items-center justify-between",
                                                    children: [
                                                      (0, s.jsxs)("p", {
                                                        className:
                                                          "text-[11px] text-white font-medium truncate",
                                                        children: [
                                                          e.device ||
                                                            "Desconhecido",
                                                          e.country
                                                            ? ` \xb7 ${e.country}`
                                                            : "",
                                                        ],
                                                      }),
                                                      (0, s.jsx)("span", {
                                                        className:
                                                          "text-[10px] text-slate-600 flex-shrink-0 ml-2",
                                                        children: new Date(
                                                          e.createdAt,
                                                        ).toLocaleString(
                                                          "pt-BR",
                                                          {
                                                            day: "2-digit",
                                                            month: "2-digit",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                          },
                                                        ),
                                                      }),
                                                    ],
                                                  }),
                                                  (0, s.jsxs)("div", {
                                                    className:
                                                      "flex items-center gap-3",
                                                    children: [
                                                      (0, s.jsxs)("span", {
                                                        className:
                                                          "text-[10px] text-slate-500 font-mono",
                                                        children: [
                                                          "IP: ",
                                                          e.ip,
                                                        ],
                                                      }),
                                                      e.used &&
                                                        (0, s.jsx)("span", {
                                                          className:
                                                            "text-[10px] text-[#22c55e] font-bold",
                                                          children:
                                                            "Virou lead",
                                                        }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                            ],
                                          },
                                          t,
                                        ),
                                      ),
                                    })
                                  : (0, s.jsx)("div", {
                                      className: "p-4 text-center",
                                      children: (0, s.jsx)("p", {
                                        className: "text-xs text-slate-600",
                                        children:
                                          "Nenhum aprovado registrado ainda",
                                      }),
                                    }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  })),
                (0, s.jsx)(o.DialogFooter, {
                  children: (0, s.jsx)("button", {
                    onClick: () => sD(!1),
                    className:
                      "px-4 py-2.5 bg-slate-800 rounded-xl text-sm font-bold text-white hover:bg-slate-700 transition-all cursor-pointer",
                    children: "Fechar",
                  }),
                }),
              ],
            }),
          }),
          (0, s.jsx)(o.Dialog, {
            open: sL,
            onOpenChange: sU,
            children: (0, s.jsxs)(o.DialogContent, {
              className:
                "max-w-6xl max-h-[90vh] bg-[#0a0a0a] border-white/10 p-0 gap-0",
              children: [
                (0, s.jsx)(o.DialogHeader, {
                  className: "px-6 pt-5 pb-4 border-b border-white/5",
                  children: (0, s.jsxs)("div", {
                    className: "flex items-center gap-3",
                    children: [
                      (0, s.jsx)("div", {
                        className:
                          "p-2 rounded-lg bg-purple-500/10 border border-purple-500/20",
                        children: (0, s.jsx)(y.Shield, {
                          size: 20,
                          className: "text-purple-400",
                        }),
                      }),
                      (0, s.jsxs)("div", {
                        className: "flex-1",
                        children: [
                          (0, s.jsxs)("div", {
                            className: "flex items-center gap-2",
                            children: [
                              (0, s.jsx)(o.DialogTitle, {
                                children: "Camuflagem",
                              }),
                              sR?.cloakerV2?.blockMethod &&
                                (0, s.jsx)("span", {
                                  className:
                                    "px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-400 uppercase",
                                  children:
                                    "safepage" === sR.cloakerV2.blockMethod
                                      ? "Safe Page"
                                      : "mirror" === sR.cloakerV2.blockMethod
                                        ? "Espelho"
                                        : "Redirect",
                                }),
                            ],
                          }),
                          (0, s.jsx)(o.DialogDescription, {
                            children:
                              "Pre-visualizacao do que cada visitante ve",
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                sR &&
                  (0, s.jsx)("div", {
                    className: "flex-1 overflow-hidden",
                    children: (0, s.jsxs)("div", {
                      className: "grid grid-cols-1 md:grid-cols-2 h-[65vh]",
                      children: [
                        (0, s.jsxs)("div", {
                          className: "flex flex-col border-r border-white/5",
                          children: [
                            (0, s.jsxs)("div", {
                              className:
                                "px-4 py-3 border-b border-white/5 flex items-center justify-between bg-slate-900/40",
                              children: [
                                (0, s.jsxs)("div", {
                                  children: [
                                    (0, s.jsxs)("div", {
                                      className: "flex items-center gap-2",
                                      children: [
                                        (0, s.jsx)(y.Shield, {
                                          size: 14,
                                          className: "text-slate-400",
                                        }),
                                        (0, s.jsx)("span", {
                                          className:
                                            "text-sm font-bold text-white",
                                          children: "Pagina Segura",
                                        }),
                                      ],
                                    }),
                                    (0, s.jsx)("p", {
                                      className:
                                        "text-[10px] text-slate-500 mt-0.5 ml-6",
                                      children: "O que bots e moderadores veem",
                                    }),
                                  ],
                                }),
                                (0, s.jsxs)("button", {
                                  onClick: () => {
                                    let e = sR.fullUrl.includes("?")
                                      ? "&"
                                      : "?";
                                    window.open(
                                      `${sR.fullUrl}${e}_sp=1`,
                                      "_blank",
                                    );
                                  },
                                  className:
                                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00D9FF]/10 border border-[#00D9FF]/20 text-[#00D9FF] text-[11px] font-bold hover:bg-[#00D9FF]/20 transition-all cursor-pointer",
                                  children: [
                                    "Abrir em nova aba",
                                    (0, s.jsx)(x.ExternalLink, {
                                      size: 12,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, s.jsx)("div", {
                              className: "flex-1 overflow-hidden bg-white",
                              children:
                                ((ex = sR.fullUrl.includes("?") ? "&" : "?"),
                                (em = `${sR.fullUrl}${ex}_sp=1`),
                                (0, s.jsx)("iframe", {
                                  src: em,
                                  className: "w-full h-full border-0",
                                  sandbox:
                                    "allow-same-origin allow-scripts allow-popups",
                                  title: "Safe Page",
                                })),
                            }),
                          ],
                        }),
                        (0, s.jsxs)("div", {
                          className: "flex flex-col",
                          children: [
                            (0, s.jsxs)("div", {
                              className:
                                "px-4 py-3 border-b border-white/5 flex items-center justify-between bg-slate-900/40",
                              children: [
                                (0, s.jsxs)("div", {
                                  children: [
                                    (0, s.jsxs)("div", {
                                      className: "flex items-center gap-2",
                                      children: [
                                        (0, s.jsx)(k.Zap, {
                                          size: 14,
                                          className: "text-emerald-400",
                                        }),
                                        (0, s.jsx)("span", {
                                          className:
                                            "text-sm font-bold text-white",
                                          children: "Pagina da Oferta",
                                        }),
                                      ],
                                    }),
                                    (0, s.jsx)("p", {
                                      className:
                                        "text-[10px] text-slate-500 mt-0.5 ml-6",
                                      children: "O que leads reais veem",
                                    }),
                                  ],
                                }),
                                (0, s.jsxs)("button", {
                                  onClick: () => {
                                    let e = sR.shk ? "shk" : "ph",
                                      s = sR.shk || sR.ph || "",
                                      t = sR.fullUrl.includes("?") ? "&" : "?";
                                    window.open(
                                      `${sR.fullUrl}${t}${e}=${s}`,
                                      "_blank",
                                    );
                                  },
                                  className:
                                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold hover:bg-emerald-500/20 transition-all cursor-pointer",
                                  children: [
                                    "Abrir em nova aba",
                                    (0, s.jsx)(x.ExternalLink, {
                                      size: 12,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, s.jsx)("div", {
                              className: "flex-1 overflow-hidden",
                              children:
                                ((eh = sR.fullUrl.includes("?") ? "&" : "?"),
                                (ep = `${sR.fullUrl}${eh}_bp=1`),
                                (0, s.jsx)("iframe", {
                                  src: ep,
                                  className: "w-full h-full border-0",
                                  sandbox:
                                    "allow-same-origin allow-scripts allow-popups",
                                  title: "Black Page",
                                })),
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
              ],
            }),
          }),
        ],
      });
    }
    e.s(["default", () => Z], 54006);
  },
]);
