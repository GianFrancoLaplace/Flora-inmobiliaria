import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {


    try {
        const body = await request.json();
        const { name, tel, email, propType, coment } = body;

        const { data, error } = await resend.emails.send({
            // 1. USA ESTA DIRECCIÓN 'FROM' PARA DESARROLLO
            from: 'onboarding@resend.dev',

            // 2. ENVÍA EL CORREO A TU PROPIA DIRECCIÓN REGISTRADA EN RESEND
            to: ['roark.nahuelthiago@gmail.com'], // Reemplaza esto con tu email si no usas .env

            subject: `Nueva propuesta de venta de ${name}`,
            html: `
        <h1>Nueva Propuesta de Venta de Propiedad</h1>
        <p>Has recibido una nueva propuesta a través del formulario web.</p>
        <hr>
        <h2>Datos del Contacto:</h2>
        <ul>
          <li><strong>Nombre y Apellido:</strong> ${name}</li>
          <li><strong>Teléfono:</strong> ${tel}</li>
          <li><strong>Email (Reply-To):</strong> ${email}</li>
        </ul>
        <h2>Datos de la Propiedad:</h2>
        <ul>
          <li><strong>Tipo de Propiedad:</strong> ${propType}</li>
          <li><strong>Comentarios:</strong> ${coment}</li>
        </ul>
      `,
        });

        if (error) {
            console.error({ error });
            return NextResponse.json({ error: 'Error al enviar el correo.' }, { status: 500 });
        }

        return NextResponse.json({ message: '¡Correo enviado con éxito!', data });

    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Un error desconocido ocurrió' }, { status: 500 });
    }
}