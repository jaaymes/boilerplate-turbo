"use client";

import {
  BorderRadius,
  borderRadiusOptions,
  colorThemes,
  useTheme,
} from "@/shared/infra/hooks/use-theme";
import { Button } from "@package/ui/components/button";
import { Label } from "@package/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@package/ui/components/radio-group";
import { Separator } from "@package/ui/components/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@package/ui/components/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@package/ui/components/tabs";
import { cn } from "@package/ui/lib/utils";
import { Settings2 } from "lucide-react";

export function ThemeCustomizer() {
  const {
    theme,
    radius,
    isDarkMode,
    isMounted,
    handleThemeChange,
    handleRadiusChange,
    toggleDarkMode,
  } = useTheme();

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings2 className="h-5 w-5" />
          <span className="sr-only">Customizar tema</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]  px-4">
        <SheetHeader>
          <SheetTitle>Personalizar tema</SheetTitle>
        </SheetHeader>
        <Tabs defaultValue="colors" className="mt-6">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="colors">Cores</TabsTrigger>
            <TabsTrigger value="radius">Border Radius</TabsTrigger>
            <TabsTrigger value="mode">Modo</TabsTrigger>
          </TabsList>
          <TabsContent value="colors" className="mt-4 space-y-4">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-3">
                Escolha um tema para personalizar a aparência da aplicação.
              </p>
              <div className="grid grid-cols-4 gap-2">
                {colorThemes.map((t) => (
                  <div key={t.name} className="text-center">
                    <button
                      onClick={() => handleThemeChange(t.name)}
                      className={cn(
                        "w-full aspect-square rounded-full mb-1",
                        theme === t.name ? "ring-2 ring-ring ring-offset-2" : ""
                      )}
                      style={{ backgroundColor: t.primary }}
                      aria-label={`Tema ${t.name}`}
                    />
                    <span className="text-xs">{t.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="mb-2 text-sm font-medium">Visualização</h4>
              <div className="grid gap-2">
                <Button>Botão Primário</Button>
                <Button variant="secondary">Botão Secundário</Button>
                <Button variant="outline">Botão Outline</Button>
                <Button variant="ghost">Botão Ghost</Button>
                <Button variant="destructive">Botão Destructive</Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="radius" className="mt-4 space-y-4">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-3">
                Ajuste o arredondamento das bordas dos componentes.
              </p>
              <RadioGroup
                value={radius}
                onValueChange={(value) =>
                  handleRadiusChange(value as BorderRadius)
                }
              >
                <div className="grid grid-cols-5 gap-2">
                  {borderRadiusOptions.map((value) => (
                    <div
                      key={value}
                      className="flex flex-col items-center gap-1"
                    >
                      <Label
                        htmlFor={`radius-${value}`}
                        className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-md border border-input"
                        style={{
                          borderRadius: `${Number.parseFloat(value) * 0.5}rem`,
                        }}
                      >
                        <RadioGroupItem
                          id={`radius-${value}`}
                          value={value}
                          className="sr-only"
                        />
                      </Label>
                      <span className="text-xs">{value}</span>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
            <Separator />
            <div>
              <h4 className="mb-2 text-sm font-medium">Visualização</h4>
              <div className="grid gap-2">
                <Button>Botão Primário</Button>
                <Button variant="secondary">Botão Secundário</Button>
                <Button variant="outline">Botão Outline</Button>
                <Button variant="ghost">Botão Ghost</Button>
                <Button variant="destructive">Botão Destructive</Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="mode" className="mt-4 space-y-4">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-3">
                Alterne entre o modo claro e escuro.
              </p>
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  className={cn(
                    "w-24 h-24 rounded-full",
                    isDarkMode
                      ? "bg-card text-card-foreground"
                      : "bg-primary text-primary-foreground"
                  )}
                  onClick={toggleDarkMode}
                >
                  {isDarkMode ? "Escuro" : "Claro"}
                </Button>
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="mb-2 text-sm font-medium">Visualização</h4>
              <div className="grid gap-2">
                <Button>Botão Primário</Button>
                <Button variant="secondary">Botão Secundário</Button>
                <Button variant="outline">Botão Outline</Button>
                <Button variant="ghost">Botão Ghost</Button>
                <Button variant="destructive">Botão Destructive</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
