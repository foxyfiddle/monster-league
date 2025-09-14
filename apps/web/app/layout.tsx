import "./globals.css";
import { AuthButtons } from "../components";

export const metadata = { title: "Monster League", description: "Text-first sim" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="cupcake">
      <body className="min-h-dvh bg-base-200 text-base-content">
        <div className="navbar bg-base-100 border-b">
          <div className="flex-1 px-2 font-semibold">Monster League</div>
          <div className="flex-none px-2"><AuthButtons /></div>
        </div>
        <main className="max-w-4xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}

