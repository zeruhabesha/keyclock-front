import React from "react";
import { Page } from "@patternfly/react-core";

export const LoadingBeta = () => {
    return (
        <Page>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    width: "100vw",
                    fontWeight: 700,
                    color: "#0061f2", /* Bright Blue */
                    fontSize: "3rem",
                    letterSpacing: "2px",
                    fontFamily: "'Segoe UI', Roboto, sans-serif"
                }}
            >
                Beta
            </div>
        </Page>
    );
};
