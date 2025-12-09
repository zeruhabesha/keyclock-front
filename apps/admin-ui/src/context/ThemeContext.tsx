import {
    createContext,
    useContext,
    useEffect,
    useState,
    PropsWithChildren,
} from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = PropsWithChildren<{
    defaultTheme?: Theme;
    storageKey?: string;
}>;

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
} as any;

const ThemeContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "keycloak-ui-theme",
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    );

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove("light", "dark", "pf-v5-theme-dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light";

            root.classList.add(systemTheme);
            root.setAttribute("data-theme", systemTheme);
            if (systemTheme === "dark") {
                root.classList.add("pf-v5-theme-dark");
            }
            return;
        }

        root.classList.add(theme);
        root.setAttribute("data-theme", theme);
        if (theme === "dark") {
            root.classList.add("pf-v5-theme-dark");
        }
    }, [theme]);

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme);
            setTheme(theme);
        },
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider");

    return context;
}
