(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  854006,
  (e) => {
    "use strict";
    var t = e.i(843476),
      s = e.i(500932),
      a = e.i(271645),
      r = e.i(283599),
      i = e.i(266587),
      l = e.i(793479),
      n = e.i(673635),
      d = e.i(967489),
      o = e.i(776639),
      c = e.i(158524),
      x = e.i(174886),
      m = e.i(778917),
      h = e.i(788699),
      p = e.i(727612),
      b = e.i(640524),
      u = e.i(531278),
      g = e.i(356909),
      j = e.i(37727),
      f = e.i(643531),
      w = e.i(196421),
      v = e.i(16715),
      N = e.i(107233),
      k = e.i(107899),
      y = e.i(878894),
      C = e.i(39312),
      S = e.i(98919),
      _ = e.i(751737),
      z = e.i(217923);
    let T = (0, e.i(475254).default)("flask-conical", [
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
    var I = e.i(751975),
      A = e.i(664659),
      U = e.i(655900),
      E = e.i(212426),
      P = e.i(761911),
      V = e.i(201928),
      L = e.i(248256),
      D = e.i(269638),
      M = e.i(503116),
      R = e.i(63209),
      B = e.i(115057),
      $ = e.i(178583),
      O = e.i(286536),
      q = e.i(293022),
      G = e.i(88081),
      F = e.i(758472),
      W = e.i(975157),
      H = e.i(699375),
      X = e.i(846932),
      J = e.i(88653),
      Q = e.i(803141);
    let K = [
        {
          id: "pink_dots",
          name: "Rosa",
          preview: "bg-pink-400",
        },
        {
          id: "blue_gradient",
          name: "Azul",
          preview: "bg-gradient-to-br from-[#0c1929] to-[#2563eb]",
        },
        {
          id: "dark",
          name: "Escuro",
          preview: "bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]",
        },
        {
          id: "purple_waves",
          name: "Roxo",
          preview: "bg-gradient-to-br from-[#581c87] to-[#7c3aed]",
        },
        {
          id: "green_nature",
          name: "Verde",
          preview: "bg-gradient-to-br from-[#064e3b] to-[#059669]",
        },
        {
          id: "custom",
          name: "Custom",
          preview: "bg-[#333] border-2 border-dashed border-white/20",
        },
      ],
      Z = [
        {
          id: "scratch",
          name: "Raspadinha",
          preview: "bg-gradient-to-br from-[#c0c0c0] to-[#a8a8a8]",
          emoji: "🤫",
        },
        {
          id: "captcha",
          name: "Verificação",
          preview: "bg-gradient-to-br from-[#1e293b] to-[#0f172a]",
          emoji: "🛡️",
        },
        {
          id: "countdown",
          name: "Countdown",
          preview: "bg-gradient-to-br from-[#0c1929] to-[#1e3a5f]",
          emoji: "⏳",
        },
        {
          id: "age_gate",
          name: "+18",
          preview: "bg-[#141414]",
          emoji: "⚠️",
        },
        {
          id: "gift",
          name: "Presente",
          preview: "bg-gradient-to-br from-[#0f0524] to-[#1a0a3e]",
          emoji: "🎁",
        },
      ],
      Y = {
        enabled: !1,
        source: "FB",
        medium: "{{adset.name}}|{{adset.id}}",
        campaign: "{{campaign.name}}|{{campaign.id}}",
        content: "{{ad.name}}|{{ad.id}}",
        term: "{{placement}}",
        id: "{{campaign.id}}",
      },
      ee = () => {
        let e = "abcdefghijklmnopqrstuvwxyz0123456789",
          t = "";
        for (let s = 0; s < 8; s++)
          t += e.charAt(Math.floor(Math.random() * e.length));
        return t;
      };
    function et(e) {
      let a,
        r,
        i,
        l,
        n,
        d,
        o,
        c,
        x,
        m,
        h,
        p,
        b,
        u,
        g,
        j,
        f,
        w,
        v,
        N = (0, s.c)(61),
        { config: k } = e;
      if (N[0] !== k.template) {
        a = Symbol.for("react.early_return_sentinel");
        e: {
          let e = {
            scratch: {
              bg: "bg-gradient-to-br from-[#c0c0c0] to-[#a8a8a8]",
              emoji: "🤫",
              title: "RASPE PARA VER",
              sub: "Use o dedo para descobrir",
            },
            captcha: {
              bg: "bg-gradient-to-br from-[#1e293b] to-[#0f172a]",
              emoji: "🛡️",
              title: "Verificação de Segurança",
              sub: "Arraste para verificar →",
            },
            countdown: {
              bg: "bg-gradient-to-br from-[#0c1929] to-[#1e3a5f]",
              emoji: "⏳",
              title: "3",
              sub: "Preparando seu acesso...",
            },
            age_gate: {
              bg: "bg-[#141414]",
              emoji: "⚠️",
              title: "Conteúdo Restrito",
              sub: "Confirme que tem +18",
            },
            gift: {
              bg: "bg-gradient-to-br from-[#0f0524] to-[#1a0a3e]",
              emoji: "🎁",
              title: "Toque para abrir",
              sub: "Você recebeu um presente",
            },
          }[k.template];
          if (e) {
            let s, r, i;
            if ("captcha" === k.template) {
              let e, s, r, i, l;
              (N[2] === Symbol.for("react.memo_cache_sentinel")
                ? ((e = (0, t.jsx)("p", {
                    className:
                      "text-[#202124] text-sm font-semibold text-center mb-1",
                    children: "Verificação de segurança",
                  })),
                  (s = (0, t.jsx)("p", {
                    className: "text-[#5f6368] text-[10px] text-center mb-4",
                    children: "Marque a caixinha abaixo!",
                  })),
                  (N[2] = e),
                  (N[3] = s))
                : ((e = N[2]), (s = N[3])),
                N[4] === Symbol.for("react.memo_cache_sentinel")
                  ? ((r = (0, t.jsxs)("div", {
                      className: "flex items-center gap-2",
                      children: [
                        (0, t.jsx)("div", {
                          className:
                            "w-5 h-5 border-2 border-[#c1c1c1] rounded",
                        }),
                        (0, t.jsx)("span", {
                          className: "text-[#202124] text-[11px]",
                          children: "Sou maior de 18 anos",
                        }),
                      ],
                    })),
                    (N[4] = r))
                  : (r = N[4]),
                N[5] === Symbol.for("react.memo_cache_sentinel")
                  ? ((i = (0, t.jsxs)("div", {
                      className:
                        "border-2 border-[#d3d3d3] rounded bg-[#f9f9f9] p-3 flex items-center justify-between mb-3",
                      children: [
                        r,
                        (0, t.jsxs)("div", {
                          className: "text-center",
                          children: [
                            (0, t.jsxs)("svg", {
                              className: "w-6 h-6 mx-auto",
                              viewBox: "0 0 64 64",
                              children: [
                                (0, t.jsx)("path", {
                                  d: "M32 2a30 30 0 1 0 0 60 30 30 0 0 0 0-60z",
                                  fill: "none",
                                  stroke: "#4285f4",
                                  strokeWidth: "4",
                                }),
                                (0, t.jsx)("circle", {
                                  cx: "32",
                                  cy: "32",
                                  r: "12",
                                  fill: "#4285f4",
                                  opacity: "0.2",
                                }),
                              ],
                            }),
                            (0, t.jsx)("p", {
                              className: "text-[6px] text-[#555]",
                              children: "reCAPTCHA",
                            }),
                          ],
                        }),
                      ],
                    })),
                    (N[5] = i))
                  : (i = N[5]),
                N[6] === Symbol.for("react.memo_cache_sentinel")
                  ? ((l = (0, t.jsx)("div", {
                      className:
                        "rounded-2xl overflow-hidden w-full max-w-[300px] mx-auto aspect-[9/16] flex items-center justify-center p-4 bg-[#e8e8e8]",
                      children: (0, t.jsxs)("div", {
                        className: "bg-white rounded-xl p-5 w-full shadow-md",
                        children: [
                          e,
                          s,
                          i,
                          (0, t.jsx)("div", {
                            className:
                              "w-full py-2.5 bg-[#7b68ee] rounded-lg text-center",
                            children: (0, t.jsx)("span", {
                              className:
                                "text-white text-[10px] font-semibold uppercase",
                              children: "Verificar e Assistir",
                            }),
                          }),
                        ],
                      }),
                    })),
                    (N[6] = l))
                  : (l = N[6]),
                (a = l));
              break e;
            }
            if ("scratch" === k.template) {
              let e;
              (N[7] === Symbol.for("react.memo_cache_sentinel")
                ? ((e = (0, t.jsx)("div", {
                    className:
                      "rounded-2xl overflow-hidden w-full max-w-[300px] mx-auto aspect-[9/16] flex items-center justify-center bg-[#0a0a0a]",
                    children: (0, t.jsxs)("div", {
                      className:
                        "w-[85%] aspect-[3/4] rounded-2xl bg-gradient-to-br from-[#c0c0c0] to-[#a8a8a8] flex flex-col items-center justify-center shadow-2xl",
                      children: [
                        (0, t.jsx)("svg", {
                          className: "w-10 h-10 mb-3 text-[#666]",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          strokeWidth: "1.5",
                          children: (0, t.jsx)("path", {
                            d: "M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59",
                          }),
                        }),
                        (0, t.jsx)("p", {
                          className:
                            "text-[#555] text-sm font-extrabold uppercase tracking-wide",
                          children: "Raspe para ver",
                        }),
                        (0, t.jsx)("p", {
                          className: "text-[#888] text-[10px] mt-1",
                          children: "Use o dedo para descobrir",
                        }),
                      ],
                    }),
                  })),
                  (N[7] = e))
                : (e = N[7]),
                (a = e));
              break e;
            }
            if ("age_gate" === k.template) {
              let e, s, r, i, l;
              (N[8] === Symbol.for("react.memo_cache_sentinel")
                ? ((e = (0, t.jsx)("div", {
                    className:
                      "w-10 h-10 mx-auto mb-3 bg-yellow-500/10 rounded-xl flex items-center justify-center",
                    children: (0, t.jsxs)("svg", {
                      className: "w-5 h-5 text-yellow-500",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      children: [
                        (0, t.jsx)("path", {
                          d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z",
                        }),
                        (0, t.jsx)("line", {
                          x1: "12",
                          y1: "9",
                          x2: "12",
                          y2: "13",
                        }),
                        (0, t.jsx)("line", {
                          x1: "12",
                          y1: "17",
                          x2: "12.01",
                          y2: "17",
                        }),
                      ],
                    }),
                  })),
                  (s = (0, t.jsx)("p", {
                    className: "text-white text-sm font-bold text-center mb-1",
                    children: "Conteúdo Restrito",
                  })),
                  (r = (0, t.jsx)("p", {
                    className: "text-[#71717a] text-[10px] text-center mb-4",
                    children: "Maiores de 18 anos",
                  })),
                  (N[8] = e),
                  (N[9] = s),
                  (N[10] = r))
                : ((e = N[8]), (s = N[9]), (r = N[10])),
                N[11] === Symbol.for("react.memo_cache_sentinel")
                  ? ((i = (0, t.jsx)("div", {
                      className:
                        "flex-1 py-2 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-center",
                      children: (0, t.jsx)("span", {
                        className: "text-white text-[10px] font-bold",
                        children: "Tenho +18",
                      }),
                    })),
                    (N[11] = i))
                  : (i = N[11]),
                N[12] === Symbol.for("react.memo_cache_sentinel")
                  ? ((l = (0, t.jsx)("div", {
                      className:
                        "rounded-2xl overflow-hidden w-full max-w-[300px] mx-auto aspect-[9/16] flex items-center justify-center bg-[#0a0a0a]",
                      children: (0, t.jsxs)("div", {
                        className:
                          "bg-[#141414] rounded-2xl p-5 w-[85%] border border-white/[0.08]",
                        children: [
                          e,
                          s,
                          r,
                          (0, t.jsxs)("div", {
                            className: "flex gap-2",
                            children: [
                              i,
                              (0, t.jsx)("div", {
                                className:
                                  "flex-1 py-2 bg-[#1e1e1e] border border-white/10 rounded-xl text-center",
                                children: (0, t.jsx)("span", {
                                  className:
                                    "text-[#71717a] text-[10px] font-bold",
                                  children: "Sair",
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    })),
                    (N[12] = l))
                  : (l = N[12]),
                (a = l));
              break e;
            }
            if ("gift" === k.template) {
              let e;
              (N[13] === Symbol.for("react.memo_cache_sentinel")
                ? ((e = (0, t.jsx)("div", {
                    className:
                      "rounded-2xl overflow-hidden w-full max-w-[300px] mx-auto aspect-[9/16] flex items-center justify-center bg-gradient-to-br from-[#0f0524] to-[#1a0a3e]",
                    children: (0, t.jsxs)("div", {
                      className: "text-center",
                      children: [
                        (0, t.jsxs)("div", {
                          className: "relative w-28 h-28 mx-auto mb-4",
                          children: [
                            (0, t.jsx)("div", {
                              className:
                                "absolute bottom-0 w-28 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl",
                            }),
                            (0, t.jsx)("div", {
                              className:
                                "absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-20 bg-gradient-to-b from-yellow-400 to-amber-500 z-10",
                            }),
                            (0, t.jsx)("div", {
                              className:
                                "absolute bottom-[40px] left-0 w-28 h-4 bg-gradient-to-r from-yellow-400 to-amber-500 z-10",
                            }),
                            (0, t.jsx)("div", {
                              className:
                                "absolute top-0 w-[120px] -left-[4px] h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl z-20 shadow-lg",
                            }),
                            (0, t.jsx)("div", {
                              className:
                                "absolute -top-3 left-1/2 -translate-x-1/2 z-30 text-2xl",
                              children: "🎀",
                            }),
                          ],
                        }),
                        (0, t.jsx)("p", {
                          className:
                            "text-purple-300 text-sm font-semibold mb-1",
                          children: "Toque para abrir",
                        }),
                        (0, t.jsx)("p", {
                          className: "text-purple-300/30 text-[10px]",
                          children: "Presente exclusivo",
                        }),
                      ],
                    }),
                  })),
                  (N[13] = e))
                : (e = N[13]),
                (a = e));
              break e;
            }
            (N[14] === Symbol.for("react.memo_cache_sentinel")
              ? ((s = (0, t.jsx)("div", {
                  className: "text-7xl font-extrabold text-white mb-2",
                  style: {
                    textShadow: "0 0 60px rgba(0,136,204,0.4)",
                  },
                  children: "3",
                })),
                (r = (0, t.jsx)("p", {
                  className: "text-[#94a3b8] text-sm mb-6",
                  children: "Preparando seu acesso...",
                })),
                (N[14] = s),
                (N[15] = r))
              : ((s = N[14]), (r = N[15])),
              N[16] === Symbol.for("react.memo_cache_sentinel")
                ? ((i = (0, t.jsxs)("div", {
                    className: "text-center w-full",
                    children: [
                      s,
                      r,
                      (0, t.jsx)("div", {
                        className:
                          "w-full h-1.5 bg-white/10 rounded-full overflow-hidden",
                        children: (0, t.jsx)("div", {
                          className:
                            "h-full w-1/3 bg-gradient-to-r from-[#0088cc] to-[#00aaff] rounded-full",
                        }),
                      }),
                    ],
                  })),
                  (N[16] = i))
                : (i = N[16]),
              (a = (0, t.jsx)("div", {
                className: (0, W.cn)(
                  "rounded-2xl overflow-hidden w-full max-w-[300px] mx-auto aspect-[9/16] flex items-center justify-center p-4",
                  e.bg,
                ),
                children: i,
              })));
            break e;
          }
        }
        ((N[0] = k.template), (N[1] = a));
      } else a = N[1];
      if (a !== Symbol.for("react.early_return_sentinel")) return a;
      N[17] !== k.template
        ? ((r = () => {
            switch (k.template) {
              case "pink_dots":
              default:
                return "bg-pink-400";
              case "blue_gradient":
                return "bg-gradient-to-br from-[#0c1929] to-[#2563eb]";
              case "dark":
                return "bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]";
              case "purple_waves":
                return "bg-gradient-to-br from-[#581c87] to-[#7c3aed]";
              case "green_nature":
                return "bg-gradient-to-br from-[#064e3b] to-[#059669]";
              case "custom":
                return "";
            }
          }),
          (N[17] = k.template),
          (N[18] = r))
        : (r = N[18]);
      let y = r;
      N[19] !== k.customColor || N[20] !== k.template
        ? ((i =
            "custom" === k.template
              ? {
                  backgroundColor: k.customColor || "#f472b6",
                }
              : {}),
          (N[19] = k.customColor),
          (N[20] = k.template),
          (N[21] = i))
        : (i = N[21]);
      let C = i,
        S = "dark" === k.template;
      N[22] !== y
        ? ((l = (0, W.cn)(
            "rounded-2xl overflow-hidden w-full max-w-[300px] mx-auto aspect-[9/16] flex items-center justify-content p-4",
            y(),
          )),
          (N[22] = y),
          (N[23] = l))
        : (l = N[23]);
      let _ = S ? "bg-[#1e1e1e]/90" : "bg-white/85";
      (N[24] !== _
        ? ((n = (0, W.cn)(
            "rounded-2xl p-6 text-center w-full backdrop-blur-xl",
            _,
          )),
          (N[24] = _),
          (N[25] = n))
        : (n = N[25]),
        N[26] === Symbol.for("react.memo_cache_sentinel")
          ? ((d = {
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            }),
            (N[26] = d))
          : (d = N[26]),
        N[27] !== k.name || N[28] !== k.photoUrl || N[29] !== S
          ? ((o = (0, t.jsx)("div", {
              className:
                "w-24 h-24 mx-auto mb-4 rounded-full p-1 bg-gradient-to-br from-pink-500 to-red-500",
              children: (0, t.jsx)("div", {
                className:
                  "w-full h-full rounded-full border-2 border-white overflow-hidden bg-gray-200",
                children: k.photoUrl
                  ? (0, t.jsx)("img", {
                      src: k.photoUrl,
                      alt: "",
                      className: "w-full h-full object-cover",
                    })
                  : (0, t.jsx)("div", {
                      className: (0, W.cn)(
                        "w-full h-full flex items-center justify-center text-2xl font-bold",
                        S
                          ? "bg-[#333] text-white"
                          : "bg-gray-200 text-gray-500",
                      ),
                      children: k.name ? k.name.charAt(0).toUpperCase() : "?",
                    }),
              }),
            })),
            (N[27] = k.name),
            (N[28] = k.photoUrl),
            (N[29] = S),
            (N[30] = o))
          : (o = N[30]));
      let z = S ? "text-white" : "text-gray-800";
      N[31] !== z
        ? ((c = (0, W.cn)("text-lg font-bold", z)), (N[31] = z), (N[32] = c))
        : (c = N[32]);
      let T = k.name || "Nome";
      (N[33] !== c || N[34] !== T
        ? ((x = (0, t.jsx)("span", {
            className: c,
            children: T,
          })),
          (N[33] = c),
          (N[34] = T),
          (N[35] = x))
        : (x = N[35]),
        N[36] !== k.verified
          ? ((m =
              k.verified &&
              (0, t.jsxs)("svg", {
                width: "20",
                height: "20",
                viewBox: "0 0 22 22",
                children: [
                  (0, t.jsx)("circle", {
                    cx: "11",
                    cy: "11",
                    r: "11",
                    fill: "#0088cc",
                  }),
                  (0, t.jsx)("path", {
                    d: "M6.5 11.5L9.5 14.5L15.5 8.5",
                    stroke: "white",
                    strokeWidth: "2.2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    fill: "none",
                  }),
                ],
              })),
            (N[36] = k.verified),
            (N[37] = m))
          : (m = N[37]),
        N[38] !== x || N[39] !== m
          ? ((h = (0, t.jsxs)("div", {
              className: "flex items-center justify-center gap-1 mb-1",
              children: [x, m],
            })),
            (N[38] = x),
            (N[39] = m),
            (N[40] = h))
          : (h = N[40]),
        N[41] === Symbol.for("react.memo_cache_sentinel")
          ? ((p = (0, t.jsxs)("div", {
              className: "flex items-center justify-center gap-1.5 mb-3",
              children: [
                (0, t.jsx)("div", {
                  className: "w-2 h-2 bg-green-500 rounded-full animate-pulse",
                }),
                (0, t.jsx)("span", {
                  className: "text-xs font-semibold text-green-500",
                  children: "Online",
                }),
              ],
            })),
            (N[41] = p))
          : (p = N[41]));
      let I = S ? "text-white/50" : "text-gray-500";
      N[42] !== I
        ? ((b = (0, W.cn)("text-[11px] mb-4", I)), (N[42] = I), (N[43] = b))
        : (b = N[43]);
      let A = k.responseTime || "3 minutos";
      (N[44] !== b || N[45] !== A
        ? ((u = (0, t.jsxs)("p", {
            className: b,
            children: ["Tempo médio de resposta: ", A],
          })),
          (N[44] = b),
          (N[45] = A),
          (N[46] = u))
        : (u = N[46]),
        N[47] === Symbol.for("react.memo_cache_sentinel")
          ? ((g = {
              boxShadow: "0 4px 15px rgba(0,136,204,0.3)",
            }),
            (N[47] = g))
          : (g = N[47]),
        N[48] === Symbol.for("react.memo_cache_sentinel")
          ? ((j = (0, t.jsx)("svg", {
              width: "18",
              height: "18",
              viewBox: "0 0 24 24",
              fill: "white",
              children: (0, t.jsx)("path", {
                d: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
              }),
            })),
            (N[48] = j))
          : (j = N[48]));
      let U = k.buttonText || "Toque AQUI para me chamar";
      return (
        N[49] !== U
          ? ((f = (0, t.jsxs)("button", {
              className:
                "w-full py-3 px-4 bg-[#0088cc] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2",
              style: g,
              children: [j, U],
            })),
            (N[49] = U),
            (N[50] = f))
          : (f = N[50]),
        N[51] !== h || N[52] !== u || N[53] !== f || N[54] !== n || N[55] !== o
          ? ((w = (0, t.jsxs)("div", {
              className: n,
              style: d,
              children: [o, h, p, u, f],
            })),
            (N[51] = h),
            (N[52] = u),
            (N[53] = f),
            (N[54] = n),
            (N[55] = o),
            (N[56] = w))
          : (w = N[56]),
        N[57] !== C || N[58] !== w || N[59] !== l
          ? ((v = (0, t.jsx)("div", {
              className: l,
              style: C,
              children: w,
            })),
            (N[57] = C),
            (N[58] = w),
            (N[59] = l),
            (N[60] = v))
          : (v = N[60]),
        v
      );
    }
    function es({ links: e, addToast: s }) {
      let [r, i] = (0, a.useState)(null),
        [n, d] = (0, a.useState)(!1),
        [o, x] = (0, a.useState)({
          enabled: !1,
          name: "",
          photoUrl: "",
          buttonText: "Toque AQUI para me chamar",
          responseTime: "3 minutos",
          template: "pink_dots",
          customColor: "#f472b6",
          customPattern: "dots",
          verified: !1,
        }),
        [m, h] = (0, a.useState)(!1),
        p = (0, a.useRef)(null),
        b = async () => {
          if (r) {
            d(!0);
            try {
              (
                await fetch(`/api/links/${r._id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: "include",
                  body: JSON.stringify({
                    redirectPage: o,
                  }),
                })
              ).ok
                ? (s({
                    type: "success",
                    title: "Página de redirect salva!",
                  }),
                  (r.redirectPage = {
                    ...o,
                  }),
                  i(null))
                : s({
                    type: "error",
                    title: "Erro ao salvar",
                  });
            } catch {
              s({
                type: "error",
                title: "Erro ao salvar",
              });
            } finally {
              d(!1);
            }
          }
        },
        f = async (e) => {
          let t = e.target.files?.[0];
          if (t) {
            h(!0);
            try {
              let e = new FormData();
              (e.append("file", t),
                e.append("prefix", "redirect"),
                e.append("resourceType", "link"),
                r?._id && e.append("resourceId", r._id));
              let s = await fetch("/api/upload/cdn", {
                method: "POST",
                credentials: "include",
                body: e,
              });
              if (s.ok) {
                let e = await s.json(),
                  t = e.data?.url || e.url;
                t &&
                  x((e) => {
                    let s = {
                      ...e,
                      photoUrl: t,
                    };
                    return (
                      r?._id &&
                        fetch(`/api/links/${r._id}`, {
                          method: "PUT",
                          credentials: "include",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            redirectPage: s,
                          }),
                        }).catch(() => {}),
                      s
                    );
                  });
              }
            } catch {
            } finally {
              (h(!1), p.current && (p.current.value = ""));
            }
          }
        };
      return r
        ? (0, t.jsxs)("div", {
            children: [
              (0, t.jsxs)("button", {
                onClick: () => i(null),
                className:
                  "flex items-center gap-2 text-white/50 hover:text-white text-sm mb-4 cursor-pointer",
                children: [
                  (0, t.jsx)(j.X, {
                    size: 16,
                  }),
                  " Voltar",
                ],
              }),
              (0, t.jsxs)("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
                children: [
                  (0, t.jsxs)("div", {
                    className: "space-y-4",
                    children: [
                      (0, t.jsxs)("div", {
                        className:
                          "bg-[#141414] border border-white/[0.06] rounded-xl p-5 space-y-5",
                        children: [
                          ![
                            "scratch",
                            "captcha",
                            "countdown",
                            "age_gate",
                            "gift",
                          ].includes(o.template) &&
                            (0, t.jsxs)(t.Fragment, {
                              children: [
                                (0, t.jsxs)("div", {
                                  children: [
                                    (0, t.jsx)("label", {
                                      className:
                                        "text-xs font-medium text-white/60 block mb-2",
                                      children: "Foto de Perfil",
                                    }),
                                    (0, t.jsxs)("div", {
                                      className: "flex items-center gap-3",
                                      children: [
                                        (0, t.jsx)("div", {
                                          className:
                                            "w-16 h-16 rounded-full overflow-hidden bg-white/[0.06] border border-white/[0.1] shrink-0",
                                          children: o.photoUrl
                                            ? (0, t.jsx)("img", {
                                                src: o.photoUrl,
                                                alt: "",
                                                className:
                                                  "w-full h-full object-cover",
                                              })
                                            : (0, t.jsx)("div", {
                                                className:
                                                  "w-full h-full flex items-center justify-center text-white/30 text-xl font-bold",
                                                children: o.name
                                                  ? o.name
                                                      .charAt(0)
                                                      .toUpperCase()
                                                  : "?",
                                              }),
                                        }),
                                        (0, t.jsxs)("div", {
                                          className: "flex gap-2",
                                          children: [
                                            (0, t.jsx)("input", {
                                              type: "file",
                                              ref: p,
                                              accept: "image/*",
                                              onChange: f,
                                              className: "hidden",
                                            }),
                                            (0, t.jsx)("button", {
                                              onClick: () => p.current?.click(),
                                              disabled: m,
                                              className:
                                                "px-3 py-1.5 bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs rounded-lg transition-colors cursor-pointer",
                                              children: m
                                                ? "Enviando..."
                                                : "Upload",
                                            }),
                                            o.photoUrl &&
                                              (0, t.jsx)("button", {
                                                onClick: () =>
                                                  x((e) => ({
                                                    ...e,
                                                    photoUrl: "",
                                                  })),
                                                className:
                                                  "px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs rounded-lg transition-colors cursor-pointer",
                                                children: "Remover",
                                              }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, t.jsx)("p", {
                                      className:
                                        "text-[10px] text-white/30 mt-1.5",
                                      children:
                                        "Se vazio, usa a foto do bot automaticamente",
                                    }),
                                  ],
                                }),
                                (0, t.jsxs)("div", {
                                  children: [
                                    (0, t.jsx)("label", {
                                      className:
                                        "text-xs font-medium text-white/60 block mb-1.5",
                                      children: "Nome",
                                    }),
                                    (0, t.jsx)(l.Input, {
                                      value: o.name,
                                      onChange: (e) =>
                                        x((t) => ({
                                          ...t,
                                          name: e.target.value,
                                        })),
                                      placeholder: "Ex: Larinne",
                                      className:
                                        "bg-white/[0.04] border-white/[0.08] text-white h-9 text-sm",
                                    }),
                                  ],
                                }),
                                (0, t.jsxs)("div", {
                                  className:
                                    "flex items-center justify-between",
                                  children: [
                                    (0, t.jsxs)("div", {
                                      children: [
                                        (0, t.jsx)("label", {
                                          className:
                                            "text-xs font-medium text-white/60",
                                          children: "Badge Verificado",
                                        }),
                                        (0, t.jsx)("p", {
                                          className:
                                            "text-[10px] text-white/30",
                                          children:
                                            "Mostra selo azul ao lado do nome",
                                        }),
                                      ],
                                    }),
                                    (0, t.jsx)(H.Switch, {
                                      checked: o.verified,
                                      onCheckedChange: (e) =>
                                        x((t) => ({
                                          ...t,
                                          verified: e,
                                        })),
                                    }),
                                  ],
                                }),
                                (0, t.jsxs)("div", {
                                  children: [
                                    (0, t.jsx)("label", {
                                      className:
                                        "text-xs font-medium text-white/60 block mb-1.5",
                                      children: "Texto do Botão",
                                    }),
                                    (0, t.jsx)(l.Input, {
                                      value: o.buttonText,
                                      onChange: (e) =>
                                        x((t) => ({
                                          ...t,
                                          buttonText: e.target.value,
                                        })),
                                      placeholder: "Toque AQUI para me chamar",
                                      className:
                                        "bg-white/[0.04] border-white/[0.08] text-white h-9 text-sm",
                                    }),
                                  ],
                                }),
                                (0, t.jsxs)("div", {
                                  children: [
                                    (0, t.jsx)("label", {
                                      className:
                                        "text-xs font-medium text-white/60 block mb-1.5",
                                      children: "Tempo de Resposta",
                                    }),
                                    (0, t.jsx)(l.Input, {
                                      value: o.responseTime,
                                      onChange: (e) =>
                                        x((t) => ({
                                          ...t,
                                          responseTime: e.target.value,
                                        })),
                                      placeholder: "3 minutos",
                                      className:
                                        "bg-white/[0.04] border-white/[0.08] text-white h-9 text-sm",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          (0, t.jsxs)("div", {
                            children: [
                              (0, t.jsx)("label", {
                                className:
                                  "text-xs font-medium text-white/60 block mb-2",
                                children: "Templates de Perfil",
                              }),
                              (0, t.jsx)("div", {
                                className: "grid grid-cols-3 gap-2",
                                children: K.map((e) =>
                                  (0, t.jsx)(
                                    "button",
                                    {
                                      onClick: () =>
                                        x((t) => ({
                                          ...t,
                                          template: e.id,
                                        })),
                                      className: (0, W.cn)(
                                        "rounded-xl h-20 flex items-end justify-center pb-2 transition-all cursor-pointer border-2",
                                        e.preview,
                                        o.template === e.id
                                          ? "border-[var(--brand-400)] ring-1 ring-[var(--brand-400)]/30"
                                          : "border-transparent hover:border-white/20",
                                      ),
                                      children: (0, t.jsx)("span", {
                                        className:
                                          "text-[10px] font-bold text-white drop-shadow-md",
                                        children: e.name,
                                      }),
                                    },
                                    e.id,
                                  ),
                                ),
                              }),
                              (0, t.jsx)("label", {
                                className:
                                  "text-xs font-medium text-white/60 block mb-2 mt-4",
                                children: "Templates Interativos",
                              }),
                              (0, t.jsx)("div", {
                                className: "grid grid-cols-3 gap-2",
                                children: Z.map((e) =>
                                  (0, t.jsxs)(
                                    "button",
                                    {
                                      onClick: () =>
                                        x((t) => ({
                                          ...t,
                                          template: e.id,
                                        })),
                                      className: (0, W.cn)(
                                        "rounded-xl h-20 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border-2",
                                        e.preview,
                                        o.template === e.id
                                          ? "border-[var(--brand-400)] ring-1 ring-[var(--brand-400)]/30"
                                          : "border-transparent hover:border-white/20",
                                      ),
                                      children: [
                                        (0, t.jsx)("span", {
                                          className: "text-lg",
                                          children: e.emoji,
                                        }),
                                        (0, t.jsx)("span", {
                                          className:
                                            "text-[10px] font-bold text-white drop-shadow-md",
                                          children: e.name,
                                        }),
                                      ],
                                    },
                                    e.id,
                                  ),
                                ),
                              }),
                            ],
                          }),
                          "custom" === o.template &&
                            (0, t.jsxs)("div", {
                              className: "space-y-3",
                              children: [
                                (0, t.jsxs)("div", {
                                  children: [
                                    (0, t.jsx)("label", {
                                      className:
                                        "text-xs font-medium text-white/60 block mb-1.5",
                                      children: "Cor",
                                    }),
                                    (0, t.jsxs)("div", {
                                      className: "flex items-center gap-2",
                                      children: [
                                        (0, t.jsx)("input", {
                                          type: "color",
                                          value: o.customColor,
                                          onChange: (e) =>
                                            x((t) => ({
                                              ...t,
                                              customColor: e.target.value,
                                            })),
                                          className:
                                            "w-9 h-9 rounded-lg border border-white/[0.1] cursor-pointer",
                                        }),
                                        (0, t.jsx)(l.Input, {
                                          value: o.customColor,
                                          onChange: (e) =>
                                            x((t) => ({
                                              ...t,
                                              customColor: e.target.value,
                                            })),
                                          className:
                                            "bg-white/[0.04] border-white/[0.08] text-white h-9 text-sm font-mono flex-1",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, t.jsxs)("div", {
                                  children: [
                                    (0, t.jsx)("label", {
                                      className:
                                        "text-xs font-medium text-white/60 block mb-1.5",
                                      children: "Padrão",
                                    }),
                                    (0, t.jsx)("div", {
                                      className: "flex gap-2",
                                      children: [
                                        "dots",
                                        "stripes",
                                        "clean",
                                      ].map((e) =>
                                        (0, t.jsx)(
                                          "button",
                                          {
                                            onClick: () =>
                                              x((t) => ({
                                                ...t,
                                                customPattern: e,
                                              })),
                                            className: (0, W.cn)(
                                              "px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer",
                                              o.customPattern === e
                                                ? "bg-[var(--brand-500)]/20 text-[var(--brand-400)] border border-[var(--brand-500)]/30"
                                                : "bg-white/[0.04] text-white/50 border border-white/[0.06] hover:bg-white/[0.08]",
                                            ),
                                            children:
                                              "dots" === e
                                                ? "Bolinhas"
                                                : "stripes" === e
                                                  ? "Listras"
                                                  : "Limpo",
                                          },
                                          e,
                                        ),
                                      ),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                        ],
                      }),
                      o.enabled &&
                        (0, t.jsxs)("button", {
                          onClick: b,
                          disabled: n,
                          className:
                            "w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50",
                          children: [
                            n
                              ? (0, t.jsx)(u.Loader2, {
                                  size: 16,
                                  className: "animate-spin",
                                })
                              : (0, t.jsx)(g.Save, {
                                  size: 16,
                                }),
                            "Salvar",
                          ],
                        }),
                    ],
                  }),
                  (0, t.jsxs)("div", {
                    children: [
                      (0, t.jsx)("label", {
                        className:
                          "text-xs font-medium text-white/60 block mb-2",
                        children: "Preview",
                      }),
                      (0, t.jsx)("div", {
                        className:
                          "bg-[#0a0a0a] border border-white/[0.06] rounded-xl p-4",
                        children: o.enabled
                          ? (0, t.jsx)(et, {
                              config: o,
                            })
                          : (0, t.jsxs)("div", {
                              className: "text-center py-16",
                              children: [
                                (0, t.jsx)(O.Eye, {
                                  size: 32,
                                  className: "text-white/20 mx-auto mb-3",
                                }),
                                (0, t.jsx)("p", {
                                  className: "text-white/30 text-sm",
                                  children:
                                    "Ative a página personalizada para ver o preview",
                                }),
                              ],
                            }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          })
        : (0, t.jsx)("div", {
            children:
              0 === e.length
                ? (0, t.jsxs)("div", {
                    className: "text-center py-20",
                    children: [
                      (0, t.jsx)("div", {
                        className:
                          "w-14 h-14 rounded-xl bg-[var(--brand-500)]/[0.08] border border-[var(--brand-500)]/20 flex items-center justify-center mx-auto mb-4",
                        children: (0, t.jsx)(O.Eye, {
                          size: 24,
                          className: "text-[var(--brand-400)]",
                        }),
                      }),
                      (0, t.jsx)("p", {
                        className: "text-white/50 text-sm",
                        children: "Nenhum link criado ainda",
                      }),
                      (0, t.jsx)("p", {
                        className: "text-white/30 text-xs mt-1",
                        children: 'Crie um link na aba "Links" primeiro',
                      }),
                    ],
                  })
                : (0, t.jsx)("div", {
                    className: "space-y-3",
                    children: e.map((e) =>
                      (0, t.jsxs)(
                        "div",
                        {
                          className:
                            "bg-[#141414] border border-white/[0.06] rounded-xl p-4 flex items-center justify-between",
                          children: [
                            (0, t.jsxs)("div", {
                              className: "min-w-0 flex-1",
                              children: [
                                (0, t.jsxs)("div", {
                                  className: "flex items-center gap-2 mb-1",
                                  children: [
                                    (0, t.jsx)(c.Link2, {
                                      size: 14,
                                      className:
                                        "text-[var(--brand-400)] shrink-0",
                                    }),
                                    (0, t.jsx)("span", {
                                      className:
                                        "text-sm font-medium text-white truncate",
                                      children:
                                        e.fullUrl ||
                                        `sharkbot.com.br/l/${e.slug}`,
                                    }),
                                  ],
                                }),
                                (0, t.jsx)("p", {
                                  className: "text-xs text-white/40",
                                  children: e.name || e.slug,
                                }),
                              ],
                            }),
                            (0, t.jsxs)("div", {
                              className: "flex items-center gap-3",
                              children: [
                                (0, t.jsx)(H.Switch, {
                                  checked: e.redirectPage?.enabled ?? !1,
                                  onCheckedChange: async (t) => {
                                    let a = {
                                      ...(e.redirectPage || {
                                        enabled: !1,
                                        name: "",
                                        photoUrl: "",
                                        buttonText: "Toque AQUI para me chamar",
                                        responseTime: "3 minutos",
                                        template: "pink_dots",
                                        customColor: "#f472b6",
                                        customPattern: "dots",
                                        verified: !1,
                                      }),
                                      enabled: t,
                                    };
                                    try {
                                      (
                                        await fetch(`/api/links/${e._id}`, {
                                          method: "PUT",
                                          headers: {
                                            "Content-Type": "application/json",
                                          },
                                          credentials: "include",
                                          body: JSON.stringify({
                                            redirectPage: a,
                                          }),
                                        })
                                      ).ok &&
                                        ((e.redirectPage = a),
                                        s({
                                          type: "success",
                                          title: t
                                            ? "Página ativada!"
                                            : "Página desativada!",
                                        }));
                                    } catch {}
                                  },
                                }),
                                (0, t.jsx)("button", {
                                  onClick: () => {
                                    (i(e),
                                      e.redirectPage
                                        ? x({
                                            enabled:
                                              e.redirectPage.enabled ?? !1,
                                            name: e.redirectPage.name || "",
                                            photoUrl:
                                              e.redirectPage.photoUrl || "",
                                            buttonText:
                                              e.redirectPage.buttonText ||
                                              "Toque AQUI para me chamar",
                                            responseTime:
                                              e.redirectPage.responseTime ||
                                              "3 minutos",
                                            template:
                                              e.redirectPage.template ||
                                              "pink_dots",
                                            customColor:
                                              e.redirectPage.customColor ||
                                              "#f472b6",
                                            customPattern:
                                              e.redirectPage.customPattern ||
                                              "dots",
                                            verified:
                                              e.redirectPage.verified ?? !1,
                                          })
                                        : x({
                                            enabled: !1,
                                            name: "",
                                            photoUrl: "",
                                            buttonText:
                                              "Toque AQUI para me chamar",
                                            responseTime: "3 minutos",
                                            template: "pink_dots",
                                            customColor: "#f472b6",
                                            customPattern: "dots",
                                            verified: !1,
                                          }));
                                  },
                                  className:
                                    "px-4 py-2 bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs font-medium rounded-lg transition-colors cursor-pointer",
                                  children: "Configurar",
                                }),
                              ],
                            }),
                          ],
                        },
                        e._id,
                      ),
                    ),
                  }),
          });
    }
    e.s(
      [
        "default",
        0,
        function () {
          let e,
            s,
            g,
            K,
            Z,
            et,
            ea,
            er,
            ei,
            el,
            en,
            ed,
            eo,
            ec,
            ex,
            em,
            eh,
            ep,
            eb,
            eu,
            eg,
            ej,
            { addToast: ef, confirm: ew } = (0, n.useToast)(),
            [ev, eN] = (0, a.useState)("redirecionadores"),
            {
              data: ek,
              isLoading: ey,
              mutate: eC,
            } = (0, r.default)("/api/links"),
            { data: eS } = (0, r.default)("/api/flows", {
              revalidateOnFocus: !1,
            }),
            { data: e_, mutate: ez } = (0, r.default)("/api/custom-domains", {
              revalidateOnFocus: !1,
            }),
            { data: eT } = (0, r.default)("/api/bots", {
              revalidateOnFocus: !1,
            }),
            eI = (0, a.useMemo)(() => ek?.data?.links || [], [ek]),
            eA = (0, a.useMemo)(() => eS?.data?.flows || [], [eS]),
            eU = (0, a.useMemo)(() => e_?.domains || [], [e_]),
            eE = e_?.fallbackOrigin || "links.sharkbot.com.br",
            eP = e_?.isConfigured || !1,
            eV = (0, a.useMemo)(() => eT?.data?.bots || [], [eT]),
            eL = (0, a.useMemo)(
              () =>
                "redirecionadores" === ev
                  ? eI.filter((e) => "link" === e.type)
                  : "codigos-venda" === ev
                    ? eI.filter((e) => "sales_code" === e.type)
                    : eI,
              [eI, ev],
            ),
            [eD, eM] = (0, a.useState)(!1),
            [eR, eB] = (0, a.useState)("random"),
            [e$, eO] = (0, a.useState)(""),
            [eq, eG] = (0, a.useState)("random"),
            [eF, eW] = (0, a.useState)(!0),
            [eH, eX] = (0, a.useState)([]),
            [eJ, eQ] = (0, a.useState)(""),
            [eK, eZ] = (0, a.useState)(!1),
            [eY, e0] = (0, a.useState)(null),
            [e1, e2] = (0, a.useState)("telegram"),
            [e5, e4] = (0, a.useState)(""),
            [e3, e6] = (0, a.useState)(""),
            [e8, e9] = (0, a.useState)(null),
            { data: e7, isLoading: te } = (0, r.default)(
              e8 ? `/api/bots/${e8}/chats` : null,
            ),
            tt = (0, a.useMemo)(
              () =>
                (e7?.data?.chats || []).filter(
                  (e) =>
                    e.botIsAdmin &&
                    ("channel" === e.type || "supergroup" === e.type),
                ),
              [e7],
            ),
            [ts, ta] = (0, a.useState)(""),
            [tr, ti] = (0, a.useState)(""),
            [tl, tn] = (0, a.useState)(50),
            [td, to] = (0, a.useState)(null),
            { data: tc } = (0, r.default)(
              td ? `/api/links/${td}/pool-status` : null,
            );
          tc?.success && tc.data;
          let [tx, tm] = (0, a.useState)({
              ...Y,
            }),
            [th, tp] = (0, a.useState)(!1),
            [tb, tu] = (0, a.useState)(null),
            [tg, tj] = (0, a.useState)(!1),
            [tf, tw] = (0, a.useState)(!1),
            [tv, tN] = (0, a.useState)("safepage"),
            [tk, ty] = (0, a.useState)(!0),
            [tC, tS] = (0, a.useState)(!1),
            [t_, tz] = (0, a.useState)(""),
            [tT, tI] = (0, a.useState)(!1),
            [tA, tU] = (0, a.useState)(!1),
            [tE, tP] = (0, a.useState)("safepage"),
            [tV, tL] = (0, a.useState)(!0),
            [tD, tM] = (0, a.useState)(!1),
            [tR, tB] = (0, a.useState)(""),
            [t$, tO] = (0, a.useState)(!0),
            [tq, tG] = (0, a.useState)(!1),
            [tF, tW] = (0, a.useState)(["BR"]),
            [tH, tX] = (0, a.useState)(!0),
            [tJ, tQ] = (0, a.useState)(!1),
            [tK, tZ] = (0, a.useState)(!1),
            [tY, t0] = (0, a.useState)(null),
            [t1, t2] = (0, a.useState)(!1),
            [t5, t4] = (0, a.useState)(!1),
            [t3, t6] = (0, a.useState)(null),
            t8 = t5 && t3 ? t3._id : null,
            { data: t9, isLoading: t7 } = (0, r.default)(
              t8 ? `/api/clicks?linkId=${t8}&limit=20` : null,
            ),
            se = (t9?.success && t9.data?.clicks) || [],
            [st, ss] = (0, a.useState)(!1),
            [sa, sr] = (0, a.useState)(null),
            [si, sl] = (0, a.useState)("default"),
            [sn, sd] = (0, a.useState)(1),
            [so, sc] = (0, a.useState)(new Set()),
            [sx, sm] = (0, a.useState)(""),
            [sh, sp] = (0, a.useState)("custom"),
            [sb, su] = (0, a.useState)(""),
            [sg, sj] = (0, a.useState)(""),
            [sf, sw] = (0, a.useState)(""),
            [sv, sN] = (0, a.useState)(""),
            [sk, sy] = (0, a.useState)(""),
            [sC, sS] = (0, a.useState)(""),
            [s_, sz] = (0, a.useState)(""),
            [sT, sI] = (0, a.useState)(""),
            [sA, sU] = (0, a.useState)(""),
            sE = (0, a.useRef)(null),
            sP = (0, a.useRef)(!1),
            [sV, sL] = (0, a.useState)(""),
            [sD, sM] = (0, a.useState)(!1),
            [sR, sB] = (0, a.useState)(null),
            [s$, sO] = (0, a.useState)(null),
            [sq, sG] = (0, a.useState)("default");
          ((0, a.useEffect)(() => {
            (sH(), eM(!1));
          }, [ev]),
            (0, a.useEffect)(() => {
              "random" !== eR || eY || eO(ee());
            }, [eR, eY]),
            (0, a.useEffect)(() => {
              if (sx) {
                let e = eI.find((e) => e._id === sx);
                if (e?.shk || e?.ph) {
                  let t = e.shk ? "shk" : "ph",
                    s = e.shk || e.ph || "";
                  sI(s ? `${t}=${s}` : "");
                } else sI("");
              }
            }, [sx, eI]));
          let sF = (e) => {
              e && /^[a-f0-9]{24}$/i.test(e) ? e9(e) : e9(null);
            },
            sW = (e) => {
              eX((t) => (t.includes(e) ? t.filter((t) => t !== e) : [...t, e]));
            },
            sH = () => {
              (eB("random"),
                eO(ee()),
                eG("random"),
                eW(!0),
                tw(!1),
                tN("safepage"),
                ty(!0),
                tS(!1),
                tz(""),
                tI(!1),
                tU(!1),
                tP("safepage"),
                tL(!0),
                tM(!1),
                tB(""),
                tO(!0),
                tG(!1),
                tW(["BR"]),
                tX(!0),
                tQ(!1),
                eX([]),
                eQ(""),
                e0(null),
                e2("telegram"),
                e4(""),
                e6(""),
                e9(null),
                ta(""),
                ti(""),
                tn(50),
                to(null),
                sl("default"),
                sd(1),
                tm({
                  ...Y,
                }));
            },
            sX = async () => {
              if (!sV.trim())
                return void ef({
                  type: "error",
                  title: "Digite um domínio",
                });
              sM(!0);
              try {
                let e = await fetch("/api/custom-domains", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      domain: sV.trim(),
                    }),
                  }),
                  t = await e.json();
                if (!e.ok) throw Error(t.error || "Erro ao adicionar domínio");
                (sL(""),
                  ez(),
                  (0, i.invalidateGroup)("domains"),
                  ef({
                    type: "success",
                    title: "Domínio adicionado! Configure o CNAME no seu DNS.",
                  }));
              } catch (e) {
                ef({
                  type: "error",
                  title:
                    e instanceof Error
                      ? e.message
                      : "Erro ao adicionar domínio",
                });
              } finally {
                sM(!1);
              }
            },
            sJ = async (e) => {
              sB(e);
              try {
                let t = await fetch(`/api/custom-domains/${e}/verify`, {
                    method: "POST",
                    credentials: "include",
                  }),
                  s = await t.json();
                if (!t.ok) throw Error(s.error || "Erro ao verificar domínio");
                (ez(),
                  (0, i.invalidateGroup)("domains"),
                  "active" === s.domain.status
                    ? ef({
                        type: "success",
                        title: "Domínio verificado e ativo!",
                      })
                    : ef({
                        type: "warning",
                        title:
                          "DNS ainda não propagado. Tente novamente em alguns minutos.",
                      }));
              } catch (e) {
                ef({
                  type: "error",
                  title: e instanceof Error ? e.message : "Erro ao verificar",
                });
              } finally {
                sB(null);
              }
            },
            sQ = (e) => {
              (e0(e._id),
                sd(2),
                eM(!0),
                eB(e.slugType || "custom"),
                eO("codigos-venda" === ev ? e.name : e.slug),
                eG(e.mode || "random"),
                eW(e.isActive),
                tw(e.cloakerV2?.enabled || !1),
                tN(
                  e.cloakerV2?.blockMethod === "mirror"
                    ? "redirect"
                    : e.cloakerV2?.blockMethod || "safepage",
                ),
                ty(e.cloakerV2?.blockAdBots !== !1),
                tS(e.cloakerV2?.antiSharing || !1),
                tz(e.cloakerV2?.safeUrl || ""),
                tU(e.cloakerV3?.enabled || !1),
                tP(
                  e.cloakerV3?.blockMethod === "mirror"
                    ? "redirect"
                    : e.cloakerV3?.blockMethod || "safepage",
                ),
                tL(e.cloakerV3?.blockAdBots !== !1),
                tM(e.cloakerV3?.antiSharing || !1),
                tB(e.cloakerV3?.safeUrl || ""),
                tO(e.cloakerV3?.jsFingerprint !== !1),
                tG(e.cloakerV3?.geoFilter?.enabled || !1),
                tW(
                  e.cloakerV3?.geoFilter?.targetCountries?.length
                    ? e.cloakerV3.geoFilter.targetCountries
                    : e.cloakerV3?.geoFilter?.targetCountry
                      ? [e.cloakerV3.geoFilter.targetCountry]
                      : ["BR"],
                ),
                tX(e.cloakerV3?.geoFilter?.checkLanguage !== !1),
                e.cloakerV3?.warmUpUntil &&
                new Date(e.cloakerV3.warmUpUntil) > new Date()
                  ? (tZ(!0), t0(e.cloakerV3.warmUpUntil))
                  : (tZ(!1), t0(null)),
                e2(e.destinationType || "telegram"),
                e4(e.destinationUrl || ""),
                "channel" === e.destinationType && e.channelConfig
                  ? (e6(e.channelConfig.botId || ""),
                    ta(e.channelConfig.chatId || ""),
                    ti(e.channelConfig.chatType || ""),
                    tn(e.channelConfig.poolSize || 50),
                    e.channelConfig.botId && sF(e.channelConfig.botId),
                    to(e._id))
                  : (e6(""), e9(null), ta(""), ti(""), tn(50), to(null)),
                e.customDomainId
                  ? sl(e.customDomainId)
                  : e.fullUrl?.includes("phantoms.group")
                    ? sl("phantoms")
                    : sl("default"));
              let t =
                e.flows
                  ?.map((e) =>
                    "object" == typeof e.flowId && e.flowId?._id
                      ? e.flowId._id
                      : e.flowId,
                  )
                  .filter(Boolean) || [];
              if (
                (eX(t),
                e.utmTemplate
                  ? tm({
                      enabled: e.utmTemplate.enabled ?? !1,
                      source: e.utmTemplate.source || Y.source,
                      medium: e.utmTemplate.medium || Y.medium,
                      campaign: e.utmTemplate.campaign || Y.campaign,
                      content: e.utmTemplate.content || Y.content,
                      term: e.utmTemplate.term || Y.term,
                      id: e.utmTemplate.id || Y.id,
                    })
                  : tm({
                      ...Y,
                    }),
                "codigos-venda" === ev && t.length > 0)
              ) {
                let e = t[0],
                  s = eI.find(
                    (t) =>
                      "link" === t.type &&
                      t.flows?.some(
                        (t) =>
                          ("object" == typeof t.flowId && t.flowId?._id
                            ? t.flowId._id
                            : t.flowId) === e,
                      ),
                  );
                s && eQ(s._id);
              } else eQ("");
            },
            sK = async () => {
              if (!e$.trim())
                return void ef({
                  type: "error",
                  title:
                    "codigos-venda" === ev
                      ? "Digite o nome do código"
                      : "Digite ou gere um slug",
                });
              if ("redirecionadores" === ev && "url" === e1 && !e5.trim())
                return void ef({
                  type: "error",
                  title: "Digite a URL da landing page",
                });
              if ("redirecionadores" === ev && "channel" === e1) {
                if (!e3)
                  return void ef({
                    type: "error",
                    title: "Selecione um bot",
                  });
                if (!ts)
                  return void ef({
                    type: "error",
                    title: "Selecione um canal ou grupo",
                  });
              }
              if (
                "redirecionadores" === ev &&
                "url" !== e1 &&
                "channel" !== e1 &&
                0 === eH.length
              )
                return void ef({
                  type: "error",
                  title: "Selecione pelo menos um fluxo",
                });
              eZ(!0);
              try {
                let e = eY ? "PUT" : "POST",
                  t = eY ? `/api/links/${eY}` : "/api/links",
                  s = "codigos-venda" === ev,
                  a = "";
                if (s) {
                  if (eY) {
                    let e = eL.find((e) => e._id === eY);
                    a = e?.slug || "";
                  }
                } else a = e$.toLowerCase().replace(/[^a-z0-9-]/g, "");
                let r = {
                  name: e$,
                  slug: a,
                  slugType: s ? "random" : eR,
                  type: s ? "sales_code" : "link",
                  mode: eq,
                  isActive: eF,
                  flows:
                    "url" === e1
                      ? []
                      : eH.map((e) => ({
                          flowId: e,
                          weight: 1,
                        })),
                };
                s ||
                  ((r.destinationType = e1),
                  (r.destinationUrl = "url" === e1 ? e5 : ""),
                  "channel" === e1 &&
                    (r.channelConfig = {
                      botId: e3,
                      chatId: ts,
                      chatType: tr || "channel",
                    }),
                  (r.cloakerV2 = {
                    enabled: tf,
                    blockMethod: tv,
                    blockAdBots: tk,
                    antiSharing: tC,
                    safeUrl:
                      "redirect" === tv || "mirror" === tv ? t_.trim() : "",
                  }),
                  (r.cloakerV3 = {
                    enabled: tA,
                    blockMethod: tE,
                    blockAdBots: tV,
                    antiSharing: tD,
                    jsFingerprint: t$,
                    geoFilter: {
                      enabled: tq,
                      targetCountries: tF,
                      checkLanguage: tH,
                    },
                    safeUrl:
                      "redirect" === tE || "mirror" === tE ? tR.trim() : "",
                  }),
                  (r.utmTemplate = {
                    enabled: tx.enabled,
                    source: tx.source.trim(),
                    medium: tx.medium.trim(),
                    campaign: tx.campaign.trim(),
                    content: tx.content.trim(),
                    term: tx.term.trim(),
                    id: tx.id.trim(),
                  }),
                  (r.customDomainId = si));
                let l = await fetch(t, {
                    method: e,
                    headers: {
                      "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(r),
                  }),
                  n = await l.json();
                l.ok && n.success
                  ? (ef({
                      type: "success",
                      title: eY ? "Atualizado!" : "Criado!",
                    }),
                    eM(!1),
                    sH(),
                    eC(),
                    (0, i.invalidateGroup)("links"))
                  : ef({
                      type: "error",
                      title: n.error || "Erro ao salvar",
                    });
              } catch {
                ef({
                  type: "error",
                  title: "Erro ao salvar",
                });
              } finally {
                eZ(!1);
              }
            },
            sZ = async () => {
              if (tb) {
                tj(!0);
                try {
                  (
                    await fetch(`/api/links/${tb.id}`, {
                      method: "DELETE",
                      credentials: "include",
                    })
                  ).ok
                    ? (eC(),
                      (0, i.invalidateGroup)("links"),
                      ef({
                        type: "success",
                        title: "Excluído!",
                      }))
                    : ef({
                        type: "error",
                        title: "Erro ao excluir",
                      });
                } catch {
                  ef({
                    type: "error",
                    title: "Erro ao excluir",
                  });
                } finally {
                  (tj(!1), tp(!1), tu(null));
                }
              }
            },
            sY = async (e) => {
              try {
                (await navigator.clipboard.writeText(e),
                  ef({
                    type: "success",
                    title: "Copiado!",
                  }));
              } catch {
                ef({
                  type: "error",
                  title: "Erro ao copiar",
                });
              }
            },
            s0 = () => {
              if (!sx) return "";
              let e = eI.find((e) => e._id === sx);
              if (!e) return "";
              let t = [];
              if (
                (sb && t.push(`utm_source=${sb}`),
                sg && t.push(`utm_campaign=${sg}`),
                sf && t.push(`utm_medium=${sf}`),
                sv && t.push(`utm_content=${sv}`),
                sk && t.push(`utm_term=${sk}`),
                sC && t.push(`utm_id=${sC}`),
                s_ && t.push(`cv=${s_}`),
                e.cloakerV2?.enabled || e.cloakerV3?.enabled)
              )
                if (sT)
                  if (sT.includes("=")) t.push(sT);
                  else {
                    let s = e.shk ? "shk" : "ph";
                    t.push(`${s}=${sT}`);
                  }
                else
                  e.shk ? t.push(`shk=${e.shk}`) : e.ph && t.push(`ph=${e.ph}`);
              return t.join("&");
            };
          (0, a.useEffect)(() => {
            sP.current && sx && sU(s0());
          }, [sb, sg, sf, sv, sk, sC, s_, sT, sx, eI]);
          let s1 = (e) =>
            e.flows?.map((e) => {
              if ("object" == typeof e.flowId && e.flowId?.name)
                return e.flowId.name;
              let t = eA.find((t) => t._id === e.flowId);
              return t?.name || "Fluxo removido";
            }) || [];
          if (ey && 0 === eL.length)
            return (0, t.jsx)(J.AnimatePresence, {
              mode: "wait",
              children: (0, t.jsx)(
                X.motion.div,
                {
                  exit: {
                    opacity: 0,
                  },
                  transition: {
                    duration: 0.3,
                  },
                  children: (0, t.jsx)(Q.default, {}),
                },
                "skeleton",
              ),
            });
          let s2 = eL.reduce((e, t) => e + (t.stats?.totalClicks || 0), 0);
          eL.filter((e) => e.isActive).length;
          let s5 = eL.filter(
            (e) =>
              e.cloaking?.enabled ||
              e.cloakerV2?.enabled ||
              e.cloakerV3?.enabled,
          ).length;
          return (0, t.jsxs)("div", {
            className: "pb-10",
            children: [
              (0, t.jsxs)("div", {
                className:
                  "flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4",
                children: [
                  (0, t.jsxs)("div", {
                    children: [
                      (0, t.jsx)("h1", {
                        className:
                          "text-3xl lg:text-4xl font-bold text-white font-display tracking-tight",
                        children: "Redirecionadores",
                      }),
                      (0, t.jsx)("p", {
                        className:
                          "text-white/40 text-sm mt-1 font-light tracking-wide border-l-2 border-[var(--brand-500)] pl-3",
                        children: "Configure seus links de redirecionamento",
                      }),
                    ],
                  }),
                  ("redirecionadores" === ev || "codigos-venda" === ev) &&
                    (0, t.jsxs)("button", {
                      onClick: () => {
                        (sH(), eM(!0));
                      },
                      className:
                        "relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all cursor-pointer enter-btn",
                      children: [
                        (0, t.jsx)("span", {
                          className:
                            "absolute inset-0 rounded-xl border border-[rgba(28,28,28,0.2)]",
                        }),
                        (0, t.jsxs)("span", {
                          className: "relative z-10 flex items-center gap-2",
                          children: [
                            (0, t.jsx)(N.Plus, {
                              size: 16,
                            }),
                            "codigos-venda" === ev
                              ? "Criar Codigo"
                              : "Criar Link",
                          ],
                        }),
                      ],
                    }),
                ],
              }),
              "redirecionadores" === ev &&
                eL.length > 0 &&
                (0, t.jsxs)("div", {
                  className:
                    "flex items-center gap-4 mb-6 text-xs text-white/40",
                  children: [
                    (0, t.jsxs)("span", {
                      className: "flex items-center gap-1.5",
                      children: [
                        (0, t.jsx)(c.Link2, {
                          size: 12,
                          className: "text-[var(--brand-400)]",
                        }),
                        (0, t.jsx)("span", {
                          className: "text-white/70 font-medium",
                          children: eL.length,
                        }),
                        " ",
                        1 === eL.length ? "link" : "links",
                      ],
                    }),
                    (0, t.jsx)("span", {
                      className: "w-px h-3 bg-white/10",
                    }),
                    (0, t.jsxs)("span", {
                      className: "flex items-center gap-1.5",
                      children: [
                        (0, t.jsx)(k.MousePointerClick, {
                          size: 12,
                          className: "text-emerald-400",
                        }),
                        (0, t.jsx)("span", {
                          className: "text-white/70 font-medium",
                          children: s2.toLocaleString("pt-BR"),
                        }),
                        " cliques",
                      ],
                    }),
                    s5 > 0 &&
                      (0, t.jsxs)(t.Fragment, {
                        children: [
                          (0, t.jsx)("span", {
                            className: "w-px h-3 bg-white/10",
                          }),
                          (0, t.jsxs)("span", {
                            className: "flex items-center gap-1.5",
                            children: [
                              (0, t.jsx)(C.Zap, {
                                size: 12,
                                className: "text-amber-400",
                              }),
                              (0, t.jsx)("span", {
                                className: "text-white/70 font-medium",
                                children: s5,
                              }),
                              " com cloaker",
                            ],
                          }),
                        ],
                      }),
                  ],
                }),
              (0, t.jsxs)("div", {
                className: "flex gap-1 mb-6",
                children: [
                  (0, t.jsxs)("button", {
                    onClick: () => eN("redirecionadores"),
                    className: (0, W.cn)(
                      "relative px-4 py-2 rounded-[8px] text-xs font-bold transition-all cursor-pointer",
                      "redirecionadores" === ev
                        ? "text-white enter-btn"
                        : "bg-white/[0.02] border border-white/[0.06] text-white/40 hover:text-white hover:bg-white/[0.04]",
                    ),
                    children: [
                      "redirecionadores" === ev &&
                        (0, t.jsx)("span", {
                          className:
                            "absolute inset-0 rounded-[8px] border border-[rgba(28,28,28,0.2)]",
                        }),
                      (0, t.jsx)("span", {
                        className: "relative z-10",
                        children: "Links",
                      }),
                    ],
                  }),
                  (0, t.jsxs)("button", {
                    onClick: () => eN("codigos-venda"),
                    className: (0, W.cn)(
                      "relative px-4 py-2 rounded-[8px] text-xs font-bold transition-all cursor-pointer",
                      "codigos-venda" === ev
                        ? "text-white enter-btn"
                        : "bg-white/[0.02] border border-white/[0.06] text-white/40 hover:text-white hover:bg-white/[0.04]",
                    ),
                    children: [
                      "codigos-venda" === ev &&
                        (0, t.jsx)("span", {
                          className:
                            "absolute inset-0 rounded-[8px] border border-[rgba(28,28,28,0.2)]",
                        }),
                      (0, t.jsx)("span", {
                        className: "relative z-10",
                        children: "Códigos de Vendas",
                      }),
                    ],
                  }),
                  (0, t.jsxs)("button", {
                    onClick: () => eN("utm"),
                    className: (0, W.cn)(
                      "relative px-4 py-2 rounded-[8px] text-xs font-bold transition-all cursor-pointer",
                      "utm" === ev
                        ? "text-white enter-btn"
                        : "bg-white/[0.02] border border-white/[0.06] text-white/40 hover:text-white hover:bg-white/[0.04]",
                    ),
                    children: [
                      "utm" === ev &&
                        (0, t.jsx)("span", {
                          className:
                            "absolute inset-0 rounded-[8px] border border-[rgba(28,28,28,0.2)]",
                        }),
                      (0, t.jsx)("span", {
                        className: "relative z-10",
                        children: "Gerador UTM",
                      }),
                    ],
                  }),
                  (0, t.jsxs)("button", {
                    onClick: () => eN("dominio-proprio"),
                    className: (0, W.cn)(
                      "relative px-4 py-2 rounded-[8px] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5",
                      "dominio-proprio" === ev
                        ? "text-white enter-btn"
                        : "bg-white/[0.02] border border-white/[0.06] text-white/40 hover:text-white hover:bg-white/[0.04]",
                    ),
                    children: [
                      "dominio-proprio" === ev &&
                        (0, t.jsx)("span", {
                          className:
                            "absolute inset-0 rounded-[8px] border border-[rgba(28,28,28,0.2)]",
                        }),
                      (0, t.jsxs)("span", {
                        className: "relative z-10 flex items-center gap-1.5",
                        children: [
                          (0, t.jsx)(L.Globe, {
                            size: 14,
                          }),
                          "Domínio Próprio",
                        ],
                      }),
                    ],
                  }),
                  (0, t.jsxs)("button", {
                    onClick: () => eN("redirect-page"),
                    className: (0, W.cn)(
                      "relative px-4 py-2 rounded-[8px] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5",
                      "redirect-page" === ev
                        ? "text-white enter-btn"
                        : "bg-white/[0.02] border border-white/[0.06] text-white/40 hover:text-white hover:bg-white/[0.04]",
                    ),
                    children: [
                      "redirect-page" === ev &&
                        (0, t.jsx)("span", {
                          className:
                            "absolute inset-0 rounded-[8px] border border-[rgba(28,28,28,0.2)]",
                        }),
                      (0, t.jsxs)("span", {
                        className: "relative z-10 flex items-center gap-1.5",
                        children: [
                          (0, t.jsx)(O.Eye, {
                            size: 14,
                          }),
                          "Página de Redirect",
                        ],
                      }),
                    ],
                  }),
                  (0, t.jsxs)("button", {
                    onClick: () => eN("scripts"),
                    className: (0, W.cn)(
                      "relative px-4 py-2 rounded-[8px] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5",
                      "scripts" === ev
                        ? "text-white enter-btn"
                        : "bg-white/[0.02] border border-white/[0.06] text-white/40 hover:text-white hover:bg-white/[0.04]",
                    ),
                    children: [
                      "scripts" === ev &&
                        (0, t.jsx)("span", {
                          className:
                            "absolute inset-0 rounded-[8px] border border-[rgba(28,28,28,0.2)]",
                        }),
                      (0, t.jsxs)("span", {
                        className: "relative z-10 flex items-center gap-1.5",
                        children: [
                          (0, t.jsx)(F.Code, {
                            size: 14,
                          }),
                          "Scripts",
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              "redirecionadores" === ev &&
                (0, t.jsx)(t.Fragment, {
                  children: (0, t.jsx)("div", {
                    children:
                      0 === eL.length
                        ? (0, t.jsxs)("div", {
                            className: "text-center py-20",
                            children: [
                              (0, t.jsx)("div", {
                                className:
                                  "w-14 h-14 rounded-xl bg-[var(--brand-500)]/[0.08] border border-[var(--brand-500)]/20 flex items-center justify-center mx-auto mb-4",
                                children: (0, t.jsx)(c.Link2, {
                                  size: 24,
                                  className: "text-[var(--brand-400)]",
                                }),
                              }),
                              (0, t.jsx)("p", {
                                className: "text-sm text-white/60 font-medium",
                                children: "Nenhum redirecionador criado",
                              }),
                              (0, t.jsx)("p", {
                                className: "text-xs text-white/30 mt-1 mb-5",
                                children:
                                  "Crie seu primeiro link para começar a rastrear cliques",
                              }),
                              (0, t.jsxs)("button", {
                                onClick: () => {
                                  (sH(), eM(!0));
                                },
                                className:
                                  "relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all cursor-pointer enter-btn",
                                children: [
                                  (0, t.jsx)("span", {
                                    className:
                                      "absolute inset-0 rounded-xl border border-[rgba(28,28,28,0.2)]",
                                  }),
                                  (0, t.jsxs)("span", {
                                    className:
                                      "relative z-10 flex items-center gap-2",
                                    children: [
                                      (0, t.jsx)(N.Plus, {
                                        size: 16,
                                      }),
                                      "Criar Primeiro Link",
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          })
                        : (0, t.jsx)("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                            children: eL.map((e) => {
                              let s = s1(e);
                              return (0, t.jsxs)(
                                "div",
                                {
                                  className:
                                    "p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/10 transition-all group",
                                  children: [
                                    (0, t.jsxs)("div", {
                                      className:
                                        "flex items-center gap-3 mb-2.5",
                                      children: [
                                        (0, t.jsx)("div", {
                                          className:
                                            "w-9 h-9 rounded-lg bg-[var(--brand-500)]/[0.08] border border-[var(--brand-500)]/20 flex items-center justify-center flex-shrink-0",
                                          children: (0, t.jsx)(c.Link2, {
                                            size: 16,
                                            className:
                                              "text-[var(--brand-400)]",
                                          }),
                                        }),
                                        (0, t.jsxs)("div", {
                                          className: "flex-1 min-w-0",
                                          children: [
                                            (0, t.jsxs)("div", {
                                              className:
                                                "flex items-center gap-1.5",
                                              children: [
                                                (0, t.jsx)("span", {
                                                  className:
                                                    "text-[13px] font-semibold text-white truncate",
                                                  children: e.fullUrl.replace(
                                                    "https://",
                                                    "",
                                                  ),
                                                }),
                                                (0, t.jsx)("span", {
                                                  className: (0, W.cn)(
                                                    "w-1.5 h-1.5 rounded-full flex-shrink-0",
                                                    e.isActive
                                                      ? "bg-emerald-400"
                                                      : "bg-red-400",
                                                  ),
                                                  title: e.isActive
                                                    ? "Ativo"
                                                    : "Inativo",
                                                }),
                                                e.cloakerV2?.enabled &&
                                                  (0, t.jsx)("span", {
                                                    className:
                                                      "px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20",
                                                    children: "Cloaker",
                                                  }),
                                                e.cloakerV3?.enabled &&
                                                  (0, t.jsx)("span", {
                                                    className:
                                                      "px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
                                                    children: "Cloaker V2",
                                                  }),
                                                "url" === e.destinationType &&
                                                  (0, t.jsx)("span", {
                                                    className:
                                                      "px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20",
                                                    children: "LP",
                                                  }),
                                                "channel" ===
                                                  e.destinationType &&
                                                  (0, t.jsx)("span", {
                                                    className:
                                                      "px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase bg-[var(--brand-500)]/10 text-[var(--brand-400)] border border-[var(--brand-500)]/20",
                                                    children: "Canal",
                                                  }),
                                              ],
                                            }),
                                            (0, t.jsxs)("div", {
                                              className:
                                                "flex items-center gap-2 mt-0.5",
                                              children: [
                                                (e.shk || e.ph) &&
                                                  (0, t.jsx)("span", {
                                                    className:
                                                      "text-[10px] text-amber-400/70 font-mono",
                                                    children: e.shk
                                                      ? `shk=${e.shk}`
                                                      : `ph=${e.ph}`,
                                                  }),
                                                (0, t.jsx)("span", {
                                                  className:
                                                    "text-[10px] text-white/30",
                                                  children:
                                                    "random" === e.mode
                                                      ? "Aleatório"
                                                      : "Sequencial",
                                                }),
                                                (0, t.jsx)("span", {
                                                  className:
                                                    "text-[10px] text-white/20",
                                                  children: "·",
                                                }),
                                                (0, t.jsxs)("span", {
                                                  className:
                                                    "text-[10px] text-white/40 flex items-center gap-0.5",
                                                  children: [
                                                    (0, t.jsx)(
                                                      k.MousePointerClick,
                                                      {
                                                        size: 9,
                                                      },
                                                    ),
                                                    e.stats?.totalClicks || 0,
                                                  ],
                                                }),
                                                e.cloakerV2?.enabled &&
                                                  e.cloakerV2?.stats &&
                                                  (0, t.jsxs)(t.Fragment, {
                                                    children: [
                                                      (0, t.jsx)("span", {
                                                        className:
                                                          "text-[10px] text-white/20",
                                                        children: "·",
                                                      }),
                                                      (0, t.jsxs)("span", {
                                                        className:
                                                          "text-[10px] text-red-400/70 flex items-center gap-0.5",
                                                        children: [
                                                          (0, t.jsx)(
                                                            _.ShieldAlert,
                                                            {
                                                              size: 9,
                                                            },
                                                          ),
                                                          e.cloakerV2.stats
                                                            .totalBlocked || 0,
                                                        ],
                                                      }),
                                                      (0, t.jsxs)("span", {
                                                        className:
                                                          "text-[10px] text-emerald-400/70 flex items-center gap-0.5",
                                                        children: [
                                                          (0, t.jsx)(f.Check, {
                                                            size: 9,
                                                          }),
                                                          e.cloakerV2.stats
                                                            .totalAllowed || 0,
                                                        ],
                                                      }),
                                                    ],
                                                  }),
                                                e.cloakerV3?.enabled &&
                                                  e.cloakerV3?.stats &&
                                                  (0, t.jsxs)(t.Fragment, {
                                                    children: [
                                                      (0, t.jsx)("span", {
                                                        className:
                                                          "text-[10px] text-white/20",
                                                        children: "·",
                                                      }),
                                                      (0, t.jsxs)("span", {
                                                        className:
                                                          "text-[10px] text-red-400/70 flex items-center gap-0.5",
                                                        children: [
                                                          (0, t.jsx)(
                                                            _.ShieldAlert,
                                                            {
                                                              size: 9,
                                                            },
                                                          ),
                                                          e.cloakerV3.stats
                                                            .totalBlocked || 0,
                                                        ],
                                                      }),
                                                      (0, t.jsxs)("span", {
                                                        className:
                                                          "text-[10px] text-emerald-400/70 flex items-center gap-0.5",
                                                        children: [
                                                          (0, t.jsx)(f.Check, {
                                                            size: 9,
                                                          }),
                                                          e.cloakerV3.stats
                                                            .totalAllowed || 0,
                                                        ],
                                                      }),
                                                    ],
                                                  }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        (0, t.jsxs)("div", {
                                          className: "flex gap-1 flex-shrink-0",
                                          children: [
                                            (0, t.jsx)("button", {
                                              onClick: () => {
                                                let t, s, a;
                                                return sY(
                                                  e.shk || e.ph
                                                    ? ((t = e.shk
                                                        ? "shk"
                                                        : "ph"),
                                                      (s = e.shk || e.ph || ""),
                                                      (a = e.fullUrl.includes(
                                                        "?",
                                                      )
                                                        ? "&"
                                                        : "?"),
                                                      `${e.fullUrl}${a}${t}=${s}`)
                                                    : e.fullUrl,
                                                );
                                              },
                                              className:
                                                "p-1.5 rounded-lg text-white/25 hover:text-[var(--brand-400)] hover:bg-[var(--brand-500)]/5 transition-all cursor-pointer",
                                              title: "Copiar link",
                                              children: (0, t.jsx)(x.Copy, {
                                                size: 14,
                                              }),
                                            }),
                                            (0, t.jsx)("button", {
                                              onClick: () =>
                                                window.open(
                                                  e.fullUrl,
                                                  "_blank",
                                                ),
                                              className:
                                                "p-1.5 rounded-lg text-white/25 hover:text-white hover:bg-white/[0.04] transition-all cursor-pointer",
                                              title: "Abrir link",
                                              children: (0, t.jsx)(
                                                m.ExternalLink,
                                                {
                                                  size: 14,
                                                },
                                              ),
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    s.length > 0 &&
                                      (0, t.jsx)("div", {
                                        className:
                                          "flex flex-wrap gap-1.5 mb-3",
                                        children: s.map((e, s) =>
                                          (0, t.jsxs)(
                                            "span",
                                            {
                                              className:
                                                "inline-flex items-center gap-1 px-2 py-0.5 bg-white/[0.03] text-white/40 text-[10px] rounded border border-white/[0.06]",
                                              children: [
                                                (0, t.jsx)(b.Workflow, {
                                                  size: 10,
                                                }),
                                                e,
                                              ],
                                            },
                                            s,
                                          ),
                                        ),
                                      }),
                                    (0, t.jsxs)("div", {
                                      className:
                                        "flex items-center gap-1 pt-2 border-t border-white/[0.04]",
                                      children: [
                                        (0, t.jsxs)("button", {
                                          onClick: () => sQ(e),
                                          className:
                                            "flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-medium text-white/35 hover:text-white hover:bg-white/[0.04] transition-all cursor-pointer",
                                          children: [
                                            (0, t.jsx)(h.Pencil, {
                                              size: 11,
                                            }),
                                            "Editar",
                                          ],
                                        }),
                                        (0, t.jsx)("button", {
                                          onClick: () => {
                                            (tu({
                                              id: e._id,
                                              name: e.name,
                                            }),
                                              tp(!0));
                                          },
                                          className:
                                            "p-1 rounded-md text-white/25 hover:text-red-400 hover:bg-red-500/5 transition-all cursor-pointer",
                                          title: "Excluir",
                                          children: (0, t.jsx)(p.Trash2, {
                                            size: 12,
                                          }),
                                        }),
                                        (e.cloakerV2?.enabled ||
                                          e.cloakerV3?.enabled) &&
                                          (0, t.jsxs)(t.Fragment, {
                                            children: [
                                              (0, t.jsx)("span", {
                                                className:
                                                  "w-px h-3 bg-white/[0.06]",
                                              }),
                                              (0, t.jsxs)("button", {
                                                onClick: () => {
                                                  (sr(e), ss(!0));
                                                },
                                                className:
                                                  "flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-medium text-white/35 hover:text-purple-400 hover:bg-purple-500/5 transition-all cursor-pointer",
                                                title: "Camuflagem",
                                                children: [
                                                  (0, t.jsx)(O.Eye, {
                                                    size: 11,
                                                  }),
                                                  "Preview",
                                                ],
                                              }),
                                              (0, t.jsxs)("button", {
                                                onClick: () => {
                                                  (t6(e), t4(!0));
                                                },
                                                className:
                                                  "flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-medium text-white/35 hover:text-[var(--brand-400)] hover:bg-[var(--brand-500)]/5 transition-all cursor-pointer",
                                                title: "Estatísticas",
                                                children: [
                                                  (0, t.jsx)(z.BarChart3, {
                                                    size: 11,
                                                  }),
                                                  "Stats",
                                                ],
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
                }),
              (0, t.jsx)(o.Dialog, {
                open: eD,
                onOpenChange: (e) => {
                  (eM(e), e || sH());
                },
                children: (0, t.jsxs)(o.DialogContent, {
                  className: "max-w-2xl max-h-[90vh] flex flex-col p-0 gap-0",
                  children: [
                    (0, t.jsx)(o.DialogHeader, {
                      className:
                        "px-6 pt-6 pb-4 border-b border-white/[0.04] flex-shrink-0",
                      children: (0, t.jsxs)("div", {
                        className: "flex items-center gap-3",
                        children: [
                          (0, t.jsx)("div", {
                            className:
                              "w-8 h-8 rounded-lg bg-[var(--brand-500)]/10 flex items-center justify-center border border-[var(--brand-500)]/20",
                            children:
                              "codigos-venda" === ev
                                ? (0, t.jsx)(I.Tag, {
                                    size: 16,
                                    className: "text-[var(--brand-400)]",
                                  })
                                : 1 !== sn || eY
                                  ? (0, t.jsx)(N.Plus, {
                                      size: 16,
                                      className: "text-[var(--brand-400)]",
                                    })
                                  : (0, t.jsx)(L.Globe, {
                                      size: 16,
                                      className: "text-[var(--brand-400)]",
                                    }),
                          }),
                          (0, t.jsxs)("div", {
                            children: [
                              (0, t.jsx)(o.DialogTitle, {
                                children:
                                  "codigos-venda" === ev
                                    ? eY
                                      ? "Editar Codigo de Vendas"
                                      : "Criar Codigo de Vendas"
                                    : 1 !== sn || eY
                                      ? eY
                                        ? "Editar Redirecionador"
                                        : "Criar Redirecionador"
                                      : "Escolha o Dominio",
                              }),
                              (0, t.jsx)(o.DialogDescription, {
                                children:
                                  "codigos-venda" === ev
                                    ? "Codigos para rastrear vendas por afiliado"
                                    : 1 !== sn || eY
                                      ? "Configure seu link de redirecionamento"
                                      : "Selecione o dominio que aparecera na URL do link",
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                    (0, t.jsxs)("div", {
                      className: "flex-1 overflow-y-auto px-6 py-5",
                      children: [
                        "redirecionadores" === ev &&
                          1 === sn &&
                          !eY &&
                          (0, t.jsx)("div", {
                            className: "space-y-4",
                            children: (0, t.jsxs)("div", {
                              className: "grid grid-cols-1 gap-3",
                              children: [
                                (0, t.jsxs)("button", {
                                  type: "button",
                                  onClick: () => {
                                    (sl("phantoms"), sd(2));
                                  },
                                  className: (0, W.cn)(
                                    "relative p-4 rounded-xl border transition-all cursor-pointer text-left flex items-center gap-4",
                                    "phantoms" === si
                                      ? "bg-[var(--brand-500)]/10 border-[var(--brand-500)]/50"
                                      : "bg-black/20 border-white/10 hover:border-white/20",
                                  ),
                                  children: [
                                    (0, t.jsx)("div", {
                                      className:
                                        "w-10 h-10 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center flex-shrink-0",
                                      children: (0, t.jsx)(L.Globe, {
                                        size: 18,
                                        className: "text-white/50",
                                      }),
                                    }),
                                    (0, t.jsxs)("div", {
                                      className: "flex-1 min-w-0",
                                      children: [
                                        (0, t.jsx)("p", {
                                          className:
                                            "text-sm font-bold text-white",
                                          children: "phantoms.group",
                                        }),
                                        (0, t.jsx)("p", {
                                          className:
                                            "text-[11px] text-white/40",
                                          children: "Dominio alternativo",
                                        }),
                                      ],
                                    }),
                                    (0, t.jsx)(B.ArrowUpRight, {
                                      size: 16,
                                      className: "text-white/30 flex-shrink-0",
                                    }),
                                  ],
                                }),
                                eU
                                  .filter((e) => "active" === e.status)
                                  .map((e) =>
                                    (0, t.jsxs)(
                                      "button",
                                      {
                                        type: "button",
                                        onClick: () => {
                                          (sl(e._id), sd(2));
                                        },
                                        className: (0, W.cn)(
                                          "relative p-4 rounded-xl border transition-all cursor-pointer text-left flex items-center gap-4",
                                          si === e._id
                                            ? "bg-[var(--brand-500)]/10 border-[var(--brand-500)]/50"
                                            : "bg-black/20 border-white/10 hover:border-white/20",
                                        ),
                                        children: [
                                          (0, t.jsx)("div", {
                                            className:
                                              "w-10 h-10 rounded-lg bg-[var(--brand-500)]/10 border border-[var(--brand-500)]/20 flex items-center justify-center flex-shrink-0",
                                            children: (0, t.jsx)(L.Globe, {
                                              size: 18,
                                              className:
                                                "text-[var(--brand-400)]",
                                            }),
                                          }),
                                          (0, t.jsxs)("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                              (0, t.jsx)("p", {
                                                className:
                                                  "text-sm font-bold text-white",
                                                children: e.domain,
                                              }),
                                              (0, t.jsxs)("p", {
                                                className:
                                                  "text-[11px] text-emerald-400 flex items-center gap-1",
                                                children: [
                                                  (0, t.jsx)(D.CheckCircle, {
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
                                          (0, t.jsx)(B.ArrowUpRight, {
                                            size: 16,
                                            className:
                                              "text-white/30 flex-shrink-0",
                                          }),
                                        ],
                                      },
                                      e._id,
                                    ),
                                  ),
                              ],
                            }),
                          }),
                        "redirecionadores" === ev &&
                          (2 === sn || eY) &&
                          (0, t.jsxs)("div", {
                            className: "space-y-5",
                            children: [
                              (0, t.jsxs)("div", {
                                children: [
                                  (0, t.jsx)("label", {
                                    className:
                                      "text-[10px] font-bold text-white/50 uppercase tracking-wider mb-2 block",
                                    children: "Tipo de Slug",
                                  }),
                                  (0, t.jsxs)("div", {
                                    className: "flex gap-2",
                                    children: [
                                      (0, t.jsxs)("button", {
                                        onClick: () => eB("random"),
                                        className: (0, W.cn)(
                                          "relative flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border text-xs font-bold transition-all cursor-pointer",
                                          "random" === eR
                                            ? "border-transparent text-white enter-btn"
                                            : "border-white/[0.06] bg-white/[0.02] text-white/40 hover:text-white hover:bg-white/[0.04] hover:border-white/10",
                                        ),
                                        children: [
                                          "random" === eR &&
                                            (0, t.jsx)("span", {
                                              className:
                                                "absolute inset-0 rounded-lg border border-[rgba(28,28,28,0.2)]",
                                            }),
                                          (0, t.jsxs)("span", {
                                            className:
                                              "relative z-10 flex items-center gap-2",
                                            children: [
                                              (0, t.jsx)(w.Shuffle, {
                                                size: 14,
                                              }),
                                              "Aleatório",
                                            ],
                                          }),
                                        ],
                                      }),
                                      (0, t.jsxs)("button", {
                                        onClick: () => eB("custom"),
                                        className: (0, W.cn)(
                                          "relative flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border text-xs font-bold transition-all cursor-pointer",
                                          "custom" === eR
                                            ? "border-transparent text-white enter-btn"
                                            : "border-white/[0.06] bg-white/[0.02] text-white/40 hover:text-white hover:bg-white/[0.04] hover:border-white/10",
                                        ),
                                        children: [
                                          "custom" === eR &&
                                            (0, t.jsx)("span", {
                                              className:
                                                "absolute inset-0 rounded-lg border border-[rgba(28,28,28,0.2)]",
                                            }),
                                          (0, t.jsxs)("span", {
                                            className:
                                              "relative z-10 flex items-center gap-2",
                                            children: [
                                              (0, t.jsx)(h.Pencil, {
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
                              (0, t.jsxs)("div", {
                                className: "grid grid-cols-2 gap-4",
                                children: [
                                  (0, t.jsxs)("div", {
                                    children: [
                                      (0, t.jsx)("label", {
                                        className:
                                          "text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1.5 block",
                                        children: "Slug",
                                      }),
                                      (0, t.jsxs)("div", {
                                        className: "flex gap-2",
                                        children: [
                                          (0, t.jsx)(l.Input, {
                                            value: e$,
                                            onChange: (e) => eO(e.target.value),
                                            placeholder:
                                              "random" === eR
                                                ? "Gerado"
                                                : "Digite...",
                                            disabled: "random" === eR,
                                            className:
                                              "bg-white/[0.03] border-white/[0.08] text-white text-sm h-10 disabled:opacity-70",
                                          }),
                                          "random" === eR &&
                                            (0, t.jsx)("button", {
                                              onClick: () => eO(ee()),
                                              className:
                                                "p-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white/50 hover:text-[var(--brand-400)] hover:border-[var(--brand-500)]/20 transition-all cursor-pointer",
                                              children: (0, t.jsx)(
                                                v.RefreshCw,
                                                {
                                                  size: 16,
                                                },
                                              ),
                                            }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, t.jsxs)("div", {
                                    children: [
                                      (0, t.jsx)("label", {
                                        className:
                                          "text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1.5 block",
                                        children: "Modo",
                                      }),
                                      (0, t.jsxs)(d.Select, {
                                        value: eq,
                                        onValueChange: eG,
                                        children: [
                                          (0, t.jsx)(d.SelectTrigger, {
                                            className:
                                              "bg-white/[0.03] border-white/[0.08] text-sm h-10",
                                            children: (0, t.jsx)(
                                              d.SelectValue,
                                              {},
                                            ),
                                          }),
                                          (0, t.jsxs)(d.SelectContent, {
                                            className:
                                              "bg-[#111111] border-white/[0.08]",
                                            children: [
                                              (0, t.jsx)(d.SelectItem, {
                                                value: "random",
                                                children: "Aleatório",
                                              }),
                                              (0, t.jsx)(d.SelectItem, {
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
                              (0, t.jsxs)("div", {
                                className: "flex flex-wrap items-center gap-4",
                                children: [
                                  (0, t.jsxs)("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                      (0, t.jsx)(H.Switch, {
                                        checked: eF,
                                        onCheckedChange: eW,
                                        size: "md",
                                      }),
                                      (0, t.jsx)("span", {
                                        className:
                                          "text-xs text-white font-medium",
                                        children: "Ativo",
                                      }),
                                    ],
                                  }),
                                  (0, t.jsxs)("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                      (0, t.jsx)(H.Switch, {
                                        checked: tf,
                                        onCheckedChange: (e) => {
                                          e
                                            ? (tI(!0), tU(!1), tQ(!1))
                                            : (tw(!1), tI(!1));
                                        },
                                        size: "md",
                                      }),
                                      (0, t.jsx)("span", {
                                        className:
                                          "text-xs text-white font-medium",
                                        children: "Cloaker",
                                      }),
                                    ],
                                  }),
                                  (0, t.jsxs)("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                      (0, t.jsx)(H.Switch, {
                                        checked: tA,
                                        onCheckedChange: (e) => {
                                          e
                                            ? (tQ(!0), tw(!1), tI(!1))
                                            : (tU(!1), tQ(!1));
                                        },
                                        size: "md",
                                      }),
                                      (0, t.jsx)("span", {
                                        className:
                                          "text-xs text-white font-medium",
                                        children: "Cloaker V2",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              tT &&
                                !tf &&
                                (0, t.jsxs)("div", {
                                  className:
                                    "space-y-3 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl",
                                  children: [
                                    (0, t.jsxs)("div", {
                                      className: "flex items-center gap-2",
                                      children: [
                                        (0, t.jsx)(y.AlertTriangle, {
                                          size: 16,
                                          className: "text-amber-400",
                                        }),
                                        (0, t.jsx)("p", {
                                          className:
                                            "text-sm font-bold text-white",
                                          children:
                                            "Ativar Cloaker V2 + AntiClone",
                                        }),
                                      ],
                                    }),
                                    (0, t.jsxs)("div", {
                                      className: "space-y-2",
                                      children: [
                                        (0, t.jsx)("p", {
                                          className: "text-xs text-white/50",
                                          children:
                                            "O cloaker requer configuracao adicional. Leia antes de ativar:",
                                        }),
                                        (0, t.jsxs)("ul", {
                                          className:
                                            "text-[11px] text-amber-300/80 space-y-1 ml-4 list-disc",
                                          children: [
                                            (0, t.jsxs)("li", {
                                              children: [
                                                "O parametro ",
                                                (0, t.jsx)("strong", {
                                                  className: "text-amber-300",
                                                  children: "shk",
                                                }),
                                                " deve estar em todos os links de trafego pago",
                                              ],
                                            }),
                                            (0, t.jsxs)("li", {
                                              children: [
                                                "Sem o parametro, o cloaker vai ",
                                                (0, t.jsx)("strong", {
                                                  className: "text-amber-300",
                                                  children: "bloquear o acesso",
                                                }),
                                                " dos visitantes",
                                              ],
                                            }),
                                          ],
                                        }),
                                        (0, t.jsx)("p", {
                                          className:
                                            "text-[11px] text-[var(--brand-400)]/80",
                                          children:
                                            'Use a aba "Gerador UTM" para criar links com o parametro correto.',
                                        }),
                                      ],
                                    }),
                                    (0, t.jsxs)("div", {
                                      className: "flex gap-2",
                                      children: [
                                        (0, t.jsxs)("button", {
                                          type: "button",
                                          onClick: () => {
                                            (tw(!0), tI(!1));
                                          },
                                          className:
                                            "flex-1 px-3 py-2 rounded-lg text-xs font-bold text-white bg-amber-500/20 border border-amber-500/30 hover:bg-amber-500/30 transition-all cursor-pointer flex items-center justify-center gap-1.5",
                                          children: [
                                            (0, t.jsx)(C.Zap, {
                                              size: 12,
                                            }),
                                            "Sim, ativar",
                                          ],
                                        }),
                                        (0, t.jsx)("button", {
                                          type: "button",
                                          onClick: () => tI(!1),
                                          className:
                                            "px-3 py-2 rounded-lg text-xs font-bold text-white/50 border border-white/[0.08] hover:text-white hover:border-white/30 transition-all cursor-pointer",
                                          children: "Cancelar",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              tf &&
                                (0, t.jsxs)("div", {
                                  className: "space-y-3",
                                  children: [
                                    (0, t.jsx)("div", {
                                      className:
                                        "p-3 bg-[var(--brand-500)]/10 border border-[var(--brand-500)]/20 rounded-lg",
                                      children: (0, t.jsxs)("p", {
                                        className:
                                          "text-[11px] text-[var(--brand-400)]",
                                        children: [
                                          (0, t.jsx)(T, {
                                            size: 12,
                                            className: "inline mr-1",
                                          }),
                                          (0, t.jsx)("strong", {
                                            children: "Cloaker ativo:",
                                          }),
                                          " Sistema avancado de deteccao com scoring de bots e crawlers.",
                                        ],
                                      }),
                                    }),
                                    (0, t.jsxs)("div", {
                                      children: [
                                        (0, t.jsx)("label", {
                                          className:
                                            "text-[10px] font-bold text-white/50 uppercase tracking-wider mb-2 block",
                                          children: "Metodo de Bloqueio",
                                        }),
                                        (0, t.jsxs)("div", {
                                          className: "grid grid-cols-3 gap-2",
                                          children: [
                                            (0, t.jsxs)("button", {
                                              type: "button",
                                              onClick: () => tN("safepage"),
                                              className: (0, W.cn)(
                                                "relative p-3 rounded-xl border transition-all cursor-pointer text-left",
                                                "safepage" === tv
                                                  ? "bg-[var(--brand-500)]/10 border-[var(--brand-500)]/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                                                  : "bg-black/20 border-white/10 hover:border-white/20",
                                              ),
                                              children: [
                                                (0, t.jsx)("div", {
                                                  className: (0, W.cn)(
                                                    "w-3 h-3 rounded-full border-2 mb-2 flex items-center justify-center",
                                                    "safepage" === tv
                                                      ? "border-[var(--brand-500)]"
                                                      : "border-white/[0.08]",
                                                  ),
                                                  children:
                                                    "safepage" === tv &&
                                                    (0, t.jsx)("div", {
                                                      className:
                                                        "w-1.5 h-1.5 rounded-full bg-[var(--brand-500)]",
                                                    }),
                                                }),
                                                (0, t.jsx)($.FileText, {
                                                  size: 14,
                                                  className: (0, W.cn)(
                                                    "mb-1",
                                                    "safepage" === tv
                                                      ? "text-[var(--brand-400)]"
                                                      : "text-white/40",
                                                  ),
                                                }),
                                                (0, t.jsx)("p", {
                                                  className: (0, W.cn)(
                                                    "text-xs font-bold",
                                                    "safepage" === tv
                                                      ? "text-white"
                                                      : "text-white/50",
                                                  ),
                                                  children: "Pagina Segura",
                                                }),
                                                (0, t.jsx)("p", {
                                                  className:
                                                    "text-[9px] text-white/40 mt-0.5",
                                                  children:
                                                    "Exibe pagina inline",
                                                }),
                                              ],
                                            }),
                                            (0, t.jsxs)("button", {
                                              type: "button",
                                              onClick: () => tN("redirect"),
                                              className: (0, W.cn)(
                                                "relative p-3 rounded-xl border transition-all cursor-pointer text-left",
                                                "redirect" === tv
                                                  ? "bg-[var(--brand-500)]/10 border-[var(--brand-500)]/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                                                  : "bg-black/20 border-white/10 hover:border-white/20",
                                              ),
                                              children: [
                                                (0, t.jsx)("div", {
                                                  className: (0, W.cn)(
                                                    "w-3 h-3 rounded-full border-2 mb-2 flex items-center justify-center",
                                                    "redirect" === tv
                                                      ? "border-[var(--brand-500)]"
                                                      : "border-white/[0.08]",
                                                  ),
                                                  children:
                                                    "redirect" === tv &&
                                                    (0, t.jsx)("div", {
                                                      className:
                                                        "w-1.5 h-1.5 rounded-full bg-[var(--brand-500)]",
                                                    }),
                                                }),
                                                (0, t.jsx)(B.ArrowUpRight, {
                                                  size: 14,
                                                  className: (0, W.cn)(
                                                    "mb-1",
                                                    "redirect" === tv
                                                      ? "text-[var(--brand-400)]"
                                                      : "text-white/40",
                                                  ),
                                                }),
                                                (0, t.jsx)("p", {
                                                  className: (0, W.cn)(
                                                    "text-xs font-bold",
                                                    "redirect" === tv
                                                      ? "text-white"
                                                      : "text-white/50",
                                                  ),
                                                  children: "Redirect",
                                                }),
                                                (0, t.jsx)("p", {
                                                  className:
                                                    "text-[9px] text-white/40 mt-0.5",
                                                  children:
                                                    "Redireciona para URL",
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    ("redirect" === tv || "mirror" === tv) &&
                                      (0, t.jsxs)("div", {
                                        children: [
                                          (0, t.jsx)("label", {
                                            className:
                                              "text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1.5 block",
                                            children: "URL de Redirecionamento",
                                          }),
                                          (0, t.jsx)(l.Input, {
                                            value: t_,
                                            onChange: (e) => tz(e.target.value),
                                            placeholder:
                                              "https://g1.globo.com/noticias",
                                            className:
                                              "bg-white/[0.03] border-white/[0.08] text-sm h-10",
                                          }),
                                          (0, t.jsx)("p", {
                                            className:
                                              "text-[10px] text-white/40 mt-1",
                                            children:
                                              "Visitantes bloqueados serao redirecionados para esta URL",
                                          }),
                                        ],
                                      }),
                                    "safepage" === tv &&
                                      (0, t.jsx)("div", {
                                        className:
                                          "p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg",
                                        children: (0, t.jsxs)("p", {
                                          className:
                                            "text-[10px] text-emerald-400",
                                          children: [
                                            (0, t.jsx)(S.Shield, {
                                              size: 11,
                                              className: "inline mr-1",
                                            }),
                                            "Visitantes bloqueados verao uma pagina de seguranca do Shark Bot. Nenhuma URL externa necessaria.",
                                          ],
                                        }),
                                      }),
                                    (0, t.jsxs)("div", {
                                      className:
                                        "flex items-center justify-between p-3 bg-black/20 border border-white/10 rounded-xl",
                                      children: [
                                        (0, t.jsxs)("div", {
                                          className:
                                            "flex items-center gap-2.5",
                                          children: [
                                            (0, t.jsx)("div", {
                                              className: (0, W.cn)(
                                                "w-8 h-8 rounded-lg flex items-center justify-center",
                                                tk
                                                  ? "bg-red-500/15"
                                                  : "bg-emerald-500/15",
                                              ),
                                              children: (0, t.jsx)(
                                                _.ShieldAlert,
                                                {
                                                  size: 15,
                                                  className: tk
                                                    ? "text-red-400"
                                                    : "text-emerald-400",
                                                },
                                              ),
                                            }),
                                            (0, t.jsxs)("div", {
                                              children: [
                                                (0, t.jsx)("p", {
                                                  className:
                                                    "text-xs font-bold text-white",
                                                  children:
                                                    "Bloquear Bots de Ads",
                                                }),
                                                (0, t.jsx)("p", {
                                                  className:
                                                    "text-[10px] text-white/40",
                                                  children: tk
                                                    ? "Crawlers do Facebook, Google e TikTok serao bloqueados"
                                                    : "Crawlers de ads podem acessar o link (trafego pago)",
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        (0, t.jsx)(H.Switch, {
                                          checked: tk,
                                          onCheckedChange: ty,
                                          size: "md",
                                        }),
                                      ],
                                    }),
                                    (0, t.jsxs)("div", {
                                      className:
                                        "flex items-center justify-between p-3 bg-black/20 border border-white/10 rounded-xl",
                                      children: [
                                        (0, t.jsxs)("div", {
                                          className:
                                            "flex items-center gap-2.5",
                                          children: [
                                            (0, t.jsx)("div", {
                                              className: (0, W.cn)(
                                                "w-8 h-8 rounded-lg flex items-center justify-center",
                                                tC
                                                  ? "bg-[var(--brand-500)]/15"
                                                  : "bg-white/5",
                                              ),
                                              children: (0, t.jsx)(
                                                q.ShieldBan,
                                                {
                                                  size: 15,
                                                  className: tC
                                                    ? "text-[var(--brand-400)]"
                                                    : "text-white/40",
                                                },
                                              ),
                                            }),
                                            (0, t.jsxs)("div", {
                                              children: [
                                                (0, t.jsx)("p", {
                                                  className:
                                                    "text-xs font-bold text-white",
                                                  children:
                                                    "Anti-Compartilhamento",
                                                }),
                                                (0, t.jsx)("p", {
                                                  className:
                                                    "text-[10px] text-white/40",
                                                  children: tC
                                                    ? "Links compartilhados no Instagram serao bloqueados"
                                                    : "Qualquer pessoa com o link pode acessar",
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        (0, t.jsx)(H.Switch, {
                                          checked: tC,
                                          onCheckedChange: tS,
                                          size: "md",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              tJ &&
                                !tA &&
                                (0, t.jsxs)("div", {
                                  className:
                                    "space-y-3 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl",
                                  children: [
                                    (0, t.jsxs)("div", {
                                      className: "flex items-center gap-2",
                                      children: [
                                        (0, t.jsx)(T, {
                                          size: 16,
                                          className: "text-cyan-400",
                                        }),
                                        (0, t.jsx)("p", {
                                          className:
                                            "text-sm font-bold text-white",
                                          children:
                                            "Ativar Cloaker V2 (Avancado)",
                                        }),
                                      ],
                                    }),
                                    (0, t.jsxs)("div", {
                                      className: "space-y-2",
                                      children: [
                                        (0, t.jsx)("p", {
                                          className: "text-xs text-white/50",
                                          children:
                                            "O Cloaker V2 requer configuracao adicional. Leia antes de ativar:",
                                        }),
                                        (0, t.jsxs)("ul", {
                                          className:
                                            "text-[11px] text-cyan-300/80 space-y-1 ml-4 list-disc",
                                          children: [
                                            (0, t.jsxs)("li", {
                                              children: [
                                                "O parametro ",
                                                (0, t.jsx)("strong", {
                                                  className: "text-cyan-300",
                                                  children: "shk",
                                                }),
                                                " deve estar em todos os links de trafego pago",
                                              ],
                                            }),
                                            (0, t.jsxs)("li", {
                                              children: [
                                                "Sem o parametro, o cloaker vai ",
                                                (0, t.jsx)("strong", {
                                                  className: "text-cyan-300",
                                                  children: "bloquear o acesso",
                                                }),
                                                " dos visitantes",
                                              ],
                                            }),
                                          ],
                                        }),
                                        (0, t.jsx)("p", {
                                          className:
                                            "text-[11px] text-cyan-400/80",
                                          children:
                                            'Use a aba "Gerador UTM" para criar links com o parametro correto.',
                                        }),
                                      ],
                                    }),
                                    (0, t.jsxs)("div", {
                                      className: "flex gap-2",
                                      children: [
                                        (0, t.jsxs)("button", {
                                          type: "button",
                                          onClick: () => {
                                            (tU(!0), tQ(!1));
                                          },
                                          className:
                                            "flex-1 px-3 py-2 rounded-lg text-xs font-bold text-white bg-cyan-500/20 border border-cyan-500/30 hover:bg-cyan-500/30 transition-all cursor-pointer flex items-center justify-center gap-1.5",
                                          children: [
                                            (0, t.jsx)(C.Zap, {
                                              size: 12,
                                            }),
                                            "Sim, ativar V2",
                                          ],
                                        }),
                                        (0, t.jsx)("button", {
                                          type: "button",
                                          onClick: () => tQ(!1),
                                          className:
                                            "px-3 py-2 rounded-lg text-xs font-bold text-white/50 border border-white/[0.08] hover:text-white hover:border-white/30 transition-all cursor-pointer",
                                          children: "Cancelar",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              tA &&
                                (0, t.jsxs)("div", {
                                  className: "space-y-3",
                                  children: [
                                    (0, t.jsx)("div", {
                                      className:
                                        "p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg",
                                      children: (0, t.jsxs)("p", {
                                        className: "text-[11px] text-cyan-400",
                                        children: [
                                          (0, t.jsx)(T, {
                                            size: 12,
                                            className: "inline mr-1",
                                          }),
                                          (0, t.jsx)("strong", {
                                            children: "Cloaker V2 ativo:",
                                          }),
                                          " Sistema avancado de deteccao com scoring de bots e crawlers.",
                                        ],
                                      }),
                                    }),
                                    eY &&
                                      (0, t.jsx)("div", {
                                        className:
                                          "p-3 bg-black/20 border border-white/10 rounded-lg",
                                        children: (0, t.jsxs)("div", {
                                          className:
                                            "flex items-center justify-between",
                                          children: [
                                            (0, t.jsxs)("div", {
                                              className:
                                                "flex items-center gap-2",
                                              children: [
                                                (0, t.jsx)(M.Clock, {
                                                  size: 14,
                                                  className: tK
                                                    ? "text-amber-400"
                                                    : "text-white/40",
                                                }),
                                                (0, t.jsxs)("div", {
                                                  children: [
                                                    (0, t.jsx)("p", {
                                                      className:
                                                        "text-xs font-medium text-white",
                                                      children: "Warm Up",
                                                    }),
                                                    (0, t.jsx)("p", {
                                                      className:
                                                        "text-[10px] text-white/40",
                                                      children: tK
                                                        ? `Ativo ate ${new Date(
                                                            tY,
                                                          ).toLocaleTimeString(
                                                            "pt-BR",
                                                            {
                                                              hour: "2-digit",
                                                              minute: "2-digit",
                                                            },
                                                          )}`
                                                        : "Bloqueia todo trafego por X minutos",
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            (0, t.jsx)("div", {
                                              className:
                                                "flex items-center gap-1.5",
                                              children: tK
                                                ? (0, t.jsx)("button", {
                                                    type: "button",
                                                    disabled: t1,
                                                    onClick: async () => {
                                                      t2(!0);
                                                      try {
                                                        let e = await fetch(
                                                          `/api/links/${eY}/warm-up`,
                                                          {
                                                            method: "POST",
                                                            headers: {
                                                              "Content-Type":
                                                                "application/json",
                                                            },
                                                            credentials:
                                                              "include",
                                                            body: JSON.stringify(
                                                              {
                                                                minutes: 0,
                                                              },
                                                            ),
                                                          },
                                                        );
                                                        (await e.json())
                                                          .success &&
                                                          (tZ(!1), t0(null));
                                                      } catch {}
                                                      t2(!1);
                                                    },
                                                    className:
                                                      "px-3 py-1 text-[10px] font-medium rounded-md bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all",
                                                    children: "Desativar",
                                                  })
                                                : (0, t.jsx)(t.Fragment, {
                                                    children: [
                                                      10, 15, 20, 30,
                                                    ].map((e) =>
                                                      (0, t.jsxs)(
                                                        "button",
                                                        {
                                                          type: "button",
                                                          disabled: t1,
                                                          onClick: async () => {
                                                            t2(!0);
                                                            try {
                                                              let t =
                                                                  await fetch(
                                                                    `/api/links/${eY}/warm-up`,
                                                                    {
                                                                      method:
                                                                        "POST",
                                                                      headers: {
                                                                        "Content-Type":
                                                                          "application/json",
                                                                      },
                                                                      credentials:
                                                                        "include",
                                                                      body: JSON.stringify(
                                                                        {
                                                                          minutes:
                                                                            e,
                                                                        },
                                                                      ),
                                                                    },
                                                                  ),
                                                                s =
                                                                  await t.json();
                                                              s.success &&
                                                                (tZ(!0),
                                                                t0(
                                                                  s.warmUpUntil,
                                                                ));
                                                            } catch {}
                                                            t2(!1);
                                                          },
                                                          className:
                                                            "px-2 py-1 text-[10px] font-medium rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-all",
                                                          children: [e, "min"],
                                                        },
                                                        e,
                                                      ),
                                                    ),
                                                  }),
                                            }),
                                          ],
                                        }),
                                      }),
                                    (0, t.jsxs)("div", {
                                      children: [
                                        (0, t.jsx)("label", {
                                          className:
                                            "text-[10px] font-bold text-white/50 uppercase tracking-wider mb-2 block",
                                          children: "Metodo de Bloqueio",
                                        }),
                                        (0, t.jsx)("div", {
                                          className: "grid grid-cols-2 gap-2",
                                          children: [
                                            "safepage",
                                            "redirect",
                                          ].map((e) =>
                                            (0, t.jsxs)(
                                              "button",
                                              {
                                                type: "button",
                                                onClick: () => tP(e),
                                                className: (0, W.cn)(
                                                  "relative p-3 rounded-xl border transition-all cursor-pointer text-left",
                                                  tE === e
                                                    ? "bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                                                    : "bg-black/20 border-white/10 hover:border-white/20",
                                                ),
                                                children: [
                                                  (0, t.jsx)("div", {
                                                    className: (0, W.cn)(
                                                      "w-3 h-3 rounded-full border-2 mb-2 flex items-center justify-center",
                                                      tE === e
                                                        ? "border-cyan-500"
                                                        : "border-white/[0.08]",
                                                    ),
                                                    children:
                                                      tE === e &&
                                                      (0, t.jsx)("div", {
                                                        className:
                                                          "w-1.5 h-1.5 rounded-full bg-cyan-500",
                                                      }),
                                                  }),
                                                  "safepage" === e &&
                                                    (0, t.jsx)($.FileText, {
                                                      size: 14,
                                                      className:
                                                        tE === e
                                                          ? "text-cyan-400 mb-1"
                                                          : "text-white/40 mb-1",
                                                    }),
                                                  "redirect" === e &&
                                                    (0, t.jsx)(B.ArrowUpRight, {
                                                      size: 14,
                                                      className:
                                                        tE === e
                                                          ? "text-cyan-400 mb-1"
                                                          : "text-white/40 mb-1",
                                                    }),
                                                  (0, t.jsx)("p", {
                                                    className: (0, W.cn)(
                                                      "text-xs font-bold",
                                                      tE === e
                                                        ? "text-white"
                                                        : "text-white/50",
                                                    ),
                                                    children:
                                                      "safepage" === e
                                                        ? "Pagina Segura"
                                                        : "Redirect",
                                                  }),
                                                  (0, t.jsx)("p", {
                                                    className:
                                                      "text-[9px] text-white/40 mt-0.5",
                                                    children:
                                                      "safepage" === e
                                                        ? "Exibe pagina inline"
                                                        : "Redireciona para URL",
                                                  }),
                                                ],
                                              },
                                              e,
                                            ),
                                          ),
                                        }),
                                      ],
                                    }),
                                    ("redirect" === tE || "mirror" === tE) &&
                                      (0, t.jsxs)("div", {
                                        children: [
                                          (0, t.jsx)("label", {
                                            className:
                                              "text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1.5 block",
                                            children: "URL de Redirecionamento",
                                          }),
                                          (0, t.jsx)(l.Input, {
                                            value: tR,
                                            onChange: (e) => tB(e.target.value),
                                            placeholder:
                                              "https://g1.globo.com/noticias",
                                            className:
                                              "bg-white/[0.03] border-white/[0.08] text-sm h-10",
                                          }),
                                        ],
                                      }),
                                    (0, t.jsxs)("div", {
                                      className:
                                        "flex items-center justify-between p-3 bg-black/20 border border-white/10 rounded-xl",
                                      children: [
                                        (0, t.jsxs)("div", {
                                          className:
                                            "flex items-center gap-2.5",
                                          children: [
                                            (0, t.jsx)("div", {
                                              className: (0, W.cn)(
                                                "w-8 h-8 rounded-lg flex items-center justify-center",
                                                tV
                                                  ? "bg-red-500/15"
                                                  : "bg-emerald-500/15",
                                              ),
                                              children: (0, t.jsx)(
                                                _.ShieldAlert,
                                                {
                                                  size: 15,
                                                  className: tV
                                                    ? "text-red-400"
                                                    : "text-emerald-400",
                                                },
                                              ),
                                            }),
                                            (0, t.jsxs)("div", {
                                              children: [
                                                (0, t.jsx)("p", {
                                                  className:
                                                    "text-xs font-bold text-white",
                                                  children:
                                                    "Bloquear Bots de Ads",
                                                }),
                                                (0, t.jsx)("p", {
                                                  className:
                                                    "text-[10px] text-white/40",
                                                  children: tV
                                                    ? "Crawlers do Facebook, Google e TikTok serao bloqueados"
                                                    : "Crawlers de ads podem acessar o link",
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        (0, t.jsx)(H.Switch, {
                                          checked: tV,
                                          onCheckedChange: tL,
                                          size: "md",
                                        }),
                                      ],
                                    }),
                                    (0, t.jsxs)("div", {
                                      className:
                                        "flex items-center justify-between p-3 bg-black/20 border border-white/10 rounded-xl",
                                      children: [
                                        (0, t.jsxs)("div", {
                                          className:
                                            "flex items-center gap-2.5",
                                          children: [
                                            (0, t.jsx)("div", {
                                              className: (0, W.cn)(
                                                "w-8 h-8 rounded-lg flex items-center justify-center",
                                                tD
                                                  ? "bg-cyan-500/15"
                                                  : "bg-white/5",
                                              ),
                                              children: (0, t.jsx)(
                                                q.ShieldBan,
                                                {
                                                  size: 15,
                                                  className: tD
                                                    ? "text-cyan-400"
                                                    : "text-white/40",
                                                },
                                              ),
                                            }),
                                            (0, t.jsxs)("div", {
                                              children: [
                                                (0, t.jsx)("p", {
                                                  className:
                                                    "text-xs font-bold text-white",
                                                  children:
                                                    "Anti-Compartilhamento",
                                                }),
                                                (0, t.jsx)("p", {
                                                  className:
                                                    "text-[10px] text-white/40",
                                                  children: tD
                                                    ? "Links compartilhados no Instagram serao bloqueados"
                                                    : "Qualquer pessoa com o link pode acessar",
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        (0, t.jsx)(H.Switch, {
                                          checked: tD,
                                          onCheckedChange: tM,
                                          size: "md",
                                        }),
                                      ],
                                    }),
                                    (0, t.jsxs)("div", {
                                      className:
                                        "flex items-center justify-between p-3 bg-black/20 border border-white/10 rounded-xl",
                                      children: [
                                        (0, t.jsxs)("div", {
                                          className:
                                            "flex items-center gap-2.5",
                                          children: [
                                            (0, t.jsx)("div", {
                                              className: (0, W.cn)(
                                                "w-8 h-8 rounded-lg flex items-center justify-center",
                                                tq
                                                  ? "bg-cyan-500/15"
                                                  : "bg-white/5",
                                              ),
                                              children: (0, t.jsx)(L.Globe, {
                                                size: 15,
                                                className: tq
                                                  ? "text-cyan-400"
                                                  : "text-white/40",
                                              }),
                                            }),
                                            (0, t.jsxs)("div", {
                                              children: [
                                                (0, t.jsx)("p", {
                                                  className:
                                                    "text-xs font-bold text-white",
                                                  children: "Filtro Geografico",
                                                }),
                                                (0, t.jsx)("p", {
                                                  className:
                                                    "text-[10px] text-white/40",
                                                  children: tq
                                                    ? `Apenas trafego de ${tF.join(", ")} sera permitido`
                                                    : "Trafego de qualquer pais pode acessar",
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        (0, t.jsx)(H.Switch, {
                                          checked: tq,
                                          onCheckedChange: tG,
                                          size: "md",
                                        }),
                                      ],
                                    }),
                                    tq &&
                                      (0, t.jsxs)("div", {
                                        className:
                                          "space-y-3 p-3 bg-black/10 border border-white/[0.06] rounded-xl",
                                        children: [
                                          (0, t.jsxs)("div", {
                                            children: [
                                              (0, t.jsx)("label", {
                                                className:
                                                  "text-[10px] font-bold text-white/50 uppercase tracking-wider mb-2 block",
                                                children: "Paises Permitidos",
                                              }),
                                              (0, t.jsx)("div", {
                                                className:
                                                  "flex flex-wrap gap-1.5",
                                                children: [
                                                  {
                                                    code: "BR",
                                                    name: "Brasil",
                                                  },
                                                  {
                                                    code: "US",
                                                    name: "Estados Unidos",
                                                  },
                                                  {
                                                    code: "PT",
                                                    name: "Portugal",
                                                  },
                                                  {
                                                    code: "ES",
                                                    name: "Espanha",
                                                  },
                                                  {
                                                    code: "MX",
                                                    name: "Mexico",
                                                  },
                                                  {
                                                    code: "AR",
                                                    name: "Argentina",
                                                  },
                                                  {
                                                    code: "CO",
                                                    name: "Colombia",
                                                  },
                                                  {
                                                    code: "CL",
                                                    name: "Chile",
                                                  },
                                                  {
                                                    code: "PE",
                                                    name: "Peru",
                                                  },
                                                  {
                                                    code: "FR",
                                                    name: "Franca",
                                                  },
                                                  {
                                                    code: "DE",
                                                    name: "Alemanha",
                                                  },
                                                  {
                                                    code: "IT",
                                                    name: "Italia",
                                                  },
                                                  {
                                                    code: "GB",
                                                    name: "Reino Unido",
                                                  },
                                                  {
                                                    code: "JP",
                                                    name: "Japao",
                                                  },
                                                  {
                                                    code: "IN",
                                                    name: "India",
                                                  },
                                                ].map(({ code: e, name: s }) =>
                                                  (0, t.jsx)(
                                                    "button",
                                                    {
                                                      type: "button",
                                                      onClick: () => {
                                                        tW((t) =>
                                                          t.includes(e)
                                                            ? t.filter(
                                                                (t) => t !== e,
                                                              )
                                                            : [...t, e],
                                                        );
                                                      },
                                                      className: (0, W.cn)(
                                                        "px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all cursor-pointer",
                                                        tF.includes(e)
                                                          ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-400"
                                                          : "bg-white/[0.02] border-white/[0.06] text-white/40 hover:border-white/20 hover:text-white/60",
                                                      ),
                                                      children: s,
                                                    },
                                                    e,
                                                  ),
                                                ),
                                              }),
                                              0 === tF.length &&
                                                (0, t.jsx)("p", {
                                                  className:
                                                    "text-[10px] text-red-400 mt-1.5",
                                                  children:
                                                    "Selecione pelo menos um pais",
                                                }),
                                            ],
                                          }),
                                          (0, t.jsxs)("div", {
                                            className:
                                              "flex items-center justify-between",
                                            children: [
                                              (0, t.jsxs)("div", {
                                                children: [
                                                  (0, t.jsx)("p", {
                                                    className:
                                                      "text-xs font-medium text-white",
                                                    children:
                                                      "Verificar idioma",
                                                  }),
                                                  (0, t.jsx)("p", {
                                                    className:
                                                      "text-[10px] text-white/40",
                                                    children:
                                                      "Bloquear se Accept-Language nao corresponde",
                                                  }),
                                                ],
                                              }),
                                              (0, t.jsx)(H.Switch, {
                                                checked: tH,
                                                onCheckedChange: tX,
                                                size: "md",
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                  ],
                                }),
                              !eY &&
                                (0, t.jsxs)("div", {
                                  className:
                                    "flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--brand-500)]/5 border border-[var(--brand-500)]/10",
                                  children: [
                                    (0, t.jsx)(L.Globe, {
                                      size: 14,
                                      className: "text-[var(--brand-400)]",
                                    }),
                                    (0, t.jsx)("span", {
                                      className:
                                        "text-xs text-[var(--brand-400)] font-medium",
                                      children:
                                        "default" === si
                                          ? "sharkbot.com.br"
                                          : "phantoms" === si
                                            ? "phantoms.group"
                                            : eU.find((e) => e._id === si)
                                                ?.domain || "sharkbot.com.br",
                                    }),
                                    (0, t.jsx)("button", {
                                      type: "button",
                                      onClick: () => sd(1),
                                      className:
                                        "ml-auto text-[10px] text-white/40 hover:text-white transition-colors cursor-pointer",
                                      children: "Alterar",
                                    }),
                                  ],
                                }),
                              (0, t.jsxs)("div", {
                                children: [
                                  (0, t.jsx)("label", {
                                    className:
                                      "text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1.5 block",
                                    children: "Destino",
                                  }),
                                  (0, t.jsxs)(d.Select, {
                                    value: e1,
                                    onValueChange: (e) => {
                                      (e2(e),
                                        "channel" !== e &&
                                          (e6(""), e9(null), ta(""), to(null)));
                                    },
                                    children: [
                                      (0, t.jsx)(d.SelectTrigger, {
                                        className:
                                          "bg-white/[0.03] border-white/[0.08] text-sm h-10",
                                        children: (0, t.jsx)(d.SelectValue, {}),
                                      }),
                                      (0, t.jsxs)(d.SelectContent, {
                                        className:
                                          "bg-[#111111] border-white/[0.08]",
                                        children: [
                                          (0, t.jsx)(d.SelectItem, {
                                            value: "telegram",
                                            children: (0, t.jsxs)("div", {
                                              className:
                                                "flex items-center gap-2",
                                              children: [
                                                (0, t.jsx)(b.Workflow, {
                                                  size: 14,
                                                }),
                                                "Telegram (Bot)",
                                              ],
                                            }),
                                          }),
                                          (0, t.jsx)(d.SelectItem, {
                                            value: "url",
                                            children: (0, t.jsxs)("div", {
                                              className:
                                                "flex items-center gap-2",
                                              children: [
                                                (0, t.jsx)(L.Globe, {
                                                  size: 14,
                                                }),
                                                "Landing Page (URL)",
                                              ],
                                            }),
                                          }),
                                          (0, t.jsx)(d.SelectItem, {
                                            value: "channel",
                                            children: (0, t.jsxs)("div", {
                                              className:
                                                "flex items-center gap-2",
                                              children: [
                                                (0, t.jsx)(G.Hash, {
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
                                  (0, t.jsx)("p", {
                                    className: "text-[10px] text-white/30 mt-1",
                                    children:
                                      "telegram" === e1
                                        ? "Redireciona para o bot do Telegram"
                                        : "url" === e1
                                          ? "Redireciona para uma URL externa (landing page, checkout, etc)"
                                          : "Redireciona para um canal ou grupo do Telegram com tracking completo",
                                  }),
                                ],
                              }),
                              "url" === e1 &&
                                (0, t.jsxs)("div", {
                                  children: [
                                    (0, t.jsx)("label", {
                                      className:
                                        "text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1.5 block",
                                      children: "URL da Landing Page",
                                    }),
                                    (0, t.jsx)(l.Input, {
                                      value: e5,
                                      onChange: (e) => e4(e.target.value),
                                      placeholder:
                                        "https://sua-landing-page.com",
                                      className:
                                        "bg-white/[0.03] border-white/[0.08] text-sm h-10",
                                    }),
                                    (0, t.jsx)("p", {
                                      className:
                                        "text-[10px] text-white/30 mt-1",
                                      children:
                                        "O visitante sera redirecionado para esta URL com tracking completo",
                                    }),
                                  ],
                                }),
                              "channel" === e1 &&
                                (0, t.jsxs)("div", {
                                  className: "space-y-4",
                                  children: [
                                    (0, t.jsxs)("div", {
                                      children: [
                                        (0, t.jsx)("label", {
                                          className:
                                            "text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1.5 block",
                                          children: "Bot",
                                        }),
                                        (0, t.jsxs)(d.Select, {
                                          value: e3,
                                          onValueChange: (e) => {
                                            (e6(e), ta(""), ti(""), sF(e));
                                          },
                                          children: [
                                            (0, t.jsx)(d.SelectTrigger, {
                                              className:
                                                "bg-white/[0.03] border-white/[0.08] text-sm h-10",
                                              children: (0, t.jsx)(
                                                d.SelectValue,
                                                {
                                                  placeholder:
                                                    "Selecionar bot...",
                                                },
                                              ),
                                            }),
                                            (0, t.jsx)(d.SelectContent, {
                                              className:
                                                "bg-[#111111] border-white/[0.08]",
                                              children: eV
                                                .filter(
                                                  (e) => "ativo" === e.status,
                                                )
                                                .map((e) =>
                                                  (0, t.jsxs)(
                                                    d.SelectItem,
                                                    {
                                                      value: e._id,
                                                      children: [
                                                        "@",
                                                        e.username,
                                                      ],
                                                    },
                                                    e._id,
                                                  ),
                                                ),
                                            }),
                                          ],
                                        }),
                                        (0, t.jsx)("p", {
                                          className:
                                            "text-[10px] text-white/30 mt-1",
                                          children:
                                            "O bot precisa ser admin no canal/grupo com permissao de criar links de convite",
                                        }),
                                      ],
                                    }),
                                    e3 &&
                                      (0, t.jsxs)("div", {
                                        children: [
                                          (0, t.jsx)("label", {
                                            className:
                                              "text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1.5 block",
                                            children: "Canal / Grupo",
                                          }),
                                          te
                                            ? (0, t.jsxs)("div", {
                                                className:
                                                  "flex items-center gap-2 p-3 bg-white/[0.03] rounded-xl border border-white/10",
                                                children: [
                                                  (0, t.jsx)(u.Loader2, {
                                                    size: 14,
                                                    className:
                                                      "animate-spin text-white/50",
                                                  }),
                                                  (0, t.jsx)("span", {
                                                    className:
                                                      "text-xs text-white/50",
                                                    children:
                                                      "Carregando canais...",
                                                  }),
                                                ],
                                              })
                                            : 0 === tt.length
                                              ? (0, t.jsx)("div", {
                                                  className:
                                                    "p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg",
                                                  children: (0, t.jsx)("p", {
                                                    className:
                                                      "text-[11px] text-amber-400",
                                                    children:
                                                      "Nenhum canal/grupo encontrado. O bot precisa ser admin com permissao de criar links de convite.",
                                                  }),
                                                })
                                              : (0, t.jsxs)(d.Select, {
                                                  value: ts,
                                                  onValueChange: (e) => {
                                                    ta(e);
                                                    let t = tt.find(
                                                      (t) => t.chatId === e,
                                                    );
                                                    t &&
                                                      ti(
                                                        "channel" === t.type
                                                          ? "channel"
                                                          : "supergroup",
                                                      );
                                                  },
                                                  children: [
                                                    (0, t.jsx)(
                                                      d.SelectTrigger,
                                                      {
                                                        className:
                                                          "bg-white/[0.03] border-white/[0.08] text-sm h-10",
                                                        children: (0, t.jsx)(
                                                          d.SelectValue,
                                                          {
                                                            placeholder:
                                                              "Selecionar canal/grupo...",
                                                          },
                                                        ),
                                                      },
                                                    ),
                                                    (0, t.jsx)(
                                                      d.SelectContent,
                                                      {
                                                        className:
                                                          "bg-[#111111] border-white/[0.08]",
                                                        children: tt.map((e) =>
                                                          (0, t.jsx)(
                                                            d.SelectItem,
                                                            {
                                                              value: e.chatId,
                                                              children: (0,
                                                              t.jsxs)("div", {
                                                                className:
                                                                  "flex items-center gap-2",
                                                                children: [
                                                                  (0, t.jsx)(
                                                                    G.Hash,
                                                                    {
                                                                      size: 14,
                                                                    },
                                                                  ),
                                                                  e.title,
                                                                  (0, t.jsx)(
                                                                    "span",
                                                                    {
                                                                      className:
                                                                        "text-[10px] text-white/40",
                                                                      children:
                                                                        "channel" ===
                                                                        e.type
                                                                          ? "Canal"
                                                                          : "Grupo",
                                                                    },
                                                                  ),
                                                                ],
                                                              }),
                                                            },
                                                            e.chatId,
                                                          ),
                                                        ),
                                                      },
                                                    ),
                                                  ],
                                                }),
                                        ],
                                      }),
                                  ],
                                }),
                              "url" !== e1 &&
                                (0, t.jsxs)("div", {
                                  children: [
                                    (0, t.jsxs)("label", {
                                      className:
                                        "text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1.5 block",
                                      children: [
                                        "Fluxos ",
                                        "channel" === e1 &&
                                          (0, t.jsx)("span", {
                                            className:
                                              "text-white/30 normal-case font-normal",
                                            children:
                                              "(opcional - necessario para tracking/pixels)",
                                          }),
                                      ],
                                    }),
                                    (0, t.jsx)("div", {
                                      className:
                                        "p-3 bg-white/[0.03] rounded-xl border border-white/10 min-h-[70px]",
                                      children:
                                        0 === eH.length
                                          ? (0, t.jsx)("p", {
                                              className:
                                                "text-xs text-white/30 text-center py-3",
                                              children:
                                                "Nenhum fluxo selecionado",
                                            })
                                          : (0, t.jsx)("div", {
                                              className: "flex flex-wrap gap-2",
                                              children: eH.map((e) => {
                                                let s = eA.find(
                                                  (t) => t._id === e,
                                                );
                                                return s
                                                  ? (0, t.jsxs)(
                                                      "span",
                                                      {
                                                        className:
                                                          "inline-flex items-center gap-1.5 px-2.5 py-1 bg-[var(--brand-500)]/10 text-[var(--brand-400)] text-[11px] font-bold rounded-lg border border-[var(--brand-500)]/20",
                                                        children: [
                                                          (0, t.jsx)(
                                                            b.Workflow,
                                                            {
                                                              size: 12,
                                                            },
                                                          ),
                                                          s.name,
                                                          (0, t.jsx)("button", {
                                                            onClick: () =>
                                                              sW(e),
                                                            className:
                                                              "hover:text-red-400 ml-1 cursor-pointer",
                                                            children: (0,
                                                            t.jsx)(j.X, {
                                                              size: 12,
                                                            }),
                                                          }),
                                                        ],
                                                      },
                                                      e,
                                                    )
                                                  : null;
                                              }),
                                            }),
                                    }),
                                    0 === eA.length
                                      ? (0, t.jsx)("div", {
                                          className:
                                            "mt-2 p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg",
                                          children: (0, t.jsx)("p", {
                                            className:
                                              "text-[11px] text-amber-400",
                                            children:
                                              "Nenhum fluxo disponível. Crie um fluxo primeiro.",
                                          }),
                                        })
                                      : (0, t.jsxs)(d.Select, {
                                          value: "",
                                          onValueChange: sW,
                                          children: [
                                            (0, t.jsx)(d.SelectTrigger, {
                                              className:
                                                "mt-2.5 bg-white/[0.03] border-white/[0.08] text-sm h-10",
                                              children: (0, t.jsx)(
                                                d.SelectValue,
                                                {
                                                  placeholder:
                                                    "Adicionar fluxo...",
                                                },
                                              ),
                                            }),
                                            (0, t.jsx)(d.SelectContent, {
                                              className:
                                                "bg-[#111111] border-white/[0.08]",
                                              children: eA
                                                .filter(
                                                  (e) => !eH.includes(e._id),
                                                )
                                                .map((e) =>
                                                  (0, t.jsx)(
                                                    d.SelectItem,
                                                    {
                                                      value: e._id,
                                                      children: (0, t.jsxs)(
                                                        "div",
                                                        {
                                                          className:
                                                            "flex items-center gap-2",
                                                          children: [
                                                            (0, t.jsx)(
                                                              b.Workflow,
                                                              {
                                                                size: 14,
                                                              },
                                                            ),
                                                            e.name,
                                                          ],
                                                        },
                                                      ),
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
                        "codigos-venda" === ev &&
                          (0, t.jsxs)("div", {
                            className: "space-y-5",
                            children: [
                              (0, t.jsx)("div", {
                                className:
                                  "p-3 bg-[var(--brand-500)]/10 border border-[var(--brand-500)]/20 rounded-lg",
                                children: (0, t.jsxs)("p", {
                                  className:
                                    "text-[11px] text-[var(--brand-400)]",
                                  children: [
                                    (0, t.jsx)(I.Tag, {
                                      size: 12,
                                      className: "inline mr-1",
                                    }),
                                    "Codigos de venda (cv=) permitem rastrear vendas de afiliados ou campanhas especificas.",
                                  ],
                                }),
                              }),
                              (0, t.jsxs)("div", {
                                children: [
                                  (0, t.jsx)("label", {
                                    className:
                                      "text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1.5 block",
                                    children: "Nome do Codigo",
                                  }),
                                  (0, t.jsx)(l.Input, {
                                    value: e$,
                                    onChange: (e) => eO(e.target.value),
                                    placeholder: "Ex: afiliado-joao",
                                    className:
                                      "bg-white/[0.03] border-white/[0.08] text-white text-sm h-10",
                                  }),
                                ],
                              }),
                              (0, t.jsxs)("div", {
                                children: [
                                  (0, t.jsx)("label", {
                                    className:
                                      "text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1.5 block",
                                    children: "Link Vinculado",
                                  }),
                                  (0, t.jsxs)(d.Select, {
                                    value: eJ,
                                    onValueChange: (e) => {
                                      eQ(e);
                                      let t = eI.find((t) => t._id === e);
                                      t &&
                                        eX(
                                          t.flows
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
                                      (0, t.jsx)(d.SelectTrigger, {
                                        className:
                                          "bg-white/[0.03] border-white/[0.08] text-sm h-10",
                                        children: (0, t.jsx)(d.SelectValue, {
                                          placeholder: "Selecione um link...",
                                        }),
                                      }),
                                      (0, t.jsx)(d.SelectContent, {
                                        className:
                                          "bg-[#111111] border-white/[0.08]",
                                        children: eI
                                          .filter((e) => "link" === e.type)
                                          .map((e) =>
                                            (0, t.jsx)(
                                              d.SelectItem,
                                              {
                                                value: e._id,
                                                children: (0, t.jsxs)("div", {
                                                  className:
                                                    "flex items-center gap-2",
                                                  children: [
                                                    (0, t.jsx)(c.Link2, {
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
                    (0, t.jsx)(o.DialogFooter, {
                      className:
                        "px-6 py-4 border-t border-white/[0.04] flex-shrink-0",
                      children:
                        "redirecionadores" !== ev || 1 !== sn || eY
                          ? (0, t.jsxs)("div", {
                              className: "flex gap-3 w-full",
                              children: [
                                (0, t.jsxs)("button", {
                                  onClick: sK,
                                  disabled: eK,
                                  className:
                                    "relative flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50 cursor-pointer enter-btn",
                                  children: [
                                    (0, t.jsx)("span", {
                                      className:
                                        "absolute inset-0 rounded-xl border border-[rgba(28,28,28,0.2)]",
                                    }),
                                    (0, t.jsxs)("span", {
                                      className:
                                        "relative z-10 flex items-center justify-center gap-2",
                                      children: [
                                        eK
                                          ? (0, t.jsx)(u.Loader2, {
                                              size: 16,
                                              className: "animate-spin",
                                            })
                                          : (0, t.jsx)(f.Check, {
                                              size: 16,
                                            }),
                                        eY ? "Salvar" : "Criar",
                                      ],
                                    }),
                                  ],
                                }),
                                (0, t.jsx)("button", {
                                  onClick: () => {
                                    (eM(!1), sH());
                                  },
                                  className:
                                    "px-6 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm font-bold text-white/60 hover:text-white hover:border-white/20 transition-all cursor-pointer",
                                  children: "Cancelar",
                                }),
                              ],
                            })
                          : (0, t.jsx)("div", {
                              className: "flex gap-3 w-full",
                              children: (0, t.jsx)("button", {
                                onClick: () => {
                                  (eM(!1), sH());
                                },
                                className:
                                  "flex-1 px-6 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm font-bold text-white/60 hover:text-white hover:border-white/20 transition-all cursor-pointer",
                                children: "Cancelar",
                              }),
                            }),
                    }),
                  ],
                }),
              }),
              "codigos-venda" === ev &&
                (0, t.jsx)("div", {
                  children:
                    0 === eL.length
                      ? (0, t.jsxs)("div", {
                          className: "text-center py-20",
                          children: [
                            (0, t.jsx)("div", {
                              className:
                                "w-14 h-14 rounded-xl bg-[var(--brand-500)]/[0.08] border border-[var(--brand-500)]/20 flex items-center justify-center mx-auto mb-4",
                              children: (0, t.jsx)(I.Tag, {
                                size: 24,
                                className: "text-[var(--brand-400)]",
                              }),
                            }),
                            (0, t.jsx)("p", {
                              className: "text-sm text-white/60 font-medium",
                              children: "Nenhum código de vendas criado",
                            }),
                            (0, t.jsx)("p", {
                              className: "text-xs text-white/30 mt-1 mb-5",
                              children:
                                "Códigos de venda (cv=) rastreiam tráfego orgânico e afiliados",
                            }),
                            (0, t.jsxs)("button", {
                              onClick: () => {
                                (sH(), eM(!0));
                              },
                              className:
                                "relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all cursor-pointer enter-btn",
                              children: [
                                (0, t.jsx)("span", {
                                  className:
                                    "absolute inset-0 rounded-xl border border-[rgba(28,28,28,0.2)]",
                                }),
                                (0, t.jsxs)("span", {
                                  className:
                                    "relative z-10 flex items-center gap-2",
                                  children: [
                                    (0, t.jsx)(N.Plus, {
                                      size: 16,
                                    }),
                                    "Criar Primeiro Codigo",
                                  ],
                                }),
                              ],
                            }),
                          ],
                        })
                      : (0, t.jsx)("div", {
                          className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                          children: eL.map((e) => {
                            let s = s1(e),
                              a = so.has(e._id);
                            return (0, t.jsxs)(
                              "div",
                              {
                                className:
                                  "p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/10 transition-all group",
                                children: [
                                  (0, t.jsxs)("div", {
                                    className: "flex items-center gap-3 mb-3",
                                    children: [
                                      (0, t.jsx)("div", {
                                        className:
                                          "w-10 h-10 rounded-xl bg-white/[0.02] flex items-center justify-center border border-white/[0.06] flex-shrink-0",
                                        children: (0, t.jsx)(I.Tag, {
                                          size: 18,
                                          className: "text-[var(--brand-400)]",
                                        }),
                                      }),
                                      (0, t.jsxs)("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                          (0, t.jsx)("h3", {
                                            className:
                                              "text-sm font-bold text-white truncate",
                                            children: e.name,
                                          }),
                                          (0, t.jsxs)("div", {
                                            className:
                                              "flex items-center gap-1.5 mt-0.5",
                                            children: [
                                              (0, t.jsxs)("code", {
                                                className:
                                                  "text-[10px] font-mono text-[var(--brand-400)]",
                                                children: ["cv=", e.slug],
                                              }),
                                              (0, t.jsx)("button", {
                                                onClick: async () => {
                                                  (await navigator.clipboard.writeText(
                                                    `cv=${e.slug}`,
                                                  ),
                                                    ef({
                                                      type: "success",
                                                      title: "Código copiado!",
                                                    }));
                                                },
                                                className:
                                                  "p-0.5 rounded text-white/50/60 hover:text-[var(--brand-400)] hover:bg-[var(--brand-500)]/10 transition-all cursor-pointer",
                                                title: "Copiar código cv=...",
                                                children: (0, t.jsx)(x.Copy, {
                                                  size: 10,
                                                }),
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      (0, t.jsxs)("div", {
                                        className: "flex gap-1.5 flex-shrink-0",
                                        children: [
                                          (0, t.jsx)("button", {
                                            onClick: async () => {
                                              let t = e.flows?.[0];
                                              if (!t)
                                                return void ef({
                                                  type: "error",
                                                  title:
                                                    "Nenhum fluxo vinculado a este código",
                                                });
                                              let s =
                                                  "object" == typeof t.flowId &&
                                                  null !== t.flowId
                                                    ? t.flowId._id
                                                    : t.flowId,
                                                a = eI
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
                                                          : e.flowId) === s,
                                                    ),
                                                  );
                                              if (!a)
                                                return void ef({
                                                  type: "error",
                                                  title: "Link não encontrado",
                                                  description:
                                                    "Crie um link de redirecionamento para este fluxo primeiro",
                                                });
                                              let r = `${a.fullUrl}?cv=${e.slug}`;
                                              (a.cloakerV2?.enabled &&
                                                a.shk &&
                                                (r += `&shk=${a.shk}`),
                                                await navigator.clipboard.writeText(
                                                  r,
                                                ),
                                                ef({
                                                  type: "success",
                                                  title:
                                                    "Link do fluxo copiado!",
                                                }));
                                            },
                                            className:
                                              "p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/30 hover:text-[var(--brand-400)] hover:border-[var(--brand-500)]/20 transition-all cursor-pointer",
                                            title: "Copiar link do fluxo",
                                            children: (0, t.jsx)(x.Copy, {
                                              size: 14,
                                            }),
                                          }),
                                          (0, t.jsx)("button", {
                                            onClick: () => {
                                              let t = new Set(so);
                                              (a
                                                ? t.delete(e._id)
                                                : t.add(e._id),
                                                sc(t));
                                            },
                                            className:
                                              "p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/30 hover:text-white hover:border-white/10 transition-all cursor-pointer",
                                            children: a
                                              ? (0, t.jsx)(U.ChevronUp, {
                                                  size: 14,
                                                })
                                              : (0, t.jsx)(A.ChevronDown, {
                                                  size: 14,
                                                }),
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, t.jsx)("div", {
                                    className: "flex flex-wrap gap-1.5 mb-3",
                                    children: s.map((e, s) =>
                                      (0, t.jsxs)(
                                        "span",
                                        {
                                          className:
                                            "inline-flex items-center gap-1 px-2 py-0.5 bg-white/[0.04] text-white/50 text-[10px] rounded border border-white/[0.04]",
                                          children: [
                                            (0, t.jsx)(b.Workflow, {
                                              size: 10,
                                            }),
                                            e,
                                          ],
                                        },
                                        s,
                                      ),
                                    ),
                                  }),
                                  (0, t.jsxs)("div", {
                                    className: "grid grid-cols-4 gap-2 mb-3",
                                    children: [
                                      (0, t.jsxs)("div", {
                                        className:
                                          "p-2 bg-white/[0.02] rounded-lg border border-white/[0.04]",
                                        children: [
                                          (0, t.jsxs)("div", {
                                            className:
                                              "flex items-center gap-1 mb-0.5",
                                            children: [
                                              (0, t.jsx)(k.MousePointerClick, {
                                                size: 9,
                                                className:
                                                  "text-[var(--brand-400)]",
                                              }),
                                              (0, t.jsx)("span", {
                                                className:
                                                  "text-[8px] text-white/40 font-bold uppercase",
                                                children: "Cliques",
                                              }),
                                            ],
                                          }),
                                          (0, t.jsx)("p", {
                                            className:
                                              "text-sm font-bold text-white",
                                            children: e.stats?.totalClicks || 0,
                                          }),
                                        ],
                                      }),
                                      (0, t.jsxs)("div", {
                                        className:
                                          "p-2 bg-white/[0.02] rounded-lg border border-white/[0.04]",
                                        children: [
                                          (0, t.jsxs)("div", {
                                            className:
                                              "flex items-center gap-1 mb-0.5",
                                            children: [
                                              (0, t.jsx)(P.Users, {
                                                size: 9,
                                                className:
                                                  "text-[var(--brand-400)]",
                                              }),
                                              (0, t.jsx)("span", {
                                                className:
                                                  "text-[8px] text-white/40 font-bold uppercase",
                                                children: "Leads",
                                              }),
                                            ],
                                          }),
                                          (0, t.jsx)("p", {
                                            className:
                                              "text-sm font-bold text-white",
                                            children:
                                              e.calculatedStats?.leads || 0,
                                          }),
                                        ],
                                      }),
                                      (0, t.jsxs)("div", {
                                        className:
                                          "p-2 bg-white/[0.02] rounded-lg border border-white/[0.04]",
                                        children: [
                                          (0, t.jsxs)("div", {
                                            className:
                                              "flex items-center gap-1 mb-0.5",
                                            children: [
                                              (0, t.jsx)(V.ShoppingCart, {
                                                size: 9,
                                                className: "text-emerald-400",
                                              }),
                                              (0, t.jsx)("span", {
                                                className:
                                                  "text-[8px] text-white/40 font-bold uppercase",
                                                children: "Vendas",
                                              }),
                                            ],
                                          }),
                                          (0, t.jsx)("p", {
                                            className:
                                              "text-sm font-bold text-white",
                                            children:
                                              e.calculatedStats?.sales || 0,
                                          }),
                                        ],
                                      }),
                                      (0, t.jsxs)("div", {
                                        className:
                                          "p-2 bg-white/[0.02] rounded-lg border border-white/[0.04]",
                                        children: [
                                          (0, t.jsxs)("div", {
                                            className:
                                              "flex items-center gap-1 mb-0.5",
                                            children: [
                                              (0, t.jsx)(E.DollarSign, {
                                                size: 9,
                                                className: "text-green-400",
                                              }),
                                              (0, t.jsx)("span", {
                                                className:
                                                  "text-[8px] text-white/40 font-bold uppercase",
                                                children: "Receita",
                                              }),
                                            ],
                                          }),
                                          (0, t.jsx)("p", {
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
                                    (0, t.jsx)("div", {
                                      className:
                                        "pt-3 border-t border-white/[0.04] space-y-3",
                                      children: (0, t.jsxs)("div", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                          (0, t.jsxs)("button", {
                                            onClick: () => sQ(e),
                                            className:
                                              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[11px] font-medium text-white/40 hover:text-white hover:border-white/10 transition-all cursor-pointer",
                                            children: [
                                              (0, t.jsx)(h.Pencil, {
                                                size: 12,
                                              }),
                                              "Editar",
                                            ],
                                          }),
                                          (0, t.jsx)("button", {
                                            onClick: () => {
                                              (tu({
                                                id: e._id,
                                                name: e.name,
                                              }),
                                                tp(!0));
                                            },
                                            className:
                                              "p-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/30 hover:text-red-400 hover:border-red-500/20 hover:bg-red-500/5 transition-all cursor-pointer",
                                            title: "Excluir",
                                            children: (0, t.jsx)(p.Trash2, {
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
              "utm" === ev &&
                (0, t.jsxs)("div", {
                  className:
                    "bg-white/[0.02] border border-white/[0.06] rounded-xl",
                  children: [
                    (0, t.jsx)("div", {
                      className: "px-5 py-4 border-b border-white/[0.04]",
                      children: (0, t.jsxs)("div", {
                        className: "flex items-center gap-3",
                        children: [
                          (0, t.jsx)("div", {
                            className:
                              "w-8 h-8 rounded-lg bg-[var(--brand-500)]/[0.08] border border-[var(--brand-500)]/20 flex items-center justify-center",
                            children: (0, t.jsx)(c.Link2, {
                              size: 15,
                              className: "text-[var(--brand-400)]",
                            }),
                          }),
                          (0, t.jsxs)("div", {
                            children: [
                              (0, t.jsx)("h2", {
                                className: "text-sm font-bold text-white",
                                children: "Gerador de Links UTM",
                              }),
                              (0, t.jsx)("p", {
                                className: "text-[10px] text-white/30",
                                children:
                                  "Monte links com parâmetros UTM para rastrear campanhas",
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                    (0, t.jsxs)("div", {
                      className: "p-5 space-y-5",
                      children: [
                        (0, t.jsxs)("div", {
                          className: "grid grid-cols-3 gap-4",
                          children: [
                            (0, t.jsxs)("div", {
                              className: "flex flex-col",
                              children: [
                                (0, t.jsx)("label", {
                                  className:
                                    "text-[10px] font-bold text-white/50 uppercase tracking-wider h-4 flex items-center",
                                  children: "Link Base",
                                }),
                                (0, t.jsxs)(d.Select, {
                                  value: sx,
                                  onValueChange: (e) => {
                                    sm(e);
                                    let t = eI.find((t) => t._id === e);
                                    t?.fullUrl &&
                                      (t.fullUrl.includes("phantoms.group")
                                        ? sG("phantoms")
                                        : t.customDomainId
                                          ? sG(
                                              "string" ==
                                                typeof t.customDomainId
                                                ? t.customDomainId
                                                : "default",
                                            )
                                          : sG("default"));
                                  },
                                  children: [
                                    (0, t.jsx)(d.SelectTrigger, {
                                      className:
                                        "mt-1.5 bg-white/[0.03] border-white/[0.08] text-sm h-9",
                                      children: (0, t.jsx)(d.SelectValue, {
                                        placeholder: "Selecione um link...",
                                      }),
                                    }),
                                    (0, t.jsx)(d.SelectContent, {
                                      className:
                                        "bg-[#111111] border-white/[0.08]",
                                      children:
                                        eI.filter((e) => "link" === e.type)
                                          .length > 0
                                          ? eI
                                              .filter((e) => "link" === e.type)
                                              .map((e) => {
                                                let s = e.flows?.[0],
                                                  a =
                                                    s?.flowId &&
                                                    "object" == typeof s.flowId
                                                      ? s.flowId.name
                                                      : eA.find(
                                                          (e) =>
                                                            e._id === s?.flowId,
                                                        )?.name,
                                                  r = e.flows?.length || 0;
                                                return (0, t.jsx)(
                                                  d.SelectItem,
                                                  {
                                                    value: e._id,
                                                    children: (0, t.jsxs)(
                                                      "div",
                                                      {
                                                        className:
                                                          "flex items-center justify-between gap-3 w-full",
                                                        children: [
                                                          (0, t.jsxs)("span", {
                                                            className:
                                                              "text-xs text-white truncate max-w-[180px]",
                                                            children: [
                                                              a || "Sem fluxo",
                                                              r > 1 &&
                                                                (0, t.jsxs)(
                                                                  "span",
                                                                  {
                                                                    className:
                                                                      "text-white/40 ml-1",
                                                                    children: [
                                                                      "(+",
                                                                      r - 1,
                                                                      ")",
                                                                    ],
                                                                  },
                                                                ),
                                                            ],
                                                          }),
                                                          (0, t.jsx)("span", {
                                                            className:
                                                              "text-[9px] font-bold bg-[var(--brand-500)]/20 text-[var(--brand-400)] px-1.5 py-0.5 rounded border border-[var(--brand-500)]/30",
                                                            children: e.slug,
                                                          }),
                                                        ],
                                                      },
                                                    ),
                                                  },
                                                  e._id,
                                                );
                                              })
                                          : (0, t.jsx)("div", {
                                              className:
                                                "px-3 py-2 text-xs text-white/40",
                                              children:
                                                "Nenhum link criado. Crie um na aba Links primeiro.",
                                            }),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, t.jsxs)("div", {
                              className: "flex flex-col",
                              children: [
                                (0, t.jsxs)("label", {
                                  className:
                                    "text-[10px] font-bold text-white/50 uppercase tracking-wider h-4 flex items-center gap-1.5",
                                  children: [
                                    (0, t.jsx)(L.Globe, {
                                      size: 10,
                                    }),
                                    "Domínio",
                                  ],
                                }),
                                (0, t.jsxs)(d.Select, {
                                  value: sq,
                                  onValueChange: sG,
                                  disabled: !sx,
                                  children: [
                                    (0, t.jsx)(d.SelectTrigger, {
                                      className: (0, W.cn)(
                                        "mt-1.5 bg-white/[0.03] border-white/[0.08] text-sm h-9",
                                        !sx && "opacity-40 cursor-not-allowed",
                                      ),
                                      children: (0, t.jsx)(d.SelectValue, {
                                        placeholder: sx
                                          ? "Selecione..."
                                          : "Selecione um link primeiro",
                                      }),
                                    }),
                                    (0, t.jsxs)(d.SelectContent, {
                                      className:
                                        "bg-[#111111] border-white/[0.08]",
                                      children: [
                                        (0, t.jsx)(d.SelectItem, {
                                          value: "default",
                                          children: (0, t.jsxs)("div", {
                                            className:
                                              "flex items-center gap-2",
                                            children: [
                                              (0, t.jsx)("span", {
                                                className: "text-xs text-white",
                                                children: "sharkbot.com.br/l/",
                                              }),
                                              (0, t.jsx)("span", {
                                                className:
                                                  "text-[9px] text-white/40",
                                                children: "(Padrão)",
                                              }),
                                            ],
                                          }),
                                        }),
                                        (0, t.jsx)(d.SelectItem, {
                                          value: "phantoms",
                                          children: (0, t.jsx)("div", {
                                            className:
                                              "flex items-center gap-2",
                                            children: (0, t.jsx)("span", {
                                              className: "text-xs text-white",
                                              children: "phantoms.group/l/",
                                            }),
                                          }),
                                        }),
                                        eU
                                          .filter((e) => "active" === e.status)
                                          .map((e) =>
                                            (0, t.jsx)(
                                              d.SelectItem,
                                              {
                                                value: e._id,
                                                children: (0, t.jsxs)("div", {
                                                  className:
                                                    "flex items-center gap-2",
                                                  children: [
                                                    (0, t.jsxs)("span", {
                                                      className:
                                                        "text-xs text-[var(--brand-400)]",
                                                      children: [
                                                        e.domain,
                                                        "/l/",
                                                      ],
                                                    }),
                                                    (0, t.jsx)(D.CheckCircle, {
                                                      size: 10,
                                                      className:
                                                        "text-emerald-400",
                                                    }),
                                                  ],
                                                }),
                                              },
                                              e._id,
                                            ),
                                          ),
                                        0 ===
                                          eU.filter(
                                            (e) => "active" === e.status,
                                          ).length &&
                                          (0, t.jsx)("div", {
                                            className:
                                              "px-3 py-2 text-[10px] text-white/40 border-t border-white/[0.04] mt-1",
                                            children:
                                              'Adicione domínios na aba "Domínio Próprio"',
                                          }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, t.jsxs)("div", {
                              className: "flex flex-col",
                              children: [
                                (0, t.jsx)("label", {
                                  className:
                                    "text-[10px] font-bold text-white/50 uppercase tracking-wider h-4 flex items-center",
                                  children: "Modelo UTM",
                                }),
                                (0, t.jsxs)(d.Select, {
                                  value: sh,
                                  onValueChange: (e) => {
                                    (sp(e),
                                      "utmify_meta" === e
                                        ? (su("FB"),
                                          sj(
                                            "{{campaign.name}}|{{campaign.id}}",
                                          ),
                                          sw("{{adset.name}}|{{adset.id}}"),
                                          sN("{{ad.name}}|{{ad.id}}"),
                                          sy("{{placement}}"),
                                          sS("{{campaign.id}}"))
                                        : "utmify_tiktok" === e
                                          ? (su("tiktok"),
                                            sj(
                                              "__CAMPAIGN_NAME__|__CAMPAIGN_ID__",
                                            ),
                                            sw("__AID_NAME__|__AID__"),
                                            sN("__CID_NAME__|__CID__"),
                                            sy("__PLACEMENT__"),
                                            sS("__CAMPAIGN_ID__"))
                                          : "utmify_google" === e
                                            ? (su("google"),
                                              sj("{campaignid}"),
                                              sw("cpc"),
                                              sN("{creative}"),
                                              sy("{keyword}"),
                                              sS("{gclid}"))
                                            : ("organic_instagram_bio" === e
                                                ? (su("instagram"),
                                                  sj("bio"),
                                                  sw("organic"),
                                                  sN("profile"))
                                                : "organic_tiktok_bio" === e
                                                  ? (su("tiktok"),
                                                    sj("bio"),
                                                    sw("organic"),
                                                    sN("profile"))
                                                  : "organic_twitter_bio" === e
                                                    ? (su("twitter"),
                                                      sj("bio"),
                                                      sw("organic"),
                                                      sN("profile"))
                                                    : "organic_youtube_desc" ===
                                                        e
                                                      ? (su("youtube"),
                                                        sj("description"),
                                                        sw("organic"),
                                                        sN("video"))
                                                      : "organic_whatsapp" === e
                                                        ? (su("whatsapp"),
                                                          sj("status"),
                                                          sw("organic"),
                                                          sN("story"))
                                                        : "organic_telegram" ===
                                                            e
                                                          ? (su("telegram"),
                                                            sj("bio"),
                                                            sw("organic"),
                                                            sN("profile"))
                                                          : (su(""),
                                                            sj(""),
                                                            sw(""),
                                                            sN("")),
                                              sy(""),
                                              sS("")));
                                  },
                                  children: [
                                    (0, t.jsx)(d.SelectTrigger, {
                                      className:
                                        "mt-1.5 bg-white/[0.03] border-white/[0.08] text-sm h-9",
                                      children: (0, t.jsx)(d.SelectValue, {}),
                                    }),
                                    (0, t.jsxs)(d.SelectContent, {
                                      className:
                                        "bg-[#111111] border-white/[0.08]",
                                      children: [
                                        (0, t.jsx)(d.SelectItem, {
                                          value: "custom",
                                          children: "Personalizado",
                                        }),
                                        (0, t.jsx)(d.SelectSeparator, {
                                          className: "bg-white/10 my-2",
                                        }),
                                        (0, t.jsxs)(d.SelectGroup, {
                                          children: [
                                            (0, t.jsxs)(d.SelectLabel, {
                                              className:
                                                "text-red-400 text-[10px] font-bold flex items-center gap-1.5 px-2 py-1.5",
                                              children: [
                                                (0, t.jsxs)("svg", {
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
                                                    (0, t.jsx)("rect", {
                                                      x: "3",
                                                      y: "11",
                                                      width: "18",
                                                      height: "11",
                                                      rx: "2",
                                                      ry: "2",
                                                    }),
                                                    (0, t.jsx)("path", {
                                                      d: "M7 11V7a5 5 0 0 1 10 0v4",
                                                    }),
                                                  ],
                                                }),
                                                "TRÁFEGO PAGO (ADS)",
                                              ],
                                            }),
                                            (0, t.jsx)(d.SelectItem, {
                                              value: "utmify_meta",
                                              children: "UTMify Meta Ads",
                                            }),
                                            (0, t.jsx)(d.SelectItem, {
                                              value: "utmify_tiktok",
                                              children: "UTMify TikTok Ads",
                                            }),
                                            (0, t.jsx)(d.SelectItem, {
                                              value: "utmify_google",
                                              children: "UTMify Google Ads",
                                            }),
                                          ],
                                        }),
                                        (0, t.jsx)(d.SelectSeparator, {
                                          className: "bg-white/10 my-2",
                                        }),
                                        (0, t.jsxs)(d.SelectGroup, {
                                          children: [
                                            (0, t.jsxs)(d.SelectLabel, {
                                              className:
                                                "text-green-400 text-[10px] font-bold flex items-center gap-1.5 px-2 py-1.5",
                                              children: [
                                                (0, t.jsxs)("svg", {
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
                                                    (0, t.jsx)("path", {
                                                      d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
                                                    }),
                                                    (0, t.jsx)("circle", {
                                                      cx: "9",
                                                      cy: "7",
                                                      r: "4",
                                                    }),
                                                    (0, t.jsx)("path", {
                                                      d: "M22 21v-2a4 4 0 0 0-3-3.87",
                                                    }),
                                                    (0, t.jsx)("path", {
                                                      d: "M16 3.13a4 4 0 0 1 0 7.75",
                                                    }),
                                                  ],
                                                }),
                                                "TRÁFEGO ORGÂNICO",
                                              ],
                                            }),
                                            (0, t.jsx)(d.SelectItem, {
                                              value: "organic_instagram_bio",
                                              children: "Instagram Bio",
                                            }),
                                            (0, t.jsx)(d.SelectItem, {
                                              value: "organic_tiktok_bio",
                                              children: "TikTok Bio",
                                            }),
                                            (0, t.jsx)(d.SelectItem, {
                                              value: "organic_twitter_bio",
                                              children: "Twitter Bio",
                                            }),
                                            (0, t.jsx)(d.SelectItem, {
                                              value: "organic_youtube_desc",
                                              children: "YouTube Descrição",
                                            }),
                                            (0, t.jsx)(d.SelectItem, {
                                              value: "organic_whatsapp",
                                              children: "WhatsApp Status",
                                            }),
                                            (0, t.jsx)(d.SelectItem, {
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
                        sx &&
                          (() => {
                            let e = eI.find((e) => e._id === sx);
                            if (!e) return null;
                            let s =
                                e.flows?.map((e) =>
                                  "object" == typeof e.flowId &&
                                  null !== e.flowId
                                    ? e.flowId._id
                                    : e.flowId,
                                ) || [],
                              a = eI.filter(
                                (e) =>
                                  "sales_code" === e.type &&
                                  e.flows?.some((e) => {
                                    let t =
                                      "object" == typeof e.flowId &&
                                      null !== e.flowId
                                        ? e.flowId._id
                                        : e.flowId;
                                    return s.includes(t);
                                  }),
                              );
                            return 0 === a.length
                              ? (0, t.jsx)("div", {
                                  className:
                                    "p-3 bg-white/[0.03] border border-white/10 rounded-lg",
                                  children: (0, t.jsxs)("p", {
                                    className: "text-[11px] text-white/40",
                                    children: [
                                      (0, t.jsx)(I.Tag, {
                                        size: 12,
                                        className: "inline mr-1",
                                      }),
                                      "Nenhum código de vendas vinculado a este link",
                                    ],
                                  }),
                                })
                              : (0, t.jsxs)("div", {
                                  className:
                                    "p-3 bg-[var(--brand-500)]/10 border border-[var(--brand-500)]/20 rounded-lg space-y-2",
                                  children: [
                                    (0, t.jsxs)("p", {
                                      className:
                                        "text-[11px] text-[var(--brand-400)] font-bold",
                                      children: [
                                        (0, t.jsx)(I.Tag, {
                                          size: 12,
                                          className: "inline mr-1",
                                        }),
                                        "Códigos de vendas vinculados a este link:",
                                      ],
                                    }),
                                    (0, t.jsx)("div", {
                                      className: "flex flex-wrap gap-2",
                                      children: a.map((e) =>
                                        (0, t.jsxs)(
                                          "button",
                                          {
                                            onClick: () => sz(e.slug),
                                            className:
                                              "inline-flex items-center gap-1 px-2 py-1 bg-[var(--brand-500)]/20 text-[var(--brand-400)] text-[10px] font-mono rounded border border-[var(--brand-500)]/30 hover:bg-[var(--brand-500)]/30 transition-all cursor-pointer",
                                            title: `Clique para usar: cv=${e.slug}`,
                                            children: [
                                              (0, t.jsxs)("code", {
                                                children: ["cv=", e.slug],
                                              }),
                                              (0, t.jsxs)("span", {
                                                className:
                                                  "text-[9px] text-[var(--brand-400)]/70",
                                                children: ["(", e.name, ")"],
                                              }),
                                            ],
                                          },
                                          e._id,
                                        ),
                                      ),
                                    }),
                                    (0, t.jsx)("p", {
                                      className:
                                        "text-[9px] text-[var(--brand-400)]/70 mt-1",
                                      children:
                                        "💡 Clique em um código para adicionar automaticamente no campo abaixo",
                                    }),
                                  ],
                                });
                          })(),
                        (0, t.jsx)("div", {
                          className: "border-t border-white/[0.04] pt-4",
                        }),
                        (0, t.jsxs)("div", {
                          className: "grid grid-cols-2 gap-3",
                          children: [
                            (0, t.jsxs)("div", {
                              children: [
                                (0, t.jsx)("label", {
                                  className:
                                    "text-[10px] font-bold text-white/50 uppercase tracking-wider",
                                  children: "UTM Source",
                                }),
                                (0, t.jsx)(l.Input, {
                                  value: sb,
                                  onChange: (e) => su(e.target.value),
                                  placeholder: "Ex: fonte",
                                  className:
                                    "mt-1.5 bg-white/[0.03] border-white/[0.08] text-sm h-9",
                                }),
                              ],
                            }),
                            (0, t.jsxs)("div", {
                              children: [
                                (0, t.jsx)("label", {
                                  className:
                                    "text-[10px] font-bold text-white/50 uppercase tracking-wider",
                                  children: "UTM Campaign",
                                }),
                                (0, t.jsx)(l.Input, {
                                  value: sg,
                                  onChange: (e) => sj(e.target.value),
                                  placeholder: "Ex: campanha",
                                  className:
                                    "mt-1.5 bg-white/[0.03] border-white/[0.08] text-sm h-9",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, t.jsxs)("div", {
                          className: "grid grid-cols-2 gap-3",
                          children: [
                            (0, t.jsxs)("div", {
                              children: [
                                (0, t.jsx)("label", {
                                  className:
                                    "text-[10px] font-bold text-white/50 uppercase tracking-wider",
                                  children: "UTM Medium",
                                }),
                                (0, t.jsx)(l.Input, {
                                  value: sf,
                                  onChange: (e) => sw(e.target.value),
                                  placeholder: "Ex: meio",
                                  className:
                                    "mt-1.5 bg-white/[0.03] border-white/[0.08] text-sm h-9",
                                }),
                              ],
                            }),
                            (0, t.jsxs)("div", {
                              children: [
                                (0, t.jsx)("label", {
                                  className:
                                    "text-[10px] font-bold text-white/50 uppercase tracking-wider",
                                  children: "UTM Content",
                                }),
                                (0, t.jsx)(l.Input, {
                                  value: sv,
                                  onChange: (e) => sN(e.target.value),
                                  placeholder: "Ex: conteudo",
                                  className:
                                    "mt-1.5 bg-white/[0.03] border-white/[0.08] text-sm h-9",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, t.jsxs)("div", {
                          className: "grid grid-cols-2 gap-3",
                          children: [
                            (0, t.jsxs)("div", {
                              children: [
                                (0, t.jsx)("label", {
                                  className:
                                    "text-[10px] font-bold text-white/50 uppercase tracking-wider",
                                  children: "UTM Term",
                                }),
                                (0, t.jsx)(l.Input, {
                                  value: sk,
                                  onChange: (e) => sy(e.target.value),
                                  placeholder: "Ex: termo",
                                  className:
                                    "mt-1.5 bg-white/[0.03] border-white/[0.08] text-sm h-9",
                                }),
                              ],
                            }),
                            (0, t.jsxs)("div", {
                              children: [
                                (0, t.jsx)("label", {
                                  className:
                                    "text-[10px] font-bold text-white/50 uppercase tracking-wider",
                                  children: "UTM ID",
                                }),
                                (0, t.jsx)(l.Input, {
                                  value: sC,
                                  onChange: (e) => sS(e.target.value),
                                  placeholder: "Ex: id",
                                  className:
                                    "mt-1.5 bg-white/[0.03] border-white/[0.08] text-sm h-9",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, t.jsxs)("div", {
                          className: "grid grid-cols-2 gap-3",
                          children: [
                            (0, t.jsxs)("div", {
                              children: [
                                (0, t.jsx)("label", {
                                  className:
                                    "text-[10px] font-bold text-white/50 uppercase tracking-wider",
                                  children: "Código de Venda (Opcional)",
                                }),
                                (0, t.jsx)(l.Input, {
                                  value: s_,
                                  onChange: (e) => sz(e.target.value),
                                  placeholder: "Ex: 123",
                                  className:
                                    "mt-1.5 bg-white/[0.03] border-white/[0.08] text-sm h-9",
                                }),
                              ],
                            }),
                            (0, t.jsxs)("div", {
                              children: [
                                (0, t.jsx)("label", {
                                  className:
                                    "text-[10px] font-bold text-white/50 uppercase tracking-wider",
                                  children: "Shark ID (Cloaker)",
                                }),
                                (0, t.jsx)(l.Input, {
                                  value: sT,
                                  onChange: (e) => sI(e.target.value),
                                  placeholder: "Ex: shk=sk_123",
                                  className:
                                    "mt-1.5 bg-white/[0.03] border-white/[0.08] text-sm h-9",
                                }),
                              ],
                            }),
                          ],
                        }),
                        sx &&
                          (() => {
                            let e = eI.find((e) => e._id === sx);
                            if (
                              !(
                                e?.cloakerV2?.enabled || e?.cloakerV3?.enabled
                              ) ||
                              !(e.shk || e.ph)
                            )
                              return null;
                            let s = e.shk ? "shk" : "ph",
                              a = e.shk || e.ph;
                            return (0, t.jsxs)("div", {
                              className:
                                "flex items-start gap-2 p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg",
                              children: [
                                (0, t.jsx)(f.Check, {
                                  size: 12,
                                  className:
                                    "text-emerald-400 mt-0.5 flex-shrink-0",
                                }),
                                (0, t.jsxs)("p", {
                                  className: "text-[10px] text-emerald-400",
                                  children: [
                                    "O parâmetro ",
                                    (0, t.jsxs)("strong", {
                                      children: [s, "=", a],
                                    }),
                                    " será adicionado automaticamente (Cloaker ativo).",
                                  ],
                                }),
                              ],
                            });
                          })(),
                        (0, t.jsxs)("button", {
                          onClick: () => {
                            sx
                              ? ((sP.current = !0),
                                sU(s0()),
                                setTimeout(() => {
                                  sE.current?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "center",
                                  });
                                }, 100))
                              : ef({
                                  type: "error",
                                  title: "Selecione um redirecionador",
                                });
                          },
                          className:
                            "relative w-full py-2.5 rounded-xl text-xs font-bold text-white transition-all cursor-pointer enter-btn",
                          children: [
                            (0, t.jsx)("span", {
                              className:
                                "absolute inset-0 rounded-xl border border-[rgba(28,28,28,0.2)]",
                            }),
                            (0, t.jsx)("span", {
                              className: "relative z-10",
                              children: "Gerar Link",
                            }),
                          ],
                        }),
                        sA &&
                          (() => {
                            let e = eI.find((e) => e._id === sx);
                            if (!e) return null;
                            let s = e.fullUrl;
                            if ("phantoms" === sq)
                              s = `https://phantoms.group/l/${e.slug}`;
                            else if ("default" !== sq) {
                              let t = eU.find((e) => e._id === sq);
                              t &&
                                "active" === t.status &&
                                (s = `https://${t.domain}/l/${e.slug}`);
                            }
                            let a = `${s}?${sA}`,
                              r = "utmify_meta" === sh || "FB" === sb,
                              i = "utmify_tiktok" === sh || "tiktok" === sb,
                              n = r || i ? sA : a,
                              d = "USAR ESTE LINK NO GERENCIADOR DE ANÚNCIOS";
                            return (
                              r
                                ? (d =
                                    "USAR ESTE NOS PARÂMETROS DA URL NO FACEBOOK")
                                : i &&
                                  (d =
                                    "USAR ESTE NOS PARÂMETROS DA URL NO TIKTOK"),
                              (0, t.jsxs)("div", {
                                ref: sE,
                                className: "space-y-3",
                                children: [
                                  (0, t.jsxs)("div", {
                                    className:
                                      "p-3 bg-[var(--brand-500)]/10 border border-[var(--brand-500)]/20 rounded-xl",
                                    children: [
                                      (0, t.jsxs)("div", {
                                        className:
                                          "flex items-center gap-2 mb-2",
                                        children: [
                                          (0, t.jsx)(L.Globe, {
                                            size: 12,
                                            className:
                                              "text-[var(--brand-400)]",
                                          }),
                                          (0, t.jsx)("label", {
                                            className:
                                              "text-[10px] font-bold text-[var(--brand-400)] uppercase tracking-wider",
                                            children:
                                              "Usar este na URL do site no gerenciador de anúncios",
                                          }),
                                        ],
                                      }),
                                      (0, t.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                          (0, t.jsx)(l.Input, {
                                            value: s,
                                            readOnly: !0,
                                            className:
                                              "bg-white/[0.03] border-[var(--brand-500)]/30 text-white text-[10px] font-mono h-8",
                                          }),
                                          (0, t.jsxs)("button", {
                                            onClick: () => sY(s),
                                            className:
                                              "relative p-2 rounded-lg text-white transition-all cursor-pointer enter-btn",
                                            children: [
                                              (0, t.jsx)("span", {
                                                className:
                                                  "absolute inset-0 rounded-lg border border-[rgba(28,28,28,0.2)]",
                                              }),
                                              (0, t.jsx)("span", {
                                                className: "relative z-10",
                                                children: (0, t.jsx)(x.Copy, {
                                                  size: 14,
                                                }),
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, t.jsxs)("div", {
                                    className:
                                      "p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl",
                                    children: [
                                      (0, t.jsxs)("div", {
                                        className:
                                          "flex items-center gap-2 mb-2",
                                        children: [
                                          (0, t.jsx)(f.Check, {
                                            size: 12,
                                            className: "text-emerald-400",
                                          }),
                                          (0, t.jsx)("label", {
                                            className:
                                              "text-[10px] font-bold text-emerald-400 uppercase tracking-wider",
                                            children: d,
                                          }),
                                        ],
                                      }),
                                      (0, t.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                          (0, t.jsx)(l.Input, {
                                            value: n,
                                            readOnly: !0,
                                            className:
                                              "bg-white/[0.03] border-emerald-500/30 text-white text-[10px] font-mono h-8",
                                          }),
                                          (0, t.jsx)("button", {
                                            onClick: () => sY(n),
                                            className:
                                              "p-2 bg-emerald-500 rounded-lg text-white hover:bg-emerald-600 transition-all cursor-pointer",
                                            children: (0, t.jsx)(x.Copy, {
                                              size: 14,
                                            }),
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, t.jsxs)("div", {
                                    className:
                                      "p-3 bg-white/[0.03] rounded-xl border border-white/[0.04]",
                                    children: [
                                      (0, t.jsxs)("div", {
                                        className:
                                          "flex items-center gap-2 mb-2",
                                        children: [
                                          (0, t.jsx)(y.AlertTriangle, {
                                            size: 12,
                                            className: "text-amber-400",
                                          }),
                                          (0, t.jsx)("label", {
                                            className:
                                              "text-[10px] font-bold text-amber-400 uppercase tracking-wider",
                                            children:
                                              "Link Completo - Apenas para Debug",
                                          }),
                                        ],
                                      }),
                                      (0, t.jsx)("p", {
                                        className:
                                          "text-[9px] text-white/40 mb-2",
                                        children:
                                          "Não usar no gerenciador de anúncios! Use os links acima.",
                                      }),
                                      (0, t.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                          (0, t.jsx)(l.Input, {
                                            value: a,
                                            readOnly: !0,
                                            className:
                                              "bg-white/[0.04] border-white/[0.08] text-white/50 text-[10px] font-mono h-8",
                                          }),
                                          (0, t.jsx)("button", {
                                            onClick: () => sY(a),
                                            className:
                                              "p-2 bg-white/[0.06] rounded-lg text-white/50 hover:bg-white/[0.08] transition-all cursor-pointer",
                                            children: (0, t.jsx)(x.Copy, {
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
              "dominio-proprio" === ev &&
                (0, t.jsx)("div", {
                  children: (0, t.jsxs)("div", {
                    className:
                      "bg-white/[0.02] border border-white/[0.06] rounded-xl",
                    children: [
                      (0, t.jsx)("div", {
                        className: "px-5 py-4 border-b border-white/[0.04]",
                        children: (0, t.jsxs)("div", {
                          className: "flex items-center gap-3",
                          children: [
                            (0, t.jsx)("div", {
                              className:
                                "w-9 h-9 rounded-lg bg-emerald-500/[0.08] border border-emerald-500/20 flex items-center justify-center",
                              children: (0, t.jsx)(L.Globe, {
                                size: 16,
                                className: "text-emerald-400",
                              }),
                            }),
                            (0, t.jsxs)("div", {
                              children: [
                                (0, t.jsx)("h2", {
                                  className: "text-sm font-bold text-white",
                                  children: "Adicionar Domínio Próprio",
                                }),
                                (0, t.jsx)("p", {
                                  className: "text-[11px] text-white/35",
                                  children:
                                    "Use seu próprio domínio para links de redirecionamento",
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                      (0, t.jsxs)("div", {
                        className: "p-5 space-y-4",
                        children: [
                          !eP &&
                            (0, t.jsxs)("div", {
                              className:
                                "p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-2",
                              children: [
                                (0, t.jsx)(R.AlertCircle, {
                                  size: 16,
                                  className:
                                    "text-amber-400 mt-0.5 flex-shrink-0",
                                }),
                                (0, t.jsx)("p", {
                                  className: "text-xs text-amber-400",
                                  children:
                                    "O serviço de domínios customizados não está configurado. Entre em contato com o suporte.",
                                }),
                              ],
                            }),
                          (0, t.jsxs)("div", {
                            className: "flex items-center gap-3",
                            children: [
                              (0, t.jsx)(l.Input, {
                                value: sV,
                                onChange: (e) => sL(e.target.value),
                                placeholder:
                                  "Ex: seusite.com ou links.seusite.com",
                                className:
                                  "bg-white/[0.03] border-white/10 text-white text-sm h-10 flex-1",
                                disabled: !eP,
                              }),
                              (0, t.jsxs)("button", {
                                onClick: sX,
                                disabled: sD || !eP,
                                className:
                                  "relative px-4 py-2.5 rounded-lg text-sm font-bold text-white transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 enter-btn",
                                children: [
                                  (0, t.jsx)("span", {
                                    className:
                                      "absolute inset-0 rounded-lg border border-[rgba(28,28,28,0.2)]",
                                  }),
                                  (0, t.jsxs)("span", {
                                    className:
                                      "relative z-10 flex items-center gap-2",
                                    children: [
                                      sD
                                        ? (0, t.jsx)(u.Loader2, {
                                            size: 16,
                                            className: "animate-spin",
                                          })
                                        : (0, t.jsx)(N.Plus, {
                                            size: 16,
                                          }),
                                      "Adicionar",
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, t.jsxs)("div", {
                            className:
                              "p-3 bg-white/[0.03] rounded-lg border border-white/[0.04] space-y-2",
                            children: [
                              (0, t.jsxs)("p", {
                                className: "text-xs text-white/50",
                                children: [
                                  (0, t.jsx)("strong", {
                                    className: "text-white",
                                    children: "Como funciona:",
                                  }),
                                  " Após adicionar o domínio, configure um registro CNAME no DNS apontando para ",
                                  (0, t.jsx)("code", {
                                    className:
                                      "bg-white/[0.06] px-1.5 py-0.5 rounded text-[var(--brand-400)]",
                                    children: eE,
                                  }),
                                ],
                              }),
                              (0, t.jsxs)("p", {
                                className: "text-xs text-white/40",
                                children: [
                                  (0, t.jsx)("strong", {
                                    className: "text-white/50",
                                    children:
                                      "Domínios raiz (ex: seusite.com):",
                                  }),
                                  'Use CNAME com nome "@" se seu DNS suportar CNAME Flattening (Cloudflare, Route53) ou ALIAS/ANAME',
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, t.jsx)("div", {
                        className: "border-t border-white/[0.06]",
                        children: (0, t.jsx)("div", {
                          className: "px-5 py-3 border-b border-white/[0.04]",
                          children: (0, t.jsxs)("h2", {
                            className: "text-xs font-bold text-white/60",
                            children: ["Domínios (", eU.length, ")"],
                          }),
                        }),
                      }),
                      (0, t.jsx)("div", {
                        className: "divide-y divide-white/5",
                        children: ey
                          ? (0, t.jsxs)("div", {
                              className: "p-8 text-center",
                              children: [
                                (0, t.jsx)(u.Loader2, {
                                  size: 24,
                                  className:
                                    "animate-spin text-[var(--brand-400)] mx-auto mb-2",
                                }),
                                (0, t.jsx)("p", {
                                  className: "text-xs text-white/40",
                                  children: "Carregando domínios...",
                                }),
                              ],
                            })
                          : 0 === eU.length
                            ? (0, t.jsxs)("div", {
                                className: "p-8 text-center",
                                children: [
                                  (0, t.jsx)(L.Globe, {
                                    size: 32,
                                    className: "text-white/30 mx-auto mb-2",
                                  }),
                                  (0, t.jsx)("p", {
                                    className: "text-sm text-white/40",
                                    children: "Nenhum domínio cadastrado",
                                  }),
                                  (0, t.jsx)("p", {
                                    className: "text-xs text-white/30",
                                    children:
                                      "Adicione seu primeiro domínio acima",
                                  }),
                                ],
                              })
                            : eU.map((e) => {
                                let s, a, r;
                                return (0, t.jsxs)(
                                  "div",
                                  {
                                    className:
                                      "p-4 hover:bg-white/[0.02] transition-colors",
                                    children: [
                                      (0, t.jsxs)("div", {
                                        className:
                                          "flex items-center justify-between",
                                        children: [
                                          (0, t.jsxs)("div", {
                                            className:
                                              "flex items-center gap-3",
                                            children: [
                                              (0, t.jsx)("div", {
                                                className: (0, W.cn)(
                                                  "w-8 h-8 rounded-lg flex items-center justify-center border",
                                                  "active" === e.status
                                                    ? "bg-emerald-500/10 border-emerald-500/20"
                                                    : "pending" === e.status
                                                      ? "bg-amber-500/10 border-amber-500/20"
                                                      : "bg-red-500/10 border-red-500/20",
                                                ),
                                                children:
                                                  "active" === e.status
                                                    ? (0, t.jsx)(
                                                        D.CheckCircle,
                                                        {
                                                          size: 16,
                                                          className:
                                                            "text-emerald-400",
                                                        },
                                                      )
                                                    : "pending" === e.status
                                                      ? (0, t.jsx)(M.Clock, {
                                                          size: 16,
                                                          className:
                                                            "text-amber-400",
                                                        })
                                                      : (0, t.jsx)(
                                                          R.AlertCircle,
                                                          {
                                                            size: 16,
                                                            className:
                                                              "text-red-400",
                                                          },
                                                        ),
                                              }),
                                              (0, t.jsxs)("div", {
                                                children: [
                                                  (0, t.jsx)("p", {
                                                    className:
                                                      "text-sm font-medium text-white",
                                                    children: e.domain,
                                                  }),
                                                  (0, t.jsxs)("div", {
                                                    className:
                                                      "flex items-center gap-2 mt-0.5",
                                                    children: [
                                                      (0, t.jsx)("span", {
                                                        className: (0, W.cn)(
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
                                                        (0, t.jsx)("span", {
                                                          className:
                                                            "text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded text-[var(--brand-400)] bg-[var(--brand-500)]/10",
                                                          children: "Global",
                                                        }),
                                                      "pending" === e.status &&
                                                        (0, t.jsxs)("span", {
                                                          className:
                                                            "text-[10px] text-white/40",
                                                          children: [
                                                            "CNAME → ",
                                                            eE,
                                                          ],
                                                        }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                          (0, t.jsxs)("div", {
                                            className:
                                              "flex items-center gap-2",
                                            children: [
                                              "active" !== e.status &&
                                                !e.isGlobal &&
                                                (0, t.jsxs)("button", {
                                                  onClick: () => sJ(e._id),
                                                  disabled: sR === e._id,
                                                  className:
                                                    "px-3 py-1.5 bg-white/[0.06] rounded-lg text-xs font-medium text-white hover:bg-white/[0.08] transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5",
                                                  children: [
                                                    sR === e._id
                                                      ? (0, t.jsx)(u.Loader2, {
                                                          size: 12,
                                                          className:
                                                            "animate-spin",
                                                        })
                                                      : (0, t.jsx)(
                                                          v.RefreshCw,
                                                          {
                                                            size: 12,
                                                          },
                                                        ),
                                                    "Verificar",
                                                  ],
                                                }),
                                              !e.isGlobal &&
                                                (0, t.jsx)("button", {
                                                  onClick: () => {
                                                    var t;
                                                    let s;
                                                    return (
                                                      (t = e._id),
                                                      (s = eU.find(
                                                        (e) => e._id === t,
                                                      )),
                                                      void ew({
                                                        title:
                                                          "Remover domínio",
                                                        description: `Tem certeza que deseja remover o dom\xednio "${s?.domain || ""}"? Esta a\xe7\xe3o n\xe3o pode ser desfeita.`,
                                                        confirmLabel: "Remover",
                                                        cancelLabel: "Cancelar",
                                                        onConfirm: async () => {
                                                          sO(t);
                                                          try {
                                                            let e = await fetch(
                                                              `/api/custom-domains/${t}`,
                                                              {
                                                                method:
                                                                  "DELETE",
                                                                credentials:
                                                                  "include",
                                                              },
                                                            );
                                                            if (!e.ok) {
                                                              let t =
                                                                await e.json();
                                                              throw Error(
                                                                t.error ||
                                                                  "Erro ao remover domínio",
                                                              );
                                                            }
                                                            (ez(),
                                                              (0,
                                                              i.invalidateGroup)(
                                                                "domains",
                                                              ),
                                                              ef({
                                                                type: "success",
                                                                title:
                                                                  "Domínio removido",
                                                              }));
                                                          } catch (e) {
                                                            ef({
                                                              type: "error",
                                                              title:
                                                                e instanceof
                                                                Error
                                                                  ? e.message
                                                                  : "Erro ao remover",
                                                            });
                                                          } finally {
                                                            sO(null);
                                                          }
                                                        },
                                                      })
                                                    );
                                                  },
                                                  disabled: s$ === e._id,
                                                  className:
                                                    "p-1.5 bg-white/[0.06] rounded-lg text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer disabled:opacity-50",
                                                  children:
                                                    s$ === e._id
                                                      ? (0, t.jsx)(u.Loader2, {
                                                          size: 14,
                                                          className:
                                                            "animate-spin",
                                                        })
                                                      : (0, t.jsx)(p.Trash2, {
                                                          size: 14,
                                                        }),
                                                }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      "active" !== e.status &&
                                        !e.isGlobal &&
                                        ((a = (s =
                                          1 ===
                                          (e.domain.match(/\./g) || []).length)
                                          ? "@"
                                          : e.domain.split(".")[0]),
                                        (r = (e, t) => {
                                          (navigator.clipboard.writeText(e),
                                            ef({
                                              type: "success",
                                              title: `${t} copiado!`,
                                            }));
                                        }),
                                        (0, t.jsxs)("div", {
                                          className: "mt-3 space-y-2",
                                          children: [
                                            (0, t.jsxs)("div", {
                                              className:
                                                "p-3 bg-white/[0.03] rounded-lg border border-white/[0.04]",
                                              children: [
                                                (0, t.jsx)("p", {
                                                  className:
                                                    "text-xs text-white/50 mb-2",
                                                  children: (0, t.jsx)(
                                                    "strong",
                                                    {
                                                      className: "text-white",
                                                      children:
                                                        "1. Configure o CNAME no DNS do seu domínio:",
                                                    },
                                                  ),
                                                }),
                                                (0, t.jsxs)("div", {
                                                  className:
                                                    "grid grid-cols-3 gap-2 text-[10px] font-mono",
                                                  children: [
                                                    (0, t.jsxs)("div", {
                                                      children: [
                                                        (0, t.jsx)("span", {
                                                          className:
                                                            "text-white/40 block mb-1",
                                                          children: "Tipo",
                                                        }),
                                                        (0, t.jsx)("span", {
                                                          className:
                                                            "text-white bg-white/[0.06] px-2 py-1 rounded block",
                                                          children: "CNAME",
                                                        }),
                                                      ],
                                                    }),
                                                    (0, t.jsxs)("div", {
                                                      children: [
                                                        (0, t.jsx)("span", {
                                                          className:
                                                            "text-white/40 block mb-1",
                                                          children: "Nome",
                                                        }),
                                                        (0, t.jsx)("span", {
                                                          className:
                                                            "text-white bg-white/[0.06] px-2 py-1 rounded block truncate",
                                                          children: a,
                                                        }),
                                                      ],
                                                    }),
                                                    (0, t.jsxs)("div", {
                                                      children: [
                                                        (0, t.jsx)("span", {
                                                          className:
                                                            "text-white/40 block mb-1",
                                                          children: "Destino",
                                                        }),
                                                        (0, t.jsxs)("button", {
                                                          onClick: () =>
                                                            r(
                                                              eE,
                                                              "Destino CNAME",
                                                            ),
                                                          className:
                                                            "text-[var(--brand-400)] bg-white/[0.06] px-2 py-1 rounded flex items-center gap-1 hover:bg-white/[0.08] transition-colors cursor-pointer w-full",
                                                          children: [
                                                            (0, t.jsx)("span", {
                                                              className:
                                                                "truncate",
                                                              children: eE,
                                                            }),
                                                            (0, t.jsx)(x.Copy, {
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
                                                s &&
                                                  (0, t.jsx)("p", {
                                                    className:
                                                      "text-[10px] text-amber-400/80 mt-2",
                                                    children:
                                                      "Domínio raiz: Use CNAME Flattening (Cloudflare) ou ALIAS/ANAME se seu provedor suportar",
                                                  }),
                                              ],
                                            }),
                                            e.ownershipVerification &&
                                              (0, t.jsxs)("div", {
                                                className:
                                                  "p-3 bg-amber-500/5 rounded-lg border border-amber-500/15",
                                                children: [
                                                  (0, t.jsxs)("p", {
                                                    className:
                                                      "text-xs text-white/50 mb-2",
                                                    children: [
                                                      (0, t.jsx)("strong", {
                                                        className:
                                                          "text-amber-400",
                                                        children:
                                                          "2. Registro TXT de verificação de propriedade",
                                                      }),
                                                      (0, t.jsx)("span", {
                                                        className:
                                                          "text-white/40 ml-1",
                                                        children:
                                                          "(obrigatório se o domínio usa Cloudflare)",
                                                      }),
                                                    ],
                                                  }),
                                                  (0, t.jsxs)("div", {
                                                    className:
                                                      "grid grid-cols-3 gap-2 text-[10px] font-mono",
                                                    children: [
                                                      (0, t.jsxs)("div", {
                                                        children: [
                                                          (0, t.jsx)("span", {
                                                            className:
                                                              "text-white/40 block mb-1",
                                                            children: "Tipo",
                                                          }),
                                                          (0, t.jsx)("span", {
                                                            className:
                                                              "text-white bg-white/[0.06] px-2 py-1 rounded block",
                                                            children: "TXT",
                                                          }),
                                                        ],
                                                      }),
                                                      (0, t.jsxs)("div", {
                                                        children: [
                                                          (0, t.jsx)("span", {
                                                            className:
                                                              "text-white/40 block mb-1",
                                                            children: "Nome",
                                                          }),
                                                          (0, t.jsxs)(
                                                            "button",
                                                            {
                                                              onClick: () =>
                                                                r(
                                                                  e
                                                                    .ownershipVerification
                                                                    .name,
                                                                  "Nome TXT",
                                                                ),
                                                              className:
                                                                "text-white bg-white/[0.06] px-2 py-1 rounded flex items-center gap-1 hover:bg-white/[0.08] transition-colors cursor-pointer w-full",
                                                              children: [
                                                                (0, t.jsx)(
                                                                  "span",
                                                                  {
                                                                    className:
                                                                      "truncate",
                                                                    children:
                                                                      e
                                                                        .ownershipVerification
                                                                        .name,
                                                                  },
                                                                ),
                                                                (0, t.jsx)(
                                                                  x.Copy,
                                                                  {
                                                                    size: 10,
                                                                    className:
                                                                      "shrink-0 opacity-60",
                                                                  },
                                                                ),
                                                              ],
                                                            },
                                                          ),
                                                        ],
                                                      }),
                                                      (0, t.jsxs)("div", {
                                                        children: [
                                                          (0, t.jsx)("span", {
                                                            className:
                                                              "text-white/40 block mb-1",
                                                            children: "Valor",
                                                          }),
                                                          (0, t.jsxs)(
                                                            "button",
                                                            {
                                                              onClick: () =>
                                                                r(
                                                                  e
                                                                    .ownershipVerification
                                                                    .value,
                                                                  "Valor TXT",
                                                                ),
                                                              className:
                                                                "text-amber-400 bg-white/[0.06] px-2 py-1 rounded flex items-center gap-1 hover:bg-white/[0.08] transition-colors cursor-pointer w-full",
                                                              children: [
                                                                (0, t.jsx)(
                                                                  "span",
                                                                  {
                                                                    className:
                                                                      "truncate",
                                                                    children:
                                                                      e
                                                                        .ownershipVerification
                                                                        .value,
                                                                  },
                                                                ),
                                                                (0, t.jsx)(
                                                                  x.Copy,
                                                                  {
                                                                    size: 10,
                                                                    className:
                                                                      "shrink-0 opacity-60",
                                                                  },
                                                                ),
                                                              ],
                                                            },
                                                          ),
                                                        ],
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                          ],
                                        })),
                                      "active" === e.status &&
                                        (0, t.jsx)("div", {
                                          className:
                                            "mt-3 p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/10",
                                          children: (0, t.jsxs)("p", {
                                            className:
                                              "text-xs text-emerald-400 flex items-center gap-2",
                                            children: [
                                              (0, t.jsx)("span", {
                                                children: "Domínio ativo! Use",
                                              }),
                                              (0, t.jsxs)("button", {
                                                onClick: () => {
                                                  (navigator.clipboard.writeText(
                                                    `https://${e.domain}`,
                                                  ),
                                                    ef({
                                                      type: "success",
                                                      title: "URL copiada!",
                                                    }));
                                                },
                                                className:
                                                  "bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center gap-1 hover:bg-emerald-500/20 transition-colors cursor-pointer",
                                                children: [
                                                  (0, t.jsxs)("code", {
                                                    children: [
                                                      "https://",
                                                      e.domain,
                                                      "/seu-slug",
                                                    ],
                                                  }),
                                                  (0, t.jsx)(x.Copy, {
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
                                        (0, t.jsxs)("div", {
                                          className:
                                            "mt-3 p-3 bg-red-500/5 rounded-lg border border-red-500/10",
                                          children: [
                                            (0, t.jsx)("p", {
                                              className:
                                                "text-xs text-red-400 font-medium mb-1",
                                              children: "Erros de validação:",
                                            }),
                                            (0, t.jsx)("ul", {
                                              className:
                                                "text-xs text-red-400/80 list-disc list-inside",
                                              children: e.validationErrors.map(
                                                (e, s) =>
                                                  (0, t.jsx)(
                                                    "li",
                                                    {
                                                      children: e,
                                                    },
                                                    s,
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
                }),
              "redirect-page" === ev &&
                (0, t.jsx)(es, {
                  links: eI.filter((e) => "link" === e.type),
                  addToast: ef,
                }),
              "scripts" === ev &&
                ((e = eI.filter((e) => "link" === e.type)),
                (0, t.jsxs)("div", {
                  className: "space-y-4",
                  children: [
                    (0, t.jsxs)("div", {
                      className: "flex items-center gap-3 mb-2",
                      children: [
                        (0, t.jsx)(F.Code, {
                          size: 20,
                          className: "text-[var(--brand-400)]",
                        }),
                        (0, t.jsxs)("div", {
                          children: [
                            (0, t.jsx)("h2", {
                              className: "text-lg font-bold text-white",
                              children: "Scripts de Tracking",
                            }),
                            (0, t.jsx)("p", {
                              className: "text-xs text-white/40",
                              children:
                                "Injete scripts pré-aprovados na página de redirect de cada link",
                            }),
                          ],
                        }),
                      ],
                    }),
                    0 === e.length
                      ? (0, t.jsx)("div", {
                          className: "text-center py-12 text-white/30",
                          children: (0, t.jsx)("p", {
                            className: "text-sm",
                            children: "Nenhum link criado ainda",
                          }),
                        })
                      : (0, t.jsx)("div", {
                          className: "space-y-3",
                          children: e.map((e) => {
                            let s = e.trackingScripts || [],
                              a = s.find((e) => "xtracky_v2" === e.id),
                              r = s.find((e) => "xtracky_utm" === e.id),
                              i = async (t) => {
                                try {
                                  let s = await fetch(`/api/links/${e._id}`, {
                                    method: "PUT",
                                    credentials: "include",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      trackingScripts: t,
                                    }),
                                  });
                                  (await s.json()).success &&
                                    ((e.trackingScripts = t),
                                    ef({
                                      type: "success",
                                      title: "Scripts atualizados!",
                                    }));
                                } catch {
                                  ef({
                                    type: "error",
                                    title: "Erro ao salvar",
                                  });
                                }
                              },
                              n = (e, t) => {
                                let a = [...s],
                                  r = a.findIndex((t) => t.id === e);
                                (r >= 0
                                  ? (a[r] = {
                                      ...a[r],
                                      enabled: t,
                                    })
                                  : a.push({
                                      id: e,
                                      enabled: t,
                                      token: "",
                                    }),
                                  i(a));
                              },
                              d = (e, t) => {
                                let a = [...s],
                                  r = a.findIndex((t) => t.id === e);
                                (r >= 0
                                  ? (a[r] = {
                                      ...a[r],
                                      token: t,
                                    })
                                  : a.push({
                                      id: e,
                                      enabled: !0,
                                      token: t,
                                    }),
                                  i(a));
                              };
                            return (0, t.jsxs)(
                              "div",
                              {
                                className:
                                  "p-4 rounded-xl bg-[#111111] border border-white/[0.06]",
                                children: [
                                  (0, t.jsxs)("div", {
                                    className:
                                      "flex items-center justify-between mb-3",
                                    children: [
                                      (0, t.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                          (0, t.jsx)(m.ExternalLink, {
                                            size: 14,
                                            className:
                                              "text-[var(--brand-400)]",
                                          }),
                                          (0, t.jsx)("span", {
                                            className:
                                              "text-sm font-medium text-white",
                                            children: e.fullUrl || e.slug,
                                          }),
                                        ],
                                      }),
                                      (0, t.jsxs)("span", {
                                        className: "text-[10px] text-white/20",
                                        children: ["shk=", e.shk || e.ph],
                                      }),
                                    ],
                                  }),
                                  (0, t.jsxs)("div", {
                                    className: "space-y-3",
                                    children: [
                                      (0, t.jsxs)("div", {
                                        className:
                                          "p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]",
                                        children: [
                                          (0, t.jsxs)("div", {
                                            className:
                                              "flex items-center justify-between mb-2",
                                            children: [
                                              (0, t.jsxs)("div", {
                                                className:
                                                  "flex items-center gap-2",
                                                children: [
                                                  (0, t.jsx)("span", {
                                                    className:
                                                      "text-xs font-medium text-white",
                                                    children: "Xtracky v2",
                                                  }),
                                                  (0, t.jsx)("span", {
                                                    className:
                                                      "text-[9px] text-white/20",
                                                    children: "experimental.js",
                                                  }),
                                                ],
                                              }),
                                              (0, t.jsx)(H.Switch, {
                                                checked: a?.enabled || !1,
                                                onCheckedChange: (e) =>
                                                  n("xtracky_v2", e),
                                              }),
                                            ],
                                          }),
                                          a?.enabled &&
                                            (0, t.jsx)(l.Input, {
                                              value: a?.token || "",
                                              onChange: (e) =>
                                                d("xtracky_v2", e.target.value),
                                              onBlur: () => i(s),
                                              placeholder:
                                                "Token do Xtracky v2",
                                              className:
                                                "bg-shark-950 border-white/[0.06] text-white text-xs",
                                            }),
                                        ],
                                      }),
                                      (0, t.jsxs)("div", {
                                        className:
                                          "p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]",
                                        children: [
                                          (0, t.jsxs)("div", {
                                            className:
                                              "flex items-center justify-between mb-2",
                                            children: [
                                              (0, t.jsxs)("div", {
                                                className:
                                                  "flex items-center gap-2",
                                                children: [
                                                  (0, t.jsx)("span", {
                                                    className:
                                                      "text-xs font-medium text-white",
                                                    children:
                                                      "Xtracky UTM Handler",
                                                  }),
                                                  (0, t.jsx)("span", {
                                                    className:
                                                      "text-[9px] text-white/20",
                                                    children: "utm-handler.js",
                                                  }),
                                                ],
                                              }),
                                              (0, t.jsx)(H.Switch, {
                                                checked: r?.enabled || !1,
                                                onCheckedChange: (e) =>
                                                  n("xtracky_utm", e),
                                              }),
                                            ],
                                          }),
                                          r?.enabled &&
                                            (0, t.jsx)(l.Input, {
                                              value: r?.token || "",
                                              onChange: (e) =>
                                                d(
                                                  "xtracky_utm",
                                                  e.target.value,
                                                ),
                                              onBlur: () => i(s),
                                              placeholder:
                                                "Token do Xtracky UTM",
                                              className:
                                                "bg-shark-950 border-white/[0.06] text-white text-xs",
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
                  ],
                })),
              (0, t.jsx)(o.Dialog, {
                open: th,
                onOpenChange: tp,
                children: (0, t.jsxs)(o.DialogContent, {
                  className: "max-w-md",
                  children: [
                    (0, t.jsxs)(o.DialogHeader, {
                      children: [
                        (0, t.jsxs)("div", {
                          className: "flex items-center gap-3 mb-2",
                          children: [
                            (0, t.jsx)("div", {
                              className:
                                "p-2 rounded-lg bg-red-500/10 border border-red-500/20",
                              children: (0, t.jsx)(y.AlertTriangle, {
                                size: 20,
                                className: "text-red-400",
                              }),
                            }),
                            (0, t.jsx)(o.DialogTitle, {
                              className: "text-white",
                              children: "Excluir Redirecionador",
                            }),
                          ],
                        }),
                        (0, t.jsxs)(o.DialogDescription, {
                          className: "text-white/50",
                          children: [
                            "Tem certeza que deseja excluir ",
                            (0, t.jsxs)("strong", {
                              className: "text-white",
                              children: ['"', tb?.name, '"'],
                            }),
                            "?",
                          ],
                        }),
                      ],
                    }),
                    (0, t.jsxs)(o.DialogFooter, {
                      className: "gap-2 sm:gap-0",
                      children: [
                        (0, t.jsx)("button", {
                          onClick: () => tp(!1),
                          disabled: tg,
                          className:
                            "px-4 py-2.5 bg-transparent border border-white/[0.08] rounded-xl text-sm font-bold text-white/60 hover:text-white hover:border-white/30 transition-all disabled:opacity-50 cursor-pointer",
                          children: "Cancelar",
                        }),
                        (0, t.jsxs)("button", {
                          onClick: sZ,
                          disabled: tg,
                          className:
                            "px-4 py-2.5 bg-red-500 rounded-xl text-sm font-bold text-white hover:bg-red-600 transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer",
                          children: [
                            tg
                              ? (0, t.jsx)(u.Loader2, {
                                  size: 14,
                                  className: "animate-spin",
                                })
                              : (0, t.jsx)(p.Trash2, {
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
              (0, t.jsx)(o.Dialog, {
                open: t5,
                onOpenChange: t4,
                children: (0, t.jsxs)(o.DialogContent, {
                  className: "max-w-3xl bg-[#0a0a0a]/95 border-white/10",
                  children: [
                    (0, t.jsx)(o.DialogHeader, {
                      children: (0, t.jsxs)("div", {
                        className: "flex items-center gap-3",
                        children: [
                          (0, t.jsx)("div", {
                            className:
                              "p-2 rounded-lg bg-[var(--brand-500)]/10 border border-[var(--brand-500)]/20",
                            children: (0, t.jsx)(z.BarChart3, {
                              size: 20,
                              className: "text-[var(--brand-400)]",
                            }),
                          }),
                          (0, t.jsx)(o.DialogTitle, {
                            className: "text-white text-base",
                            children: "Relatório de Performance",
                          }),
                        ],
                      }),
                    }),
                    t3 &&
                      ((s = t3.cloakerV3?.enabled
                        ? t3.cloakerV3
                        : t3.cloakerV2),
                      (g = s?.stats?.totalBlocked || 0),
                      (et =
                        (Z = g + (K = s?.stats?.totalAllowed || 0)) > 0
                          ? ((K / Z) * 100).toFixed(1)
                          : "0.0"),
                      (ea = Z > 0 ? ((g / Z) * 100).toFixed(1) : "0.0"),
                      (er = s?.recentBlocks || []),
                      (ei = s?.stats?.antiSharingBlocked || 0),
                      (el = s?.stats?.antiCloneBlocked || 0),
                      (ed = (en = ei > 0 || el > 0)
                        ? ei
                        : er.filter((e) =>
                            e.reason?.includes("Anti-Compartilhamento"),
                          ).length),
                      (eo = en
                        ? el
                        : er.filter((e) => e.reason?.includes("Anti-clone"))
                            .length),
                      (ec = en ? g - ei - el : g - ed - eo),
                      (ex = Z > 0 ? (K / Z) * 360 : 0),
                      (em = Z > 0 ? (g / Z) * 360 : 0),
                      (ep = (ex / 360) * (eh = 2 * Math.PI * 60)),
                      (0, t.jsxs)("div", {
                        className: "space-y-4",
                        children: [
                          (0, t.jsxs)("div", {
                            className: "grid grid-cols-4 gap-3",
                            children: [
                              (0, t.jsxs)("div", {
                                className:
                                  "p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center",
                                children: [
                                  (0, t.jsx)("p", {
                                    className:
                                      "text-[10px] text-white/40 font-bold uppercase tracking-wider mb-2",
                                    children: "Aprovação",
                                  }),
                                  (0, t.jsxs)("p", {
                                    className:
                                      "text-2xl font-bold text-[#22c55e]",
                                    children: [et, "%"],
                                  }),
                                ],
                              }),
                              (0, t.jsxs)("div", {
                                className:
                                  "p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center",
                                children: [
                                  (0, t.jsx)("p", {
                                    className:
                                      "text-[10px] text-white/40 font-bold uppercase tracking-wider mb-2",
                                    children: "Bloqueios",
                                  }),
                                  (0, t.jsxs)("p", {
                                    className:
                                      "text-2xl font-bold text-red-400",
                                    children: [ea, "%"],
                                  }),
                                ],
                              }),
                              (0, t.jsxs)("div", {
                                className:
                                  "p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl flex flex-col items-center justify-center",
                                children: [
                                  (0, t.jsx)("p", {
                                    className:
                                      "text-[10px] text-white/40 font-bold uppercase tracking-wider mb-2",
                                    children: "Distribuição",
                                  }),
                                  (0, t.jsxs)("div", {
                                    className: "relative w-20 h-20",
                                    children: [
                                      (0, t.jsxs)("svg", {
                                        viewBox: "0 0 140 140",
                                        className: "w-full h-full -rotate-90",
                                        children: [
                                          (0, t.jsx)("circle", {
                                            cx: "70",
                                            cy: "70",
                                            r: 60,
                                            fill: "none",
                                            stroke: "rgba(255,255,255,0.05)",
                                            strokeWidth: "14",
                                          }),
                                          Z > 0 &&
                                            (0, t.jsx)("circle", {
                                              cx: "70",
                                              cy: "70",
                                              r: 60,
                                              fill: "none",
                                              stroke: "var(--brand-500)",
                                              strokeWidth: "14",
                                              strokeDasharray: `${ep} ${eh}`,
                                              strokeDashoffset: "0",
                                              strokeLinecap: "round",
                                            }),
                                          Z > 0 &&
                                            (0, t.jsx)("circle", {
                                              cx: "70",
                                              cy: "70",
                                              r: 60,
                                              fill: "none",
                                              stroke: "#ef4444",
                                              strokeWidth: "14",
                                              strokeDasharray: `${(em / 360) * eh} ${eh}`,
                                              strokeDashoffset: `${-ep}`,
                                              strokeLinecap: "round",
                                            }),
                                        ],
                                      }),
                                      (0, t.jsxs)("div", {
                                        className:
                                          "absolute inset-0 flex flex-col items-center justify-center",
                                        children: [
                                          (0, t.jsx)("span", {
                                            className:
                                              "text-sm font-bold text-white",
                                            children: Z,
                                          }),
                                          (0, t.jsx)("span", {
                                            className:
                                              "text-[8px] text-white/40 uppercase",
                                            children: "Total",
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, t.jsxs)("div", {
                                className:
                                  "p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl",
                                children: [
                                  (0, t.jsxs)("div", {
                                    className: "flex items-center gap-1.5 mb-3",
                                    children: [
                                      (0, t.jsx)(_.ShieldAlert, {
                                        size: 12,
                                        className: "text-red-400",
                                      }),
                                      (0, t.jsx)("p", {
                                        className:
                                          "text-[10px] text-white/40 font-bold uppercase tracking-wider",
                                        children: "Filtro de Proteção",
                                      }),
                                    ],
                                  }),
                                  (0, t.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                      ec > 0 &&
                                        (0, t.jsxs)("div", {
                                          className:
                                            "flex items-center justify-between",
                                          children: [
                                            (0, t.jsxs)("div", {
                                              className:
                                                "flex items-center gap-1.5",
                                              children: [
                                                (0, t.jsx)("div", {
                                                  className:
                                                    "w-1.5 h-1.5 rounded-full bg-red-400",
                                                }),
                                                (0, t.jsx)("span", {
                                                  className:
                                                    "text-[11px] text-white/50",
                                                  children: "Bots/Crawlers",
                                                }),
                                              ],
                                            }),
                                            (0, t.jsx)("span", {
                                              className:
                                                "text-xs font-bold text-white",
                                              children: ec,
                                            }),
                                          ],
                                        }),
                                      ed > 0 &&
                                        (0, t.jsxs)("div", {
                                          className:
                                            "flex items-center justify-between",
                                          children: [
                                            (0, t.jsxs)("div", {
                                              className:
                                                "flex items-center gap-1.5",
                                              children: [
                                                (0, t.jsx)("div", {
                                                  className:
                                                    "w-1.5 h-1.5 rounded-full bg-[#8b5cf6]",
                                                }),
                                                (0, t.jsx)("span", {
                                                  className:
                                                    "text-[11px] text-white/50",
                                                  children: "Instagram/Social",
                                                }),
                                              ],
                                            }),
                                            (0, t.jsx)("span", {
                                              className:
                                                "text-xs font-bold text-white",
                                              children: ed,
                                            }),
                                          ],
                                        }),
                                      eo > 0 &&
                                        (0, t.jsxs)("div", {
                                          className:
                                            "flex items-center justify-between",
                                          children: [
                                            (0, t.jsxs)("div", {
                                              className:
                                                "flex items-center gap-1.5",
                                              children: [
                                                (0, t.jsx)("div", {
                                                  className:
                                                    "w-1.5 h-1.5 rounded-full bg-amber-400",
                                                }),
                                                (0, t.jsx)("span", {
                                                  className:
                                                    "text-[11px] text-white/50",
                                                  children: "Anti-Clone",
                                                }),
                                              ],
                                            }),
                                            (0, t.jsx)("span", {
                                              className:
                                                "text-xs font-bold text-white",
                                              children: eo,
                                            }),
                                          ],
                                        }),
                                      0 === er.length &&
                                        (0, t.jsx)("p", {
                                          className:
                                            "text-[10px] text-white/30",
                                          children: "Nenhum bloqueio ainda",
                                        }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, t.jsxs)("div", {
                            className: "grid grid-cols-2 gap-3",
                            children: [
                              (0, t.jsxs)("div", {
                                className:
                                  "bg-white/[0.03] border border-white/[0.06] rounded-xl p-4",
                                children: [
                                  (0, t.jsxs)("div", {
                                    className:
                                      "flex items-center justify-between mb-3",
                                    children: [
                                      (0, t.jsxs)("h4", {
                                        className:
                                          "text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5",
                                        children: [
                                          (0, t.jsx)(_.ShieldAlert, {
                                            size: 12,
                                          }),
                                          "Bloqueios",
                                        ],
                                      }),
                                      (0, t.jsxs)("span", {
                                        className:
                                          "text-[10px] text-red-400/60 font-mono",
                                        children: [er.length, " registros"],
                                      }),
                                    ],
                                  }),
                                  er.length > 0
                                    ? (0, t.jsx)("div", {
                                        className:
                                          "max-h-64 overflow-y-auto space-y-1.5",
                                        children: er
                                          .slice()
                                          .reverse()
                                          .map((e, s) => {
                                            let a = e.reason?.includes(
                                                "Anti-Compartilhamento",
                                              )
                                                ? "bg-[#8b5cf6]"
                                                : e.reason?.includes(
                                                      "Anti-clone",
                                                    )
                                                  ? "bg-amber-400"
                                                  : e.reason?.includes("Geo:")
                                                    ? "bg-orange-400"
                                                    : e.reason?.includes(
                                                          "Language:",
                                                        )
                                                      ? "bg-yellow-400"
                                                      : "bg-red-400",
                                              r = e.reason?.includes(
                                                "Anti-Compartilhamento",
                                              )
                                                ? "text-[#8b5cf6] bg-[#8b5cf6]/10"
                                                : e.reason?.includes(
                                                      "Anti-clone",
                                                    )
                                                  ? "text-amber-400 bg-amber-400/10"
                                                  : e.reason?.includes("Geo:")
                                                    ? "text-orange-400 bg-orange-400/10"
                                                    : e.reason?.includes(
                                                          "Language:",
                                                        )
                                                      ? "text-yellow-400 bg-yellow-400/10"
                                                      : "text-red-400 bg-red-400/10",
                                              i =
                                                e.score >= 80
                                                  ? "text-red-400"
                                                  : e.score >= 60
                                                    ? "text-orange-400"
                                                    : "text-yellow-400";
                                            return (0, t.jsxs)(
                                              "div",
                                              {
                                                className:
                                                  "flex items-center gap-2.5 p-2.5 bg-white/[0.02] rounded-lg border border-white/[0.04] hover:bg-white/[0.04] transition-colors",
                                                children: [
                                                  (0, t.jsx)("div", {
                                                    className: (0, W.cn)(
                                                      "w-1 h-10 rounded-full flex-shrink-0",
                                                      a,
                                                    ),
                                                  }),
                                                  (0, t.jsxs)("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: [
                                                      (0, t.jsxs)("div", {
                                                        className:
                                                          "flex items-center justify-between mb-1",
                                                        children: [
                                                          (0, t.jsx)("span", {
                                                            className: (0,
                                                            W.cn)(
                                                              "text-[9px] font-bold uppercase px-1.5 py-0.5 rounded",
                                                              r,
                                                            ),
                                                            children:
                                                              e.reason?.split(
                                                                ":",
                                                              )[0] || "Bot",
                                                          }),
                                                          (0, t.jsx)("span", {
                                                            className:
                                                              "text-[10px] text-white/30 flex-shrink-0",
                                                            children: new Date(
                                                              e.blockedAt,
                                                            ).toLocaleString(
                                                              "pt-BR",
                                                              {
                                                                day: "2-digit",
                                                                month:
                                                                  "2-digit",
                                                                hour: "2-digit",
                                                                minute:
                                                                  "2-digit",
                                                              },
                                                            ),
                                                          }),
                                                        ],
                                                      }),
                                                      (0, t.jsxs)("div", {
                                                        className:
                                                          "flex items-center gap-2",
                                                        children: [
                                                          (0, t.jsxs)("span", {
                                                            className:
                                                              "text-[10px] text-white/40 font-mono truncate",
                                                            children: [
                                                              "IP: ",
                                                              e.ip,
                                                            ],
                                                          }),
                                                          (0, t.jsxs)("span", {
                                                            className: (0,
                                                            W.cn)(
                                                              "text-[10px] font-bold",
                                                              i,
                                                            ),
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
                                              s,
                                            );
                                          }),
                                      })
                                    : (0, t.jsxs)("div", {
                                        className: "p-6 text-center",
                                        children: [
                                          (0, t.jsx)(S.Shield, {
                                            size: 20,
                                            className:
                                              "text-white/10 mx-auto mb-2",
                                          }),
                                          (0, t.jsx)("p", {
                                            className: "text-xs text-white/30",
                                            children:
                                              "Nenhum bloqueio registrado",
                                          }),
                                        ],
                                      }),
                                ],
                              }),
                              (0, t.jsxs)("div", {
                                className:
                                  "bg-white/[0.03] border border-white/[0.06] rounded-xl p-4",
                                children: [
                                  (0, t.jsxs)("div", {
                                    className:
                                      "flex items-center justify-between mb-3",
                                    children: [
                                      (0, t.jsxs)("h4", {
                                        className:
                                          "text-xs font-bold text-[#22c55e] uppercase tracking-wider flex items-center gap-1.5",
                                        children: [
                                          (0, t.jsx)(f.Check, {
                                            size: 12,
                                          }),
                                          "Aprovados",
                                        ],
                                      }),
                                      (0, t.jsxs)("span", {
                                        className:
                                          "text-[10px] text-[#22c55e]/60 font-mono",
                                        children: [se.length, " registros"],
                                      }),
                                    ],
                                  }),
                                  t7
                                    ? (0, t.jsxs)("div", {
                                        className: "p-6 text-center",
                                        children: [
                                          (0, t.jsx)("div", {
                                            className:
                                              "w-5 h-5 border-2 border-white/10 border-t-[var(--brand-500)] rounded-full animate-spin mx-auto mb-2",
                                          }),
                                          (0, t.jsx)("p", {
                                            className: "text-xs text-white/30",
                                            children: "Carregando...",
                                          }),
                                        ],
                                      })
                                    : se.length > 0
                                      ? (0, t.jsx)("div", {
                                          className:
                                            "max-h-64 overflow-y-auto space-y-1.5",
                                          children: se.map((e, s) => {
                                            let a =
                                              "mobile" === e.device
                                                ? "Mobile"
                                                : "desktop" === e.device
                                                  ? "Desktop"
                                                  : e.device || "Mobile";
                                            return (0, t.jsxs)(
                                              "div",
                                              {
                                                className:
                                                  "flex items-center gap-2.5 p-2.5 bg-white/[0.02] rounded-lg border border-white/[0.04] hover:bg-white/[0.04] transition-colors",
                                                children: [
                                                  (0, t.jsx)("div", {
                                                    className: (0, W.cn)(
                                                      "w-1 h-10 rounded-full flex-shrink-0",
                                                      e.used
                                                        ? "bg-[#22c55e]"
                                                        : "bg-[var(--brand-500)]",
                                                    ),
                                                  }),
                                                  (0, t.jsxs)("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: [
                                                      (0, t.jsxs)("div", {
                                                        className:
                                                          "flex items-center justify-between mb-1",
                                                        children: [
                                                          (0, t.jsxs)("div", {
                                                            className:
                                                              "flex items-center gap-1.5",
                                                            children: [
                                                              (0, t.jsx)(
                                                                "span",
                                                                {
                                                                  className:
                                                                    "text-[11px] text-white font-medium",
                                                                  children: a,
                                                                },
                                                              ),
                                                              (0, t.jsx)(
                                                                "span",
                                                                {
                                                                  className:
                                                                    "text-[10px] text-white/30",
                                                                  children: "·",
                                                                },
                                                              ),
                                                              (0, t.jsx)(
                                                                "span",
                                                                {
                                                                  className:
                                                                    "text-[10px] text-white/50",
                                                                  children:
                                                                    e.country ||
                                                                    "??",
                                                                },
                                                              ),
                                                            ],
                                                          }),
                                                          (0, t.jsxs)("div", {
                                                            className:
                                                              "flex items-center gap-2 flex-shrink-0",
                                                            children: [
                                                              e.used &&
                                                                (0, t.jsx)(
                                                                  "span",
                                                                  {
                                                                    className:
                                                                      "text-[9px] font-bold text-[#22c55e] bg-[#22c55e]/10 px-1.5 py-0.5 rounded",
                                                                    children:
                                                                      "Lead",
                                                                  },
                                                                ),
                                                              (0, t.jsx)(
                                                                "span",
                                                                {
                                                                  className:
                                                                    "text-[10px] text-white/30",
                                                                  children:
                                                                    new Date(
                                                                      e.createdAt,
                                                                    ).toLocaleString(
                                                                      "pt-BR",
                                                                      {
                                                                        day: "2-digit",
                                                                        month:
                                                                          "2-digit",
                                                                        hour: "2-digit",
                                                                        minute:
                                                                          "2-digit",
                                                                      },
                                                                    ),
                                                                },
                                                              ),
                                                            ],
                                                          }),
                                                        ],
                                                      }),
                                                      (0, t.jsxs)("span", {
                                                        className:
                                                          "text-[10px] text-white/40 font-mono",
                                                        children: [
                                                          "IP: ",
                                                          e.ip,
                                                        ],
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              },
                                              s,
                                            );
                                          }),
                                        })
                                      : (0, t.jsxs)("div", {
                                          className: "p-6 text-center",
                                          children: [
                                            (0, t.jsx)(f.Check, {
                                              size: 20,
                                              className:
                                                "text-white/10 mx-auto mb-2",
                                            }),
                                            (0, t.jsx)("p", {
                                              className:
                                                "text-xs text-white/30",
                                              children:
                                                "Nenhum aprovado registrado",
                                            }),
                                          ],
                                        }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      })),
                    (0, t.jsx)(o.DialogFooter, {
                      children: (0, t.jsx)("button", {
                        onClick: () => t4(!1),
                        className:
                          "px-4 py-2.5 bg-white/[0.06] rounded-xl text-sm font-bold text-white hover:bg-white/[0.08] transition-all cursor-pointer",
                        children: "Fechar",
                      }),
                    }),
                  ],
                }),
              }),
              (0, t.jsx)(o.Dialog, {
                open: st,
                onOpenChange: ss,
                children: (0, t.jsxs)(o.DialogContent, {
                  className:
                    "max-w-6xl max-h-[90vh] bg-[#0a0a0a] border-white/10 p-0 gap-0",
                  children: [
                    (0, t.jsx)(o.DialogHeader, {
                      className: "px-6 pt-5 pb-4 border-b border-white/[0.04]",
                      children: (0, t.jsxs)("div", {
                        className: "flex items-center gap-3",
                        children: [
                          (0, t.jsx)("div", {
                            className:
                              "p-2 rounded-lg bg-purple-500/10 border border-purple-500/20",
                            children: (0, t.jsx)(S.Shield, {
                              size: 20,
                              className: "text-purple-400",
                            }),
                          }),
                          (0, t.jsxs)("div", {
                            className: "flex-1",
                            children: [
                              (0, t.jsxs)("div", {
                                className: "flex items-center gap-2",
                                children: [
                                  (0, t.jsx)(o.DialogTitle, {
                                    children: "Camuflagem",
                                  }),
                                  sa?.cloakerV2?.blockMethod &&
                                    (0, t.jsx)("span", {
                                      className:
                                        "px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-400 uppercase",
                                      children:
                                        "safepage" === sa.cloakerV2.blockMethod
                                          ? "Safe Page"
                                          : "Redirect",
                                    }),
                                ],
                              }),
                              (0, t.jsx)(o.DialogDescription, {
                                children:
                                  "Pre-visualizacao do que cada visitante ve",
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                    sa &&
                      (0, t.jsx)("div", {
                        className: "flex-1 overflow-hidden",
                        children: (0, t.jsxs)("div", {
                          className: "grid grid-cols-1 md:grid-cols-2 h-[65vh]",
                          children: [
                            (0, t.jsxs)("div", {
                              className:
                                "flex flex-col border-r border-white/[0.04]",
                              children: [
                                (0, t.jsxs)("div", {
                                  className:
                                    "px-4 py-3 border-b border-white/[0.04] flex items-center justify-between bg-white/[0.02]",
                                  children: [
                                    (0, t.jsxs)("div", {
                                      children: [
                                        (0, t.jsxs)("div", {
                                          className: "flex items-center gap-2",
                                          children: [
                                            (0, t.jsx)(S.Shield, {
                                              size: 14,
                                              className: "text-white/50",
                                            }),
                                            (0, t.jsx)("span", {
                                              className:
                                                "text-sm font-bold text-white",
                                              children: "Pagina Segura",
                                            }),
                                          ],
                                        }),
                                        (0, t.jsx)("p", {
                                          className:
                                            "text-[10px] text-white/40 mt-0.5 ml-6",
                                          children:
                                            "O que bots e moderadores veem",
                                        }),
                                      ],
                                    }),
                                    (0, t.jsxs)("button", {
                                      onClick: () => {
                                        let e = sa.fullUrl.includes("?")
                                          ? "&"
                                          : "?";
                                        window.open(
                                          `${sa.fullUrl}${e}_sp=1`,
                                          "_blank",
                                        );
                                      },
                                      className:
                                        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--brand-500)]/10 border border-[var(--brand-500)]/20 text-[var(--brand-400)] text-[11px] font-bold hover:bg-[var(--brand-500)]/20 transition-all cursor-pointer",
                                      children: [
                                        "Abrir em nova aba",
                                        (0, t.jsx)(m.ExternalLink, {
                                          size: 12,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, t.jsx)("div", {
                                  className: "flex-1 overflow-hidden bg-white",
                                  children:
                                    ((eb = sa.fullUrl.includes("?")
                                      ? "&"
                                      : "?"),
                                    (eu = `${sa.fullUrl}${eb}_sp=1`),
                                    (0, t.jsx)("iframe", {
                                      src: eu,
                                      className: "w-full h-full border-0",
                                      sandbox:
                                        "allow-same-origin allow-scripts allow-popups",
                                      title: "Safe Page",
                                    })),
                                }),
                              ],
                            }),
                            (0, t.jsxs)("div", {
                              className: "flex flex-col",
                              children: [
                                (0, t.jsxs)("div", {
                                  className:
                                    "px-4 py-3 border-b border-white/[0.04] flex items-center justify-between bg-white/[0.02]",
                                  children: [
                                    (0, t.jsxs)("div", {
                                      children: [
                                        (0, t.jsxs)("div", {
                                          className: "flex items-center gap-2",
                                          children: [
                                            (0, t.jsx)(C.Zap, {
                                              size: 14,
                                              className: "text-emerald-400",
                                            }),
                                            (0, t.jsx)("span", {
                                              className:
                                                "text-sm font-bold text-white",
                                              children: "Pagina da Oferta",
                                            }),
                                          ],
                                        }),
                                        (0, t.jsx)("p", {
                                          className:
                                            "text-[10px] text-white/40 mt-0.5 ml-6",
                                          children: "O que leads reais veem",
                                        }),
                                      ],
                                    }),
                                    (0, t.jsxs)("button", {
                                      onClick: () => {
                                        let e = sa.shk ? "shk" : "ph",
                                          t = sa.shk || sa.ph || "",
                                          s = sa.fullUrl.includes("?")
                                            ? "&"
                                            : "?";
                                        window.open(
                                          `${sa.fullUrl}${s}${e}=${t}`,
                                          "_blank",
                                        );
                                      },
                                      className:
                                        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold hover:bg-emerald-500/20 transition-all cursor-pointer",
                                      children: [
                                        "Abrir em nova aba",
                                        (0, t.jsx)(m.ExternalLink, {
                                          size: 12,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, t.jsx)("div", {
                                  className: "flex-1 overflow-hidden",
                                  children:
                                    ((eg = sa.fullUrl.includes("?")
                                      ? "&"
                                      : "?"),
                                    (ej = `${sa.fullUrl}${eg}_bp=1`),
                                    (0, t.jsx)("iframe", {
                                      src: ej,
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
        },
      ],
      854006,
    );
  },
]);
