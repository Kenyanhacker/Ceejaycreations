import { Helmet } from "react-helmet-async";

export default function SEO({
  title = "Ceejay Creations | Full-Stack Software & Web Systems Agency",
  description = "Ceejay Creations builds full-stack web apps, custom software, and robotics-grade systems for founders who need to ship.",
  path = "/",
}) {
  const url = `https://www.ceejaycreations.com${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
    </Helmet>
  );
}
