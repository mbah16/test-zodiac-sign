declare module "zodiac-signs" {
    const getSymbols: () => string;
    const getNames: (lang?: string) => string;
    const getSignBySymbol: (s: string, lang?: string) => string;
    const getSignByName: (name: string, lang?: string) => string;
    const getSignByDate: (
        obj?: { day?: number; month?: number },
        lang?: string
    ) => string;
}
