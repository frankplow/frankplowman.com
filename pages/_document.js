import { Html, Head, Main, NextScript } from 'next/document'

import { SetColorScheme } from '../lib/dark_mode.js'

const SetColorSchemeStr = `(function() {
    (${SetColorScheme.toString()})();
})()
`;
 
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <script dangerouslySetInnerHTML={{ __html: SetColorSchemeStr }}></script>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
