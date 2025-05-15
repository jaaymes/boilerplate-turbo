"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@package/ui/components/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@package/ui/components/chart";
import { Combobox, ComboboxOption } from "@package/ui/components/combobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@package/ui/components/select";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@package/ui/components/toggle-group";

export const description = "Um gráfico de área interativo";

interface CryptoData {
  date: string;
  price: number;
  volume: number;
}

interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
}

const chartConfig = {
  price: {
    label: "Preço",
  },
  volume: {
    label: "Quantidade Negociada",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");
  const [chartData, setChartData] = React.useState<CryptoData[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedCrypto, setSelectedCrypto] = React.useState("bitcoin");
  const [cryptoOptions, setCryptoOptions] = React.useState<ComboboxOption[]>(
    []
  );
  const [loadingCryptos, setLoadingCryptos] = React.useState(true);

  // Buscar lista de criptomoedas disponíveis
  React.useEffect(() => {
    const fetchCryptosList = async () => {
      setLoadingCryptos(true);
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=100&page=1"
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar lista de criptomoedas");
        }

        const data: Cryptocurrency[] = await response.json();

        // Transformar os dados para o formato do combobox
        const options: ComboboxOption[] = data.map((crypto) => ({
          value: crypto.id,
          label: `${crypto.name} (${crypto.symbol.toUpperCase()})`,
        }));

        setCryptoOptions(options);
      } catch (error) {
        console.error("Erro ao buscar lista de criptomoedas:", error);
        // Adicionar pelo menos o Bitcoin como opção padrão no caso de erro
        setCryptoOptions([
          { value: "bitcoin", label: "Bitcoin (BTC)" },
          { value: "ethereum", label: "Ethereum (ETH)" },
          { value: "binancecoin", label: "Binance Coin (BNB)" },
        ]);
      } finally {
        setLoadingCryptos(false);
      }
    };

    fetchCryptosList();
  }, []);

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  // Buscar dados da criptomoeda selecionada
  React.useEffect(() => {
    const fetchCryptoData = async () => {
      setIsLoading(true);
      try {
        let days = 90;
        if (timeRange === "30d") {
          days = 30;
        } else if (timeRange === "7d") {
          days = 7;
        }

        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${selectedCrypto}/market_chart?vs_currency=brl&days=${days}&interval=daily`
        );

        if (!response.ok) {
          throw new Error("Resposta da rede não está ok");
        }

        const data = await response.json();

        // Transforma os dados da API no formato que nosso gráfico precisa
        const formattedData = data.prices.map(
          (priceData: [number, number], index: number) => {
            const date = new Date(priceData[0]);
            const volume = data.total_volumes[index]
              ? data.total_volumes[index][1]
              : 0;

            return {
              date: date.toISOString().split("T")[0],
              price: parseFloat(priceData[1].toFixed(2)),
              volume: parseFloat((volume / 1000000000).toFixed(2)), // Converte para bilhões
            };
          }
        );

        setChartData(formattedData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        // Fornece dados de fallback em caso de erro
        setChartData([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedCrypto) {
      fetchCryptoData();
    }
  }, [timeRange, selectedCrypto]);

  // Obter um nome de exibição para a moeda selecionada
  const getCryptoDisplayName = () => {
    const coinNames: Record<string, string> = {
      bitcoin: "Bitcoin",
      ethereum: "Ethereum",
      litecoin: "Litecoin",
      binancecoin: "Binance Coin",
      ripple: "XRP",
      cardano: "Cardano",
      dogecoin: "Dogecoin",
      polkadot: "Polkadot",
    };

    return coinNames[selectedCrypto] || "Criptomoeda";
  };

  const selectedCryptoName = getCryptoDisplayName();

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Gráfico de Preço de Criptomoedas</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            {selectedCryptoName} -{" "}
            {timeRange === "90d"
              ? "Preço nos últimos 3 meses"
              : timeRange === "30d"
                ? "Preço nos últimos 30 dias"
                : "Preço nos últimos 7 dias"}
          </span>
          <span className="@[540px]/card:hidden">
            {selectedCryptoName} -{" "}
            {timeRange === "90d"
              ? "Últimos 3 meses"
              : timeRange === "30d"
                ? "Últimos 30 dias"
                : "Últimos 7 dias"}
          </span>
        </CardDescription>
        <CardAction className="flex flex-col gap-2 sm:flex-row">
          <div className="w-full max-w-xs">
            <Combobox
              options={cryptoOptions}
              value={selectedCrypto}
              onValueChange={setSelectedCrypto}
              placeholder={
                loadingCryptos
                  ? "Carregando moedas..."
                  : "Selecione uma criptomoeda"
              }
              emptyMessage="Nenhuma criptomoeda encontrada"
              disabled={loadingCryptos}
            />
          </div>
          <div className="flex">
            <ToggleGroup
              type="single"
              value={timeRange}
              onValueChange={setTimeRange}
              variant="outline"
              className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
            >
              <ToggleGroupItem value="90d">Últimos 3 meses</ToggleGroupItem>
              <ToggleGroupItem value="30d">Últimos 30 dias</ToggleGroupItem>
              <ToggleGroupItem value="7d">Últimos 7 dias</ToggleGroupItem>
            </ToggleGroup>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger
                className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                size="sm"
                aria-label="Selecione um valor"
              >
                <SelectValue placeholder="Últimos 3 meses" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="90d" className="rounded-lg">
                  Últimos 3 meses
                </SelectItem>
                <SelectItem value="30d" className="rounded-lg">
                  Últimos 30 dias
                </SelectItem>
                <SelectItem value="7d" className="rounded-lg">
                  Últimos 7 dias
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {isLoading ? (
          <div className="flex h-[250px] w-full items-center justify-center">
            <p className="text-muted-foreground">Carregando dados...</p>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--chart-1)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--chart-1)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--chart-2)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--chart-2)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("pt-BR", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="price"
                stroke="var(--chart-1)"
                strokeWidth={2}
                fill="url(#fillPrice)"
                name={`${selectedCryptoName} (R$)`}
                activeDot={{ r: 6, style: { fill: "var(--chart-1)" } }}
              />
              <Area
                type="monotone"
                dataKey="volume"
                stroke="var(--chart-2)"
                strokeWidth={2}
                fill="url(#fillVolume)"
                name="Quantidade Negociada (Bi R$)"
                activeDot={{ r: 6, style: { fill: "var(--chart-2)" } }}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
