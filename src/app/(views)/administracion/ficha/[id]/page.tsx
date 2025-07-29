import { notFound } from 'next/navigation';
import TechnicalSheet from '@/components/TechnicalFile/TechnicalSheet';
import { Property } from "@/types/Property";

type Mode = 'view' | 'edit' | 'create';

type PageProps = {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ mode?: Mode }>;
}

async function getProperty(id: string): Promise<Property | null> {
	try {
		const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

		const response = await fetch(`${baseUrl}/api/properties/${id}`, {
			cache: 'no-store',
			headers: {
				'Content-Type': 'application/json',
			}
		});

		if (!response.ok) {
			console.error(`Error fetching property ${id}:`, response.status, response.statusText);
			return null;
		}

		return await response.json();
	} catch (error) {
		console.error('Error in getProperty:', error);
		return null;
	}
}

export default async function UnifiedPropertyPage({
	                                                  params,
	                                                  searchParams
                                                  }: PageProps) {
	const { id } = await params;
	const { mode = 'view' } = await searchParams;

	if (id === 'nueva') {
		if (mode !== 'create') {
			notFound();
		}

		return (
			<main>
				<TechnicalSheet
					mode="create"
					property={null}
				/>
			</main>
		);
	}

	const property = await getProperty(id);

	if (!property) {
		notFound();
	}

	const validModes: Mode[] = ['view', 'edit'];
	const finalMode = validModes.includes(mode) ? mode : 'view';

	return (
		<main>
			<TechnicalSheet
				mode={finalMode}
				property={property}
			/>
		</main>
	);
}

export async function generateMetadata({ params, searchParams }: PageProps) {
	const { id } = await params;
	const { mode = 'view' } = await searchParams;

	if (id === 'nueva') {
		return {
			title: 'Crear Nueva Propiedad',
			description: 'Crear una nueva publicación inmobiliaria'
		};
	}

	const property = await getProperty(id);

	if (!property) {
		return {
			title: 'Propiedad no encontrada',
			description: 'La propiedad solicitada no existe'
		};
	}

	const modeTexts = {
		view: 'Ver Propiedad',
		edit: 'Editar Propiedad',
		create: 'Crear Propiedad'
	};

	return {
		title: `${modeTexts[mode]}: ${property.address}`,
		description: property.description || `${property.type} en ${property.address}`,
		openGraph: {
			title: `${modeTexts[mode]}: ${property.address}`,
			description: property.description,
			images: property.images?.[0]?.url ? [property.images[0].url] : [],
		}
	};
}