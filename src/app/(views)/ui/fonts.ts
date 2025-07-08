import {Cactus_Classical_Serif} from 'next/font/google'

export const cactus = Cactus_Classical_Serif({weight: '400', subsets: ['latin']})
/* Para usar en algún lado
* <body className='${cactus.className} antialiased>
(antialiased agiliza la renderizacion)
* */