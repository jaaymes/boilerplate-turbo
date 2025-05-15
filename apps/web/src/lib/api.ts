interface CoinMarketData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  circulating_supply: number;
}

export interface MetricData {
  title: string;
  value: string | number;
  changePercentage: number;
  description: string;
  subtitle: string;
}

/**
 * Busca dados de mercado de criptomoedas da API CoinGecko
 * Usa a API pública gratuita que não requer autenticação
 */
export async function fetchMarketMetrics(): Promise<MetricData[]> {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=4&page=1&sparkline=false"
    );

    if (!response.ok) {
      throw new Error("Falha ao buscar dados de mercado");
    }

    const data: CoinMarketData[] = await response.json();

    return data.map((coin) => {
      const isPositive = coin.price_change_percentage_24h >= 0;
      return {
        title: `Preço do ${coin.name}`,
        value: `R$ ${coin.current_price.toLocaleString("pt-BR")}`,
        changePercentage: parseFloat(
          coin.price_change_percentage_24h.toFixed(2)
        ),
        description: isPositive ? "Em alta" : "Em queda",
        subtitle: `Cap. de Mercado: R$ ${(coin.market_cap / 1000000).toFixed(2)}M`,
      };
    });
  } catch (error) {
    console.error("Erro ao buscar dados de mercado:", error);
    // Retorna dados alternativos caso a API falhe
    return [
      {
        title: "Preço do Bitcoin",
        value: "R$ 250.000",
        changePercentage: 5.2,
        description: "Em alta este mês",
        subtitle: "Capitalização de mercado continua crescendo",
      },
      {
        title: "Preço do Ethereum",
        value: "R$ 12.500",
        changePercentage: -2.1,
        description: "Correção de curto prazo",
        subtitle: "Progresso de desenvolvimento forte",
      },
      {
        title: "Binance Coin",
        value: "R$ 1.750",
        changePercentage: 8.4,
        description: "Forte momentum",
        subtitle: "Volume de troca aumentando",
      },
      {
        title: "Solana",
        value: "R$ 600",
        changePercentage: 12.5,
        description: "Grande alta em andamento",
        subtitle: "Ecossistema de desenvolvimento em expansão",
      },
    ];
  }
}
