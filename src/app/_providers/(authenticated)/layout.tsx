import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-ord-redirect";

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await getAuthOrRedirect();

  return <>{children}</>;
}
