import TechnicalSheet from '@/components/TechnicalFile/TechnicalSheet'

export default function EmptyFile() {
    return (
        <main>
            <div>
                <TechnicalSheet mode={"create"} property={null} />
            </div>
        </main>
    )
}