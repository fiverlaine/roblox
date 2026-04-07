(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  557862,
  (e) => {
    "use strict";
    var t = e.i(843476),
      s = e.i(500932),
      a = e.i(657688),
      l = e.i(271645),
      i = e.i(618566),
      r = e.i(871689),
      o = e.i(356909),
      n = e.i(531278),
      c = e.i(107233),
      d = e.i(727612),
      h = e.i(569074),
      x = e.i(778917),
      m = e.i(750570),
      u = e.i(286536),
      b = e.i(248256),
      p = e.i(647780),
      g = e.i(284614),
      f = e.i(221345),
      w = e.i(473708),
      v = e.i(555436),
      j = e.i(791583),
      y = e.i(706399),
      N = e.i(643531),
      k = e.i(37727),
      C = e.i(201928),
      S = e.i(531245),
      _ = e.i(194983),
      T = e.i(975157),
      z = e.i(673635);
    let U = [
        {
          id: "profile",
          label: "Perfil",
          icon: (0, t.jsx)(g.User, {
            size: 16,
          }),
        },
        {
          id: "buttons",
          label: "Botoes",
          icon: (0, t.jsx)(f.Link, {
            size: 16,
          }),
        },
        {
          id: "highlights",
          label: "Destaques",
          icon: (0, t.jsx)(w.Image, {
            size: 16,
          }),
        },
        {
          id: "theme",
          label: "Tema",
          icon: (0, t.jsx)(p.Palette, {
            size: 16,
          }),
        },
        {
          id: "domain",
          label: "Dominio",
          icon: (0, t.jsx)(b.Globe, {
            size: 16,
          }),
        },
        {
          id: "seo",
          label: "SEO",
          icon: (0, t.jsx)(v.Search, {
            size: 16,
          }),
        },
      ],
      B = [
        {
          id: "instagram",
          label: "Instagram",
          placeholder: "https://instagram.com/usuario",
        },
        {
          id: "tiktok",
          label: "TikTok",
          placeholder: "https://tiktok.com/@usuario",
        },
        {
          id: "twitter",
          label: "X (Twitter)",
          placeholder: "https://x.com/usuario",
        },
        {
          id: "youtube",
          label: "YouTube",
          placeholder: "https://youtube.com/@usuario",
        },
        {
          id: "telegram",
          label: "Telegram",
          placeholder: "https://t.me/usuario",
        },
        {
          id: "whatsapp",
          label: "WhatsApp",
          placeholder: "https://wa.me/5511999999999",
        },
        {
          id: "onlyfans",
          label: "OnlyFans",
          placeholder: "https://onlyfans.com/usuario",
        },
        {
          id: "privacy",
          label: "Privacy",
          placeholder: "https://privacy.com.br/usuario",
        },
      ],
      E = [
        {
          id: "external",
          label: "Link Externo",
          icon: (0, t.jsx)(x.ExternalLink, {
            size: 14,
          }),
        },
        {
          id: "checkout",
          label: "Checkout",
          icon: (0, t.jsx)(C.ShoppingCart, {
            size: 14,
          }),
        },
        {
          id: "bot",
          label: "Bot Telegram",
          icon: (0, t.jsx)(S.Bot, {
            size: 14,
          }),
        },
        {
          id: "whatsapp",
          label: "WhatsApp",
          icon: (0, t.jsx)(_.MessageCircle, {
            size: 14,
          }),
        },
      ],
      L = ["Inter", "Poppins", "Roboto", "Montserrat"],
      F = [
        {
          id: "rounded",
          label: "Arredondado",
        },
        {
          id: "pill",
          label: "Pill",
        },
        {
          id: "square",
          label: "Quadrado",
        },
        {
          id: "outline",
          label: "Outline",
        },
      ];
    function D(e) {
      let i,
        r,
        o,
        n,
        c,
        d,
        x,
        m,
        u,
        b,
        p,
        f,
        w,
        v,
        N,
        k,
        C,
        S,
        _,
        T,
        z = (0, s.c)(43),
        { biolink: U, updateField: E, onUploadAvatar: L } = e,
        F = (0, l.useRef)(null);
      return (
        z[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((i = (0, t.jsx)("label", {
              className: "text-sm text-white/60 font-medium mb-3 block",
              children: "Avatar",
            })),
            (z[0] = i))
          : (i = z[0]),
        z[1] !== U.profile.avatarUrl
          ? ((r = U.profile.avatarUrl
              ? (0, t.jsx)(a.default, {
                  src: U.profile.avatarUrl,
                  alt: "",
                  width: 80,
                  height: 80,
                  className:
                    "w-20 h-20 rounded-full object-cover border border-white/10",
                  unoptimized: !0,
                })
              : (0, t.jsx)("div", {
                  className:
                    "w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center",
                  children: (0, t.jsx)(g.User, {
                    size: 28,
                    className: "text-white/30",
                  }),
                })),
            (z[1] = U.profile.avatarUrl),
            (z[2] = r))
          : (r = z[2]),
        z[3] === Symbol.for("react.memo_cache_sentinel")
          ? ((o = () => F.current?.click()), (z[3] = o))
          : (o = z[3]),
        z[4] === Symbol.for("react.memo_cache_sentinel")
          ? ((n = (0, t.jsxs)("div", {
              children: [
                (0, t.jsxs)("button", {
                  onClick: o,
                  className:
                    "px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-white/60 transition-colors flex items-center gap-2",
                  children: [
                    (0, t.jsx)(h.Upload, {
                      size: 14,
                    }),
                    " Upload Avatar",
                  ],
                }),
                (0, t.jsx)("p", {
                  className: "text-xs text-white/30 mt-1",
                  children: "JPG, PNG, GIF ou WebP. Max 10MB",
                }),
              ],
            })),
            (z[4] = n))
          : (n = z[4]),
        z[5] !== L
          ? ((c = (0, t.jsx)("input", {
              ref: F,
              type: "file",
              accept: "image/*",
              className: "hidden",
              onChange: (e) => {
                let t = e.target.files?.[0];
                t && L(t);
              },
            })),
            (z[5] = L),
            (z[6] = c))
          : (c = z[6]),
        z[7] !== r || z[8] !== c
          ? ((d = (0, t.jsxs)("div", {
              children: [
                i,
                (0, t.jsxs)("div", {
                  className: "flex items-center gap-4",
                  children: [r, n, c],
                }),
              ],
            })),
            (z[7] = r),
            (z[8] = c),
            (z[9] = d))
          : (d = z[9]),
        z[10] === Symbol.for("react.memo_cache_sentinel")
          ? ((x = (0, t.jsx)("label", {
              className: "text-sm text-white/60 font-medium mb-1.5 block",
              children: "Nome",
            })),
            (z[10] = x))
          : (x = z[10]),
        z[11] !== E
          ? ((m = (e) => E("profile.name", e.target.value)),
            (z[11] = E),
            (z[12] = m))
          : (m = z[12]),
        z[13] !== U.profile.name || z[14] !== m
          ? ((u = (0, t.jsxs)("div", {
              children: [
                x,
                (0, t.jsx)("input", {
                  type: "text",
                  value: U.profile.name,
                  onChange: m,
                  placeholder: "Seu nome ou marca",
                  className:
                    "w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[var(--brand-500)]/50",
                }),
              ],
            })),
            (z[13] = U.profile.name),
            (z[14] = m),
            (z[15] = u))
          : (u = z[15]),
        z[16] === Symbol.for("react.memo_cache_sentinel")
          ? ((b = (0, t.jsx)("label", {
              className: "text-sm text-white/60 font-medium mb-1.5 block",
              children: "Bio",
            })),
            (z[16] = b))
          : (b = z[16]),
        z[17] !== E
          ? ((p = (e) => E("profile.bio", e.target.value)),
            (z[17] = E),
            (z[18] = p))
          : (p = z[18]),
        z[19] !== U.profile.bio || z[20] !== p
          ? ((f = (0, t.jsxs)("div", {
              children: [
                b,
                (0, t.jsx)("textarea", {
                  value: U.profile.bio,
                  onChange: p,
                  placeholder: "Breve descricao sobre voce",
                  rows: 3,
                  className:
                    "w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[var(--brand-500)]/50 resize-none",
                }),
              ],
            })),
            (z[19] = U.profile.bio),
            (z[20] = p),
            (z[21] = f))
          : (f = z[21]),
        z[22] === Symbol.for("react.memo_cache_sentinel")
          ? ((w = (0, t.jsxs)("div", {
              children: [
                (0, t.jsx)("p", {
                  className: "text-sm text-white/60 font-medium",
                  children: "Badge de Verificado",
                }),
                (0, t.jsx)("p", {
                  className: "text-xs text-white/30",
                  children: "Exibir selo azul ao lado do nome",
                }),
              ],
            })),
            (z[22] = w))
          : (w = z[22]),
        z[23] !== U.profile.showVerifiedBadge || z[24] !== E
          ? ((v = () =>
              E("profile.showVerifiedBadge", !U.profile.showVerifiedBadge)),
            (z[23] = U.profile.showVerifiedBadge),
            (z[24] = E),
            (z[25] = v))
          : (v = z[25]),
        z[26] !== U.profile.showVerifiedBadge
          ? ((N = U.profile.showVerifiedBadge
              ? (0, t.jsx)(y.ToggleRight, {
                  size: 28,
                  className: "text-[var(--brand-400)]",
                })
              : (0, t.jsx)(j.ToggleLeft, {
                  size: 28,
                })),
            (z[26] = U.profile.showVerifiedBadge),
            (z[27] = N))
          : (N = z[27]),
        z[28] !== v || z[29] !== N
          ? ((k = (0, t.jsxs)("div", {
              className: "flex items-center justify-between",
              children: [
                w,
                (0, t.jsx)("button", {
                  onClick: v,
                  className: "text-white/40 hover:text-white transition-colors",
                  children: N,
                }),
              ],
            })),
            (z[28] = v),
            (z[29] = N),
            (z[30] = k))
          : (k = z[30]),
        z[31] === Symbol.for("react.memo_cache_sentinel")
          ? ((C = (0, t.jsx)("label", {
              className: "text-sm text-white/60 font-medium mb-3 block",
              children: "Redes Sociais",
            })),
            (z[31] = C))
          : (C = z[31]),
        z[32] !== U.socialLinks || z[33] !== E
          ? ((S = B.map((e) => {
              let s = U.socialLinks.find((t) => t.platform === e.id);
              return (0, t.jsxs)(
                "div",
                {
                  className: "flex items-center gap-3",
                  children: [
                    (0, t.jsx)("span", {
                      className: "text-xs text-white/40 w-20 shrink-0",
                      children: e.label,
                    }),
                    (0, t.jsx)("input", {
                      type: "url",
                      value: s?.url || "",
                      onChange: (t) => {
                        let s = [...U.socialLinks],
                          a = s.findIndex((t) => t.platform === e.id);
                        (t.target.value
                          ? a >= 0
                            ? (s[a] = {
                                ...s[a],
                                url: t.target.value,
                              })
                            : s.push({
                                platform: e.id,
                                url: t.target.value,
                              })
                          : a >= 0 && s.splice(a, 1),
                          E("socialLinks", s));
                      },
                      placeholder: e.placeholder,
                      className:
                        "flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/20 text-xs focus:outline-none focus:border-[var(--brand-500)]/50",
                    }),
                  ],
                },
                e.id,
              );
            })),
            (z[32] = U.socialLinks),
            (z[33] = E),
            (z[34] = S))
          : (S = z[34]),
        z[35] !== S
          ? ((_ = (0, t.jsxs)("div", {
              children: [
                C,
                (0, t.jsx)("div", {
                  className: "space-y-3",
                  children: S,
                }),
              ],
            })),
            (z[35] = S),
            (z[36] = _))
          : (_ = z[36]),
        z[37] !== f || z[38] !== k || z[39] !== _ || z[40] !== d || z[41] !== u
          ? ((T = (0, t.jsxs)("div", {
              className: "space-y-6",
              children: [d, u, f, k, _],
            })),
            (z[37] = f),
            (z[38] = k),
            (z[39] = _),
            (z[40] = d),
            (z[41] = u),
            (z[42] = T))
          : (T = z[42]),
        T
      );
    }
    function I(e) {
      let a,
        i,
        r,
        o,
        n,
        h,
        x,
        u,
        b,
        p,
        g,
        f,
        w,
        v,
        N,
        k,
        _ = (0, s.c)(49),
        { biolink: z, updateField: U } = e;
      _[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = []), (_[0] = a))
        : (a = _[0]);
      let [B, L] = (0, l.useState)(a);
      _[1] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = []), (_[1] = i))
        : (i = _[1]);
      let [F, D] = (0, l.useState)(i);
      (_[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((r = () => {
            (fetch("/api/checkouts", {
              credentials: "include",
            })
              .then(A)
              .then((e) => {
                e.success && L(e.data?.checkouts || []);
              })
              .catch(G),
              fetch("/api/bots", {
                credentials: "include",
              })
                .then(R)
                .then((e) => {
                  e.success && D(e.data?.bots || []);
                })
                .catch($));
          }),
          (o = []),
          (_[2] = r),
          (_[3] = o))
        : ((r = _[2]), (o = _[3])),
        (0, l.useEffect)(r, o),
        _[4] !== z.buttons || _[5] !== U
          ? ((n = () => {
              let e = {
                id: `btn_${Date.now()}`,
                type: "external",
                label: "",
                url: "",
                emoji: "",
                enabled: !0,
                order: z.buttons.length,
                clicks: 0,
              };
              U("buttons", [...z.buttons, e]);
            }),
            (_[4] = z.buttons),
            (_[5] = U),
            (_[6] = n))
          : (n = _[6]));
      let I = n;
      _[7] !== z.buttons || _[8] !== U
        ? ((h = (e, t, s) => {
            let a = [...z.buttons];
            ((a[e] = {
              ...a[e],
              [t]: s,
            }),
              U("buttons", a));
          }),
          (_[7] = z.buttons),
          (_[8] = U),
          (_[9] = h))
        : (h = _[9]);
      let O = h;
      _[10] !== z.buttons || _[11] !== U
        ? ((x = (e) => {
            U(
              "buttons",
              z.buttons.filter((t, s) => s !== e),
            );
          }),
          (_[10] = z.buttons),
          (_[11] = U),
          (_[12] = x))
        : (x = _[12]);
      let V = x;
      _[13] !== z.buttons || _[14] !== U
        ? ((u = (e, t) => {
            let s = [...z.buttons],
              a = "up" === t ? e - 1 : e + 1;
            if (a < 0 || a >= s.length) return;
            let [l, i] = [s[a], s[e]];
            ((s[e] = l), (s[a] = i), s.forEach(P), U("buttons", s));
          }),
          (_[13] = z.buttons),
          (_[14] = U),
          (_[15] = u))
        : (u = _[15]);
      let q = u;
      _[16] !== z.buttons || _[17] !== U
        ? ((b = (e, t) => {
            let s = [...z.buttons];
            ((s[e] = {
              ...s[e],
              checkoutSlug: t.slug,
              label: s[e].label || t.productName || t.name,
            }),
              U("buttons", s));
          }),
          (_[16] = z.buttons),
          (_[17] = U),
          (_[18] = b))
        : (b = _[18]);
      let H = b;
      _[19] !== z.buttons || _[20] !== U
        ? ((p = (e, t) => {
            let s = [...z.buttons];
            ((s[e] = {
              ...s[e],
              botUsername: t.username,
              label: s[e].label || t.name,
            }),
              U("buttons", s));
          }),
          (_[19] = z.buttons),
          (_[20] = U),
          (_[21] = p))
        : (p = _[21]);
      let M = p;
      if (
        (_[22] === Symbol.for("react.memo_cache_sentinel")
          ? ((g = (0, t.jsx)("p", {
              className: "text-sm text-white/60 font-medium",
              children: "Botoes / Links",
            })),
            (_[22] = g))
          : (g = _[22]),
        _[23] === Symbol.for("react.memo_cache_sentinel")
          ? ((f = (0, t.jsx)(c.Plus, {
              size: 12,
            })),
            (_[23] = f))
          : (f = _[23]),
        _[24] !== I
          ? ((w = (0, t.jsxs)("div", {
              className: "flex items-center justify-between",
              children: [
                g,
                (0, t.jsxs)("button", {
                  onClick: I,
                  className:
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--brand-500)]/10 hover:bg-[var(--brand-500)]/20 text-[var(--brand-400)] text-xs transition-colors",
                  children: [f, " Adicionar"],
                }),
              ],
            })),
            (_[24] = I),
            (_[25] = w))
          : (w = _[25]),
        _[26] !== z.buttons.length
          ? ((v =
              0 === z.buttons.length &&
              (0, t.jsx)("p", {
                className: "text-xs text-white/30 text-center py-8",
                children: "Nenhum botao adicionado",
              })),
            (_[26] = z.buttons.length),
            (_[27] = v))
          : (v = _[27]),
        _[28] !== z.buttons ||
          _[29] !== F ||
          _[30] !== B ||
          _[31] !== q ||
          _[32] !== V ||
          _[33] !== M ||
          _[34] !== H ||
          _[35] !== O)
      ) {
        let e;
        (_[37] !== F ||
        _[38] !== B ||
        _[39] !== q ||
        _[40] !== V ||
        _[41] !== M ||
        _[42] !== H ||
        _[43] !== O
          ? ((e = (e, s) =>
              (0, t.jsxs)(
                "div",
                {
                  className:
                    "p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-3",
                  children: [
                    (0, t.jsxs)("div", {
                      className: "flex items-center justify-between",
                      children: [
                        (0, t.jsxs)("div", {
                          className: "flex items-center gap-2",
                          children: [
                            (0, t.jsx)("div", {
                              className: "flex flex-col gap-0.5",
                              children: (0, t.jsx)("button", {
                                onClick: () => q(s, "up"),
                                disabled: 0 === s,
                                className:
                                  "text-white/30 hover:text-white/60 disabled:opacity-30",
                                children: (0, t.jsx)(m.GripVertical, {
                                  size: 12,
                                }),
                              }),
                            }),
                            (0, t.jsxs)("span", {
                              className: "text-xs text-white/40",
                              children: ["#", s + 1],
                            }),
                            e.clicks > 0 &&
                              (0, t.jsxs)("span", {
                                className: "text-[10px] text-white/30",
                                children: [e.clicks, " cliques"],
                              }),
                          ],
                        }),
                        (0, t.jsxs)("div", {
                          className: "flex items-center gap-2",
                          children: [
                            (0, t.jsx)("button", {
                              onClick: () => O(s, "enabled", !e.enabled),
                              className: "text-white/40",
                              children: e.enabled
                                ? (0, t.jsx)(y.ToggleRight, {
                                    size: 20,
                                    className: "text-green-400",
                                  })
                                : (0, t.jsx)(j.ToggleLeft, {
                                    size: 20,
                                  }),
                            }),
                            (0, t.jsx)("button", {
                              onClick: () => V(s),
                              className:
                                "text-white/30 hover:text-red-400 transition-colors",
                              children: (0, t.jsx)(d.Trash2, {
                                size: 14,
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, t.jsx)("div", {
                      className: "flex flex-wrap gap-2",
                      children: E.map((a) =>
                        (0, t.jsxs)(
                          "button",
                          {
                            onClick: () => O(s, "type", a.id),
                            className: (0, T.cn)(
                              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors",
                              e.type === a.id
                                ? "bg-[var(--brand-500)]/20 text-[var(--brand-400)] border border-[var(--brand-500)]/30"
                                : "bg-white/5 text-white/40 hover:bg-white/10 border border-transparent",
                            ),
                            children: [a.icon, " ", a.label],
                          },
                          a.id,
                        ),
                      ),
                    }),
                    (0, t.jsx)("input", {
                      type: "text",
                      value: e.label,
                      onChange: (e) => O(s, "label", e.target.value),
                      placeholder: "Ex: 🔥 Meu grupo VIP",
                      className:
                        "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[var(--brand-500)]/50",
                    }),
                    (0, t.jsx)("input", {
                      type: "text",
                      value: e.description || "",
                      onChange: (e) => O(s, "description", e.target.value),
                      placeholder: "Descrição (opcional)",
                      className:
                        "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[var(--brand-500)]/50",
                    }),
                    (0, t.jsxs)("div", {
                      className: "flex items-center gap-2",
                      children: [
                        (0, t.jsx)("input", {
                          type: "text",
                          value: e.iconUrl || "",
                          onChange: (e) => O(s, "iconUrl", e.target.value),
                          placeholder: "URL do ícone (opcional)",
                          className:
                            "flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[var(--brand-500)]/50",
                        }),
                        e.iconUrl &&
                          (0, t.jsx)("img", {
                            src: e.iconUrl,
                            alt: "",
                            className:
                              "w-8 h-8 rounded-full object-cover border border-white/10",
                          }),
                      ],
                    }),
                    "external" === e.type &&
                      (0, t.jsx)("input", {
                        type: "url",
                        value: e.url,
                        onChange: (e) => O(s, "url", e.target.value),
                        placeholder: "https://exemplo.com",
                        className:
                          "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[var(--brand-500)]/50",
                      }),
                    "checkout" === e.type &&
                      (0, t.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                          B.length > 0
                            ? (0, t.jsxs)("div", {
                                className: "space-y-1.5",
                                children: [
                                  (0, t.jsx)("label", {
                                    className:
                                      "text-[10px] text-white/30 uppercase tracking-wider",
                                    children: "Selecione um checkout",
                                  }),
                                  (0, t.jsx)("div", {
                                    className:
                                      "grid grid-cols-1 gap-1.5 max-h-[150px] overflow-y-auto",
                                    children: B.map((a) =>
                                      (0, t.jsxs)(
                                        "button",
                                        {
                                          type: "button",
                                          onClick: () => H(s, a),
                                          className: (0, T.cn)(
                                            "flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors text-left",
                                            e.checkoutSlug === a.slug
                                              ? "bg-[var(--brand-500)]/15 border border-[var(--brand-500)]/30 text-[var(--brand-400)]"
                                              : "bg-white/5 border border-white/5 text-white/60 hover:bg-white/10",
                                          ),
                                          children: [
                                            (0, t.jsxs)("div", {
                                              className:
                                                "flex items-center gap-2 min-w-0",
                                              children: [
                                                (0, t.jsx)(C.ShoppingCart, {
                                                  size: 12,
                                                  className:
                                                    "flex-shrink-0 opacity-60",
                                                }),
                                                (0, t.jsx)("span", {
                                                  className: "truncate",
                                                  children:
                                                    a.productName || a.name,
                                                }),
                                              ],
                                            }),
                                            (0, t.jsxs)("span", {
                                              className:
                                                "text-[10px] text-white/30 flex-shrink-0 ml-2",
                                              children: [
                                                "R$ ",
                                                a.price?.toFixed(2),
                                              ],
                                            }),
                                          ],
                                        },
                                        a._id,
                                      ),
                                    ),
                                  }),
                                ],
                              })
                            : (0, t.jsx)("p", {
                                className: "text-[10px] text-white/30",
                                children:
                                  "Nenhum checkout encontrado. Crie um checkout primeiro.",
                              }),
                          (0, t.jsx)("input", {
                            type: "text",
                            value: e.checkoutSlug || "",
                            onChange: (e) =>
                              O(s, "checkoutSlug", e.target.value),
                            placeholder: "Ou digite o slug manualmente",
                            className:
                              "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[var(--brand-500)]/50",
                          }),
                        ],
                      }),
                    "bot" === e.type &&
                      (0, t.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                          F.length > 0
                            ? (0, t.jsxs)("div", {
                                className: "space-y-1.5",
                                children: [
                                  (0, t.jsx)("label", {
                                    className:
                                      "text-[10px] text-white/30 uppercase tracking-wider",
                                    children: "Selecione um bot",
                                  }),
                                  (0, t.jsx)("div", {
                                    className:
                                      "grid grid-cols-1 gap-1.5 max-h-[150px] overflow-y-auto",
                                    children: F.map((a) =>
                                      (0, t.jsxs)(
                                        "button",
                                        {
                                          type: "button",
                                          onClick: () => M(s, a),
                                          className: (0, T.cn)(
                                            "flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors text-left",
                                            e.botUsername === a.username
                                              ? "bg-[var(--brand-500)]/15 border border-[var(--brand-500)]/30 text-[var(--brand-400)]"
                                              : "bg-white/5 border border-white/5 text-white/60 hover:bg-white/10",
                                          ),
                                          children: [
                                            (0, t.jsx)(S.Bot, {
                                              size: 12,
                                              className:
                                                "flex-shrink-0 opacity-60",
                                            }),
                                            (0, t.jsx)("span", {
                                              className: "truncate",
                                              children: a.name,
                                            }),
                                            (0, t.jsxs)("span", {
                                              className:
                                                "text-[10px] text-white/30 ml-auto",
                                              children: ["@", a.username],
                                            }),
                                          ],
                                        },
                                        a._id,
                                      ),
                                    ),
                                  }),
                                ],
                              })
                            : (0, t.jsx)("p", {
                                className: "text-[10px] text-white/30",
                                children:
                                  "Nenhum bot encontrado. Crie um bot primeiro.",
                              }),
                          (0, t.jsxs)("div", {
                            className: "flex gap-2",
                            children: [
                              (0, t.jsx)("input", {
                                type: "text",
                                value: e.botUsername || "",
                                onChange: (e) =>
                                  O(s, "botUsername", e.target.value),
                                placeholder: "Username do bot (sem @)",
                                className:
                                  "flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[var(--brand-500)]/50",
                              }),
                              (0, t.jsx)("input", {
                                type: "text",
                                value: e.startParam || "",
                                onChange: (e) =>
                                  O(s, "startParam", e.target.value),
                                placeholder: "Start param (opcional)",
                                className:
                                  "w-40 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[var(--brand-500)]/50",
                              }),
                            ],
                          }),
                        ],
                      }),
                    "whatsapp" === e.type &&
                      (0, t.jsx)("input", {
                        type: "text",
                        value: e.url,
                        onChange: (e) => O(s, "url", e.target.value),
                        placeholder: "https://wa.me/5511999999999",
                        className:
                          "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[var(--brand-500)]/50",
                      }),
                  ],
                },
                e.id,
              )),
            (_[37] = F),
            (_[38] = B),
            (_[39] = q),
            (_[40] = V),
            (_[41] = M),
            (_[42] = H),
            (_[43] = O),
            (_[44] = e))
          : (e = _[44]),
          (N = z.buttons.map(e)),
          (_[28] = z.buttons),
          (_[29] = F),
          (_[30] = B),
          (_[31] = q),
          (_[32] = V),
          (_[33] = M),
          (_[34] = H),
          (_[35] = O),
          (_[36] = N));
      } else N = _[36];
      return (
        _[45] !== w || _[46] !== v || _[47] !== N
          ? ((k = (0, t.jsxs)("div", {
              className: "space-y-4",
              children: [w, v, N],
            })),
            (_[45] = w),
            (_[46] = v),
            (_[47] = N),
            (_[48] = k))
          : (k = _[48]),
        k
      );
    }
    function P(e, t) {
      return (e.order = t);
    }
    function $() {}
    function R(e) {
      return e.json();
    }
    function G() {}
    function A(e) {
      return e.json();
    }
    function O(e) {
      let a,
        i,
        r,
        o,
        d,
        h,
        x,
        m,
        u,
        b,
        p,
        g,
        f,
        w = (0, s.c)(37),
        { biolink: v, updateField: j, onUploadHighlight: y } = e,
        [N, C] = (0, l.useState)(!1);
      w[0] !== v.highlights || w[1] !== y || w[2] !== j
        ? ((a = async (e) => {
            C(!0);
            let t = await y(e);
            if (t) {
              let e = {
                id: `hl_${Date.now()}`,
                title: "",
                imageUrl: t,
                linkUrl: "",
                order: v.highlights.length,
              };
              j("highlights", [...v.highlights, e]);
            }
            C(!1);
          }),
          (w[0] = v.highlights),
          (w[1] = y),
          (w[2] = j),
          (w[3] = a))
        : (a = w[3]);
      let S = a;
      w[4] !== v.highlights || w[5] !== j
        ? ((i = (e, t, s) => {
            let a = [...v.highlights];
            ((a[e] = {
              ...a[e],
              [t]: s,
            }),
              j("highlights", a));
          }),
          (w[4] = v.highlights),
          (w[5] = j),
          (w[6] = i))
        : (i = w[6]);
      let _ = i;
      w[7] !== v.highlights || w[8] !== j
        ? ((r = (e) => {
            j(
              "highlights",
              v.highlights.filter((t, s) => s !== e),
            );
          }),
          (w[7] = v.highlights),
          (w[8] = j),
          (w[9] = r))
        : (r = w[9]);
      let T = r,
        z = (0, l.useRef)(null);
      if (
        (w[10] === Symbol.for("react.memo_cache_sentinel")
          ? ((o = (0, t.jsxs)("div", {
              children: [
                (0, t.jsx)("p", {
                  className: "text-sm text-white/60 font-medium",
                  children: "Destaques",
                }),
                (0, t.jsx)("p", {
                  className: "text-xs text-white/30",
                  children: "Imagens em destaque no topo (estilo Stories)",
                }),
              ],
            })),
            (d = () => z.current?.click()),
            (w[10] = o),
            (w[11] = d))
          : ((o = w[10]), (d = w[11])),
        w[12] !== N
          ? ((h = N
              ? (0, t.jsx)(n.Loader2, {
                  size: 12,
                  className: "animate-spin",
                })
              : (0, t.jsx)(c.Plus, {
                  size: 12,
                })),
            (w[12] = N),
            (w[13] = h))
          : (h = w[13]),
        w[14] !== h || w[15] !== N
          ? ((x = (0, t.jsxs)("button", {
              onClick: d,
              disabled: N,
              className:
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--brand-500)]/10 hover:bg-[var(--brand-500)]/20 text-[var(--brand-400)] text-xs transition-colors",
              children: [h, "Adicionar"],
            })),
            (w[14] = h),
            (w[15] = N),
            (w[16] = x))
          : (x = w[16]),
        w[17] !== S
          ? ((m = (0, t.jsx)("input", {
              ref: z,
              type: "file",
              accept: "image/*",
              className: "hidden",
              onChange: (e) => {
                let t = e.target.files?.[0];
                t && S(t);
              },
            })),
            (w[17] = S),
            (w[18] = m))
          : (m = w[18]),
        w[19] !== x || w[20] !== m
          ? ((u = (0, t.jsxs)("div", {
              className: "flex items-center justify-between",
              children: [o, x, m],
            })),
            (w[19] = x),
            (w[20] = m),
            (w[21] = u))
          : (u = w[21]),
        w[22] !== v.highlights.length
          ? ((b =
              0 === v.highlights.length &&
              (0, t.jsx)("p", {
                className: "text-xs text-white/30 text-center py-8",
                children: "Nenhum destaque adicionado",
              })),
            (w[22] = v.highlights.length),
            (w[23] = b))
          : (b = w[23]),
        w[24] !== v.highlights || w[25] !== T || w[26] !== _)
      ) {
        let e;
        (w[28] !== T || w[29] !== _
          ? ((e = (e, s) =>
              (0, t.jsxs)(
                "div",
                {
                  className: "relative group",
                  children: [
                    (0, t.jsx)("img", {
                      src: e.imageUrl,
                      alt: e.title,
                      className:
                        "w-full aspect-square rounded-xl object-cover border border-white/10",
                    }),
                    (0, t.jsx)("button", {
                      onClick: () => T(s),
                      className:
                        "absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity",
                      children: (0, t.jsx)(k.X, {
                        size: 12,
                      }),
                    }),
                    (0, t.jsx)("input", {
                      type: "text",
                      value: e.title,
                      onChange: (e) => _(s, "title", e.target.value),
                      placeholder: "Titulo",
                      className:
                        "mt-2 w-full px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none",
                    }),
                    (0, t.jsx)("input", {
                      type: "url",
                      value: e.linkUrl || "",
                      onChange: (e) => _(s, "linkUrl", e.target.value),
                      placeholder: "Link (opcional)",
                      className:
                        "mt-1 w-full px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/20 text-[10px] focus:outline-none",
                    }),
                  ],
                },
                e.id,
              )),
            (w[28] = T),
            (w[29] = _),
            (w[30] = e))
          : (e = w[30]),
          (p = v.highlights.map(e)),
          (w[24] = v.highlights),
          (w[25] = T),
          (w[26] = _),
          (w[27] = p));
      } else p = w[27];
      return (
        w[31] !== p
          ? ((g = (0, t.jsx)("div", {
              className: "grid grid-cols-2 md:grid-cols-3 gap-3",
              children: p,
            })),
            (w[31] = p),
            (w[32] = g))
          : (g = w[32]),
        w[33] !== b || w[34] !== g || w[35] !== u
          ? ((f = (0, t.jsxs)("div", {
              className: "space-y-4",
              children: [u, b, g],
            })),
            (w[33] = b),
            (w[34] = g),
            (w[35] = u),
            (w[36] = f))
          : (f = w[36]),
        f
      );
    }
    function V(e) {
      let i,
        r,
        o,
        n,
        c,
        d,
        x,
        m,
        u,
        b,
        p,
        g,
        f,
        w,
        v,
        N,
        k,
        C,
        S,
        _,
        z,
        U,
        B,
        E,
        D,
        I,
        P,
        $,
        R,
        G,
        A,
        O = (0, s.c)(87),
        { biolink: V, updateField: q, onUploadBackground: H } = e,
        W = (0, l.useRef)(null);
      return (
        O[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((i = (0, t.jsx)("label", {
              className: "text-sm text-white/60 font-medium mb-3 block",
              children: "Tipo de Fundo",
            })),
            (O[0] = i))
          : (i = O[0]),
        O[1] === Symbol.for("react.memo_cache_sentinel")
          ? ((r = ["solid", "gradient", "image"]), (O[1] = r))
          : (r = O[1]),
        O[2] !== V.theme.backgroundType || O[3] !== q
          ? ((o = (0, t.jsxs)("div", {
              children: [
                i,
                (0, t.jsx)("div", {
                  className: "flex flex-wrap gap-2",
                  children: r.map((e) =>
                    (0, t.jsx)(
                      "button",
                      {
                        onClick: () => q("theme.backgroundType", e),
                        className: (0, T.cn)(
                          "px-4 py-2 rounded-lg text-xs transition-colors flex-1 sm:flex-none",
                          V.theme.backgroundType === e
                            ? "bg-[var(--brand-500)]/20 text-[var(--brand-400)] border border-[var(--brand-500)]/30"
                            : "bg-white/5 text-white/40 hover:bg-white/10 border border-transparent",
                        ),
                        children:
                          "solid" === e
                            ? "Solido"
                            : "gradient" === e
                              ? "Gradiente"
                              : "Imagem",
                      },
                      e,
                    ),
                  ),
                }),
              ],
            })),
            (O[2] = V.theme.backgroundType),
            (O[3] = q),
            (O[4] = o))
          : (o = O[4]),
        O[5] !== V.theme.backgroundColor ||
        O[6] !== V.theme.backgroundType ||
        O[7] !== q
          ? ((n =
              "solid" === V.theme.backgroundType &&
              (0, t.jsx)(M, {
                label: "Cor de Fundo",
                value: V.theme.backgroundColor,
                onChange: (e) => q("theme.backgroundColor", e),
              })),
            (O[5] = V.theme.backgroundColor),
            (O[6] = V.theme.backgroundType),
            (O[7] = q),
            (O[8] = n))
          : (n = O[8]),
        O[9] !== V.theme.backgroundType ||
        O[10] !== V.theme.gradientFrom ||
        O[11] !== V.theme.gradientTo ||
        O[12] !== q
          ? ((c =
              "gradient" === V.theme.backgroundType &&
              (0, t.jsxs)("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                children: [
                  (0, t.jsx)(M, {
                    label: "Gradiente - De",
                    value: V.theme.gradientFrom,
                    onChange: (e) => q("theme.gradientFrom", e),
                  }),
                  (0, t.jsx)(M, {
                    label: "Gradiente - Para",
                    value: V.theme.gradientTo,
                    onChange: (e) => q("theme.gradientTo", e),
                  }),
                ],
              })),
            (O[9] = V.theme.backgroundType),
            (O[10] = V.theme.gradientFrom),
            (O[11] = V.theme.gradientTo),
            (O[12] = q),
            (O[13] = c))
          : (c = O[13]),
        O[14] !== V.theme.backgroundImageUrl ||
        O[15] !== V.theme.backgroundType ||
        O[16] !== H
          ? ((d =
              "image" === V.theme.backgroundType &&
              (0, t.jsxs)("div", {
                children: [
                  (0, t.jsx)("label", {
                    className: "text-sm text-white/60 font-medium mb-1.5 block",
                    children: "Imagem de Fundo",
                  }),
                  V.theme.backgroundImageUrl &&
                    (0, t.jsx)("div", {
                      className:
                        "relative w-full h-32 rounded-xl overflow-hidden mb-2 border border-white/10",
                      children: (0, t.jsx)(a.default, {
                        src: V.theme.backgroundImageUrl,
                        alt: "",
                        className: "object-cover",
                        fill: !0,
                        unoptimized: !0,
                      }),
                    }),
                  (0, t.jsxs)("button", {
                    onClick: () => W.current?.click(),
                    className:
                      "px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-white/60 transition-colors flex items-center gap-2",
                    children: [
                      (0, t.jsx)(h.Upload, {
                        size: 14,
                      }),
                      " Upload Imagem",
                    ],
                  }),
                  (0, t.jsx)("input", {
                    ref: W,
                    type: "file",
                    accept: "image/*",
                    className: "hidden",
                    onChange: (e) => {
                      let t = e.target.files?.[0];
                      t && H(t);
                    },
                  }),
                ],
              })),
            (O[14] = V.theme.backgroundImageUrl),
            (O[15] = V.theme.backgroundType),
            (O[16] = H),
            (O[17] = d))
          : (d = O[17]),
        O[18] === Symbol.for("react.memo_cache_sentinel")
          ? ((x = (0, t.jsx)("label", {
              className: "text-sm text-white/60 font-medium mb-3 block",
              children: "Estilo dos Botoes",
            })),
            (O[18] = x))
          : (x = O[18]),
        O[19] !== V.theme.buttonStyle || O[20] !== q
          ? ((m = F.map((e) =>
              (0, t.jsx)(
                "button",
                {
                  onClick: () => q("theme.buttonStyle", e.id),
                  className: (0, T.cn)(
                    "px-4 py-2 rounded-lg text-xs transition-colors flex-1 sm:flex-none",
                    V.theme.buttonStyle === e.id
                      ? "bg-[var(--brand-500)]/20 text-[var(--brand-400)] border border-[var(--brand-500)]/30"
                      : "bg-white/5 text-white/40 hover:bg-white/10 border border-transparent",
                  ),
                  children: e.label,
                },
                e.id,
              ),
            )),
            (O[19] = V.theme.buttonStyle),
            (O[20] = q),
            (O[21] = m))
          : (m = O[21]),
        O[22] !== m
          ? ((u = (0, t.jsxs)("div", {
              children: [
                x,
                (0, t.jsx)("div", {
                  className: "flex flex-wrap gap-2",
                  children: m,
                }),
              ],
            })),
            (O[22] = m),
            (O[23] = u))
          : (u = O[23]),
        O[24] !== q
          ? ((b = (e) => q("theme.buttonColor", e)), (O[24] = q), (O[25] = b))
          : (b = O[25]),
        O[26] !== V.theme.buttonColor || O[27] !== b
          ? ((p = (0, t.jsx)(M, {
              label: "Cor do Botao",
              value: V.theme.buttonColor,
              onChange: b,
            })),
            (O[26] = V.theme.buttonColor),
            (O[27] = b),
            (O[28] = p))
          : (p = O[28]),
        O[29] !== q
          ? ((g = (e) => q("theme.buttonTextColor", e)),
            (O[29] = q),
            (O[30] = g))
          : (g = O[30]),
        O[31] !== V.theme.buttonTextColor || O[32] !== g
          ? ((f = (0, t.jsx)(M, {
              label: "Texto do Botao",
              value: V.theme.buttonTextColor,
              onChange: g,
            })),
            (O[31] = V.theme.buttonTextColor),
            (O[32] = g),
            (O[33] = f))
          : (f = O[33]),
        O[34] !== q
          ? ((w = (e) => q("theme.buttonHoverColor", e)),
            (O[34] = q),
            (O[35] = w))
          : (w = O[35]),
        O[36] !== V.theme.buttonHoverColor || O[37] !== w
          ? ((v = (0, t.jsx)(M, {
              label: "Hover do Botao",
              value: V.theme.buttonHoverColor,
              onChange: w,
            })),
            (O[36] = V.theme.buttonHoverColor),
            (O[37] = w),
            (O[38] = v))
          : (v = O[38]),
        O[39] !== p || O[40] !== f || O[41] !== v
          ? ((N = (0, t.jsxs)("div", {
              className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
              children: [p, f, v],
            })),
            (O[39] = p),
            (O[40] = f),
            (O[41] = v),
            (O[42] = N))
          : (N = O[42]),
        O[43] !== q
          ? ((k = (e) => q("theme.nameColor", e)), (O[43] = q), (O[44] = k))
          : (k = O[44]),
        O[45] !== V.theme.nameColor || O[46] !== k
          ? ((C = (0, t.jsx)(M, {
              label: "Cor do Nome",
              value: V.theme.nameColor,
              onChange: k,
            })),
            (O[45] = V.theme.nameColor),
            (O[46] = k),
            (O[47] = C))
          : (C = O[47]),
        O[48] !== q
          ? ((S = (e) => q("theme.bioColor", e)), (O[48] = q), (O[49] = S))
          : (S = O[49]),
        O[50] !== V.theme.bioColor || O[51] !== S
          ? ((_ = (0, t.jsx)(M, {
              label: "Cor da Bio",
              value: V.theme.bioColor,
              onChange: S,
            })),
            (O[50] = V.theme.bioColor),
            (O[51] = S),
            (O[52] = _))
          : (_ = O[52]),
        O[53] !== q
          ? ((z = (e) => q("theme.textColor", e)), (O[53] = q), (O[54] = z))
          : (z = O[54]),
        O[55] !== V.theme.textColor || O[56] !== z
          ? ((U = (0, t.jsx)(M, {
              label: "Cor do Texto",
              value: V.theme.textColor,
              onChange: z,
            })),
            (O[55] = V.theme.textColor),
            (O[56] = z),
            (O[57] = U))
          : (U = O[57]),
        O[58] !== C || O[59] !== _ || O[60] !== U
          ? ((B = (0, t.jsxs)("div", {
              className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
              children: [C, _, U],
            })),
            (O[58] = C),
            (O[59] = _),
            (O[60] = U),
            (O[61] = B))
          : (B = O[61]),
        O[62] === Symbol.for("react.memo_cache_sentinel")
          ? ((E = (0, t.jsx)("label", {
              className: "text-sm text-white/60 font-medium mb-3 block",
              children: "Fonte",
            })),
            (O[62] = E))
          : (E = O[62]),
        O[63] !== V.theme.fontFamily || O[64] !== q
          ? ((D = L.map((e) =>
              (0, t.jsx)(
                "button",
                {
                  onClick: () => q("theme.fontFamily", e),
                  className: (0, T.cn)(
                    "px-4 py-2 rounded-lg text-xs transition-colors flex-1 sm:flex-none",
                    V.theme.fontFamily === e
                      ? "bg-[var(--brand-500)]/20 text-[var(--brand-400)] border border-[var(--brand-500)]/30"
                      : "bg-white/5 text-white/40 hover:bg-white/10 border border-transparent",
                  ),
                  style: {
                    fontFamily: e,
                  },
                  children: e,
                },
                e,
              ),
            )),
            (O[63] = V.theme.fontFamily),
            (O[64] = q),
            (O[65] = D))
          : (D = O[65]),
        O[66] !== D
          ? ((I = (0, t.jsxs)("div", {
              children: [
                E,
                (0, t.jsx)("div", {
                  className: "flex flex-wrap gap-2",
                  children: D,
                }),
              ],
            })),
            (O[66] = D),
            (O[67] = I))
          : (I = O[67]),
        O[68] === Symbol.for("react.memo_cache_sentinel")
          ? ((P = (0, t.jsxs)("div", {
              children: [
                (0, t.jsx)("p", {
                  className: "text-sm text-white/60",
                  children: "Efeito Glow",
                }),
                (0, t.jsx)("p", {
                  className: "text-xs text-white/30",
                  children: "Adiciona brilho nos botoes",
                }),
              ],
            })),
            (O[68] = P))
          : (P = O[68]),
        O[69] !== V.theme.glowEffect || O[70] !== q
          ? (($ = () => q("theme.glowEffect", !V.theme.glowEffect)),
            (O[69] = V.theme.glowEffect),
            (O[70] = q),
            (O[71] = $))
          : ($ = O[71]),
        O[72] !== V.theme.glowEffect
          ? ((R = V.theme.glowEffect
              ? (0, t.jsx)(y.ToggleRight, {
                  size: 28,
                  className: "text-[var(--brand-400)]",
                })
              : (0, t.jsx)(j.ToggleLeft, {
                  size: 28,
                  className: "text-white/30",
                })),
            (O[72] = V.theme.glowEffect),
            (O[73] = R))
          : (R = O[73]),
        O[74] !== $ || O[75] !== R
          ? ((G = (0, t.jsx)("div", {
              className: "space-y-3",
              children: (0, t.jsxs)("div", {
                className: "flex items-center justify-between",
                children: [
                  P,
                  (0, t.jsx)("button", {
                    onClick: $,
                    children: R,
                  }),
                ],
              }),
            })),
            (O[74] = $),
            (O[75] = R),
            (O[76] = G))
          : (G = O[76]),
        O[77] !== N ||
        O[78] !== B ||
        O[79] !== I ||
        O[80] !== o ||
        O[81] !== G ||
        O[82] !== n ||
        O[83] !== c ||
        O[84] !== d ||
        O[85] !== u
          ? ((A = (0, t.jsxs)("div", {
              className: "space-y-6",
              children: [o, n, c, d, u, N, B, I, G],
            })),
            (O[77] = N),
            (O[78] = B),
            (O[79] = I),
            (O[80] = o),
            (O[81] = G),
            (O[82] = n),
            (O[83] = c),
            (O[84] = d),
            (O[85] = u),
            (O[86] = A))
          : (A = O[86]),
        A
      );
    }
    function q({ biolink: e, updateField: s }) {
      let a = window.location.origin,
        [i, r] = (0, l.useState)([]),
        [o, c] = (0, l.useState)(!0);
      (0, l.useEffect)(() => {
        d();
      }, []);
      let d = async () => {
          try {
            let e = await fetch("/api/custom-domains", {
              credentials: "include",
            });
            if (e.ok) {
              let t = await e.json();
              r(t.domains || []);
            }
          } catch {
          } finally {
            c(!1);
          }
        },
        h = i.filter((e) => "active" === e.status),
        m = e.customDomain || "",
        u = "phantoms.group" === m,
        p = (e) => {
          s("customDomain", e);
        };
      return (0, t.jsxs)("div", {
        className: "space-y-6",
        children: [
          (0, t.jsxs)("div", {
            children: [
              (0, t.jsx)("label", {
                className: "text-sm text-white/60 font-medium mb-1.5 block",
                children: "Slug (URL)",
              }),
              (0, t.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [
                  (0, t.jsx)("span", {
                    className: "text-xs text-white/30 shrink-0",
                    children: m ? `${m}/b/` : "sharkbot.com.br/b/",
                  }),
                  (0, t.jsx)("input", {
                    type: "text",
                    value: e.slug,
                    onChange: (e) =>
                      s(
                        "slug",
                        e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                      ),
                    className:
                      "flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[var(--brand-500)]/50",
                  }),
                ],
              }),
            ],
          }),
          (0, t.jsxs)("div", {
            children: [
              (0, t.jsx)("label", {
                className: "text-sm text-white/60 font-medium mb-3 block",
                children: "Escolha o Dominio",
              }),
              o
                ? (0, t.jsx)("div", {
                    className: "flex items-center justify-center py-8",
                    children: (0, t.jsx)(n.Loader2, {
                      size: 18,
                      className: "animate-spin text-white/30",
                    }),
                  })
                : (0, t.jsxs)("div", {
                    className: "grid grid-cols-1 gap-3",
                    children: [
                      (0, t.jsxs)("button", {
                        type: "button",
                        onClick: () => p("phantoms.group"),
                        className: (0, T.cn)(
                          "relative p-4 rounded-xl border transition-all cursor-pointer text-left flex items-center gap-4",
                          u
                            ? "bg-[var(--brand-500)]/10 border-[var(--brand-500)]/50"
                            : "bg-white/[0.03] border-white/10 hover:border-white/20",
                        ),
                        children: [
                          (0, t.jsx)("div", {
                            className:
                              "w-10 h-10 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center flex-shrink-0",
                            children: (0, t.jsx)(b.Globe, {
                              size: 18,
                              className: "text-white/50",
                            }),
                          }),
                          (0, t.jsxs)("div", {
                            className: "flex-1 min-w-0",
                            children: [
                              (0, t.jsx)("p", {
                                className: "text-sm font-bold text-white",
                                children: "phantoms.group",
                              }),
                              (0, t.jsx)("p", {
                                className: "text-[11px] text-white/30",
                                children: "Dominio alternativo",
                              }),
                            ],
                          }),
                          u &&
                            (0, t.jsx)(N.Check, {
                              size: 16,
                              className:
                                "text-[var(--brand-400)] flex-shrink-0",
                            }),
                        ],
                      }),
                      h.map((e) =>
                        (0, t.jsxs)(
                          "button",
                          {
                            type: "button",
                            onClick: () => p(e.domain),
                            className: (0, T.cn)(
                              "relative p-4 rounded-xl border transition-all cursor-pointer text-left flex items-center gap-4",
                              m === e.domain
                                ? "bg-[var(--brand-500)]/10 border-[var(--brand-500)]/50"
                                : "bg-white/[0.03] border-white/10 hover:border-white/20",
                            ),
                            children: [
                              (0, t.jsx)("div", {
                                className:
                                  "w-10 h-10 rounded-lg bg-[var(--brand-500)]/10 border border-[var(--brand-500)]/20 flex items-center justify-center flex-shrink-0",
                                children: (0, t.jsx)(b.Globe, {
                                  size: 18,
                                  className: "text-[var(--brand-400)]",
                                }),
                              }),
                              (0, t.jsxs)("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                  (0, t.jsx)("p", {
                                    className: "text-sm font-bold text-white",
                                    children: e.domain,
                                  }),
                                  (0, t.jsxs)("p", {
                                    className:
                                      "text-[11px] text-emerald-400 flex items-center gap-1",
                                    children: [
                                      (0, t.jsx)(N.Check, {
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
                              m === e.domain &&
                                (0, t.jsx)(N.Check, {
                                  size: 16,
                                  className:
                                    "text-[var(--brand-400)] flex-shrink-0",
                                }),
                            ],
                          },
                          e._id,
                        ),
                      ),
                      0 === h.length &&
                        (0, t.jsxs)("p", {
                          className: "text-xs text-white/30 px-1",
                          children: [
                            "Nenhum dominio personalizado ativo. Configure em ",
                            (0, t.jsx)("span", {
                              className: "text-[var(--brand-400)]",
                              children: "Redirecionadores > Dominios",
                            }),
                            ".",
                          ],
                        }),
                    ],
                  }),
            ],
          }),
          (0, t.jsxs)("div", {
            className: "p-4 rounded-xl bg-white/[0.03] border border-white/5",
            children: [
              (0, t.jsx)("p", {
                className: "text-xs text-white/40 mb-2",
                children: "URLs do seu Bio Link:",
              }),
              (0, t.jsxs)("div", {
                className: "space-y-1.5",
                children: [
                  (0, t.jsxs)("div", {
                    className: "flex items-center gap-2",
                    children: [
                      (0, t.jsx)("span", {
                        className: "text-sm text-[var(--brand-400)] font-mono",
                        children: m
                          ? `https://${m}/b/${e.slug}`
                          : `${a}/b/${e.slug}`,
                      }),
                      (0, t.jsx)("button", {
                        onClick: () => {
                          let t = m
                            ? `https://${m}/b/${e.slug}`
                            : `${a}/b/${e.slug}`;
                          navigator.clipboard.writeText(t);
                        },
                        className:
                          "text-white/30 hover:text-white transition-colors",
                        children: (0, t.jsx)(x.ExternalLink, {
                          size: 12,
                        }),
                      }),
                    ],
                  }),
                  m &&
                    (0, t.jsxs)("p", {
                      className: "text-xs text-white/30",
                      children: [
                        "Tambem acessivel via: ",
                        (0, t.jsxs)("span", {
                          className: "text-white/40",
                          children: [a, "/b/", e.slug],
                        }),
                      ],
                    }),
                ],
              }),
            ],
          }),
        ],
      });
    }
    function H(e) {
      let a,
        l,
        i,
        r,
        o,
        n,
        c,
        d,
        h,
        x,
        m,
        u,
        b,
        p,
        g,
        f,
        w,
        v,
        j,
        y,
        N,
        k,
        C = (0, s.c)(50),
        { biolink: S, updateField: _ } = e;
      (C[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (0, t.jsx)("label", {
            className: "text-sm text-white/60 font-medium mb-1.5 block",
            children: "Titulo da Pagina",
          })),
          (C[0] = a))
        : (a = C[0]),
        C[1] !== _
          ? ((l = (e) => _("seo.title", e.target.value)),
            (C[1] = _),
            (C[2] = l))
          : (l = C[2]));
      let T = S.profile.name || "Titulo SEO";
      (C[3] !== S.seo.title || C[4] !== l || C[5] !== T
        ? ((i = (0, t.jsx)("input", {
            type: "text",
            value: S.seo.title,
            onChange: l,
            placeholder: T,
            className:
              "w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[var(--brand-500)]/50",
          })),
          (C[3] = S.seo.title),
          (C[4] = l),
          (C[5] = T),
          (C[6] = i))
        : (i = C[6]),
        C[7] === Symbol.for("react.memo_cache_sentinel")
          ? ((r = (0, t.jsx)("p", {
              className: "text-xs text-white/30 mt-1",
              children: "Deixe vazio para usar o nome do perfil",
            })),
            (C[7] = r))
          : (r = C[7]),
        C[8] !== i
          ? ((o = (0, t.jsxs)("div", {
              children: [a, i, r],
            })),
            (C[8] = i),
            (C[9] = o))
          : (o = C[9]),
        C[10] === Symbol.for("react.memo_cache_sentinel")
          ? ((n = (0, t.jsx)("label", {
              className: "text-sm text-white/60 font-medium mb-1.5 block",
              children: "Descricao",
            })),
            (C[10] = n))
          : (n = C[10]),
        C[11] !== _
          ? ((c = (e) => _("seo.description", e.target.value)),
            (C[11] = _),
            (C[12] = c))
          : (c = C[12]));
      let z = S.profile.bio || "Descricao para SEO e redes sociais";
      (C[13] !== S.seo.description || C[14] !== c || C[15] !== z
        ? ((d = (0, t.jsx)("textarea", {
            value: S.seo.description,
            onChange: c,
            placeholder: z,
            rows: 3,
            className:
              "w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[var(--brand-500)]/50 resize-none",
          })),
          (C[13] = S.seo.description),
          (C[14] = c),
          (C[15] = z),
          (C[16] = d))
        : (d = C[16]),
        C[17] === Symbol.for("react.memo_cache_sentinel")
          ? ((h = (0, t.jsx)("p", {
              className: "text-xs text-white/30 mt-1",
              children: "Deixe vazio para usar a bio do perfil",
            })),
            (C[17] = h))
          : (h = C[17]),
        C[18] !== d
          ? ((x = (0, t.jsxs)("div", {
              children: [n, d, h],
            })),
            (C[18] = d),
            (C[19] = x))
          : (x = C[19]),
        C[20] === Symbol.for("react.memo_cache_sentinel")
          ? ((m = (0, t.jsx)("label", {
              className: "text-sm text-white/60 font-medium mb-1.5 block",
              children: "Imagem OG (Open Graph)",
            })),
            (C[20] = m))
          : (m = C[20]),
        C[21] !== _
          ? ((u = (e) => _("seo.ogImageUrl", e.target.value)),
            (C[21] = _),
            (C[22] = u))
          : (u = C[22]),
        C[23] !== S.seo.ogImageUrl || C[24] !== u
          ? ((b = (0, t.jsxs)("div", {
              children: [
                m,
                (0, t.jsx)("input", {
                  type: "url",
                  value: S.seo.ogImageUrl,
                  onChange: u,
                  placeholder: "https://... (deixe vazio para usar avatar)",
                  className:
                    "w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[var(--brand-500)]/50",
                }),
              ],
            })),
            (C[23] = S.seo.ogImageUrl),
            (C[24] = u),
            (C[25] = b))
          : (b = C[25]),
        C[26] === Symbol.for("react.memo_cache_sentinel")
          ? ((p = (0, t.jsx)("label", {
              className: "text-sm text-white/60 font-medium mb-1.5 block",
              children: "Favicon",
            })),
            (C[26] = p))
          : (p = C[26]),
        C[27] !== _
          ? ((g = (e) => _("seo.favicon", e.target.value)),
            (C[27] = _),
            (C[28] = g))
          : (g = C[28]),
        C[29] !== S.seo.favicon || C[30] !== g
          ? ((f = (0, t.jsxs)("div", {
              children: [
                p,
                (0, t.jsx)("input", {
                  type: "url",
                  value: S.seo.favicon,
                  onChange: g,
                  placeholder: "https://... (URL do favicon)",
                  className:
                    "w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[var(--brand-500)]/50",
                }),
              ],
            })),
            (C[29] = S.seo.favicon),
            (C[30] = g),
            (C[31] = f))
          : (f = C[31]),
        C[32] === Symbol.for("react.memo_cache_sentinel")
          ? ((w = (0, t.jsx)("p", {
              className: "text-xs text-white/40 mb-2",
              children: "Preview no Google:",
            })),
            (C[32] = w))
          : (w = C[32]));
      let U = S.seo.title || S.profile.name || "Bio Link";
      C[33] !== U
        ? ((v = (0, t.jsx)("p", {
            className: "text-sm text-[var(--brand-400)]",
            children: U,
          })),
          (C[33] = U),
          (C[34] = v))
        : (v = C[34]);
      let B = S.customDomain || "sharkbot.com.br";
      C[35] !== S.slug || C[36] !== B
        ? ((j = (0, t.jsxs)("p", {
            className: "text-xs text-green-400",
            children: [B, "/b/", S.slug],
          })),
          (C[35] = S.slug),
          (C[36] = B),
          (C[37] = j))
        : (j = C[37]);
      let E = S.seo.description || S.profile.bio || "Descricao da pagina...";
      return (
        C[38] !== E
          ? ((y = (0, t.jsx)("p", {
              className: "text-xs text-white/40",
              children: E,
            })),
            (C[38] = E),
            (C[39] = y))
          : (y = C[39]),
        C[40] !== v || C[41] !== j || C[42] !== y
          ? ((N = (0, t.jsxs)("div", {
              className: "p-4 rounded-xl bg-white/[0.03] border border-white/5",
              children: [
                w,
                (0, t.jsxs)("div", {
                  className: "space-y-1",
                  children: [v, j, y],
                }),
              ],
            })),
            (C[40] = v),
            (C[41] = j),
            (C[42] = y),
            (C[43] = N))
          : (N = C[43]),
        C[44] !== x || C[45] !== b || C[46] !== f || C[47] !== N || C[48] !== o
          ? ((k = (0, t.jsxs)("div", {
              className: "space-y-4",
              children: [o, x, b, f, N],
            })),
            (C[44] = x),
            (C[45] = b),
            (C[46] = f),
            (C[47] = N),
            (C[48] = o),
            (C[49] = k))
          : (k = C[49]),
        k
      );
    }
    function M(e) {
      let a,
        l,
        i,
        r,
        o,
        n,
        c,
        d,
        h,
        x = (0, s.c)(24),
        { label: m, value: u, onChange: b } = e;
      x[0] !== m
        ? ((a = (0, t.jsx)("label", {
            className: "text-xs text-white/40 mb-1.5 block",
            children: m,
          })),
          (x[0] = m),
          (x[1] = a))
        : (a = x[1]);
      let p = u || "#ffffff",
        g = `0 0 12px ${u || "#ffffff"}40`;
      x[2] !== p || x[3] !== g
        ? ((l = (0, t.jsx)("div", {
            className:
              "w-10 h-10 rounded-lg border-2 border-white/20 shadow-lg",
            style: {
              backgroundColor: p,
              boxShadow: g,
            },
          })),
          (x[2] = p),
          (x[3] = g),
          (x[4] = l))
        : (l = x[4]);
      let f = u || "#ffffff";
      (x[5] !== b
        ? ((i = (e) => b(e.target.value)), (x[5] = b), (x[6] = i))
        : (i = x[6]),
        x[7] !== f || x[8] !== i
          ? ((r = (0, t.jsx)("input", {
              type: "color",
              value: f,
              onChange: i,
              className:
                "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
            })),
            (x[7] = f),
            (x[8] = i),
            (x[9] = r))
          : (r = x[9]),
        x[10] !== l || x[11] !== r
          ? ((o = (0, t.jsxs)("div", {
              className: "relative flex-shrink-0",
              children: [l, r],
            })),
            (x[10] = l),
            (x[11] = r),
            (x[12] = o))
          : (o = x[12]));
      let w = u || "";
      return (
        x[13] !== b
          ? ((n = (e) => b(e.target.value)), (x[13] = b), (x[14] = n))
          : (n = x[14]),
        x[15] !== n || x[16] !== w
          ? ((c = (0, t.jsx)("input", {
              type: "text",
              value: w,
              onChange: n,
              placeholder: "#000000",
              className:
                "flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[var(--brand-500)]/50",
            })),
            (x[15] = n),
            (x[16] = w),
            (x[17] = c))
          : (c = x[17]),
        x[18] !== c || x[19] !== o
          ? ((d = (0, t.jsxs)("div", {
              className:
                "flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.03] border border-white/5",
              children: [o, c],
            })),
            (x[18] = c),
            (x[19] = o),
            (x[20] = d))
          : (d = x[20]),
        x[21] !== a || x[22] !== d
          ? ((h = (0, t.jsxs)("div", {
              children: [a, d],
            })),
            (x[21] = a),
            (x[22] = d),
            (x[23] = h))
          : (h = x[23]),
        h
      );
    }
    e.s([
      "default",
      0,
      function ({ params: e }) {
        let s = (0, l.use)(e),
          a = (0, i.useRouter)(),
          { addToast: c } = (0, z.useToast)(),
          [d, h] = (0, l.useState)(null),
          [x, m] = (0, l.useState)(!0),
          [b, p] = (0, l.useState)(!1),
          [g, f] = (0, l.useState)("profile"),
          [w, v] = (0, l.useState)(!1),
          j = window.location.origin;
        (0, l.useEffect)(() => {
          y();
        }, []);
        let y = async () => {
            try {
              let e = await fetch(`/api/biolinks/${s.id}`, {
                  credentials: "include",
                }),
                t = await e.json();
              t.success
                ? h(t.data)
                : (c({
                    type: "error",
                    title: "Bio link nao encontrado",
                  }),
                  a.push("/integracoes/biolink"));
            } catch {
              a.push("/integracoes/biolink");
            } finally {
              m(!1);
            }
          },
          N = (e, t) => {
            if (!d) return;
            let s = {
                ...d,
              },
              a = e.split("."),
              l = s;
            for (let e = 0; e < a.length - 1; e++)
              ((l[a[e]] = {
                ...l[a[e]],
              }),
                (l = l[a[e]]));
            ((l[a[a.length - 1]] = t), h(s), v(!0));
          },
          k = async () => {
            if (d) {
              p(!0);
              try {
                let { _id: e, stats: t, createdAt: s, ...a } = d,
                  l = await fetch(`/api/biolinks/${e}`, {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(a),
                  }),
                  i = await l.json();
                i.success
                  ? (h(i.data),
                    v(!1),
                    c({
                      type: "success",
                      title: "Bio link salvo!",
                    }))
                  : c({
                      type: "error",
                      title: "Erro ao salvar",
                      description: i.error,
                    });
              } catch {
                c({
                  type: "error",
                  title: "Erro ao salvar",
                });
              } finally {
                p(!1);
              }
            }
          },
          C = async (e) => {
            if (!d) return;
            let t = new FormData();
            (t.append("file", e),
              t.append("resourceType", "biolink"),
              t.append("resourceId", s.id));
            try {
              let e = await fetch(`/api/biolinks/${d._id}/upload-avatar`, {
                  method: "POST",
                  credentials: "include",
                  body: t,
                }),
                s = await e.json();
              s.success
                ? (N("profile.avatarUrl", s.data.url),
                  c({
                    type: "success",
                    title: "Avatar atualizado!",
                  }))
                : c({
                    type: "error",
                    title: "Erro no upload",
                    description: s.error,
                  });
            } catch {
              c({
                type: "error",
                title: "Erro no upload",
              });
            }
          },
          S = async (e) => {
            if (!d) return null;
            let t = new FormData();
            (t.append("file", e),
              t.append("resourceType", "biolink"),
              t.append("resourceId", s.id));
            try {
              let e = await fetch(`/api/biolinks/${d._id}/upload-highlight`, {
                  method: "POST",
                  credentials: "include",
                  body: t,
                }),
                s = await e.json();
              if (s.success) return s.data.url;
            } catch {}
            return null;
          },
          _ = async (e) => {
            if (!d) return;
            let t = new FormData();
            (t.append("file", e),
              t.append("resourceType", "biolink"),
              t.append("resourceId", s.id));
            try {
              let e = await fetch(`/api/biolinks/${d._id}/upload-background`, {
                  method: "POST",
                  credentials: "include",
                  body: t,
                }),
                s = await e.json();
              s.success
                ? (N("theme.backgroundImageUrl", s.data.url),
                  c({
                    type: "success",
                    title: "Background atualizado!",
                  }))
                : c({
                    type: "error",
                    title: "Erro no upload",
                    description: s.error,
                  });
            } catch {
              c({
                type: "error",
                title: "Erro no upload",
              });
            }
          };
        return x || !d
          ? (0, t.jsx)("div", {
              className: "flex items-center justify-center py-20",
              children: (0, t.jsx)(n.Loader2, {
                className: "w-8 h-8 animate-spin text-[var(--brand-400)]",
              }),
            })
          : (0, t.jsxs)("div", {
              className: "space-y-6",
              children: [
                (0, t.jsxs)("div", {
                  className:
                    "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                  children: [
                    (0, t.jsxs)("div", {
                      className: "flex items-center gap-3",
                      children: [
                        (0, t.jsx)("button", {
                          onClick: () => a.push("/integracoes/biolink"),
                          className:
                            "p-2 rounded-lg hover:bg-white/5 transition-colors",
                          children: (0, t.jsx)(r.ArrowLeft, {
                            size: 18,
                            className: "text-white/40",
                          }),
                        }),
                        (0, t.jsxs)("div", {
                          className: "min-w-0",
                          children: [
                            (0, t.jsx)("h1", {
                              className:
                                "text-lg sm:text-xl font-bold text-white truncate",
                              children: d.profile.name || "Editar Bio Link",
                            }),
                            (0, t.jsx)("p", {
                              className: "text-xs text-white/40 truncate",
                              children: d.customDomain
                                ? `https://${d.customDomain}/b/${d.slug}`
                                : `${j}/b/${d.slug}`,
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, t.jsxs)("div", {
                      className:
                        "flex items-center gap-2 sm:gap-3 ml-auto sm:ml-0",
                      children: [
                        (0, t.jsxs)("a", {
                          href: `/b/${d.slug}`,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          className:
                            "flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 text-xs sm:text-sm transition-colors",
                          children: [
                            (0, t.jsx)(u.Eye, {
                              size: 14,
                            }),
                            " Preview",
                          ],
                        }),
                        (0, t.jsxs)("button", {
                          onClick: k,
                          disabled: b || !w,
                          className: (0, T.cn)(
                            "flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all",
                            b || !w
                              ? "bg-white/[0.06] text-white/30 cursor-not-allowed"
                              : "bg-[var(--brand-500)] hover:bg-[var(--brand-500)]/80 text-white",
                          ),
                          children: [
                            b
                              ? (0, t.jsx)(n.Loader2, {
                                  size: 14,
                                  className: "animate-spin",
                                })
                              : (0, t.jsx)(o.Save, {
                                  size: 14,
                                }),
                            "Salvar",
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, t.jsx)("div", {
                  className: "overflow-x-auto scrollbar-hide -mx-1 px-1",
                  children: (0, t.jsx)("div", {
                    className:
                      "flex gap-1 p-1 bg-white/[0.03] rounded-xl border border-white/5 min-w-max sm:min-w-0",
                    children: U.map((e) =>
                      (0, t.jsxs)(
                        "button",
                        {
                          onClick: () => f(e.id),
                          className: (0, T.cn)(
                            "flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm transition-all sm:flex-1 justify-center whitespace-nowrap",
                            g === e.id
                              ? "bg-white/10 text-white font-medium"
                              : "text-white/40 hover:text-white/60 hover:bg-white/5",
                          ),
                          children: [
                            e.icon,
                            (0, t.jsx)("span", {
                              children: e.label,
                            }),
                          ],
                        },
                        e.id,
                      ),
                    ),
                  }),
                }),
                (0, t.jsxs)("div", {
                  className:
                    "bg-white/[0.02] border border-white/5 rounded-2xl p-4 sm:p-6",
                  children: [
                    "profile" === g &&
                      (0, t.jsx)(D, {
                        biolink: d,
                        updateField: N,
                        onUploadAvatar: C,
                      }),
                    "buttons" === g &&
                      (0, t.jsx)(I, {
                        biolink: d,
                        updateField: N,
                      }),
                    "highlights" === g &&
                      (0, t.jsx)(O, {
                        biolink: d,
                        updateField: N,
                        onUploadHighlight: S,
                      }),
                    "theme" === g &&
                      (0, t.jsx)(V, {
                        biolink: d,
                        updateField: N,
                        onUploadBackground: _,
                      }),
                    "domain" === g &&
                      (0, t.jsx)(q, {
                        biolink: d,
                        updateField: N,
                      }),
                    "seo" === g &&
                      (0, t.jsx)(H, {
                        biolink: d,
                        updateField: N,
                      }),
                  ],
                }),
              ],
            });
      },
    ]);
  },
]);
