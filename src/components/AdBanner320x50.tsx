import React from "react";

export default function AdBanner320x50() {
  const bannerDocument = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      html, body {
        margin: 0;
        padding: 0;
        width: 320px;
        height: 50px;
        overflow: hidden;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </style>
  </head>
  <body>
    <script type="text/javascript">
      atOptions = {
        'key' : '806c23d8f53f0bf13eb7e6bf3a95941a',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    </script>
    <script type="text/javascript" src="https://bicaa.org/22/806c23d8f53f0bf13eb7e6bf3a95941a"></script>
  </body>
</html>`;

  return (
    <div className="my-2 flex w-full items-center justify-center">
      <div className="flex h-[50px] w-[320px] items-center justify-center overflow-hidden">
        <iframe
          title="AdBanner320x50"
          srcDoc={bannerDocument}
          width={320}
          height={50}
          frameBorder={0}
          scrolling="no"
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
          style={{
            border: "none",
            width: "320px",
            height: "50px",
            overflow: "hidden",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}
