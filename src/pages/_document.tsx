import * as React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentProps } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import { AppType } from 'next/app';
import createEmotionCache from '@idealToDo/ui/theme/emotionCache';
import { DocumentHeadTagsProps } from '@mui/material-nextjs/v13-pagesRouter';

export default function MyDocument({ emotionStyleTags }: DocumentProps & DocumentHeadTagsProps) {
  return (
    <Html lang="en">
      <Head>
        {emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCritical } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: AppType) =>
        function EnhanceApp(props) {
          const EnhancedApp = App as React.ComponentType<any>;
          return <EnhancedApp {...props} emotionCache={cache} />;
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
    emotionStyleTags: [
      <style
        key="emotion"
        dangerouslySetInnerHTML={{ __html: emotionStyles.css }}
        data-emotion={`css ${emotionStyles.ids.join(' ')}`}
      />,
    ],
  };
};