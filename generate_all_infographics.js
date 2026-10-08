const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const OUTPUT_DIR = path.join(__dirname, 'output', 'infographics');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const templates = [
  // 1. RANKED_BARS
  {
    type: 'RANKED_BARS',
    filename: '01_ranked_bars.png',
    title: 'Type: RANKED_BARS — Where Missed Calls Hurt the Most',
    description: 'A ranked breakdown analyzing inbound call loss rates across high-ticket service industries, highlighting why clinics, real estate, and legal practices bleed the most revenue from unanswered calls.',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=1080"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet"/>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1080px; height: 1080px; overflow: hidden;
    background-color: #0B0F12; color: #FFFFFF;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    padding: 64px 72px 52px; position: relative;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .topbar { display: flex; justify-content: space-between; align-items: center; }
  .kicker { display: flex; align-items: center; gap: 12px; font-size: 15px; font-weight: 800; letter-spacing: 2.2px; text-transform: uppercase; color: #E0E6ED; }
  .dot { width: 12px; height: 12px; border-radius: 50%; background: #16AA79; box-shadow: 0 0 10px rgba(22, 170, 121, 0.6); }
  .topright { font-family: 'Instrument Serif', serif; font-style: italic; font-size: 26px; color: #A0A8B0; }

  .header-block { margin-top: 10px; }
  .title { font-size: 64px; font-weight: 900; line-height: 1.1; letter-spacing: -2px; color: #FFFFFF; }
  .title em { font-family: 'Instrument Serif', serif; font-style: italic; font-weight: 400; color: #16AA79; }
  .subtitle { margin-top: 12px; font-size: 20px; color: #A0A8B0; line-height: 1.4; max-width: 900px; font-weight: 500; }

  .bars-container { display: flex; flex-direction: column; gap: 20px; margin: 28px 0; }
  .bar-item { display: flex; align-items: center; gap: 20px; }
  .rank { font-family: 'Instrument Serif', serif; font-style: italic; font-size: 32px; color: #16AA79; width: 44px; text-align: left; }
  .bar-content { flex: 1; display: flex; flex-direction: column; gap: 8px; }
  .bar-meta { display: flex; justify-content: space-between; align-items: baseline; }
  .bar-label { font-size: 20px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.3px; }
  .bar-val { font-size: 22px; font-weight: 800; color: #FFFFFF; }
  .bar-track { width: 100%; height: 14px; background: #1A2026; border-radius: 7px; overflow: hidden; position: relative; }
  .bar-fill { height: 100%; border-radius: 7px; }
  .fill-top { background: linear-gradient(90deg, #16AA79, #20C997); }
  .fill-mid { background: linear-gradient(90deg, #E8A33D, #F5B041); }
  .fill-low { background: #3A444C; }

  .footer { }
  .divider { height: 1px; background: #2A3238; margin-bottom: 16px; }
  .footrow { display: flex; justify-content: space-between; align-items: center; }
  .source { font-size: 13px; color: #8A929A; font-weight: 500; }
  .handle { font-size: 17px; font-weight: 800; letter-spacing: 0.3px; color: #FFFFFF; }
</style>
</head>
<body>
  <div class="topbar">
    <div class="kicker"><span class="dot"></span>Inbound Loss Audit · Service Benchmark</div>
    <div class="topright">Receptralink</div>
  </div>

  <div class="header-block">
    <div class="title">Where missed calls hurt the <em>most</em>.</div>
    <div class="subtitle">Percentage of incoming customer calls that go unanswered across high-ticket service industries during standard business hours.</div>
  </div>

  <div class="bars-container">
    <div class="bar-item">
      <div class="rank">01</div>
      <div class="bar-content">
        <div class="bar-meta">
          <span class="bar-label">Real Estate Agencies & Brokerages</span>
          <span class="bar-val">44%</span>
        </div>
        <div class="bar-track"><div class="bar-fill fill-top" style="width: 100%;"></div></div>
      </div>
    </div>
    <div class="bar-item">
      <div class="rank">02</div>
      <div class="bar-content">
        <div class="bar-meta">
          <span class="bar-label">Dental & Specialist Medical Clinics</span>
          <span class="bar-val">38%</span>
        </div>
        <div class="bar-track"><div class="bar-fill fill-top" style="width: 86.4%;"></div></div>
      </div>
    </div>
    <div class="bar-item">
      <div class="rank">03</div>
      <div class="bar-content">
        <div class="bar-meta">
          <span class="bar-label">Legal Practices & Client Intake</span>
          <span class="bar-val">32%</span>
        </div>
        <div class="bar-track"><div class="bar-fill fill-top" style="width: 72.7%;"></div></div>
      </div>
    </div>
    <div class="bar-item">
      <div class="rank">04</div>
      <div class="bar-content">
        <div class="bar-meta">
          <span class="bar-label">HVAC & Emergency Home Services</span>
          <span class="bar-val">29%</span>
        </div>
        <div class="bar-track"><div class="bar-fill fill-mid" style="width: 65.9%;"></div></div>
      </div>
    </div>
    <div class="bar-item">
      <div class="rank">05</div>
      <div class="bar-content">
        <div class="bar-meta">
          <span class="bar-label">Financial & Wealth Advisory</span>
          <span class="bar-val">23%</span>
        </div>
        <div class="bar-track"><div class="bar-fill fill-mid" style="width: 52.3%;"></div></div>
      </div>
    </div>
    <div class="bar-item">
      <div class="rank">06</div>
      <div class="bar-content">
        <div class="bar-meta">
          <span class="bar-label">Automotive Dealership Service Desks</span>
          <span class="bar-val">19%</span>
        </div>
        <div class="bar-track"><div class="bar-fill fill-low" style="width: 43.2%;"></div></div>
      </div>
    </div>
  </div>

  <div class="footer">
    <div class="divider"></div>
    <div class="footrow">
      <div class="source">Source: Receptralink Industry Inbound Audit (20,000+ logged service calls)</div>
      <div class="handle">@receptralink</div>
    </div>
  </div>
</body>
</html>`
  },

  // 2. DONUT_BREAKDOWN
  {
    type: 'DONUT_BREAKDOWN',
    filename: '02_donut_breakdown.png',
    title: 'Type: DONUT_BREAKDOWN — What Happens to an Unanswered Call?',
    description: 'A distribution breakdown illustrating customer behavior immediately after reaching voicemail or being placed on hold, showing that 67% dial a direct competitor right away.',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=1080"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet"/>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1080px; height: 1080px; overflow: hidden;
    background-color: #0B0F12; color: #FFFFFF;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    padding: 64px 72px 52px; position: relative;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .topbar { display: flex; justify-content: space-between; align-items: center; }
  .kicker { display: flex; align-items: center; gap: 12px; font-size: 15px; font-weight: 800; letter-spacing: 2.2px; text-transform: uppercase; color: #E0E6ED; }
  .dot { width: 12px; height: 12px; border-radius: 50%; background: #16AA79; box-shadow: 0 0 10px rgba(22, 170, 121, 0.6); }
  .topright { font-family: 'Instrument Serif', serif; font-style: italic; font-size: 26px; color: #A0A8B0; }

  .header-block { margin-top: 10px; }
  .title { font-size: 64px; font-weight: 900; line-height: 1.1; letter-spacing: -2px; color: #FFFFFF; }
  .title em { font-family: 'Instrument Serif', serif; font-style: italic; font-weight: 400; color: #16AA79; }
  .subtitle { margin-top: 12px; font-size: 20px; color: #A0A8B0; line-height: 1.4; max-width: 900px; font-weight: 500; }

  .chart-area { display: flex; align-items: center; justify-content: space-between; gap: 40px; margin: 20px 0; }
  
  .donut-wrap { position: relative; width: 440px; height: 440px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .donut-svg { transform: rotate(-90deg); width: 440px; height: 440px; }
  .donut-center { position: absolute; text-align: center; }
  .center-num { font-size: 88px; font-weight: 900; letter-spacing: -3px; color: #16AA79; line-height: 1; }
  .center-lbl { font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #A0A8B0; margin-top: 6px; }

  .legend-list { display: flex; flex-direction: column; gap: 18px; flex: 1; }
  .legend-card { background: #1A2026; border-radius: 14px; padding: 18px 22px; display: flex; justify-content: space-between; align-items: center; border-left: 5px solid transparent; }
  .legend-left { display: flex; align-items: center; gap: 14px; }
  .color-badge { width: 14px; height: 14px; border-radius: 4px; }
  .legend-name { font-size: 18px; font-weight: 700; color: #FFFFFF; }
  .legend-sub { font-size: 13px; color: #8A929A; margin-top: 2px; }
  .legend-pct { font-size: 32px; font-weight: 900; color: #FFFFFF; letter-spacing: -1px; }

  .card-top { border-left-color: #16AA79; }
  .card-top .legend-pct { color: #16AA79; }

  .takeaway-bar { background: #141A20; border-radius: 12px; padding: 16px 24px; font-size: 21px; line-height: 1.3; color: #E0E6ED; border: 1px solid #232B33; }
  .takeaway-bar em { font-family: 'Instrument Serif', serif; font-style: italic; color: #16AA79; font-size: 24px; }

  .footer { }
  .divider { height: 1px; background: #2A3238; margin-bottom: 16px; }
  .footrow { display: flex; justify-content: space-between; align-items: center; }
  .source { font-size: 13px; color: #8A929A; font-weight: 500; }
  .handle { font-size: 17px; font-weight: 800; letter-spacing: 0.3px; color: #FFFFFF; }
</style>
</head>
<body>
  <div class="topbar">
    <div class="kicker"><span class="dot"></span>Caller Behavior · Inbound Dropoff</div>
    <div class="topright">Receptralink</div>
  </div>

  <div class="header-block">
    <div class="title">What happens when you <em>miss</em> the call.</div>
    <div class="subtitle">When a prospect reaches voicemail during standard business hours, they almost never wait for a callback.</div>
  </div>

  <div class="chart-area">
    <div class="donut-wrap">
      <svg class="donut-svg" viewBox="0 0 100 100">
        <!-- R=38, C=2*PI*38 = 238.76 -->
        <!-- 67% = 159.97 -->
        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#16AA79" stroke-width="15" stroke-dasharray="159.97 238.76" stroke-dashoffset="0"/>
        <!-- 18% = 42.98 -->
        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#20C997" stroke-width="15" stroke-dasharray="42.98 238.76" stroke-dashoffset="-159.97"/>
        <!-- 11% = 26.26 -->
        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#E8A33D" stroke-width="15" stroke-dasharray="26.26 238.76" stroke-dashoffset="-202.95"/>
        <!-- 4% = 9.55 -->
        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#3A444C" stroke-width="15" stroke-dasharray="9.55 238.76" stroke-dashoffset="-229.21"/>
      </svg>
      <div class="donut-center">
        <div class="center-num">67%</div>
        <div class="center-lbl">Lost to Rival</div>
      </div>
    </div>

    <div class="legend-list">
      <div class="legend-card card-top">
        <div class="legend-left">
          <div class="color-badge" style="background:#16AA79;"></div>
          <div>
            <div class="legend-name">Calls Competitor</div>
            <div class="legend-sub">Dials next Google result instantly</div>
          </div>
        </div>
        <div class="legend-pct">67%</div>
      </div>

      <div class="legend-card">
        <div class="legend-left">
          <div class="color-badge" style="background:#20C997;"></div>
          <div>
            <div class="legend-name">Leaves Voicemail</div>
            <div class="legend-sub">Waits up to 4 hours for callback</div>
          </div>
        </div>
        <div class="legend-pct">18%</div>
      </div>

      <div class="legend-card">
        <div class="legend-left">
          <div class="color-badge" style="background:#E8A33D;"></div>
          <div>
            <div class="legend-name">Tries Calling Later</div>
            <div class="legend-sub">50% dropoff on second try</div>
          </div>
        </div>
        <div class="legend-pct">11%</div>
      </div>

      <div class="legend-card">
        <div class="legend-left">
          <div class="color-badge" style="background:#3A444C;"></div>
          <div>
            <div class="legend-name">Submits Web Form</div>
            <div class="legend-sub">Low urgency inquiries only</div>
          </div>
        </div>
        <div class="legend-pct">4%</div>
      </div>
    </div>
  </div>

  <div class="takeaway-bar">
    Key takeaway: <em>Two out of three callers</em> take their budget straight to the first competitor who answers live.
  </div>

  <div class="footer">
    <div class="divider"></div>
    <div class="footrow">
      <div class="source">Source: Invoca Consumer Inbound Study & Receptralink Telecom Telemetry</div>
      <div class="handle">@receptralink</div>
    </div>
  </div>
</body>
</html>`
  },

  // 3. TIMELINE_SHIFT
  {
    type: 'TIMELINE_SHIFT',
    filename: '03_timeline_shift.png',
    title: 'Type: TIMELINE_SHIFT — Front Desk Speed: 2021 vs 2026',
    description: 'A timeline shift showcasing how inbound response times collapsed from hours of voicemail backlogs to 3-second instant conversational AI pickups.',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=1080"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet"/>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1080px; height: 1080px; overflow: hidden;
    background-color: #0B0F12; color: #FFFFFF;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    padding: 64px 72px 52px; position: relative;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .topbar { display: flex; justify-content: space-between; align-items: center; }
  .kicker { display: flex; align-items: center; gap: 12px; font-size: 15px; font-weight: 800; letter-spacing: 2.2px; text-transform: uppercase; color: #E0E6ED; }
  .dot { width: 12px; height: 12px; border-radius: 50%; background: #16AA79; box-shadow: 0 0 10px rgba(22, 170, 121, 0.6); }
  .topright { font-family: 'Instrument Serif', serif; font-style: italic; font-size: 26px; color: #A0A8B0; }

  .header-block { margin-top: 10px; }
  .title { font-size: 64px; font-weight: 900; line-height: 1.1; letter-spacing: -2px; color: #FFFFFF; }
  .title em { font-family: 'Instrument Serif', serif; font-style: italic; font-weight: 400; color: #16AA79; }
  .subtitle { margin-top: 12px; font-size: 20px; color: #A0A8B0; line-height: 1.4; max-width: 900px; font-weight: 500; }

  .shift-container { display: flex; align-items: center; justify-content: space-between; gap: 24px; margin: 24px 0; }
  
  .timeline-card { flex: 1; border-radius: 20px; padding: 36px 32px; display: flex; flex-direction: column; justify-content: space-between; height: 460px; position: relative; }
  .card-past { background: #141A20; border: 1px solid #232B33; }
  .card-future { background: #10241F; border: 2px solid #16AA79; box-shadow: 0 10px 40px rgba(22, 170, 121, 0.15); }

  .card-era { font-family: 'Instrument Serif', serif; font-style: italic; font-size: 38px; color: #8A929A; }
  .card-future .card-era { color: #16AA79; }
  .card-tag { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #8A929A; margin-top: 4px; }
  .card-future .card-tag { color: #FFFFFF; }

  .metric-box { margin: 24px 0; }
  .metric-val { font-size: 78px; font-weight: 900; letter-spacing: -3px; line-height: 0.95; }
  .card-past .metric-val { color: #A0A8B0; }
  .card-future .metric-val { color: #16AA79; }
  .metric-lbl { font-size: 15px; font-weight: 600; color: #8A929A; margin-top: 8px; }

  .feature-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .feature-item { font-size: 16px; font-weight: 600; color: #CAD1D8; display: flex; align-items: center; gap: 10px; }
  .feature-item .icon { font-size: 14px; font-weight: 800; }

  .shift-arrow-box { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; width: 110px; }
  .badge-drop { background: #16AA79; color: #0B0F12; font-size: 14px; font-weight: 900; padding: 8px 12px; border-radius: 100px; text-transform: uppercase; letter-spacing: 1px; white-space: nowrap; }
  .arrow-symbol { font-family: 'Instrument Serif', serif; font-size: 56px; color: #16AA79; line-height: 1; }

  .story-bar { background: #141A20; border-radius: 12px; padding: 18px 24px; font-size: 19px; line-height: 1.35; color: #CAD1D8; border: 1px solid #232B33; }
  .story-bar em { font-family: 'Instrument Serif', serif; font-style: italic; color: #16AA79; font-size: 22px; }

  .footer { }
  .divider { height: 1px; background: #2A3238; margin-bottom: 16px; }
  .footrow { display: flex; justify-content: space-between; align-items: center; }
  .source { font-size: 13px; color: #8A929A; font-weight: 500; }
  .handle { font-size: 17px; font-weight: 800; letter-spacing: 0.3px; color: #FFFFFF; }
</style>
</head>
<body>
  <div class="topbar">
    <div class="kicker"><span class="dot"></span>Speed-to-Lead · Front Desk Evolution</div>
    <div class="topright">Receptralink</div>
  </div>

  <div class="header-block">
    <div class="title">The speed gap is <em>widening</em>.</div>
    <div class="subtitle">Average response latency from inbound customer dial to appointment confirmed in practice management software.</div>
  </div>

  <div class="shift-container">
    <div class="timeline-card card-past">
      <div>
        <div class="card-era">2021</div>
        <div class="card-tag">Traditional Front Desk</div>
      </div>
      <div class="metric-box">
        <div class="metric-val">4.2 hrs</div>
        <div class="metric-lbl">Average Callback Window</div>
      </div>
      <ul class="feature-list">
        <li class="feature-item"><span class="icon">✕</span> Heavy voicemail backlog</li>
        <li class="feature-item"><span class="icon">✕</span> Zero after-hours handling</li>
        <li class="feature-item"><span class="icon">✕</span> 38% callback connection rate</li>
      </ul>
    </div>

    <div class="shift-arrow-box">
      <div class="badge-drop">99.9% faster</div>
      <div class="arrow-symbol">→</div>
    </div>

    <div class="timeline-card card-future">
      <div>
        <div class="card-era">2026</div>
        <div class="card-tag">AI Voice Receptionist</div>
      </div>
      <div class="metric-box">
        <div class="metric-val">3 sec</div>
        <div class="metric-lbl">Instant Live Engagement</div>
      </div>
      <ul class="feature-list">
        <li class="feature-item" style="color:#FFFFFF;"><span class="icon" style="color:#16AA79;">✓</span> Zero wait time on ring #1</li>
        <li class="feature-item" style="color:#FFFFFF;"><span class="icon" style="color:#16AA79;">✓</span> 24/7 calendar booking live</li>
        <li class="feature-item" style="color:#FFFFFF;"><span class="icon" style="color:#16AA79;">✓</span> 100% inbound capture rate</li>
      </ul>
    </div>
  </div>

  <div class="story-bar">
    Inbound callers answered in under 60 seconds convert at <em>9x the rate</em> of callers phoned back after an hour. Speed is retention.
  </div>

  <div class="footer">
    <div class="divider"></div>
    <div class="footrow">
      <div class="source">Source: Harvard Business Review Lead Response Audit & Receptralink Benchmarks</div>
      <div class="handle">@receptralink</div>
    </div>
  </div>
</body>
</html>`
  },

  // 4. COMPARISON_SPLIT
  {
    type: 'COMPARISON_SPLIT',
    filename: '04_comparison_split.png',
    title: 'Type: COMPARISON_SPLIT — Legacy IVR vs AI Voice Agent',
    description: 'A head-to-head operational comparison between frustrating automated phone trees ("Press 1 for Sales") and autonomous conversational AI receptionists.',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=1080"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet"/>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1080px; height: 1080px; overflow: hidden;
    background-color: #0B0F12; color: #FFFFFF;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    padding: 64px 72px 52px; position: relative;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .topbar { display: flex; justify-content: space-between; align-items: center; }
  .kicker { display: flex; align-items: center; gap: 12px; font-size: 15px; font-weight: 800; letter-spacing: 2.2px; text-transform: uppercase; color: #E0E6ED; }
  .dot { width: 12px; height: 12px; border-radius: 50%; background: #16AA79; box-shadow: 0 0 10px rgba(22, 170, 121, 0.6); }
  .topright { font-family: 'Instrument Serif', serif; font-style: italic; font-size: 26px; color: #A0A8B0; }

  .header-block { margin-top: 10px; }
  .title { font-size: 64px; font-weight: 900; line-height: 1.1; letter-spacing: -2px; color: #FFFFFF; }
  .title em { font-family: 'Instrument Serif', serif; font-style: italic; font-weight: 400; color: #16AA79; }
  .subtitle { margin-top: 12px; font-size: 20px; color: #A0A8B0; line-height: 1.4; max-width: 900px; font-weight: 500; }

  .columns-header { display: flex; gap: 24px; margin-top: 24px; }
  .col-head { flex: 1; padding: 14px 20px; border-radius: 12px; text-align: center; font-size: 18px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; }
  .head-left { background: #1A2026; color: #A0A8B0; }
  .head-right { background: #10241F; color: #16AA79; border: 1px solid #16AA79; }

  .rows-stack { display: flex; flex-direction: column; gap: 16px; margin: 16px 0 24px; }
  .comp-row { display: flex; align-items: center; gap: 24px; background: #141A20; border: 1px solid #232B33; border-radius: 16px; padding: 18px 24px; position: relative; }
  
  .col-val-left { flex: 1; text-align: center; }
  .val-num-left { font-size: 34px; font-weight: 900; color: #E0E6ED; }
  .val-sub-left { font-size: 13px; color: #8A929A; margin-top: 3px; font-weight: 500; }

  .col-label-center { width: 220px; text-align: center; }
  .metric-tag { font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.2px; color: #A0A8B0; }

  .col-val-right { flex: 1; text-align: center; }
  .val-num-right { font-size: 34px; font-weight: 900; color: #16AA79; }
  .val-sub-right { font-size: 13px; color: #CAD1D8; margin-top: 3px; font-weight: 600; }

  .footer { }
  .divider { height: 1px; background: #2A3238; margin-bottom: 16px; }
  .footrow { display: flex; justify-content: space-between; align-items: center; }
  .source { font-size: 13px; color: #8A929A; font-weight: 500; }
  .handle { font-size: 17px; font-weight: 800; letter-spacing: 0.3px; color: #FFFFFF; }
</style>
</head>
<body>
  <div class="topbar">
    <div class="kicker"><span class="dot"></span>Telephony Architecture · Head to Head</div>
    <div class="topright">Receptralink</div>
  </div>

  <div class="header-block">
    <div class="title">Legacy IVR <em>vs</em> AI Voice Agent.</div>
    <div class="subtitle">Why business callers abandon push-button phone trees and how conversational front-desk AI changes the numbers.</div>
  </div>

  <div class="columns-header">
    <div class="col-head head-left">Legacy IVR Phone Tree ("Press 1")</div>
    <div class="col-head head-right">Receptralink AI Voice Receptionist</div>
  </div>

  <div class="rows-stack">
    <div class="comp-row">
      <div class="col-val-left">
        <div class="val-num-left">48%</div>
        <div class="val-sub-left">Hangs up within 30 seconds</div>
      </div>
      <div class="col-label-center">
        <div class="metric-tag">Call Abandonment</div>
      </div>
      <div class="col-val-right">
        <div class="val-num-right">4%</div>
        <div class="val-sub-right">Immediate conversational hook</div>
      </div>
    </div>

    <div class="comp-row">
      <div class="col-val-left">
        <div class="val-num-left">22%</div>
        <div class="val-sub-left">Must transfer or callback</div>
      </div>
      <div class="col-label-center">
        <div class="metric-tag">First-Call Resolution</div>
      </div>
      <div class="col-val-right">
        <div class="val-num-right">84%</div>
        <div class="val-sub-right">Answers FAQs & schedules live</div>
      </div>
    </div>

    <div class="comp-row">
      <div class="col-val-left">
        <div class="val-num-left">3m 42s</div>
        <div class="val-sub-left">Average queue wait time</div>
      </div>
      <div class="col-label-center">
        <div class="metric-tag">Average Hold Time</div>
      </div>
      <div class="col-val-right">
        <div class="val-num-right">0 sec</div>
        <div class="val-sub-right">Infinite parallel line capacity</div>
      </div>
    </div>

    <div class="comp-row">
      <div class="col-val-left">
        <div class="val-num-left">Voicemail</div>
        <div class="val-sub-left">Zero active triage after 5 PM</div>
      </div>
      <div class="col-label-center">
        <div class="metric-tag">After-Hours Coverage</div>
      </div>
      <div class="col-val-right">
        <div class="val-num-right">24/7/365</div>
        <div class="val-sub-right">Full booking & emergency triage</div>
      </div>
    </div>
  </div>

  <div class="footer">
    <div class="divider"></div>
    <div class="footrow">
      <div class="source">Source: Gartner Customer Service Telecom Benchmark & Receptralink Logs</div>
      <div class="handle">@receptralink</div>
    </div>
  </div>
</body>
</html>`
  },

  // 5. HERO_NUMBER
  {
    type: 'HERO_NUMBER',
    filename: '05_hero_number.png',
    title: 'Type: HERO_NUMBER — The $126k Cost of Missed Inbound Calls',
    description: 'A single massive figure highlighting the $126,000 annual revenue loss experienced by mid-market clinics and service firms due to uncaptured inbound calls.',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=1080"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet"/>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1080px; height: 1080px; overflow: hidden;
    background-color: #0B0F12; color: #FFFFFF;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    padding: 70px 72px 52px; position: relative;
  }
  .topbar { display: flex; justify-content: space-between; align-items: center; }
  .kicker { display: flex; align-items: center; gap: 12px; font-size: 15px; font-weight: 800; letter-spacing: 2.5px; text-transform: uppercase; color: #E0E6ED; }
  .dot { width: 12px; height: 12px; border-radius: 50%; background: #16AA79; box-shadow: 0 0 10px rgba(22, 170, 121, 0.6); }
  .topright { font-family: 'Instrument Serif', serif; font-style: italic; font-size: 26px; color: #A0A8B0; }

  .hero { position: absolute; top: 180px; left: 72px; right: 72px; }
  .bignum { font-size: 330px; font-weight: 900; letter-spacing: -14px; line-height: 0.82; color: #16AA79; }
  .heroline { margin-top: 24px; font-size: 38px; font-weight: 700; line-height: 1.2; max-width: 920px; }
  .heroline em { font-family: 'Instrument Serif', serif; font-style: italic; font-weight: 400; color: #16AA79; }

  .ministats { position: absolute; left: 72px; right: 72px; bottom: 140px; display: flex; gap: 20px; }
  .card { flex: 1; background: #1A2026; border-radius: 18px; padding: 26px 22px; }
  .card.flip { background: #FFFFFF; }
  .card .num { font-size: 46px; font-weight: 900; letter-spacing: -2px; color: #FFFFFF; }
  .card.flip .num { color: #16AA79; }
  .card .lbl { margin-top: 8px; font-size: 15px; font-weight: 600; color: #A0A8B0; line-height: 1.3; }
  .card.flip .lbl { color: #0B0F12; }

  .footer { position: absolute; bottom: 52px; left: 72px; right: 72px; }
  .divider { height: 1px; background: #2A3238; margin-bottom: 16px; }
  .footrow { display: flex; justify-content: space-between; align-items: center; }
  .source { font-size: 13px; color: #8A929A; font-weight: 500; max-width: 720px; }
  .handle { font-size: 17px; font-weight: 800; letter-spacing: 0.3px; color: #FFFFFF; }
</style>
</head>
<body>
  <div class="topbar">
    <div class="kicker"><span class="dot"></span>Annual Revenue Bleed · Practice Audit</div>
    <div class="topright">Receptralink</div>
  </div>

  <div class="hero">
    <div class="bignum">$126k</div>
    <div class="heroline">lost each year to missed inbound calls. <em>most owners never notice.</em></div>
  </div>

  <div class="ministats">
    <div class="card">
      <div class="num">62%</div>
      <div class="lbl">of missed calls hit during lunch rush or after hours</div>
    </div>
    <div class="card">
      <div class="num">85%</div>
      <div class="lbl">of prospective patients refuse to leave a voicemail</div>
    </div>
    <div class="card">
      <div class="num">$420</div>
      <div class="lbl">average lifetime margin of one missed service lead</div>
    </div>
    <div class="card flip">
      <div class="num">zero</div>
      <div class="lbl">lost opportunities when answered 24/7 by AI voice</div>
    </div>
  </div>

  <div class="footer">
    <div class="divider"></div>
    <div class="footrow">
      <div class="source">Source: Receptralink Practice Analytics (based on 120 mid-market clinic & agency audits)</div>
      <div class="handle">@receptralink</div>
    </div>
  </div>
</body>
</html>`
  }
];

async function generateAll() {
  console.log('Launching Puppeteer browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const generatedFiles = [];

  for (const t of templates) {
    console.log(`Generating [${t.type}]...`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 2 });
    
    // Save html for debugging/inspection
    const htmlPath = path.join(OUTPUT_DIR, t.filename.replace('.png', '.html'));
    fs.writeFileSync(htmlPath, t.html, 'utf8');

    await page.setContent(t.html, { waitUntil: 'networkidle0' });
    await page.evaluateHandle('document.fonts.ready');

    const outPath = path.join(OUTPUT_DIR, t.filename);
    await page.screenshot({
      path: outPath,
      clip: { x: 0, y: 0, width: 1080, height: 1080 }
    });
    await page.close();

    console.log(`Saved: ${outPath}`);
    generatedFiles.push({
      type: t.type,
      filePath: outPath,
      title: t.title,
      description: t.description
    });
  }

  await browser.close();
  console.log('All 5 infographics rendered successfully!');

  // Save metadata json
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'infographics_meta.json'),
    JSON.stringify(generatedFiles, null, 2),
    'utf8'
  );
}

generateAll().catch(err => {
  console.error('Error generating infographics:', err);
  process.exit(1);
});
