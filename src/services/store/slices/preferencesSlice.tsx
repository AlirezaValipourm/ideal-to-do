
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// theme modes can be expanded
type ThemeMode = "light" | "dark"

interface PreferenceState {
    themeMode: ThemeMode,
    locale: string;
    // more user preferences
}

const initialState: PreferenceState = {
    themeMode: "light",
    locale: "en-US",
};

const preferencesSlice = createSlice({
    name: "darkMode",
    initialState,
    reducers: {
        toggleThemeReducer: (state: PreferenceState, action: PayloadAction<ThemeMode>) => {
            state.themeMode = action.payload
        },
        changeLocaleReducer: (state: PreferenceState, action: PayloadAction<ThemeMode>) => {
            state.locale = action.payload
        }
        // more preferences action
    },
});

export const { toggleThemeReducer } = preferencesSlice.actions;
export const { changeLocaleReducer } = preferencesSlice.actions;
export default preferencesSlice.reducer;

export const selectThemeMode = (store: RootState): PreferenceState["themeMode"] =>
    store.preferences.themeMode;

export const selectLocale = (store: RootState): PreferenceState["locale"] =>
    store.preferences.locale;
