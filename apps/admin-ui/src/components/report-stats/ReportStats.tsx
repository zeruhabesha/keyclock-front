import { Card, CardBody, CardTitle, Grid, GridItem, Icon } from "@patternfly/react-core";
import { ReactNode } from "react";
import style from "./report-stats.module.css";

export type ReportItem = {
    title: string;
    value: string | number;
    icon: ReactNode;
    description?: string;
    variant?: "blue" | "green" | "purple" | "orange";
};

type ReportStatsProps = {
    items: ReportItem[];
};

export const ReportStats = ({ items }: ReportStatsProps) => {
    return (
        <Grid hasGutter className={style.grid}>
            {items.map((item, index) => (
                <GridItem key={index} sm={12} md={6} lg={3}>
                    <Card className={style.card}>
                        <CardTitle className={style.cardHeader}>
                            <span className={style.cardTitle}>{item.title}</span>
                            <Icon size="lg" className={`${style.icon} ${style[item.variant || "blue"]}`}>
                                {item.icon}
                            </Icon>
                        </CardTitle>
                        <CardBody className={style.cardBody}>
                            <div className={style.value}>{item.value}</div>
                            {item.description && <div className={style.description}>{item.description}</div>}
                        </CardBody>
                    </Card>
                </GridItem>
            ))}
        </Grid>
    );
};
