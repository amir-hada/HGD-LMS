import { yekanFont } from "@/utils/fonts";
import "./globals.css";
import Sidebar from "../components/modules/sidebar/Sidebar";

export const metadata = {
  title: "همگامان دانش",
  description: "همگامان دانش"
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={yekanFont.className}>
        <Sidebar direction="rtl" mode="light">
          {children}
        </Sidebar>
      </body>
    </html>
  );
}
