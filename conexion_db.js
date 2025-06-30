import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'

// Cargar variables de entorno manualmente
import {existsSync} from "fs";

config()

console.log('🔧 DIAGNÓSTICO : CONEXIÓN BASE DE DATOS')
console.log('=' .repeat(50))

// 1. Verificar variables de entorno
console.log('📋 PASO 1: Verificando variables de entorno...')
const dbUrl = process.env.DATABASE_URL

if (!dbUrl) {
    console.log('❌ DATABASE_URL no encontrada en variables de entorno')
    console.log('🔍 Verificaciones:')
    console.log('   - ¿Existe archivo .env en la raíz?')
    console.log('   - ¿Tiene el formato correcto?')
    console.log('   - ¿Está siendo cargado correctamente?')
    process.exit(1)
}

// Mostrar URL censurada
const urlSafe = dbUrl.replace(/:([^:@]+)@/, ':***@')
console.log('✅ DATABASE_URL encontrada:', urlSafe)

// 2. Parsear URL para verificar componentes
console.log('\n📋 PASO 2: Analizando componentes de la URL...')
try {
    const url = new URL(dbUrl)
    console.log('   - Protocolo:', url.protocol)
    console.log('   - Host:', url.hostname)
    console.log('   - Puerto:', url.port || 'default (5432)')
    console.log('   - Usuario:', url.username || 'no especificado')
    console.log('   - Base de datos:', url.pathname.slice(1))
    console.log('   - Contraseña:', url.password ? '***' : 'no especificada')
} catch (error) {
    console.log('❌ Error parseando DATABASE_URL:', error.message)
    console.log('🔍 Verificar formato: postgresql://usuario:contraseña@host:puerto/database')
    process.exit(1)
}

// 3. Intentar conexión básica con Prisma
console.log('\n📋 PASO 3: Probando conexión con Prisma...')
const prisma = new PrismaClient({
    log: ['error', 'warn'],
})

async function testConnection() {
    try {
        // Test básico de conexión
        console.log('   🔄 Conectando...')
        await prisma.$connect()
        console.log('   ✅ Conexión establecida exitosamente')

        // Test de query simple
        console.log('   🔄 Probando query básica...')
        const result = await prisma.$queryRaw`SELECT NOW() as current_time`
        console.log('   ✅ Query ejecutada:', result[0].current_time)

        // Verificar tablas existentes
        console.log('   🔄 Verificando esquema...')
        const tables = await prisma.$queryRaw`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `

        if (tables.length === 0) {
            console.log('   ⚠️  No hay tablas en la base de datos')
            console.log('   💡 Ejecutar: npx prisma db push')
        } else {
            console.log('   ✅ Tablas encontradas:')
            tables.forEach(table => console.log(`      - ${table.table_name}`))
        }

        // Intentar contar propiedades
        try {
            const propertyCount = await prisma.property.count()
            console.log(`   📊 Total de propiedades: ${propertyCount}`)
        } catch (error) {
            console.log('   ⚠️  Error accediendo tabla property:', error.message)
            console.log('   💡 Posible problema: esquema no sincronizado')
        }

    } catch (error) {
        console.log('❌ ERROR DE CONEXIÓN:')
        console.log('   Tipo:', error.constructor.name)
        console.log('   Mensaje:', error.message)

        // Diagnósticos específicos por tipo de error
        if (error.message.includes('authentication failed')) {
            console.log('\n🎯 SOLUCIONES POSIBLES:')
            console.log('   1. Verificar usuario/contraseña en DATABASE_URL')
            console.log('   2. Crear usuario en PostgreSQL si no existe')
            console.log('   3. Verificar permisos del usuario')
        } else if (error.message.includes('could not connect')) {
            console.log('\n🎯 SOLUCIONES POSIBLES:')
            console.log('   1. Verificar que PostgreSQL esté corriendo')
            console.log('   2. Verificar host y puerto en DATABASE_URL')
            console.log('   3. Verificar firewall/conexión de red')
        } else if (error.message.includes('database') && error.message.includes('does not exist')) {
            console.log('\n🎯 SOLUCIONES POSIBLES:')
            console.log('   1. Crear la base de datos manualmente')
            console.log('   2. Verificar nombre de la BD en DATABASE_URL')
        }

        console.log('\n🛠️  COMANDOS ÚTILES:')
        console.log('   - Crear BD: createdb nombre_base_datos')
        console.log('   - Conectar: psql -d nombre_base_datos')
        console.log('   - Sincronizar esquema: npx prisma db push')
        console.log('   - Regenerar cliente: npx prisma generate')
    } finally {
        await prisma.$disconnect()
        console.log('\n👋 Desconectado de la base de datos')
    }
}

// Ejecutar diagnóstico
testConnection()

// 4. Mostrar información adicional del sistema
console.log('\n📋 INFORMACIÓN DEL SISTEMA:')
console.log('   - Node.js:', process.version)
console.log('   - Directorio:', process.cwd())
console.log('   - Plataforma:', process.platform)
console.log('   - Archivo .env existe:', existsSync('.env') ? 'SÍ' : 'NO')