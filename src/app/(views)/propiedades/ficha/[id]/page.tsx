'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';
import TechnicalSheet from '@/components/TechnicalFile/TechnicalSheet';
import { Property } from "@/types/Property";

type PageProps = {
	params: Promise<{ id: string }>;
};

export default function FichaPropiedadPage({ params }: PageProps) {
	const { id } = use(params);

	const [property, setProperty] = useState<Property | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) {
			setIsLoading(false);
			setError("ID de propiedad no válido.");
			return;
		}

		const fetchProperty = async () => {
			try {
				const response = await fetch(`/api/properties/${id}`);

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.message || `Error al contactar al servidor: ${response.status}`);
				}

				const data: Property = await response.json();
				setProperty(data);

			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError('Ocurrió un error inesperado al procesar la solicitud.');
				}
				console.error("Falló la obtención de la propiedad:", err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProperty();
	}, [id]);

	if (isLoading) {
		return (
			<main style={{ padding: '2rem', textAlign: 'center' }}>
				<p>Cargando datos de la propiedad...</p>
			</main>
		);
	}

	if (error) {
		return (
			<main style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
				<h2>Ocurrió un error</h2>
				<p>{error}</p>
			</main>
		);
	}

	if (!property) {
		return (
			<main style={{ padding: '2rem', textAlign: 'center' }}>
				<p>La propiedad que buscas no fue encontrada.</p>
			</main>
		);
	}

	return (
		<main>
			<TechnicalSheet mode="view" property={property} />
		</main>
	);
}