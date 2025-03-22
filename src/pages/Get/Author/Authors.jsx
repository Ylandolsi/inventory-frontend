export function Authors() {
  return <></>;
}

export const LoadAuthors = async () => {
  const response = await fetch("http://localhost:5173/authors");
  const authors = await response.json();
  return authors;
};
