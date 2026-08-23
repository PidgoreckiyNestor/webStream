import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import ts from "typescript";

function loadArticles() {
  const source = fs.readFileSync("src/lib/articles.ts", "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const compiledModule = { exports: {} };
  new Function("exports", "module", "require", output)(
    compiledModule.exports,
    compiledModule,
    undefined,
  );
  return compiledModule.exports.articles;
}

function loadModule(path) {
  const source = fs.readFileSync(path, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const compiledModule = { exports: {} };
  new Function("exports", "module", "require", output)(
    compiledModule.exports,
    compiledModule,
    undefined,
  );
  return compiledModule.exports;
}

function visibleCopy(article) {
  return [
    article.dek,
    article.description,
    ...article.sections.flatMap((section) => [
      section.heading ?? "",
      ...section.paragraphs,
      ...(section.table?.columns ?? []),
      ...(section.table?.rows.flatMap((row) => [row.label, ...row.cells]) ?? []),
    ]),
    ...(article.faqs ?? []).flatMap((item) => [item.q, item.a]),
    article.availability ?? "",
    article.cta?.action ?? "",
    article.cta?.body ?? "",
  ].join(" ");
}

test("positions MindVault as a working product with controlled early access", () => {
  const articles = loadArticles();
  const allCopy = articles.map(visibleCopy).join(" ");

  assert.doesNotMatch(
    allCopy,
    /private build|private beta|no public installer|not available to download|not implemented/i,
  );
  assert.equal(articles.every((article) => article.cta?.action === "Request Athena access"), true);
  assert.equal(articles.every((article) => /controlled early access/i.test(visibleCopy(article))), true);
});

test("keeps current capabilities separate from what comes next", () => {
  const articles = loadArticles();
  const athena = articles.find((article) => article.slug === "muse-s-athena-desktop");

  assert.ok(athena);
  assert.match(visibleCopy(athena), /Current Athena release/i);
  assert.match(visibleCopy(athena), /Coming to Lab/i);
  assert.match(visibleCopy(athena), /four EEG channels at 256 Hz/i);
  assert.match(visibleCopy(athena), /CSV/i);
  assert.match(visibleCopy(athena), /EDF/i);
});

test("opens the access request directly from article CTAs", () => {
  const source = fs.readFileSync("src/app/articles/[slug]/page.tsx", "utf8");
  const { normalizePlanIntent } = loadModule("src/lib/waitlist.ts");

  assert.match(source, /WaitlistOpen/);
  assert.doesNotMatch(source, /WaitlistOpen intent="lab"/);
  assert.equal(normalizePlanIntent(undefined), null);
  assert.equal(normalizePlanIntent("lab"), "lab");
  assert.equal(normalizePlanIntent("plus"), "plus");
});

test("matches access-form copy to the CTA that opened it", () => {
  const { getAccessRequestCopy } = loadModule("src/lib/waitlist.ts");

  assert.deepEqual(getAccessRequestCopy(null), {
    title: "Request MindVault access",
    description:
      "MindVault is available for Muse S Athena through controlled early access. Enter your email and we’ll send the right build and setup steps for your computer.",
    submit: "Request access",
    successTitle: "Access request received",
    successBody:
      "We’ll email you with the right build and setup steps for your operating system.",
    emailDetail:
      "MindVault currently supports live EEG, contact quality, CSV recording, and EDF export with Muse S Athena.",
  });
  assert.equal(getAccessRequestCopy("trial").title, "Request live access");
  assert.equal(getAccessRequestCopy("plus").title, "Request Base access");
  assert.equal(getAccessRequestCopy("lab").title, "Join the Lab rollout");
  assert.match(getAccessRequestCopy("lab").description, /LSL, OSC, the HTTP API, and event markers/);
  assert.match(getAccessRequestCopy("lab").emailDetail, /coming next in Lab/);
  assert.equal(getAccessRequestCopy("research").title, "Register research interest");
  assert.doesNotMatch(getAccessRequestCopy("research").description, /Athena access|Lab rollout/i);
  assert.doesNotMatch(getAccessRequestCopy("research").emailDetail, /current build|Lab rollout/i);
});

test("persists repeat-request intent and keeps confirmation intent-aware", () => {
  const { shouldSendAccessConfirmation } = loadModule("src/lib/waitlist.ts");
  const action = fs.readFileSync("src/app/actions/waitlist.ts", "utf8");
  const email = fs.readFileSync("src/lib/email/lab-beta-join.ts", "utf8");

  assert.equal(shouldSendAccessConfirmation(false), true);
  assert.equal(shouldSendAccessConfirmation(true), false);
  assert.match(action, /if \(duplicate\)[\s\S]*\.update\(updates\)[\s\S]*\.eq\("email", email\)/);
  assert.match(
    action,
    /if \(shouldSendAccessConfirmation\(duplicate\)\)[\s\S]*sendJoinEmail\(email, planIntent\)/,
  );
  assert.match(email, /getAccessRequestCopy\(planIntent\)/);
  assert.doesNotMatch(email, /const SUBJECT = "MindVault Athena access request received"/);
});

test("keeps shared FAQ and machine-readable product copy aligned with the rollout", () => {
  const { faqItems } = loadModule("src/lib/faq.ts");
  const { PRODUCT_DEFINITION } = loadModule("src/lib/product.ts");
  const faqCopy = faqItems.map((item) => `${item.q} ${item.a}`).join(" ");
  const pricing = fs.readFileSync("public/pricing.md", "utf8");

  assert.match(faqCopy, /Athena is the current validated workflow/i);
  assert.match(faqCopy, /Muse 2 and Muse S.*compatibility rollout/i);
  assert.match(faqCopy, /Athena hardware includes both PPG.*fNIRS/i);
  assert.match(PRODUCT_DEFINITION, /current Athena release/i);
  assert.match(PRODUCT_DEFINITION, /coming to Lab/i);
  assert.match(pricing, /controlled early access/i);
  assert.match(pricing, /coming next in Lab/i);
  assert.doesNotMatch(pricing, /public installers are not live/i);
});

test("uses neutral early-access analytics for article requests", () => {
  const action = fs.readFileSync("src/app/actions/waitlist.ts", "utf8");

  assert.doesNotMatch(action, /lab_beta_submit|lab_beta_duplicate/);
  assert.match(action, /early_access_submit/);
});

test("qualifies future integrations across customer-facing copy", () => {
  const paths = [
    "src/lib/articles.ts",
    "src/lib/faq.ts",
    "src/app/layout.tsx",
    "src/components/Pricing.tsx",
    "src/components/mv/BrandLogos.tsx",
    "src/components/mv/ForWhom.tsx",
    "src/components/mv/HowItWorks.tsx",
    "src/components/mv/TheStream.tsx",
    "src/components/mv/Waitlist.tsx",
    "src/lib/email/lab-beta-join.ts",
  ];
  const copy = paths.map((path) => fs.readFileSync(path, "utf8")).join(" ");
  const stream = fs.readFileSync("src/components/mv/TheStream.tsx", "utf8");

  assert.doesNotMatch(copy, /Lab (adds|brings)|comes with Lab|ship on Lab/i);
  assert.match(copy, /coming next in Lab/i);
  assert.doesNotMatch(stream, /every channel/i);
});

test("uses one plan-level future qualifier instead of repeated feature prefixes", () => {
  const paths = [
    "src/components/Pricing.tsx",
    "src/components/mv/JsonLd.tsx",
    "src/app/llms.txt/route.ts",
  ];
  const copy = paths.map((path) => fs.readFileSync(path, "utf8")).join(" ");
  const pricing = fs.readFileSync("src/components/Pricing.tsx", "utf8");

  assert.doesNotMatch(copy, /\b(?:Coming next|Roadmap):/i);
  assert.match(pricing, /Next, pipe the stream into the experiment/i);
  assert.match(pricing, /On the research roadmap/i);
});

test("keeps the stream specs in the original ungrouped layout", () => {
  const stream = fs.readFileSync("src/components/mv/TheStream.tsx", "utf8");

  assert.doesNotMatch(stream, /Available in the current Athena release|Coming next in Lab/);
  assert.match(stream, /The Muse stream, on a desk/);
  assert.match(stream, /kHz: "256", unit: "Hz", label: "EEG · TP9 AF7 AF8 TP10"/);
  assert.match(stream, /kHz: "64", unit: "Hz", label: "PPG · Muse 2 \/ S"/);
  assert.match(stream, /kHz: "52", unit: "Hz", label: "Accel and gyro"/);
  assert.match(stream, /kHz: "1", unit: "ms", label: "Stamp on every sample"/);
  assert.match(stream, /Leave as a file, or stay live/);
  assert.match(stream, /CSV · EDF · LSL · OSC/);
  assert.match(stream, /EEG, CSV, and EDF are available in the current Athena release/);
  assert.match(stream, /LSL and OSC are coming next in Lab/);
  assert.match(stream, /1 ms refers to timestamp precision, not sensor rate/);
});

test("collects a supported operating system in the access form and stores it", () => {
  const { normalizeOperatingSystem } = loadModule("src/lib/waitlist.ts");
  const form = fs.readFileSync("src/components/mv/Waitlist.tsx", "utf8");
  const action = fs.readFileSync("src/app/actions/waitlist.ts", "utf8");
  const migration = fs.readFileSync("supabase/migrations/20260823_waitlist.sql", "utf8");
  const osConstraint = fs.readFileSync(
    "supabase/migrations/20260823235000_waitlist_os_check.sql",
    "utf8",
  );

  assert.equal(normalizeOperatingSystem("Windows"), "Windows");
  assert.equal(normalizeOperatingSystem("macOS"), "macOS");
  assert.equal(normalizeOperatingSystem("Linux"), "Linux");
  assert.equal(normalizeOperatingSystem("Other"), null);
  assert.match(form, /OPERATING_SYSTEMS\.map/);
  assert.match(form, /type="radio"/);
  assert.match(form, /name="waitlist-os"/);
  assert.match(form, /required/);
  assert.match(form, /aria-describedby/);
  assert.match(form, /role="alert"/);
  assert.match(form, /os,\s*honeypot/);
  assert.match(action, /normalizeOperatingSystem\(input\.os\)/);
  assert.match(action, /error: "invalid_os"/);
  assert.match(migration, /\bos text\b/);
  assert.match(osConstraint, /os is null or os in \('Windows', 'macOS', 'Linux'\)/i);
  assert.match(osConstraint, /not valid/i);
});

test("registers the positioning test in the project scripts", () => {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

  assert.equal(packageJson.scripts["test:positioning"], "node --test scripts/articles-positioning.test.mjs");
});

test("keeps every comparison row aligned with its columns", () => {
  for (const article of loadArticles()) {
    for (const section of article.sections) {
      if (!section.table) continue;
      for (const row of section.table.rows) {
        assert.equal(row.cells.length, section.table.columns.length, `${article.slug}: ${row.label}`);
      }
    }
  }
});
