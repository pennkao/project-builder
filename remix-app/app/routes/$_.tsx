// app/routes/$_.tsx
export const loader = async () => {
  return new Response(null, { status: 404 });
};

export default function NotFound() {
  return <div>404 Not Found</div>;
}
