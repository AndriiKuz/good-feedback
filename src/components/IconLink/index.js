const IconLink = ({ src, alt, href }) => {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <img src={src} alt={alt} />
    </a>
  );
};
export default IconLink;
