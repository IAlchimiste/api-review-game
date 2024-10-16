export function notFound(name: string): never {
  const error = new Error(name + ", j'ai pas trouver :'(");
  (error as any).status = 404;
  throw error;
}
