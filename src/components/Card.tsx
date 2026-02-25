interface CardProps {
  windowTitle?: string;
  image?: string;
  imageAlt?: string;
  tags?: string[];
  title: string;
  description: string;
  url?: string;
}

const Card = ({
  windowTitle = 'PROJECT_ALPHA',
  image,
  imageAlt = 'Card image',
  tags = [],
  title,
  description,
  url,
}: CardProps) => {
  const handleClick = () => {
    if (url) {
      window.open(url, '_blank');
    }
  }
  return (
    <div className="cmp-card" onClick={handleClick}>
      <div className="cmp-card__header">
        <div
          className="cmp-card__header-bg"
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 30%, rgb(6 182 212 / 0.3) 30%, rgb(6 182 212 / 0.3) 70%, transparent 70%), linear-gradient(-45deg, transparent 30%, rgb(6 182 212 / 0.3) 30%, rgb(6 182 212 / 0.3) 70%, transparent 70%)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="cmp-card__header-title">{windowTitle}</div>
      </div>

      {image && (
        <img src={image} alt={imageAlt} className="cmp-card__img" />
      )}

      <div className="cmp-card__body">
        <div className="cmp-card__spacer" />

        <div className="cmp-card__content">
          {tags.length > 0 && (
            <div className="cmp-card__tags">
              {tags.map((tag, index) => (
                <span key={index} className="cmp-card__tag">#{tag}</span>
              ))}
            </div>
          )}

          <h3 className="cmp-card__title">{title}</h3>

          <p className="cmp-card__description">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
