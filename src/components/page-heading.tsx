type PageHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  index?: string;
};

export function PageHeading({
  eyebrow,
  title,
  description,
  index,
}: PageHeadingProps) {
  return (
    <div className="page-heading">
      <div className="page-heading__eyebrow eyebrow">
        {index && <span className="section-index">{index}</span>}
        <span>{eyebrow}</span>
      </div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
