import React from "react";
import Image from 'next/image';
import styles from "src/components/TechnicalFile/TechnicalSheet.module.css"

interface EditButtonProps {
    onStartEdit: () => void;
    onEndEdit: () => void;
    isEditing: boolean;
    disabled?: boolean;
    className?: string;
    title?: string;
    show?: boolean;
}

const EditButton: React.FC<EditButtonProps> = ({
                                                   onStartEdit,
                                                   onEndEdit,
                                                   isEditing,
                                                   disabled = false,
                                                   className = '',
                                                   title = "Click para editar",
                                                   show = false,
                                               }) => {
    return (
        <button
            onClick={ isEditing ? onEndEdit : onStartEdit}
            disabled={disabled}
            className={show ?  className : styles.notShowProperties}
            title={title}
            type="button"
        >
            <Image
                src={'/icons/iconoEdit.png'}
                alt={'Icono para editar'}
                width={30}
                height={30}
            />
        </button>
    );
};

export default EditButton;