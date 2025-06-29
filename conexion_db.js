// test-db.js - Archivo independiente para probar
import { PrismaClient } from './src/generated/prisma/index.js';
const prisma = new PrismaClient()

async function testConnection() {
    console.log('🚀 Iniciando test de conexión...')

    try {
        // Intenta obtener UNA propiedad
        const propiedad = await prisma.property.findFirst()

        if (propiedad) {
            console.log('✅ ¡CONEXIÓN EXITOSA!')
            console.log('📋 Primera propiedad encontrada:')
            console.log('-----------------------------------')
            console.log(`ID: ${propiedad.id_property}`)
            console.log(`Dirección: ${propiedad.direction || 'Sin dirección'}`)
            console.log(`Precio: $${propiedad.price}`)
            console.log(`Tipo: ${propiedad.property_type_id_property_type}`)
            console.log(`Operación: ${propiedad.categoria_id_category}`)
            console.log('-----------------------------------')
        } else {
            console.log('⚠️  Conexión OK pero no hay datos')
            console.log('Ejecuta los INSERT de prueba primero')
        }

    } catch (error) {
        console.log('❌ ERROR DE CONEXIÓN:')
        console.log(error.message)
        console.log('\n🔍 Verificar:')
        console.log('- PostgreSQL está corriendo')
        console.log('- DATABASE_URL en .env')
        console.log('- Base de datos existe')
        console.log('- Tablas creadas')
    } finally {
        await prisma.$disconnect()
        console.log('\n👋 Desconectado de la DB')
    }
}

// Ejecutar el test
testConnection()

// ALTERNATIVA MÁS SIMPLE AÚN - Solo verificar conexión
async function testConnectionOnly() {
    try {
        await prisma.$connect()
        console.log('✅ Conexión a PostgreSQL: OK')

        // Cuenta cuántas propiedades hay
        const count = await prisma.property.count()
        console.log(`📊 Total de propiedades: ${count}`)

    } catch (error) {
        console.log('❌ Error:', error.message)
    } finally {
        await prisma.$disconnect()
    }
}

// Descomenta la línea de abajo si solo quieres verificar conexión
// testConnectionOnly()