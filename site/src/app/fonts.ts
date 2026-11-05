import { Archivo, JetBrains_Mono, Source_Sans_3 } from 'next/font/google';

export const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' });
export const source = Source_Sans_3({ subsets: ['latin'], variable: '--font-source', display: 'swap' });
export const jetbrains = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-jetbrains', display: 'swap' });
