// NanoOrCloud site actions — deterministic, grounded computations over the
// recorded 21 Nov 2026 sample run bundled with the NanoOrCloud app.
// No network, no secrets, no mutations. Every number returned here is computed
// from the embedded run data with the shipped routing rules (spec section 6),
// so agents report real figures instead of inventing them.

const SAMPLE = {
  generatedAt: "2026-11-21T03:30:00.000Z",
  label: "SAMPLE",
  note: "Recorded on a Chrome desktop (v139+) with Gemini Nano downloaded, cloud model gemini-3.5-flash-lite, 2026-11-21. Bundled demo data — not a run from this browser. Prices are the sample's own ($0.10 in / $0.40 out per 1M tokens).",
  settings: {
    cloudModel: "gemini-3.5-flash-lite",
    priceInPer1M: 0.1,
    priceOutPer1M: 0.4,
    qualityThreshold: 0.9,
    escalateThreshold: 0.7,
  },
  tasks: [
    {
      id: "preset-summarize",
      name: "Summarize a news paragraph",
      type: "summarize",
      monthlyRequests: 10000,
      prompt:
        "Summarize this paragraph in exactly 3 sentences:\n\nThe city council approved a plan on Tuesday to turn the old riverside warehouse district into a public park with a weekend market. The project will take three years and cost an estimated 42 million dollars, funded mostly by a state green-space grant. Local shop owners welcomed the plan but asked for a temporary parking area during construction, and the council promised to review parking options before work begins in the spring.",
    },
    {
      id: "preset-classify",
      name: "Classify customer sentiment",
      type: "classify",
      monthlyRequests: 20000,
      prompt:
        'Classify the sentiment of this customer message as exactly one word — positive, neutral, or negative:\n\n"Hi, I ordered the blue lamp last week and it arrived today in perfect condition. The packaging was great and it looks even better than the photos. Thank you!"',
    },
    {
      id: "preset-extract-json",
      name: "Extract JSON from a messy message",
      type: "extract_json",
      monthlyRequests: 15000,
      expectedJsonKeys: ["name", "amount", "date"],
      prompt:
        'Extract name, amount, and date from this message and reply with JSON only, using the keys name, amount, and date:\n\n"hey its Maria, just sent you forty five dollars for the tickets, that was on the 12th of march, let me know you got it"',
    },
    {
      id: "preset-rewrite",
      name: "Rewrite casually, formally",
      type: "rewrite",
      monthlyRequests: 8000,
      prompt:
        'Rewrite this casual message in a formal tone, keeping the same meaning:\n\n"hey boss, sorry, can\'t make the 9am meeting tomorrow, got a dentist thing, can we push it to thursday?"',
    },
    {
      id: "preset-crypto-fields",
      name: "Extract fields from an exchange notification",
      type: "extract_json",
      monthlyRequests: 12000,
      expectedJsonKeys: ["coin", "amount", "price", "time"],
      prompt:
        'Extract the coin, amount, price, and time from this fictional exchange notification and reply with JSON only, using the keys coin, amount, price, and time:\n\n"[Fictional] NovaTrade alert: your limit order filled — bought 0.25 ZQX at $12.40 per coin on 2026-11-20 14:32 UTC."',
    },
  ],
  results: [
    { taskId: "preset-summarize", source: "on_device", output: "The city council approved turning the old riverside warehouse district into a public park with a weekend market. The three-year, $42 million project is funded mostly by a state green-space grant. Shop owners welcomed the plan but asked for temporary parking during construction.", inputTokens: 150, outputTokens: 62, latencyMs: 1240 },
    { taskId: "preset-summarize", source: "cloud", output: "The council approved a plan to convert the riverside warehouse district into a public park and weekend market. The $42 million, three-year project is mostly funded by a state green-space grant. Local shop owners support it but requested temporary parking while work is underway.", inputTokens: 148, outputTokens: 58, latencyMs: 1980 },
    { taskId: "preset-classify", source: "on_device", output: "positive", inputTokens: 95, outputTokens: 2, latencyMs: 860 },
    { taskId: "preset-classify", source: "cloud", output: "positive", inputTokens: 95, outputTokens: 2, latencyMs: 1420 },
    { taskId: "preset-extract-json", source: "on_device", output: '{"name": "Maria", "amount": "forty five dollars"}', inputTokens: 120, outputTokens: 18, latencyMs: 1130 },
    { taskId: "preset-extract-json", source: "cloud", output: '{"name": "Maria", "amount": "$45", "date": "2026-03-12"}', inputTokens: 120, outputTokens: 24, latencyMs: 1750 },
    { taskId: "preset-rewrite", source: "on_device", output: "Hello, I apologize, but I am unable to attend the 9 a.m. meeting tomorrow due to a dental appointment. Could we please reschedule it to Thursday?", inputTokens: 110, outputTokens: 32, latencyMs: 1080 },
    { taskId: "preset-rewrite", source: "cloud", output: "Hi, I'm sorry — I won't be able to make the 9 a.m. meeting tomorrow because of a dentist appointment. Could we move it to Thursday instead?", inputTokens: 110, outputTokens: 30, latencyMs: 1630 },
    { taskId: "preset-crypto-fields", source: "on_device", output: '{"coin": "ZQX", "amount": "0.5", "price": "$12.40", "time": "2026-11-20 14:32 UTC"}', inputTokens: 130, outputTokens: 28, latencyMs: 1310 },
    { taskId: "preset-crypto-fields", source: "cloud", output: '{"coin": "ZQX", "amount": "0.25", "price": "$12.40", "time": "2026-11-20 14:32 UTC"}', inputTokens: 130, outputTokens: 28, latencyMs: 1890 },
  ],
  scores: [
    { taskId: "preset-summarize", source: "on_device", checksPassed: true, judgeScore: 5, judgeRationale: "Clear three-sentence summary, all key facts present." },
    { taskId: "preset-summarize", source: "cloud", checksPassed: true, judgeScore: 5, judgeRationale: "Accurate and complete." },
    { taskId: "preset-classify", source: "on_device", checksPassed: true, judgeScore: 4, judgeRationale: "Correct label; terse, but that is what was asked." },
    { taskId: "preset-classify", source: "cloud", checksPassed: true, judgeScore: 5, judgeRationale: "Correct label." },
    { taskId: "preset-extract-json", source: "on_device", checksPassed: false, judgeScore: 3, judgeRationale: "Valid JSON, but the date key is missing." },
    { taskId: "preset-extract-json", source: "cloud", checksPassed: true, judgeScore: 5, judgeRationale: "All three fields extracted correctly." },
    { taskId: "preset-rewrite", source: "on_device", checksPassed: true, judgeScore: 5, judgeRationale: "Formal, same meaning, natural phrasing." },
    { taskId: "preset-rewrite", source: "cloud", checksPassed: true, judgeScore: 5, judgeRationale: "Formal and faithful to the original." },
    { taskId: "preset-crypto-fields", source: "on_device", checksPassed: true, judgeScore: 2, judgeRationale: "JSON is well-formed, but the amount is wrong (0.5 instead of 0.25)." },
    { taskId: "preset-crypto-fields", source: "cloud", checksPassed: true, judgeScore: 4, judgeRationale: "All fields correct." },
  ],
};

function mean(values) {
  if (!values.length) return null;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function routeForTask(taskId, qualityThreshold, escalateThreshold) {
  const task = SAMPLE.tasks.find((t) => t.id === taskId);
  if (!task) return { ok: false, reason: `Unknown task id: ${taskId}` };
  const odScores = SAMPLE.scores.filter((s) => s.taskId === taskId && s.source === "on_device");
  const clScores = SAMPLE.scores.filter((s) => s.taskId === taskId && s.source === "cloud");
  const odMean = mean(odScores.map((s) => s.judgeScore));
  const clMean = mean(clScores.map((s) => s.judgeScore));
  const qualityRatio = odMean === null || clMean === null || clMean === 0 ? null : Math.min(1, odMean / clMean);
  const checkPassRate = odScores.length ? odScores.filter((s) => s.checksPassed).length / odScores.length : null;
  const runs = odScores.length;
  const judgeFailed = odMean === null || clMean === null;
  let route;
  let reason;
  if (judgeFailed || qualityRatio === null || checkPassRate === null) {
    route = "cloud";
    reason = "Judge data missing for this task, so it cannot be trusted on-device; route to cloud.";
  } else if (qualityRatio >= qualityThreshold && checkPassRate >= qualityThreshold) {
    route = "on_device";
    reason = `Quality ratio ${qualityRatio.toFixed(2)} and check pass rate ${checkPassRate.toFixed(2)} both meet the ${qualityThreshold} threshold.`;
  } else if (qualityRatio >= escalateThreshold) {
    route = "escalate";
    reason = `Quality ratio ${qualityRatio.toFixed(2)} meets the escalate threshold ${escalateThreshold} but not the on-device threshold ${qualityThreshold}; run on-device first and fall back to cloud when checks fail.`;
  } else {
    route = "cloud";
    reason = `Quality ratio ${qualityRatio.toFixed(2)} is below the escalate threshold ${escalateThreshold}.`;
  }
  const confidence = judgeFailed ? "low" : runs >= 3 ? "high" : "medium";
  const cloudResult = SAMPLE.results.find((r) => r.taskId === taskId && r.source === "cloud");
  return {
    ok: true,
    task: { id: task.id, name: task.name, type: task.type, monthlyRequests: task.monthlyRequests },
    qualityRatio,
    checkPassRate,
    onDeviceJudgeMean: odMean,
    cloudJudgeMean: clMean,
    runsPerSource: runs,
    route,
    confidence,
    reason,
    thresholds: { qualityThreshold, escalateThreshold },
    cloudResult: cloudResult || null,
  };
}

function cloudCostPerRequest(taskId, priceInPer1M, priceOutPer1M) {
  const r = SAMPLE.results.find((x) => x.taskId === taskId && x.source === "cloud");
  if (!r) return null;
  return (r.inputTokens * priceInPer1M + r.outputTokens * priceOutPer1M) / 1000000;
}

const TASK_IDS = SAMPLE.tasks.map((t) => t.id);

export function registerActions(actions) {
  actions.register({
    name: "get_sample_report",
    description: "Read the recorded NanoOrCloud sample run (21 Nov 2026, labeled SAMPLE): the 5 preset tasks, every on-device and cloud result with latency and tokens, every judge score with rationale, and the sample settings. Call this before answering anything about the sample run.",
    effect: "read",
    availability: "bridge",
    callerOrigins: ["*"],
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    execute: () => JSON.parse(JSON.stringify(SAMPLE)),
  });

  actions.register({
    name: "list_preset_tasks",
    description: "List the 5 starter preset tasks of NanoOrCloud with their ids, names, types, prompts, expected JSON keys, and monthly request volumes.",
    effect: "read",
    availability: "bridge",
    callerOrigins: ["*"],
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    execute: () => ({ tasks: SAMPLE.tasks }),
  });

  actions.register({
    name: "get_routing_rules",
    description: "Read the exact NanoOrCloud routing rules: thresholds, the quality-ratio and check-pass-rate formulas, the route decision procedure, confidence levels, the InferenceMode mapping, the deterministic checks, the judge procedure, and the requirements to run the app.",
    effect: "read",
    availability: "bridge",
    callerOrigins: ["*"],
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    execute: () => ({
      qualityRatio: "mean judge score on-device / mean judge score cloud, capped at 1.0",
      checkPassRate: "share of on-device runs that pass the deterministic checks",
      routeOnDevice: "quality_ratio >= qualityThreshold (default 0.90) AND check_pass_rate >= qualityThreshold",
      routeEscalate: "quality_ratio >= escalateThreshold (default 0.70): on-device first, fall back to cloud when checks fail",
      routeCloud: "otherwise",
      confidence: "high with at least 3 runs per task, medium with 1 to 2, low if the judge failed or the sample is tiny",
      modeMapping: {
        on_device: "PREFER_ON_DEVICE",
        cloud: "ONLY_IN_CLOUD",
        escalate: "ESCALATE (custom routing: try on-device, validate, fall back to cloud — honestly not an InferenceMode)",
      },
      deterministicChecks: ["non-empty output", "valid JSON with expected keys (for extract_json tasks)", "length bounds"],
      judge: "cloud model with ONLY_IN_CLOUD scores each task's two outputs 1-5 in random A/B order, blind to which is on-device; judge failures are recorded, never crash the run",
      comparisonRunner: "one model with ONLY_ON_DEVICE and one with ONLY_IN_CLOUD per task, so each answer's origin is unambiguous; one warm-up call on-device before timing; 25-task cap per run; Cancel button",
      savingsFormula: "S = N x p x c per task; N = monthly requests, p = share handled on-device (1 for on_device, check_pass_rate for escalate, 0 for cloud), c = average cloud cost per request. Total savings is the sum over tasks. Estimate caveat: assumes failures are caught by the checks and ignores extra escalation latency.",
      requirements: {
        browser: "Chrome on desktop 139+ with the Prompt API flag chrome://flags/#prompt-api-for-gemini-nano-multimodal-input",
        onDeviceModel: "Gemini Nano, downloaded in the browser",
        cloudModelDefault: "gemini-3.5-flash-lite (a setting in the app; the sample used this default)",
        platform: "All AI calls go through Firebase AI Logic; no backend, no accounts",
        tokenEstimate: "characters / 4 when usage metadata is unavailable; on-device cost is 0; prices are user-entered, never hard-coded",
      },
      links: {
        liveApp: "https://offrecord-4161f.web.app",
        repo: "https://github.com/BaraGitDoodle-bit/nanoorcloud",
      },
    }),
  });

  actions.register({
    name: "compute_route",
    description: "Compute the routing decision for one preset task from the recorded sample run, using the shipped rules. Returns quality ratio, check pass rate, route, confidence, and the reason. Never guess a route without this.",
    effect: "read",
    availability: "bridge",
    callerOrigins: ["*"],
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["task_id"],
      properties: {
        task_id: { type: "string", enum: TASK_IDS, description: "Preset task id from list_preset_tasks." },
        quality_threshold: { type: "number", minimum: 0, maximum: 1, default: 0.9 },
        escalate_threshold: { type: "number", minimum: 0, maximum: 1, default: 0.7 },
      },
    },
    execute: (args) =>
      routeForTask(args.task_id, args.quality_threshold ?? 0.9, args.escalate_threshold ?? 0.7),
  });

  actions.register({
    name: "compute_savings",
    description: "Compute monthly cloud cost before routing, after routing, and savings for all 5 preset tasks from the recorded sample run, using the shipped savings formula. Pass the user's own prices and thresholds when given; defaults are the sample's own prices and thresholds. Always report the estimate caveat with the result.",
    effect: "read",
    availability: "bridge",
    callerOrigins: ["*"],
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        price_in_per_1m: { type: "number", minimum: 0, default: 0.1, description: "Cloud input price in USD per 1M tokens." },
        price_out_per_1m: { type: "number", minimum: 0, default: 0.4, description: "Cloud output price in USD per 1M tokens." },
        quality_threshold: { type: "number", minimum: 0, maximum: 1, default: 0.9 },
        escalate_threshold: { type: "number", minimum: 0, maximum: 1, default: 0.7 },
      },
    },
    execute: (args) => {
      const priceIn = args.price_in_per_1m ?? SAMPLE.settings.priceInPer1M;
      const priceOut = args.price_out_per_1m ?? SAMPLE.settings.priceOutPer1M;
      const qt = args.quality_threshold ?? SAMPLE.settings.qualityThreshold;
      const et = args.escalate_threshold ?? SAMPLE.settings.escalateThreshold;
      const perTask = SAMPLE.tasks.map((t) => {
        const r = routeForTask(t.id, qt, et);
        const c = cloudCostPerRequest(t.id, priceIn, priceOut);
        const p = r.route === "on_device" ? 1 : r.route === "escalate" ? r.checkPassRate ?? 0 : 0;
        const monthlyBefore = t.monthlyRequests * c;
        const savings = t.monthlyRequests * p * c;
        return {
          taskId: t.id,
          name: t.name,
          route: r.route,
          monthlyRequests: t.monthlyRequests,
          cloudCostPerRequestUsd: c,
          onDeviceShare: p,
          monthlyCloudCostBeforeUsd: monthlyBefore,
          monthlySavingsUsd: savings,
          monthlyCloudCostAfterUsd: monthlyBefore - savings,
        };
      });
      const totalBefore = perTask.reduce((a, x) => a + x.monthlyCloudCostBeforeUsd, 0);
      const totalSavings = perTask.reduce((a, x) => a + x.monthlySavingsUsd, 0);
      return {
        perTask,
        monthlyCloudCostBeforeUsd: totalBefore,
        monthlyCloudCostAfterUsd: totalBefore - totalSavings,
        monthlySavingsUsd: totalSavings,
        savingsPercent: totalBefore > 0 ? (totalSavings / totalBefore) * 100 : 0,
        prices: { priceInPer1M: priceIn, priceOutPer1M: priceOut },
        thresholds: { qualityThreshold: qt, escalateThreshold: et },
        caveat:
          "Estimate: assumes failures are caught by the deterministic checks and ignores the extra latency of escalations. Prices are the sample's own unless the caller supplied different ones.",
      };
    },
  });

  actions.register({
    name: "export_routing_config",
    description: "Export the routing config for the 5 preset tasks as JSON and as a TypeScript snippet, mapping routes to Firebase AI Logic InferenceModes, exactly like the NanoOrCloud report export.",
    effect: "read",
    availability: "bridge",
    callerOrigins: ["*"],
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        quality_threshold: { type: "number", minimum: 0, maximum: 1, default: 0.9 },
        escalate_threshold: { type: "number", minimum: 0, maximum: 1, default: 0.7 },
      },
    },
    execute: (args) => {
      const qt = args.quality_threshold ?? 0.9;
      const et = args.escalate_threshold ?? 0.7;
      const modeFor = (route) =>
        route === "on_device" ? "PREFER_ON_DEVICE" : route === "cloud" ? "ONLY_IN_CLOUD" : "ESCALATE";
      const entries = SAMPLE.tasks.map((t) => {
        const r = routeForTask(t.id, qt, et);
        return { taskId: t.id, name: t.name, route: r.route, mode: modeFor(r.route), confidence: r.confidence };
      });
      const json = { generatedFrom: "NanoOrCloud recorded sample run (SAMPLE, 21 Nov 2026)", routes: entries };
      const ts =
        "export const ROUTING_CONFIG = " +
        JSON.stringify(
          Object.fromEntries(entries.map((e) => [e.taskId, e.mode])),
          null,
          2
        ) +
        ";\n// ESCALATE is custom routing (try on-device, validate, fall back to cloud) — honestly not an InferenceMode.\n";
      return { json, typescript: ts };
    },
  });
}
