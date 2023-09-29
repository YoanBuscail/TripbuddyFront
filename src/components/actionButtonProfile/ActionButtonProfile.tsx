import React from 'react';

interface ActionButton {
    label: string;
    onClick: () => void;
    className?: string;
}

function ActionButton({ label, onClick, className = "" }) {
    return (
        <button className={className} onClick={onClick}>
            {label}
        </button>
    );
}

export default ActionButton;

