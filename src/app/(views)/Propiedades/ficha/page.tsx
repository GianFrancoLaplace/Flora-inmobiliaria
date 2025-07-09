import TechnicalSheet from '@/components/TechnicalFile/TechnicalSheet'
import {PropertyState, PropertyType} from "@/types/Property";

export default function FichaPropiedad() {
    return (
        <main>
            <div>
                <TechnicalSheet mode={'view'} property={
                    {
                        id: 0,
                        address: "",
                        city: "",
                        description: "",
                        price: 0,
                        state: PropertyState.RENT,
                        type: PropertyType.HOME,
                        bathrooms: 0,
                        bedrooms: 0,
                        squareMeters: 0
                    }
                }  />
            </div>
        </main>
    )
}