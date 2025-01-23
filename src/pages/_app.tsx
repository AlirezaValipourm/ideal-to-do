import { MainLayout } from "@idealToDo/ui/layouts/MainLayout";
import "@idealToDo/ui/styles/globals.css";
import CssBaseline from "@mui/material/CssBaseline";
import type { AppProps } from "next/app";
import { AppCacheProvider } from '@mui/material-nextjs/v15-pagesRouter';
import { ThemeProvider } from '@mui/material/styles';
import { MuiTheme } from "@idealToDo/ui/theme/muiTheme";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return <>
    <AppCacheProvider {...props} >
      <ThemeProvider theme={MuiTheme}>
        <MainLayout>
          <Component {...pageProps} />
          <CssBaseline enableColorScheme />
        </MainLayout>
      </ThemeProvider>
    </AppCacheProvider>
  </>
}
