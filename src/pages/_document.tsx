import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createCache from '@emotion/cache';

const cache = createCache({
  key: 'mui',
  prepend: true,
});

const { extractCritical } = createEmotionServer(cache);

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="emotion-insertion-point" content="" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          return <App {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCritical(initialProps.html);

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      <style
        key="emotion"
        dangerouslySetInnerHTML={{ __html: emotionStyles.css }}
        data-emotion={`css ${emotionStyles.ids.join(' ')}`}
      />,
    ],
  };
};