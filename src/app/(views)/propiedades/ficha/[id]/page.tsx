
'use client'; // Es un Componente de Cliente porque usa hooks (useState, useEffect)

import { useEffect, useState } from 'react';
import TechnicalSheet from '@/components/TechnicalFile/TechnicalSheet';
import { Property } from "@/types/Property"; // Asegúrate de que la ruta a tus tipos sea correcta

// El componente de página recibe 'params' como prop, que contiene los segmentos dinámicos de la URL.
// Por ejemplo, para la URL /propiedades/123, params será { id: '123' }.
export default function FichaPropiedadPage({ params }: { params: { id: string } }) {

    // 1. ESTADO PARA ALMACENAR LA PROPIEDAD
    // Se inicializa en 'null' para poder diferenciar entre "cargando" y "no encontrado".
    const [property, setProperty] = useState<Property | null>(null);

    // 2. ESTADO PARA LA EXPERIENCIA DE USUARIO (UX)
    // 'isLoading' nos permite mostrar un mensaje mientras se obtienen los datos.
    const [isLoading, setIsLoading] = useState(true);

    // 'error' nos permite mostrar un mensaje si algo sale mal.
    const [error, setError] = useState<string | null>(null);

    // 3. EFECTO PARA OBTENER LOS DATOS
    // useEffect se ejecuta después de que el componente se monta en el navegador.
    // Es el lugar ideal para hacer llamadas a APIs.
    useEffect(() => {
        const propertyId = params.id;

        // Si por alguna razón no hay un ID, detenemos la ejecución.
        if (!propertyId) {
            setIsLoading(false);
            setError("ID de propiedad no válido.");
            return;
        }

        // Definimos la función asíncrona para hacer la petición a la API.
        const fetchProperty = async () => {
            try {
                // Hacemos la llamada GET a nuestra propia API usando el ID de la URL.
                const response = await fetch(`/api/properties/${propertyId}`);

                // Si la respuesta del servidor no es exitosa (ej. 404, 500),
                // leemos el mensaje de error del cuerpo y lo lanzamos.
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `Error al contactar al servidor: ${response.status}`);
                }

                // Si la respuesta es exitosa, convertimos el cuerpo de la respuesta a JSON.
                // 'data' ahora es el objeto de la propiedad que tu API devolvió.
                const data: Property = await response.json();

                // GUARDAMOS LOS DATOS EN EL ESTADO.
                // Esta llamada a setProperty le dice a React que vuelva a renderizar el componente
                // con la nueva información.
                setProperty(data);

            } catch (err) {
                // Comprobamos si 'err' es una instancia de Error para acceder a '.message' de forma segura.
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    // Si no es un objeto Error, mostramos un mensaje genérico.
                    setError('Ocurrió un error inesperado al procesar la solicitud.');
                }
                console.error("Falló la obtención de la propiedad:", err);
            } finally {
                // Se ejecuta siempre, tanto si hubo éxito como si hubo error.
                // Indica que el proceso de carga ha terminado.
                setIsLoading(false);
            }
        };

        // Ejecutamos la función que acabamos de definir.
        fetchProperty();

        // El array de dependencias [params.id] asegura que este efecto se vuelva a ejecutar
        // solo si el usuario navega de una propiedad a otra (ej. de /propiedades/123 a /propiedades/456)
        // sin recargar la página completa.
    }, [params.id]);

    // 4. RENDERIZADO CONDICIONAL BASADO EN EL ESTADO

    // Mientras isLoading sea true, mostramos un mensaje de carga.
    if (isLoading) {
        return (
            <main style={{ padding: '2rem', textAlign: 'center' }}>
                <p>Cargando datos de la propiedad...</p>
                {/* Aquí podrías poner un spinner o un esqueleto de carga para una mejor UX */}
            </main>
        );
    }

    // Si el estado de error tiene un mensaje, lo mostramos.
    if (error) {
        return (
            <main style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
                <h2>Ocurrió un error</h2>
                <p>{error}</p>
            </main>
        );
    }

    // Si la carga terminó sin errores pero 'property' sigue siendo null,
    // significa que la API devolvió una respuesta vacía o un 404.
    if (!property) {
        return (
            <main style={{ padding: '2rem', textAlign: 'center' }}>
                <p>La propiedad que buscas no fue encontrada.</p>
            </main>
        );
    }

    // 5. RENDERIZADO FINAL CON LOS DATOS
    // Si llegamos a este punto, significa que isLoading es false, error es null, y
    // property es un objeto con todos los datos. Ahora es seguro renderizar el componente principal.
    return (
        <main>
            <div>

                <TechnicalSheet mode={'view'} property={property} />
            </div>
        </main>
    )
}