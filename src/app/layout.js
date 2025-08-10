import { yekanFont } from "@/utils/fonts";
import "./globals.css";
import Sidebar from "../components/modules/sidebar/Sidebar";

export const metadata = {
  title: "همگامان دانش",
  description: "سامانه آموزشی همگامان دانش"
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={yekanFont.className}>
        <Sidebar
          direction="rtl"
          mode="light"
          userName="محمد محمدی"
          designation="برنامه نویس فرانت‌اند"
          userimg="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-1.jpg"
        >
          {children}
        </Sidebar>
      </body>
    </html>
  );
}
