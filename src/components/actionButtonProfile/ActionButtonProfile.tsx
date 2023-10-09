import "./ActionButtonProfile.css"

interface ActionButton {
    label: string;
    onClick: () => void;
    className?: string;
}

function ActionButtonProfile({ label, onClick, className = "" }) {
    return (
        <button className={className} onClick={onClick}>
            {label}
        </button>
    );
}

export default ActionButtonProfile;

