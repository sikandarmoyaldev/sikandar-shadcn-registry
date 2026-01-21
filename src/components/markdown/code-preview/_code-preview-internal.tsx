import { PUBLIC_SITE_URL } from "astro:env/client";
import { Loader2Icon } from "lucide-react";
import { lazy, Suspense, type ReactNode } from "react";

import { OpenInV0Button } from "@/components/open-in-v0-button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type Demo = "";

interface CodePreviewInternalProps {
    demo: Demo;
    children: ReactNode;
}

export function CodePreviewInternal({ demo, children }: CodePreviewInternalProps) {
    const componentName = demo.split("/")[0];
    const Component = getComponent(componentName, demo.split("/")[1]);

    return (
        <Tabs defaultValue="preview" className="not-content">
            <TabsList className="w-full">
                <TabsTrigger value="preview" className="grow-0">
                    Preview
                </TabsTrigger>
                <TabsTrigger value="code" className="grow-0">
                    Code
                </TabsTrigger>
                <OpenInV0Button
                    url={`${PUBLIC_SITE_URL}/r/${componentName}.json`}
                    className="ml-auto"
                />
            </TabsList>
            <Card className="no-scrollbar h-112.5 overflow-y-auto rounded-lg bg-transparent p-0">
                <CardContent className="h-full p-0">
                    <TabsContent
                        value="preview"
                        className="flex h-full items-center justify-center p-4"
                    >
                        <Suspense fallback={<Loader2Icon className="size-16 animate-spin" />}>
                            <Component />
                        </Suspense>
                    </TabsContent>
                    <TabsContent value="code" className="h-full">
                        {children}
                    </TabsContent>
                </CardContent>
            </Card>
        </Tabs>
    );
}

function getComponent(component: string, demo: string) {
    return lazy(async () => {
        const module = await import(`../../../registry/new-york/examples/${component}/${demo}.tsx`);
        const namedExport = Object.keys(module).find((key) => typeof module[key] === "function");
        return {
            default: module.default ?? (namedExport ? module[namedExport] : undefined),
        };
    });
}
