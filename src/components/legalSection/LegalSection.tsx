interface LegalSection {
  title: string;
  content: string;
}

function LegalSection(props: LegalSection) {

  return (
    <div>
      <h3>{props.title}</h3>
      <p>{props.content}</p>
    </div>
  );
}

export default LegalSection;
