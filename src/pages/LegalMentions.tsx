import LegalSection from '../components/legalSection/LegalSection.tsx'; 

function LegalMentions() {
  return (
    <div>
      <h2>Mentions Légales</h2>
      <LegalSection title="1. Informations légales" content="Nom du site web: [Nom de votre site], etc..." />
      <LegalSection title="2. Propriété intellectuelle" content="Le contenu de ce site, etc..." />
      <LegalSection title="3. Responsabilité" content="[Nom de votre entreprise] s'efforce d'assurer, etc..." />
      <LegalSection title="4. Politique de confidentialité" content="Veuillez consulter notre politique, etc..." />
      <LegalSection title="5. Droit applicable" content="Les présentes mentions légales sont régies, etc..." />
    </div>
  );
}

export default LegalMentions;
