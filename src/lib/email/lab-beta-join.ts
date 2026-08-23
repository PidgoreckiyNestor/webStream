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
  const logo = `<img src="${logoSrc}" alt="MindVault" width="129" height="28" style="display:block;height:28px;width:auto;border:0;" />`;

  const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
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
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Geist:wght@400;600;700&display=swap");
    :root { color-scheme: light; supported-color-schemes: light; }
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; }
    body, table, td, p { font-family: ${FONT} !important; }
    body { margin: 0; padding: 0; width: 100% !important; background: ${CANVAS}; }
  </style>
  <!--[if mso]>
  <style>
    body, table, td, p, span { font-family: ${FONT_MSO} !important; }
  </style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${CANVAS};font-family:${FONT};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    LSL, OSC, API, and markers on the desk. We'll write when it opens.
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${CANVAS}" style="background-color:${CANVAS};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;">
          <tr>
            <td bgcolor="${CARD}" style="background-color:${CARD};border-radius:16px;overflow:hidden;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td bgcolor="${NAVY}" align="center" style="background-color:${NAVY};padding:22px 24px;">
                    ${logo}
                  </td>
                </tr>
                <tr>
                  <td style="padding:36px 36px 40px;font-family:${FONT};">
                    <p style="margin:0;font-family:${FONT};font-size:26px;line-height:1.25;font-weight:700;letter-spacing:-0.03em;color:${INK};">
                      You're on the Lab beta list
                    </p>
                    <p style="margin:20px 0 0;font-family:${FONT};font-size:16px;line-height:1.65;font-weight:400;color:${MUTED};">
                      LSL, OSC, API, and markers on the desk.
                    </p>
                    <p style="margin:20px 0 0;font-family:${FONT};font-size:16px;line-height:1.65;font-weight:400;color:${MUTED};">
                      We'll write when it opens.
                    </p>
                    <p style="margin:28px 0 0;font-family:${FONT};font-size:15px;line-height:1.5;font-weight:400;color:${INK};">
                      — MindVault
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:20px 8px 0;font-family:${FONT};font-size:12px;line-height:1.5;color:${MUTED};">
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
