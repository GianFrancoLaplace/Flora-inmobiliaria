import InformacionPersonal from "@/components/Nosotros/InformacionPersonal/InformacionPersonal";
import './us.css';
export default function SobreNosotros() {
    return (
        <div className="us-section">
                {/* <div className="us-image">
                    <div className="us-text">
                        <h1>Acerca de Nosotros</h1>
                        <p>Experiencia | Compromiso | Transparencia</p>
                    </div>
                </div> */}

            <div>
                <InformacionPersonal />
            </div>
        </div>
    );
}