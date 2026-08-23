export type EmailContent = {
  subject: string;
  text: string;
  html: string;
};

const FONT =
  "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";
const FONT_MSO = "Arial, Helvetica, sans-serif";

const CANVAS = "#e8eaed";
const CARD = "#ffffff";
const NAVY = "#06070a";
const INK = "#111111";
const MUTED = "#6b7280";

const SUBJECT = "You're on the MindVault Lab beta list";

const TEXT = [
  "You're on the Lab beta list",
  "",
  "LSL, OSC, API, and markers on the desk.",
  "",
  "We'll write when it opens.",
  "",
  "— MindVault",
  "",
  "One note. Not a newsletter.",
].join("\n");

export const LOGO_CONTENT_ID = "logo";

export function labBetaJoinEmail(logoSrc = `cid:${LOGO_CONTENT_ID}`): EmailContent {
  const logo = `<img src="${logoSrc}" alt="MindVault" width="560" height="70" style="display:block;width:100%;max-width:560px;height:auto;border:0;outline:none;text-decoration:none;" />`;

  const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light only" />
  <meta name="supported-color-schemes" content="light only" />
  <title>${SUBJECT}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office">
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    :root { color-scheme: light only; supported-color-schemes: light only; }
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; }
    body, table, td, p { font-family: ${FONT} !important; }
    body { margin: 0; padding: 0; width: 100% !important; background: ${CANVAS}; }
    /* Gmail/Apple invert CSS but not images — lock fills via background-image. */
    .canvas { background-color: ${CANVAS} !important; background-image: linear-gradient(${CANVAS}, ${CANVAS}); }
    .card { background-color: ${CARD} !important; background-image: linear-gradient(${CARD}, ${CARD}); }
    .ink { color: ${INK} !important; }
    .muted { color: ${MUTED} !important; }
    @media (prefers-color-scheme: dark) {
      body, .canvas { background-color: ${CANVAS} !important; background-image: linear-gradient(${CANVAS}, ${CANVAS}) !important; }
      .card { background-color: ${CARD} !important; background-image: linear-gradient(${CARD}, ${CARD}) !important; }
      .ink { color: ${INK} !important; }
      .muted { color: ${MUTED} !important; }
    }
    [data-ogsc] .canvas { background-color: ${CANVAS} !important; }
    [data-ogsc] .card { background-color: ${CARD} !important; }
    [data-ogsc] .ink { color: ${INK} !important; }
    [data-ogsc] .muted { color: ${MUTED} !important; }
  </style>
  <!--[if mso]>
  <style>
    body, table, td, p, span { font-family: ${FONT_MSO} !important; }
  </style>
  <![endif]-->
</head>
<body class="canvas" style="margin:0;padding:0;background-color:${CANVAS};background-image:linear-gradient(${CANVAS},${CANVAS});font-family:${FONT};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    LSL, OSC, API, and markers on the desk. We'll write when it opens.
  </div>
  <table role="presentation" class="canvas" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${CANVAS}" style="background-color:${CANVAS};background-image:linear-gradient(${CANVAS},${CANVAS});">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;">
          <tr>
            <td class="card" bgcolor="${CARD}" style="background-color:${CARD};background-image:linear-gradient(${CARD},${CARD});border-radius:16px;overflow:hidden;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td bgcolor="${NAVY}" align="center" style="background-color:${NAVY};background-image:linear-gradient(${NAVY},${NAVY});padding:0;font-size:0;line-height:0;">
                    ${logo}
                  </td>
                </tr>
                <tr>
                  <td class="card" style="padding:36px 36px 40px;font-family:${FONT};background-color:${CARD};background-image:linear-gradient(${CARD},${CARD});">
                    <p class="ink" style="margin:0;font-family:${FONT};font-size:26px;line-height:1.25;font-weight:700;letter-spacing:-0.03em;color:${INK};">
                      You're on the Lab beta list
                    </p>
                    <p class="muted" style="margin:20px 0 0;font-family:${FONT};font-size:16px;line-height:1.65;font-weight:400;color:${MUTED};">
                      LSL, OSC, API, and markers on the desk.
                    </p>
                    <p class="muted" style="margin:20px 0 0;font-family:${FONT};font-size:16px;line-height:1.65;font-weight:400;color:${MUTED};">
                      We'll write when it opens.
                    </p>
                    <p class="ink" style="margin:28px 0 0;font-family:${FONT};font-size:15px;line-height:1.5;font-weight:400;color:${INK};">
                      — MindVault
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="muted" align="center" style="padding:20px 8px 0;font-family:${FONT};font-size:12px;line-height:1.5;color:${MUTED};">
              One note. Not a newsletter.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject: SUBJECT, text: TEXT, html };
}
