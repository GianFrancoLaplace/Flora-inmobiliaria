import ContactInformation from "@/components/features/ContactInformation/ContactInformation"
import FilterGroup from "../../components/FilterButtons/filtergroup";

export default function Properties() {
  return (
    <div>
      <main>
         <ContactInformation />
      </main>

      <div className="layout-propiedades">
        <div className="container-filter-properties">
            <FilterGroup direction="column" />
        </div>

        <div className="container-listado-propiedades">
            <p>Aquí va el listado de propiedades...</p>
        </div>
      </div>

    </div>
  );
}
