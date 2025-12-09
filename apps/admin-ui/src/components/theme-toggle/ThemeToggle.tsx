import { MoonIcon, SunIcon } from "@patternfly/react-icons";
import { Button, ButtonVariant } from "@patternfly/react-core";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const { t } = useTranslation();

    return (
        <Button
            variant={ButtonVariant.plain}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label={t("toggleTheme")}
            title={t("toggleTheme")}
        >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
    );
}
