import { MainLayout } from "@idealToDo/ui/layouts/MainLayout";
import "@idealToDo/ui/styles/globals.css";
import CssBaseline from "@mui/material/CssBaseline";
import type { AppProps } from "next/app";
import { ThemeProvider } from '@mui/material/styles';
import { MuiTheme } from "@idealToDo/ui/theme/muiTheme";
import { Provider } from "react-redux";
import store from '@idealToDo/services/store/store'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { CacheProvider } from '@emotion/react';
import createEmotionCache from "@idealToDo/ui/theme/emotionCache";

const cache = createEmotionCache();

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const queryClient = new QueryClient()

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={MuiTheme}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <MainLayout>
              <CssBaseline />
              <Component {...pageProps} />
            </MainLayout>
            <Toaster />
          </QueryClientProvider>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}
