export const POSITION_STAT_FIELDS = {
    QB: [
      { key: "passingYds", label: "Pass Yds" },
      { key: "passingTd", label: "Pass TD" },
      { key: "interceptions", label: "INT" },
      { key: "completions", label: "Cmp" },
      { key: "attempts", label: "Att" },
      { key: "rushingYds", label: "Rush Yds" },
      { key: "fantasyPoints", label: "Fantasy Pts", format: v => v.toFixed?.(2) ?? v },
    ],
    RB: [
      { key: "rushingYds", label: "Rush Yds" },
      { key: "rushingTd", label: "Rush TD" },
      { key: "receptions", label: "Rec" },
      { key: "receivingYds", label: "Rec Yds" },
      { key: "receivingTd", label: "Rec TD" },
      { key: "fumbles", label: "Fum" },
      { key: "fantasyPoints", label: "Fantasy Pts", format: v => v.toFixed?.(2) ?? v },
    ],
    WR: [
      { key: "receptions", label: "Rec" },
      { key: "receivingYards", label: "Rec Yds" },
      { key: "receivingTDs", label: "Rec TD" },
      { key: "rushingYards", label: "Rush Yds" },      // optional
      { key: "rushingTDs", label: "Rush TD" },         // optional
      { key: "fantasyPointsPerGame", label: "FP/G", format: v => formatMaybeFixed(v, 2) },
      { key: "fantasyPoints", label: "Fantasy Pts", format: v => formatMaybeFixed(v, 2) },
    ],
    // Add TE, K, DEF
  };