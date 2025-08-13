import { notFound } from 'next/navigation';
import TechnicalSheet from '@/components/TechnicalFile/TechnicalSheet';
import { getPropertyById } from '@/hooks/getPropertyById';

type Mode = 'view' | 'edit' | 'create';

type PageProps = {
	params: { id: string };
	searchParams: { mode?: string }; // más flexible por si viene otro valor
};

export default async function UnifiedPropertyPage({ params, searchParams }: PageProps) {
	const { id } = params;
	const modeParam = searchParams.mode ?? 'view';

	// normalizamos el mode para evitar valores inesperados
	const validModes: Mode[] = ['view', 'edit', 'create'];
	const mode: Mode = validModes.includes(modeParam as Mode) ? (modeParam as Mode) : 'view';

	// Si es una nueva propiedad
	if (id === 'nueva') {
		if (mode !== 'create') {
			notFound();
		}

		return (
			<main>
				<TechnicalSheet mode="create" property={null} />
			</main>
		);
	}

	// Traer propiedad desde BD
	const property = await getPropertyById(id);

	if (!property) {
		notFound();
	}

	return (
		<main>
			<TechnicalSheet mode={mode} property={property} />
		</main>
	);
}

export async function generateMetadata({ params, searchParams }: PageProps) {
	const { id } = params;
	const modeParam = searchParams.mode ?? 'view';

	const validModes: Mode[] = ['view', 'edit', 'create'];
	const mode: Mode = validModes.includes(modeParam as Mode) ? (modeParam as Mode) : 'view';

	if (id === 'nueva') {
		return {
			title: 'Crear Nueva Propiedad',
			description: 'Crear una nueva publicación inmobiliaria'
		};
	}

	const property = await getPropertyById(id);

	if (!property) {
		return {
			title: 'Propiedad no encontrada',
			description: 'La propiedad solicitada no existe'
		};
	}

	const modeTexts: Record<Mode, string> = {
		view: 'Ver Propiedad',
		edit: 'Editar Propiedad',
		create: 'Crear Propiedad'
	};

	return {
		title: `${modeTexts[mode]}: ${property.address}`,
		description: property.description || `${property.type} en ${property.address}`,
		openGraph: {
			title: `${modeTexts[mode]}: ${property.address}`,
			description: property.description || '',
			images: property.images?.[0]?.url ? [property.images[0].url] : [],
		}
	};
}
